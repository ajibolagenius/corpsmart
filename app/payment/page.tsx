"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CreditCard, Shield, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

// Mock listing data
const mockListing = {
  id: "1",
  title: "iPhone 13 Pro Max - Excellent Condition",
  image: "/placeholder.svg?height=100&width=100",
  price: 450000,
  seller: {
    name: "Adebayo O.",
    verified: true,
  },
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const listingId = searchParams.get("listing")
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const paymentMethods = [
    {
      id: "paystack",
      name: "Paystack",
      description: "Pay with card, bank transfer, or USSD",
      icon: "💳",
      fees: "1.5% + ₦100",
      popular: true,
    },
    {
      id: "flutterwave",
      name: "Flutterwave",
      description: "Secure payment with multiple options",
      icon: "🏦",
      fees: "1.4% + ₦100",
      popular: false,
    },
    {
      id: "bank-transfer",
      name: "Direct Bank Transfer",
      description: "Transfer directly to seller's account",
      icon: "🏧",
      fees: "Free",
      popular: false,
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      description: "Pay when you receive the item",
      icon: "💵",
      fees: "Free",
      popular: true,
    },
  ]

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      if (selectedMethod === "paystack" || selectedMethod === "flutterwave") {
        // In real app, this would redirect to payment provider
        window.location.href = `/payment/success?listing=${listingId}&method=${selectedMethod}`
      } else {
        // For other methods, show confirmation
        window.location.href = `/payment/confirmation?listing=${listingId}&method=${selectedMethod}`
      }
    }, 2000)
  }

  const calculateTotal = () => {
    const basePrice = mockListing.price
    let fees = 0

    if (selectedMethod === "paystack") {
      fees = Math.round(basePrice * 0.015 + 100)
    } else if (selectedMethod === "flutterwave") {
      fees = Math.round(basePrice * 0.014 + 100)
    }

    return basePrice + fees
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-2xl">
          <div className="flex items-center gap-4">
            <Link href={`/listings/${listingId}`}>
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-serif font-bold">Secure Payment</h1>
              <p className="text-sm text-muted-foreground">Choose your payment method</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-2xl space-y-6">
        {/* Item Summary */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-serif">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={mockListing.image || "/placeholder.svg"}
                  alt={mockListing.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{mockListing.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sold by {mockListing.seller.name}</span>
                  {mockListing.seller.verified && (
                    <Badge variant="outline" className="text-xs px-1 py-0">
                      ✓
                    </Badge>
                  )}
                </div>
              </div>
              <div className="text-xl font-bold text-primary">{formatPrice(mockListing.price)}</div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="font-serif">Payment Method</CardTitle>
            <CardDescription>Choose how you'd like to pay for this item</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedMethod === method.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{method.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{method.name}</h4>
                        {method.popular && (
                          <Badge variant="secondary" className="text-xs">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Fees: {method.fees}</p>
                    </div>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${
                      selectedMethod === method.id ? "border-primary bg-primary" : "border-muted-foreground"
                    }`}
                  >
                    {selectedMethod === method.id && (
                      <div className="w-full h-full rounded-full bg-primary-foreground scale-50"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment Summary */}
        {selectedMethod && (
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="font-serif">Payment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Item Price</span>
                <span>{formatPrice(mockListing.price)}</span>
              </div>

              {(selectedMethod === "paystack" || selectedMethod === "flutterwave") && (
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Processing Fees</span>
                  <span>{formatPrice(calculateTotal() - mockListing.price)}</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(calculateTotal())}</span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Notice */}
        <Card className="border-0 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold">Secure Payment</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Your payment information is encrypted and secure</li>
              <li>• We never store your card details</li>
              <li>• All transactions are monitored for fraud</li>
              <li>• Get instant confirmation and receipt</li>
            </ul>
          </CardContent>
        </Card>

        {/* Payment Button */}
        <Button onClick={handlePayment} disabled={!selectedMethod || isProcessing} className="w-full" size="lg">
          {isProcessing ? (
            <>
              <Clock className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              {selectedMethod === "cash"
                ? "Confirm Cash Payment"
                : selectedMethod === "bank-transfer"
                  ? "Get Bank Details"
                  : `Pay ${formatPrice(calculateTotal())}`}
            </>
          )}
        </Button>

        {/* Terms */}
        <p className="text-xs text-muted-foreground text-center">
          By proceeding, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  )
}
