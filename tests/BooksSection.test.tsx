import { render, screen } from '@testing-library/react'
import BooksSection from '../src/BooksSection'
import { describe, it, expect } from 'vitest'

describe('BooksSection', () => {
  const books = [
    { title: 'Book 1', description: 'Desc 1', url: 'http://a.com', cover: '/cover1.jpg' },
    { title: 'Book 2', description: 'Desc 2', cover: '/cover2.jpg' },
  ]

  it('renders the books header', () => {
    render(<BooksSection header="My Books" books={books} />)
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Books')
  })

  it('renders all book titles and descriptions', () => {
    render(<BooksSection header="My Books" books={books} />)
    expect(screen.getByText('Book 1')).toBeInTheDocument()
    expect(screen.getByText('Book 2')).toBeInTheDocument()
    expect(screen.getByText('Desc 1')).toBeInTheDocument()
    expect(screen.getByText('Desc 2')).toBeInTheDocument()
  })

  it('renders book cover images', () => {
    render(<BooksSection header="My Books" books={books} />)
    expect(screen.getAllByAltText(/Cover of/)).toHaveLength(2)
  })
})
