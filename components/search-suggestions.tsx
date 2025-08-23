"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, TrendingUp, Clock } from "lucide-react"

interface SearchSuggestionsProps {
  query: string
  onSelect: (suggestion: string) => void
  recentSearches: string[]
  isVisible: boolean
}

export function SearchSuggestions({ query, onSelect, recentSearches, isVisible }: SearchSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])

  // Mock suggestions based on query
  const mockSuggestions = [
    "iPhone 13 Pro Max",
    "MacBook Air M1",
    "Nike Air Force 1",
    "Samsung Galaxy S23",
    "Canon EOS Camera",
    "Gaming Chair",
    "Formal Shoes",
    "Textbooks Engineering",
    "Laptop Stand",
    "Wireless Headphones",
  ]

  useEffect(() => {
    if (query.length > 1) {
      const filtered = mockSuggestions
        .filter((suggestion) => suggestion.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 5)
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }, [query])

  if (!isVisible) return null

  return (
    <Card className="absolute top-full left-0 right-0 z-50 mt-1 border-0 bg-card/95 backdrop-blur-sm shadow-lg">
      <CardContent className="p-3 space-y-3">
        {suggestions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Search className="w-3 h-3" />
              Suggestions
            </div>
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                className="w-full text-left px-2 py-1 rounded hover:bg-muted/50 text-sm transition-colors"
                onClick={() => onSelect(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {recentSearches.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Clock className="w-3 h-3" />
              Recent Searches
            </div>
            {recentSearches.slice(0, 3).map((search, index) => (
              <button
                key={index}
                className="w-full text-left px-2 py-1 rounded hover:bg-muted/50 text-sm transition-colors"
                onClick={() => onSelect(search)}
              >
                {search}
              </button>
            ))}
          </div>
        )}

        {query.length === 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              Trending
            </div>
            <div className="flex flex-wrap gap-1">
              {["iPhone", "MacBook", "Shoes", "Books"].map((trend) => (
                <Badge
                  key={trend}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-xs"
                  onClick={() => onSelect(trend)}
                >
                  {trend}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
