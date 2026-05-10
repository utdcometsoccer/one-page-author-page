import React from 'react'
import type { FeaturedBook } from '../types'
import { telemetryService } from '../utilities/TelemetryService'

export type FeaturedBookHeroProps = FeaturedBook

const FeaturedBookHero: React.FC<FeaturedBookHeroProps> = ({
  title,
  subtitle,
  authorName,
  description,
  coverImageUrl,
  coverImageAlt,
  primaryCtaLabel,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaUrl,
  formats,
}) => {
  const handlePrimaryCtaClick = () => {
    telemetryService.trackFeaturedBookPrimaryCtaClicked(title, primaryCtaUrl, authorName)
  }

  const handleSecondaryCtaClick = () => {
    if (secondaryCtaUrl) {
      telemetryService.trackFeaturedBookSecondaryCtaClicked(title, secondaryCtaUrl, authorName)
    }
  }

  return (
    <section className="featured-book-hero" id="welcome" aria-label={`Featured book: ${title}`}>
      <div className="featured-book-hero__inner">
        <div className="featured-book-hero__cover">
          <img
            src={coverImageUrl}
            alt={coverImageAlt}
            className="featured-book-hero__cover-img"
            loading="eager"
          />
        </div>
        <div className="featured-book-hero__content">
          <h1 className="featured-book-hero__title">{title}</h1>
          {subtitle && <p className="featured-book-hero__subtitle">{subtitle}</p>}
          <p className="featured-book-hero__author">by {authorName}</p>
          <p className="featured-book-hero__description">{description}</p>
          {formats && formats.length > 0 && (
            <p className="featured-book-hero__formats">
              Available in: {formats.join(', ')}
            </p>
          )}
          <div className="featured-book-hero__ctas">
            <a
              href={primaryCtaUrl}
              className="featured-book-hero__cta-primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handlePrimaryCtaClick}
            >
              {primaryCtaLabel}
            </a>
            {secondaryCtaLabel && secondaryCtaUrl && (
              <a
                href={secondaryCtaUrl}
                className="featured-book-hero__cta-secondary"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleSecondaryCtaClick}
              >
                {secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedBookHero
