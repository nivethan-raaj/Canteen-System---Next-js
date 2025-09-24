"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { StatsCard } from "@/components/ui/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, ShoppingCart, Users, Download, BarChart3, PieChart } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  Pie,
} from "recharts"

export default function RevenuePage() {
  const [timeRange, setTimeRange] = useState("7d")

  // Sample data - in a real app, this would come from your backend
  const dailyRevenue = [
    { date: "Jan 3", revenue: 2400, orders: 24 },
    { date: "Jan 4", revenue: 1398, orders: 18 },
    { date: "Jan 5", revenue: 9800, orders: 45 },
    { date: "Jan 6", revenue: 3908, orders: 32 },
    { date: "Jan 7", revenue: 4800, orders: 38 },
    { date: "Jan 8", revenue: 3800, orders: 29 },
    { date: "Jan 9", revenue: 4300, orders: 35 },
  ]

  const categoryRevenue = [
    { name: "Lunch", value: 45, revenue: 18500, color: "#8884d8" },
    { name: "Breakfast", value: 25, revenue: 10200, color: "#82ca9d" },
    { name: "Snacks", value: 20, revenue: 8100, color: "#ffc658" },
    { name: "Beverages", value: 10, revenue: 4200, color: "#ff7300" },
  ]

  const topItems = [
    { name: "Chicken Biryani", orders: 45, revenue: 6750 },
    { name: "Masala Dosa", orders: 38, revenue: 3040 },
    { name: "Paneer Butter Masala", orders: 32, revenue: 3840 },
    { name: "Pav Bhaji", orders: 28, revenue: 1960 },
    { name: "Fresh Lime Soda", orders: 25, revenue: 1000 },
  ]

  const paymentMethods = [
    { method: "UPI", percentage: 45, amount: 18450 },
    { method: "Card", percentage: 30, amount: 12300 },
    { method: "Cash", percentage: 20, amount: 8200 },
    { method: "QR Code", percentage: 5, amount: 2050 },
  ]

  const totalRevenue = dailyRevenue.reduce((sum, day) => sum + day.revenue, 0)
  const totalOrders = dailyRevenue.reduce((sum, day) => sum + day.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" notificationCount={2} />

      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-4">Revenue Analytics</h1>
              <p className="text-muted-foreground">Track your canteen's financial performance and sales analytics</p>
            </div>

            <div className="flex gap-4">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Revenue"
            value={`₹${totalRevenue.toLocaleString()}`}
            description="Last 7 days"
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Total Orders"
            value={totalOrders.toString()}
            description="Orders completed"
            icon={ShoppingCart}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Avg Order Value"
            value={`₹${Math.round(avgOrderValue)}`}
            description="Per order average"
            icon={TrendingUp}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Active Customers"
            value="156"
            description="This week"
            icon={Users}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="items">Top Items</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Chart */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Daily Revenue
                  </CardTitle>
                  <CardDescription>Revenue trend over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#8884d8"
                        strokeWidth={2}
                        dot={{ fill: "#8884d8" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Orders Chart */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Daily Orders
                  </CardTitle>
                  <CardDescription>Order count over the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dailyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}`, "Orders"]} />
                      <Bar dataKey="orders" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Category Pie Chart */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Revenue by Category
                  </CardTitle>
                  <CardDescription>Distribution of revenue across categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Pie
                        data={categoryRevenue}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {categoryRevenue.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Share"]} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Category Details */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Category Performance</CardTitle>
                  <CardDescription>Detailed breakdown by category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {categoryRevenue.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{category.name}</span>
                        <div className="text-right">
                          <span className="font-semibold">₹{category.revenue.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-2">({category.value}%)</span>
                        </div>
                      </div>
                      <Progress value={category.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="items">
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>Best performing menu items by orders and revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topItems.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-primary">#{index + 1}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{item.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">₹{Math.round(item.revenue / item.orders)} avg</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Methods */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Distribution of payment methods used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.method} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{method.method}</span>
                        <div className="text-right">
                          <span className="font-semibold">₹{method.amount.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground ml-2">({method.percentage}%)</span>
                        </div>
                      </div>
                      <Progress value={method.percentage} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Transaction Summary */}
              <Card className="animate-fade-in">
                <CardHeader>
                  <CardTitle>Transaction Summary</CardTitle>
                  <CardDescription>Payment processing overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">98.5%</p>
                      <p className="text-sm text-muted-foreground">Success Rate</p>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <p className="text-2xl font-bold">₹2.3L</p>
                      <p className="text-sm text-muted-foreground">Total Processed</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Successful Transactions</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        247
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Failed Transactions</span>
                      <Badge variant="secondary" className="bg-red-100 text-red-800">
                        4
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Pending Transactions</span>
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        2
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
