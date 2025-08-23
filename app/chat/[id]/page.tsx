"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, ImageIcon, Phone, MoreVertical, Shield, MapPin, DollarSign, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"

// Mock chat data
const mockChatData = {
  id: "1",
  listing: {
    id: "1",
    title: "iPhone 13 Pro Max - Excellent Condition",
    image: "/placeholder.svg?height=80&width=80",
    price: 450000,
    condition: "Excellent",
    location: "Ikeja, Lagos",
    status: "active",
  },
  otherUser: {
    name: "Adebayo O.",
    avatar: "AO",
    verified: true,
    online: true,
    responseTime: "Usually responds within 2 hours",
    rating: 4.8,
  },
  messages: [
    {
      id: "1",
      text: "Hi! I'm interested in your iPhone. Is it still available?",
      timestamp: "2024-01-15T10:00:00Z",
      fromMe: false,
      type: "text",
    },
    {
      id: "2",
      text: "Yes, it's still available! It's in excellent condition with no scratches.",
      timestamp: "2024-01-15T10:05:00Z",
      fromMe: true,
      type: "text",
    },
    {
      id: "3",
      text: "Can you share more photos of the phone?",
      timestamp: "2024-01-15T10:10:00Z",
      fromMe: false,
      type: "text",
    },
    {
      id: "4",
      text: "Here are some additional photos",
      timestamp: "2024-01-15T10:15:00Z",
      fromMe: true,
      type: "text",
    },
    {
      id: "5",
      images: ["/placeholder.svg?height=200&width=200", "/placeholder.svg?height=200&width=200"],
      timestamp: "2024-01-15T10:16:00Z",
      fromMe: true,
      type: "image",
    },
    {
      id: "6",
      text: "Looks great! Is the price negotiable?",
      timestamp: "2024-01-15T10:20:00Z",
      fromMe: false,
      type: "text",
    },
    {
      id: "7",
      text: "I can do ₦420,000 if you're serious about buying",
      timestamp: "2024-01-15T10:25:00Z",
      fromMe: true,
      type: "offer",
      offerAmount: 420000,
    },
    {
      id: "8",
      text: "That works for me! When can we meet?",
      timestamp: "2024-01-15T14:30:00Z",
      fromMe: false,
      type: "text",
    },
  ],
}

export default function ChatPage() {
  const params = useParams()
  const [newMessage, setNewMessage] = useState("")
  const [offerAmount, setOfferAmount] = useState("")
  const [showOfferInput, setShowOfferInput] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [mockChatData.messages])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // In real app, this would send the message via API
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  const handleSendOffer = () => {
    if (offerAmount && Number(offerAmount) > 0) {
      // In real app, this would send the offer via API
      console.log("Sending offer:", offerAmount)
      setOfferAmount("")
      setShowOfferInput(false)
    }
  }

  const handleMarkAsSold = () => {
    // In real app, this would update the listing status
    console.log("Marking as sold")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/chat">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                    {mockChatData.otherUser.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="font-semibold">{mockChatData.otherUser.name}</h1>
                    {mockChatData.otherUser.verified && (
                      <Badge variant="outline" className="text-xs px-1 py-0">
                        ✓
                      </Badge>
                    )}
                    {mockChatData.otherUser.online && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                  </div>
                  <p className="text-xs text-muted-foreground">{mockChatData.otherUser.responseTime}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Listing Info */}
      <div className="px-4 py-4 mx-auto max-w-4xl w-full">
        <Card className="border-0 bg-card/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <Image
                  src={mockChatData.listing.image || "/placeholder.svg"}
                  alt={mockChatData.listing.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-1">{mockChatData.listing.title}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {mockChatData.listing.location}
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {mockChatData.listing.condition}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-primary">{formatPrice(mockChatData.listing.price)}</div>
                <Badge variant={mockChatData.listing.status === "active" ? "default" : "secondary"} className="text-xs">
                  {mockChatData.listing.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages */}
      <div className="flex-1 px-4 mx-auto max-w-4xl w-full overflow-y-auto">
        <div className="space-y-4 pb-4">
          {mockChatData.messages.map((message) => (
            <div key={message.id} className={`flex ${message.fromMe ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] ${message.fromMe ? "order-2" : "order-1"}`}>
                {message.type === "text" && (
                  <div
                    className={`p-3 rounded-lg ${
                      message.fromMe ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground border"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                )}

                {message.type === "image" && message.images && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      {message.images.map((image, index) => (
                        <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Shared image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {message.type === "offer" && (
                  <div
                    className={`p-3 rounded-lg border-2 ${
                      message.fromMe ? "border-primary bg-primary/10" : "border-accent bg-accent/10"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-semibold text-sm">Price Offer</span>
                    </div>
                    <div className="text-lg font-bold">{formatPrice(message.offerAmount!)}</div>
                    <p className="text-sm text-muted-foreground">{message.text}</p>
                    {!message.fromMe && (
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Counter
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                  {message.fromMe && <CheckCircle className="w-3 h-3 text-primary" />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Safety Banner */}
      <div className="px-4 mx-auto max-w-4xl w-full">
        <Card className="border-0 bg-amber-50 dark:bg-amber-950/20 mb-4">
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-600" />
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Safety Tip:</strong> Meet in public places and inspect items before payment.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Message Input */}
      <div className="sticky bottom-0 bg-background/80 backdrop-blur-md border-t">
        <div className="px-4 py-4 mx-auto max-w-4xl">
          {showOfferInput ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-primary" />
                <span className="font-medium text-sm">Make an Offer</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Enter amount (₦)"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSendOffer} disabled={!offerAmount}>
                  Send Offer
                </Button>
                <Button variant="outline" onClick={() => setShowOfferInput(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowOfferInput(true)} className="bg-transparent">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Offer
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent" onClick={handleMarkAsSold}>
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Mark Sold
                </Button>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="p-2">
                  <ImageIcon className="w-4 h-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
