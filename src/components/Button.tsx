import React from 'react'
import { telemetryService } from '../utilities/TelemetryService'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  children: React.ReactNode
  trackingName?: string
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  className = '',
  trackingName,
  onClick,
  ...props
}) => {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`
  const widthClass = fullWidth ? 'btn-full-width' : ''

  // Extract text from children for tracking name
  const getButtonName = (): string => {
    if (trackingName) return trackingName
    if (typeof children === 'string') return children
    // For non-string children, use aria-label, class name, or generic 'button'
    return props['aria-label'] || className || 'button'
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    telemetryService.trackButtonClick(getButtonName(), variant)
    onClick?.(e)
  }

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
