#!/usr/bin/env node
/**
 * Аналіз пасажів: H1/H2, перший елемент, перше речення, довжина, суб'єкти (бізнес, місто, Aquatech)
 */

const fs = require('fs');

const html = fs.readFileSync(process.argv[2] || 'index.html', 'utf8');

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

console.log('\n=== СТРУКТУРА ПАСАЖІВ ===\n');
console.log(`Знайдено ${headings.length} заголовків (H1/H2)\n`);

const passages = [];

for (let i = 0; i < headings.length; i++) {
  const heading = headings[i];
  const nextHeadingIdx = i + 1 < headings.length ? headings[i + 1].index : html.length;
  const sectionHtml = html.substring(heading.endIndex, nextHeadingIdx);
  
  // Першим текстовим елементом
  let firstElementTag = null;
  let firstText = '';
  
  // Шукай <p>
  const pMatch = /<p[^>]*>([^<]*(?:<[^>]+>[^<]*)*)<\/p>/.exec(sectionHtml);
  if (pMatch) {
    firstElementTag = '<p>';
    firstText = pMatch[1];
  } else {
    // Шукай інші типи
    const divMatch = /<div[^>]*>([^<]*)<\/div>/.exec(sectionHtml);
    const tableMatch = /<table/.exec(sectionHtml);
    const liMatch = /<li[^>]*>([^<]*)<\/li>/.exec(sectionHtml);
    const h3Match = /<h3/.exec(sectionHtml);
    
    if (divMatch) {
      firstElementTag = '<div>';
      firstText = divMatch[1];
    } else if (tableMatch) {
      firstElementTag = '<table>';
      firstText = '[TABLE]';
    } else if (liMatch) {
      firstElementTag = '<li>';
      firstText = liMatch[1];
    } else if (h3Match) {
      firstElementTag = '<h3> (no <p>)';
      firstText = '';
    } else {
      firstElementTag = '[NO ELEMENT]';
      firstText = '';
    }
  }
  
  // Витяг текст без HTML тегів
  const cleanText = firstText.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Витяг перше речення (закінчується на . ! ? ;)
  const sentenceMatch = /^[^.!?;]*[.!?;]/.exec(cleanText);
  const firstSentence = sentenceMatch ? sentenceMatch[0] : cleanText.split(/\s+/).slice(0, 20).join(' ') + '...';
  const wordCount = firstSentence.split(/\s+/).length;
  
  // Перевір суб'єкти у першому реченні та другому (якщо є)
  const firstTwoSentences = /^[^.!?;]*[.!?;]\s*[^.!?;]*[.!?;]?/.exec(cleanText);
  const checkText = firstTwoSentences ? firstTwoSentences[0] : cleanText;
  
  const hasBrand = /top waterproofing companies/i.test(checkText);
  const hasAquatech = /aquatech waterproofing/i.test(checkText);
  const hasDirect = /direct waterproofing/i.test(checkText);
  const hasClassic = /classic waterproofing/i.test(checkText);
  const hasSubject = hasBrand || hasAquatech || hasClassic || hasDirect;
  
  const hasCity = /toronto|gta|greater toronto/i.test(checkText);
  
  // B2 критерії
  const b2Pass = firstElementTag === '<p>' && hasSubject && hasCity;
  // B3 критерії
  const b3Pass = wordCount <= 25;
  
  passages.push({
    number: i + 1,
    heading: `H${heading.level}: ${heading.text}`,
    firstElement: firstElementTag,
    firstSentence: firstSentence.substring(0, 100) + (firstSentence.length > 100 ? '...' : ''),
    wordCount,
    hasBrand,
    hasAquatech,
    hasCity,
    hasSubject,
    b2Status: b2Pass ? '✅ PASS' : '❌ FAIL',
    b3Status: b3Pass ? '✅ PASS' : '❌ FAIL (>25 слів)',
    fullSentence: firstSentence
  });
  
  console.log(`Пасаж ${i + 1}: ${heading.text}`);
  console.log(`  Тег: ${firstElementTag}`);
  console.log(`  Першосичне речення: "${firstSentence.substring(0, 80)}${firstSentence.length > 80 ? '...' : ''}"`);
  console.log(`  Слів у першому реченні: ${wordCount}`);
  console.log(`  У першому реченні:`);
  console.log(`    - Бренд (Top Waterproofing Companies): ${hasBrand ? '✅' : '❌'}`);
  console.log(`    - Aquatech: ${hasAquatech ? '✅' : '❌'}`);
  console.log(`    - Місто (Toronto/GTA): ${hasCity ? '✅' : '❌'}`);
  console.log(`  B2 статус (суб'єкт + місто + <p>): ${b2Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  B3 статус (≤25 слів): ${b3Pass ? '✅ PASS' : '❌ FAIL'}`);
  console.log('');
}

// Статистика
console.log('\n=== СТАТИСТИКА ===\n');

const b2PassCount = passages.filter(p => p.b2Status.includes('PASS')).length;
const b3PassCount = passages.filter(p => p.b3Status.includes('PASS')).length;
const wordCounts = passages.map(p => p.wordCount).sort((a, b) => a - b);
const median = wordCounts[Math.floor(wordCounts.length / 2)];

console.log(`Всього пасажів: ${passages.length}`);
console.log(`B2 PASS: ${b2PassCount}/${passages.length}`);
console.log(`B3 PASS: ${b3PassCount}/${passages.length}`);
console.log(`Медіана слів у першому реченні: ${median}`);
console.log(`Пасажів з першим реченням > 25 слів: ${passages.filter(p => p.wordCount > 25).length}`);
console.log(`Пасажів які називають Aquatech: ${passages.filter(p => p.hasAquatech).length}`);
console.log(`Пасажів які називають бренд: ${passages.filter(p => p.hasBrand).length}`);
console.log(`Пасажів які називають місто: ${passages.filter(p => p.hasCity).length}`);

console.log('\n=== РЕЧЕННЯ ДОВШІ ЗА 25 СЛІВ ===\n');
passages.filter(p => p.wordCount > 25).forEach(p => {
  console.log(`Пасаж ${p.number}: ${p.heading}`);
  console.log(`  ${p.wordCount} слів: "${p.fullSentence}"`);
  console.log('');
});

console.log('\n=== ПАСАЖИ БЕЗ <p> ===\n');
passages.filter(p => p.firstElement !== '<p>').forEach(p => {
  console.log(`Пасаж ${p.number}: ${p.heading}`);
  console.log(`  Тег: ${p.firstElement}`);
  console.log('');
});

console.log('\n=== ТАБЛИЦЯ РЕЗУЛЬТАТІВ ===\n');
console.log('| Пасаж | H# | Тег | Слів | Суб\'єкт | Місто | B2 | B3 |');
console.log('|-------|----|----|------|---------|-------|----|----|');
passages.forEach(p => {
  const subj = p.hasBrand ? 'Бренд' : p.hasAquatech ? 'Aquatech' : '-';
  const city = p.hasCity ? '✅' : '❌';
  console.log(`| ${p.number} | ${p.heading.substring(2,3)} | ${p.firstElement} | ${p.wordCount} | ${subj} | ${city} | ${p.b2Status} | ${p.b3Status} |`);
});
