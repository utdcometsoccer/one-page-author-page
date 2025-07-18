import { render, screen } from '@testing-library/react'
import WelcomeSection from '../src/WelcomeSection'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

describe('WelcomeSection', () => {
  it('renders the header in an h1 tag', () => {
    render(<WelcomeSection header="Welcome" welcome="paragraph" />)
    const h1 = screen.getByRole('heading', { level: 1 })
    expect(h1).toHaveTextContent('Welcome')
  })

  it('renders the welcome text in a paragraph', () => {
    render(<WelcomeSection header="Welcome" welcome="paragraph" />)
    const p = screen.getByText('paragraph')
    expect(p.tagName.toLowerCase()).toBe('p')
  })
})