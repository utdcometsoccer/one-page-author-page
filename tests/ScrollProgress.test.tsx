import { render, screen, fireEvent } from '@testing-library/react'
import { ScrollProgress } from '../src/components'
import { describe, it, expect, beforeEach } from 'vitest'

describe('ScrollProgress', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true })
  })

  it('renders the progress bar container', () => {
    render(<ScrollProgress />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows 0% progress at the top of the page', () => {
    render(<ScrollProgress />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '0')
  })

  it('applies custom className when provided', () => {
    const { container } = render(<ScrollProgress className="custom-class" />)
    expect(container.querySelector('.scroll-progress-container')).toHaveClass('custom-class')
  })

  it('has correct accessibility attributes', () => {
    render(<ScrollProgress />)
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-label', 'Reading progress')
  })
})
