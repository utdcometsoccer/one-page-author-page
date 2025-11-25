import React from 'react'

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
  ...props
}) => {
  const isExternal = external || (href && (href.startsWith('http://') || href.startsWith('https://')))

  return (
    <a
      href={href}
      className={`link ${isExternal ? 'link-external' : ''} ${className}`.trim()}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {isExternal && <span className="external-link-icon" aria-hidden="true"> ↗</span>}
    </a>
  )
}

export default Link
