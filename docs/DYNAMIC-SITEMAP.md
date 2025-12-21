# Dynamic Sitemap

This document describes the dynamic sitemap feature implementation for the One Page Author Page application.

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [How It Works](#how-it-works)
- [API Requirements](#api-requirements)
- [Usage Examples](#usage-examples)
- [Troubleshooting](#troubleshooting)

## Overview

The dynamic sitemap feature allows the application to fetch sitemap content from a remote API endpoint instead of using a static sitemap.xml file. This enables:

- **Dynamic content generation**: Sitemaps can be generated on-demand based on current author data, books, articles, etc.
- **Centralized management**: Multiple author pages can share the same sitemap API endpoint
- **Automated updates**: Sitemap content updates automatically when the API data changes
- **Graceful fallback**: If the API is unavailable, the application falls back to the static sitemap.xml

### Feature Flag

The dynamic sitemap feature is **disabled by default** using a feature flag. This ensures backward compatibility and allows opt-in adoption.

## Configuration

The dynamic sitemap feature is configured using environment variables in the `.env` file:

### Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_DYNAMIC_SITEMAP_ENABLED` | Feature flag to enable/disable dynamic sitemap | `false` | `true` or `false` |
| `VITE_SITEMAP_API_URL` | API endpoint URL that returns sitemap XML | _(empty)_ | `https://api.example.com/sitemap` |

### Example Configuration

To enable the dynamic sitemap feature, update your `.env` file:

```env
# Enable dynamic sitemap
VITE_DYNAMIC_SITEMAP_ENABLED=true

# Set your sitemap API endpoint
VITE_SITEMAP_API_URL=https://onepageauthorapi.azurewebsites.net/api/GetSitemap
```

To disable the feature (use static sitemap):

```env
# Disable dynamic sitemap (default)
VITE_DYNAMIC_SITEMAP_ENABLED=false

# API URL can be left empty when disabled
VITE_SITEMAP_API_URL=
```

## How It Works

### Initialization Flow

1. **Application Startup**: When the application loads, it initializes the sitemap service
2. **Feature Check**: The service checks if dynamic sitemap is enabled via `VITE_DYNAMIC_SITEMAP_ENABLED`
3. **Dynamic Fetch** (if enabled):
   - Attempts to fetch sitemap XML from the API endpoint specified in `VITE_SITEMAP_API_URL`
   - Validates the response is valid XML sitemap format
   - Injects the sitemap link into the page head
4. **Fallback** (on error or disabled):
   - Falls back to the static `public/sitemap.xml` file
   - Injects the static sitemap link into the page head

### Decision Logic

```
┌─────────────────────────────────────┐
│ Application Starts                  │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│ Is VITE_DYNAMIC_SITEMAP_ENABLED     │
│ set to "true"?                      │
└──────────┬─────────────────┬────────┘
           │ Yes             │ No
           ▼                 ▼
┌─────────────────────┐  ┌──────────────────┐
│ Is API URL set?     │  │ Use static       │
└──────┬──────────┬───┘  │ sitemap.xml      │
       │ Yes      │ No   └──────────────────┘
       ▼          ▼
┌──────────┐  ┌──────────────────┐
│ Fetch    │  │ Use static       │
│ from API │  │ sitemap.xml      │
└────┬─────┘  └──────────────────┘
     │
     ▼
┌──────────────────┐
│ Success?         │
└────┬─────────┬───┘
     │ Yes     │ No
     ▼         ▼
┌─────────┐ ┌──────────────────┐
│ Use     │ │ Fallback to      │
│ dynamic │ │ static sitemap   │
│ sitemap │ │                  │
└─────────┘ └──────────────────┘
```

### Code Implementation

The sitemap service is located at `src/utilities/sitemapService.ts` and provides three main functions:

- **`getSitemap()`**: Fetches sitemap based on configuration (dynamic or static)
- **`isDynamicSitemapEnabled()`**: Checks if dynamic sitemap feature is enabled
- **`injectSitemapLink()`**: Injects sitemap link element into page head

Integration happens in `src/App.tsx` during application initialization using a React `useEffect` hook.

## API Requirements

### Endpoint Specification

The sitemap API endpoint must meet the following requirements:

#### HTTP Method
- **GET** request

#### Response Format
- **Content-Type**: `application/xml` or `text/xml`
- **Body**: Valid XML sitemap following the [Sitemaps Protocol](https://www.sitemaps.org/protocol.html)

#### Example Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.authorpage.com/</loc>
    <lastmod>2025-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.authorpage.com/books</loc>
    <lastmod>2025-01-10</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

#### Status Codes
- **200 OK**: Sitemap successfully retrieved
- **404 Not Found**: Sitemap not available (fallback to static sitemap)
- **500 Server Error**: API error (fallback to static sitemap)

#### CORS Configuration
The API endpoint must have CORS headers configured to allow requests from your application domain:

```
Access-Control-Allow-Origin: https://your-author-page.com
Access-Control-Allow-Methods: GET
```

### API Implementation Example

If you're building an Azure Function or similar API endpoint:

```javascript
// Example Azure Function
module.exports = async function (context, req) {
    // Get author identifier from query or route parameters
    const author = req.query.author || req.params.author;
    
    // Generate sitemap based on author's data
    const sitemap = generateSitemapForAuthor(author);
    
    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/xml',
            'Access-Control-Allow-Origin': '*'
        },
        body: sitemap
    };
};
```

## Usage Examples

### Example 1: Enable Dynamic Sitemap

1. Set environment variables in `.env`:
   ```env
   VITE_DYNAMIC_SITEMAP_ENABLED=true
   VITE_SITEMAP_API_URL=https://api.mysite.com/api/GetSitemap?author=johndoe
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

3. The application will fetch sitemap from the API endpoint on load

### Example 2: Disable Dynamic Sitemap

1. Set environment variables in `.env`:
   ```env
   VITE_DYNAMIC_SITEMAP_ENABLED=false
   VITE_SITEMAP_API_URL=
   ```

2. Build and deploy:
   ```bash
   npm run build
   ```

3. The application will use the static `public/sitemap.xml` file

### Example 3: Testing Locally

You can test the dynamic sitemap feature locally:

1. Start a local development server:
   ```bash
   npm run dev
   ```

2. Open browser developer console to see sitemap initialization logs:
   - "Attempting to fetch dynamic sitemap from: [URL]" - when enabled
   - "Successfully fetched dynamic sitemap" - on success
   - "Dynamic sitemap disabled, using static sitemap" - when disabled
   - Error messages if fetching fails

3. Inspect the page `<head>` to verify sitemap link:
   ```html
   <link rel="sitemap" type="application/xml" href="/sitemap.xml" title="Sitemap">
   ```

## Troubleshooting

### Issue: Dynamic sitemap not loading

**Symptoms**: Console shows "Dynamic sitemap disabled, using static sitemap" even though it's enabled

**Solutions**:
1. Check that `VITE_DYNAMIC_SITEMAP_ENABLED=true` in `.env`
2. Verify `VITE_SITEMAP_API_URL` is set to a valid URL
3. Rebuild the application: `npm run build`
4. Clear browser cache and reload

### Issue: API returns error

**Symptoms**: Console shows "Dynamic sitemap fetch failed, falling back to static sitemap"

**Solutions**:
1. Verify the API endpoint is accessible (try in browser or curl)
2. Check API CORS configuration allows your domain
3. Verify API returns valid XML sitemap format
4. Check API authentication/authorization if required
5. Review API logs for server-side errors

### Issue: Sitemap link not appearing in page

**Symptoms**: No `<link rel="sitemap">` element in page head

**Solutions**:
1. Check browser console for error messages
2. Verify static `public/sitemap.xml` file exists
3. Check that App.tsx sitemap initialization is not throwing errors
4. Verify the sitemap service is imported correctly

### Issue: Invalid sitemap format

**Symptoms**: Console shows "Invalid sitemap format received from API"

**Solutions**:
1. Verify API response includes XML declaration `<?xml version="1.0" encoding="UTF-8"?>`
2. Ensure response includes `<urlset>` root element
3. Validate sitemap against [Sitemaps Protocol](https://www.sitemaps.org/protocol.html)
4. Use [XML validator](https://www.xmlvalidation.com/) to check syntax

### Debugging Tips

1. **Enable verbose logging**: Check browser console for detailed logs
2. **Test API endpoint**: Use curl or Postman to verify API response
   ```bash
   curl -i https://api.mysite.com/api/GetSitemap
   ```
3. **Inspect network tab**: Look for sitemap API request in browser DevTools Network tab
4. **Verify environment**: Ensure environment variables are loaded correctly
   ```javascript
   console.log('VITE_DYNAMIC_SITEMAP_ENABLED:', import.meta.env.VITE_DYNAMIC_SITEMAP_ENABLED);
   console.log('VITE_SITEMAP_API_URL:', import.meta.env.VITE_SITEMAP_API_URL);
   ```

## Static Sitemap Fallback

The static sitemap is located at `public/sitemap.xml` and is always copied to the build output. This ensures:

- **Reliability**: Always have a working sitemap even if API fails
- **SEO Safety**: Search engines can always find a sitemap
- **Zero downtime**: No impact if API is temporarily unavailable

To update the static sitemap:

1. Edit `public/sitemap.xml`
2. Update URLs to match your deployment domain
3. Update `lastmod` dates when content changes
4. Rebuild and deploy

## Best Practices

1. **Always maintain static sitemap**: Keep `public/sitemap.xml` up to date as a reliable fallback
2. **Test before enabling**: Test your API endpoint thoroughly before enabling in production
3. **Monitor API performance**: Ensure API responds quickly (< 2 seconds recommended)
4. **Use caching**: Consider caching sitemap API responses on the server
5. **Handle errors gracefully**: The service automatically falls back to static sitemap on errors
6. **Update regularly**: Keep both dynamic API and static sitemap updated as content changes

## Related Documentation

- [SEO Guide](./SEO-GUIDE.md) - Comprehensive SEO optimization guide
- [Deployment](./DEPLOYMENT.md) - Deployment configuration
- [Documentation Standards](./DOCUMENTATION-STANDARDS.md) - Repository documentation guidelines

## Support

For issues or questions about the dynamic sitemap feature:

1. Check the [Troubleshooting](#troubleshooting) section
2. Review browser console logs for error messages
3. Test API endpoint independently
4. Verify environment variable configuration
