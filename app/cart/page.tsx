"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingBag, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { CartItemComponent } from "@/components/cart/cart-item"
import { PaymentModal } from "@/components/payment/payment-modal"

export default function CartPage() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const { items, getTotal, getItemCount } = useCartStore()

  const subtotal = getTotal()
  const tax = Math.round(subtotal * 0.05) // 5% tax
  const deliveryFee = subtotal > 200 ? 0 : 20 // Free delivery above ₹200
  const total = subtotal + tax + deliveryFee
  const totalItems = getItemCount()

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false)
    setOrderSuccess(true)

    // Reset success message after 3 seconds
    setTimeout(() => {
      setOrderSuccess(false)
    }, 3000)
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header userType="user" cartCount={0} />
        <div className="container max-w-4xl mx-auto py-20 px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Order Placed Successfully!</CardTitle>
              <CardDescription className="text-slate-600">
                Your order has been received and is being prepared.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-green-600 font-semibold mb-4">Estimated delivery time: 15-20 minutes</p>
              <Link href="/menu">
                <Button className="bg-blue-600 hover:bg-blue-700">Order More Items</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header userType="user" cartCount={0} />
        <div className="container max-w-4xl mx-auto py-20 px-4">
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-slate-800">Your Cart is Empty</CardTitle>
              <CardDescription className="text-slate-600">
                Looks like you haven't added any items to your cart yet. Browse our delicious menu to get started!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Browse Menu
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userType="user" cartCount={totalItems} />

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-slate-800">Your Cart</h1>
          <p className="text-slate-600">Review your order and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItemComponent key={item.id} item={item} />
            ))}

            <div className="flex justify-center pt-4">
              <Link href="/menu">
                <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 bg-transparent">
                  Add More Items
                </Button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="text-slate-800">Order Summary</CardTitle>
                <CardDescription className="text-slate-600">
                  {totalItems} item{totalItems !== 1 ? "s" : ""} in your cart
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span className="text-slate-800 font-semibold">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (5%)</span>
                    <span className="text-slate-800 font-semibold">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600 font-bold" : "text-slate-800 font-semibold"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {subtotal < 200 && (
                    <p className="text-xs text-blue-600">Add ₹{200 - subtotal} more for free delivery</p>
                  )}
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-slate-800">Total</span>
                  <span className="text-2xl text-blue-600">₹{total}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <Button
                    onClick={() => setIsPaymentModalOpen(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Proceed to Payment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>

                  <div className="text-center">
                    <p className="text-xs text-slate-500">Estimated delivery time: 15-20 minutes</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />

      <Footer />
    </div>
  )
}
