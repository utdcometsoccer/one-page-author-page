import './App.css'
import { useState, useEffect } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import CircularProgress from '@mui/material/CircularProgress'

type Book = {
  title: string
  description: string
}

type AuthorData = {
  name: string
  welcome: string
  aboutMe: string
  headshot: string
  books: Book[]
  copyright: string
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
  const base = process.env.REACT_APP_LOCALE_BASE || '/locales'
  return `${base}/${locale}.json`
}

function getAuthorDataFile(): string {
  const locale = getLocale()
  const base = process.env.REACT_APP_AUTHOR_DATA_BASE || ''
  return `${base}/author-data-${locale}.json`
}

function getDefaultAuthorDataFile(): string {
  const base = process.env.REACT_APP_AUTHOR_DATA_BASE || ''
  return `${base}/data.json`
}

function getDefaultLocaleFile(): string {
  const base = process.env.REACT_APP_LOCALE_BASE || '/locales'
  return `${base}/en-us.json`
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
              <h3>{book.title}</h3>
              <p>{book.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>{data.copyright}</p>
      </footer>
    </div>
  )
}

export default App
