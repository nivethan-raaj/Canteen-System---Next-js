"use client"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { LiveOrdersFeed } from "@/components/real-time/live-orders-feed"
import { DollarSign, ShoppingCart, Users, TrendingUp } from "lucide-react"

export default function AdminDashboard() {
  const recentOrders = [
    {
      id: "#1234",
      customer: "John Doe",
      items: "Masala Dosa, Chai",
      amount: 100,
      status: "preparing",
      time: "2 min ago",
    },
    {
      id: "#1233",
      customer: "Jane Smith",
      items: "Chicken Biryani, Lassi",
      amount: 210,
      status: "completed",
      time: "30 min ago",
    },
    {
      id: "#1232",
      customer: "Mike Johnson",
      items: "Pav Bhaji, Lime Soda",
      amount: 110,
      status: "delivered",
      time: "1 hour ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "delivered":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" notificationCount={2} />

      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor your canteen operations and manage orders in real-time</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Today's Revenue"
            value="₹12,450"
            description="Total earnings today"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Orders Today"
            value="87"
            description="Total orders received"
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Active Customers"
            value="156"
            description="Customers this week"
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Avg Order Value"
            value="₹143"
            description="Average per order"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LiveOrdersFeed />

          {/* System Status & Quick Stats */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Order Completion Rate</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Customer Satisfaction</span>
                    <span>4.8/5</span>
                  </div>
                  <Progress value={96} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Kitchen Efficiency</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
                <CardDescription>Real-time system health monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Load Balancer</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Payment Gateway</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                    <span className="text-sm text-green-600">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Order Processing</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                    <span className="text-sm text-green-600">Normal</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Real-time Sync</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow"></div>
                    <span className="text-sm text-green-600">Active</span>
                  </div>
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
