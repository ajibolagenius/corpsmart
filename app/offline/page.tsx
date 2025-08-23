"use client"

import { Wifi, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Wifi className="w-12 h-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">You're Offline</h1>
          <p className="text-muted-foreground">
            Check your internet connection and try again. Some features may be limited while offline.
          </p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => window.location.reload()} className="w-full">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>

          <Button variant="outline" onClick={() => window.history.back()} className="w-full">
            Go Back
          </Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <p>You can still browse cached listings and messages while offline.</p>
        </div>
      </div>
    </div>
  )
}
