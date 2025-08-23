"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      setDeferredPrompt(null)
      setShowPrompt(false)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("installPromptDismissed", "true")
  }

  if (!showPrompt || localStorage.getItem("installPromptDismissed")) {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-card border rounded-lg p-4 shadow-lg z-50 max-w-sm mx-auto">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
          <Download className="w-5 h-5 text-primary-foreground" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm">Install CorpsMart</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Get the full app experience with offline access and notifications.
          </p>

          <div className="flex gap-2 mt-3">
            <Button size="sm" onClick={handleInstall} className="text-xs">
              Install
            </Button>
            <Button size="sm" variant="ghost" onClick={handleDismiss} className="text-xs">
              Not now
            </Button>
          </div>
        </div>

        <Button size="sm" variant="ghost" onClick={handleDismiss} className="p-1 h-auto">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
