import React from 'react'

interface AboutMeSectionProps {
  header: string
  aboutMe: string
  headshot: string
}

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ header, aboutMe, headshot }) => (
  <section className="about-me" id="about-me">
    <div className="about-me-content">
      <img
        src={headshot}
        alt="Author headshot"
        className="about-me-headshot"
      />
      <div className="about-me-text">
        <h2>{header}</h2>
        <p>{aboutMe}</p>
      </div>
    </div>
  </section>
)

export default AboutMeSection
