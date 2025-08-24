"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ShoppingBag, Users, Shield, MessageCircle, Info, Star, CheckCircle, ArrowRight, Quote } from "lucide-react"
import { InstallPrompt } from "@/components/install-prompt"
import { authenticateUser, setCurrentUser, getCurrentUser } from "@/lib/mock-users"
import { useFadeInUp, useStaggerAnimation } from "@/lib/animations"

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

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Adebayo Ogundimu",
    batch: "2024 Batch A",
    state: "Lagos",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "CorpsMart made it so easy to sell my electronics before leaving Lagos. The verification system gave me confidence in every transaction.",
  },
  {
    id: 2,
    name: "Fatima Abdullahi",
    batch: "2024 Batch B",
    state: "Abuja",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "I found amazing deals on textbooks and furniture. The chat system made negotiating so much easier than other platforms.",
  },
  {
    id: 3,
    name: "Chinedu Okoro",
    batch: "2023 Batch C",
    state: "Rivers",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    text: "As someone who was skeptical about online marketplaces, CorpsMart's NYSC verification system completely changed my mind. Highly recommended!",
  },
]

// Mock statistics with numeric values for count-up animation
const stats = [
  { label: "Active Corps Members", value: "12,000+", numericValue: 12000, icon: Users },
  { label: "Successful Transactions", value: "45,000+", numericValue: 45000, icon: ShoppingBag },
  { label: "States Covered", value: "36", numericValue: 36, icon: Shield },
  { label: "Average Rating", value: "4.9/5", numericValue: 4.9, icon: Star },
]

export default function HomePage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    state: "",
    batch: "",
    callUpNumber: "",
  })

  const heroRef = useFadeInUp()
  const statsRef = useStaggerAnimation(200)
  const testimonialsRef = useStaggerAnimation(150)
  const featuresRef = useStaggerAnimation(100)

  useEffect(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      router.push("/listings")
    }
  }, [router])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError("") // Clear error when user types
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (isSignUp) {
        // Sign up validation
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          return
        }
        if (!formData.state || !formData.batch) {
          setError("Please select your state and batch")
          return
        }
        // For demo, just redirect to listings
        setError("Sign up successful! Please sign in with your credentials.")
        setIsSignUp(false)
      } else {
        // Sign in
        const user = authenticateUser(formData.email, formData.password)
        if (user) {
          setCurrentUser(user)
          router.push("/listings")
        } else {
          setError("Invalid email or password")
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <InstallPrompt />

      {/* Enhanced Hero Section with animations */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-10 parallax" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />

        <div className="relative px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div ref={heroRef} className="text-center text-primary-foreground animate-on-scroll">
            <Badge variant="secondary" className="mb-6 bg-accent text-accent-foreground hover-lift">
              Trusted by 12,000+ Corps Members
            </Badge>

            <h1 className="text-5xl font-serif font-bold tracking-tight sm:text-7xl mb-6">
              Corps<span className="text-accent">Mart</span>
            </h1>

            <p className="text-xl leading-8 max-w-3xl mx-auto mb-8 text-primary-foreground/90">
              The most trusted marketplace for NYSC corps members. Buy, sell, and trade goods safely with verified
              fellow corps members across Nigeria.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent hover-lift"
              >
                Learn More
              </Button>
            </div>

            {/* Feature highlights with stagger animation */}
            <div className="flex flex-wrap justify-center gap-6">
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover-lift stagger-1"
              >
                <Shield className="w-4 h-4" />
                NYSC Verified Only
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover-lift stagger-2"
              >
                <MessageCircle className="w-4 h-4" />
                Secure In-App Chat
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover-lift stagger-3"
              >
                <CheckCircle className="w-4 h-4" />
                Safe Payments
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section with count-up animations */}
      <div className="py-16 bg-muted">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up animate-on-scroll">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Trusted by Corps Members Nationwide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of corps members who have made CorpsMart their go-to marketplace
            </p>
          </div>

          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center animate-scale animate-on-scroll hover-lift">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-serif font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section with stagger animations */}
      <div className="py-16 bg-background">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-slide-up animate-on-scroll">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">What Corps Members Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from verified NYSC corps members across Nigeria
            </p>
          </div>

          <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`border-0 bg-card shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-slide-up animate-on-scroll stagger-${index + 1}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Quote className="w-8 h-8 text-accent mb-4" />
                  </div>

                  <p className="text-card-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-card-foreground">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.batch} • {testimonial.state}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Test Credentials Alert */}
      <div className="px-4 mx-auto max-w-md sm:px-6 mb-4">
        <Alert className="border-accent/20 bg-accent/5">
          <Info className="h-4 w-4 text-accent" />
          <AlertDescription className="text-foreground">
            <strong>Test Credentials:</strong>
            <br />
            User: test@user.com / password123
            <br />
            Admin: admin@corpsmart.com / admin123
          </AlertDescription>
        </Alert>
      </div>

      {/* Authentication Section */}
      <div className="px-4 py-8 mx-auto max-w-md sm:px-6">
        <Card className="shadow-xl border-0 bg-card">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-card-foreground">
              {isSignUp ? "Join CorpsMart" : "Welcome Back"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isSignUp ? "Create your account to start buying and selling" : "Sign in to your CorpsMart account"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing In..." : "Sign In"}
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
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Trust & Safety Section with animations */}
      <div className="px-4 py-16 mx-auto max-w-6xl sm:px-6 bg-muted">
        <div className="text-center mb-12 animate-slide-up animate-on-scroll">
          <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
            Built for Corps Members, By Corps Members
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Experience a marketplace designed with your safety, convenience, and community in mind. Every feature is
            crafted specifically for the NYSC experience.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="text-center p-6 border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-1">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-serif font-semibold mb-3 text-foreground">NYSC Verified</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All users verified with NYSC batch and state information for maximum trust and safety
            </p>
          </Card>

          <Card className="text-center p-6 border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-2">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-secondary-foreground" />
            </div>
            <h3 className="font-serif font-semibold mb-3 text-foreground">Secure Chat</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Built-in messaging with offer system, safety tips, and secure communication channels
            </p>
          </Card>

          <Card className="text-center p-6 border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-3">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-accent-foreground" />
            </div>
            <h3 className="font-serif font-semibold mb-3 text-foreground">Safe Payments</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Integrated payment links with trusted Nigerian providers like Paystack and Flutterwave
            </p>
          </Card>

          <Card className="text-center p-6 border-0 bg-background shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-4">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="font-serif font-semibold mb-3 text-foreground">Local Community</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Connect with corps members in your state and LGA for easy meetups and local deals
            </p>
          </Card>
        </div>
      </div>

      {/* Final CTA Section with animation */}
      <div className="py-16 bg-primary">
        <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8 text-center animate-slide-up animate-on-scroll">
          <h2 className="text-3xl font-serif font-bold text-primary-foreground mb-4">
            Ready to Join the CorpsMart Community?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of verified corps members who trust CorpsMart for safe, convenient buying and selling across
            Nigeria.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
