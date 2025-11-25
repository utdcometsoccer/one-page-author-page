# Design System Documentation

This document outlines the design system for the One-Page Author Page application.

## Table of Contents

1. [Brand Colors](#brand-colors)
2. [Typography](#typography)
3. [Spacing Scale](#spacing-scale)
4. [Components](#components)
5. [Accessibility](#accessibility)

---

## Brand Colors

### Primary Palette

| Token | Light Theme | Dark Theme | Usage |
|-------|-------------|------------|-------|
| `--color-bg` | `#fff` | `#181a1b` | Main background |
| `--color-bg-section` | `#fff` | `#23272b` | Section backgrounds, cards |
| `--color-card` | `#f0f0f8` | `#23272b` | Card backgrounds |
| `--color-text` | `#222` | `#f3f3f3` | Primary text |
| `--color-header` | `#1a1a1a` | `#fff` | Headings |
| `--color-link` | `#1a0dab` | `#5eb8ff` | Links, interactive elements |
| `--color-footer` | `#555` | `#bbb` | Footer text |
| `--color-shadow` | `rgba(0,0,0,0.04)` | `rgba(0,0,0,0.4)` | Box shadows |

### Semantic Colors

```css
/* Success, Warning, Error - to be added as needed */
--color-success: #22c55e;
--color-warning: #f59e0b;
--color-error: #ef4444;
```

---

## Typography

### Font Stack

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
```

### Type Scale

| Level | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| Display | `3.2em` | 700 | 1.1 | Hero headings (h1) |
| Heading 1 | `2.5em` | 600 | 1.2 | Page titles |
| Heading 2 | `2em` | 600 | 1.25 | Section headings |
| Heading 3 | `1.5em` | 500 | 1.3 | Subsection headings |
| Body | `1rem` | 400 | 1.5 | Paragraphs |
| Small | `0.875rem` | 400 | 1.5 | Captions, labels |
| Tiny | `0.75rem` | 400 | 1.4 | Fine print |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Buttons, emphasis |
| Semibold | 600 | Headings |
| Bold | 700 | Strong emphasis |

---

## Spacing Scale

Consistent spacing using a 4px base unit:

| Token | Value | Example Usage |
|-------|-------|---------------|
| `--space-1` | `0.25rem` (4px) | Tight inline spacing |
| `--space-2` | `0.5rem` (8px) | Button padding, icon gaps |
| `--space-3` | `0.75rem` (12px) | Card padding (small) |
| `--space-4` | `1rem` (16px) | Section padding, gaps |
| `--space-5` | `1.5rem` (24px) | Section margins |
| `--space-6` | `2rem` (32px) | Large section spacing |
| `--space-8` | `3rem` (48px) | Hero section padding |
| `--space-10` | `4rem` (64px) | Major section breaks |

### Implementation

```css
:root {
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.5rem;
  --space-6: 2rem;
  --space-8: 3rem;
  --space-10: 4rem;
}
```

---

## Components

### Button

A versatile button component with multiple variants and sizes.

#### Variants

| Variant | Description |
|---------|-------------|
| `primary` | Main CTA - filled background, high contrast |
| `secondary` | Secondary actions - outlined with fill on hover |
| `outline` | Tertiary actions - transparent with border |

#### Sizes

| Size | Padding | Font Size |
|------|---------|-----------|
| `small` | `0.375rem 0.75rem` | `0.875rem` |
| `medium` | `0.5rem 1rem` | `1rem` |
| `large` | `0.75rem 1.5rem` | `1.125rem` |

#### Usage

```tsx
import { Button } from './components'

<Button variant="primary" size="medium">Get Started</Button>
<Button variant="outline" size="small">Learn More</Button>
```

### Card

Container component for grouping related content.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevated` | boolean | false | Adds stronger shadow |
| `className` | string | '' | Additional CSS classes |

#### Usage

```tsx
import { Card } from './components'

<Card elevated>
  <h3>Book Title</h3>
  <p>Description</p>
</Card>
```

### Link

Enhanced link component with external link indication.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | string | required | Link destination |
| `external` | boolean | auto | Forces external link styling |

#### Features

- Auto-detects external links (http/https)
- Adds ↗ icon for external links
- Sets `target="_blank"` and `rel="noopener noreferrer"` for external links

#### Usage

```tsx
import { Link } from './components'

<Link href="/about">About Us</Link>
<Link href="https://example.com">External Site ↗</Link>
```

---

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:

| Foreground | Background | Contrast Ratio | Standard |
|------------|------------|----------------|----------|
| `#5eb8ff` (link) | `#181a1b` (dark bg) | 8.5:1 | AAA |
| `#1a0dab` (link) | `#fff` (light bg) | 8.9:1 | AAA |
| `#f3f3f3` (text) | `#181a1b` (dark bg) | 15.8:1 | AAA |
| `#222` (text) | `#fff` (light bg) | 17.1:1 | AAA |

### Focus Indicators

All interactive elements have visible focus indicators:

```css
*:focus-visible {
  outline: 3px solid var(--color-link);
  outline-offset: 2px;
}
```

### Motion Preferences

Animations respect user preferences:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

### Skip Navigation

A skip link is provided for keyboard users:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Target Devices |
|------------|-----------|----------------|
| Mobile | 0 | Phones |
| Tablet | 600px | Small tablets |
| Desktop | 768px | Tablets, small laptops |
| Large | 992px | Laptops, desktops |
| XLarge | 1200px | Large screens |

---

## File Structure

```
src/
├── components/
│   ├── Button.tsx      # Button component
│   ├── Card.tsx        # Card component
│   ├── Link.tsx        # Link component
│   └── index.ts        # Component exports
├── App.css             # Global styles, design tokens
└── index.css           # Base styles
```

---

**Last Updated:** November 2025
