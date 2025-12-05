import React from 'react'

import type { LocaleHeaders } from './types'
import { telemetryService } from './utilities/TelemetryService'

interface NavBarProps {
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  headers: LocaleHeaders
  handleNav: (id: string) => void
  articlesExist: boolean
  booksExist: boolean
  contactExist: boolean
  activeSection?: string
}

const NavBar: React.FC<NavBarProps> = ({ menuOpen, setMenuOpen, headers, handleNav, articlesExist, booksExist, contactExist, activeSection }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    telemetryService.trackNavClick(id);
    handleNav(id);
  };

  const handleMenuToggle = () => {
    const newState = !menuOpen;
    telemetryService.trackMenuToggle(newState);
    setMenuOpen(newState);
  };

  const getLinkClassName = (sectionId: string) => {
    return activeSection === sectionId ? 'active' : '';
  };

  return (
    <nav className="nav-bar" aria-label="Main navigation">
      <button
        className="menu-btn"
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        onClick={handleMenuToggle}
      >
        {menuOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
      </button>
      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li>
          <a href="#welcome" onClick={(e) => handleLinkClick(e, 'welcome')} className={getLinkClassName('welcome')}>{headers.welcome}</a>
        </li>
        <li>
          <a href="#about-me" onClick={(e) => handleLinkClick(e, 'about-me')} className={getLinkClassName('about-me')}>{headers.aboutMe}</a>
        </li>
        {articlesExist && (
          <li>
            <a href="#articles" onClick={(e) => handleLinkClick(e, 'articles')} className={getLinkClassName('articles')}>{headers.articles || 'Articles'}</a>
          </li>
        )}
        {booksExist && (
          <li>
            <a href="#my-books" onClick={(e) => handleLinkClick(e, 'my-books')} className={getLinkClassName('my-books')}>{headers.myBooks}</a>
          </li>
        )}
        {contactExist && (
          <li>
            <a href="#contact-me" onClick={(e) => handleLinkClick(e, 'contact-me')} className={getLinkClassName('contact-me')}>{headers.contactMe || 'Contact Me'}</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar
