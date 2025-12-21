import { useEffect } from 'react';
import type { SEOMetadata } from '../types';

interface SEOManagerProps {
  metadata: SEOMetadata;
  authorName?: string;
}

/**
 * SEOManager component handles dynamic meta tags for SEO optimization
 * Manages Open Graph, Twitter Cards, and standard meta tags
 */
export function SEOManager({ metadata, authorName }: SEOManagerProps) {
  useEffect(() => {
    const baseUrl = window.location.origin;
    const currentUrl = window.location.href;
    
    // Set title
    if (metadata.title) {
      document.title = metadata.title;
    } else if (authorName) {
      document.title = `${authorName} - Author`;
    }
    
    // Helper function to set meta tag
    const setMetaTag = (selector: string, content: string) => {
      if (!content) return;
      
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const attrMatch = selector.match(/\[([^=]+)="([^"]+)"\]/);
        if (attrMatch) {
          element.setAttribute(attrMatch[1], attrMatch[2]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };
    
    // Set canonical URL
    const setCanonicalUrl = (url: string) => {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', url);
    };
    
    // Standard meta tags
    if (metadata.description) {
      setMetaTag('meta[name="description"]', metadata.description);
    }
    
    if (metadata.keywords && metadata.keywords.length > 0) {
      setMetaTag('meta[name="keywords"]', metadata.keywords.join(', '));
    }
    
    setMetaTag('meta[name="author"]', authorName || '');
    
    // Open Graph meta tags for social sharing
    setMetaTag('meta[property="og:title"]', metadata.title || authorName || '');
    setMetaTag('meta[property="og:description"]', metadata.description || '');
    setMetaTag('meta[property="og:type"]', metadata.type || 'profile');
    setMetaTag('meta[property="og:url"]', metadata.canonicalUrl || currentUrl);
    
    if (metadata.image) {
      const imageUrl = metadata.image.startsWith('http') 
        ? metadata.image 
        : `${baseUrl}${metadata.image}`;
      setMetaTag('meta[property="og:image"]', imageUrl);
      setMetaTag('meta[property="og:image:alt"]', `${authorName || 'Author'} photo`);
    }
    
    // Twitter Card meta tags
    setMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', metadata.title || authorName || '');
    setMetaTag('meta[name="twitter:description"]', metadata.description || '');
    
    if (metadata.image) {
      const imageUrl = metadata.image.startsWith('http') 
        ? metadata.image 
        : `${baseUrl}${metadata.image}`;
      setMetaTag('meta[name="twitter:image"]', imageUrl);
      setMetaTag('meta[name="twitter:image:alt"]', `${authorName || 'Author'} photo`);
    }
    
    // Canonical URL
    if (metadata.canonicalUrl) {
      setCanonicalUrl(metadata.canonicalUrl);
    } else {
      setCanonicalUrl(currentUrl.split('?')[0].split('#')[0]);
    }
    
    // Language attribute on html tag
    const htmlElement = document.documentElement;
    const locale = htmlElement.getAttribute('lang') || 'en';
    setMetaTag('meta[property="og:locale"]', locale.replace('/', '_'));
    
  }, [metadata, authorName]);
  
  return null; // This component doesn't render anything
}

export default SEOManager;
