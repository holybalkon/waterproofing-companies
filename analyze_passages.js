#!/usr/bin/env node
/**
 * Analyze passage structure for AI Readiness audit (Group B).
 * Checks: heading hierarchy, passage containment, answer-first, Q&A surface.
 */

const fs = require('fs');
const path = require('path');

function analyzeFile(filepath) {
  const html = fs.readFileSync(filepath, 'utf-8');
  
  // Parse HTML
  let headings = [];
  let paragraphs = [];
  
  // Simple regex-based parsing (no JSDOM needed)
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gi;
  
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2]
      .replace(/<[^>]*>/g, '') // Remove tags
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .trim();
    
    if (text.length > 3) {
      headings.push({
        level,
        text,
        pos: match.index
      });
    }
  }
  
  while ((match = paragraphRegex.exec(html)) !== null) {
    let text = match[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&nbsp;/g, ' ')
      .replace(/&[a-z]+;/g, ' ')
      .trim();
    
    // Remove <li> artifacts
    text = text.replace(/^[\s•-]+/, '');
    
    if (text.length > 10) {
      paragraphs.push({
        text,
        pos: match.index,
        wordCount: text.split(/\s+/).length
      });
    }
  }
  
  const issues = [];
  const structure = [];
  
  // 1. Count H1
  const h1Count = headings.filter(h => h.level === 1).length;
  if (h1Count === 0) {
    issues.push('❌ No H1 found');
  } else if (h1Count > 1) {
    issues.push(`❌ Multiple H1 (${h1Count})`);
  }
  
  // 2. Check hierarchy
  let prevLevel = 0;
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    structure.push(`${'  '.repeat(h.level - 1)}H${h.level}: ${h.text.slice(0, 60)}`);
    
    if (prevLevel > 0 && h.level > prevLevel + 1) {
      issues.push(`⚠️ Level jump H${prevLevel} → H${h.level}: "${h.text.slice(0, 40)}"`);
    }
    prevLevel = h.level;
  }
  
  // 3. Build passages (H1/H2 sections)
  const passages = [];
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    if (h.level > 2) continue; // Skip H3+ for passage boundary
    
    const nextHeadingPos = i + 1 < headings.length ? headings[i + 1].pos : html.length;
    
    // Collect paragraphs between this heading and next H1/H2
    let sectionText = [];
    let firstSentence = null;
    
    for (const p of paragraphs) {
      if (p.pos > h.pos && p.pos < nextHeadingPos) {
        sectionText.push(p.text);
        if (!firstSentence) {
          const sentences = p.text.split(/[.!?]+/);
          if (sentences[0]) {
            firstSentence = sentences[0].trim();
          }
        }
      }
    }
    
    const totalWords = sectionText.reduce((sum, s) => sum + s.split(/\s+/).length, 0);
    const firstSentenceWords = firstSentence ? firstSentence.split(/\s+/).length : 0;
    
    // Check subject & city
    const subjectKeywords = ['aquatech', 'direct waterproofing', 'classic', 'rcc', 'city wide', 'dryshield', 'royal work', 'canada waterproofers'];
    const subjectFound = subjectKeywords.some(kw => firstSentence?.toLowerCase().includes(kw));
    const cityFound = firstSentence?.toLowerCase().includes('toronto') || firstSentence?.toLowerCase().includes('gta');
    
    passages.push({
      heading: h,
      totalWords,
      firstSentence,
      firstSentenceWords,
      subjectFound,
      cityFound,
      isQuestion: firstSentence?.trim().endsWith('?') || false
    });
    
    // Check issues
    if (totalWords === 0) {
      issues.push(`⚠️ Empty section: H${h.level} "${h.text.slice(0, 40)}"`);
    } else if (totalWords > 300) {
      issues.push(`⚠️ Too long (${totalWords} words): H${h.level} "${h.text.slice(0, 40)}"`);
    } else if (totalWords < 40 && h.level === 2) {
      issues.push(`⚠️ Too short (${totalWords} words): H${h.level} "${h.text.slice(0, 40)}"`);
    }
    
    if (firstSentenceWords > 25) {
      issues.push(`⚠️ Long first sentence (${firstSentenceWords} words): H${h.level} "${firstSentence?.slice(0, 50)}"`);
    }
  }
  
  const questionCount = passages.filter(p => p.isQuestion).length;
  
  return {
    file: path.basename(filepath),
    h1Count,
    totalHeadings: headings.length,
    structure,
    passages,
    questionCount,
    issues,
    paragraphCount: paragraphs.length
  };
}

// Main
const htmlFiles = ['index.html', 'faq.html', 'about.html', 'contact.html'];

for (const fname of htmlFiles) {
  if (!fs.existsSync(fname)) continue;
  
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${fname}`);
  console.log(`${'='.repeat(70)}`);
  
  const result = analyzeFile(fname);
  
  console.log(`\n📊 Summary:`);
  console.log(`  H1 count: ${result.h1Count}`);
  console.log(`  Total headings: ${result.totalHeadings}`);
  console.log(`  H1/H2 passages: ${result.passages.length}`);
  console.log(`  Paragraphs: ${result.paragraphCount}`);
  console.log(`  Question headings: ${result.questionCount}`);
  
  console.log(`\n📋 Heading structure:`);
  result.structure.forEach(line => console.log(`  ${line}`));
  
  console.log(`\n📝 Passages:`);
  result.passages.forEach((p, i) => {
    const h = p.heading;
    console.log(`\n  ${i + 1}. H${h.level}: ${h.text.slice(0, 60)}`);
    console.log(`     Words: ${p.totalWords}`);
    console.log(`     First sentence: ${p.firstSentence?.slice(0, 70) || 'N/A'}...`);
    console.log(`     First sentence words: ${p.firstSentenceWords}`);
    console.log(`     Subject: ${p.subjectFound ? '✅' : '❌'}`);
    console.log(`     City: ${p.cityFound ? '✅' : '❌'}`);
    console.log(`     Is Q: ${p.isQuestion ? '✅' : '❌'}`);
  });
  
  if (result.issues.length > 0) {
    console.log(`\n⚠️ Issues (${result.issues.length}):`);
    result.issues.forEach(issue => console.log(`  ${issue}`));
  } else {
    console.log(`\n✅ No issues found`);
  }
}
