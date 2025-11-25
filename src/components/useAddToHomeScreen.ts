import { useEffect, useState, useCallback } from 'react'

// Define the BeforeInstallPromptEvent type
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

interface AddToHomeScreenState {
  isPromptable: boolean
  isInstalled: boolean
}

export const useAddToHomeScreen = () => {
  const [state, setState] = useState<AddToHomeScreenState>({
    isPromptable: false,
    isInstalled: false
  })
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)

  useEffect(() => {
    // Check if already installed as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    if (isStandalone) {
      setState({ isPromptable: false, isInstalled: true })
      return
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setState(prev => ({ ...prev, isPromptable: true }))
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setState({ isPromptable: false, isInstalled: true })
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    if (!deferredPrompt) return false

    try {
      await deferredPrompt.prompt()
      const choiceResult = await deferredPrompt.userChoice
      
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null)
        setState({ isPromptable: false, isInstalled: true })
        return true
      }
    } catch {
      // User dismissed the prompt
    }
    
    return false
  }, [deferredPrompt])

  const dismiss = useCallback(() => {
    setState(prev => ({ ...prev, isPromptable: false }))
    setDeferredPrompt(null)
  }, [])

  return {
    ...state,
    promptInstall,
    dismiss
  }
}
