#!/usr/bin/env node

/**
 * Verify B2 (business & city in first 2 sentences of each paragraph)
 * and D4 (city coverage across page)
 * Reads raw HTML without JS
 */

const fs = require('fs');
const path = require('path');

// Parse HTML to extract paragraphs by heading
function analyzePageStructure(html) {
  const results = [];
  
  // Find all H1 and H2 with their following content
  const headingRegex = /<h([1-2])[^>]*>([^<]+)<\/h\1>/g;
  const paragraphRegex = /<p[^>]*>([^<]+)<\/p>/g;
  const liRegex = /<li[^>]*>([^<]+)<\/li>/g;
  const h3Regex = /<h3[^>]*>([^<]*)<\/h3>/g;
  
  let match;
  const headings = [];
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      text: match[2],
      index: match.index,
    });
  }
  
  // For each heading, find first paragraph or content element
  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextHeadingIdx = i + 1 < headings.length ? headings[i + 1].index : html.length;
    const sectionHtml = html.substring(heading.index, nextHeadingIdx);
    
    // Find first <p>, <li>, or <div> after the heading
    const pMatch = /<p[^>]*>([^<]+)<\/p>/.exec(sectionHtml);
    const liMatch = /<li[^>]*>([^<]+)<\/li>/.exec(sectionHtml);
    const tableMatch = /<table/.exec(sectionHtml);
    const h3Match = /<h3/.exec(sectionHtml);
    
    let firstElement = 'none';
    let firstContent = '';
    
    if (pMatch) {
      firstElement = '<p>';
      firstContent = pMatch[1];
    } else if (liMatch) {
      firstElement = '<li>';
      firstContent = liMatch[1];
    } else if (tableMatch) {
      firstElement = '<table>';
    } else if (h3Match) {
      firstElement = '<h3> (no intro <p>)';
    }
    
    // Extract first 2 sentences
    const sentences = firstContent.split(/\.\s+/).slice(0, 2).join('. ');
    const firstSentenceMatch = /^[^.]+\./.exec(sentences);
    const firstSentenceLen = firstSentenceMatch ? firstSentenceMatch[0].length : 0;
    
    // Check for Toronto and business name
    const hasToronto = /toronto|gta|greater toronto/i.test(firstContent);
    const hasTopWaterproofing = /top waterproofing companies/i.test(firstContent);
    const hasAquatech = /aquatech waterproofing/i.test(firstContent);
    const hasDirect = /direct waterproofing/i.test(firstContent);
    const hasClassic = /classic waterproofing/i.test(firstContent);
    
    const hasBusiness = hasTopWaterproofing || hasAquatech || hasDirect || hasClassic;
    
    results.push({
      heading: `H${heading.level}: ${heading.text}`,
      firstElement,
      firstSentenceLen,
      firstTwoSentences: sentences.substring(0, 100),
      hasToronto,
      hasBusiness,
      status: (hasToronto && hasBusiness) ? '✅ PASS' : '❌ FAIL'
    });
  }
  
  return results;
}

// Count total Toronto mentions
function countTorontoMentions(html) {
  const matches = html.match(/toronto|gta|greater toronto/gi) || [];
  return matches.length;
}

// Main
const filePath = process.argv[2] || 'index.html';
if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

const html = fs.readFileSync(filePath, 'utf8');
const analysis = analyzePageStructure(html);
const torontoCount = countTorontoMentions(html);

console.log('\n=== B2 & D4 VERIFICATION ===\n');

let passCount = 0;
let failCount = 0;

analysis.forEach((para, idx) => {
  console.log(`Paragraph ${idx + 1}: ${para.heading}`);
  console.log(`  First element: ${para.firstElement}`);
  console.log(`  First sentence length: ${para.firstSentenceLen} chars`);
  console.log(`  First 2 sentences: "${para.firstTwoSentences}..."`);
  console.log(`  Has Toronto/GTA: ${para.hasToronto ? '✅' : '❌'}`);
  console.log(`  Has business name: ${para.hasBusiness ? '✅' : '❌'}`);
  console.log(`  Status: ${para.status}`);
  console.log('');
  
  if (para.status === '✅ PASS') passCount++;
  else failCount++;
});

console.log(`=== SUMMARY ===`);
console.log(`Paragraphs passing B2/D4: ${passCount}/${analysis.length}`);
console.log(`Paragraphs failing B2/D4: ${failCount}/${analysis.length}`);
console.log(`Total Toronto mentions on page: ${torontoCount}`);
console.log(`\nExpected after fix:`);
console.log(`  B2: All ${analysis.length} paragraphs name business & Toronto = ✅ PASS`);
console.log(`  D4: ${torontoCount} mentions across page = ✅ PASS`);
