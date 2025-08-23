"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Search, Filter, Users, Shield, Ban, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock users data
const mockUsers = [
  {
    id: "user001",
    name: "Adebayo Olumide",
    email: "adebayo.o@email.com",
    avatar: "AO",
    verified: true,
    status: "active",
    role: "user",
    state: "Lagos",
    batch: "2023 Batch B",
    joinedDate: "2023-08-15T10:30:00Z",
    lastActive: "2024-01-15T14:30:00Z",
    totalListings: 12,
    totalTransactions: 8,
    rating: 4.8,
    callUpNumber: "NYSC/2023/123456",
  },
  {
    id: "user002",
    name: "Fatima Abubakar",
    email: "fatima.a@email.com",
    avatar: "FA",
    verified: true,
    status: "active",
    role: "user",
    state: "Abuja",
    batch: "2023 Batch A",
    joinedDate: "2023-07-20T15:45:00Z",
    lastActive: "2024-01-15T12:15:00Z",
    totalListings: 6,
    totalTransactions: 15,
    rating: 4.9,
    callUpNumber: "NYSC/2023/789012",
  },
  {
    id: "user003",
    name: "Michael Chukwu",
    email: "michael.c@email.com",
    avatar: "MC",
    verified: false,
    status: "suspended",
    role: "user",
    state: "Rivers",
    batch: "2024 Batch A",
    joinedDate: "2024-01-10T09:20:00Z",
    lastActive: "2024-01-13T16:45:00Z",
    totalListings: 3,
    totalTransactions: 1,
    rating: 2.1,
    callUpNumber: null,
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verificationFilter, setVerificationFilter] = useState("all")
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesVerification =
      verificationFilter === "all" ||
      (verificationFilter === "verified" && user.verified) ||
      (verificationFilter === "unverified" && !user.verified)
    return matchesSearch && matchesStatus && matchesVerification
  })

  const handleUserAction = (userId: string, action: string) => {
    console.log(`${action} user ${userId}`)
    // In real app, this would update the user status via API
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="p-2">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-serif font-bold">User Management</h1>
                <p className="text-sm text-muted-foreground">{filteredUsers.length} users</p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {mockUsers.filter((u) => u.verified).length} Verified
            </Badge>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-6xl space-y-6">
        {/* Filters */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardContent className="p-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>

              <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="verified">Verified</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users List */}
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className={`border-0 bg-card/80 backdrop-blur-sm cursor-pointer transition-all ${
                  selectedUser === user.id ? "ring-2 ring-primary" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold truncate">{user.name}</h3>
                        <div className="flex items-center gap-1">
                          {user.verified && (
                            <Badge variant="outline" className="text-xs px-1 py-0">
                              <Shield className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge variant="outline" className={getStatusColor(user.status)}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-2">{user.email}</p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {user.state} • {user.batch}
                        </span>
                        <span>
                          ⭐ {user.rating} • {user.totalTransactions} transactions
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredUsers.length === 0 && (
              <Card className="border-0 bg-card/50">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">No users found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters to see more results.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* User Details */}
          <div className="lg:sticky lg:top-24">
            {selectedUser ? (
              (() => {
                const user = mockUsers.find((u) => u.id === selectedUser)
                if (!user) return null

                return (
                  <Card className="border-0 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="font-serif">User Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarFallback className="bg-primary/20 text-primary font-semibold text-lg">
                            {user.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{user.name}</h3>
                          <p className="text-muted-foreground">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {user.verified && (
                              <Badge variant="outline" className="text-xs px-1 py-0">
                                <Shield className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge variant="outline" className={getStatusColor(user.status)}>
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">State:</span>
                          <p className="font-medium">{user.state}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">NYSC Batch:</span>
                          <p className="font-medium">{user.batch}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Call-up Number:</span>
                          <p className="font-medium font-mono">{user.callUpNumber || "Not provided"}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Rating:</span>
                          <p className="font-medium">⭐ {user.rating}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Total Listings:</span>
                          <p className="font-medium">{user.totalListings}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Transactions:</span>
                          <p className="font-medium">{user.totalTransactions}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Joined:</span>
                          <p className="font-medium">{formatDate(user.joinedDate)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last Active:</span>
                          <p className="font-medium">{formatDate(user.lastActive)}</p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="space-y-3 pt-4">
                        <div className="grid grid-cols-2 gap-2">
                          {!user.verified && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction(user.id, "verify")}
                              className="bg-transparent text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Verify User
                            </Button>
                          )}
                          {user.status === "active" ? (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction(user.id, "suspend")}
                              className="bg-transparent text-red-600 hover:bg-red-50"
                            >
                              <Ban className="w-4 h-4 mr-2" />
                              Suspend
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleUserAction(user.id, "activate")}
                              className="bg-transparent text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Activate
                            </Button>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleUserAction(user.id, "view-activity")}
                        >
                          View Activity Log
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()
            ) : (
              <Card className="border-0 bg-card/50">
                <CardContent className="p-8 text-center">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">Select a User</h3>
                  <p className="text-muted-foreground">
                    Choose a user from the list to view details and manage their account.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
