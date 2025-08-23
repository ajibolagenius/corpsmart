"use client"

import { useState, useEffect } from "react"
import { Wifi, WifiOff, Download } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PWAStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check online status
    setIsOnline(navigator.onLine)

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // Check if app is installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true)
    }

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
        {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
        {isOnline ? "Online" : "Offline"}
      </Badge>

      {isInstalled && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <Download className="w-3 h-3" />
          App Mode
        </Badge>
      )}
    </div>
  )
}
