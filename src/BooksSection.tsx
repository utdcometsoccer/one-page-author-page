import React from 'react'

import type { Book } from './types'

interface BooksSectionProps {
  header: string
  books: Book[]
}

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
                />
              </div>
            )}
            <div className="book-info">
              {book.url ? (
                <a
                  href={book.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1a0dab', textDecoration: 'none', fontWeight: 600 }}
                >
                  <h3>{book.title}</h3>
                </a>
              ) : (
                <h3>{book.title}</h3>
              )}
              <p>{book.description}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
)

export default BooksSection
