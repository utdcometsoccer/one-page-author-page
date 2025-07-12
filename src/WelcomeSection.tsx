import React from 'react'

interface WelcomeSectionProps {
  header: string
  welcome: string
}

const WelcomeSection: React.FC<WelcomeSectionProps> = ({ header, welcome }) => (
  <header className="welcome" id="welcome">
    <h1>{header}</h1>
    <p>{welcome}</p>
  </header>
)

export default WelcomeSection
