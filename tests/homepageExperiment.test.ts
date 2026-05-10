import { describe, it, expect } from 'vitest'
import { shouldShowFeaturedBookHero } from '../src/utilities/homepageExperiment'
import type { FeaturedBook, HomepageExperiment } from '../src/types'

const featuredBook: FeaturedBook = {
  title: 'The Great Novel',
  authorName: 'Jane Doe',
  description: 'A gripping story.',
  coverImageUrl: '/cover.jpg',
  coverImageAlt: 'Cover',
  primaryCtaLabel: 'Buy Now',
  primaryCtaUrl: 'https://example.com/buy',
}

const variantExperiment: HomepageExperiment = { homepageHeroVariant: 'featured-book-hero' }
const controlExperiment: HomepageExperiment = { homepageHeroVariant: 'control' }
const emptyExperiment: HomepageExperiment = {}

describe('shouldShowFeaturedBookHero', () => {
  it('returns true when variant is "featured-book-hero" and featuredBook exists', () => {
    expect(shouldShowFeaturedBookHero(featuredBook, variantExperiment)).toBe(true)
  })

  it('returns false when variant is "control" even if featuredBook exists', () => {
    expect(shouldShowFeaturedBookHero(featuredBook, controlExperiment)).toBe(false)
  })

  it('returns false when featuredBook is undefined even if variant is "featured-book-hero"', () => {
    expect(shouldShowFeaturedBookHero(undefined, variantExperiment)).toBe(false)
  })

  it('returns false when both featuredBook and experiment are undefined (control fallback)', () => {
    expect(shouldShowFeaturedBookHero(undefined, undefined)).toBe(false)
  })

  it('returns false when experiment is undefined even if featuredBook exists', () => {
    expect(shouldShowFeaturedBookHero(featuredBook, undefined)).toBe(false)
  })

  it('returns false when experiment has no homepageHeroVariant (empty object)', () => {
    expect(shouldShowFeaturedBookHero(featuredBook, emptyExperiment)).toBe(false)
  })
})
