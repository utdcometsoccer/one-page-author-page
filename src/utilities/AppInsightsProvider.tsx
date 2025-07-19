import { type PropsWithChildren, useRef, type FC } from 'react';
import { AppInsightsContext } from '@microsoft/applicationinsights-react-js';
import TelemetryService from './TelemetryService';

const instrumentationKey = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;

export const AppInsightsProvider: FC<PropsWithChildren> = ({ children }) => {
  const telemetryRef = useRef(TelemetryService.getInstance());

  // Only initialize once
  if (telemetryRef.current && !telemetryRef.current.getReactPlugin()) {
    telemetryRef.current.initialize(instrumentationKey);
  }

  return (
    <AppInsightsContext.Provider value={telemetryRef.current.getReactPlugin()!}>
      {children}
    </AppInsightsContext.Provider>
  );
};
