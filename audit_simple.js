#!/usr/bin/env node
/**
 * Simple passage audit - reads raw HTML and extracts H1/H2 + following <p> text
 */

const fs = require('fs');

function analyzeFile(filename) {
  console.log(`\n${'='.repeat(70)}`);
  console.log(`📄 ${filename}`);
  console.log(`${'='.repeat(70)}`);
  
  const html = fs.readFileSync(filename, 'utf-8');
  
  // Extract title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1] : 'N/A';
  console.log(`📋 Title: "${title}"`);
  
  // Extract H1
  const h1Matches = Array.from(html.matchAll(/<h1[^>]*>([^<]+)<\/h1>/gi));
  console.log(`📊 H1 count: ${h1Matches.length}`);
  h1Matches.forEach(m => console.log(`   "${m[1]}"`));
  
  // Extract all H2 + following <p> pairs
  const h2Matches = Array.from(html.matchAll(/<h2[^>]*>([^<]+)<\/h2>\s*<p[^>]*>([^<]*)/gi));
  console.log(`📊 H2 count: ${h2Matches.length}`);
  console.log(`📊 Question headings: ${h2Matches.filter(m => m[1].includes('?')).length}/${h2Matches.length}`);
  
  let totalWords = 0;
  let issues = [];
  
  h2Matches.forEach((match, idx) => {
    const heading = match[1];
    const firstParaText = match[2] || '';
    
    // Count words in all <p> tags after this H2 until next H2
    const afterH2Idx = match.index + match[0].length;
    const nextH2Idx = html.indexOf('<h2', afterH2Idx);
    const endIdx = nextH2Idx > 0 ? nextH2Idx : html.length;
    const sectionHTML = html.substring(afterH2Idx, endIdx);
    
    const pMatches = Array.from(sectionHTML.matchAll(/<p[^>]*>([^<]*)<\/p>/gi));
    const sectionText = pMatches.map(p => p[1]).join(' ');
    const wordCount = sectionText.split(/\s+/).filter(w => w.length > 0).length;
    const firstSentence = sectionText.split(/[.!?]/)[0].trim();
    const firstSentenceWords = firstSentence.split(/\s+/).filter(w => w.length > 0).length;
    
    totalWords += wordCount;
    const isQuestion = heading.includes('?');
    const hasCity = /toronto|gta|scarborough|mississauga/i.test(sectionText);
    const hasSubject = /top waterproofing|aquatech|direct|classic|rcc|city wide|dryshield|royal|canada waterproof/i.test(firstSentence);
    
    console.log(`\n  ${idx + 1}. H2: "${heading}"`);
    console.log(`     Words: ${wordCount} | Question: ${isQuestion ? '✅' : '❌'}`);
    console.log(`     First (${firstSentenceWords}w): "${firstSentence.substring(0, 70)}${firstSentence.length > 70 ? '...' : ''}"`);
    console.log(`     Subject: ${hasSubject ? '✅' : '❌'} | City: ${hasCity ? '✅' : '❌'}`);
    
    if (firstSentenceWords > 25) issues.push(`⚠ B3: Long first sentence (${firstSentenceWords}w) in H2 #${idx + 1}`);
    if (wordCount > 250) issues.push(`⚠ B4: Section too long (${wordCount}w) H2 #${idx + 1}`);
    if (wordCount < 40 && wordCount > 0) issues.push(`⚠ B1: Section too short (${wordCount}w) H2 #${idx + 1}`);
    if (!hasSubject && idx > 0) issues.push(`⚠ B2: No subject in first sent H2 #${idx + 1}`);
    if (!hasCity && idx > 0) issues.push(`⚠ D4: No city mentioned H2 #${idx + 1}`);
  });
  
  // Check schema
  const hasGraph = html.includes('"@graph"');
  const hasFAQPage = /FAQPage/.test(html);
  const hasPhone = /<a\s+href="tel:/.test(html);
  
  console.log(`\n📋 Schema & Contact:`);
  console.log(`   @graph: ${hasGraph ? '✅' : '❌'}`);
  console.log(`   FAQPage: ${hasFAQPage ? '✅' : '❌'}`);
  console.log(`   Phone link: ${hasPhone ? '✅' : '❌'}`);
  
  if (h1Matches.length === 0) issues.push('❌ No H1 found');
  if (h1Matches.length > 1) issues.push(`❌ Multiple H1 (${h1Matches.length})`);
  if (h2Matches.filter(m => m[1].includes('?')).length === 0 && h2Matches.length > 0) {
    issues.push('⚠ B5: No question headings');
  }
  if (!hasFAQPage && h2Matches.length > 3) issues.push('⚠ B5: No FAQPage schema');
  if (!hasGraph) issues.push('⚠ C4: No @graph schema');
  
  if (issues.length > 0) {
    console.log(`\n⚠ Issues (${issues.length}):`);
    issues.forEach(i => console.log(`  ${i}`));
  } else {
    console.log(`\n✅ No critical issues`);
  }
  
  return issues.length;
}

// Main
const files = ['index.html', 'faq.html', 'about.html', 'contact.html'];
let totalIssues = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    totalIssues += analyzeFile(file);
  }
}

console.log(`\n${'='.repeat(70)}`);
console.log(`📋 TOTAL ISSUES: ${totalIssues}`);
console.log(`${'='.repeat(70)}\n`);
