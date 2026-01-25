/**
 * Generates breadcrumb structured data for navigation
 * Follows schema.org BreadcrumbList schema
 */
export function generateBreadcrumbSchema(): object {
  const baseUrl = window.location.origin;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': baseUrl
      }
    ]
  };
}

/**
 * Generates FAQ structured data for common author questions
 */
export function generateFAQSchema(authorName: string, aboutMe: string, email?: string): object {
  const faqItems = [
    {
      '@type': 'Question',
      'name': `Who is ${authorName}?`,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': aboutMe
      }
    }
  ];
  
  if (email) {
    faqItems.push({
      '@type': 'Question',
      'name': `How can I contact ${authorName}?`,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': `You can reach ${authorName} via email at ${email}`
      }
    });
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems
  };
}

/**
 * Helper function to inject structured data script into the document head
 * Removes existing script with the same ID and appends new one
 */
function injectStructuredDataScript(id: string, schema: object): void {
  // Remove existing script if present
  const existingScript = document.getElementById(id);
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create and inject new script
  const script = document.createElement('script');
  script.id = id;
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

/**
 * Injects breadcrumb and FAQ structured data into the document
 * This function is idempotent and can be called multiple times safely
 */
export function injectAdditionalStructuredData(
  authorName: string, 
  aboutMe: string, 
  email?: string
): void {
  // Generate and inject breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema();
  injectStructuredDataScript('breadcrumb-schema', breadcrumbSchema);
  
  // Generate and inject FAQ schema
  const faqSchema = generateFAQSchema(authorName, aboutMe, email);
  injectStructuredDataScript('faq-schema', faqSchema);
}

export default {
  generateBreadcrumbSchema,
  generateFAQSchema,
  injectAdditionalStructuredData
};
