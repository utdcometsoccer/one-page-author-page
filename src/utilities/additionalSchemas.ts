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
 * Injects breadcrumb and FAQ structured data into the document
 */
export function injectAdditionalStructuredData(
  authorName: string, 
  aboutMe: string, 
  email?: string
): void {
  // Inject breadcrumb schema
  const breadcrumbScript = document.createElement('script');
  breadcrumbScript.id = 'breadcrumb-schema';
  breadcrumbScript.type = 'application/ld+json';
  breadcrumbScript.textContent = JSON.stringify(generateBreadcrumbSchema());
  
  // Remove existing breadcrumb script if present
  const existingBreadcrumb = document.getElementById('breadcrumb-schema');
  if (existingBreadcrumb) {
    existingBreadcrumb.remove();
  }
  document.head.appendChild(breadcrumbScript);
  
  // Inject FAQ schema
  const faqScript = document.createElement('script');
  faqScript.id = 'faq-schema';
  faqScript.type = 'application/ld+json';
  faqScript.textContent = JSON.stringify(generateFAQSchema(authorName, aboutMe, email));
  
  // Remove existing FAQ script if present
  const existingFAQ = document.getElementById('faq-schema');
  if (existingFAQ) {
    existingFAQ.remove();
  }
  document.head.appendChild(faqScript);
}

export default {
  generateBreadcrumbSchema,
  generateFAQSchema,
  injectAdditionalStructuredData
};
