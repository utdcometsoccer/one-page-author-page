import './App.css'
import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import GitHubIcon from '@mui/icons-material/GitHub'
import ThreadsIcon from './assets/threads.svg'
import SubstackIcon from './assets/substack.png'
import TikTokIcon from '@mui/icons-material/MusicNote'; // Use MusicNote as a TikTok icon substitute
import type { JSX } from 'react/jsx-runtime'

type Book = {
  title: string
  description: string
  url?: string
  cover?: string // Add cover property
}

type SocialLink = {
  name: string
  url: string
}

type AuthorData = {
  name: string
  welcome: string
  aboutMe: string
  headshot: string
  books: Book[]
  copyright: string
  social?: SocialLink[]
}

type LocaleHeaders = {
  welcome: string
  aboutMe: string
  myBooks: string
  loading?: string
}

function getLocale(): string {
  return navigator.language?.toLowerCase() || 'en-us'
}

function getLocaleFile(): string {
  const locale = getLocale()
  const base = import.meta.env.VITE_LOCALE_BASE || '/locales'
  return `${base}/${locale}.json`
}

function getAuthorDataFile(): string {
  const locale = getLocale()
  const base = import.meta.env.VITE_AUTHOR_DATA_BASE || ''
  return `${base}/author-data-${locale}.json`
}

function getDefaultAuthorDataFile(): string {
  const base = import.meta.env.VITE_AUTHOR_DATA_BASE || ''
  return `${base}/data.json`
}

function getDefaultLocaleFile(): string {
  const base = import.meta.env.VITE_LOCALE_BASE || '/locales'
  return `${base}/en-us.json`
}

const socialIcons: Record<string, JSX.Element> = {
  facebook: <FacebookIcon />,
  twitter: <TwitterIcon />,
  instagram: <InstagramIcon />,
  linkedin: <LinkedInIcon />,
  youtube: <YouTubeIcon />,
  github: <GitHubIcon />,
  threads: <img src={ThreadsIcon} alt='Threads icon' className='social-icon social-icon-threads' />,
  tiktok: <TikTokIcon />, // Add TikTok icon (using MusicNote as a substitute)
  substack: <img src={SubstackIcon} alt='Substack icon' className='social-icon social-icon-substack' />,
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [data, setData] = useState<AuthorData | null>(null)
  const [headers, setHeaders] = useState<LocaleHeaders>({
    welcome: 'Welcome',
    aboutMe: 'About Me',
    myBooks: 'My Books',
    loading: 'Loading...'
  })
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode)
    document.body.classList.toggle('light-theme', !darkMode)
  }, [darkMode])

  // Fetch locale headers
  useEffect(() => {
    const localeFile = getLocaleFile()
    fetch(localeFile)
      .then(res => {
        if (!res.ok) throw new Error('Locale not found')
        return res.json()
      })
      .then(setHeaders)
      .catch(() => {
        fetch(getDefaultLocaleFile())
          .then(res => res.json())
          .then(setHeaders)
      })
  }, [])

  // Fetch locale-specific author data
  useEffect(() => {
    const authorDataFile = getAuthorDataFile()
    fetch(authorDataFile)
      .then(res => {
        if (!res.ok) throw new Error('Author data not found')
        return res.json()
      })
      .then(setData)
      .catch(() => {
        fetch(getDefaultAuthorDataFile())
          .then(res => res.json())
          .then(setData)
      })
  }, [])

  const handleNav = (id: string) => {
    setMenuOpen(false)
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!data) {
    return (
      <div className="main-container" style={{ textAlign: 'center', marginTop: '4rem' }}>
        <CircularProgress aria-label={headers.loading || 'Loading...'} />
      </div>
    )
  }

  return (
    <div className="main-container">
      {/* Hamburger Menu */}
      <nav className="nav-bar">
        <button
          className="menu-btn"
          aria-label="Open navigation menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          <li>
            <button onClick={() => handleNav('welcome')}>{headers.welcome}</button>
          </li>
          <li>
            <button onClick={() => handleNav('about-me')}>{headers.aboutMe}</button>
          </li>
          <li>
            <button onClick={() => handleNav('my-books')}>{headers.myBooks}</button>
          </li>
        </ul>
      </nav>

      <header className="welcome" id="welcome">
        <h1>{headers.welcome}</h1>
        <p>
          {data.welcome}
        </p>
      </header>

      <section className="about-me" id="about-me">
        <div className="about-me-content">
          <img
            src={data.headshot}
            alt="Author headshot"
            className="about-me-headshot"
          />
          <div className="about-me-text">
            <h2>{headers.aboutMe}</h2>
            <p>
              {data.aboutMe}
            </p>
          </div>
        </div>
      </section>

      <section className="my-books" id="my-books">
        <h2>{headers.myBooks}</h2>
        <div className="books-grid">
          {data.books.map((book, idx) => (
            <article className="book-card" key={idx}>
              <div className="book-info-with-cover">
                {book.cover && (
                  <div className='book-cover'>
                    <img
                    src={book.cover}
                    alt={`Cover of ${book.title}`}
                    className="book-cover-thumb"
                    />
                  </div>
                )}
                <div className="book-info">
                  {book.url ? (
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1a0dab', textDecoration: 'none', fontWeight: 600 }}
                    >
                      <h3>{book.title}</h3>
                    </a>
                  ) : (
                    <h3>{book.title}</h3>
                  )}
                  <p>{book.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>{data?.copyright}</p>
        {data?.social && (
          <div className="social-links" style={{ marginTop: '0.5rem' }}>
            {data.social.map((link) => {
              const key = link.name.toLowerCase()
              return (
                <a
                  key={key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.name}
                  style={{ margin: '0 0.5rem', color: 'inherit', fontSize: '1.7rem', verticalAlign: 'middle' }}
                >
                  {socialIcons[key] || link.name}
                </a>
              )
            })}
          </div>
        )}
        <button
          className="theme-toggle-btn"
          onClick={() => setDarkMode((prev) => !prev)}
          aria-label="Toggle dark/light theme"
        >
          {darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
        </button>
      </footer>
    </div>
  )
}

export default App
