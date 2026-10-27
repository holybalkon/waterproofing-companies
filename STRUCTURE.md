# Структура проекту - Top Waterproofing Companies

##概述

Проект розділений на модульні компоненти для легшої підтримки та розширення.

## Архітектура

```
┌─────────────────┐
│   index.html    │  (основна структура)
└────────┬────────┘
         │
    ┌────┼────────────────────┐
    │    │                    │
    ▼    ▼                    ▼
 styles/ js/               data/
   │     │                  │
   ├─ main.css           └─ companies.js
   └─ profile.css
```

## Файлова структура

### Root рівень
- **`index.html`** - Основна сторінка (ТОЧКА ВХОДУ)
- `README.md` - Документація
- `STRUCTURE.md` - Детальна структура
- `.gitignore` - Git конфіг

### `/styles` - Стилізація
```
styles/
├── main.css        (8.5 KB)
│   ├── CSS змінні (colors, sizes)
│   ├── Базові стилі (reset, typography)
│   ├── Компоненти (header, cards, buttons)
│   ├── Layout (hero, listing, footer)
│   └── Responsive дизайн
│
└── profile.css     (4.2 KB)
    ├── Modal стилі
    ├── Overlay ефекти
    ├── Profile панель
    └── Responsive адаптація
```

### `/js` - Логіка та функціональність
```
js/
├── main.js         (7.8 KB)
│   ├── renderCompanies() - Генерація карток
│   ├── createCardHTML() - HTML для карток
│   ├── createPromoHTML() - HTML для промо
│   ├── openProfile() - Відкриття модального вікна
│   ├── closeProfile() - Закриття модального вікна
│   ├── setupEventListeners() - Обробка подій
│   └── attachCardListeners() - Listener для карток
│
└── profile.js      (1.8 KB)
    ├── Keyboard handlers (ESC key)
    ├── Scroll handlers (smooth scroll)
    ├── Share функціональність
    ├── Utility функції
    └── Analytics helpers
```

### `/data` - Дані та конфіги
```
data/
└── companies.js    (4.5 KB)
    └── companies[] масив з об'єктами:
        ├── id - унікальний識别符
        ├── rank - позиція в рейтингу
        ├── name - назва компанії
        ├── logo - коротка назва логотипу
        ├── logoColor - колір в форматі hex
        ├── bestFor - короткий опис
        ├── isTopPick - флаг лідера
        ├── sponsored - мітка спонсорства
        ├── rating - загальний рейтинг (0-5)
        ├── ratings - об'єкт з 4 метриками
        ├── facts - масив фактів компанії
        ├── description - повний опис
        ├── highlight - ключова інформація
        ├── focusAreas - масив послуг
        ├── platform - інформація платформи
        ├── website - URL вебсайту
        └── profileInfo - дані для профілю
```

## Компоненти

### Картка компанії (Card)
```html
<article class="card">
  <div class="rank">1</div>
  <div class="card-head">
    <div class="card-logo">Logo</div>
    <div>
      <div class="card-name">Name</div>
      <div class="best-for">Best for...</div>
    </div>
  </div>
  <div class="card-body">
    <div class="ratings">Ratings Panel</div>
    <div class="detail">Details</div>
  </div>
</article>
```

### Профіль компанії (Profile)
```html
<div class="profile-overlay">
  <div class="profile-panel">
    <div class="profile-hero">Header</div>
    <div class="profile-body">
      <div class="profile-section">Content</div>
    </div>
  </div>
</div>
```

## Дата-потоки

### 1. Завантаження сторінки
```
index.html загружается
    ↓
Завантажуються CSS файли
    ↓
Завантажуються JS файли (main.js, profile.js)
    ↓
Завантажуються дані (companies.js)
    ↓
DOMContentLoaded подія
    ↓
renderCompanies() - генерація всіх карток
    ↓
setupEventListeners() - підтримка подій
```

### 2. Клік на "VIEW PROFILE"
```
Клік на button.link-btn
    ↓
Обробка event listener в main.js
    ↓
openProfile(companyId)
    ↓
Пошук компанії в масиві companies
    ↓
createProfileHTML() - генерація HTML
    ↓
Вставка HTML в profilePanel
    ↓
Додання класу "open" до overlay (показ)
    ↓
Додання keyboard listener (ESC)
```

### 3. Клік на "VISIT SITE"
```
Клік на button.btn-site
    ↓
Отримання data-site атрибута
    ↓
window.open(url, '_blank')
    ↓
Відкриття нового вікна/вкладки
```

## CSS змінні (CSS Variables)

```css
:root {
  --accent: #0c8ce9;           /* Основний блакитний */
  --accent-dark: #0a6fba;      /* Темний блакитний */
  --accent-light: #e7f3fd;     /* Світлий блакитний */
  --teal: #0fb8a8;             /* Teal акцент */
  --ink: #0f1b2d;              /* Основний чорний */
  --muted: #5b6b80;            /* Мутований колір */
  --line: #e3e9f0;             /* Лінії розділення */
  --bg: #f3f6fa;               /* Фоновий колір */
  --surface: #ffffff;          /* Поверхня карток */
  --star: #f5a623;             /* Зіркочки */
  --cta: #0c8ce9;              /* CTA кнопка */
  --cta-hover: #0a6fba;        /* CTA при наведенні */
  --warn: #c0392b;             /* Червоний попередження */
  --warn-bg: #fdecea;          /* Фон попередження */
  --radius: 14px;              /* Border radius */
}
```

## Breakpoints (Responsive)

```css
@media (max-width: 820px)  /* Large tablets */
@media (max-width: 640px)  /* Small tablets & mobile */
@media (max-width: 400px)  /* Small phones */
```

## Залежності

- **Google Fonts**: Plus Jakarta Sans (400, 500, 600, 700, 800)
- **Unicons**: v4.0.8 (Icon library)

Жодних NPM залежностей не потребується - це vanilla JavaScript проект.

## Поточні кількості компаній

На даний момент в базі даних `companies.js` 5 компаній (1-5 рейтинг).

Для додавання більше компаній, просто додайте нові об'єкти до масиву `companies`.

## Кешування

На даний момент нема кешування. Всі дані завантажуються при завантаженні сторінки.

Для оптимізації, можна додати:
- Service Worker для кешування
- LocalStorage для даних
- IndexedDB для більших наборів даних

## Отримання SEO

Проект містить:
- Meta tags для OpenGraph
- Meta description
- Schema.org JSON-LD структуровані дані
- Семантичний HTML

Для подальших оптимізацій, розгляньте додавання:
- Sitemap.xml
- robots.txt
- Canonical tags
- Hreflang для мультимовних версій

## Масштабування

При розширенні проекту:

1. **Більше компаній** - додайте в `companies.js`
2. **Нові сторінки** - створіть нові HTML файли
3. **Складніша логіка** - розділіть `main.js` на модулі
4. **Стилізація** - розділіть `main.css` на компоненти
5. **Дані** - міграція на backend API/базу даних

## Тестування

Рекомендується тестувати:
- Всі браузери (Chrome, Firefox, Safari, Edge)
- Всі пристрої (мобільні, планшети, десктопи)
- Всі дозволи екрана (320px до 2560px)
- Клавіатурна навігація (Tab, Enter, ESC)
- Екранні читачі (a11y compliance)
