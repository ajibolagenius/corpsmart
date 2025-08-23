"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Heart, Share2, MapPin, Clock, Shield, Phone, Flag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ChatButton } from "@/components/chat-button"

// Mock data - in real app, this would come from API
const mockListing = {
  id: "1",
  title: "iPhone 13 Pro Max - Excellent Condition",
  description:
    "Barely used iPhone 13 Pro Max, 256GB. Perfect for corps members who need a reliable phone. Comes with original charger, box, and screen protector already applied. No scratches or dents. Selling because I got a new phone from work. Serious buyers only please.",
  price: 450000,
  category: "Electronics",
  state: "Lagos",
  lga: "Ikeja",
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  status: "active",
  seller: {
    id: "seller1",
    name: "Adebayo O.",
    avatar: "AO",
    verified: true,
    rating: 4.8,
    totalSales: 12,
    joinedDate: "2023-08-15",
    responseTime: "Usually responds within 2 hours",
    state: "Lagos",
    batch: "2023 Batch B",
  },
  createdAt: "2024-01-15",
  condition: "Excellent",
  views: 234,
  likes: 18,
}

export default function ListingDetailPage() {
  const params = useParams()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockListing.title,
        text: mockListing.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href="/listings">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? "text-red-500" : ""}
              >
                <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Flag className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-4xl sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card className="overflow-hidden border-0 bg-card/80 backdrop-blur-sm">
              <div className="relative aspect-[4/3]">
                <Image
                  src={mockListing.images[currentImageIndex] || "/placeholder.svg"}
                  alt={mockListing.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {mockListing.condition}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                    {currentImageIndex + 1} / {mockListing.images.length}
                  </Badge>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              {mockListing.images.length > 1 && (
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {mockListing.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${
                          index === currentImageIndex ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Card>

            {/* Item Details */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-serif">{mockListing.title}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>
                          {mockListing.lga}, {mockListing.state}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(mockListing.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">{formatPrice(mockListing.price)}</div>
                    <div className="text-sm text-muted-foreground">
                      {mockListing.views} views • {mockListing.likes} likes
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Badge variant="outline">{mockListing.category}</Badge>
                    <Badge variant="outline">{mockListing.condition}</Badge>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-serif font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{mockListing.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Seller Info and Actions */}
          <div className="space-y-6">
            {/* Seller Card */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Seller Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                      {mockListing.seller.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{mockListing.seller.name}</h4>
                      {mockListing.seller.verified && (
                        <Badge variant="outline" className="text-xs px-1 py-0">
                          <Shield className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ⭐ {mockListing.seller.rating} • {mockListing.seller.totalSales} sales
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span>{mockListing.seller.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">NYSC Batch:</span>
                    <span>{mockListing.seller.batch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Joined:</span>
                    <span>{new Date(mockListing.seller.joinedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{mockListing.seller.responseTime}</p>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-4 space-y-3">
                <ChatButton
                  listingId={mockListing.id}
                  sellerId={mockListing.seller.id}
                  sellerName={mockListing.seller.name}
                  className="w-full"
                />
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Phone className="w-4 h-4 mr-2" />
                  Make Offer
                </Button>

                <div className="pt-2">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Safety Tips</span>
                    </div>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Meet in public places</li>
                      <li>• Inspect item before payment</li>
                      <li>• Use secure payment methods</li>
                      <li>• Trust your instincts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
