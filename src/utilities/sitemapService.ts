/**
 * Sitemap Service
 * 
 * Manages dynamic sitemap functionality with feature flag support.
 * When enabled, fetches sitemap from a remote API. Falls back to static
 * sitemap.xml when disabled or on error.
 */

/**
 * Configuration for sitemap service
 */
interface SitemapConfig {
  enabled: boolean;
  apiUrl: string;
}

/**
 * Get sitemap configuration from environment variables
 */
function getSitemapConfig(): SitemapConfig {
  const enabled = import.meta.env.VITE_DYNAMIC_SITEMAP_ENABLED === 'true';
  const apiUrl = import.meta.env.VITE_SITEMAP_API_URL || '';
  
  return {
    enabled,
    apiUrl
  };
}

/**
 * Fetch sitemap XML from remote API
 * @param apiUrl - The API endpoint that returns sitemap XML
 * @returns Promise resolving to sitemap XML string
 * @throws Error if fetch fails
 */
async function fetchDynamicSitemap(apiUrl: string): Promise<string> {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sitemap: ${response.status} ${response.statusText}`);
    }
    
    const sitemapXml = await response.text();
    
    // Basic validation that we received XML content
    if (!sitemapXml.includes('<?xml') && !sitemapXml.includes('<urlset')) {
      throw new Error('Invalid sitemap format received from API');
    }
    
    return sitemapXml;
  } catch (error) {
    console.error('Error fetching dynamic sitemap:', error);
    throw error;
  }
}

/**
 * Fetch static sitemap from public folder
 * @returns Promise resolving to sitemap XML string
 */
async function fetchStaticSitemap(): Promise<string> {
  try {
    const response = await fetch('/sitemap.xml');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch static sitemap: ${response.status} ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error('Error fetching static sitemap:', error);
    throw error;
  }
}

/**
 * Get sitemap content based on configuration
 * 
 * This function implements the following logic:
 * 1. If dynamic sitemap is enabled and API URL is configured, try to fetch from API
 * 2. If API fetch fails or dynamic sitemap is disabled, fall back to static sitemap
 * 3. If both fail, return null
 * 
 * @returns Promise resolving to sitemap XML string or null if unavailable
 */
export async function getSitemap(): Promise<string | null> {
  const config = getSitemapConfig();
  
  // If dynamic sitemap is enabled and API URL is configured
  if (config.enabled && config.apiUrl) {
    try {
      console.log('Attempting to fetch dynamic sitemap from:', config.apiUrl);
      const dynamicSitemap = await fetchDynamicSitemap(config.apiUrl);
      console.log('Successfully fetched dynamic sitemap');
      return dynamicSitemap;
    } catch (error) {
      console.warn('Dynamic sitemap fetch failed, falling back to static sitemap:', error);
      // Fall through to static sitemap
    }
  } else {
    console.log('Dynamic sitemap disabled, using static sitemap');
  }
  
  // Fallback to static sitemap
  try {
    const staticSitemap = await fetchStaticSitemap();
    return staticSitemap;
  } catch (error) {
    console.error('Failed to fetch both dynamic and static sitemaps:', error);
    return null;
  }
}

/**
 * Check if dynamic sitemap feature is enabled
 * @returns boolean indicating if dynamic sitemap is enabled
 */
export function isDynamicSitemapEnabled(): boolean {
  const config = getSitemapConfig();
  return config.enabled && !!config.apiUrl;
}

/**
 * Inject sitemap into the page
 * 
 * This function creates a link element in the page head pointing to the sitemap.
 * For dynamic sitemaps, it could also create a data URL with the sitemap content.
 * 
 * @param sitemapContent - The sitemap XML content (optional)
 */
export function injectSitemapLink(sitemapContent?: string): void {
  // Remove any existing sitemap link
  const existingLink = document.querySelector('link[rel="sitemap"]');
  if (existingLink) {
    existingLink.remove();
  }
  
  // Create new sitemap link
  const link = document.createElement('link');
  link.rel = 'sitemap';
  link.type = 'application/xml';
  
  if (sitemapContent && isDynamicSitemapEnabled()) {
    // For dynamic sitemap, create a data URL
    const blob = new Blob([sitemapContent], { type: 'application/xml' });
    link.href = URL.createObjectURL(blob);
    link.title = 'Sitemap (Dynamic)';
  } else {
    // For static sitemap, point to the static file
    link.href = '/sitemap.xml';
    link.title = 'Sitemap';
  }
  
  document.head.appendChild(link);
}

export default {
  getSitemap,
  isDynamicSitemapEnabled,
  injectSitemapLink
};
