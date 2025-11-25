import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  elevated?: boolean
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  elevated = false
}) => {
  const baseClass = 'card-component'
  const elevatedClass = elevated ? 'card-elevated' : ''

  return (
    <div className={`${baseClass} ${elevatedClass} ${className}`.trim()}>
      {children}
    </div>
  )
}

export default Card
