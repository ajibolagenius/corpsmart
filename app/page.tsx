"use client"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, Shield, MessageCircle, CheckCircle, ArrowRight, Star } from "lucide-react"
import { InstallPrompt } from "@/components/install-prompt"
import { getCurrentUser } from "@/lib/mock-users"
import { useFadeInUp, useStaggerAnimation } from "@/lib/animations"

// Mock statistics with compact design
const stats = [
    { label: "Corps Members", value: "12K+", icon: Users },
    { label: "Transactions", value: "45K+", icon: ShoppingBag },
    { label: "States", value: "36", icon: Shield },
    { label: "Rating", value: "4.9★", icon: Star },
]

export default function HomePage() {
    const router = useRouter()
    const heroRef = useFadeInUp()
    const statsRef = useStaggerAnimation(200)
    const featuresRef = useStaggerAnimation(100)

    useEffect(() => {
        const currentUser = getCurrentUser()
        if (currentUser) {
            router.push("/listings")
        }
    }, [router])

    return (
        <div className="min-h-screen bg-background">
            <InstallPrompt />

            <div className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-secondary">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg width='1200' height='800' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='40' height='40' patternUnits='userSpaceOnUse'%3e%3cpath d='M 40 0 L 0 0 0 40' fill='none' stroke='%23ffffff' stroke-width='1' opacity='0.1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)'/%3e%3c/svg%3e')] bg-cover bg-center opacity-10 parallax" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />

                <div className="relative px-4 py-24 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div ref={heroRef} className="text-center text-primary-foreground animate-on-scroll">
                        <Badge variant="secondary" className="mb-8 bg-accent text-accent-foreground hover-lift text-lg px-6 py-2">
                            🎯 Trusted by 12,000+ Corps Members
                        </Badge>

                        <h1 className="text-6xl font-serif font-bold tracking-tight sm:text-8xl mb-8">
                            Corps<span className="text-accent">Mart</span>
                        </h1>

                        <p className="text-2xl leading-relaxed max-w-4xl mx-auto mb-12 text-primary-foreground/95 font-light">
                            Nigeria's most trusted marketplace exclusively for NYSC corps members.
                            <br />
                            <span className="font-semibold">Buy, sell, and connect safely</span> with verified fellow corps members
                            nationwide.
                        </p>

                        <Button
                            size="lg"
                            className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift text-xl px-12 py-6 rounded-full shadow-2xl"
                            onClick={() => router.push("/auth/signin")}
                        >
                            Start Trading Now
                            <ArrowRight className="ml-3 h-6 w-6" />
                        </Button>

                        {/* Feature highlights with stagger animation */}
                        <div className="flex flex-wrap justify-center gap-8 mt-16">
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover-lift stagger-1 text-base"
                            >
                                <Shield className="w-5 h-5" />
                                NYSC Verified Only
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover-lift stagger-2 text-base"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Secure In-App Chat
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="flex items-center gap-3 px-6 py-3 bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover-lift stagger-3 text-base"
                            >
                                <CheckCircle className="w-5 h-5" />
                                Safe Payments
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            <div className="py-12 bg-muted">
                <div className="px-4 mx-auto max-w-6xl sm:px-6 lg:px-8">
                    <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <Card
                                    key={index}
                                    className="text-center p-6 border-0 bg-background shadow-md hover:shadow-lg transition-all duration-300 hover-lift animate-scale animate-on-scroll"
                                >
                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Icon className="w-6 h-6 text-primary-foreground" />
                                    </div>
                                    <div className="text-2xl font-serif font-bold text-primary mb-1">{stat.value}</div>
                                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </div>

            {/* Enhanced Trust & Safety Section with animations */}
            <div className="px-4 py-16 mx-auto max-w-6xl sm:px-6 bg-background">
                <div className="text-center mb-12 animate-slide-up animate-on-scroll">
                    <h2 className="text-4xl font-serif font-bold text-foreground mb-6">
                        Built for Corps Members, By Corps Members
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Experience a marketplace designed with your safety, convenience, and community in mind. Every feature is
                        crafted specifically for the NYSC experience.
                    </p>
                </div>

                <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="text-center p-8 border-0 bg-muted shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-1">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Shield className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">NYSC Verified</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            All users verified with NYSC batch and state information for maximum trust and safety
                        </p>
                    </Card>

                    <Card className="text-center p-8 border-0 bg-muted shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-2">
                        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                            <MessageCircle className="w-8 h-8 text-secondary-foreground" />
                        </div>
                        <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">Secure Chat</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Built-in messaging with offer system, safety tips, and secure communication channels
                        </p>
                    </Card>

                    <Card className="text-center p-8 border-0 bg-muted shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-3">
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-8 h-8 text-accent-foreground" />
                        </div>
                        <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">Safe Payments</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Integrated payment links with trusted Nigerian providers like Paystack and Flutterwave
                        </p>
                    </Card>

                    <Card className="text-center p-8 border-0 bg-muted shadow-lg hover:shadow-xl transition-all duration-300 hover-lift animate-scale animate-on-scroll stagger-4">
                        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">Local Community</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Connect with corps members in your state and LGA for easy meetups and local deals
                        </p>
                    </Card>
                </div>
            </div>

            {/* Final CTA Section with animation */}
            <div className="py-20 bg-primary">
                <div className="px-4 mx-auto max-w-4xl sm:px-6 lg:px-8 text-center animate-slide-up animate-on-scroll">
                    <h2 className="text-4xl font-serif font-bold text-primary-foreground mb-6">
                        Ready to Join the CorpsMart Community?
                    </h2>
                    <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of verified corps members who trust CorpsMart for safe, convenient buying and selling across
                        Nigeria.
                    </p>
                    <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground hover-lift text-xl px-12 py-6 rounded-full shadow-2xl"
                        onClick={() => router.push("/auth/signin")}
                    >
                        Get Started Now
                        <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
