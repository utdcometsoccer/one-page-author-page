import React from 'react'

import type { JSX } from 'react/jsx-runtime'

import type { SocialLink } from './types'
import { telemetryService } from './utilities/TelemetryService'

interface FooterProps {
  copyright: string
  social?: SocialLink[]
  socialIcons: Record<string, JSX.Element>
  darkMode: boolean
  onToggleTheme: () => void
  switchToLight?: string
  switchToDark?: string
}

const Footer: React.FC<FooterProps> = ({
  copyright,
  social,
  socialIcons,
  darkMode,
  onToggleTheme,
  switchToLight,
  switchToDark
}) => {
  const handleSocialClick = (name: string, url: string) => {
    telemetryService.trackSocialIconClick(name, url)
  }

  return (
    <footer>
      <p>{copyright}</p>
      {social && (
        <div className="social-links">
          {social.map((link) => {
            const key = link.name.toLowerCase()
            return (
              <a
                key={key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                className='social-icon-container'
                onClick={() => handleSocialClick(link.name, link.url)}
              >
                {socialIcons[key] || link.name}
              </a>
            )
          })}
        </div>
      )}
      <button
        className="theme-toggle-btn"
        onClick={onToggleTheme}
        aria-label="Toggle dark/light theme"
      >
        {darkMode ? (switchToLight || 'Switch to Light Theme') : (switchToDark || 'Switch to Dark Theme')}
      </button>
    </footer>
  )
}

export default Footer
