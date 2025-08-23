"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Copy, MessageCircle, Home, AlertTriangle, Clock } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function PaymentConfirmationPage() {
  const searchParams = useSearchParams()
  const method = searchParams.get("method")
  const [copied, setCopied] = useState(false)

  const mockBankDetails = {
    bankName: "First Bank of Nigeria",
    accountName: "Adebayo Olumide",
    accountNumber: "3012345678",
    amount: 450000,
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getMethodInfo = () => {
    switch (method) {
      case "bank-transfer":
        return {
          title: "Bank Transfer Details",
          description: "Transfer the exact amount to the seller's account",
          icon: "🏦",
          status: "pending",
        }
      case "cash":
        return {
          title: "Cash Payment Confirmed",
          description: "You've chosen to pay with cash on delivery",
          icon: "💵",
          status: "confirmed",
        }
      default:
        return {
          title: "Payment Confirmation",
          description: "Your payment method has been confirmed",
          icon: "✅",
          status: "confirmed",
        }
    }
  }

  const methodInfo = getMethodInfo()

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 py-8 mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-3xl">{methodInfo.icon}</div>
          </div>
          <h1 className="text-2xl font-serif font-bold mb-2">{methodInfo.title}</h1>
          <p className="text-muted-foreground">{methodInfo.description}</p>
        </div>

        {/* Bank Transfer Details */}
        {method === "bank-transfer" && (
          <Card className="border-0 bg-card/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">Transfer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-amber-800 dark:text-amber-200">Important</span>
                </div>
                <p className="text-sm text-amber-800 dark:text-amber-200">
                  Transfer the exact amount shown below. Any difference may delay your order.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Bank Name</span>
                    <p className="font-semibold">{mockBankDetails.bankName}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Account Name</span>
                    <p className="font-semibold">{mockBankDetails.accountName}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Account Number</span>
                    <p className="font-semibold font-mono">{mockBankDetails.accountNumber}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockBankDetails.accountNumber)}>
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Amount to Transfer</span>
                    <p className="font-bold text-lg text-primary">{formatPrice(mockBankDetails.amount)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => copyToClipboard(mockBankDetails.amount.toString())}>
                    <Copy className="w-4 h-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </div>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Reference:</strong> Use "CorpsMart-{Date.now().toString().slice(-6)}" as your transfer
                  reference
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Cash Payment Info */}
        {method === "cash" && (
          <Card className="border-0 bg-card/80 backdrop-blur-sm mb-6">
            <CardHeader>
              <CardTitle className="font-serif">Cash Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-200">Payment Method Confirmed</span>
                </div>
                <p className="text-sm text-green-800 dark:text-green-200">
                  You've chosen to pay with cash when you receive the item.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Payment Method</span>
                  <Badge variant="outline">Cash on Delivery</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Amount to Pay</span>
                  <span className="font-bold text-primary">{formatPrice(450000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing Fees</span>
                  <span className="text-green-600">Free</span>
                </div>
              </div>

              <Separator />

              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-amber-800 dark:text-amber-200">Safety Reminders</h4>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Meet in a public, well-lit location</li>
                  <li>• Inspect the item thoroughly before payment</li>
                  <li>• Bring exact change if possible</li>
                  <li>• Trust your instincts - if something feels wrong, walk away</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Next Steps */}
        <Card className="border-0 bg-primary/5 mb-6">
          <CardHeader>
            <CardTitle className="font-serif">What Happens Next?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {method === "bank-transfer" ? (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Make the Transfer</h4>
                    <p className="text-sm text-muted-foreground">
                      Use your banking app to transfer the exact amount to the seller's account.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Send Proof</h4>
                    <p className="text-sm text-muted-foreground">
                      Share a screenshot of your transfer receipt with the seller via chat.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Arrange Meetup</h4>
                    <p className="text-sm text-muted-foreground">
                      Once payment is confirmed, arrange to collect your item.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Seller Notification</h4>
                    <p className="text-sm text-muted-foreground">
                      The seller has been notified of your payment preference.
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
                    <h4 className="font-semibold mb-1">Complete Transaction</h4>
                    <p className="text-sm text-muted-foreground">Inspect the item and pay the agreed amount in cash.</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
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

        {/* Status Indicator */}
        <Card className="border-0 bg-muted/20 mt-6">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {method === "bank-transfer" ? "Waiting for Payment" : "Payment Method Confirmed"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Transaction ID: TXN{Date.now()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
