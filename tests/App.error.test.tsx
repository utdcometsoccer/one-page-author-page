import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../src/App';
import * as sitemapService from '../src/utilities/sitemapService';
import * as getLocaleFileModule from '../src/utilities/getLocaleFile';
import * as getDefaultLocaleFileModule from '../src/utilities/getDefaultLocaleFile';

// Mock Application Insights dependencies
vi.mock('@microsoft/applicationinsights-web', () => ({
  ApplicationInsights: vi.fn().mockImplementation(() => ({
    loadAppInsights: vi.fn(),
    trackEvent: vi.fn(),
    trackException: vi.fn(),
    trackPageView: vi.fn(),
  })),
}));

vi.mock('@microsoft/applicationinsights-react-js', () => ({
  AppInsightsErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  ReactPlugin: vi.fn().mockImplementation(() => ({ identifier: 'test-plugin' })),
}));

vi.mock('history', () => ({
  createBrowserHistory: vi.fn().mockReturnValue({}),
}));

// Mock sitemap service to avoid unrelated fetch calls
vi.mock('../src/utilities/sitemapService', () => ({
  getSitemap: vi.fn().mockResolvedValue(null),
  injectSitemapLink: vi.fn(),
}));

// Mock structuredData utilities
vi.mock('../src/utilities/structuredData', () => ({
  injectStructuredData: vi.fn(),
}));

vi.mock('../src/utilities/additionalSchemas', () => ({
  injectAdditionalStructuredData: vi.fn(),
}));

// Use predictable locale URLs regardless of VITE_LOCALE_BASE
vi.mock('../src/utilities/getLocaleFile', () => ({
  getLocaleFile: vi.fn().mockReturnValue('/test-locale'),
}));
vi.mock('../src/utilities/getDefaultLocaleFile', () => ({
  getDefaultLocaleFile: vi.fn().mockReturnValue('/test-default-locale'),
}));

const frenchHeaders = {
  welcome: 'Bienvenue',
  aboutMe: 'À propos de moi',
  myBooks: 'Mes livres',
  loading: 'Chargement...',
  articles: 'Articles',
  errorTitle: 'Erreur',
  errorMessage: "Impossible de charger les données de l'auteur. Veuillez réessayer plus tard.",
};

describe('App error page', () => {
  beforeEach(() => {
    // Re-apply after vi.restoreAllMocks() resets vi.fn() implementations
    vi.mocked(sitemapService.getSitemap).mockResolvedValue(null);
    vi.mocked(getLocaleFileModule.getLocaleFile).mockReturnValue('/test-locale');
    vi.mocked(getDefaultLocaleFileModule.getDefaultLocaleFile).mockReturnValue('/test-default-locale');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows default English error page when all data fetches fail and locale has not loaded', async () => {
    vi.spyOn(window, 'fetch').mockResolvedValue({ ok: false, status: 404, json: () => Promise.resolve({}) } as Response);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.getByText('Unable to load author data. Please try again later.')).toBeInTheDocument();
    });
  });

  it('shows localized error page when locale headers load before the error page is shown', async () => {
    vi.spyOn(window, 'fetch').mockImplementation((url) => {
      const urlStr = String(url);
      // Locale file fetches (using mocked predictable URLs) return French headers
      if (urlStr === '/test-locale' || urlStr === '/test-default-locale') {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(frenchHeaders),
        } as Response);
      }
      // Author data fetches fail
      return Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({}),
      } as Response);
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Erreur')).toBeInTheDocument();
      expect(screen.getByText("Impossible de charger les données de l'auteur. Veuillez réessayer plus tard.")).toBeInTheDocument();
    });
  });
});
