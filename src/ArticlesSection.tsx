import React from 'react';
import type { Article } from './types';
import { telemetryService } from './utilities/TelemetryService';

interface ArticlesSectionProps {
  header: string;
  articles: Article[];
}

const ArticlesSection: React.FC<ArticlesSectionProps> = ({ header, articles }) => {
  if (!articles || articles.length === 0) return null;

  const handleArticleClick = (article: Article) => {
    telemetryService.trackArticleLinkClick(article.title, article.url);
  };

  return (
    <section id="articles" className="articles-section">
      <h2>{header}</h2>
      <div className="articles-list">
        {articles.map((article, idx) => (
          <div key={idx} className="article-item article-item-margin">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleArticleClick(article)}
            >
              {article.title} <span aria-hidden="true">↗</span>
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
