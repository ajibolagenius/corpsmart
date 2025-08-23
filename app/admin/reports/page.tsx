"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Search, Filter, AlertTriangle, Eye, CheckCircle, XCircle, MessageCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock reports data
const mockReports = [
  {
    id: "RPT001",
    type: "listing",
    reason: "Inappropriate Content",
    description: "This listing contains inappropriate images and misleading information about the product condition.",
    status: "pending",
    priority: "high",
    reportedBy: {
      name: "Anonymous User",
      id: "user123",
    },
    reportedItem: {
      id: "listing456",
      title: "iPhone 13 Pro Max - Excellent Condition",
      image: "/placeholder.svg?height=60&width=60",
      seller: "Suspicious Seller",
    },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "RPT002",
    type: "user",
    reason: "Fraudulent Activity",
    description: "This user has been creating fake listings and not delivering items after payment.",
    status: "investigating",
    priority: "critical",
    reportedBy: {
      name: "Adebayo O.",
      id: "user789",
    },
    reportedItem: {
      id: "user456",
      title: "Fraudulent User Account",
      image: "/placeholder.svg?height=60&width=60",
      seller: "Fake Seller",
    },
    createdAt: "2024-01-14T15:20:00Z",
    updatedAt: "2024-01-15T09:15:00Z",
  },
  {
    id: "RPT003",
    type: "listing",
    reason: "Spam",
    description: "Multiple duplicate listings posted by the same user.",
    status: "resolved",
    priority: "medium",
    reportedBy: {
      name: "Fatima A.",
      id: "user321",
    },
    reportedItem: {
      id: "listing789",
      title: "Duplicate Listing - MacBook Air",
      image: "/placeholder.svg?height=60&width=60",
      seller: "Repeat Offender",
    },
    createdAt: "2024-01-13T12:45:00Z",
    updatedAt: "2024-01-14T16:30:00Z",
  },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400"
      case "investigating":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "resolved":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "dismissed":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredReports = mockReports.filter((report) => {
    const matchesSearch =
      report.reportedItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || report.status === statusFilter
    const matchesPriority = priorityFilter === "all" || report.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleReportAction = (reportId: string, action: string) => {
    console.log(`${action} report ${reportId}`)
    // In real app, this would update the report status via API
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
                <h1 className="text-xl font-serif font-bold">Reports Management</h1>
                <p className="text-sm text-muted-foreground">{filteredReports.length} reports</p>
              </div>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {mockReports.filter((r) => r.status === "pending").length} Pending
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
                placeholder="Search reports..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="investigating">Investigating</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="dismissed">Dismissed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.map((report) => (
              <Card
                key={report.id}
                className={`border-0 bg-card/80 backdrop-blur-sm cursor-pointer transition-all ${
                  selectedReport === report.id ? "ring-2 ring-primary" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={report.reportedItem.image || "/placeholder.svg"}
                        alt={report.reportedItem.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(report.status)}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(report.priority)}>
                            {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                          </Badge>
                        </div>
                        <span className="text-xs text-muted-foreground">{report.id}</span>
                      </div>

                      <h3 className="font-semibold mb-1 truncate">{report.reportedItem.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">Reason: {report.reason}</p>
                      <p className="text-xs text-muted-foreground">Reported {formatDate(report.createdAt)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredReports.length === 0 && (
              <Card className="border-0 bg-card/50">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">No reports found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery || statusFilter !== "all" || priorityFilter !== "all"
                      ? "Try adjusting your filters to see more results."
                      : "No reports have been submitted yet."}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Report Details */}
          <div className="lg:sticky lg:top-24">
            {selectedReport ? (
              (() => {
                const report = mockReports.find((r) => r.id === selectedReport)
                if (!report) return null

                return (
                  <Card className="border-0 bg-card/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="font-serif">Report Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getStatusColor(report.status)}>
                          {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                        </Badge>
                        <Badge variant="outline" className={getPriorityColor(report.priority)}>
                          {report.priority.charAt(0).toUpperCase() + report.priority.slice(1)}
                        </Badge>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Reported Item</h4>
                        <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                            <Image
                              src={report.reportedItem.image || "/placeholder.svg"}
                              alt={report.reportedItem.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{report.reportedItem.title}</p>
                            <p className="text-sm text-muted-foreground">by {report.reportedItem.seller}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Report Reason</h4>
                        <p className="text-sm font-medium">{report.reason}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Description</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>

                      <Separator />

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Report ID:</span>
                          <span className="font-mono">{report.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Reported by:</span>
                          <span>{report.reportedBy.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Created:</span>
                          <span>{formatDate(report.createdAt)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Updated:</span>
                          <span>{formatDate(report.updatedAt)}</span>
                        </div>
                      </div>

                      <Separator />

                      {/* Actions */}
                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportAction(report.id, "investigate")}
                            className="bg-transparent"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Investigate
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportAction(report.id, "contact")}
                            className="bg-transparent"
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Contact User
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportAction(report.id, "resolve")}
                            className="bg-transparent text-green-600 hover:bg-green-50"
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Resolve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleReportAction(report.id, "dismiss")}
                            className="bg-transparent text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Dismiss
                          </Button>
                        </div>

                        <Textarea placeholder="Add admin notes..." className="min-h-[80px]" />
                        <Button className="w-full">Save Notes</Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })()
            ) : (
              <Card className="border-0 bg-card/50">
                <CardContent className="p-8 text-center">
                  <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-serif font-semibold mb-2">Select a Report</h3>
                  <p className="text-muted-foreground">
                    Choose a report from the list to view details and take action.
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
