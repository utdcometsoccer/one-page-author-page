import { render, screen } from '@testing-library/react'
import { Button } from '../src/components'
import { describe, it, expect } from 'vitest'

describe('Button', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: 'Click me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('btn', 'btn-primary', 'btn-medium')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-secondary')

    rerender(<Button variant="outline">Outline</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-outline')
  })

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="small">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-small')

    rerender(<Button size="large">Large</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-large')
  })

  it('renders full width when specified', () => {
    render(<Button fullWidth>Full Width</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-full-width')
  })
})
