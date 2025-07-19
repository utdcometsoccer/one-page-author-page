import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

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

  public initialize(instrumentationKey: string): void {
    if (this.appInsights) return;
    this.reactPlugin = new ReactPlugin();
    this.appInsights = new ApplicationInsights({
      config: {
        instrumentationKey,
        extensions: [this.reactPlugin],
        extensionConfig: {
          [this.reactPlugin.identifier]: { history: undefined }
        },
        enableAutoRouteTracking: true,
        enableAjaxErrorStatusText: true,
      }
    });
    this.appInsights.loadAppInsights();
  }

  public trackEvent(name: string, properties?: { [key: string]: any }): void {
    this.appInsights?.trackEvent({ name }, properties);
  }

  public trackException(error: Error, properties?: { [key: string]: any }): void {
    this.appInsights?.trackException({ exception: error }, properties);
  }

  public trackPageView(name?: string, url?: string): void {
    this.appInsights?.trackPageView({ name, uri: url });
  }

  public getReactPlugin(): ReactPlugin | null {
    return this.reactPlugin;
  }
}

export default TelemetryService;
