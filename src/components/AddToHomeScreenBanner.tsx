import React from 'react'
import { useAddToHomeScreen } from './useAddToHomeScreen'
import { telemetryService } from '../utilities/TelemetryService'

export interface AddToHomeScreenBannerProps {
  installText?: string
  dismissText?: string
  className?: string
}

const AddToHomeScreenBanner: React.FC<AddToHomeScreenBannerProps> = ({
  installText = 'Install this app on your device',
  dismissText = 'Not now',
  className = ''
}) => {
  const { isPromptable, promptInstall, dismiss } = useAddToHomeScreen()

  if (!isPromptable) return null

  const handleInstall = () => {
    telemetryService.trackInstallPrompt()
    promptInstall()
  }

  const handleDismiss = () => {
    telemetryService.trackInstallDismiss()
    dismiss()
  }

  return (
    <div className={`add-to-homescreen-banner ${className}`.trim()} role="banner">
      <span className="add-to-homescreen-text">{installText}</span>
      <div className="add-to-homescreen-actions">
        <button
          className="add-to-homescreen-btn add-to-homescreen-install"
          onClick={handleInstall}
          type="button"
        >
          Install
        </button>
        <button
          className="add-to-homescreen-btn add-to-homescreen-dismiss"
          onClick={handleDismiss}
          aria-label={dismissText}
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default AddToHomeScreenBanner
