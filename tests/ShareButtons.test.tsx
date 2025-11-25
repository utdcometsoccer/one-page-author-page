import { render, screen, fireEvent } from '@testing-library/react'
import { ShareButtons } from '../src/components'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('ShareButtons', () => {
  beforeEach(() => {
    // Mock window.open
    vi.spyOn(window, 'open').mockImplementation(() => null)
  })

  it('renders copy link button', () => {
    render(<ShareButtons />)
    expect(screen.getByRole('button', { name: 'Copy Link' })).toBeInTheDocument()
  })

  it('renders social share buttons', () => {
    render(<ShareButtons />)
    expect(screen.getByRole('button', { name: 'Share on Twitter' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Share on Facebook' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Share on LinkedIn' })).toBeInTheDocument()
  })

  it('opens Twitter share dialog when Twitter button is clicked', () => {
    render(<ShareButtons url="https://example.com" title="Test Title" />)
    const twitterButton = screen.getByRole('button', { name: 'Share on Twitter' })
    
    fireEvent.click(twitterButton)
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('twitter.com/intent/tweet'),
      '_blank',
      expect.any(String)
    )
  })

  it('opens Facebook share dialog when Facebook button is clicked', () => {
    render(<ShareButtons url="https://example.com" />)
    const facebookButton = screen.getByRole('button', { name: 'Share on Facebook' })
    
    fireEvent.click(facebookButton)
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('facebook.com/sharer'),
      '_blank',
      expect.any(String)
    )
  })

  it('opens LinkedIn share dialog when LinkedIn button is clicked', () => {
    render(<ShareButtons url="https://example.com" title="Test" />)
    const linkedInButton = screen.getByRole('button', { name: 'Share on LinkedIn' })
    
    fireEvent.click(linkedInButton)
    
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining('linkedin.com/shareArticle'),
      '_blank',
      expect.any(String)
    )
  })

  it('applies custom className when provided', () => {
    const { container } = render(<ShareButtons className="custom-share" />)
    expect(container.querySelector('.share-buttons')).toHaveClass('custom-share')
  })

  it('uses custom copy label when provided', () => {
    render(<ShareButtons copyLabel="Copy URL" />)
    expect(screen.getByRole('button', { name: 'Copy URL' })).toBeInTheDocument()
  })
})
