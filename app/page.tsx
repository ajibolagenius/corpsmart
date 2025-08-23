"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, Shield, MessageCircle } from "lucide-react"
import { InstallPrompt } from "@/components/install-prompt"

// Nigerian states for NYSC deployment
const nigerianStates = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
]

const nyscBatches = ["2024 Batch A", "2024 Batch B", "2024 Batch C", "2023 Batch A", "2023 Batch B", "2023 Batch C"]

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    batch: "",
    callUpNumber: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement authentication logic
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <InstallPrompt />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10" />
        <div className="relative px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold tracking-tight text-foreground sm:text-6xl">
              Corps<span className="text-primary">Mart</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
              The trusted marketplace for NYSC corps members. Buy, sell, and trade goods safely with fellow corps
              members in your state.
            </p>

            {/* Feature highlights */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Shield className="w-4 h-4" />
                Verified Corps Members
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <MessageCircle className="w-4 h-4" />
                In-App Chat
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <ShoppingBag className="w-4 h-4" />
                Safe Payments
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-2 px-4 py-2">
                <Users className="w-4 h-4" />
                Community Driven
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Section */}
      <div className="px-4 py-16 mx-auto max-w-md sm:px-6">
        <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif">{isSignUp ? "Join CorpsMart" : "Welcome Back"}</CardTitle>
            <CardDescription>
              {isSignUp ? "Create your account to start buying and selling" : "Sign in to your CorpsMart account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={isSignUp ? "signup" : "signin"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" onClick={() => setIsSignUp(false)}>
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setIsSignUp(true)}>
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4 mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <Input
                      id="email-signup"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="state">State of Service</Label>
                      <Select onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {nigerianStates.map((state) => (
                            <SelectItem key={state} value={state.toLowerCase()}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="batch">NYSC Batch</Label>
                      <Select onValueChange={(value) => handleInputChange("batch", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {nyscBatches.map((batch) => (
                            <SelectItem key={batch} value={batch.toLowerCase()}>
                              {batch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="callup">Call-up Number (Optional)</Label>
                    <Input
                      id="callup"
                      type="text"
                      placeholder="NYSC/2024/123456"
                      value={formData.callUpNumber}
                      onChange={(e) => handleInputChange("callUpNumber", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      For verification and building trust with other corps members
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <Input
                      id="password-signup"
                      type="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Trust & Safety Section */}
      <div className="px-4 py-16 mx-auto max-w-4xl sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-foreground">Built for Corps Members, By Corps Members</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience a marketplace designed with your safety and convenience in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="text-center p-6 border-0 bg-card/50">
            <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif font-semibold mb-2">Verified Members</h3>
            <p className="text-sm text-muted-foreground">All users verified with NYSC batch and state information</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-card/50">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif font-semibold mb-2">Secure Chat</h3>
            <p className="text-sm text-muted-foreground">Built-in messaging with offer system and safety tips</p>
          </Card>

          <Card className="text-center p-6 border-0 bg-card/50">
            <ShoppingBag className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif font-semibold mb-2">Safe Payments</h3>
            <p className="text-sm text-muted-foreground">
              Integrated payment links with trusted Nigerian payment providers
            </p>
          </Card>

          <Card className="text-center p-6 border-0 bg-card/50">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif font-semibold mb-2">Local Community</h3>
            <p className="text-sm text-muted-foreground">Connect with corps members in your state and LGA</p>
          </Card>
        </div>
      </div>
    </div>
  )
}
