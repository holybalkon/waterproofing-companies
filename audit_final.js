#!/usr/bin/env node
/**
 * Final audit for A5/B2/B4/C2/C3/D4 issues
 */

const fs = require('fs');
const path = require('path');

console.log(`\n${'='.repeat(70)}\n📊 FINAL AUDIT: A5/B2/B4/C2/C3/D4\n${'='.repeat(70)}`);

// 1. Check sitemap.xml
console.log(`\n📄 A5 - Sitemap & Robots`);
const hasSitemap = fs.existsSync('sitemap.xml');
const hasRobots = fs.existsSync('robots.txt');
console.log(`   Sitemap.xml: ${hasSitemap ? '✅' : '❌'}`);
console.log(`   Robots.txt: ${hasRobots ? '✅' : '❌'}`);

if (hasSitemap) {
  const sitemapContent = fs.readFileSync('sitemap.xml', 'utf-8');
  const isValidXML = sitemapContent.includes('<?xml') && sitemapContent.includes('</urlset>');
  const urlCount = (sitemapContent.match(/<loc>/g) || []).length;
  console.log(`   Valid XML: ${isValidXML ? '✅' : '❌'}`);
  console.log(`   URLs in sitemap: ${urlCount}`);
}

// 2. Check index.html for C2/C3/B4
console.log(`\n📄 index.html Structure`);
const html = fs.readFileSync('index.html', 'utf-8');

// C3: Title & H1
const titleMatch = html.match(/<title>([^<]+)<\/title>/);
const h1Match = html.match(/<h1>([^<]+)<\/h1>/);
const title = titleMatch ? titleMatch[1] : 'N/A';
const h1 = h1Match ? h1Match[1] : 'N/A';

console.log(`   Title: "${title}"`);
console.log(`   H1: "${h1}"`);
console.log(`   C3 - Title has brand: ${title.includes('Top Waterproofing') ? '✅' : '❌'}`);
console.log(`   C3 - Title has city: ${title.includes('Toronto') ? '✅' : '❌'}`);
console.log(`   C3 - H1 has city: ${h1.includes('Toronto') ? '✅' : '❌'}`);
console.log(`   C3 - H1 is clean (no dupe suffix): ${!h1.includes(' - ') ? '✅' : '⚠️'}`);

// C2: sameAs
const hasSameAs = html.includes('"sameAs"');
const sameAsCount = (html.match(/"sameAs":/g) || []).length;
console.log(`   C2 - sameAs present: ${hasSameAs ? '✅' : '❌'}`);
if (hasSameAs) {
  const sameAsMatch = html.match(/"sameAs":\s*\[([\s\S]*?)\]/);
  if (sameAsMatch) {
    const urls = (sameAsMatch[1].match(/https:\/\/[^"]+/g) || []);
    console.log(`   C2 - sameAs URLs: ${urls.length}`);
    urls.forEach(u => console.log(`      - ${u.substring(0, 50)}...`));
  }
}

// B4: Lists & Tables
const hasLists = /<[ou]l>|<li>/i.test(html);
const hasTables = /<table/i.test(html);
const listCount = (html.match(/<li>/gi) || []).length;
const tableCount = (html.match(/<table/gi) || []).length;

console.log(`   B4 - Ordered/Unordered Lists: ${hasLists ? '✅' : '❌'}`);
console.log(`   B4 - Tables: ${hasTables ? '✅' : '❌'}`);
console.log(`   B4 - List items: ${listCount}`);
console.log(`   B4 - Table count: ${tableCount}`);

// Check for caption
const hasCaption = /<caption>/i.test(html);
console.log(`   B4 - Table with caption: ${hasCaption ? '✅' : '❌'}`);

// B2/D4: City mentions
const pTexts = html.match(/<p[^>]*>([^<]*)<\/p>/g) || [];
const cityMatches = html.match(/toronto|gta/gi) || [];
console.log(`   B2/D4 - City mentions (Toronto/GTA): ${cityMatches.length}`);
console.log(`   B2/D4 - Paragraphs: ${pTexts.length}`);

// Check for brand name in text
const hasBrandInText = /top waterproofing companies/i.test(html);
console.log(`   B2 - Brand name in text: ${hasBrandInText ? '✅' : '❌'}`);

// 3. Schema
console.log(`\n📋 JSON-LD Schema`);
const hasGraph = /"@graph"/.test(html);
const hasOrganization = /"@type":\s*"Organization"/.test(html);
const hasFAQPage = /"@type":\s*"FAQPage"/.test(html);
console.log(`   @graph: ${hasGraph ? '✅' : '❌'}`);
console.log(`   Organization: ${hasOrganization ? '✅' : '❌'}`);
console.log(`   FAQPage: ${hasFAQPage ? '✅' : '❌'}`);

// Extract schema types
const schemaMatch = html.match(/"@type":\s*"([^"]+)"/g) || [];
const typeSet = new Set();
schemaMatch.forEach(m => {
  const type = m.match(/"@type":\s*"([^"]+)"/);
  if (type && type[1]) typeSet.add(type[1]);
});
console.log(`   Schema types: ${Array.from(typeSet).join(', ')}`);

// 4. Summary
console.log(`\n${'='.repeat(70)}`);
console.log(`📊 SUMMARY`);
console.log(`${'='.repeat(70)}`);

const issues = [];
if (!hasSitemap) issues.push('A5: sitemap.xml missing');
if (!hasRobots) issues.push('A5: robots.txt missing');
if (title.includes(' - ')) issues.push('C3: Title might have em-dash');
if (h1.includes(' - ')) issues.push('C3: H1 has dupe suffix or dash');
if (!hasSameAs) issues.push('C2: sameAs missing');
if (!hasLists && !hasTables) issues.push('B4: No lists or tables found');
if (listCount === 0 && tableCount === 0) issues.push('B4: Structure needs lists/tables');

if (issues.length === 0) {
  console.log(`✅ All checks passed!`);
} else {
  console.log(`⚠️ Issues (${issues.length}):`);
  issues.forEach(issue => console.log(`   - ${issue}`));
}

console.log(`\n${'='.repeat(70)}\n`);
