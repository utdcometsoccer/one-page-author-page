import React, { useEffect, useState } from 'react'
import { telemetryService } from '../utilities/TelemetryService'

export interface BackToTopProps {
  threshold?: number
  ariaLabel?: string
}

const BackToTop: React.FC<BackToTopProps> = ({ 
  threshold = 300,
  ariaLabel = 'Back to top'
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  const scrollToTop = () => {
    telemetryService.trackBackToTop()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button
      className="back-to-top"
      onClick={scrollToTop}
      aria-label={ariaLabel}
      type="button"
    >
      <span className="back-to-top-icon" aria-hidden="true">↑</span>
    </button>
  )
}

export default BackToTop
