import type { AuthorData } from '../types';

/**
 * Generates JSON-LD structured data for an author's profile
 * Follows schema.org Person schema for better search engine understanding
 */
export function generateAuthorSchema(data: AuthorData): object {
  const baseUrl = window.location.origin;
  
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: data.name,
    description: data.aboutMe,
    image: data.headshot?.startsWith('http') 
      ? data.headshot 
      : `${baseUrl}${data.headshot}`,
  };
  
  // Add email if available
  if (data.email) {
    schema.email = data.email;
  }
  
  // Add social media profiles
  if (data.social && data.social.length > 0) {
    schema.sameAs = data.social.map(s => s.url);
  }
  
  // Add job title if it can be inferred from aboutMe
  if (data.aboutMe) {
    schema.jobTitle = 'Author';
  }
  
  return schema;
}

/**
 * Generates JSON-LD structured data for a book
 * Follows schema.org Book schema
 */
export function generateBookSchema(book: {
  title: string;
  description: string;
  url?: string;
  cover?: string;
}, authorName: string): object {
  const baseUrl = window.location.origin;
  
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.title,
    description: book.description,
    author: {
      '@type': 'Person',
      name: authorName,
    },
  };
  
  if (book.url) {
    schema.url = book.url;
  }
  
  if (book.cover) {
    schema.image = book.cover.startsWith('http') 
      ? book.cover 
      : `${baseUrl}${book.cover}`;
  }
  
  return schema;
}

/**
 * Generates JSON-LD structured data for an article
 * Follows schema.org Article schema
 */
export function generateArticleSchema(article: {
  title: string;
  url: string;
  publication?: string;
  date?: string;
}, authorName: string): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    url: article.url,
    author: {
      '@type': 'Person',
      name: authorName,
    },
  };
  
  if (article.publication) {
    schema.publisher = {
      '@type': 'Organization',
      name: article.publication,
    };
  }
  
  if (article.date) {
    schema.datePublished = article.date;
  }
  
  return schema;
}

/**
 * Generates comprehensive JSON-LD structured data combining all schemas
 */
export function generateStructuredData(data: AuthorData): object {
  const schemas = [generateAuthorSchema(data)];
  
  // Add book schemas if available
  if (data.books && data.books.length > 0) {
    data.books.forEach(book => {
      schemas.push(generateBookSchema(book, data.name));
    });
  }
  
  // Add article schemas if available
  if (data.articles && data.articles.length > 0) {
    data.articles.forEach(article => {
      schemas.push(generateArticleSchema(article, data.name));
    });
  }
  
  return {
    '@context': 'https://schema.org',
    '@graph': schemas,
  };
}

/**
 * Injects structured data script into the document head
 */
export function injectStructuredData(data: AuthorData): void {
  const structuredData = generateStructuredData(data);
  
  // Remove existing structured data script if present
  const existingScript = document.getElementById('structured-data');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Create and inject new script
  const script = document.createElement('script');
  script.id = 'structured-data';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

export default {
  generateAuthorSchema,
  generateBookSchema,
  generateArticleSchema,
  generateStructuredData,
  injectStructuredData,
};
