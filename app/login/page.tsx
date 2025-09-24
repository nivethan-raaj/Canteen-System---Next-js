"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Eye, EyeOff, User, Lock, Mail, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userType, setUserType] = useState<"user" | "admin">("user")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields")
      return
    }

    setIsLoading(true)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Redirect based on user type
    if (userType === "admin") {
      router.push("/admin")
    } else {
      router.push("/")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800/50 border-slate-700 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
          <CardDescription className="text-gray-300">Sign in to your Smart Canteen account</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="flex gap-2">
            <Button
              type="button"
              variant={userType === "user" ? "default" : "outline"}
              onClick={() => setUserType("user")}
              className={`flex-1 ${
                userType === "user"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "border-gray-600 text-gray-300 hover:bg-blue-600/20"
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              User
            </Button>
            <Button
              type="button"
              variant={userType === "admin" ? "default" : "outline"}
              onClick={() => setUserType("admin")}
              className={`flex-1 ${
                userType === "admin"
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-gray-600 text-gray-300 hover:bg-purple-600/20"
              }`}
            >
              <Lock className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-10 bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 bg-slate-700/50 border-gray-600 text-white placeholder-gray-400"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-400" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  className="rounded border-gray-600 bg-slate-700"
                />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className={`w-full ${
                userType === "admin" ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Separator className="bg-gray-600" />

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <Link href="#" className="text-blue-400 hover:text-blue-300">
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-slate-700/30 p-3 rounded-lg border border-slate-600">
            <p className="text-xs text-gray-400 mb-2">Demo Credentials:</p>
            <div className="text-xs text-gray-300 space-y-1">
              <p>
                <strong>User:</strong> user@demo.com / password123
              </p>
              <p>
                <strong>Admin:</strong> admin@demo.com / admin123
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
