import { render, screen } from '@testing-library/react'
import FeaturedBookHero from '../src/components/FeaturedBookHero'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import '@testing-library/jest-dom'

// Mock telemetry so tests don't attempt real AppInsights calls
vi.mock('../src/utilities/TelemetryService', () => ({
  telemetryService: {
    trackHomepageExperimentExposed: vi.fn(),
    trackFeaturedBookPrimaryCtaClicked: vi.fn(),
    trackFeaturedBookSecondaryCtaClicked: vi.fn(),
  },
}))

const baseProps = {
  title: 'The Great Novel',
  authorName: 'Jane Doe',
  description: 'A gripping story about life.',
  coverImageUrl: '/cover.jpg',
  coverImageAlt: 'Cover of The Great Novel',
  primaryCtaLabel: 'Buy Now',
  primaryCtaUrl: 'https://example.com/buy',
}

describe('FeaturedBookHero', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the book title in an h1', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The Great Novel')
  })

  it('renders the author name', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.getByText('by Jane Doe')).toBeInTheDocument()
  })

  it('renders the description', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.getByText('A gripping story about life.')).toBeInTheDocument()
  })

  it('renders the cover image with correct alt text', () => {
    render(<FeaturedBookHero {...baseProps} />)
    const img = screen.getByAltText('Cover of The Great Novel')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', '/cover.jpg')
  })

  it('renders the primary CTA link', () => {
    render(<FeaturedBookHero {...baseProps} />)
    const link = screen.getByRole('link', { name: 'Buy Now' })
    expect(link).toHaveAttribute('href', 'https://example.com/buy')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders subtitle when provided', () => {
    render(<FeaturedBookHero {...baseProps} subtitle="An Epic Tale" />)
    expect(screen.getByText('An Epic Tale')).toBeInTheDocument()
  })

  it('does not render subtitle when not provided', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.queryByText(/An Epic Tale/)).not.toBeInTheDocument()
  })

  it('renders secondary CTA when both label and url are provided', () => {
    render(
      <FeaturedBookHero
        {...baseProps}
        secondaryCtaLabel="Learn More"
        secondaryCtaUrl="https://example.com/more"
      />
    )
    const link = screen.getByRole('link', { name: 'Learn More' })
    expect(link).toHaveAttribute('href', 'https://example.com/more')
  })

  it('does not render secondary CTA when not provided', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.queryByRole('link', { name: 'Learn More' })).not.toBeInTheDocument()
  })

  it('renders available formats when provided', () => {
    render(<FeaturedBookHero {...baseProps} formats={['Hardcover', 'eBook', 'Audiobook']} />)
    expect(screen.getByText('Available in: Hardcover, eBook, Audiobook')).toBeInTheDocument()
  })

  it('does not render formats section when not provided', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.queryByText(/Available in:/)).not.toBeInTheDocument()
  })

  it('has an accessible section landmark with aria-label', () => {
    render(<FeaturedBookHero {...baseProps} />)
    expect(screen.getByRole('region', { name: 'Featured book: The Great Novel' })).toBeInTheDocument()
  })
})
