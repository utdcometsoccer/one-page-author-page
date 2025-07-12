import { render, screen, fireEvent } from '@testing-library/react'
import Footer from './Footer'
import { describe, it, expect, vi } from 'vitest'

const socialIcons = {
  facebook: <span>FB</span>,
  twitter: <span>TW</span>,
}

describe('Footer', () => {
  it('renders copyright', () => {
    render(<Footer copyright="© 2025" social={[]} socialIcons={socialIcons} darkMode={true} onToggleTheme={() => {}} />)
    expect(screen.getByText('© 2025')).toBeInTheDocument()
  })

  it('renders social links', () => {
    render(
      <Footer
        copyright="© 2025"
        social={[{ name: 'Facebook', url: 'http://fb.com' }]}
        socialIcons={socialIcons}
        darkMode={true}
        onToggleTheme={() => {}}
      />
    )
    expect(screen.getByLabelText('Facebook')).toBeInTheDocument()
  })

  it('calls onToggleTheme when button is clicked', () => {
    const onToggleTheme = vi.fn()
    render(
      <Footer copyright="© 2025" social={[]} socialIcons={socialIcons} darkMode={true} onToggleTheme={onToggleTheme} />
    )
    fireEvent.click(screen.getByRole('button'))
    expect(onToggleTheme).toHaveBeenCalled()
  })
})
