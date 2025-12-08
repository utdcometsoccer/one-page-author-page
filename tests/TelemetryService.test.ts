import { describe, it, expect, beforeEach, vi } from 'vitest'
import TelemetryService, { TelemetryEvents, telemetryService } from '../src/utilities/TelemetryService'

// Mock Application Insights
vi.mock('@microsoft/applicationinsights-web', () => ({
  ApplicationInsights: vi.fn().mockImplementation(() => ({
    loadAppInsights: vi.fn(),
    trackEvent: vi.fn(),
    trackException: vi.fn(),
    trackPageView: vi.fn(),
  })),
}))

vi.mock('@microsoft/applicationinsights-react-js', () => ({
  ReactPlugin: vi.fn().mockImplementation(() => ({
    identifier: 'test-plugin',
  })),
}))

vi.mock('history', () => ({
  createBrowserHistory: vi.fn().mockReturnValue({}),
}))

describe('TelemetryService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Singleton pattern', () => {
    it('returns the same instance', () => {
      const instance1 = TelemetryService.getInstance()
      const instance2 = TelemetryService.getInstance()
      expect(instance1).toBe(instance2)
    })

    it('exports a singleton telemetryService instance', () => {
      expect(telemetryService).toBeDefined()
      expect(telemetryService).toBe(TelemetryService.getInstance())
    })
  })

  describe('TelemetryEvents', () => {
    it('defines section view event', () => {
      expect(TelemetryEvents.SECTION_VIEW).toBe('SectionView')
    })

    it('defines navigation events', () => {
      expect(TelemetryEvents.NAV_CLICK).toBe('NavClick')
      expect(TelemetryEvents.MENU_TOGGLE).toBe('MenuToggle')
      expect(TelemetryEvents.BACK_TO_TOP).toBe('BackToTop')
    })

    it('defines link click events', () => {
      expect(TelemetryEvents.LINK_CLICK).toBe('LinkClick')
      expect(TelemetryEvents.EXTERNAL_LINK_CLICK).toBe('ExternalLinkClick')
    })

    it('defines social events', () => {
      expect(TelemetryEvents.SOCIAL_ICON_CLICK).toBe('SocialIconClick')
      expect(TelemetryEvents.SHARE_CLICK).toBe('ShareClick')
    })

    it('defines button events', () => {
      expect(TelemetryEvents.BUTTON_CLICK).toBe('ButtonClick')
      expect(TelemetryEvents.THEME_TOGGLE).toBe('ThemeToggle')
    })

    it('defines content events', () => {
      expect(TelemetryEvents.BOOK_LINK_CLICK).toBe('BookLinkClick')
      expect(TelemetryEvents.ARTICLE_LINK_CLICK).toBe('ArticleLinkClick')
      expect(TelemetryEvents.CONTACT_EMAIL_CLICK).toBe('ContactEmailClick')
    })

    it('defines PWA events', () => {
      expect(TelemetryEvents.INSTALL_PROMPT).toBe('InstallPrompt')
      expect(TelemetryEvents.INSTALL_DISMISS).toBe('InstallDismiss')
    })

    it('defines author load event', () => {
      expect(TelemetryEvents.AUTHOR_LOAD).toBe('AuthorLoadEvent')
    })
  })

  describe('Convenience tracking methods', () => {
    it('has trackSectionView method', () => {
      expect(typeof telemetryService.trackSectionView).toBe('function')
    })

    it('has trackNavClick method', () => {
      expect(typeof telemetryService.trackNavClick).toBe('function')
    })

    it('has trackLinkClick method', () => {
      expect(typeof telemetryService.trackLinkClick).toBe('function')
    })

    it('has trackSocialIconClick method', () => {
      expect(typeof telemetryService.trackSocialIconClick).toBe('function')
    })

    it('has trackShareClick method', () => {
      expect(typeof telemetryService.trackShareClick).toBe('function')
    })

    it('has trackButtonClick method', () => {
      expect(typeof telemetryService.trackButtonClick).toBe('function')
    })

    it('has trackThemeToggle method', () => {
      expect(typeof telemetryService.trackThemeToggle).toBe('function')
    })

    it('has trackBookLinkClick method', () => {
      expect(typeof telemetryService.trackBookLinkClick).toBe('function')
    })

    it('has trackArticleLinkClick method', () => {
      expect(typeof telemetryService.trackArticleLinkClick).toBe('function')
    })

    it('has trackContactEmailClick method', () => {
      expect(typeof telemetryService.trackContactEmailClick).toBe('function')
    })

    it('has trackBackToTop method', () => {
      expect(typeof telemetryService.trackBackToTop).toBe('function')
    })

    it('has trackMenuToggle method', () => {
      expect(typeof telemetryService.trackMenuToggle).toBe('function')
    })

    it('has trackInstallPrompt method', () => {
      expect(typeof telemetryService.trackInstallPrompt).toBe('function')
    })

    it('has trackInstallDismiss method', () => {
      expect(typeof telemetryService.trackInstallDismiss).toBe('function')
    })

    it('has trackAuthorLoad method', () => {
      expect(typeof telemetryService.trackAuthorLoad).toBe('function')
    })
  })
})
