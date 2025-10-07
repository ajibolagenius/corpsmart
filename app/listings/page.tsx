"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Search, Filter, Plus, MapPin, Clock, Heart, SlidersHorizontal, X, TrendingUp, History } from "lucide-react"
import Link from "next/link"
import { SafeImage } from "@/components/ui/safe-image"

// Mock data for listings
const mockListings = [
    {
        id: "1",
        title: "iPhone 13 Pro Max - Excellent Condition",
        description: "Barely used iPhone 13 Pro Max, 256GB. Perfect for corps members who need a reliable phone.",
        price: 450000,
        category: "Electronics",
        state: "Lagos",
        lga: "Ikeja",
        images: ["data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f3f4f6'/%3e%3crect x='150' y='100' width='100' height='100' fill='%23d1d5db'/%3e%3ctext x='200' y='155' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='20'%3e📱%3c/text%3e%3c/svg%3e"],
        status: "active",
        seller: "Adebayo O.",
        createdAt: "2024-01-15",
        condition: "Excellent",
        verified: true,
    },
    {
        id: "2",
        title: "MacBook Air M1 - Perfect for Work",
        description: "MacBook Air M1 chip, 8GB RAM, 256GB SSD. Great for PPA work and personal projects.",
        price: 650000,
        category: "Electronics",
        state: "Abuja",
        lga: "Gwagwalada",
        images: ["data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f3f4f6'/%3e%3crect x='150' y='100' width='100' height='100' fill='%23d1d5db'/%3e%3ctext x='200' y='155' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='20'%3e💻%3c/text%3e%3c/svg%3e"],
        status: "active",
        seller: "Fatima A.",
        createdAt: "2024-01-14",
        condition: "Very Good",
        verified: true,
    },
    {
        id: "3",
        title: "Professional Camera - Canon EOS",
        description: "Canon EOS 80D with 18-55mm lens. Perfect for photography enthusiasts and CDS activities.",
        price: 280000,
        category: "Electronics",
        state: "Rivers",
        lga: "Port Harcourt",
        images: ["data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f3f4f6'/%3e%3crect x='150' y='100' width='100' height='100' fill='%23d1d5db'/%3e%3ctext x='200' y='155' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='20'%3e📷%3c/text%3e%3c/svg%3e"],
        status: "active",
        seller: "Michael C.",
        createdAt: "2024-01-13",
        condition: "Good",
        verified: false,
    },
    {
        id: "4",
        title: "Formal Shoes - Size 42",
        description: "Black leather formal shoes, perfect for CDS and official functions. Barely worn.",
        price: 15000,
        category: "Fashion",
        state: "Ogun",
        lga: "Abeokuta South",
        images: ["data:image/svg+xml,%3csvg width='400' height='300' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='400' height='300' fill='%23f3f4f6'/%3e%3crect x='150' y='100' width='100' height='100' fill='%23d1d5db'/%3e%3ctext x='200' y='155' text-anchor='middle' fill='%236b7280' font-family='Arial' font-size='20'%3e👞%3c/text%3e%3c/svg%3e"],
        status: "active",
        seller: "Grace N.",
        createdAt: "2024-01-12",
        condition: "Excellent",
        verified: true,
    },
]

const categories = ["All", "Electronics", "Fashion", "Books", "Furniture", "Sports", "Others"]

const popularCategories = [
    { name: "Electronics", count: 156, trending: true },
    { name: "Fashion", count: 89, trending: false },
    { name: "Books & Education", count: 67, trending: true },
    { name: "Furniture", count: 45, trending: false },
]

const trendingSearches = ["iPhone 13", "MacBook", "Nike shoes", "Textbooks", "Gaming chair", "Formal wear"]

export default function ListingsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [selectedState, setSelectedState] = useState("All")
    const [priceRange, setPriceRange] = useState([0, 1000000])
    const [selectedConditions, setSelectedConditions] = useState<string[]>([])
    const [sortBy, setSortBy] = useState("newest")
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)

    useEffect(() => {
        if (searchQuery.length > 1) {
            const suggestions = mockListings
                .filter(
                    (listing) =>
                        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        listing.category.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                .map((listing) => listing.title)
                .slice(0, 5)

            setSearchSuggestions([...new Set(suggestions)])
            setShowSuggestions(true)
        } else {
            setShowSuggestions(false)
        }
    }, [searchQuery])

    const handleSearch = (query: string) => {
        if (query.trim() && !recentSearches.includes(query)) {
            setRecentSearches((prev) => [query, ...prev.slice(0, 4)])
        }
        setSearchQuery(query)
        setShowSuggestions(false)
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 0,
        }).format(price)
    }

    const filteredListings = useMemo(() => {
        return mockListings
            .filter((listing) => {
                const matchesSearch =
                    listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    listing.category.toLowerCase().includes(searchQuery.toLowerCase())

                const matchesCategory = selectedCategory === "All" || listing.category === selectedCategory
                const matchesState = selectedState === "All" || listing.state === selectedState
                const matchesPrice = listing.price >= priceRange[0] && listing.price <= priceRange[1]
                const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(listing.condition)

                return matchesSearch && matchesCategory && matchesState && matchesPrice && matchesCondition
            })
            .sort((a, b) => {
                switch (sortBy) {
                    case "price-low":
                        return a.price - b.price
                    case "price-high":
                        return b.price - a.price
                    case "oldest":
                        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
                    case "newest":
                    default:
                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                }
            })
    }, [searchQuery, selectedCategory, selectedState, priceRange, selectedConditions, sortBy])

    const clearAllFilters = () => {
        setSearchQuery("")
        setSelectedCategory("All")
        setSelectedState("All")
        setPriceRange([0, 1000000])
        setSelectedConditions([])
        setSortBy("newest")
    }

    const activeFiltersCount = [
        selectedCategory !== "All",
        selectedState !== "All",
        priceRange[0] > 0 || priceRange[1] < 1000000,
        selectedConditions.length > 0,
    ].filter(Boolean).length

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
                <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-serif font-bold text-foreground">
                                Corps<span className="text-primary">Mart</span>
                            </h1>
                            <p className="text-sm text-muted-foreground">Marketplace for Corps Members</p>
                        </div>
                        <Link href="/listings/create">
                            <Button className="flex items-center gap-2">
                                <Plus className="w-4 h-4" />
                                Sell Item
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Search and Filters */}
            <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="space-y-6">
                    {/* Search Bar with Suggestions */}
                    <div className="relative">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                            <Input
                                placeholder="Search for items, categories, or brands..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch(searchQuery)
                                    }
                                }}
                                className="pl-10 pr-10"
                            />
                            {searchQuery && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                    onClick={() => setSearchQuery("")}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            )}
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && (searchSuggestions.length > 0 || recentSearches.length > 0) && (
                            <Card className="absolute top-full left-0 right-0 z-50 mt-1 border-0 bg-card/95 backdrop-blur-sm shadow-lg">
                                <CardContent className="p-3">
                                    {searchSuggestions.length > 0 && (
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                <Search className="w-3 h-3" />
                                                Suggestions
                                            </div>
                                            {searchSuggestions.map((suggestion, index) => (
                                                <button
                                                    key={index}
                                                    className="w-full text-left px-2 py-1 rounded hover:bg-muted/50 text-sm"
                                                    onClick={() => handleSearch(suggestion)}
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {recentSearches.length > 0 && (
                                        <>
                                            {searchSuggestions.length > 0 && <Separator className="my-2" />}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                                    <History className="w-3 h-3" />
                                                    Recent Searches
                                                </div>
                                                {recentSearches.map((search, index) => (
                                                    <button
                                                        key={index}
                                                        className="w-full text-left px-2 py-1 rounded hover:bg-muted/50 text-sm"
                                                        onClick={() => handleSearch(search)}
                                                    >
                                                        {search}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Quick Filters and Advanced Filters Toggle */}
                    <div className="flex flex-wrap items-center gap-3">
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                            <SelectTrigger className="w-[140px]">
                                <Filter className="w-4 h-4 mr-2" />
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                        {category}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select value={selectedState} onValueChange={setSelectedState}>
                            <SelectTrigger className="w-[140px]">
                                <MapPin className="w-4 h-4 mr-2" />
                                <SelectValue placeholder="All States" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All States</SelectItem>
                                <SelectItem value="Lagos">Lagos</SelectItem>
                                <SelectItem value="Abuja">Abuja</SelectItem>
                                <SelectItem value="Rivers">Rivers</SelectItem>
                                <SelectItem value="Ogun">Ogun</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="w-[140px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="newest">Newest First</SelectItem>
                                <SelectItem value="oldest">Oldest First</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                            </SelectContent>
                        </Select>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="relative bg-transparent">
                                    <SlidersHorizontal className="w-4 h-4 mr-2" />
                                    More Filters
                                    {activeFiltersCount > 0 && (
                                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 text-xs">
                                            {activeFiltersCount}
                                        </Badge>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="start">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-serif font-semibold">Advanced Filters</h4>
                                        <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                            Clear All
                                        </Button>
                                    </div>

                                    <Separator />

                                    {/* Price Range */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium">Price Range</label>
                                        <div className="px-2">
                                            <Slider
                                                value={priceRange}
                                                onValueChange={setPriceRange}
                                                max={1000000}
                                                step={10000}
                                                className="w-full"
                                            />
                                        </div>
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{formatPrice(priceRange[0])}</span>
                                            <span>{formatPrice(priceRange[1])}</span>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Condition Filter */}
                                    <div className="space-y-3">
                                        <label className="text-sm font-medium">Condition</label>
                                        <div className="space-y-2">
                                            {["Brand New", "Excellent", "Very Good", "Good", "Fair"].map((condition) => (
                                                <div key={condition} className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id={condition}
                                                        checked={selectedConditions.includes(condition)}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setSelectedConditions([...selectedConditions, condition])
                                                            } else {
                                                                setSelectedConditions(selectedConditions.filter((c) => c !== condition))
                                                            }
                                                        }}
                                                    />
                                                    <label htmlFor={condition} className="text-sm">
                                                        {condition}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {activeFiltersCount > 0 && (
                            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                                <X className="w-4 h-4 mr-1" />
                                Clear ({activeFiltersCount})
                            </Button>
                        )}
                    </div>

                    {/* Popular Categories */}
                    {!searchQuery && (
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-primary" />
                                <h3 className="font-serif font-semibold">Popular Categories</h3>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {popularCategories.map((category) => (
                                    <Card
                                        key={category.name}
                                        className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-card/50"
                                        onClick={() => setSelectedCategory(category.name)}
                                    >
                                        <CardContent className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2 mb-1">
                                                <h4 className="font-medium">{category.name}</h4>
                                                {category.trending && (
                                                    <Badge variant="secondary" className="text-xs px-1 py-0">
                                                        🔥
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground">{category.count} items</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Trending Searches */}
                    {!searchQuery && (
                        <div className="space-y-3">
                            <h3 className="font-serif font-semibold">Trending Searches</h3>
                            <div className="flex flex-wrap gap-2">
                                {trendingSearches.map((search) => (
                                    <Badge
                                        key={search}
                                        variant="outline"
                                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                        onClick={() => handleSearch(search)}
                                    >
                                        {search}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Results Summary */}
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                            {filteredListings.length} {filteredListings.length === 1 ? "item" : "items"} found
                            {searchQuery && ` for "${searchQuery}"`}
                        </p>
                        <Link href="/listings/create">
                            <Button size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Sell Item
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Listings Grid */}
            <div className="px-4 pb-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredListings.map((listing) => (
                        <Link key={listing.id} href={`/listings/${listing.id}`}>
                            <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 bg-card/80 backdrop-blur-sm overflow-hidden">
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <SafeImage
                                        src={listing.images[0]}
                                        alt={listing.title}
                                        category={listing.category}
                                        size="large"
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-background/80 backdrop-blur-sm">
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                    <div className="absolute top-3 left-3">
                                        <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
                                            {listing.condition}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg font-serif line-clamp-2 group-hover:text-primary transition-colors">
                                            {listing.title}
                                        </CardTitle>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin className="w-3 h-3" />
                                        <span>
                                            {listing.lga}, {listing.state}
                                        </span>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <CardDescription className="line-clamp-2 mb-3">{listing.description}</CardDescription>

                                    <div className="flex items-center justify-between">
                                        <div className="text-xl font-bold text-primary">{formatPrice(listing.price)}</div>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            <span>{new Date(listing.createdAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-semibold text-primary">{listing.seller.charAt(0)}</span>
                                            </div>
                                            <span className="text-sm text-muted-foreground">{listing.seller}</span>
                                            {listing.verified && (
                                                <Badge variant="outline" className="text-xs px-1 py-0">
                                                    ✓
                                                </Badge>
                                            )}
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {listing.category}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>

                {filteredListings.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-serif font-semibold mb-2">No items found</h3>
                        <p className="text-muted-foreground mb-4">
                            Try adjusting your search or filters to find what you're looking for.
                        </p>
                        <Link href="/listings/create">
                            <Button>List Your First Item</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
