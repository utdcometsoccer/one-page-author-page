import './App.css'
import { useState, useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import InstagramIcon from '@mui/icons-material/Instagram'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import YouTubeIcon from '@mui/icons-material/YouTube'
import GitHubIcon from '@mui/icons-material/GitHub'
import ThreadsIcon from './assets/threads.svg'
import SubstackIcon from './assets/substack.png'
import TikTokIcon from '@mui/icons-material/MusicNote'
import type { JSX } from 'react/jsx-runtime'

import NavBar from './NavBar'
import WelcomeSection from './WelcomeSection'
import AboutMeSection from './AboutMeSection'
import BooksSection from './BooksSection'
import ArticlesSection from './ArticlesSection'
import ContactSection from './ContactSection'
import Footer from './Footer'

import type { AuthorData, LocaleHeaders } from './types'
import { getLocaleFile, type LocaleBase } from './utilities/getLocaleFile'
import { getAuthorDataFile, type HostProvider, type AuthorDataBaseConfig } from './utilities/getAuthorDataFile'
import { getDefaultAuthorDataFile } from './utilities/getDefaultAuthorDataFile'
import { getDefaultLocaleFile } from './utilities/getDefaultLocaleFile'

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
    const localeBaseConfig: LocaleBase = {
      getLocaleBase: () => import.meta.env.VITE_LOCALE_BASE || '/locales'
    };
    const localeFile = getLocaleFile(localeBaseConfig);
    fetch(localeFile)
      .then(res => {
        if (!res.ok) throw new Error('Locale not found');
        return res.json();
      })
      .then(setHeaders)
      .catch(() => {
        fetch(getDefaultLocaleFile(localeBaseConfig))
          .then(res => res.json())
          .then(setHeaders);
      });
  }, []);

  // Fetch locale-specific author data
  useEffect(() => {
    const hostProvider: HostProvider = {
      getHostname: () => window.location.hostname
    };
    const authorDataBaseConfig: AuthorDataBaseConfig = {
      getAuthorDataBase: () => import.meta.env.VITE_AUTHOR_DATA_BASE ? `/${import.meta.env.VITE_AUTHOR_DATA_BASE}` : ''
    };
    const authorDataFile = getAuthorDataFile(hostProvider, authorDataBaseConfig);
    fetch(authorDataFile)
      .then(res => {
        if (!res.ok) throw new Error('Author data not found');
        return res.json();
      })
      .then(setData)
      .catch(() => {
        fetch(getDefaultAuthorDataFile(authorDataBaseConfig))
          .then(res => res.json())
          .then(setData);
      });
  }, []);

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
      <NavBar
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        headers={headers}
        handleNav={handleNav}
      />
      <WelcomeSection header={headers.welcome} welcome={data.welcome} />
      <AboutMeSection header={headers.aboutMe} aboutMe={data.aboutMe} headshot={data.headshot} />
      {data.articles && data.articles.length > 0 && (
        <ArticlesSection header={headers.articles || 'Articles'} articles={data.articles} />
      )}
      {data.books && data.books.length > 0 && (
        <BooksSection header={headers.myBooks} books={data.books} />
      )}
      {data.email && (
        <ContactSection
          header={headers.contactMe || 'Contact Me'}
          email={data.email}
          emailPrompt={headers.emailPrompt}
          emailLinkText={headers.emailLinkText}
          noEmail={headers.noEmail}
        />
      )}
      <Footer
        copyright={data.copyright}
        social={data.social}
        socialIcons={socialIcons}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((prev) => !prev)}
        switchToLight={headers.switchToLight}
        switchToDark={headers.switchToDark}
      />
    </div>
  )
}

export default App
