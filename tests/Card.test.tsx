import { render, screen } from '@testing-library/react'
import { Card } from '../src/components'
import { describe, it, expect } from 'vitest'

describe('Card', () => {
  it('renders children content', () => {
    render(<Card><p>Card content</p></Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('applies base class', () => {
    const { container } = render(<Card>Content</Card>)
    expect(container.firstChild).toHaveClass('card-component')
  })

  it('applies elevated class when specified', () => {
    const { container } = render(<Card elevated>Elevated</Card>)
    expect(container.firstChild).toHaveClass('card-elevated')
  })

  it('applies custom className', () => {
    const { container } = render(<Card className="custom-card">Custom</Card>)
    expect(container.firstChild).toHaveClass('custom-card')
  })
})
