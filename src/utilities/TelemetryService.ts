import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

// Event types for type safety
export type TelemetryEventProperties = Record<string, string | number | boolean | undefined>;

// Telemetry event names
export const TelemetryEvents = {
  // Section view events
  SECTION_VIEW: 'SectionView',
  
  // Navigation events
  NAV_CLICK: 'NavClick',
  MENU_TOGGLE: 'MenuToggle',
  BACK_TO_TOP: 'BackToTop',
  
  // Link click events
  LINK_CLICK: 'LinkClick',
  EXTERNAL_LINK_CLICK: 'ExternalLinkClick',
  
  // Social events
  SOCIAL_ICON_CLICK: 'SocialIconClick',
  SHARE_CLICK: 'ShareClick',
  
  // Button events
  BUTTON_CLICK: 'ButtonClick',
  THEME_TOGGLE: 'ThemeToggle',
  
  // Content events
  BOOK_LINK_CLICK: 'BookLinkClick',
  ARTICLE_LINK_CLICK: 'ArticleLinkClick',
  CONTACT_EMAIL_CLICK: 'ContactEmailClick',
  
  // PWA events
  INSTALL_PROMPT: 'InstallPrompt',
  INSTALL_DISMISS: 'InstallDismiss',
  
  // Author load event
  AUTHOR_LOAD: 'AuthorLoadEvent',
} as const;

class TelemetryService {
  private static instance: TelemetryService;
  private appInsights: ApplicationInsights | null = null;
  private reactPlugin: ReactPlugin | null = null;

  private constructor() {}

  public static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  public initialize(connectionString: string): void {
    if (this.appInsights) return;
    const browserHistory = createBrowserHistory();
    this.reactPlugin = new ReactPlugin();
    this.appInsights = new ApplicationInsights({
      config: {
        connectionString,
        extensions: [this.reactPlugin],
        extensionConfig: {
          [this.reactPlugin.identifier]: { history: browserHistory }
        },
        enableAutoRouteTracking: true,
        enableAjaxErrorStatusText: true,
      }
    });
    this.appInsights.loadAppInsights();
  }

  public trackEvent(name: string, properties?: TelemetryEventProperties): void {
    this.appInsights?.trackEvent({ name }, properties);
  }

  public trackException(error: Error, properties?: TelemetryEventProperties): void {
    this.appInsights?.trackException({ exception: error }, properties);
  }

  public trackPageView(name?: string, url?: string): void {
    this.appInsights?.trackPageView({ name, uri: url });
  }

  public getReactPlugin(): ReactPlugin | null {
    return this.reactPlugin;
  }

  public getAppInsights(): ApplicationInsights | null {
    return this.appInsights;
  }

  // Convenience methods for common events
  public trackSectionView(sectionName: string): void {
    this.trackEvent(TelemetryEvents.SECTION_VIEW, { sectionName });
  }

  public trackNavClick(targetSection: string): void {
    this.trackEvent(TelemetryEvents.NAV_CLICK, { targetSection });
  }

  public trackLinkClick(url: string, text?: string, isExternal?: boolean): void {
    const eventName = isExternal ? TelemetryEvents.EXTERNAL_LINK_CLICK : TelemetryEvents.LINK_CLICK;
    this.trackEvent(eventName, { url, text, isExternal });
  }

  public trackSocialIconClick(platform: string, url: string): void {
    this.trackEvent(TelemetryEvents.SOCIAL_ICON_CLICK, { platform, url });
  }

  public trackShareClick(platform: string, url?: string): void {
    this.trackEvent(TelemetryEvents.SHARE_CLICK, { platform, url });
  }

  public trackButtonClick(buttonName: string, variant?: string): void {
    this.trackEvent(TelemetryEvents.BUTTON_CLICK, { buttonName, variant });
  }

  public trackThemeToggle(newTheme: string): void {
    this.trackEvent(TelemetryEvents.THEME_TOGGLE, { newTheme });
  }

  public trackBookLinkClick(bookTitle: string, url: string): void {
    this.trackEvent(TelemetryEvents.BOOK_LINK_CLICK, { bookTitle, url });
  }

  public trackArticleLinkClick(articleTitle: string, url: string): void {
    this.trackEvent(TelemetryEvents.ARTICLE_LINK_CLICK, { articleTitle, url });
  }

  public trackContactEmailClick(email: string): void {
    this.trackEvent(TelemetryEvents.CONTACT_EMAIL_CLICK, { email });
  }

  public trackBackToTop(): void {
    this.trackEvent(TelemetryEvents.BACK_TO_TOP);
  }

  public trackMenuToggle(isOpen: boolean): void {
    this.trackEvent(TelemetryEvents.MENU_TOGGLE, { isOpen });
  }

  public trackInstallPrompt(): void {
    this.trackEvent(TelemetryEvents.INSTALL_PROMPT);
  }

  public trackInstallDismiss(): void {
    this.trackEvent(TelemetryEvents.INSTALL_DISMISS);
  }

  public trackAuthorLoad(authorName: string, domain: string): void {
    this.trackEvent(TelemetryEvents.AUTHOR_LOAD, { authorName, domain });
  }
}

// Export singleton instance
const telemetryService = TelemetryService.getInstance();

export default TelemetryService;
export { telemetryService };
