"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Download, MessageCircle, Home, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

export default function PaymentSuccessPage() {
    const searchParams = useSearchParams()
    const listingId = searchParams.get("listing")
    const method = searchParams.get("method")
    const [transactionId] = useState(`TXN${Date.now()}`)

    const mockTransaction = {
        id: transactionId,
        amount: 450000,
        fees: method === "paystack" ? 6850 : method === "flutterwave" ? 6400 : 0,
        method: method === "paystack" ? "Paystack" : method === "flutterwave" ? "Flutterwave" : "Other",
        status: "completed",
        timestamp: new Date().toISOString(),
        listing: {
            title: "iPhone 13 Pro Max - Excellent Condition",
            image: "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='80' height='80' fill='%23f3f4f6'/%3e%3crect x='20' y='20' width='40' height='40' fill='%23d1d5db'/%3e%3ctext x='40' y='45' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3e📱%3c/text%3e%3c/svg%3e",
            seller: "Adebayo O.",
        },
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const downloadReceipt = () => {
        // In real app, this would generate and download a PDF receipt
        console.log("Downloading receipt...")
    }

    const shareReceipt = () => {
        if (navigator.share) {
            navigator.share({
                title: "Payment Confirmation - CorpsMart",
                text: `Payment successful for ${mockTransaction.listing.title}`,
                url: window.location.href,
            })
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="px-4 py-8 mx-auto max-w-2xl">
                {/* Success Header */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-serif font-bold mb-2">Payment Successful!</h1>
                    <p className="text-muted-foreground">
                        Your payment has been processed successfully. The seller has been notified.
                    </p>
                </div>

                {/* Transaction Details */}
                <Card className="border-0 bg-card/80 backdrop-blur-sm mb-6">
                    <CardHeader>
                        <CardTitle className="font-serif">Transaction Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Item Info */}
                        <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                                <Image
                                    src={mockTransaction.listing.image || "data:image/svg+xml,%3csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='80' height='80' fill='%23f3f4f6'/%3e%3crect x='20' y='20' width='40' height='40' fill='%23d1d5db'/%3e%3ctext x='40' y='45' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='14'%3e📦%3c/text%3e%3c/svg%3e"}
                                    alt={mockTransaction.listing.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold mb-1">{mockTransaction.listing.title}</h3>
                                <p className="text-sm text-muted-foreground">Sold by {mockTransaction.listing.seller}</p>
                            </div>
                        </div>

                        <Separator />

                        {/* Payment Summary */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Transaction ID</span>
                                <span className="font-mono text-sm">{mockTransaction.id}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Payment Method</span>
                                <span>{mockTransaction.method}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Date & Time</span>
                                <span>{new Date(mockTransaction.timestamp).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status</span>
                                <Badge variant="default" className="bg-green-600">
                                    {mockTransaction.status.toUpperCase()}
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        {/* Amount Breakdown */}
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Item Price</span>
                                <span>{formatPrice(mockTransaction.amount)}</span>
                            </div>
                            {mockTransaction.fees > 0 && (
                                <div className="flex justify-between text-sm text-muted-foreground">
                                    <span>Processing Fees</span>
                                    <span>{formatPrice(mockTransaction.fees)}</span>
                                </div>
                            )}
                            <Separator />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total Paid</span>
                                <span className="text-primary">{formatPrice(mockTransaction.amount + mockTransaction.fees)}</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Next Steps */}
                <Card className="border-0 bg-primary/5 mb-6">
                    <CardHeader>
                        <CardTitle className="font-serif">What's Next?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">1</span>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Seller Notification</h4>
                                <p className="text-sm text-muted-foreground">
                                    The seller has been notified of your payment and will contact you soon.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">2</span>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Arrange Meetup</h4>
                                <p className="text-sm text-muted-foreground">
                                    Chat with the seller to arrange a safe meetup location and time.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-xs font-semibold text-primary">3</span>
                            </div>
                            <div>
                                <h4 className="font-semibold mb-1">Receive Item</h4>
                                <p className="text-sm text-muted-foreground">Inspect the item carefully before confirming receipt.</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        <Button onClick={downloadReceipt} variant="outline" className="bg-transparent">
                            <Download className="w-4 h-4 mr-2" />
                            Download Receipt
                        </Button>
                        <Button onClick={shareReceipt} variant="outline" className="bg-transparent">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                        </Button>
                    </div>

                    <Link href={`/chat/1`}>
                        <Button className="w-full" size="lg">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat with Seller
                        </Button>
                    </Link>

                    <Link href="/listings">
                        <Button variant="outline" className="w-full bg-transparent">
                            <Home className="w-4 h-4 mr-2" />
                            Back to Listings
                        </Button>
                    </Link>
                </div>

                {/* Support */}
                <Card className="border-0 bg-muted/20 mt-6">
                    <CardContent className="p-4 text-center">
                        <p className="text-sm text-muted-foreground mb-2">Need help with your transaction?</p>
                        <Link href="/support">
                            <Button variant="ghost" size="sm">
                                Contact Support
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
