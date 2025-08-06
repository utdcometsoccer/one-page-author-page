

import type { LocaleHeaders } from './types'

interface NavBarProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  headers: LocaleHeaders
  handleNav: (id: string) => void
  articlesExist: boolean
  booksExist: boolean
  contactExist: boolean
}

const NavBar: React.FC<NavBarProps> = ({ menuOpen, setMenuOpen, headers, handleNav, articlesExist, booksExist, contactExist }) => (
  <nav className="nav-bar">
    <button
      className="menu-btn"
      aria-label="Open navigation menu"
      onClick={() => setMenuOpen(!menuOpen)}
    >
      {menuOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
    </button>
    <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
      <li>
        <button onClick={() => handleNav('welcome')}>{headers.welcome}</button>
      </li>
      <li>
        <button onClick={() => handleNav('about-me')}>{headers.aboutMe}</button>
      </li>
      {articlesExist && (
        <li>
          <button onClick={() => handleNav('articles')}>{headers.articles || 'Articles'}</button>
        </li>
      )}
      {booksExist && (
        <li>
          <button onClick={() => handleNav('my-books')}>{headers.myBooks}</button>
        </li>
      )}
      {contactExist && (
        <li>
          <button onClick={() => handleNav('contact-me')}>{headers.contactMe || 'Contact Me'}</button>
        </li>
      )}
    </ul>
  </nav>
)

export default NavBar
