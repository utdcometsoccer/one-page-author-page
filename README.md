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
- Dark and light theme support with user toggle
- Code splitting and lazy loading for optimal performance
- Swipe gesture navigation between sections (mobile)
- Scroll progress indicator
- Back to top button
- Share buttons for social sharing
- Add to Home Screen (PWA) banner
- Application Insights telemetry integration
- Accessibility features (skip navigation, WCAG AA compliant)

## Requirements

- Node.js >=22.0.0
- npm >=10.0.0

## Development

This project uses Vite for fast development and HMR.

```sh
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
│   ├── components/          # Reusable UI components and hooks
│   │   ├── Button.tsx       # Versatile button with variants (primary, secondary, outline)
│   │   ├── Card.tsx         # Container component for content grouping
│   │   ├── Link.tsx         # Enhanced link with external link detection
│   │   ├── Toast.tsx        # Notification system for user feedback
│   │   ├── BackToTop.tsx    # Scroll-to-top button
│   │   ├── ScrollProgress.tsx   # Page scroll progress indicator
│   │   ├── ShareButtons.tsx     # Social sharing buttons
│   │   ├── AddToHomeScreenBanner.tsx  # PWA install prompt
│   │   ├── useToast.ts      # Hook: Toast notification management
│   │   ├── useSwipeGesture.ts   # Hook: Touch swipe navigation
│   │   └── useAddToHomeScreen.ts # Hook: PWA install detection
│   ├── utilities/           # Utility functions
│   │   ├── getLocale.ts     # Browser locale detection
│   │   ├── getLocaleFile.ts # Locale file path resolution
│   │   ├── getAuthorDataFile.ts  # Author data file path resolution
│   │   ├── hostProvider.ts  # Host/domain configuration
│   │   └── TelemetryService.ts   # Application Insights wrapper
│   ├── App.tsx              # Main application component
│   ├── App.css              # Global styles and design tokens
│   ├── index.css            # Base styles
│   └── types.ts             # TypeScript type definitions
├── tests/                   # Test files (*.test.tsx, *.test.ts)
├── public/
│   ├── locales/             # Locale header files
│   │   └── {lang}/{region}/index.json
│   └── com/                 # Author data files
│       └── {author}/{lang}/{region}/author-data.json
└── docs/                    # Documentation files
    ├── DESIGN-SYSTEM.md     # Design system documentation
    ├── UI-UX-ANALYSIS.md    # UI/UX analysis report
    ├── UI-UX-CHECKLIST.md   # UI/UX quick reference checklist
    ├── DEPLOYMENT.md        # Deployment documentation
    └── TELEMETRY.md         # Telemetry events reference
```

## Locales

The app automatically detects the user's browser language and loads the appropriate locale files for UI headers and author data. If a locale is not found, it falls back to English (`en/us`).

### File Structure

- **Locale header files**: `public/locales/{lang}/{region}/index.json`
  - Example: `public/locales/en/us/index.json`, `public/locales/fr/fr/index.json`
- **Author data files**: `public/com/{author}/{lang}/{region}/author-data.json`
  - Example: `public/com/edokpayi/en/us/author-data.json`

### Supported Locales

| Language | Code | Locale Path |
|----------|------|-------------|
| English (US) | `en/us` | `public/locales/en/us/` |
| French | `fr/fr` | `public/locales/fr/fr/` |
| German | `de/de` | `public/locales/de/de/` |
| Mexican Spanish | `es/mx` | `public/locales/es/mx/` |

### Locale Header File Format

```json
{
  "welcome": "Welcome",
  "aboutMe": "About Me",
  "myBooks": "My Books",
  "loading": "Loading...",
  "emailPrompt": "Feel free to reach out:",
  "contactMe": "Contact Me",
  "emailLinkText": "Email Me",
  "noEmail": "No contact email provided.",
  "switchToLight": "Switch to Light Theme",
  "switchToDark": "Switch to Dark Theme",
  "articles": "Articles",
  "backToTop": "Back to top",
  "installApp": "Install this app on your device",
  "notNow": "Not now"
}
```

### Author Data File Format

```json
{
  "name": "Author Name",
  "welcome": "Welcome message text",
  "aboutMe": "About me description",
  "headshot": "/path/to/headshot.webp",
  "copyright": "© 2025 Author Name. All rights reserved.",
  "email": "author@example.com",
  "social": [
    { "name": "LinkedIn", "url": "https://linkedin.com/in/author" },
    { "name": "Instagram", "url": "https://instagram.com/author" }
  ],
  "books": [
    {
      "title": "Book Title",
      "description": "Book description",
      "url": "https://amazon.com/book",
      "cover": "/covers/book.webp"
    }
  ],
  "articles": [
    {
      "title": "Article Title",
      "url": "https://example.com/article",
      "publication": "Publication Name",
      "date": "2025-01-01"
    }
  ]
}
```

## Adding a New Locale

1. Create a new directory structure in `public/locales/{lang}/{region}/`
2. Add an `index.json` file with translated headers
3. Create author data files in `public/com/{author}/{lang}/{region}/author-data.json`
4. Translate the content as needed

## Environment Variables

The application uses the following environment variables (configured in `.env`):

| Variable | Description |
|----------|-------------|
| `VITE_APPINSIGHTS_CONNECTION_STRING` | Azure Application Insights connection string |
| `VITE_AUTHOR_DATA_BASE` | Remote API base URL for author data |
| `VITE_AUTHOR_DATA_FILE_EXTENSION` | File extension for remote author data |
| `VITE_LOCAL_AUTHOR_DATA_BASE` | Local fallback path for author data |
| `VITE_LOCAL_AUTHOR_DATA_FILE_EXTENSION` | File extension for local author data |
| `VITE_LOCAL_LANG` | Default language code |
| `VITE_LOCAL_REGION` | Default region code |
| `VITE_LOCAL_HOST` | Local development hostname |
| `VITE_ERROR_TITLE` | Custom error page title |

## Features

### Theme Support

The app supports dark and light themes. Users can toggle between themes using the footer button. Theme preference respects system settings and persists across sessions.

### Responsive Design

The app uses CSS custom properties and media queries with breakpoints at:
- 600px (mobile)
- 768px (tablet)
- 992px (desktop)
- 1200px (large screens)

### Navigation

- Hamburger menu for all screen sizes
- Scroll spy highlighting active section
- Smooth scroll navigation
- Swipe gestures on mobile for section navigation
- Skip to main content link for accessibility

### Performance

- Code splitting with React lazy loading for below-fold sections
- Dynamic import of social media icons
- Optimized images (WebP/AVIF formats)

### Accessibility

- WCAG AA compliant color contrast
- Visible focus indicators
- Skip navigation link
- Semantic HTML structure
- Reduced motion support (`prefers-reduced-motion`)

## Design System

See **[DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md)** for comprehensive documentation on:
- Brand colors and theme tokens
- Typography scale and font families
- Spacing system
- Component specifications (Button, Card, Link, Toast)
- Accessibility guidelines

## Telemetry and Analytics

📈 **[View Telemetry Events Documentation](./docs/TELEMETRY.md)** - Complete reference for all Application Insights events tracked in the application

The app integrates with Azure Application Insights to track user interactions and behavior. All events include detailed properties for analytics and insights.

## UI/UX Analysis

📊 **[View Full UI/UX Analysis Report](./docs/UI-UX-ANALYSIS.md)** - Detailed analysis covering all aspects of the application

✅ **[View Quick Reference Checklist](./docs/UI-UX-CHECKLIST.md)** - Actionable items and quick wins

## Documentation

| Document | Description |
|----------|-------------|
| [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Comprehensive design system documentation covering brand colors, typography, spacing, and component specifications |
| [UI-UX-ANALYSIS.md](./docs/UI-UX-ANALYSIS.md) | Detailed UI/UX analysis report covering all aspects of the application |
| [UI-UX-CHECKLIST.md](./docs/UI-UX-CHECKLIST.md) | Quick reference checklist with actionable items and quick wins |
| [TELEMETRY.md](./docs/TELEMETRY.md) | Complete reference for all Application Insights events tracked in the application |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Deployment configuration and guidelines for Azure Static Web Apps |

## Testing

Tests are written using Vitest and Testing Library. Run tests with:

```sh
npm run test
```

Test files are located in the `tests/` directory with `.test.tsx` or `.test.ts` suffixes.

## Deployment

The app is configured for deployment to Azure Static Web Apps. CI/CD is handled through GitHub Actions.

## License

See [LICENSE](./LICENSE) for details.
