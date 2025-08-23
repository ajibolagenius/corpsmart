"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, TrendingUp, Clock, Bookmark } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [recentSearches, setRecentSearches] = useState<string[]>([
    "iPhone 13",
    "MacBook Air",
    "Nike shoes",
    "Textbooks",
  ])

  const [savedSearches, setSavedSearches] = useState<string[]>(["Electronics under ₦100k", "Fashion in Lagos"])

  const trendingSearches = [
    "iPhone 13 Pro Max",
    "MacBook Air M1",
    "Gaming Chair",
    "Formal Wear",
    "Canon Camera",
    "Nike Air Force",
    "Engineering Books",
    "Laptop Stand",
  ]

  const popularCategories = [
    { name: "Electronics", icon: "📱", count: 156 },
    { name: "Fashion", icon: "👕", count: 89 },
    { name: "Books", icon: "📚", count: 67 },
    { name: "Furniture", icon: "🪑", count: 45 },
    { name: "Sports", icon: "⚽", count: 34 },
    { name: "Beauty", icon: "💄", count: 28 },
  ]

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches
      setRecentSearches((prev) => {
        const updated = [query, ...prev.filter((s) => s !== query)].slice(0, 5)
        return updated
      })

      // Navigate to listings with search query
      router.push(`/listings?q=${encodeURIComponent(query)}`)
    }
  }

  const saveSearch = (query: string) => {
    if (!savedSearches.includes(query)) {
      setSavedSearches((prev) => [...prev, query])
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-4xl">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="p-2" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search CorpsMart..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(searchQuery)
                  }
                }}
                className="pl-10"
                autoFocus
              />
            </div>
            {searchQuery && <Button onClick={() => handleSearch(searchQuery)}>Search</Button>}
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-4xl space-y-8">
        {/* Trending Searches */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-serif font-bold">Trending Now</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingSearches.map((search) => (
              <Badge
                key={search}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors py-2 px-3"
                onClick={() => handleSearch(search)}
              >
                {search}
              </Badge>
            ))}
          </div>
        </div>

        {/* Popular Categories */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold">Browse Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {popularCategories.map((category) => (
              <Card
                key={category.name}
                className="cursor-pointer hover:shadow-md transition-all duration-200 border-0 bg-card/50"
                onClick={() => router.push(`/listings?category=${encodeURIComponent(category.name)}`)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <h3 className="font-medium mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <h2 className="text-xl font-serif font-bold">Recent Searches</h2>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <button className="flex items-center gap-3 flex-1 text-left" onClick={() => handleSearch(search)}>
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                  <Button variant="ghost" size="sm" onClick={() => saveSearch(search)} className="p-2">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Searches */}
        {savedSearches.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-serif font-bold">Saved Searches</h2>
            </div>
            <div className="space-y-2">
              {savedSearches.map((search, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <Bookmark className="w-4 h-4 text-primary" />
                  <button className="flex-1 text-left" onClick={() => handleSearch(search)}>
                    {search}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <Card className="border-0 bg-primary/5">
          <CardHeader>
            <CardTitle className="font-serif">Can't find what you're looking for?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-muted-foreground">
              Try browsing all listings or create a listing request to let sellers know what you need.
            </p>
            <div className="flex gap-3">
              <Link href="/listings">
                <Button variant="outline">Browse All</Button>
              </Link>
              <Link href="/listings/create">
                <Button>Sell Something</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
