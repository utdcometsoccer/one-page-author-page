import React, { useEffect, useState } from 'react'

export interface ScrollProgressProps {
  className?: string
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ className = '' }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const calculateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      
      if (docHeight > 0) {
        const scrollPercent = (scrollTop / docHeight) * 100
        setProgress(Math.min(100, Math.max(0, scrollPercent)))
      }
    }

    window.addEventListener('scroll', calculateProgress, { passive: true })
    calculateProgress() // Calculate initial position
    
    return () => window.removeEventListener('scroll', calculateProgress)
  }, [])

  return (
    <div 
      className={`scroll-progress-container ${className}`.trim()}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div 
        className="scroll-progress-bar"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

export default ScrollProgress
