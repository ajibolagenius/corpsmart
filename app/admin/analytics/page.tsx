"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Download } from "lucide-react"
import Link from "next/link"

// Mock analytics data
const userGrowthData = [
  { month: "Jan", users: 120, verified: 85 },
  { month: "Feb", users: 180, verified: 140 },
  { month: "Mar", users: 250, verified: 200 },
  { month: "Apr", users: 320, verified: 280 },
  { month: "May", users: 420, verified: 380 },
  { month: "Jun", users: 580, verified: 520 },
  { month: "Jul", users: 720, verified: 650 },
  { month: "Aug", users: 890, verified: 800 },
  { month: "Sep", users: 1050, verified: 950 },
  { month: "Oct", users: 1200, verified: 1100 },
  { month: "Nov", users: 1350, verified: 1250 },
  { month: "Dec", users: 1500, verified: 1400 },
]

const revenueData = [
  { month: "Jan", revenue: 450000, transactions: 45 },
  { month: "Feb", revenue: 680000, transactions: 68 },
  { month: "Mar", revenue: 920000, transactions: 92 },
  { month: "Apr", revenue: 1200000, transactions: 120 },
  { month: "May", revenue: 1580000, transactions: 158 },
  { month: "Jun", revenue: 1950000, transactions: 195 },
  { month: "Jul", revenue: 2300000, transactions: 230 },
  { month: "Aug", revenue: 2650000, transactions: 265 },
  { month: "Sep", revenue: 2980000, transactions: 298 },
  { month: "Oct", revenue: 3200000, transactions: 320 },
  { month: "Nov", revenue: 3450000, transactions: 345 },
  { month: "Dec", revenue: 3800000, transactions: 380 },
]

const categoryData = [
  { name: "Electronics", value: 35, color: "#0891b2" },
  { name: "Fashion", value: 25, color: "#7c3aed" },
  { name: "Books", value: 15, color: "#059669" },
  { name: "Home & Garden", value: 12, color: "#dc2626" },
  { name: "Sports", value: 8, color: "#ea580c" },
  { name: "Others", value: 5, color: "#6b7280" },
]

const stateData = [
  { state: "Lagos", users: 320, listings: 450 },
  { state: "Abuja", users: 280, listings: 380 },
  { state: "Rivers", users: 180, listings: 220 },
  { state: "Kano", users: 150, listings: 180 },
  { state: "Ogun", users: 120, listings: 160 },
  { state: "Kaduna", users: 100, listings: 140 },
  { state: "Others", users: 350, listings: 420 },
]

const engagementData = [
  { day: "Mon", views: 1200, chats: 340, listings: 45 },
  { day: "Tue", views: 1350, chats: 380, listings: 52 },
  { day: "Wed", views: 1100, chats: 290, listings: 38 },
  { day: "Thu", views: 1450, chats: 420, listings: 58 },
  { day: "Fri", views: 1600, chats: 480, listings: 65 },
  { day: "Sat", views: 1800, chats: 520, listings: 72 },
  { day: "Sun", views: 1400, chats: 380, listings: 48 },
]

export default function AdminAnalytics() {
  const [timeRange, setTimeRange] = useState("12m")
  const [selectedMetric, setSelectedMetric] = useState("users")

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M"
    if (num >= 1000) return (num / 1000).toFixed(1) + "K"
    return num.toString()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-foreground">
                  Admin
                </Link>
                <span className="text-muted-foreground">/</span>
                <span className="text-sm font-medium">Analytics</span>
              </div>
              <h1 className="text-2xl font-serif font-bold text-foreground">Platform Analytics</h1>
              <p className="text-sm text-muted-foreground">Comprehensive insights and performance metrics</p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="3m">Last 3 months</SelectItem>
                  <SelectItem value="6m">Last 6 months</SelectItem>
                  <SelectItem value="12m">Last 12 months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-8">
        {/* Key Performance Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{formatPrice(3800000)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">+12.5% vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold">1,247</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">+8.2% vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Listings</p>
                  <p className="text-2xl font-bold">2,156</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600">+15.3% vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-card/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">4.8%</p>
                  <div className="flex items-center gap-1 mt-1">
                    <TrendingDown className="w-3 h-3 text-red-600" />
                    <span className="text-xs text-red-600">-0.3% vs last month</span>
                  </div>
                </div>
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Growth Chart */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">User Growth</CardTitle>
                  <CardDescription>Total and verified users over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="users"
                        stackId="1"
                        stroke="#0891b2"
                        fill="#0891b2"
                        fillOpacity={0.6}
                        name="Total Users"
                      />
                      <Area
                        type="monotone"
                        dataKey="verified"
                        stackId="2"
                        stroke="#059669"
                        fill="#059669"
                        fillOpacity={0.8}
                        name="Verified Users"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Distribution */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-serif">Category Distribution</CardTitle>
                  <CardDescription>Listings by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Revenue Trend */}
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue and transaction volume</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(value) => formatPrice(value)} />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "revenue" ? formatPrice(Number(value)) : value,
                        name === "revenue" ? "Revenue" : "Transactions",
                      ]}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0891b2"
                      strokeWidth={3}
                      name="Revenue"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="transactions"
                      stroke="#7c3aed"
                      strokeWidth={2}
                      name="Transactions"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">User Analytics</CardTitle>
                <CardDescription>Detailed user behavior and demographics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="users"
                      stroke="#0891b2"
                      fill="#0891b2"
                      fillOpacity={0.3}
                      name="Total Users"
                    />
                    <Area
                      type="monotone"
                      dataKey="verified"
                      stroke="#059669"
                      fill="#059669"
                      fillOpacity={0.5}
                      name="Verified Users"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Revenue Analytics</CardTitle>
                <CardDescription>Financial performance and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatPrice(value)} />
                    <Tooltip formatter={(value) => [formatPrice(Number(value)), "Revenue"]} />
                    <Bar dataKey="revenue" fill="#0891b2" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">User Engagement</CardTitle>
                <CardDescription>Daily activity and interaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={engagementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="views" stroke="#0891b2" strokeWidth={2} name="Page Views" />
                    <Line type="monotone" dataKey="chats" stroke="#7c3aed" strokeWidth={2} name="Chat Messages" />
                    <Line type="monotone" dataKey="listings" stroke="#059669" strokeWidth={2} name="New Listings" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Geography Tab */}
          <TabsContent value="geography" className="space-y-6">
            <Card className="border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-serif">Geographic Distribution</CardTitle>
                <CardDescription>Users and listings by state</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={stateData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="state" type="category" width={80} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="users" fill="#0891b2" name="Users" />
                    <Bar dataKey="listings" fill="#7c3aed" name="Listings" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
