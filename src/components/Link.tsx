import React from 'react'
import { telemetryService } from '../utilities/TelemetryService'

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  external?: boolean
  children: React.ReactNode
}

const Link: React.FC<LinkProps> = ({
  href,
  external = false,
  children,
  className = '',
  onClick,
  ...props
}) => {
  const isExternal = external || href.startsWith('http://') || href.startsWith('https://')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const linkText = typeof children === 'string' ? children : undefined
    telemetryService.trackLinkClick(href, linkText, isExternal)
    onClick?.(e)
  }

  return (
    <a
      href={href}
      className={`link ${isExternal ? 'link-external' : ''} ${className}`.trim()}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onClick={handleClick}
      {...props}
    >
      {children}
      {isExternal && <span className="external-link-icon" aria-hidden="true"> ↗</span>}
    </a>
  )
}

export default Link
