import { render, screen } from '@testing-library/react'
import AboutMeSection from '../src/AboutMeSection'
import { describe, it, expect } from 'vitest'

describe('AboutMeSection', () => {
  it('renders the about me header and text', () => {
    render(
      <AboutMeSection header="About Me" aboutMe="This is about me." headshot="/test.jpg" />
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('About Me')
    expect(screen.getByText('This is about me.')).toBeInTheDocument()
  })

  it('renders the headshot image with generic alt text when no author name', () => {
    render(
      <AboutMeSection header="About Me" aboutMe="Text" headshot="/test.jpg" />
    )
    const img = screen.getByAltText('Author headshot')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
    expect(img).toHaveAttribute('loading', 'lazy')
  })

  it('renders the headshot image with author name in alt text when provided', () => {
    render(
      <AboutMeSection header="About Me" aboutMe="Text" headshot="/test.jpg" authorName="Jane Doe" />
    )
    const img = screen.getByAltText('Jane Doe headshot')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
  })
})
