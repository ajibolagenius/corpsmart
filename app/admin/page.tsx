"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, ShoppingBag, AlertTriangle, TrendingUp, DollarSign, CheckCircle, Clock, Shield } from "lucide-react"
import Link from "next/link"

// Mock admin data
const adminStats = {
  totalUsers: 1247,
  activeListings: 456,
  totalTransactions: 892,
  pendingReports: 12,
  monthlyRevenue: 2450000,
  newUsersToday: 23,
  newListingsToday: 67,
  resolvedReportsToday: 8,
}

const recentActivity = [
  {
    id: "1",
    type: "user_signup",
    description: "New user registered: Adebayo O.",
    timestamp: "2024-01-15T14:30:00Z",
    status: "info",
  },
  {
    id: "2",
    type: "listing_reported",
    description: "Listing reported: iPhone 13 Pro Max",
    timestamp: "2024-01-15T14:25:00Z",
    status: "warning",
  },
  {
    id: "3",
    type: "transaction_completed",
    description: "Transaction completed: ₦450,000",
    timestamp: "2024-01-15T14:20:00Z",
    status: "success",
  },
  {
    id: "4",
    type: "user_verified",
    description: "User verified: Fatima A.",
    timestamp: "2024-01-15T14:15:00Z",
    status: "success",
  },
]

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState("7d")

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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user_signup":
        return <Users className="w-4 h-4" />
      case "listing_reported":
        return <AlertTriangle className="w-4 h-4" />
      case "transaction_completed":
        return <DollarSign className="w-4 h-4" />
      case "user_verified":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-amber-600"
      case "error":
        return "text-red-600"
      default:
        return "text-blue-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-serif font-bold text-foreground">
                Corps<span className="text-primary">Mart</span> Admin
              </h1>
              <p className="text-sm text-muted-foreground">Platform Management Dashboard</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                Admin
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-600">+{adminStats.newUsersToday} today</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Listings</p>
                  <p className="text-3xl font-bold">{adminStats.activeListings}</p>
                  <p className="text-xs text-green-600">+{adminStats.newListingsToday} today</p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-3xl font-bold">{adminStats.totalTransactions}</p>
                  <p className="text-xs text-muted-foreground">All time</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Reports</p>
                  <p className="text-3xl font-bold text-amber-600">{adminStats.pendingReports}</p>
                  <p className="text-xs text-green-600">-{adminStats.resolvedReportsToday} resolved today</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="moderation">Moderation</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Recent Activity</CardTitle>
                  <CardDescription>Latest platform activities and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                      <div className={`${getActivityColor(activity.status)}`}>{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{formatTime(activity.timestamp)}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/admin/reports">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Review Reports ({adminStats.pendingReports})
                    </Button>
                  </Link>
                  <Link href="/admin/users">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Manage Users
                    </Button>
                  </Link>
                  <Link href="/admin/listings">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Review Listings
                    </Button>
                  </Link>
                  <Link href="/admin/analytics">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Overview */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue and transaction fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">{formatPrice(adminStats.monthlyRevenue)}</p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">+12.5%</p>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">1.8%</p>
                    <p className="text-sm text-muted-foreground">Avg. Fee Rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Moderation Tab */}
          <TabsContent value="moderation" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Content Moderation</CardTitle>
                <CardDescription>Review and manage reported content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">Moderation Queue</h3>
                  <p className="text-muted-foreground mb-4">Detailed moderation interface would be implemented here</p>
                  <Link href="/admin/reports">
                    <Button>View Reports Queue</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">User Management</CardTitle>
                <CardDescription>Manage user accounts and verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">User Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Comprehensive user management interface would be implemented here
                  </p>
                  <Link href="/admin/users">
                    <Button>Manage Users</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Platform Analytics</CardTitle>
                <CardDescription>Detailed insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced analytics and reporting interface would be implemented here
                  </p>
                  <Link href="/admin/analytics">
                    <Button>View Analytics</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
