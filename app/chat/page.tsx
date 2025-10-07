"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, MessageCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock chat data
const mockChats = [
    {
        id: "1",
        listingId: "1",
        listingTitle: "iPhone 13 Pro Max - Excellent Condition",
        listingImage: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📱%3c/text%3e%3c/svg%3e",
        listingPrice: 450000,
        otherUser: {
            name: "Adebayo O.",
            avatar: "AO",
            verified: true,
            online: true,
        },
        lastMessage: {
            text: "Is the price negotiable? I'm interested in buying it.",
            timestamp: "2024-01-15T14:30:00Z",
            fromMe: false,
        },
        unreadCount: 2,
        status: "active",
    },
    {
        id: "2",
        listingId: "2",
        listingTitle: "MacBook Air M1 - Perfect for Work",
        listingImage: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e💻%3c/text%3e%3c/svg%3e",
        listingPrice: 650000,
        otherUser: {
            name: "Fatima A.",
            avatar: "FA",
            verified: true,
            online: false,
        },
        lastMessage: {
            text: "Thanks for your interest! When can we meet?",
            timestamp: "2024-01-14T16:45:00Z",
            fromMe: true,
        },
        unreadCount: 0,
        status: "active",
    },
    {
        id: "3",
        listingId: "3",
        listingTitle: "Professional Camera - Canon EOS",
        listingImage: "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📷%3c/text%3e%3c/svg%3e",
        listingPrice: 280000,
        otherUser: {
            name: "Michael C.",
            avatar: "MC",
            verified: false,
            online: false,
        },
        lastMessage: {
            text: "Item has been sold. Thank you!",
            timestamp: "2024-01-13T10:20:00Z",
            fromMe: false,
        },
        unreadCount: 0,
        status: "sold",
    },
]

export default function ChatListPage() {
    const [searchQuery, setSearchQuery] = useState("")

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        const now = new Date()
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

        if (diffInHours < 1) {
            return "Just now"
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`
        } else {
            return date.toLocaleDateString()
        }
    }

    const filteredChats = mockChats.filter(
        (chat) =>
            chat.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
            chat.otherUser.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
                <div className="px-4 py-4 mx-auto max-w-4xl">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/listings">
                                <Button variant="ghost" size="sm" className="p-2">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                            </Link>
                            <div>
                                <h1 className="text-xl font-serif font-bold">Messages</h1>
                                <p className="text-sm text-muted-foreground">
                                    {filteredChats.filter((chat) => chat.unreadCount > 0).length} unread
                                </p>
                            </div>
                        </div>
                        <Badge variant="secondary" className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            {filteredChats.length}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="px-4 py-6 mx-auto max-w-4xl space-y-6">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                        placeholder="Search conversations..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                {/* Chat List */}
                <div className="space-y-3">
                    {filteredChats.length === 0 ? (
                        <Card className="border-0 bg-card/50">
                            <CardContent className="p-8 text-center">
                                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-serif font-semibold mb-2">No conversations yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Start chatting with sellers by messaging them from item listings.
                                </p>
                                <Link href="/listings">
                                    <Button>Browse Items</Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        filteredChats.map((chat) => (
                            <Link key={chat.id} href={`/chat/${chat.id}`}>
                                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer border-0 bg-card/80 backdrop-blur-sm">
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-4">
                                            {/* Listing Image */}
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={chat.listingImage || "data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='60' height='60' fill='%23f3f4f6'/%3e%3crect x='15' y='15' width='30' height='30' fill='%23d1d5db'/%3e%3ctext x='30' y='35' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='10'%3e📦%3c/text%3e%3c/svg%3e"}
                                                    alt={chat.listingTitle}
                                                    fill
                                                    className="object-cover"
                                                />
                                                {chat.status === "sold" && (
                                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                        <Badge variant="secondary" className="text-xs">
                                                            SOLD
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                {/* Chat Header */}
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="w-6 h-6">
                                                            <AvatarFallback className="bg-primary/20 text-primary text-xs font-semibold">
                                                                {chat.otherUser.avatar}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium text-sm">{chat.otherUser.name}</span>
                                                        {chat.otherUser.verified && (
                                                            <Badge variant="outline" className="text-xs px-1 py-0">
                                                                ✓
                                                            </Badge>
                                                        )}
                                                        {chat.otherUser.online && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs text-muted-foreground">
                                                            {formatTime(chat.lastMessage.timestamp)}
                                                        </span>
                                                        {chat.unreadCount > 0 && (
                                                            <Badge variant="default" className="w-5 h-5 p-0 text-xs flex items-center justify-center">
                                                                {chat.unreadCount}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Listing Info */}
                                                <div className="flex items-center justify-between mb-2">
                                                    <h4 className="font-medium text-sm truncate">{chat.listingTitle}</h4>
                                                    <span className="text-sm font-semibold text-primary">{formatPrice(chat.listingPrice)}</span>
                                                </div>

                                                {/* Last Message */}
                                                <div className="flex items-center gap-2">
                                                    {chat.lastMessage.fromMe && <span className="text-xs text-muted-foreground">You:</span>}
                                                    <p className="text-sm text-muted-foreground truncate flex-1">{chat.lastMessage.text}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>

                {/* Safety Tips */}
                <Card className="border-0 bg-primary/5">
                    <CardHeader>
                        <CardTitle className="font-serif text-lg">Chat Safety Tips</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <ul className="text-sm text-muted-foreground space-y-1">
                            <li>• Keep conversations within the app for your safety</li>
                            <li>• Meet in public places for item exchanges</li>
                            <li>• Verify the item condition before making payment</li>
                            <li>• Report suspicious behavior to our support team</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
