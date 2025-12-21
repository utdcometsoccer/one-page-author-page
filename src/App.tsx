import { AppInsightsErrorBoundary } from '@microsoft/applicationinsights-react-js';
import { lazy, Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import type { JSX } from 'react/jsx-runtime';
import './App.css';
import NavBar from './NavBar';
import WelcomeSection from './WelcomeSection';
import type { AuthorData, LocaleHeaders, SEOMetadata } from './types';
import { getAuthorDataFile } from './utilities/getAuthorDataFile';
import { getLocale } from './utilities/getLocale';
import { getRemoteAuthorDataBaseConfig, getLocalAuthorDataBaseConfig } from './utilities/authorDataBaseConfig';
import { getDefaultLocaleFile } from './utilities/getDefaultLocaleFile';
import { getLocaleFile } from './utilities/getLocaleFile';
import { localeBaseConfig } from './utilities/localeBaseConfig';
import { getLocalHostProvider, getWindowHostProvider } from './utilities/hostProvider';
import ErrorContainer from './ErrorContainer';
import LoadingContainer from './LoadingContainer';
import { BackToTop, ScrollProgress, ShareButtons, AddToHomeScreenBanner, useSwipeGesture } from './components';
import TelemetryService from './utilities/TelemetryService';
import SEOManager from './utilities/SEOManager';
import { injectStructuredData } from './utilities/structuredData';
import { getSitemap, injectSitemapLink } from './utilities/sitemapService';

// Lazy load below-fold sections for code splitting
const AboutMeSection = lazy(() => import('./AboutMeSection'));
const ArticlesSection = lazy(() => import('./ArticlesSection'));
const BooksSection = lazy(() => import('./BooksSection'));
const ContactSection = lazy(() => import('./ContactSection'));
const Footer = lazy(() => import('./Footer'));

// Dynamic imports for social icons
const loadSocialIcons = async (): Promise<Record<string, JSX.Element>> => {
  const [
    { default: FacebookIcon },
    { default: TwitterIcon },
    { default: InstagramIcon },
    { default: LinkedInIcon },
    { default: YouTubeIcon },
    { default: GitHubIcon },
    { default: TikTokIcon },
    { default: SubstackIcon },
    { default: ThreadsIcon }
  ] = await Promise.all([
    import('@mui/icons-material/Facebook'),
    import('@mui/icons-material/Twitter'),
    import('@mui/icons-material/Instagram'),
    import('@mui/icons-material/LinkedIn'),
    import('@mui/icons-material/YouTube'),
    import('@mui/icons-material/GitHub'),
    import('@mui/icons-material/MusicNote'),
    import('./assets/substack.png'),
    import('./assets/threads.svg')
  ]);

  return {
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedInIcon />,
    youtube: <YouTubeIcon />,
    github: <GitHubIcon />,
    threads: <img src={ThreadsIcon} alt='Threads icon' className='social-icon social-icon-threads' />,
    tiktok: <TikTokIcon />,
    substack: <img src={SubstackIcon} alt='Substack icon' className='social-icon social-icon-substack' />,
  };
};

// Initialize Application Insights outside component to prevent re-instantiation
const telemetryService = TelemetryService.getInstance();
telemetryService.initialize(import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING);
const reactPlugin = telemetryService.getReactPlugin()!

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState<AuthorData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [socialIcons, setSocialIcons] = useState<Record<string, JSX.Element>>({});
  const handleAuthorData = (newData?: AuthorData) => {
    if (newData) {
      setData(newData);
      setError(null);
      document.title = newData.name || document.title;
      telemetryService.trackAuthorLoad(newData.name || 'Unknown Author', window.location.hostname);
      // Inject structured data for SEO/AI optimization
      injectStructuredData(newData);
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

  // Load social icons dynamically
  useEffect(() => {
    loadSocialIcons().then(setSocialIcons);
  }, []);

  // Section IDs for navigation - memoized to prevent unnecessary re-renders
  const sectionIds = useMemo(() => ['welcome', 'about-me', 'articles', 'my-books', 'contact-me'], []);

  // Track section view when active section changes
  useEffect(() => {
    if (activeSection) {
      telemetryService.trackSectionView(activeSection);
    }
  }, [activeSection]);

  // Scroll spy effect
  useEffect(() => {
    const NAVBAR_HEIGHT_OFFSET = 100; // Matches navbar height plus buffer
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + NAVBAR_HEIGHT_OFFSET;
      
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
  }, [sectionIds]);

  // Navigate to section by ID
  const navigateToSection = useCallback((sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Swipe gesture for section navigation
  const navigateToNextSection = useCallback(() => {
    const currentIndex = sectionIds.indexOf(activeSection);
    if (currentIndex < sectionIds.length - 1) {
      const nextSection = sectionIds[currentIndex + 1];
      navigateToSection(nextSection);
    }
  }, [activeSection, sectionIds, navigateToSection]);

  const navigateToPrevSection = useCallback(() => {
    const currentIndex = sectionIds.indexOf(activeSection);
    if (currentIndex > 0) {
      const prevSection = sectionIds[currentIndex - 1];
      navigateToSection(prevSection);
    }
  }, [activeSection, sectionIds, navigateToSection]);

  // Touch gesture support for swipe between sections
  useSwipeGesture({
    onSwipeUp: navigateToNextSection,
    onSwipeDown: navigateToPrevSection,
    threshold: 100,
    enabled: true
  });


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

  // Initialize sitemap (dynamic or static based on configuration)
  useEffect(() => {
    getSitemap()
      .then(sitemapContent => {
        if (sitemapContent) {
          injectSitemapLink(sitemapContent);
          console.log('Sitemap initialized successfully');
        } else {
          console.warn('Failed to load sitemap');
        }
      })
      .catch(error => {
        console.error('Error initializing sitemap:', error);
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

  // Generate SEO metadata from author data
  const seoMetadata: SEOMetadata = {
    title: data.seo?.title || `${data.name} - Author`,
    description: data.seo?.description || data.aboutMe,
    keywords: data.seo?.keywords || ['author', 'books', 'articles', 'writer'],
    image: data.seo?.image || data.headshot,
    canonicalUrl: data.seo?.canonicalUrl || window.location.href.split('?')[0].split('#')[0],
    type: data.seo?.type || 'profile',
  };

  // Section loading fallback
  const SectionFallback = () => (
    <div className="section-loading" role="status" aria-live="polite">
      Loading...
    </div>
  );

  return (
    <AppInsightsErrorBoundary onError={() => <><h1>Error occurred</h1></>} appInsights={reactPlugin}>
      <>
        <SEOManager metadata={seoMetadata} authorName={data.name} />
        <ScrollProgress />
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
            <Suspense fallback={<SectionFallback />}>
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
              <ShareButtons title={data.name} />
            </Suspense>
          </main>
          <Suspense fallback={<SectionFallback />}>
            <Footer
              copyright={data.copyright}
              social={data.social}
              socialIcons={socialIcons}
              darkMode={darkMode}
              onToggleTheme={() => {
                setDarkMode((prev) => {
                  const newMode = !prev;
                  telemetryService.trackThemeToggle(newMode ? 'dark' : 'light');
                  return newMode;
                });
              }}
              switchToLight={headers.switchToLight}
              switchToDark={headers.switchToDark}
            />
          </Suspense>
          <BackToTop ariaLabel={headers.backToTop || 'Back to top'} />
          <AddToHomeScreenBanner 
            installText={headers.installApp || 'Install this app on your device'}
            dismissText={headers.notNow || 'Not now'}
          />
        </div>
      </>
    </AppInsightsErrorBoundary>
  )
}

export default App;
