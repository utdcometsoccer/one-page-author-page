import type { FeaturedBook, HomepageExperiment } from '../types'

/**
 * Determines whether the featured-book hero should be shown.
 * Returns true only when BOTH conditions are met:
 *   1. A featured book exists in the data
 *   2. The experiment variant is 'featured-book-hero'
 * In all other cases, the existing homepage experience is preserved.
 */
export function shouldShowFeaturedBookHero(
  featuredBook: FeaturedBook | undefined,
  experiment: HomepageExperiment | undefined
): boolean {
  return !!featuredBook && experiment?.homepageHeroVariant === 'featured-book-hero'
}
