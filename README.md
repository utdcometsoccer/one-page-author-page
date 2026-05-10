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
- **SEO & AI Optimization:**
  - Dynamic meta tags (Open Graph, Twitter Cards)
  - JSON-LD structured data (schema.org)
  - Robots.txt and sitemap.xml
  - AI crawler support (GPTBot, Claude-Web, etc.)
  - Customizable SEO metadata via Author API

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

# Lint documentation (markdown files)
npm run lint:docs

# Run tests
npm run test

# Preview production build
npm run preview
```

## Project Structure

```bash
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
  ],
  "seo": {
    "title": "Author Name - Award-Winning Author",
    "description": "Custom meta description for search engines and social sharing",
    "keywords": ["keyword1", "keyword2", "keyword3"],
    "image": "/path/to/og-image.jpg",
    "canonicalUrl": "https://authorname.com",
    "type": "profile"
  }
}
```

**Note:** The `seo` field is optional. If not provided, SEO metadata will be automatically generated from other fields.

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
| `VITE_DYNAMIC_SITEMAP_ENABLED` | Enable/disable dynamic sitemap feature (default: `false`) |
| `VITE_SITEMAP_API_URL` | API endpoint for dynamic sitemap |

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

**Build Optimizations:**

- Code splitting with React lazy loading for below-fold sections
- Manual chunk splitting (react-vendor, mui-icons, insights)
- esbuild minification for faster builds
- CSS code splitting
- Source maps disabled in production
- Optimized images (WebP/AVIF formats with lazy loading)
- Dynamic import of social media icons
- HTTP caching headers for static assets (Cache-Control for assets, images, JS/CSS)

**Mobile Performance (Mexico):**

- ~65% bundle size reduction through optimization (473KB → 165KB gzipped)
- Font preconnect for faster rendering
- es/mx locale support with efficient loading
- See [PERFORMANCE-MEXICO.md](./docs/PERFORMANCE-MEXICO.md) for comprehensive optimization guide including:
  - Geographic redundancy recommendations
  - CDN configuration for Latin America
  - Infrastructure best practices
  - Monitoring and analytics

### Accessibility

- WCAG AA compliant color contrast
- Visible focus indicators
- Skip navigation link
- Semantic HTML structure
- Reduced motion support (`prefers-reduced-motion`)

### SEO & AI Optimization

The application includes comprehensive SEO and AI optimization features to maximize discoverability by search engines and AI systems:

**Quick Reference Guides:**

- 📋 **[SEO-AIO-CHECKLIST.md](./docs/SEO-AIO-CHECKLIST.md)** - Comprehensive checklist with implementation status and actionable items
- 🤖 **[AIO-BEST-PRACTICES.md](./docs/AIO-BEST-PRACTICES.md)** - AI optimization strategies for ChatGPT, Claude, Perplexity, and other LLMs
- ⚡ **[PERFORMANCE-OPTIMIZATION.md](./docs/PERFORMANCE-OPTIMIZATION.md)** - Performance optimization guide for Core Web Vitals

**Dynamic Meta Tags:**

- Open Graph tags for social sharing (Facebook, LinkedIn)
- Twitter Card tags for enhanced Twitter previews
- Standard SEO meta tags (description, keywords, author)
- Canonical URLs to prevent duplicate content issues

**Structured Data:**

- JSON-LD schema.org markup for authors (Person schema)
- Book schema for each published work
- Article schema for published articles
- Breadcrumb schema for navigation
- FAQ schema for common questions
- Helps search engines and AI systems understand content relationships

**AI Crawler Support:**

- Explicit support for GPTBot (OpenAI)
- Claude-Web (Anthropic)
- Google-Extended
- Other AI crawlers
- Configured via robots.txt

**Customization:**
Authors can provide custom SEO metadata in their author data JSON files, or the system will intelligently generate it from existing data. See [SEO-GUIDE.md](./docs/SEO-GUIDE.md) for complete implementation details.

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

### Project Planning

| Document | Description |
|----------|-------------|
| [ROADMAP.md](./docs/ROADMAP.md) | 🗺️ **Product roadmap** with strategic goals, feature prioritization, and implementation timeline for 2026 |
| [TODO.md](./docs/TODO.md) | ✅ **Detailed todo list** with actionable items, estimates, and progress tracking |

### Technical Documentation

| Document | Description |
|----------|-------------|
| [DESIGN-SYSTEM.md](./docs/DESIGN-SYSTEM.md) | Comprehensive design system documentation covering brand colors, typography, spacing, and component specifications |
| [UI-UX-ANALYSIS.md](./docs/UI-UX-ANALYSIS.md) | Detailed UI/UX analysis report covering all aspects of the application |
| [UI-UX-CHECKLIST.md](./docs/UI-UX-CHECKLIST.md) | Quick reference checklist with actionable items and quick wins |
| [TELEMETRY.md](./docs/TELEMETRY.md) | Complete reference for all Application Insights events tracked in the application |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Deployment configuration and guidelines for Azure Static Web Apps |
| [SEO-GUIDE.md](./docs/SEO-GUIDE.md) | Complete SEO and AI optimization implementation guide |
| [SEO-AIO-CHECKLIST.md](./docs/SEO-AIO-CHECKLIST.md) | Comprehensive SEO/AIO checklist with actionable items |
| [AIO-BEST-PRACTICES.md](./docs/AIO-BEST-PRACTICES.md) | AI optimization strategies for modern LLMs |
| [PERFORMANCE-OPTIMIZATION.md](./docs/PERFORMANCE-OPTIMIZATION.md) | Performance optimization guide for Core Web Vitals |
| [AZURE-CACHING-TECHNIQUES.md](./docs/AZURE-CACHING-TECHNIQUES.md) | Comprehensive analysis of Azure caching techniques for North America API performance with Mexico optimization |
| [DYNAMIC-SITEMAP.md](./docs/DYNAMIC-SITEMAP.md) | Dynamic sitemap feature with API integration and fallback support |
| [DOCUMENTATION-STANDARDS.md](./docs/DOCUMENTATION-STANDARDS.md) | Repository documentation standards and guidelines |

### Marketing Documentation

| Document | Description |
|----------|-------------|
| [SOCIAL-MEDIA.md](./docs/MARKETING/SOCIAL-MEDIA.md) | Comprehensive social media marketing strategy for authors |
| [EMAIL-CAMPAIGNS.md](./docs/MARKETING/EMAIL-CAMPAIGNS.md) | Email marketing campaign plan with templates and best practices |
| [BLOGGER-OUTREACH.md](./docs/MARKETING/BLOGGER-OUTREACH.md) | Book blogger outreach strategy and relationship building |
| [MEDIA-OUTREACH.md](./docs/MARKETING/MEDIA-OUTREACH.md) | Podcast, YouTube, TV, radio, and print media outreach guide |
| [OPPORTUNITIES.md](./docs/MARKETING/OPPORTUNITIES.md) | Additional author promotion opportunities and creative strategies |

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
