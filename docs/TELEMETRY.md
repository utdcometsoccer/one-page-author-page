# Telemetry Events Documentation

This document provides comprehensive documentation for all Application Insights telemetry events tracked in the author page application.

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
- [Event Reference](#event-reference)
  - [Navigation Events](#navigation-events)
  - [Content Interaction Events](#content-interaction-events)
  - [Social & Sharing Events](#social--sharing-events)
  - [UI Interaction Events](#ui-interaction-events)
  - [PWA Events](#pwa-events)
  - [System Events](#system-events)
- [Usage Examples](#usage-examples)
- [Event Properties Reference](#event-properties-reference)
- [Best Practices](#best-practices)

## Overview

The application uses Azure Application Insights to track user interactions and behavior. All events are sent through a centralized `TelemetryService` singleton that provides type-safe tracking methods.

**Key Features:**
- Singleton pattern ensures consistent tracking across the application
- Type-safe event properties
- Automatic tracking of external link clicks
- Section view tracking via scroll spy
- PWA install behavior tracking

## Setup

The telemetry service is initialized in `App.tsx` using a connection string from environment variables:

```typescript
import TelemetryService from './utilities/TelemetryService'

const telemetryService = TelemetryService.getInstance()
telemetryService.initialize(import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING)
```

**Environment Variable Required:**
- `VITE_APPINSIGHTS_CONNECTION_STRING`: Azure Application Insights connection string

## Event Reference

### Navigation Events

#### SectionView
**Event Name:** `SectionView`

**Description:** Tracks when a user scrolls to a new section of the page.

**When Triggered:** Automatically triggered when a section enters the viewport (scroll spy)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `sectionName` | string | The ID of the section viewed (e.g., 'welcome', 'about-me', 'articles', 'my-books', 'contact-me') |

**Example:**
```typescript
telemetryService.trackSectionView('about-me')
```

**Tracked In:** `App.tsx`

---

#### NavClick
**Event Name:** `NavClick`

**Description:** Tracks when a user clicks a navigation link in the navbar.

**When Triggered:** On click of any navigation link in the navbar

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `targetSection` | string | The section ID being navigated to (e.g., 'welcome', 'about-me') |

**Example:**
```typescript
telemetryService.trackNavClick('about-me')
```

**Tracked In:** `NavBar.tsx`

---

#### MenuToggle
**Event Name:** `MenuToggle`

**Description:** Tracks when the mobile navigation menu is opened or closed.

**When Triggered:** On click of the mobile menu hamburger button

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `isOpen` | boolean | Whether the menu is now open (true) or closed (false) |

**Example:**
```typescript
telemetryService.trackMenuToggle(true)
```

**Tracked In:** `NavBar.tsx`

---

#### BackToTop
**Event Name:** `BackToTop`

**Description:** Tracks when a user clicks the "Back to Top" button.

**When Triggered:** On click of the back-to-top floating button

**Properties:** None

**Example:**
```typescript
telemetryService.trackBackToTop()
```

**Tracked In:** `BackToTop.tsx`

---

### Content Interaction Events

#### ArticleLinkClick
**Event Name:** `ArticleLinkClick`

**Description:** Tracks when a user clicks on an article link.

**When Triggered:** On click of any article link in the Articles section

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `articleTitle` | string | The title of the article clicked |
| `url` | string | The URL of the article |

**Example:**
```typescript
telemetryService.trackArticleLinkClick('Sample Article One', 'https://example.com/article')
```

**Tracked In:** `ArticlesSection.tsx`

---

#### BookLinkClick
**Event Name:** `BookLinkClick`

**Description:** Tracks when a user clicks on a "Learn More" link for a book.

**When Triggered:** On click of any book's "Learn More" button

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `bookTitle` | string | The title of the book |
| `url` | string | The URL where more information can be found |

**Example:**
```typescript
telemetryService.trackBookLinkClick('The Journey Begins', 'https://example.com/book1')
```

**Tracked In:** `BooksSection.tsx`

---

#### ContactEmailClick
**Event Name:** `ContactEmailClick`

**Description:** Tracks when a user clicks the email contact link.

**When Triggered:** On click of the email link in the Contact section

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `email` | string | The email address clicked |

**Example:**
```typescript
telemetryService.trackContactEmailClick('author@example.com')
```

**Tracked In:** `ContactSection.tsx`

---

#### LinkClick / ExternalLinkClick
**Event Name:** `LinkClick` or `ExternalLinkClick`

**Description:** Tracks all link clicks throughout the application. External links (http/https) trigger `ExternalLinkClick`, internal links trigger `LinkClick`.

**When Triggered:** On click of any `<Link>` component

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `url` | string | The destination URL |
| `text` | string? | The link text (if available) |
| `isExternal` | boolean? | Whether the link is external |

**Example:**
```typescript
telemetryService.trackLinkClick('https://example.com', 'Example Site', true)
```

**Tracked In:** `Link.tsx`

---

### Social & Sharing Events

#### SocialIconClick
**Event Name:** `SocialIconClick`

**Description:** Tracks when a user clicks a social media icon in the footer.

**When Triggered:** On click of any social media icon (Facebook, Twitter, Instagram, LinkedIn, YouTube, GitHub, Threads, TikTok, Substack)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `platform` | string | The social media platform name (e.g., 'Facebook', 'Twitter') |
| `url` | string | The destination URL |

**Example:**
```typescript
telemetryService.trackSocialIconClick('Twitter', 'https://twitter.com/username')
```

**Tracked In:** `Footer.tsx`

---

#### ShareClick
**Event Name:** `ShareClick`

**Description:** Tracks when a user clicks a share button.

**When Triggered:** On click of any share button (Copy Link, Native Share, Twitter, Facebook, LinkedIn)

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `platform` | string | The sharing method ('copy', 'native', 'twitter', 'facebook', 'linkedin') |
| `url` | string? | The URL being shared |

**Example:**
```typescript
telemetryService.trackShareClick('twitter', 'https://example.com')
```

**Tracked In:** `ShareButtons.tsx`

---

### UI Interaction Events

#### ButtonClick
**Event Name:** `ButtonClick`

**Description:** Tracks when a user clicks any button in the application (except share buttons, which have their own event).

**When Triggered:** On click of any `<Button>` component

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `buttonName` | string | The button label or tracking name |
| `variant` | string? | The button variant ('primary', 'secondary', 'outline') |

**Example:**
```typescript
telemetryService.trackButtonClick('Submit Form', 'primary')
```

**Tracked In:** `Button.tsx`

**Note:** The button name is determined by:
1. `trackingName` prop if provided
2. Button text if children is a string
3. `aria-label` attribute if available
4. `className` if available
5. Falls back to 'button' as last resort

---

#### ThemeToggle
**Event Name:** `ThemeToggle`

**Description:** Tracks when a user switches between light and dark themes.

**When Triggered:** On click of the theme toggle button in the footer

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `newTheme` | string | The newly selected theme ('light' or 'dark') |

**Example:**
```typescript
telemetryService.trackThemeToggle('light')
```

**Tracked In:** `App.tsx`

---

### PWA Events

#### InstallPrompt
**Event Name:** `InstallPrompt`

**Description:** Tracks when a user clicks the "Install" button on the PWA install banner.

**When Triggered:** On click of the Install button in the Add to Home Screen banner

**Properties:** None

**Example:**
```typescript
telemetryService.trackInstallPrompt()
```

**Tracked In:** `AddToHomeScreenBanner.tsx`

---

#### InstallDismiss
**Event Name:** `InstallDismiss`

**Description:** Tracks when a user dismisses the PWA install banner.

**When Triggered:** On click of the dismiss (X) button in the Add to Home Screen banner

**Properties:** None

**Example:**
```typescript
telemetryService.trackInstallDismiss()
```

**Tracked In:** `AddToHomeScreenBanner.tsx`

---

### System Events

#### AuthorLoadEvent
**Event Name:** `AuthorLoadEvent`

**Description:** Tracks when author data is successfully loaded into the application.

**When Triggered:** Automatically when author data is fetched and loaded

**Properties:**
| Property | Type | Description |
|----------|------|-------------|
| `authorName` | string | The name of the author |
| `domain` | string | The domain/hostname where the page is loaded |

**Example:**
```typescript
telemetryService.trackAuthorLoad('Jane Johnson', 'example.com')
```

**Tracked In:** `App.tsx`

---

## Usage Examples

### Basic Event Tracking

```typescript
import { telemetryService } from './utilities/TelemetryService'

// Track a section view
telemetryService.trackSectionView('about-me')

// Track a button click with variant
telemetryService.trackButtonClick('Subscribe', 'primary')

// Track a link click
telemetryService.trackLinkClick('https://example.com', 'Example', true)
```

### In React Components

```typescript
import React from 'react'
import { telemetryService } from '../utilities/TelemetryService'

const MyComponent: React.FC = () => {
  const handleCustomAction = () => {
    // Perform action
    
    // Track it
    telemetryService.trackButtonClick('Custom Action', 'secondary')
  }

  return (
    <button onClick={handleCustomAction}>
      Do Something
    </button>
  )
}
```

### Using Event Constants

```typescript
import { telemetryService, TelemetryEvents } from './utilities/TelemetryService'

// Use event name constants for consistency
telemetryService.trackEvent(TelemetryEvents.SECTION_VIEW, { sectionName: 'welcome' })
```

### Custom Event Tracking

For events not covered by convenience methods:

```typescript
// Track a custom event with properties
telemetryService.trackEvent('CustomEventName', {
  property1: 'value1',
  property2: 123,
  property3: true
})
```

## Event Properties Reference

### Common Property Types

All event properties must conform to `TelemetryEventProperties`:

```typescript
type TelemetryEventProperties = Record<string, string | number | boolean | undefined>
```

### Property Guidelines

- **Section IDs**: Use lowercase with hyphens (e.g., 'about-me', 'my-books')
- **URLs**: Always use full URLs including protocol
- **Booleans**: Use `true`/`false` for toggle states
- **Platform Names**: Use proper case (e.g., 'Facebook', 'Twitter')
- **Theme Values**: Use lowercase ('light', 'dark')

## Best Practices

### 1. Consistent Naming
- Use the provided convenience methods when possible
- Follow existing patterns for custom events
- Use descriptive property names

### 2. Privacy Considerations
- Avoid tracking PII (Personally Identifiable Information)
- Email addresses in `ContactEmailClick` should be the author's public contact email only
- Do not track user-entered data

### 3. Performance
- Events are sent asynchronously and won't block user interactions
- The telemetry service handles initialization and connection automatically
- Failed tracking calls fail silently to prevent application errors

### 4. Testing
- Telemetry tracking is active in all environments
- Use environment-specific connection strings to separate development/production data
- Mock the telemetry service in unit tests to avoid sending test events

### 5. Adding New Events

To add a new event:

1. Add the event name constant to `TelemetryEvents` in `TelemetryService.ts`
2. Create a convenience method in `TelemetryService` class
3. Call the method where the event should be tracked
4. Update this documentation with the new event details
5. Add tests for the new tracking method

Example:

```typescript
// 1. Add to TelemetryEvents
export const TelemetryEvents = {
  // ... existing events
  NEW_EVENT: 'NewEvent',
} as const;

// 2. Add convenience method
public trackNewEvent(propertyName: string): void {
  this.trackEvent(TelemetryEvents.NEW_EVENT, { propertyName });
}

// 3. Use in component
import { telemetryService } from './utilities/TelemetryService'

const handleAction = () => {
  telemetryService.trackNewEvent('value')
}
```

### 6. Monitoring and Analysis

**Querying Events in Application Insights:**

```kusto
// Get all section view events from last 7 days
customEvents
| where timestamp > ago(7d)
| where name == "SectionView"
| project timestamp, sectionName=tostring(customDimensions.sectionName)
| summarize count() by sectionName
| order by count_ desc

// Track most clicked social platforms
customEvents
| where timestamp > ago(30d)
| where name == "SocialIconClick"
| project platform=tostring(customDimensions.platform)
| summarize clickCount=count() by platform
| order by clickCount desc

// Analyze navigation patterns
customEvents
| where timestamp > ago(7d)
| where name == "NavClick"
| project timestamp, targetSection=tostring(customDimensions.targetSection), session_Id
| order by timestamp asc

// PWA installation metrics
customEvents
| where timestamp > ago(30d)
| where name in ("InstallPrompt", "InstallDismiss")
| summarize promptCount=countif(name == "InstallPrompt"), 
            dismissCount=countif(name == "InstallDismiss")
| extend installRate = todouble(promptCount - dismissCount) / todouble(promptCount) * 100
```

## Troubleshooting

### Events Not Appearing in Application Insights

1. Verify `VITE_APPINSIGHTS_CONNECTION_STRING` is set correctly
2. Check browser console for initialization errors
3. Ensure Application Insights is not blocked by ad blockers
4. Verify the connection string has correct permissions

### Testing Telemetry Locally

To test telemetry without sending events to production:

1. Create a separate Application Insights resource for development
2. Use a `.env.local` file with the development connection string
3. Monitor the Live Metrics view in Azure Portal to see events in real-time

### Debugging Event Properties

Enable debug logging in the browser console:

```typescript
const appInsights = telemetryService.getAppInsights()
appInsights?.config.loggingLevelConsole = 2 // Enable console logging
```

## Additional Resources

- [Azure Application Insights Documentation](https://docs.microsoft.com/en-us/azure/azure-monitor/app/app-insights-overview)
- [Application Insights JavaScript SDK](https://github.com/microsoft/ApplicationInsights-JS)
- [React Plugin Documentation](https://github.com/microsoft/applicationinsights-react-js)
- [Kusto Query Language (KQL) Reference](https://docs.microsoft.com/en-us/azure/data-explorer/kusto/query/)
