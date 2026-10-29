#!/usr/bin/env node
/**
 * Analyze passage structure for AI Readiness audit (Group B, C, D).
 * Checks: heading hierarchy, passage containment, city mentions, schema.
 */

const fs = require('fs');
const path = require('path');

// Strip HTML tags, keep text
function stripHtml(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Parse HTML for headings and paragraphs
function parseHTML(html) {
  const headings = [];
  const paragraphs = [];
  let currentHeading = null;
  let currentParagraph = '';
  
  // Simple regex-based parsing (not perfect, but good enough)
  const headingRegex = /<h([1-6])(?:\s[^>]*)?>([^<]*)<\/h\1>/gi;
  const paragraphRegex = /<p(?:\s[^>]*)?>([^<]*(?:<[^>]*>[^<]*)*)<\/p>/gi;
  
  let match;
  
  // Extract headings
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = stripHtml(match[2]).substring(0, 200);
    headings.push({
      level,
      text,
      index: match.index
    });
  }
  
  // Extract paragraphs
  while ((match = paragraphRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]).trim();
    if (text.length > 10) {
      paragraphs.push({
        text,
        index: match.index,
        words: text.split(/\s+/).length
      });
    }
  }
  
  return { headings, paragraphs };
}

// Extract JSON-LD schemas
function extractSchemas(html) {
  const schemas = [];
  const regex = /<script\s+type="application\/ld\+json"[^>]*>([^<]*)<\/script>/gi;
  let match;
  
  while ((match = regex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1]);
      schemas.push(json);
    } catch (e) {
      schemas.push({ error: e.message });
    }
  }
  
  return schemas;
}

// Analyze passages in a section
function analyzePassages(headings, paragraphs) {
  const passages = [];
  
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    if (heading.level > 2) continue; // Only H1/H2
    
    const nextHeadingIndex = headings.findIndex((h, idx) => idx > i && h.level <= 2);
    const nextHeadingPos = nextHeadingIndex >= 0 ? headings[nextHeadingIndex].index : Infinity;
    
    // Get paragraphs in this section
    const sectionParagraphs = paragraphs.filter(p =>
      p.index > heading.index && p.index < nextHeadingPos
    );
    
    let firstSentence = '';
    if (sectionParagraphs.length > 0) {
      const firstPara = sectionParagraphs[0].text;
      firstSentence = firstPara.split(/[.!?]/)[0].trim();
    }
    
    const totalWords = sectionParagraphs.reduce((sum, p) => sum + p.words, 0);
    const cityMentions = (sectionParagraphs.map(p => p.text).join(' ') || '').match(/toronto|gta|scarborough|mississauga|brampton/gi) || [];
    const isQuestion = heading.text.endsWith('?');
    
    passages.push({
      heading: heading.text,
      level: heading.level,
      totalWords,
      firstSentence,
      firstSentenceWords: firstSentence.split(/\s+/).length,
      cityCount: cityMentions.length,
      isQuestion,
      hasSubject: /aquatech|waterproofing|direct|classic|city wide/i.test(firstSentence)
    });
  }
  
  return passages;
}

// Analyze a file
function analyzeFile(filename) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${filename}`);
  console.log(`${'='.repeat(70)}`);
  
  const html = fs.readFileSync(filename, 'utf-8');
  const { headings, paragraphs } = parseHTML(html);
  const schemas = extractSchemas(html);
  const passages = analyzePassages(headings, paragraphs);
  
  const h1Count = headings.filter(h => h.level === 1).length;
  const h2Count = headings.filter(h => h.level === 2).length;
  const questionCount = passages.filter(p => p.isQuestion).length;
  
  // Check title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'N/A';
  
  // Check for em-dash
  const hasEmDash = /–/.test(title) || /—/.test(title);
  
  // Check for FAQPage schema
  const hasFaqSchema = schemas.some(s => s['@type'] === 'FAQPage' || (s['@graph'] && s['@graph'].some(g => g['@type'] === 'FAQPage')));
  
  // Check for phone link
  const hasPhoneLink = /<a\s+href="tel:/.test(html);
  
  const issues = [];
  
  // B issues
  if (h1Count === 0) issues.push('❌ B: No H1 found');
  if (h1Count > 1) issues.push(`❌ B: Multiple H1 (${h1Count})`);
  if (h2Count < 3) issues.push(`⚠️ B1: Only ${h2Count} H2 (want 6–8)`);
  if (passages.length === 0) issues.push('❌ B: No passages detected');
  if (questionCount === 0 && h2Count > 0) issues.push(`⚠️ B5: No question headings (${h2Count} H2 total)`);
  if (!hasFaqSchema && h2Count > 0) issues.push('⚠️ B5: No FAQPage JSON-LD schema');
  
  passages.forEach((p, i) => {
    if (p.firstSentenceWords > 25) {
      issues.push(`⚠️ B3: First sentence too long (${p.firstSentenceWords} words) in "${p.heading.substring(0, 40)}"`);
    }
    if (p.totalWords < 40 && p.level === 2) {
      issues.push(`⚠️ B1: Passage too short (${p.totalWords} words) "${p.heading.substring(0, 40)}"`);
    }
    if (p.totalWords > 300) {
      issues.push(`⚠️ B4: Passage too long (${p.totalWords} words) "${p.heading.substring(0, 40)}"`);
    }
    if (!p.hasSubject && p.level === 2) {
      issues.push(`⚠️ B2: Subject not in first sentence "${p.heading.substring(0, 40)}": "${p.firstSentence.substring(0, 40)}"`);
    }
    if (p.cityCount === 0 && p.level === 2) {
      issues.push(`⚠️ D4: City not mentioned in "${p.heading.substring(0, 40)}"`);
    }
  });
  
  // C issues
  const titleHasCity = /toronto|gta/i.test(title);
  const titleHasBrand = /top waterproofing|aquatech/i.test(title);
  if (!titleHasCity) issues.push('⚠️ C3: City not in title');
  if (!titleHasBrand) issues.push('⚠️ C3: Brand not in title');
  if (hasEmDash) issues.push('⚠️ C/D: Em-dash in title (use regular dash)');
  if (!hasPhoneLink) issues.push('⚠️ C: No visible phone link (tel:)');
  
  // Schema C4
  const schemaTypes = schemas.map(s => s['@type'] || (s['@graph'] ? 'Graph' : 'Unknown')).join(', ');
  if (!schemaTypes.includes('FAQPage') && h2Count > 3) {
    issues.push('⚠️ C4: No FAQPage schema for Q&A content');
  }
  if (!schemaTypes.includes('Article') && !schemaTypes.includes('WebPage')) {
    issues.push('⚠️ C4: Missing Article or WebPage schema');
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`  Title: "${title}"`);
  console.log(`  H1 count: ${h1Count}`);
  console.log(`  H2 count: ${h2Count}`);
  console.log(`  Total headings: ${headings.length}`);
  console.log(`  Passages (H1/H2): ${passages.length}`);
  console.log(`  Paragraphs: ${paragraphs.length}`);
  console.log(`  Question headings: ${questionCount}/${h2Count}`);
  console.log(`  Schema types: ${schemaTypes}`);
  console.log(`  Has phone link: ${hasPhoneLink ? '✅' : '❌'}`);
  console.log(`  Has FAQPage: ${hasFaqSchema ? '✅' : '❌'}`);
  
  console.log(`\n📝 Passages:`);
  passages.forEach((p, i) => {
    console.log(`\n  ${i + 1}. H${p.level}: "${p.heading}"`);
    console.log(`     Words: ${p.totalWords} | Question: ${p.isQuestion ? '✅' : '❌'}`);
    console.log(`     First sentence (${p.firstSentenceWords} words): "${p.firstSentence.substring(0, 70)}${p.firstSentence.length > 70 ? '...' : ''}"`);
    console.log(`     Subject: ${p.hasSubject ? '✅' : '❌'} | City mentions: ${p.cityCount}`);
  });
  
  if (issues.length > 0) {
    console.log(`\n⚠️ Issues found (${issues.length}):`);
    issues.forEach(issue => console.log(`  ${issue}`));
  } else {
    console.log(`\n✅ No critical issues found`);
  }
  
  return { issues: issues.length, passages: passages.length };
}

// Main
const files = ['index.html', 'faq.html', 'about.html', 'contact.html'];
let totalIssues = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    const result = analyzeFile(file);
    totalIssues += result.issues;
  }
}

console.log(`\n${'='.repeat(70)}`);
console.log(`📋 TOTAL ISSUES ACROSS ALL FILES: ${totalIssues}`);
console.log(`${'='.repeat(70)}\n`);
