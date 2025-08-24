"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function DesignSystemShowcase() {
  return (
    <div className="space-section">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-display mb-6">CorpsMart Design System</h1>
          <p className="text-body-large text-muted-foreground max-w-2xl mx-auto">
            A comprehensive design system built with Forest Fern, Wheat Field Sunrise, and carefully crafted typography.
          </p>
        </div>

        {/* Color Palette */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-heading">Color Palette</CardTitle>
            <CardDescription>Our brand colors inspired by nature</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-full h-24 bg-forest-fern rounded-lg mb-2"></div>
                <p className="text-caption">Forest Fern</p>
                <p className="text-code">#327039</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-wheat-sunrise rounded-lg mb-2"></div>
                <p className="text-caption">Wheat Sunrise</p>
                <p className="text-code">#F0BE49</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-tilled-earth rounded-lg mb-2"></div>
                <p className="text-caption">Tilled Earth</p>
                <p className="text-code">#133020</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-alabaster-hay rounded-lg mb-2"></div>
                <p className="text-caption">Alabaster Hay</p>
                <p className="text-code">#F8EDD9</p>
              </div>
              <div className="text-center">
                <div className="w-full h-24 bg-cherry-grove rounded-lg mb-2"></div>
                <p className="text-caption">Cherry Grove</p>
                <p className="text-code">#DD5C36</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-heading">Typography System</CardTitle>
            <CardDescription>Space Grotesk, Gloock, and Space Mono working in harmony</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h1>Display Heading - Gloock</h1>
              <h2>Large Heading - Gloock</h2>
              <h3>Medium Heading - Gloock</h3>
              <h4>Small Heading - Gloock</h4>
            </div>
            <div>
              <p className="text-body-large">
                Large body text using Space Grotesk for excellent readability and modern appeal.
              </p>
              <p className="text-body">
                Regular body text that maintains clarity across all device sizes and contexts.
              </p>
              <p className="text-body-small">Small body text for secondary information and detailed content.</p>
            </div>
            <div>
              <p className="text-caption">Caption Text - Space Mono</p>
              <p className="text-code">Code and technical text - Space Mono</p>
            </div>
          </CardContent>
        </Card>

        {/* Component Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-heading">Component Examples</CardTitle>
            <CardDescription>How our design system comes together</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover-lift">
                <CardContent className="p-6">
                  <h4 className="text-forest-fern mb-2">Primary Card</h4>
                  <p className="text-body-small">Using Forest Fern for primary elements</p>
                </CardContent>
              </Card>
              <Card className="hover-lift bg-wheat-sunrise">
                <CardContent className="p-6">
                  <h4 className="text-tilled-earth mb-2">Secondary Card</h4>
                  <p className="text-body-small text-tilled-earth">Using Wheat Sunrise background</p>
                </CardContent>
              </Card>
              <Card className="hover-lift border-cherry-grove">
                <CardContent className="p-6">
                  <h4 className="text-cherry-grove mb-2">Accent Card</h4>
                  <p className="text-body-small">Using Cherry Grove for accents</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
