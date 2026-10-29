#!/usr/bin/env node
/**
 * Аудит всіх HTML сторінок: B2, B3 проблеми
 */

const fs = require('fs');
const path = require('path');

const htmlFiles = ['index.html', 'about.html', 'faq.html', 'contact.html'];
const results = {};

htmlFiles.forEach(filePath => {
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  ${filePath} не знайдено`);
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  
  // Витяг H1 та H2
  const headingRegex = /<h([1-2])[^>]*>([^<]+)<\/h[1-2]>/g;
  const headings = [];
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      text: match[2].trim(),
      index: match.index,
      endIndex: match.index + match[0].length
    });
  }

  const passages = [];

  for (let i = 0; i < headings.length; i++) {
    const heading = headings[i];
    const nextHeadingIdx = i + 1 < headings.length ? headings[i + 1].index : html.length;
    const sectionHtml = html.substring(heading.endIndex, nextHeadingIdx);
    
    // Перший текстовий елемент
    let firstElementTag = null;
    let firstText = '';
    
    const pMatch = /<p[^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/p>/.exec(sectionHtml);
    if (pMatch) {
      firstElementTag = '<p>';
      firstText = pMatch[1];
    } else {
      const divMatch = /<div[^>]*>([^<]*)<\/div>/.exec(sectionHtml);
      const tableMatch = /<table/.exec(sectionHtml);
      const h3Match = /<h3/.exec(sectionHtml);
      
      if (divMatch) {
        firstElementTag = '<div>';
        firstText = divMatch[1];
      } else if (tableMatch) {
        firstElementTag = '<table>';
        firstText = '[TABLE]';
      } else if (h3Match) {
        firstElementTag = '<h3> NO <p>';
        firstText = '';
      } else {
        firstElementTag = '[UNKNOWN]';
        firstText = '';
      }
    }
    
    const cleanText = firstText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    const sentenceMatch = /^[^.!?;]*[.!?;]/.exec(cleanText);
    const firstSentence = sentenceMatch ? sentenceMatch[0] : cleanText.split(/\s+/).slice(0, 20).join(' ') + '...';
    const wordCount = firstSentence.split(/\s+/).filter(w => w.length > 0).length;
    
    const firstTwoSentences = /^[^.!?;]*[.!?;]\s*[^.!?;]*[.!?;]?/.exec(cleanText);
    const checkText = firstTwoSentences ? firstTwoSentences[0] : cleanText;
    
    const hasBrand = /top waterproofing companies/i.test(checkText);
    const hasAquatech = /aquatech waterproofing/i.test(checkText);
    const hasCity = /toronto|gta|greater toronto/i.test(checkText);
    const hasSubject = hasBrand || hasAquatech;
    
    const b2Pass = firstElementTag === '<p>' && hasSubject && hasCity;
    const b3Pass = wordCount <= 25;
    
    passages.push({
      heading: `H${heading.level}: ${heading.text}`,
      firstElement: firstElementTag,
      wordCount,
      b2: b2Pass ? 'PASS' : 'FAIL',
      b3: b3Pass ? 'PASS' : 'FAIL',
      issues: []
    });
    
    if (!b2Pass) {
      const issues = [];
      if (firstElementTag !== '<p>') issues.push(`Тег ${firstElementTag}, не <p>`);
      if (!hasSubject) issues.push('Немає суб\'єкта');
      if (!hasCity) issues.push('Немає міста');
      passages[passages.length - 1].issues = issues;
    }
    if (!b3Pass) {
      passages[passages.length - 1].issues.push(`${wordCount} слів (>25)`);
    }
  }

  results[filePath] = { headings: headings.length, passages };
});

// Вивід по сторінках
console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║                    АУДИТ ВСІХ СТОРІНОК                        ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

let totalB2Fail = 0;
let totalB3Fail = 0;

Object.entries(results).forEach(([file, data]) => {
  console.log(`\n📄 ${file.toUpperCase()}`);
  console.log(`   Заголовків: ${data.headings} | Пасажів: ${data.passages.length}\n`);

  const b2Issues = data.passages.filter(p => p.b2 === 'FAIL');
  const b3Issues = data.passages.filter(p => p.b3 === 'FAIL');

  if (b2Issues.length > 0) {
    console.log(`   ❌ B2 ISSUES (${b2Issues.length}):`);
    b2Issues.forEach((p, idx) => {
      console.log(`      ${idx + 1}. ${p.heading}`);
      console.log(`         Проблеми: ${p.issues.join(', ')}`);
    });
    totalB2Fail += b2Issues.length;
  } else {
    console.log(`   ✅ B2: Усі пасажи OK`);
  }

  if (b3Issues.length > 0) {
    console.log(`\n   ❌ B3 ISSUES (${b3Issues.length}):`);
    b3Issues.forEach((p, idx) => {
      console.log(`      ${idx + 1}. ${p.heading}`);
      console.log(`         ${p.wordCount} слів у першому реченні`);
    });
    totalB3Fail += b3Issues.length;
  } else {
    console.log(`   ✅ B3: Усі пасажи OK`);
  }
});

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║                         СУММАРНО                             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');
console.log(`B2 FAIL: ${totalB2Fail} пасажів`);
console.log(`B3 FAIL: ${totalB3Fail} пасажів\n`);
