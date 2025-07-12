import { render, screen, fireEvent } from '@testing-library/react'
import NavBar from './NavBar'
import { describe, it, expect, vi } from 'vitest'

const headers = {
  welcome: 'Welcome',
  aboutMe: 'About Me',
  myBooks: 'My Books',
  contactMe: 'Contact Me',
}

describe('NavBar', () => {
  it('renders all navigation buttons', () => {
    render(
      <NavBar menuOpen={true} setMenuOpen={() => {}} headers={headers} handleNav={() => {}} />
    )
    expect(screen.getByText('Welcome')).toBeInTheDocument()
    expect(screen.getByText('About Me')).toBeInTheDocument()
    expect(screen.getByText('My Books')).toBeInTheDocument()
    expect(screen.getByText('Contact Me')).toBeInTheDocument()
  })

  it('calls handleNav when a nav button is clicked', () => {
    const handleNav = vi.fn()
    render(
      <NavBar menuOpen={true} setMenuOpen={() => {}} headers={headers} handleNav={handleNav} />
    )
    fireEvent.click(screen.getByText('About Me'))
    expect(handleNav).toHaveBeenCalled()
  })
})
