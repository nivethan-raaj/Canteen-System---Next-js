"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ShoppingCart, Clock, CheckCircle, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface LiveOrder {
  id: string
  customerName: string
  items: string[]
  total: number
  status: "new" | "preparing" | "ready" | "completed"
  timestamp: Date
  estimatedTime: number
}

export function LiveOrdersFeed() {
  const [orders, setOrders] = useState<LiveOrder[]>([
    {
      id: "1234",
      customerName: "John Doe",
      items: ["Masala Dosa", "Filter Coffee"],
      total: 105,
      status: "preparing",
      timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
      estimatedTime: 10,
    },
    {
      id: "1235",
      customerName: "Jane Smith",
      items: ["Chicken Biryani", "Mango Lassi"],
      total: 210,
      status: "new",
      timestamp: new Date(Date.now() - 2 * 60000), // 2 minutes ago
      estimatedTime: 15,
    },
  ])

  // Simulate new orders coming in
  useEffect(() => {
    const interval = setInterval(() => {
      // 20% chance to add a new order every 15 seconds
      if (Math.random() < 0.2) {
        const customerNames = ["Alice Johnson", "Bob Wilson", "Carol Brown", "David Lee", "Emma Davis"]
        const menuItems = [
          ["Pav Bhaji", "Masala Chai"],
          ["Samosa Chat", "Fresh Lime Soda"],
          ["Paneer Butter Masala", "Naan"],
          ["Idli Sambar", "Filter Coffee"],
          ["Upma", "Coconut Chutney"],
        ]

        const randomCustomer = customerNames[Math.floor(Math.random() * customerNames.length)]
        const randomItems = menuItems[Math.floor(Math.random() * menuItems.length)]
        const randomTotal = Math.floor(Math.random() * 200) + 50

        const newOrder: LiveOrder = {
          id: (Date.now() + Math.random()).toString(),
          customerName: randomCustomer,
          items: randomItems,
          total: randomTotal,
          status: "new",
          timestamp: new Date(),
          estimatedTime: Math.floor(Math.random() * 10) + 10,
        }

        setOrders((prev) => [newOrder, ...prev.slice(0, 9)]) // Keep only 10 orders
      }

      // Update existing orders status
      setOrders((prev) =>
        prev.map((order) => {
          if (order.status === "new" && Math.random() < 0.3) {
            return { ...order, status: "preparing" as const }
          }
          if (order.status === "preparing" && Math.random() < 0.2) {
            return { ...order, status: "ready" as const }
          }
          if (order.status === "ready" && Math.random() < 0.4) {
            return { ...order, status: "completed" as const }
          }
          return order
        }),
      )
    }, 15000) // Check every 15 seconds

    return () => clearInterval(interval)
  }, [])

  const updateOrderStatus = (orderId: string, newStatus: LiveOrder["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusInfo = (status: LiveOrder["status"]) => {
    switch (status) {
      case "new":
        return { color: "bg-blue-100 text-blue-800", icon: Clock, label: "New Order" }
      case "preparing":
        return { color: "bg-yellow-100 text-yellow-800", icon: ShoppingCart, label: "Preparing" }
      case "ready":
        return { color: "bg-green-100 text-green-800", icon: CheckCircle, label: "Ready" }
      case "completed":
        return { color: "bg-gray-100 text-gray-800", icon: CheckCircle, label: "Completed" }
    }
  }

  const formatTime = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    return timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Live Orders Feed
        </CardTitle>
        <CardDescription>Real-time order updates and status changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No orders yet</p>
              </div>
            ) : (
              orders.map((order) => {
                const statusInfo = getStatusInfo(order.status)
                const StatusIcon = statusInfo.icon

                return (
                  <div
                    key={order.id}
                    className={cn(
                      "p-4 border rounded-lg transition-all duration-300",
                      order.status === "new" && "border-blue-200 bg-blue-50/50 animate-pulse-slow",
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <User className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Order #{order.id}</h4>
                          <p className="text-sm text-muted-foreground">{order.customerName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={statusInfo.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusInfo.label}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{formatTime(order.timestamp)}</p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">Items:</p>
                      <p className="text-sm text-muted-foreground">{order.items.join(", ")}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-semibold">₹{order.total}</span>
                      <div className="flex gap-2">
                        {order.status === "new" && (
                          <Button size="sm" onClick={() => updateOrderStatus(order.id, "preparing")}>
                            Accept
                          </Button>
                        )}
                        {order.status === "preparing" && (
                          <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "ready")}>
                            Mark Ready
                          </Button>
                        )}
                        {order.status === "ready" && (
                          <Button size="sm" variant="outline" onClick={() => updateOrderStatus(order.id, "completed")}>
                            Complete
                          </Button>
                        )}
                      </div>
                    </div>

                    {order.status !== "completed" && (
                      <div className="mt-2 text-xs text-muted-foreground">Est. time: {order.estimatedTime} minutes</div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
