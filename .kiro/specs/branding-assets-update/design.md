# Design Document

## Overview

This design outlines the implementation of consistent branding across the CorpsMart application using the existing `market_square.svg` as the primary logo and `corpsmart.png` as the PWA screenshot. The design focuses on creating a cohesive visual identity while maintaining performance and accessibility standards.

## Architecture

### Asset Processing Pipeline
- **Source Assets**: `market_square.svg` (800x800px) and `corpsmart.png` (2880x2340px)
- **Generated Assets**: Multiple PNG formats for different use cases (favicons, PWA icons, apple-touch-icons)
- **Delivery Method**: Static assets served from `/public` directory with optimized caching

### Component Integration
- **Navigation Component**: Updated to display SVG logo with responsive sizing
- **Layout Component**: Updated metadata for proper favicon and PWA icon references
- **PWA Manifest**: Updated with correct icon paths and screenshot

## Components and Interfaces

### Logo Component
```typescript
interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  showText?: boolean
}
```

**Responsibilities:**
- Render the market_square.svg with appropriate sizing
- Handle responsive behavior across breakpoints
- Provide accessibility attributes
- Support optional text fallback

### Asset Generation Utility
```typescript
interface IconSize {
  width: number
  height: number
  filename: string
  purpose?: 'maskable' | 'any'
}
```

**Responsibilities:**
- Convert SVG to required PNG formats
- Generate favicons in multiple sizes
- Optimize file sizes for web delivery
- Maintain aspect ratios and quality

### Navigation Updates
**Desktop Navigation:**
- Logo positioned on the left side
- Size: 32px height with auto width
- Clickable area extends to include text if present

**Mobile Navigation:**
- Logo in header: 28px height
- Maintains touch target size requirements (44px minimum)

## Data Models

### Manifest Configuration
```json
{
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ],
  "screenshots": [
    {
      "src": "/corpsmart.png",
      "sizes": "2880x2340",
      "type": "image/png",
      "form_factor": "wide",
      "label": "CorpsMart marketplace view"
    }
  ]
}
```

### Favicon Configuration
```typescript
{
  icon: [
    { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    { url: "/icon-512.png", sizes: "512x512", type: "image/png" }
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
  ]
}
```

## Error Handling

### Asset Loading Fallbacks
1. **SVG Load Failure**: Fall back to text-based logo with consistent styling
2. **Icon Generation Failure**: Provide manual fallback icons in repository
3. **Manifest Issues**: Ensure backward compatibility with existing PWA installations

### Responsive Behavior
- **Small Screens**: Logo scales down gracefully, minimum 24px height
- **Large Screens**: Logo maintains optimal size without pixelation
- **High DPI**: SVG format ensures crisp rendering on retina displays

## Testing Strategy

### Visual Regression Testing
- Screenshot comparison across different screen sizes
- Logo rendering in light/dark themes
- PWA installation flow with new icons

### Accessibility Testing
- Screen reader compatibility with logo alt text
- Keyboard navigation to logo link
- Color contrast validation

### Performance Testing
- Asset loading times for different icon sizes
- Bundle size impact of new assets
- Caching behavior verification

### Cross-Platform Testing
- PWA installation on iOS/Android
- Favicon display across different browsers
- App icon appearance in various contexts (home screen, app switcher)

## Implementation Considerations

### Asset Optimization
- Generate WebP versions for modern browsers
- Implement proper caching headers
- Use appropriate compression levels

### Theme Compatibility
- Ensure logo works with existing color scheme
- Consider dark mode variations if needed
- Maintain brand consistency across themes

### Performance Impact
- Lazy load non-critical icons
- Preload essential branding assets
- Monitor Core Web Vitals impact
