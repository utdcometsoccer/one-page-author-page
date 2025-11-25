import { render, screen, fireEvent } from '@testing-library/react'
import { BackToTop } from '../src/components'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('BackToTop', () => {
  beforeEach(() => {
    // Reset scroll position
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  it('does not render when scroll position is below threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true })
    render(<BackToTop threshold={300} />)
    expect(screen.queryByRole('button', { name: 'Back to top' })).not.toBeInTheDocument()
  })

  it('renders when scroll position is above threshold', () => {
    Object.defineProperty(window, 'scrollY', { value: 400, writable: true })
    render(<BackToTop threshold={300} />)
    
    // Trigger scroll event to update visibility
    fireEvent.scroll(window)
    
    expect(screen.getByRole('button', { name: 'Back to top' })).toBeInTheDocument()
  })

  it('calls window.scrollTo when clicked', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    const scrollToMock = vi.fn()
    window.scrollTo = scrollToMock
    
    render(<BackToTop threshold={300} />)
    fireEvent.scroll(window)
    
    const button = screen.getByRole('button', { name: 'Back to top' })
    fireEvent.click(button)
    
    expect(scrollToMock).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('uses custom aria label when provided', () => {
    Object.defineProperty(window, 'scrollY', { value: 500, writable: true })
    render(<BackToTop threshold={300} ariaLabel="Go to top" />)
    fireEvent.scroll(window)
    
    expect(screen.getByRole('button', { name: 'Go to top' })).toBeInTheDocument()
  })
})
