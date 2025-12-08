# Copilot Instructions

This document provides instructions for GitHub Copilot when working on this repository.

## Project Overview

This is a single-page React application for authors, built with TypeScript and Vite. The app displays author information, books, articles, and contact details with support for multiple locales.

### Tech Stack

- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Testing:** Vitest with Testing Library and Playwright
- **Linting:** ESLint 9
- **UI Components:** Material UI Icons, custom components (Button, Card, Link, Toast)
- **Styling:** CSS with CSS custom properties (design tokens)
- **Deployment:** Azure Static Web Apps

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Run tests
npm run test

# Preview production build
npm run preview
```

## Project Structure

```
├── src/
│   ├── components/       # Reusable UI components (Button, Card, Link, Toast)
│   ├── utilities/        # Utility functions (locale handling, config)
│   ├── assets/           # Static assets
│   ├── App.tsx           # Main application component
│   ├── App.css           # Global styles and design tokens
│   ├── index.css         # Base styles
│   └── types.ts          # TypeScript type definitions
├── tests/                # Test files (*.test.tsx, *.test.ts)
├── public/
│   ├── locales/          # Locale header files (e.g., locales/en/us/index.json)
│   └── com/              # Author data files (e.g., com/{author}/en/us/author-data.json)
├── .github/
│   └── workflows/        # GitHub Actions workflows
└── docs/
    └── DESIGN-SYSTEM.md  # Design system documentation
```

## Code Style and Conventions

### TypeScript

- Use TypeScript for all new code
- Define interfaces and types in `src/types.ts` for shared types
- Use explicit return types for functions when not obvious

### React Components

- Use functional components with hooks
- Place component-specific types at the top of the file
- Follow existing component patterns in `src/components/`
- Components should be accessible (WCAG AA compliance)

### CSS

- Use CSS custom properties defined in `App.css` for colors, spacing, and typography
- Follow the design tokens documented in `docs/DESIGN-SYSTEM.md`
- Support both light and dark themes using CSS variables
- Use responsive breakpoints: 600px, 768px, 992px, 1200px

### Testing

- Place test files in the `tests/` directory
- Name test files with `.test.tsx` or `.test.ts` suffix
- Use Testing Library for component tests
- Follow existing test patterns in the codebase

## Locale Support

The app supports multiple languages:

- English (en/us) - default
- French (fr/fr)
- German (de/de)
- Mexican Spanish (es/mx)

**File Structure:**
- Locale header files: `public/locales/{lang}/{region}/index.json` (e.g., `locales/en/us/index.json`)
- Author data files: `public/com/{author}/{lang}/{region}/author-data.json`

When adding new features that involve user-facing text:

1. Add strings to locale files following the directory structure in `public/locales/`
2. Use the locale loading utilities in `src/utilities/`
3. Ensure fallback to English when locale is not available

## Important Guidelines

1. **Accessibility:** All interactive elements must be keyboard accessible with visible focus indicators
2. **Responsive Design:** Test changes at all breakpoints
3. **Design System:** Use existing design tokens and components from `docs/DESIGN-SYSTEM.md`
4. **Testing:** Add tests for new functionality, run `npm run test` before committing
5. **Linting:** Run `npm run lint` and fix any errors before committing
6. **Build Verification:** Ensure `npm run build` succeeds without errors
