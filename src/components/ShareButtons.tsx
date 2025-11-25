import React, { useState } from 'react'

export interface ShareButtonsProps {
  url?: string
  title?: string
  copyLabel?: string
  copiedLabel?: string
  shareLabel?: string
  className?: string
}

const ShareButtons: React.FC<ShareButtonsProps> = ({
  url,
  title = document.title,
  copyLabel = 'Copy Link',
  copiedLabel = 'Copied!',
  shareLabel = 'Share',
  className = ''
}) => {
  const [copied, setCopied] = useState(false)
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = shareUrl
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Copy failed
      }
      document.body.removeChild(textArea)
    }
  }

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: shareUrl
        })
      } catch {
        // User cancelled or share failed
      }
    }
  }

  const shareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const shareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const shareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}`
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer,width=600,height=400')
  }

  const hasNativeShare = typeof navigator !== 'undefined' && !!navigator.share

  return (
    <div className={`share-buttons ${className}`.trim()}>
      <button
        className="share-btn share-btn-copy"
        onClick={copyToClipboard}
        aria-label={copied ? copiedLabel : copyLabel}
        type="button"
      >
        <span className="share-btn-icon" aria-hidden="true">
          {copied ? '✓' : '🔗'}
        </span>
        <span className="share-btn-text">{copied ? copiedLabel : copyLabel}</span>
      </button>

      {hasNativeShare && (
        <button
          className="share-btn share-btn-native"
          onClick={shareNative}
          aria-label={shareLabel}
          type="button"
        >
          <span className="share-btn-icon" aria-hidden="true">📤</span>
          <span className="share-btn-text">{shareLabel}</span>
        </button>
      )}

      <button
        className="share-btn share-btn-twitter"
        onClick={shareTwitter}
        aria-label="Share on Twitter"
        type="button"
      >
        <span className="share-btn-icon" aria-hidden="true">𝕏</span>
        <span className="share-btn-text sr-only">Twitter</span>
      </button>

      <button
        className="share-btn share-btn-facebook"
        onClick={shareFacebook}
        aria-label="Share on Facebook"
        type="button"
      >
        <span className="share-btn-icon" aria-hidden="true">f</span>
        <span className="share-btn-text sr-only">Facebook</span>
      </button>

      <button
        className="share-btn share-btn-linkedin"
        onClick={shareLinkedIn}
        aria-label="Share on LinkedIn"
        type="button"
      >
        <span className="share-btn-icon" aria-hidden="true">in</span>
        <span className="share-btn-text sr-only">LinkedIn</span>
      </button>
    </div>
  )
}

export default ShareButtons
