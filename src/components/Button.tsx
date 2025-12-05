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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonName = trackingName || (typeof children === 'string' ? children : 'button')
    telemetryService.trackButtonClick(buttonName, variant)
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
