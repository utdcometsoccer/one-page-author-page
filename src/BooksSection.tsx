import React from 'react'

import type { Book } from './types'

interface BooksSectionProps {
  header: string
  books: Book[]
}

// Book cover image dimensions - matches design system
const BOOK_COVER_WIDTH = 133
const BOOK_COVER_HEIGHT = 200

const BooksSection: React.FC<BooksSectionProps> = ({ header, books }) => (
  <section className="my-books" id="my-books">
    <h2>{header}</h2>
    <div className="books-grid">
      {books.map((book, idx) => (
        <article className="book-card" key={idx}>
          <div className="book-info-with-cover">
            {book.cover && (
              <div className='book-cover'>
                <img
                  src={book.cover}
                  alt={`Cover of ${book.title}`}
                  className="book-cover-thumb"
                  loading="lazy"
                  width={BOOK_COVER_WIDTH}
                  height={BOOK_COVER_HEIGHT}
                />
              </div>
            )}
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              {book.url && (
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="book-cta-btn"
                >
                  Learn More <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default BooksSection
