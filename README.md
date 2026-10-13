<div align="center">

# 🧹 ЧистоПространство

**Лендинг клининговой службы с калькулятором стоимости и интерактивными блоками**

[![Live Demo](https://img.shields.io/badge/live-demo-7877c6?style=flat-square)](https://kirill-cleaning.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-repo-181717?style=flat-square&logo=github)](https://github.com/kirill-kzzkzok/chistoprostranstvo)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 О проекте

Адаптивный одностраничный сайт клининговой службы: услуги, калькулятор предварительной стоимости, сравнение «до/после», отзывы и форма заявки. Построен на чистом JavaScript, HTML и CSS — без фреймворков и runtime-зависимостей.

**Цель** — помочь посетителю за 2 минуты выбрать тип уборки и получить предварительную оценку бюджета по площади, типу объекта и дополнительным услугам.

> ⚠️ Калькулятор даёт **клиентскую предварительную оценку**, а формы — **демо**: заявки не отправляются и персональные данные никуда не передаются.

## ✨ Возможности

- 🧮 **Калькулятор стоимости** — расчёт в реальном времени: площадь, тип объекта, тип уборки и дополнительные услуги (окна, химчистка, шкафы)
- ↔️ **Слайдер «до/после»** — перетаскивание мышью, тачем и с клавиатуры (стрелки)
- 📱 **Адаптивная вёрстка** — мобильное меню, фиксированная CTA-кнопка, плавающий промо-блок (запоминает закрытие в sessionStorage)
- ✅ **Доступность** — aria-атрибуты, роли, фокус по клавиатуре, уважение `prefers-reduced-motion`
- 🎞 **Анимации** — появление секций при скролле (IntersectionObserver), ротация слов в заголовке, бегущая строка
- 🔒 **Юридические страницы** — политика конфиденциальности, согласие и оферта из каталога `public/`
- 🚀 **Быстро** — единый статический бандл, ленивая загрузка изображений, ~0 зависимостей

## 🛠 Стек

| Инструмент | Назначение |
| ---------- | ---------- |
| HTML + CSS | разметка и стили (кастомный дизайн, CSS-переменные) |
| JavaScript | вся интерактивность (ES-модули, без библиотек) |
| Vite 8 | dev-сервер и сборка |
| Vercel | хостинг демо |

## 🚀 Быстрый старт

```sh
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер (http://localhost:3000)
npm run dev

# 3. Продакшен-сборка в dist/
npm run build

# 4. Предпросмотр собранной версии
npm run preview
```

## 📁 Структура проекта

```
chistoprostranstvo/
├── src/                  # исходники приложения
│   ├── index.html        # разметка лендинга
│   ├── main.js           # вся логика (калькулятор, слайдер, меню, формы)
│   └── styles.css        # стили лендинга
├── public/               # копируется в dist/ как есть
│   ├── consent.html      # согласие на обработку данных
│   ├── privacy.html      # политика конфиденциальности
│   ├── terms.html        # пользовательское соглашение
│   ├── styles.css        # стили юридических страниц
│   └── images/           # изображения (hero, до/после, команда)
├── vite.config.js        # конфигурация Vite
├── vercel.json           # SPA-rewrite для Vercel
└── package.json
```

## 🧮 Логика калькулятора

Цена = **площадь × тариф (₽/м²) + допуслуги**. Тарифы хранятся в объекте `pricingRates` в `src/main.js`:

| Объект \ Уборка | Регулярная | Генеральная | После ремонта |
| --------------: | ---------: | ----------: | ------------: |
| Квартира        | 42 ₽/м²    | 74 ₽/м²     | 112 ₽/м²      |
| Дом             | 45 ₽/м²    | 78 ₽/м²     | 118 ₽/м²      |
| Офис            | 48 ₽/м²    | 82 ₽/м²     | 125 ₽/м²      |

Допуслуги задаются фиксированными суммами в `value` чекбоксов: мытьё окон +700 ₽, химчистка дивана +2 100 ₽, уборка внутри шкафов +1 000 ₽.

## 🔗 Демо

- **Продакшен:** https://kirill-cleaning.vercel.app
- Репозиторий: [kirill-kzzkzok/chistoprostranstvo](https://github.com/kirill-kzzkzok/chistoprostranstvo)

## 👤 Автор

**Кирилл** — [GitHub](https://github.com/kirill-kzzkzok)

---

# 🧹 ChistoProstranstvo (English)

<div align="center">

**Cleaning-service landing page with a price calculator and interactive sections**

[![Live Demo](https://img.shields.io/badge/live-demo-7877c6?style=flat-square)](https://kirill-cleaning.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-repo-181717?style=flat-square&logo=github)](https://github.com/kirill-kzzkzok/chistoprostranstvo)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

## About

A responsive single-page site for a cleaning company: services, a preliminary price calculator, before/after comparison, reviews and a request form. Built with vanilla JavaScript, HTML and CSS — no frameworks and no runtime dependencies.

**Goal** — let a visitor pick a cleaning type and get a rough budget estimate within 2 minutes based on area, property type and extra services.

> ⚠️ The calculator produces a **client-side estimate only** and the forms are a **demo**: submissions are not sent and no personal data leaves the browser.

## Features

- 🧮 **Price calculator** — real-time estimate from area, property type, cleaning type and extra services (windows, furniture, cabinets)
- ↔️ **Before/after slider** — drag with mouse, touch or keyboard arrows
- 📱 **Responsive layout** — mobile menu, sticky CTA, floating promo (dismissal remembered in sessionStorage)
- ✅ **Accessibility** — ARIA attributes and roles, keyboard focus, `prefers-reduced-motion` respected
- 🎞 **Animations** — scroll-reveal via IntersectionObserver, rotating headline words, marquee
- 🔒 **Legal pages** — privacy policy, consent and terms served from `public/`
- 🚀 **Fast** — a single static bundle, lazy-loaded images, ~zero dependencies

## Tech Stack

| Tool | Purpose |
| ---- | ------- |
| HTML + CSS | markup and styles (custom design, CSS variables) |
| JavaScript | all interactivity (ES modules, no libraries) |
| Vite 8 | dev server and bundling |
| Vercel | demo hosting |

## Quick Start

```sh
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:3000)
npm run dev

# 3. Production build into dist/
npm run build

# 4. Preview the built bundle
npm run preview
```

## Project Structure

```
chistoprostranstvo/
├── src/                  # application sources
│   ├── index.html        # landing markup
│   ├── main.js           # all logic (calculator, slider, menu, forms)
│   └── styles.css        # landing styles
├── public/               # copied to dist/ as-is
│   ├── consent.html      # data-processing consent
│   ├── privacy.html      # privacy policy
│   ├── terms.html        # terms of use
│   ├── styles.css        # legal pages styles
│   └── images/           # images (hero, before/after, team)
├── vite.config.js        # Vite configuration
├── vercel.json           # SPA rewrite for Vercel
└── package.json
```

## Calculator Logic

Price = **area × rate (₽ per m²) + extras**. Rates live in the `pricingRates` object in `src/main.js`:

| Property \ Cleaning | Regular | Deep | Post-renovation |
| ------------------: | ------: | ---: | --------------: |
| Apartment           | 42 ₽/m² | 74 ₽/m² | 112 ₽/m² |
| House               | 45 ₽/m² | 78 ₽/m² | 118 ₽/m² |
| Office              | 48 ₽/m² | 82 ₽/m² | 125 ₽/m² |

Extra services are fixed amounts stored in checkbox `value` attributes: windows +700 ₽, sofa cleaning +2,100 ₽, inside cabinets +1,000 ₽.

## Demo

- **Production:** https://kirill-cleaning.vercel.app
- Repository: [kirill-kzzkzok/chistoprostranstvo](https://github.com/kirill-kzzkzok/chistoprostranstvo)

## Author

**Kirill** — [GitHub](https://github.com/kirill-kzzkzok)
