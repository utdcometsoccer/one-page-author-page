import React from 'react';
import type { Article } from './types';

interface ArticlesSectionProps {
  header: string;
  articles: Article[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ header, articles }) => {
  if (!articles || articles.length === 0) return null;
  return (
    <section id="articles" className="articles-section">
      <h2>{header}</h2>
      <ul>
        {articles.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            {article.publication && <span className="article-publication"> ({article.publication})</span>}
            {article.date && <span className="article-date"> - {article.date}</span>}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticlesSection;
