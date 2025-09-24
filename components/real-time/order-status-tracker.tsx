"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle, Utensils, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderStatus {
  id: string
  status: "placed" | "confirmed" | "preparing" | "ready" | "delivered"
  estimatedTime: number // in minutes
  actualTime?: number
  items: string[]
  total: number
}

interface OrderStatusTrackerProps {
  orderId?: string
  className?: string
}

export function OrderStatusTracker({ orderId = "1234", className }: OrderStatusTrackerProps) {
  const [order, setOrder] = useState<OrderStatus>({
    id: orderId,
    status: "placed",
    estimatedTime: 15,
    items: ["Masala Dosa", "Filter Coffee"],
    total: 105,
  })

  const [progress, setProgress] = useState(0)

  // Simulate order progress
  useEffect(() => {
    const statusFlow: OrderStatus["status"][] = ["placed", "confirmed", "preparing", "ready", "delivered"]
    const currentIndex = statusFlow.indexOf(order.status)

    const interval = setInterval(() => {
      if (currentIndex < statusFlow.length - 1) {
        const nextStatus = statusFlow[currentIndex + 1]
        setOrder((prev) => ({ ...prev, status: nextStatus }))

        // Update progress
        const newProgress = ((currentIndex + 1) / (statusFlow.length - 1)) * 100
        setProgress(newProgress)
      }
    }, 5000) // Progress every 5 seconds

    return () => clearInterval(interval)
  }, [order.status])

  const getStatusInfo = (status: OrderStatus["status"]) => {
    switch (status) {
      case "placed":
        return { icon: Clock, color: "text-blue-600", bg: "bg-blue-100", label: "Order Placed" }
      case "confirmed":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Confirmed" }
      case "preparing":
        return { icon: Utensils, color: "text-orange-600", bg: "bg-orange-100", label: "Preparing" }
      case "ready":
        return { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Ready for Pickup" }
      case "delivered":
        return { icon: Truck, color: "text-purple-600", bg: "bg-purple-100", label: "Delivered" }
    }
  }

  const statusInfo = getStatusInfo(order.status)
  const StatusIcon = statusInfo.icon

  const getEstimatedTime = () => {
    switch (order.status) {
      case "placed":
        return "15 minutes"
      case "confirmed":
        return "12 minutes"
      case "preparing":
        return "8 minutes"
      case "ready":
        return "Ready now!"
      case "delivered":
        return "Delivered"
      default:
        return "15 minutes"
    }
  }

  return (
    <Card className={cn("animate-fade-in", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>Track your order status</CardDescription>
          </div>
          <Badge className={cn(statusInfo.bg, statusInfo.color, "border-0")}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Order Details */}
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Items Ordered</h4>
            <div className="space-y-1">
              {order.items.map((item, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-medium">Total</span>
            <span className="font-semibold">₹{order.total}</span>
          </div>
        </div>

        {/* Estimated Time */}
        <div className="bg-muted/20 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Estimated time: {getEstimatedTime()}</span>
          </div>
        </div>

        {/* Status Timeline */}
        <div className="space-y-3">
          <h4 className="font-medium">Order Timeline</h4>
          <div className="space-y-2">
            {["placed", "confirmed", "preparing", "ready", "delivered"].map((status, index) => {
              const statusInfo = getStatusInfo(status as OrderStatus["status"])
              const StatusIcon = statusInfo.icon
              const isActive = ["placed", "confirmed", "preparing", "ready", "delivered"].indexOf(order.status) >= index
              const isCurrent = order.status === status

              return (
                <div key={status} className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      isActive ? statusInfo.bg : "bg-muted",
                      isCurrent && "ring-2 ring-offset-2 ring-primary",
                    )}
                  >
                    <StatusIcon className={cn("w-4 h-4", isActive ? statusInfo.color : "text-muted-foreground")} />
                  </div>
                  <span className={cn("text-sm", isActive ? "text-foreground font-medium" : "text-muted-foreground")}>
                    {statusInfo.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
