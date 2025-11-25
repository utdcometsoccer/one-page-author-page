

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

const NavBar: React.FC<NavBarProps> = ({ menuOpen, setMenuOpen, headers, handleNav, articlesExist, booksExist, contactExist }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    handleNav(id);
  };

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <button
        className="menu-btn"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li>
          <a href="#welcome" onClick={(e) => handleLinkClick(e, 'welcome')}>{headers.welcome}</a>
        </li>
        <li>
          <a href="#about-me" onClick={(e) => handleLinkClick(e, 'about-me')}>{headers.aboutMe}</a>
        </li>
        {articlesExist && (
          <li>
            <a href="#articles" onClick={(e) => handleLinkClick(e, 'articles')}>{headers.articles || 'Articles'}</a>
          </li>
        )}
        {booksExist && (
          <li>
            <a href="#my-books" onClick={(e) => handleLinkClick(e, 'my-books')}>{headers.myBooks}</a>
          </li>
        )}
        {contactExist && (
          <li>
            <a href="#contact-me" onClick={(e) => handleLinkClick(e, 'contact-me')}>{headers.contactMe || 'Contact Me'}</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar
