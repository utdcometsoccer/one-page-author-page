import React from 'react'

interface AboutMeSectionProps {
  header: string
  aboutMe: string
  headshot: string
  authorName?: string
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ header, aboutMe, headshot, authorName }) => (
  <section className="about-me" id="about-me">
    <div className="about-me-content">
      <img
        src={headshot}
        alt={authorName ? `${authorName} headshot` : 'Author headshot'}
        className="about-me-headshot"
        loading="lazy"
        width="150"
        height="150"
      />
      <div className="about-me-text">
        <h2>{header}</h2>
        <p>{aboutMe}</p>
      </div>
    </div>
  </section>
)

export default AboutMeSection
