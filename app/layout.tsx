import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Gloock, Space_Mono } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/navigation"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const gloock = Gloock({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-gloock",
  weight: "400",
})

const spaceMono = Space_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-mono",
  weight: ["400", "700"],
})

export const metadata: Metadata = {
  title: "CorpsMart - NYSC Marketplace",
  description: "Buy, sell, and trade goods safely with fellow NYSC corps members",
  generator: "v0.app",
  manifest: "/manifest.json",
  themeColor: "#327039",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "CorpsMart",
  },
  icons: {
    icon: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${gloock.variable} ${spaceMono.variable} antialiased`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Navigation />
        <main className="pb-16 md:pb-0">{children}</main>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
