# CorpsMart PWA

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/jaxenjosephjj-5022s-projects/v0-corps-mart-pwa)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/RuxTnS0qGzG)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/jaxenjosephjj-5022s-projects/v0-corps-mart-pwa](https://vercel.com/jaxenjosephjj-5022s-projects/v0-corps-mart-pwa)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/RuxTnS0qGzG](https://v0.app/chat/projects/RuxTnS0qGzG)**

## Branding Assets

CorpsMart uses a consistent branding system across all touchpoints:

### Logo and Icons

- **Primary Logo**: `public/market_square.svg` - The main CorpsMart logo used throughout the application
- **Favicons**: Generated from the primary logo in multiple sizes:
  - `public/favicon-16x16.png` - 16x16px favicon
  - `public/favicon-32x32.png` - 32x32px favicon
- **PWA Icons**: Optimized for Progressive Web App installation:
  - `public/icon-192.png` - 192x192px PWA icon
  - `public/icon-512.png` - 512x512px PWA icon
- **Apple Touch Icon**: `public/apple-touch-icon.png` - 180x180px for iOS devices

### Screenshots

- **PWA Screenshot**: `public/corpsmart.png` - Application screenshot used in PWA manifest for installation prompts

### Logo Component

The application includes a reusable `Logo` component (`components/logo.tsx`) that:
- Renders the SVG logo with responsive sizing
- Supports multiple size variants (sm, md, lg)
- Includes proper accessibility attributes
- Handles navigation to the main listings page when clicked
- Works seamlessly across light and dark themes

### Implementation Notes

All branding assets are optimized for web delivery and maintain consistent visual identity across:
- Browser tabs (favicons)
- PWA installation experience
- Navigation components
- Mobile and desktop interfaces
- Light and dark theme modes

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
