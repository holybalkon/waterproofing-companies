# Швидкий старт

## 🚀 Як запустити проект

### 1. Відкрийте у браузері
Просто відкрийте **`index.html`** файл у браузері:
```
Правою кнопкою миші на index.html → Відкрити з → Браузер
```

Або через адресний рядок:
```
file:///path/to/waterproofing-companies/index.html
```

### 2. Локальний веб-сервер (рекомендовано)

#### Якщо встановлений Python:
```bash
# Python 3
python -m http.server 8000

# Потім перейдіть на: http://localhost:8000
```

#### Якщо встановлений Node.js:
```bash
# Встановіть http-server
npm install -g http-server

# Запустіть
http-server

# Відкрийте http://localhost:8080
```

#### Якщо встановлений PHP:
```bash
php -S localhost:8000
```

## 📁 Файлова структура (коротка версія)

```
├── index.html              ← Головна сторінка
├── styles/
│   ├── main.css            ← Основні стилі (8.5 KB)
│   └── profile.css         ← Профіль модалі (4.2 KB)
├── js/
│   ├── main.js             ← Основна логіка (7.8 KB)
│   └── profile.js          ← Профіль утиліти (1.8 KB)
├── data/
│   └── companies.js        ← Дані компаній (4.5 KB)
├── README.md               ← Документація
└── STRUCTURE.md            ← Детальна структура
```

## ✨ Основні функції

✅ **5 компаній** з детальною інформацією  
✅ **Рейтингова система** (4 категорії)  
✅ **Модальні профілі** для кожної компанії  
✅ **Адаптивний дизайн** для мобільних  
✅ **SEO оптимізований** з Schema.org  

## 🎨 Дизайн

- Кольорова схема: Deep Water (синій + teal)
- Шрифт: Plus Jakarta Sans (з Google Fonts)
- Іконки: Unicons v4.0.8

## 🔧 Як додати компанію

1. Відкрийте `data/companies.js`
2. Додайте новий об'єкт до масиву `companies`:

```javascript
{
  id: 'new-company',
  rank: 6,
  name: 'New Company Name',
  logo: 'NC',
  logoColor: '#hexcolor',
  bestFor: 'Best for specific service',
  isTopPick: false,
  rating: 4.5,
  ratings: {
    reputation: 4.5,
    breadth: 4.6,
    warranty: 4.5,
    availability: 4.4
  },
  facts: [
    { icon: 'uil-calendar-alt', text: 'Since 2000' },
    { icon: 'uil-shield-check', text: '15-year warranty' }
  ],
  description: 'Full company description...',
  highlight: 'Key differentiator...',
  focusAreas: [
    { icon: 'uil-raindrops', label: 'Exterior' },
    { icon: 'uil-home', label: 'Interior' }
  ],
  platform: 'Platform info and stats...',
  website: 'https://website.com/',
  profileInfo: {
    since: '2000',
    warranty: '15-year transferable',
    service: 'Waterproofing services',
    description: 'Company history and details...'
  }
}
```

3. Збережіть файл
4. Перезавантажте браузер

## 🎯 Кліки на компонентах

| Кнопка/Елемент | Дія |
|---|---|
| **"VISIT SITE"** | Відкриває сайт компанії |
| **"VIEW PROFILE"** | Показує модальний профіль |
| **"VISIT WEBSITE"** (в профілі) | Відкриває сайт компанії |
| **X кнопка** (в профілі) | Закриває профіль |
| **ESC клавіша** | Закриває профіль |
| **Поза профілем** | Закриває при кліку |

## 📱 Адаптивність

Проект адаптований під:
- 📱 **Мобільні** (320px - 640px)
- 📱 **Планшети** (641px - 820px)
- 💻 **Десктопи** (821px+)

## 🔍 Пошук і навігація

- **"Jump to the full list"** - прокручує до списку компаній
- **"READ MORE +"** - розширює вступ
- Всі карти сортовані по рейтингу

## 🎪 Промо-баннер

Між першою та другою картою розташований промо-баннер:
- "Get Connected With A Company For Free"
- Клік на "GET STARTED" відкриває діалог

## 🌟 Top Pick карта

Перша компанія (Aquatech) має спеціальне оформлення:
- Помаранчевого стану (#1 PICK)
- Повна стрічка з інформацією
- Особливе виділення зі сторін

## 🚨 Важливо

1. **Основна сторінка** - `index.html` (це та, яку потрібно відкривати)
2. **Інтернет потрібен** - для завантаження:
   - Google Fonts
   - Unicons
   - Schema.org JSON-LD

3. **JavaScript обов'язковий** - проект складається з dynamicHTML генерації

4. **Браузери** - підтримує Chrome, Firefox, Safari, Edge (останні 2 версії)

## 🐛 Відладка

Якщо щось не працює:

1. Відкрийте **F12** (Developer Tools)
2. Перевірте консоль на помилки
3. Перевірте **Network** tab для завантаження файлів
4. Перезавантажте сторінку (**Ctrl+R** або **Cmd+R**)

## 📊 Розміри файлів

- `index.html`: ~2.5 KB
- `styles/main.css`: ~8.5 KB
- `styles/profile.css`: ~4.2 KB
- `js/main.js`: ~7.8 KB
- `js/profile.js`: ~1.8 KB
- `data/companies.js`: ~4.5 KB
- **Разом**: ~28.3 KB

## 🎓 Навчальні матеріали

Для розуміння коду:
- `README.md` - огляд проекту
- `STRUCTURE.md` - детальна структура
- Комментарі в `js/main.js`

## 🤝 Розширення

Для подальшого розвитку:

### Додавання фільтрації
```javascript
// Додайте фільтри в HTML
// Додайте функцію filterCompanies() в main.js
```

### Пошук
```javascript
// Додайте input для пошуку
// Реалізуйте searchCompanies()
```

### Сортування
```javascript
// Додайте dropdown для сортування
// Реалізуйте sortCompanies()
```

### Backend інтеграція
```javascript
// Замініть companies.js на API запит
fetch('/api/companies')
  .then(r => r.json())
  .then(data => renderCompanies(data))
```

## ✅ Чек-лист при запуску

- [ ] Відкрилися всі 5 карток компаній
- [ ] Картка Aquatech має помаранчеву стрічку
- [ ] Кнопки "VISIT SITE" відкривають сайти
- [ ] "VIEW PROFILE" показує модалі
- [ ] ESC закриває модаль
- [ ] Дизайн адаптується на мобільних
- [ ] Іконки завантажені (Unicons)
- [ ] Шрифти завантажені (Plus Jakarta Sans)

## 🎉 Готово!

Проект готовий до використання. Насолоджуйтесь! 🚀
