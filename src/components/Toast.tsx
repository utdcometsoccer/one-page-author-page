import React, { useEffect, useState } from 'react'

export interface ToastMessage {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

export interface ToastProps {
  messages: ToastMessage[]
  onRemove: (id: string) => void
}

const Toast: React.FC<ToastProps> = ({ messages, onRemove }) => {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {messages.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: ToastMessage
  onRemove: (id: string) => void
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true)
  const duration = toast.duration || 3000

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(() => onRemove(toast.id), 300) // Wait for fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [toast.id, duration, onRemove])

  const typeClass = toast.type ? `toast-${toast.type}` : 'toast-info'

  return (
    <div 
      className={`toast-item ${typeClass} ${isVisible ? 'toast-visible' : 'toast-hidden'}`}
      role="alert"
    >
      <span className="toast-message">{toast.message}</span>
      <button
        className="toast-close"
        onClick={() => onRemove(toast.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  )
}

export default Toast
