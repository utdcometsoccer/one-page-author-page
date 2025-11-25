import { useState } from 'react'
import type { ToastMessage } from './Toast'

// Hook for managing toast messages
export const useToast = () => {
  const [messages, setMessages] = useState<ToastMessage[]>([])

  const addToast = (message: string, type: ToastMessage['type'] = 'info', duration?: number) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
    setMessages((prev) => [...prev, { id, message, type, duration }])
    return id
  }

  const removeToast = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const success = (message: string, duration?: number) => addToast(message, 'success', duration)
  const error = (message: string, duration?: number) => addToast(message, 'error', duration)
  const info = (message: string, duration?: number) => addToast(message, 'info', duration)

  return {
    messages,
    addToast,
    removeToast,
    success,
    error,
    info
  }
}
