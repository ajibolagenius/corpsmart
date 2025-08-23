"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Download, Filter, CreditCard, Clock, CheckCircle, XCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock transaction data
const mockTransactions = [
  {
    id: "TXN1705123456789",
    type: "purchase",
    listing: {
      title: "iPhone 13 Pro Max - Excellent Condition",
      image: "/placeholder.svg?height=60&width=60",
      seller: "Adebayo O.",
    },
    amount: 450000,
    fees: 6850,
    method: "Paystack",
    status: "completed",
    date: "2024-01-15T14:30:00Z",
  },
  {
    id: "TXN1705023456789",
    type: "sale",
    listing: {
      title: "MacBook Air M1 - Perfect for Work",
      image: "/placeholder.svg?height=60&width=60",
      buyer: "Fatima A.",
    },
    amount: 650000,
    fees: 0,
    method: "Cash",
    status: "completed",
    date: "2024-01-14T10:15:00Z",
  },
  {
    id: "TXN1704923456789",
    type: "purchase",
    listing: {
      title: "Professional Camera - Canon EOS",
      image: "/placeholder.svg?height=60&width=60",
      seller: "Michael C.",
    },
    amount: 280000,
    fees: 4200,
    method: "Bank Transfer",
    status: "pending",
    date: "2024-01-13T16:45:00Z",
  },
]

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-amber-600" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      case "failed":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch = transaction.listing.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    const matchesType = typeFilter === "all" || transaction.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const totalSpent = mockTransactions
    .filter((t) => t.type === "purchase" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount + t.fees, 0)

  const totalEarned = mockTransactions
    .filter((t) => t.type === "sale" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0)

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
                <h1 className="text-xl font-serif font-bold">Transaction History</h1>
                <p className="text-sm text-muted-foreground">{filteredTransactions.length} transactions</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-4xl space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-red-600">{formatPrice(totalSpent)}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Earned</p>
                  <p className="text-2xl font-bold text-green-600">{formatPrice(totalEarned)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="purchase">Purchases</SelectItem>
                  <SelectItem value="sale">Sales</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-3">
          {filteredTransactions.length === 0 ? (
            <Card className="border-0 bg-card/50">
              <CardContent className="p-8 text-center">
                <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-serif font-semibold mb-2">No transactions found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" || typeFilter !== "all"
                    ? "Try adjusting your filters to see more results."
                    : "Your transaction history will appear here once you start buying or selling."}
                </p>
                <Link href="/listings">
                  <Button>Browse Items</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredTransactions.map((transaction) => (
              <Card
                key={transaction.id}
                className="border-0 bg-card/80 backdrop-blur-sm hover:shadow-md transition-all"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    {/* Item Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={transaction.listing.image || "/placeholder.svg"}
                        alt={transaction.listing.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Transaction Header */}
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={transaction.type === "purchase" ? "text-red-600" : "text-green-600"}
                          >
                            {transaction.type === "purchase" ? "Purchase" : "Sale"}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(transaction.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(transaction.status)}
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </div>
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{formatDate(transaction.date)}</span>
                      </div>

                      {/* Item Info */}
                      <h3 className="font-semibold mb-1 truncate">{transaction.listing.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {transaction.type === "purchase"
                          ? `Sold by ${transaction.listing.seller}`
                          : `Bought by ${transaction.listing.buyer}`}
                      </p>

                      {/* Payment Details */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">via {transaction.method}</span>
                          <span className="font-mono text-xs text-muted-foreground">{transaction.id}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg">
                            {transaction.type === "purchase" ? "-" : "+"}
                            {formatPrice(transaction.amount)}
                          </div>
                          {transaction.fees > 0 && (
                            <div className="text-xs text-muted-foreground">Fees: {formatPrice(transaction.fees)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
