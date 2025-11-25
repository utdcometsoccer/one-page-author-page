import { AppInsightsErrorBoundary, ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TikTokIcon from '@mui/icons-material/MusicNote';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { createBrowserHistory } from "history";
import { useEffect, useState } from 'react';
import type { JSX } from 'react/jsx-runtime';
import AboutMeSection from './AboutMeSection';
import './App.css';
import ArticlesSection from './ArticlesSection';
import SubstackIcon from './assets/substack.png';
import ThreadsIcon from './assets/threads.svg';
import BooksSection from './BooksSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import NavBar from './NavBar';
import type { AuthorData, LocaleHeaders } from './types';
import { getAuthorDataFile } from './utilities/getAuthorDataFile';
import { getLocale } from './utilities/getLocale';
import { getRemoteAuthorDataBaseConfig, getLocalAuthorDataBaseConfig } from './utilities/authorDataBaseConfig';
import { getDefaultLocaleFile } from './utilities/getDefaultLocaleFile';
import { getLocaleFile } from './utilities/getLocaleFile';
import { localeBaseConfig } from './utilities/localeBaseConfig';
import WelcomeSection from './WelcomeSection';
import { getLocalHostProvider, getWindowHostProvider } from './utilities/hostProvider';
import ErrorContainer from './ErrorContainer';
import LoadingContainer from './LoadingContainer';

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
};

function App() {
  const trackAuthorLoadEvent = (authorName: string, domain: string) => {
    appInsights.trackEvent({
      name: 'AuthorLoadEvent', // Replace with your event name
      properties: {
        authorName: authorName,
        domain: domain,
      },
    });
  };
  const browserHistory = createBrowserHistory();
  var reactPlugin = new ReactPlugin();
  var appInsights = new ApplicationInsights({
    config: {
      connectionString: import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING,
      extensions: [reactPlugin],
      extensionConfig: {
        [reactPlugin.identifier]: { history: browserHistory }
      }
    }
  });
  appInsights.loadAppInsights();
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<AuthorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleAuthorData = (newData?: AuthorData) => {
    if (newData) {
      setData(newData);
      setError(null);
      document.title = newData.name || document.title;
      trackAuthorLoadEvent(newData.name || 'Unknown Author', window.location.hostname);
    } else {
      setData(null);
    }
  };
  const [headers, setHeaders] = useState<LocaleHeaders>({
    welcome: 'Welcome',
    aboutMe: 'About Me',
    myBooks: 'My Books',
    loading: 'Loading...',
    articles: 'Articles'
  });
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('welcome');

  // Scroll spy effect
  useEffect(() => {
    const sectionIds = ['welcome', 'about-me', 'articles', 'my-books', 'contact-me'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100; // Offset for navbar height
      
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    document.body.classList.toggle('dark-theme', darkMode);
    document.body.classList.toggle('light-theme', !darkMode);
  }, [darkMode]);

  // Fetch locale headers
  useEffect(() => {
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
    const locale = getLocale();
    const authorDataFile = getAuthorDataFile(
      getWindowHostProvider(),
      getRemoteAuthorDataBaseConfig(),
      import.meta.env.VITE_AUTHOR_DATA_FILE_EXTENSION,
      locale
    );
    fetch(authorDataFile)
      .then(res => {
        if (!res.ok) throw new Error('Author data not found');
        return res.json();
      })
      .then(handleAuthorData)
      .catch(() => {
        // Try local fallback using env variables for all segments        
        const localPath = getAuthorDataFile(
          getLocalHostProvider(),
          getLocalAuthorDataBaseConfig(),
          import.meta.env.VITE_LOCAL_AUTHOR_DATA_FILE_EXTENSION,
          locale
        );
        fetch(localPath)
          .then(res => {
            if (!res.ok) throw new Error('Local author data not found');
            return res.json();
          })
          .then(handleAuthorData)
          .catch(() => {
            setError('Unable to load author data from remote or local sources.');
            handleAuthorData();
          });
      });
  }, []);

  const handleNav = (id: string) => {
    setMenuOpen(false)
    const section = document.getElementById(id)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (error) {
    const errorTitle = import.meta.env.VITE_ERROR_TITLE || 'Error';
    return <ErrorContainer title={errorTitle} message={error} />;
  }
  if (!data) {
    return <LoadingContainer label={headers.loading} />;
  }

  return (
    <AppInsightsErrorBoundary onError={() => <><h1>Error occurred</h1></>} appInsights={reactPlugin}>
      <div className="main-container">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <NavBar
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          headers={headers}
          handleNav={handleNav}
          articlesExist={!!(data.articles && data.articles.length > 0)}
          booksExist={!!(data.books && data.books.length > 0)}
          contactExist={!!data.email}
          activeSection={activeSection}
        />
        <main id="main-content">
          <WelcomeSection header={headers.welcome} welcome={data.welcome} />
          <AboutMeSection header={headers.aboutMe} aboutMe={data.aboutMe} headshot={data.headshot} authorName={data.name} />
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
        </main>
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
    </AppInsightsErrorBoundary>
  )
}

export default App;
