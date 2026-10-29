#!/usr/bin/env node
/**
 * Full audit: B (Passage), C (Entity), D (Citability)
 * Checks: headings, passages, JSON-LD validity, on-page identity, local proof
 */

const fs = require('fs');
const path = require('path');

function analyzeFile(filepath) {
  const html = fs.readFileSync(filepath, 'utf-8');
  
  const result = {
    file: path.basename(filepath),
    issues: []
  };
  
  // 1. Title & H1
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const h1Match = html.match(/<h1[^>]*>(.*?)<\/h1>/i);
  
  const title = titleMatch ? titleMatch[1].trim() : 'MISSING';
  const h1 = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : 'MISSING';
  
  result.title = title;
  result.h1 = h1;
  
  // Check for brand, city in title/H1
  const hasBrand = title.includes('Aquatech') || title.includes('Top Waterproofing');
  const hasCity = title.includes('Toronto') || title.includes('GTA') || title.match(/\b(Toronto|GTA)\b/i);
  const hasPhone = html.match(/tel:\+?[\d-()]+/i);
  
  if (!hasBrand && filepath.endsWith('index.html')) {
    result.issues.push('⚠️ C3: No brand in title');
  }
  if (!hasCity) {
    result.issues.push('⚠️ C3: No city in title');
  }
  if (!hasPhone) {
    result.issues.push('❌ C3: No visible phone (tel: link)');
  }
  
  // 2. Headings
  const headingRegex = /<h([1-6])[^>]*>(.*?)<\/h\1>/gi;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, '').trim();
    if (text.length > 3) headings.push({ level, text });
  }
  
  result.h1Count = headings.filter(h => h.level === 1).length;
  result.h2Count = headings.filter(h => h.level === 2).length;
  result.totalHeadings = headings.length;
  
  // Check hierarchy
  let prevLevel = 0;
  for (const h of headings) {
    if (prevLevel > 0 && h.level > prevLevel + 1) {
      result.issues.push(`⚠️ B1: Level jump H${prevLevel} → H${h.level}`);
    }
    prevLevel = h.level;
  }
  
  if (result.h1Count !== 1) {
    result.issues.push(`❌ B1: H1 count = ${result.h1Count} (expect 1)`);
  }
  
  // 3. Passages (H2)
  const paragraphRegex = /<p[^>]*>(.*?)<\/p>/gi;
  const paragraphs = [];
  while ((match = paragraphRegex.exec(html)) !== null) {
    let text = match[1]
      .replace(/<[^>]*>/g, '')
      .replace(/&[a-z]+;/g, ' ')
      .trim();
    if (text.length > 10) {
      paragraphs.push(text);
    }
  }
  
  result.paragraphCount = paragraphs.length;
  result.avgParagraphLength = paragraphs.length > 0 
    ? Math.round(paragraphs.reduce((s, p) => s + p.split(/\s+/).length, 0) / paragraphs.length) 
    : 0;
  
  // 4. Questions in headings
  const questionHeadings = headings.filter(h => h.text.trim().endsWith('?')).length;
  result.questionHeadings = questionHeadings;
  
  if (questionHeadings === 0 && result.h2Count > 0) {
    result.issues.push(`⚠️ B5: No question headings (H2: ${result.h2Count})`);
  }
  
  // 5. JSON-LD
  const schemaRegex = /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gis;
  const schemas = [];
  while ((match = schemaRegex.exec(html)) !== null) {
    try {
      const json = JSON.parse(match[1].trim());
      schemas.push(json);
    } catch (e) {
      result.issues.push(`❌ Invalid JSON-LD: ${e.message.slice(0, 30)}`);
    }
  }
  
  result.schemaCount = schemas.length;
  
  // Find LocalBusiness/Organization
  let localBusiness = null;
  for (const schema of schemas) {
    if (schema['@type'] === 'LocalBusiness' || schema['@type'] === 'Organization') {
      localBusiness = schema;
      break;
    }
  }
  
  if (localBusiness) {
    result.schemaName = localBusiness.name || 'MISSING';
    result.schemaPhone = localBusiness.telephone ? '✅' : '❌';
    result.schemaAddress = localBusiness.address ? '✅' : '❌';
    result.schemaId = localBusiness['@id'] ? '✅' : '❌';
    result.schemaOpeningHours = localBusiness.openingHoursSpecification ? '✅' : '❌';
    
    if (!localBusiness['@id']) result.issues.push('❌ C1: Missing @id in schema');
    if (!localBusiness.telephone) result.issues.push('❌ C1: Missing telephone in schema');
    if (!localBusiness.openingHoursSpecification) result.issues.push('⚠️ C1: Missing openingHoursSpecification');
  }
  
  // 6. FAQPage schema
  let faqSchema = null;
  for (const schema of schemas) {
    if (schema['@type'] === 'FAQPage') {
      faqSchema = schema;
      break;
    }
  }
  
  if (faqSchema) {
    const faqQuestions = faqSchema.mainEntity ? faqSchema.mainEntity.length : 0;
    result.faqSchemaQuestions = faqQuestions;
    
    if (questionHeadings !== faqQuestions) {
      result.issues.push(`⚠️ B5/FAQPage mismatch: ${questionHeadings} headings vs ${faqQuestions} schema`);
    }
  }
  
  // 7. Local proof (city mentions in paragraphs)
  const cityMentions = paragraphs.filter(p => 
    p.toLowerCase().includes('toronto') || p.toLowerCase().includes('gta')
  ).length;
  
  result.cityMentions = cityMentions;
  if (cityMentions === 0 && result.file === 'index.html') {
    result.issues.push('❌ D4: No city mentions in paragraphs');
  }
  
  // 8. Long tires check
  if (title.includes('–') || title.includes('—')) {
    result.issues.push('⚠️ Title contains em-dash or en-dash (check standard)');
  }
  
  // 9. Internal notes
  if (html.includes('[ПОТРІБНО') || html.includes('TODO') || html.includes('lorem ipsum')) {
    result.issues.push('❌ Contains internal notes or placeholders');
  }
  
  return result;
}

// Main
const htmlFiles = ['index.html', 'faq.html', 'about.html', 'contact.html'];
const results = [];

console.log(`\n${'='.repeat(80)}\n📊 FULL AUDIT: B (Passage) + C (Entity) + D (Citability)\n${'='.repeat(80)}\n`);

for (const fname of htmlFiles) {
  if (!fs.existsSync(fname)) continue;
  
  const r = analyzeFile(fname);
  results.push(r);
  
  console.log(`📄 ${r.file}`);
  console.log(`   Title: ${r.title.slice(0, 70)}`);
  console.log(`   H1: ${r.h1.slice(0, 70)}`);
  console.log(`   H1 count: ${r.h1Count}, H2 count: ${r.h2Count}, Total: ${r.totalHeadings}`);
  console.log(`   Paragraphs: ${r.paragraphCount}, Avg length: ${r.avgParagraphLength} words`);
  console.log(`   Question headings: ${r.questionHeadings}`);
  console.log(`   City mentions in text: ${r.cityMentions}`);
  console.log(`   Schema count: ${r.schemaCount}`);
  
  if (r.schemaName) {
    console.log(`   LocalBusiness: ${r.schemaName}`);
    console.log(`     - Phone: ${r.schemaPhone}, Address: ${r.schemaAddress}, @id: ${r.schemaId}, OpeningHrs: ${r.schemaOpeningHours}`);
  }
  
  if (r.faqSchemaQuestions) {
    console.log(`   FAQPage: ${r.faqSchemaQuestions} questions`);
  }
  
  if (r.issues.length > 0) {
    console.log(`   ⚠️ Issues:`);
    r.issues.forEach(issue => console.log(`      ${issue}`));
  } else {
    console.log(`   ✅ No issues`);
  }
  
  console.log();
}

// Summary
console.log(`${'='.repeat(80)}\n📋 SUMMARY\n${'='.repeat(80)}\n`);

const allIssues = results.flatMap(r => r.issues);
console.log(`Total issues across all pages: ${allIssues.length}`);
console.log(`Critical (❌): ${allIssues.filter(i => i.startsWith('❌')).length}`);
console.log(`Warning (⚠️): ${allIssues.filter(i => i.startsWith('⚠️')).length}`);
