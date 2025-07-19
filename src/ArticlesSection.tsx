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
      <div className="articles-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {articles.map((article, idx) => (
          <div key={idx} className="article-item" style={{ marginBottom: '1rem' }}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            {article.publication && <span className="article-publication"> ({article.publication})</span>}
            {article.date && <span className="article-date"> - {article.date}</span>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;
