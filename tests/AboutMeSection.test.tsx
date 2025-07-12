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

  it('renders the headshot image', () => {
    render(
      <AboutMeSection header="About Me" aboutMe="Text" headshot="/test.jpg" />
    )
    const img = screen.getByAltText('Author headshot')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/test.jpg')
  })
})
