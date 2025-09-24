"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Star, MessageSquare, AlertCircle, Search, Eye, Reply } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedbackItem {
  id: string
  type: "feedback" | "complaint"
  name: string
  email: string
  category: string
  subject: string
  message: string
  rating?: number
  status: "new" | "in-progress" | "resolved"
  priority: "low" | "medium" | "high"
  createdAt: string
  response?: string
}

export default function FeedbackManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null)
  const [response, setResponse] = useState("")

  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([
    {
      id: "1",
      type: "complaint",
      name: "John Doe",
      email: "john@example.com",
      category: "food-quality",
      subject: "Food was cold when delivered",
      message:
        "I ordered chicken biryani and it arrived cold. The rice was hard and the chicken was not properly cooked. Very disappointed with the quality.",
      status: "new",
      priority: "high",
      createdAt: "2025-01-09T10:30:00Z",
    },
    {
      id: "2",
      type: "feedback",
      name: "Jane Smith",
      email: "jane@example.com",
      category: "service",
      subject: "Excellent service!",
      message:
        "The staff was very friendly and the food was delicious. The masala dosa was perfectly crispy and the sambar was flavorful. Will definitely order again!",
      rating: 5,
      status: "resolved",
      priority: "low",
      createdAt: "2025-01-09T09:15:00Z",
      response: "Thank you for your wonderful feedback! We're delighted to hear you enjoyed your meal.",
    },
    {
      id: "3",
      type: "complaint",
      name: "Mike Johnson",
      email: "mike@example.com",
      category: "ordering-system",
      subject: "App keeps crashing",
      message:
        "The mobile app crashes every time I try to add items to cart. This is very frustrating. Please fix this issue.",
      status: "in-progress",
      priority: "medium",
      createdAt: "2025-01-09T08:45:00Z",
    },
    {
      id: "4",
      type: "feedback",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      category: "food-quality",
      subject: "Great variety of options",
      message:
        "Love the variety of vegetarian options available. The paneer butter masala was amazing. Keep up the good work!",
      rating: 4,
      status: "new",
      priority: "low",
      createdAt: "2025-01-09T07:20:00Z",
    },
  ])

  const updateStatus = (id: string, newStatus: "new" | "in-progress" | "resolved") => {
    setFeedbackItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
  }

  const submitResponse = () => {
    if (selectedFeedback && response.trim()) {
      setFeedbackItems((prev) =>
        prev.map((item) => (item.id === selectedFeedback.id ? { ...item, response, status: "resolved" } : item)),
      )
      setResponse("")
      setSelectedFeedback(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "resolved":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filteredItems = (type: "feedback" | "complaint") => {
    return feedbackItems
      .filter((item) => item.type === type)
      .filter((item) => statusFilter === "all" || item.status === statusFilter)
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.message.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" notificationCount={2} />

      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Feedback Management</h1>
          <p className="text-muted-foreground">Monitor and respond to customer feedback and complaints</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search feedback..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="complaints" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="complaints" className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Complaints ({filteredItems("complaint").length})
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Feedback ({filteredItems("feedback").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="complaints">
            <div className="space-y-4">
              {filteredItems("complaint").map((item) => (
                <Card key={item.id} className="animate-fade-in">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{item.subject}</CardTitle>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          <Badge className={getPriorityColor(item.priority)}>{item.priority} priority</Badge>
                        </div>
                        <CardDescription>
                          From: {item.name} ({item.email}) • {formatDate(item.createdAt)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedFeedback(item)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                Complaint Details
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Subject</h4>
                                <p>{item.subject}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Message</h4>
                                <p className="text-sm text-muted-foreground">{item.message}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-1">Category</h4>
                                  <p className="text-sm">{item.category}</p>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-1">Priority</h4>
                                  <Badge className={getPriorityColor(item.priority)}>{item.priority}</Badge>
                                </div>
                              </div>
                              {item.response && (
                                <div>
                                  <h4 className="font-semibold mb-2">Response</h4>
                                  <p className="text-sm bg-muted p-3 rounded-lg">{item.response}</p>
                                </div>
                              )}
                              {!item.response && (
                                <div>
                                  <h4 className="font-semibold mb-2">Add Response</h4>
                                  <Textarea
                                    placeholder="Type your response..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    rows={4}
                                  />
                                  <Button onClick={submitResponse} className="mt-2">
                                    <Reply className="w-4 h-4 mr-2" />
                                    Send Response
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Select value={item.status} onValueChange={(value: any) => updateStatus(item.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="feedback">
            <div className="space-y-4">
              {filteredItems("feedback").map((item) => (
                <Card key={item.id} className="animate-fade-in">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">{item.subject}</CardTitle>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                          {item.rating && (
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={cn(
                                    "w-4 h-4",
                                    i < item.rating! ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                                  )}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <CardDescription>
                          From: {item.name} ({item.email}) • {formatDate(item.createdAt)}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => setSelectedFeedback(item)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-blue-600" />
                                Feedback Details
                              </DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-semibold mb-2">Subject</h4>
                                <p>{item.subject}</p>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Message</h4>
                                <p className="text-sm text-muted-foreground">{item.message}</p>
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-1">Category</h4>
                                  <p className="text-sm">{item.category}</p>
                                </div>
                                {item.rating && (
                                  <div>
                                    <h4 className="font-semibold mb-1">Rating</h4>
                                    <div className="flex items-center gap-1">
                                      {[...Array(5)].map((_, i) => (
                                        <Star
                                          key={i}
                                          className={cn(
                                            "w-4 h-4",
                                            i < item.rating!
                                              ? "fill-yellow-400 text-yellow-400"
                                              : "text-muted-foreground",
                                          )}
                                        />
                                      ))}
                                      <span className="ml-2 text-sm">{item.rating}/5</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                              {item.response && (
                                <div>
                                  <h4 className="font-semibold mb-2">Response</h4>
                                  <p className="text-sm bg-muted p-3 rounded-lg">{item.response}</p>
                                </div>
                              )}
                              {!item.response && (
                                <div>
                                  <h4 className="font-semibold mb-2">Add Response</h4>
                                  <Textarea
                                    placeholder="Type your response..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    rows={4}
                                  />
                                  <Button onClick={submitResponse} className="mt-2">
                                    <Reply className="w-4 h-4 mr-2" />
                                    Send Response
                                  </Button>
                                </div>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Select value={item.status} onValueChange={(value: any) => updateStatus(item.id, value)}>
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.message}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
