"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, AlertCircle, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function FeedbackPage() {
  const [feedbackType, setFeedbackType] = useState<"feedback" | "complaint">("feedback")
  const [rating, setRating] = useState<number>(0)
  const [hoveredRating, setHoveredRating] = useState<number>(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Feedback submitted:", { ...formData, rating, feedbackType })
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        email: "",
        category: "",
        subject: "",
        message: "",
      })
      setRating(0)
      setFeedbackType("feedback")
    }, 3000)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header userType="user" cartCount={0} />
        <div className="container max-w-2xl mx-auto py-20 px-4">
          <Card className="text-center animate-fade-in">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Thank You!</CardTitle>
              <CardDescription>
                Your {feedbackType} has been submitted successfully. We appreciate your input and will respond within 24
                hours.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" cartCount={0} />

      <div className="container max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Feedback & Complaints</h1>
          <p className="text-muted-foreground">
            We value your opinion! Share your experience or report any issues to help us improve our service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feedbackType === "feedback" ? (
                    <MessageSquare className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  {feedbackType === "feedback" ? "Share Your Feedback" : "Report a Complaint"}
                </CardTitle>
                <CardDescription>
                  {feedbackType === "feedback"
                    ? "Tell us about your experience with our canteen service"
                    : "Report any issues or problems you've encountered"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Feedback Type Selection */}
                  <div className="space-y-3">
                    <Label>Type</Label>
                    <RadioGroup
                      value={feedbackType}
                      onValueChange={(value: "feedback" | "complaint") => setFeedbackType(value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="feedback" id="feedback" />
                        <Label htmlFor="feedback">Feedback</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="complaint" id="complaint" />
                        <Label htmlFor="complaint">Complaint</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Rating (only for feedback) */}
                  {feedbackType === "feedback" && (
                    <div className="space-y-3">
                      <Label>Overall Rating</Label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            className="p-1"
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            onClick={() => setRating(star)}
                          >
                            <Star
                              className={cn(
                                "w-6 h-6 transition-colors",
                                (hoveredRating || rating) >= star
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground",
                              )}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="food-quality">Food Quality</SelectItem>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="cleanliness">Cleanliness</SelectItem>
                        <SelectItem value="pricing">Pricing</SelectItem>
                        <SelectItem value="staff-behavior">Staff Behavior</SelectItem>
                        <SelectItem value="facility">Facility</SelectItem>
                        <SelectItem value="ordering-system">Ordering System</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      placeholder="Brief summary of your feedback/complaint"
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide detailed information about your experience or issue..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit {feedbackType === "feedback" ? "Feedback" : "Complaint"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Phone</Label>
                  <p className="text-sm text-muted-foreground">+91 98765 43210</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Email</Label>
                  <p className="text-sm text-muted-foreground">support@smartcanteen.com</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Hours</Label>
                  <p className="text-sm text-muted-foreground">Mon-Fri: 7:00 AM - 10:00 PM</p>
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Response Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feedback</span>
                  <Badge variant="secondary">24-48 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Complaints</span>
                  <Badge variant="destructive">Within 24 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Urgent Issues</span>
                  <Badge>Within 2 hours</Badge>
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="text-lg">Common Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium">How do I track my complaint?</p>
                  <p className="text-xs text-muted-foreground">You'll receive an email with a tracking ID</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Can I remain anonymous?</p>
                  <p className="text-xs text-muted-foreground">Yes, but we can't follow up without contact info</p>
                </div>
                <div>
                  <p className="text-sm font-medium">What about food allergies?</p>
                  <p className="text-xs text-muted-foreground">Please report immediately for urgent attention</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
