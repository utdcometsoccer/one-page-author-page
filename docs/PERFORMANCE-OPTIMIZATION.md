# Performance Optimization Guide

## Overview

This guide provides comprehensive performance optimization strategies for the One Page Author Page. Performance optimization is crucial for SEO, user experience, and AI crawling efficiency.

## Why Performance Matters

### SEO Impact

- **Core Web Vitals**: Google ranking factor
- **Crawl Budget**: Faster pages = more pages crawled
- **User Experience**: Better engagement signals
- **Mobile-First Indexing**: Mobile performance is critical

### User Experience

- **Bounce Rate**: Slow pages = higher bounce rates
- **Conversions**: Faster pages = higher conversions
- **Engagement**: Better performance = longer sessions
- **Accessibility**: Performance is an accessibility feature

### AI Crawling

- **Efficiency**: AI crawlers prefer fast, efficient sites
- **Resource Usage**: Less bandwidth = more crawls
- **Content Discovery**: Faster loading = more content discovered

## Core Web Vitals

### Largest Contentful Paint (LCP)

**Target: < 2.5 seconds**

LCP measures loading performance - when the largest content element becomes visible.

**Optimization Strategies:**

1. **Optimize Images**
   - Use WebP/AVIF formats
   - Compress images (TinyPNG, ImageOptim)
   - Proper sizing (don't load 4K image for 400px display)
   - Lazy loading for below-fold images

2. **Optimize Server Response**
   - Use CDN for static assets
   - Enable HTTP/2 or HTTP/3
   - Optimize backend queries
   - Implement caching strategies

3. **Resource Loading**
   - Preload critical resources
   - Remove render-blocking resources
   - Defer non-critical JavaScript
   - Inline critical CSS

**Implementation:**

```html
<!-- Preload critical images -->
<link rel="preload" as="image" href="/author-headshot.webp" />

<!-- Lazy load below-fold images -->
<img src="book-cover.webp" loading="lazy" alt="Book cover" />
```

### First Input Delay (FID)

**Target: < 100 milliseconds**

FID measures interactivity - time from user interaction to browser response.

**Optimization Strategies:**

1. **Minimize JavaScript**
   - Code splitting
   - Remove unused code
   - Defer non-critical JavaScript
   - Use service workers

2. **Optimize Event Handlers**
   - Use passive event listeners
   - Debounce/throttle handlers
   - Avoid long-running tasks

3. **Web Workers**
   - Offload processing to web workers
   - Keep main thread responsive

**Implementation:**

```javascript
// Passive event listener
element.addEventListener('scroll', handleScroll, { passive: true });

// Debounced handler
const debouncedSearch = debounce(handleSearch, 300);
```

### Cumulative Layout Shift (CLS)

**Target: < 0.1**

CLS measures visual stability - unexpected layout shifts.

**Optimization Strategies:**

1. **Image Dimensions**
   - Always specify width and height
   - Use aspect-ratio CSS
   - Reserve space for ads/embeds

2. **Font Loading**
   - Use font-display: swap
   - Preload critical fonts
   - Match fallback font metrics

3. **Dynamic Content**
   - Reserve space for dynamic content
   - Avoid inserting content above existing content
   - Use transform instead of position changes

**Implementation:**

```html
<!-- Always specify dimensions -->
<img src="book.webp" width="200" height="300" alt="Book cover" />

<!-- Reserve space with aspect ratio -->
<style>
  .book-cover {
    aspect-ratio: 2 / 3;
  }
</style>
```

## Implemented Optimizations

### Code Splitting

✅ **Current Implementation:**

```typescript
// Lazy load below-fold sections
const AboutMeSection = lazy(() => import('./AboutMeSection'));
const ArticlesSection = lazy(() => import('./ArticlesSection'));
const BooksSection = lazy(() => import('./BooksSection'));
const ContactSection = lazy(() => import('./ContactSection'));
const Footer = lazy(() => import('./Footer'));
```

**Benefits:**

- Smaller initial bundle size
- Faster time to interactive
- Better caching granularity

### Image Optimization

✅ **Current Implementation:**

```tsx
<img
  src={headshot}
  alt={`${authorName} headshot`}
  loading="lazy"
  width="150"
  height="150"
/>
```

**Benefits:**

- Lazy loading reduces initial page weight
- Width/height prevent layout shifts
- Descriptive alt text for accessibility and SEO

### Resource Hints

✅ **Current Implementation:**

```html
<!-- DNS prefetch -->
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />
<link rel="dns-prefetch" href="https://fonts.gstatic.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

**Benefits:**

- Faster DNS resolution
- Earlier connection establishment
- Reduced latency for external resources

### Font Optimization

✅ **Current Implementation:**

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
```

**Benefits:**

- `display=swap` prevents invisible text
- Limited font weights reduce file size
- Google Fonts CDN provides caching

## Additional Optimization Opportunities

### 1. Critical CSS Inlining

**Strategy:** Inline critical CSS for above-fold content.

**Implementation:**

```html
<head>
  <style>
    /* Critical CSS for above-fold content */
    body { margin: 0; font-family: Inter, sans-serif; }
    .navbar { height: 80px; /* ... */ }
    .welcome { min-height: 100vh; /* ... */ }
  </style>
  <!-- Load full CSS asynchronously -->
  <link rel="preload" href="/styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
</head>
```

**Benefits:**

- Faster first paint
- Reduced render-blocking resources
- Better perceived performance

### 2. Service Worker for Caching

**Strategy:** Implement service worker for offline access and caching.

**Implementation:**

```javascript
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('author-page-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles.css',
        '/app.js',
        '/favicon.svg',
      ]);
    })
  );
});
```

**Benefits:**

- Offline functionality
- Faster repeat visits
- Better mobile experience
- PWA capabilities

### 3. Image Format Optimization

**Strategy:** Serve modern image formats with fallbacks.

**Implementation:**

```html
<picture>
  <source srcset="author.avif" type="image/avif">
  <source srcset="author.webp" type="image/webp">
  <img src="author.jpg" alt="Author headshot" width="400" height="400">
</picture>
```

**Benefits:**

- AVIF: 50% smaller than JPEG
- WebP: 30% smaller than JPEG
- Automatic fallback for older browsers

### 4. JavaScript Optimization

**Strategy:** Minimize and optimize JavaScript execution.

**Implementation:**

```typescript
// Use useMemo for expensive computations
const sectionIds = useMemo(() => ['welcome', 'about-me', 'articles', 'my-books', 'contact-me'], []);

// Use useCallback for stable function references
const navigateToSection = useCallback((sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}, []);
```

**Benefits:**

- Reduced re-renders
- Better performance
- Lower memory usage

### 5. Bundle Size Optimization

**Strategy:** Analyze and reduce bundle size.

**Tools:**

```bash
# Analyze bundle
npm run build
npx vite-bundle-visualizer

# Use dynamic imports for large libraries
const Charts = lazy(() => import('heavy-chart-library'));
```

**Benefits:**

- Faster downloads
- Quicker parse/compile
- Better mobile performance

## Performance Monitoring

### Tools and Metrics

**Google Lighthouse:**

```bash
# Run Lighthouse audit
npm run build
npm run preview
# Then use Chrome DevTools → Lighthouse
```

**Key Metrics to Monitor:**

- Performance Score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

**WebPageTest:**

- Visit <https://www.webpagetest.org>
- Test from multiple locations
- Compare with competitors
- Monitor trends over time

**Application Insights:**

```typescript
// Track performance metrics
telemetryService.trackPageView({
  name: 'Author Page',
  duration: performance.now(),
  properties: {
    lcp: largestContentfulPaint,
    fid: firstInputDelay,
    cls: cumulativeLayoutShift
  }
});
```

### Continuous Monitoring

**Set Up Alerts:**

1. Page load time > 3 seconds
2. Core Web Vitals failing
3. Build size increasing significantly
4. Error rate spikes

**Regular Audits:**

- Weekly: Quick Lighthouse check
- Monthly: Full performance audit
- Quarterly: Competitive analysis

## Mobile Performance

### Mobile-Specific Optimizations

**1. Touch Target Size:**

```css
/* Minimum 48x48px touch targets */
.button, .link {
  min-height: 48px;
  min-width: 48px;
}
```

**2. Viewport Optimization:**

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**3. Reduced Motion:**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**4. Network-Aware Loading:**

```javascript
// Check connection quality
if (navigator.connection) {
  const connection = navigator.connection;
  if (connection.effectiveType === '4g') {
    // Load high-quality images
  } else {
    // Load compressed images
  }
}
```

## Caching Strategy

### Browser Caching

**Static Assets:**

```bash
# Cache-Control headers (configured in hosting)
Cache-Control: public, max-age=31536000, immutable  # 1 year for static assets
Cache-Control: public, max-age=0, must-revalidate   # For HTML
```

**Service Worker Caching:**

```javascript
// Cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
```

### CDN Strategy

**Implementation:**

1. Serve static assets from CDN
2. Enable HTTP/2 for multiplexing
3. Use edge caching for global distribution
4. Implement cache purging for updates

## Performance Budget

### Set Performance Budgets

**Bundle Sizes:**

- Total JavaScript: < 200KB (gzipped)
- Total CSS: < 50KB (gzipped)
- Total Images: < 500KB (first load)
- Total Fonts: < 100KB

**Timing Budgets:**

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- First Input Delay: < 100ms

**Monitoring:**

```json
// package.json
{
  "scripts": {
    "build": "vite build",
    "analyze": "vite-bundle-visualizer",
    "size-limit": "size-limit"
  },
  "size-limit": [
    {
      "path": "dist/assets/*.js",
      "limit": "200 KB"
    }
  ]
}
```

## Best Practices Checklist

### Images

- [ ] Use modern formats (WebP, AVIF)
- [ ] Compress all images
- [ ] Specify width/height attributes
- [ ] Implement lazy loading
- [ ] Use responsive images
- [ ] Optimize alt text

### JavaScript

- [ ] Code splitting implemented
- [ ] Unused code removed
- [ ] Dependencies optimized
- [ ] Async/defer for non-critical scripts
- [ ] Minimize third-party scripts
- [ ] Use production builds

### CSS

- [ ] Critical CSS inlined
- [ ] Unused CSS removed
- [ ] Minified in production
- [ ] CSS-in-JS optimized
- [ ] Font loading optimized

### Fonts

- [ ] Limited font weights
- [ ] font-display: swap
- [ ] Preload critical fonts
- [ ] Subset fonts if possible
- [ ] Consider system fonts

### Caching

- [ ] Browser caching configured
- [ ] Service worker implemented
- [ ] CDN for static assets
- [ ] Cache versioning strategy
- [ ] Efficient cache invalidation

### Network

- [ ] HTTP/2 enabled
- [ ] Compression enabled (Gzip/Brotli)
- [ ] DNS prefetch for external domains
- [ ] Preconnect for critical resources
- [ ] Resource hints implemented

## Advanced Techniques

### 1. Intersection Observer for Lazy Loading

```typescript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Load content
      loadSection(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

// Observe sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
```

### 2. Request Idle Callback for Non-Critical Work

```typescript
// Defer non-critical work
if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Perform analytics, prefetching, etc.
    trackAnalytics();
  });
} else {
  setTimeout(trackAnalytics, 1);
}
```

### 3. Resource Prioritization

```html
<!-- High priority: critical for LCP -->
<link rel="preload" as="image" href="/hero.webp" fetchpriority="high">

<!-- Low priority: below the fold -->
<img src="/footer-logo.webp" loading="lazy" fetchpriority="low">
```

### 4. HTTP/2 Server Push (if supported)

```text
Link: </styles.css>; rel=preload; as=style
Link: </app.js>; rel=preload; as=script
```

## Troubleshooting Performance Issues

### Common Issues and Solutions

**Slow Initial Load:**

- Check bundle size with bundle analyzer
- Implement code splitting
- Optimize images
- Enable compression

**High Cumulative Layout Shift:**

- Add width/height to images
- Reserve space for dynamic content
- Use CSS aspect-ratio
- Optimize font loading

**Poor Time to Interactive:**

- Reduce JavaScript execution time
- Defer non-critical scripts
- Use code splitting
- Minimize third-party scripts

**Large Bundle Size:**

- Remove unused dependencies
- Use dynamic imports
- Optimize images
- Enable tree shaking

## Testing Performance

### Local Testing

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview

# Run Lighthouse
# Open Chrome DevTools → Lighthouse → Generate Report
```

### CI/CD Performance Testing

```yaml
# .github/workflows/performance.yml
- name: Lighthouse CI
  run: |
    npm install -g @lhci/cli
    lhci autorun
```

### Real User Monitoring (RUM)

```typescript
// Track real user metrics
import { getCLS, getFID, getLCP } from 'web-vitals';

getCLS(metric => telemetryService.trackMetric('CLS', metric.value));
getFID(metric => telemetryService.trackMetric('FID', metric.value));
getLCP(metric => telemetryService.trackMetric('LCP', metric.value));
```

## Resources

### Tools

- **Lighthouse**: <https://developers.google.com/web/tools/lighthouse>
- **WebPageTest**: <https://www.webpagetest.org>
- **GTmetrix**: <https://gtmetrix.com>
- **Bundle Analyzer**: <https://www.npmjs.com/package/vite-bundle-visualizer>

### Documentation

- **Web.dev**: <https://web.dev/performance>
- **MDN Performance**: <https://developer.mozilla.org/en-US/docs/Web/Performance>
- **Core Web Vitals**: <https://web.dev/vitals>

### Communities

- **Web Performance Slack**: <https://webperformance.slack.com>
- **Performance.now() Conference**: <https://perfnow.nl>

---

**Last Updated**: January 2026

**Note**: Performance optimization is an ongoing process. Regular monitoring and updates are essential.
