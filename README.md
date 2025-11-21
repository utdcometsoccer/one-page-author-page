[![Azure Static Web Apps CI/CD](https://github.com/utdcometsoccer/one-page-author-page/actions/workflows/azure-static-web-apps-wonderful-moss-050caf31e.yml/badge.svg)](https://github.com/utdcometsoccer/one-page-author-page/actions/workflows/azure-static-web-apps-wonderful-moss-050caf31e.yml)
# One Page Author Page

A responsive, single-page React + TypeScript + Vite application for authors. This project features:

- Author bio, headshot, and book showcase
- Responsive design with breakpoints at 600px, 768px, 992px, and 1200px
- Hamburger menu for navigation on mobile and desktop
- Book links (e.g., to Amazon)
- Social media links with Material UI icons
- Locale support for multiple languages (English, French, German, Mexican Spanish)
- All content (text, images, links) is loaded from locale-specific JSON files in the `public` folder

## Locales

The app automatically detects the user's browser language and loads the appropriate locale files for UI headers and author data. If a locale is not found, it falls back to English (`en-us`).

- Locale header files are stored in `public/locales/` (e.g., `en-us.json`, `fr-fr.json`, `de-de.json`, `es-mx.json`)
- Author data files are stored in `public/` (e.g., `data.json`, `author-data-fr-fr.json`, `author-data-de-de.json`, `author-data-es-mx.json`)
- All sample data files use the same headshot path: `/sampleheadshot.webp`

## Adding a New Locale

1. Add a new header file in `public/locales/` (e.g., `it-it.json`)
2. Add a new author data file in `public/` (e.g., `author-data-it-it.json`)
3. Translate the content as needed

## UI/UX Analysis

A comprehensive UI/UX analysis has been conducted following industry best practices from [BrowserStack](https://www.browserstack.com/guide/website-ui-ux-checklist) and [Figma](https://www.figma.com/community/file/1299121594620623551/ui-ux-design-checklist).

📊 **[View Full UI/UX Analysis Report](./UI-UX-ANALYSIS.md)** - Detailed 30KB analysis covering all aspects of the application

✅ **[View Quick Reference Checklist](./UI-UX-CHECKLIST.md)** - Actionable items and quick wins

**Key Findings:**
- ✅ Strong responsive design foundation
- ❌ Critical accessibility issues need addressing (WCAG AA compliance)
- ⚠️ Missing design system and component consistency
- 💡 Opportunities for enhanced CTAs and user feedback

## Development

This project uses Vite for fast development and HMR. To run locally:

```sh
npm install
npm run dev
```
