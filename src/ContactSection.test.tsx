import { render, screen } from '@testing-library/react'
import ContactSection from './ContactSection'
import { describe, it, expect } from 'vitest'

describe('ContactSection', () => {
  it('renders the contact header', () => {
    render(
      <ContactSection header="Contact Me" email="test@example.com" emailPrompt="Prompt" emailLinkText="Email Me" />
    )
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Contact Me')
  })

  it('renders the email link if email is provided', () => {
    render(
      <ContactSection header="Contact Me" email="test@example.com" emailPrompt="Prompt" emailLinkText="Email Me" />
    )
    expect(screen.getByText('Email Me')).toHaveAttribute('href', 'mailto:test@example.com')
    expect(screen.getByText('Prompt')).toBeInTheDocument()
  })

  it('renders the noEmail message if no email is provided', () => {
    render(
      <ContactSection header="Contact Me" noEmail="No email" />
    )
    expect(screen.getByText('No email')).toBeInTheDocument()
  })
})
