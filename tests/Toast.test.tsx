import { render, screen, fireEvent, act } from '@testing-library/react'
import { Toast, useToast } from '../src/components'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

// Test component that uses the useToast hook
const TestToastComponent = () => {
  const { messages, removeToast, success, error, info } = useToast()
  
  return (
    <div>
      <button onClick={() => success('Success message')}>Show Success</button>
      <button onClick={() => error('Error message')}>Show Error</button>
      <button onClick={() => info('Info message')}>Show Info</button>
      <Toast messages={messages} onRemove={removeToast} />
    </div>
  )
}

describe('Toast', () => {
  it('renders toast messages', () => {
    const messages = [
      { id: '1', message: 'Test message', type: 'info' as const }
    ]
    const onRemove = vi.fn()
    
    render(<Toast messages={messages} onRemove={onRemove} />)
    expect(screen.getByText('Test message')).toBeInTheDocument()
  })

  it('renders different toast types with correct styles', () => {
    const messages = [
      { id: '1', message: 'Success!', type: 'success' as const },
      { id: '2', message: 'Error!', type: 'error' as const },
      { id: '3', message: 'Info!', type: 'info' as const }
    ]
    const onRemove = vi.fn()
    
    const { container } = render(<Toast messages={messages} onRemove={onRemove} />)
    expect(container.querySelector('.toast-success')).toBeInTheDocument()
    expect(container.querySelector('.toast-error')).toBeInTheDocument()
    expect(container.querySelector('.toast-info')).toBeInTheDocument()
  })

  it('calls onRemove when close button is clicked', () => {
    const messages = [
      { id: '1', message: 'Test message', type: 'info' as const }
    ]
    const onRemove = vi.fn()
    
    render(<Toast messages={messages} onRemove={onRemove} />)
    
    const closeButton = screen.getByLabelText('Close notification')
    fireEvent.click(closeButton)
    
    expect(onRemove).toHaveBeenCalledWith('1')
  })

  it('useToast hook adds and removes messages', () => {
    render(<TestToastComponent />)
    
    // Add a success toast
    act(() => {
      fireEvent.click(screen.getByText('Show Success'))
    })
    
    expect(screen.getByText('Success message')).toBeInTheDocument()
  })
})
