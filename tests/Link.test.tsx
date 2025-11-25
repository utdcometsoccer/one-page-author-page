import { render, screen } from '@testing-library/react'
import { Link } from '../src/components'
import { describe, it, expect } from 'vitest'

describe('Link', () => {
  it('renders internal link without external indicator', () => {
    render(<Link href="/about">About</Link>)
    const link = screen.getByRole('link', { name: 'About' })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '/about')
    expect(link).not.toHaveAttribute('target', '_blank')
    expect(screen.queryByText('↗')).not.toBeInTheDocument()
  })

  it('renders external link with indicator and attributes', () => {
    render(<Link href="https://example.com">External</Link>)
    const link = screen.getByRole('link', { name: /External/ })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(screen.getByText('↗')).toBeInTheDocument()
  })

  it('forces external styling when external prop is true', () => {
    render(<Link href="/internal" external>Forced External</Link>)
    const link = screen.getByRole('link', { name: /Forced External/ })
    expect(link).toHaveAttribute('target', '_blank')
    expect(screen.getByText('↗')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Link href="/test" className="custom-class">Link</Link>)
    expect(screen.getByRole('link')).toHaveClass('custom-class')
  })
})
