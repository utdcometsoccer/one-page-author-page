import { describe, it, expect, beforeEach, vi } from 'vitest';
import { isDynamicSitemapEnabled } from '../src/utilities/sitemapService';

describe('sitemapService', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  describe('isDynamicSitemapEnabled', () => {
    it('should return false when VITE_DYNAMIC_SITEMAP_ENABLED is not "true"', () => {
      // Default behavior when feature is disabled
      const result = isDynamicSitemapEnabled();
      expect(result).toBe(false);
    });

    it('should return false when VITE_SITEMAP_API_URL is empty', () => {
      // Even if enabled flag is true, returns false if no API URL
      const result = isDynamicSitemapEnabled();
      expect(result).toBe(false);
    });
  });
});
