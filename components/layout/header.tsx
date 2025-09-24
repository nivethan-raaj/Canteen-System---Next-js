"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, User, Menu, X, Utensils } from "lucide-react"
import { NotificationSystem } from "@/components/real-time/notification-system"
import { cn } from "@/lib/utils"
import { useCartStore } from "@/lib/cart-store"

interface HeaderProps {
  userType: "admin" | "user"
  cartCount?: number
  notificationCount?: number
}

export function Header({ userType, notificationCount = 0 }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [realTimeNotificationCount, setRealTimeNotificationCount] = useState(notificationCount)
  const pathname = usePathname()

  const { getItemCount } = useCartStore()
  const cartCount = getItemCount()

  const adminNavItems = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/menu", label: "Menu Management" },
    { href: "/admin/feedback", label: "Feedback" },
    { href: "/admin/revenue", label: "Revenue" },
  ]

  const userNavItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/feedback", label: "Feedback" },
    { href: "/cart", label: "Cart" },
  ]

  const navItems = userType === "admin" ? adminNavItems : userNavItems

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 backdrop-blur-sm">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href={userType === "admin" ? "/admin" : "/"} className="mr-6 flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <Utensils className="text-white font-bold text-sm w-5 h-5" />
            </div>
            <span className="hidden font-bold sm:inline-block text-slate-800 text-xl">Smart Canteen</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-blue-600 font-medium px-3 py-2 rounded-lg",
                  pathname === item.href ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-slate-100 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6 text-slate-600" /> : <Menu className="h-6 w-6 text-slate-600" />}
        </Button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href={userType === "admin" ? "/admin" : "/"} className="flex items-center space-x-2 md:hidden">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Utensils className="text-white font-bold text-sm w-4 h-4" />
              </div>
              <span className="font-bold text-slate-800">Smart Canteen</span>
            </Link>
          </div>
          <nav className="flex items-center gap-2">
            {userType === "admin" && (
              <NotificationSystem userType="admin" onNotificationCount={setRealTimeNotificationCount} />
            )}
            {userType === "user" && (
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="relative hover:bg-slate-100">
                  <ShoppingCart className="h-5 w-5 text-slate-600" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 text-xs bg-blue-600 text-white">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}
            <Link href="/login">
              <Button variant="ghost" size="sm" className="hover:bg-slate-100">
                <User className="h-5 w-5 text-slate-600" />
              </Button>
            </Link>
          </nav>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 md:hidden bg-white">
          <nav className="container py-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "transition-colors px-4 py-3 rounded-lg font-medium",
                    pathname === item.href ? "text-blue-600 bg-blue-50" : "text-slate-600 hover:bg-slate-100",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
