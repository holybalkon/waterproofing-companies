#!/usr/bin/env python3
"""
Analyze passage structure for AI Readiness audit (Group B).
Checks: heading hierarchy, passage containment, answer-first writing, Q&A surface.
"""

import os
import re
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin

class HeadingParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.headings = []  # (level, text, line_no)
        self.paragraphs = []  # (text, start_line)
        self.current_section = None
        self.in_script = False
        self.current_paragraph = []
        self.paragraph_start_line = 0
        self.line_no = 1

    def handle_starttag(self, tag, attrs):
        if tag == 'script':
            self.in_script = True
        elif tag.lower() in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']:
            level = int(tag[1])
            self.headings.append({
                'level': level,
                'tag': tag,
                'text': '',
                'line': self.line_no
            })
        elif tag == 'p' and not self.in_script:
            self.paragraph_start_line = self.line_no
            self.current_paragraph = []

    def handle_endtag(self, tag):
        if tag == 'script':
            self.in_script = False
        elif tag == 'p' and not self.in_script and self.current_paragraph:
            text = ''.join(self.current_paragraph).strip()
            if text:
                self.paragraphs.append({
                    'text': text,
                    'line': self.paragraph_start_line,
                    'word_count': len(text.split())
                })
            self.current_paragraph = []

    def handle_data(self, data):
        if not self.in_script:
            if self.headings and not self.headings[-1].get('text'):
                self.headings[-1]['text'] = data.strip()
            elif self.current_paragraph is not None:
                self.current_paragraph.append(data)
        self.line_no += data.count('\n')

def analyze_file(filepath):
    """Analyze a single HTML file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    parser = HeadingParser()
    parser.feed(content)
    
    headings = parser.headings
    paragraphs = parser.paragraphs
    
    # Filter out empty or script headings
    headings = [h for h in headings if h['text'].strip() and len(h['text']) > 3]
    
    issues = []
    structure = []
    
    # 1. Count H1
    h1_count = sum(1 for h in headings if h['level'] == 1)
    if h1_count == 0:
        issues.append("❌ No H1 found")
    elif h1_count > 1:
        issues.append(f"❌ Multiple H1 ({h1_count}): {[h['text'][:50] for h in headings if h['level'] == 1]}")
    
    # 2. Check heading hierarchy
    prev_level = 0
    for i, h in enumerate(headings):
        level = h['level']
        structure.append(f"{'  ' * (level - 1)}H{level}: {h['text'][:60]}")
        
        # Skip level?
        if prev_level > 0 and level > prev_level + 1:
            issues.append(f"⚠️ Level jump H{prev_level} → H{level} at line {h['line']}: '{h['text'][:40]}'")
        prev_level = level
    
    # 3. Analyze passages (sections under H1/H2)
    passages = []
    current_h1_h2 = None
    passage_lines = []
    
    for i, h in enumerate(headings):
        if h['level'] <= 2:
            # Start new passage
            if current_h1_h2 is not None and passage_lines:
                passages.append({
                    'heading': current_h1_h2,
                    'lines': passage_lines
                })
            current_h1_h2 = h
            passage_lines = []
        passage_lines.append(h['line'])
    
    if current_h1_h2 and passage_lines:
        passages.append({
            'heading': current_h1_h2,
            'lines': passage_lines
        })
    
    # 4. Get paragraph text for each passage
    passage_analysis = []
    for p in passages:
        heading = p['heading']
        h_line = heading['line']
        next_h_line = 99999
        
        # Find next H1/H2
        for h in headings:
            if h['line'] > h_line and h['level'] <= 2:
                next_h_line = h['line']
                break
        
        # Collect paragraphs in this section
        section_text = []
        first_sentence = None
        subject_found = False
        city_found = False
        
        for para in paragraphs:
            if h_line < para['line'] < next_h_line:
                section_text.append(para['text'])
                if not first_sentence:
                    # Extract first sentence
                    sentences = re.split(r'[.!?]+', para['text'])
                    if sentences[0]:
                        first_sentence = sentences[0].strip()
                        words = len(first_sentence.split())
                        if words > 25:
                            issues.append(f"⚠️ Long first sentence ({words} words) under H{heading['level']}: '{first_sentence[:50]}...'")
                        
                        # Check for subject & city
                        text_lower = first_sentence.lower()
                        if any(company in first_sentence for company in ['aquatech', 'direct waterproofing', 'classic', 'rcc', 'city wide', 'dryshield', 'royal work', 'canada waterproofers']):
                            subject_found = True
                        if 'toronto' in text_lower or 'gta' in text_lower:
                            city_found = True
        
        total_words = sum(p['word_count'] for p in paragraphs if h_line < p['line'] < next_h_line)
        
        passage_analysis.append({
            'heading': heading,
            'word_count': total_words,
            'first_sentence_words': len(first_sentence.split()) if first_sentence else 0,
            'subject_in_first': subject_found,
            'city_in_first': city_found,
            'is_question': first_sentence.strip().endswith('?') if first_sentence else False,
            'first_sentence': first_sentence
        })
        
        if total_words == 0:
            issues.append(f"⚠️ Empty section: H{heading['level']} '{heading['text'][:40]}'")
        elif total_words > 300:
            issues.append(f"⚠️ Too long ({total_words} words): H{heading['level']} '{heading['text'][:40]}'")
        elif total_words < 40 and heading['level'] == 2:
            issues.append(f"⚠️ Too short ({total_words} words): H{heading['level']} '{heading['text'][:40]}'")
    
    # 5. Check for question headings
    question_count = sum(1 for p in passage_analysis if p['is_question'])
    
    return {
        'file': filepath,
        'h1_count': h1_count,
        'total_headings': len(headings),
        'heading_structure': structure,
        'passages': passage_analysis,
        'question_count': question_count,
        'issues': issues,
        'paragraph_count': len(paragraphs)
    }

# Main
html_files = [
    'index.html',
    'faq.html',
    'about.html',
    'contact.html'
]

for fname in html_files:
    if not os.path.exists(fname):
        continue
    
    print(f"\n{'='*70}")
    print(f"📄 {fname}")
    print(f"{'='*70}")
    
    result = analyze_file(fname)
    
    print(f"\n📊 Summary:")
    print(f"  H1 count: {result['h1_count']}")
    print(f"  Total headings: {result['total_headings']}")
    print(f"  H1/H2 passages: {len(result['passages'])}")
    print(f"  Paragraphs: {result['paragraph_count']}")
    print(f"  Question headings: {result['question_count']}")
    
    print(f"\n📋 Heading structure:")
    for line in result['heading_structure']:
        print(f"  {line}")
    
    print(f"\n📝 Passages:")
    for i, p in enumerate(result['passages'], 1):
        h = p['heading']
        print(f"\n  {i}. H{h['level']}: {h['text'][:60]}")
        print(f"     Words: {p['word_count']}")
        print(f"     First sentence: {p['first_sentence'][:70] if p['first_sentence'] else 'N/A'}...")
        print(f"     First sentence words: {p['first_sentence_words']}")
        print(f"     Subject mentioned: {'✅' if p['subject_in_first'] else '❌'}")
        print(f"     City mentioned: {'✅' if p['city_in_first'] else '❌'}")
        print(f"     Is question: {'✅' if p['is_question'] else '❌'}")
    
    if result['issues']:
        print(f"\n⚠️ Issues:")
        for issue in result['issues']:
            print(f"  {issue}")
    else:
        print(f"\n✅ No issues found")
