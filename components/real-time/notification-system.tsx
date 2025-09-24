"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, X, ShoppingCart, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: "order" | "complaint" | "system" | "success"
  title: string
  message: string
  timestamp: Date
  isRead: boolean
  priority: "low" | "medium" | "high"
}

interface NotificationSystemProps {
  userType: "admin" | "user"
  onNotificationCount?: (count: number) => void
}

export function NotificationSystem({ userType, onNotificationCount }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Simulate real-time notifications
  useEffect(() => {
    if (userType === "admin") {
      const interval = setInterval(() => {
        // Simulate random notifications for admin
        const notificationTypes = [
          {
            type: "order" as const,
            title: "New Order Received",
            message: `Order #${Math.floor(Math.random() * 9999)} from customer`,
            priority: "medium" as const,
          },
          {
            type: "complaint" as const,
            title: "New Complaint",
            message: "Customer reported an issue with food quality",
            priority: "high" as const,
          },
          {
            type: "system" as const,
            title: "System Alert",
            message: "Load balancer automatically scaled up",
            priority: "low" as const,
          },
          {
            type: "success" as const,
            title: "Order Completed",
            message: `Order #${Math.floor(Math.random() * 9999)} has been delivered`,
            priority: "low" as const,
          },
        ]

        // 30% chance to add a notification every 10 seconds
        if (Math.random() < 0.3) {
          const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
          const newNotification: Notification = {
            id: Date.now().toString(),
            ...randomNotification,
            timestamp: new Date(),
            isRead: false,
          }

          setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]) // Keep only 10 notifications
        }
      }, 10000) // Check every 10 seconds

      return () => clearInterval(interval)
    }
  }, [userType])

  // Update notification count
  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length
    onNotificationCount?.(unreadCount)
  }, [notifications, onNotificationCount])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, isRead: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, isRead: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <ShoppingCart className="w-4 h-4 text-blue-600" />
      case "complaint":
        return <AlertCircle className="w-4 h-4 text-red-600" />
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "system":
        return <Clock className="w-4 h-4 text-orange-600" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50"
      case "low":
        return "border-l-green-500 bg-green-50"
      default:
        return "border-l-gray-500 bg-gray-50"
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    return timestamp.toLocaleDateString()
  }

  if (userType !== "admin" || notifications.length === 0) {
    return null
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative">
        <Bell className="w-4 h-4" />
        {notifications.filter((n) => !n.isRead).length > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs animate-pulse-slow"
          >
            {notifications.filter((n) => !n.isRead).length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 max-h-96 overflow-hidden bg-background border rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Notifications</h3>
              <div className="flex gap-2">
                {notifications.some((n) => !n.isRead) && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={cn(
                      "p-3 border-l-4 cursor-pointer hover:bg-muted/50 transition-colors",
                      getPriorityColor(notification.priority),
                      !notification.isRead && "bg-blue-50/50",
                    )}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-sm">{notification.title}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-1"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeNotification(notification.id)
                            }}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{formatTime(notification.timestamp)}</span>
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
