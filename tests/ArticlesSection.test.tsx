import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ArticlesSection from '../src/ArticlesSection';
import type { Article } from '../src/types';

describe('ArticlesSection', () => {
  const articles: Article[] = [
    {
      title: 'Test Article 1',
      url: 'https://example.com/1',
      publication: 'Test Pub',
      date: '2024-01-01',
    },
    {
      title: 'Test Article 2',
      url: 'https://example.com/2',
    },
  ];

  it('renders nothing if no articles', () => {
    const { container } = render(<ArticlesSection header="Articles" articles={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders articles with title and link', () => {
    render(<ArticlesSection header="Articles" articles={articles} />);
    expect(screen.getByText('Articles')).toBeInTheDocument();
    expect(screen.getByText('Test Article 1')).toHaveAttribute('href', 'https://example.com/1');
    expect(screen.getByText('Test Article 2')).toHaveAttribute('href', 'https://example.com/2');
  });

  it('renders publication and date if present', () => {
    render(<ArticlesSection header="Articles" articles={articles} />);
    expect(screen.getByText(/Test Pub/)).toBeInTheDocument();
    expect(screen.getByText(/2024-01-01/)).toBeInTheDocument();
  });
});
