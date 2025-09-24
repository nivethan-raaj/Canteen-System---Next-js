"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, QrCode, Banknote, CheckCircle, ArrowLeft, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import { useCartStore } from "@/lib/cart-store"
import { useRouter } from "next/navigation"

type PaymentMethod = "upi" | "card" | "cash" | "qr"

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi")
  const [customerName, setCustomerName] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const { items, getTotal, createOrder, clearCart } = useCartStore()
  const router = useRouter()

  const subtotal = getTotal()
  const tax = Math.round(subtotal * 0.05)
  const deliveryFee = subtotal > 200 ? 0 : 20
  const total = subtotal + tax + deliveryFee

  const handlePayment = async () => {
    if (!customerName || !tableNumber) {
      alert("Please fill in customer name and table number")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order
    createOrder({
      name: customerName,
      tableNumber,
      paymentMethod: selectedMethod,
    })

    setIsProcessing(false)
    setOrderPlaced(true)

    // Redirect to success page after 3 seconds
    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Header userType="user" cartCount={0} />
        <div className="container max-w-4xl mx-auto py-20 px-4">
          <Card className="text-center bg-gradient-to-br from-red-900/30 to-pink-900/30 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-white">No Items in Cart</CardTitle>
              <CardDescription className="text-gray-300">
                Please add items to your cart before proceeding to payment.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600">
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

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-green-500/30 animate-fade-in">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Order Placed Successfully!</CardTitle>
            <CardDescription className="text-gray-300">
              Your order has been received and is being prepared.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-green-400 font-semibold mb-4">Estimated delivery time: 15-20 minutes</p>
            <p className="text-sm text-gray-400">Redirecting to home page...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header userType="user" cartCount={items.length} />

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center text-cyan-400 hover:text-cyan-300 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cart
          </Link>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Payment
          </h1>
          <p className="text-gray-300">Choose your preferred payment method</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-white">Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName" className="text-gray-300">
                    Customer Name
                  </Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <Label htmlFor="tableNumber" className="text-gray-300">
                    Table Number
                  </Label>
                  <Input
                    id="tableNumber"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                    className="bg-slate-800/50 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-white">Payment Method</CardTitle>
                <CardDescription className="text-gray-300">Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button
                    variant={selectedMethod === "upi" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("upi")}
                    className={`h-20 flex-col gap-2 ${
                      selectedMethod === "upi"
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-orange-500/20"
                    }`}
                  >
                    <Smartphone className="w-6 h-6" />
                    UPI
                  </Button>

                  <Button
                    variant={selectedMethod === "card" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("card")}
                    className={`h-20 flex-col gap-2 ${
                      selectedMethod === "card"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-blue-500/20"
                    }`}
                  >
                    <CreditCard className="w-6 h-6" />
                    Card
                  </Button>

                  <Button
                    variant={selectedMethod === "cash" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("cash")}
                    className={`h-20 flex-col gap-2 ${
                      selectedMethod === "cash"
                        ? "bg-gradient-to-r from-green-500 to-teal-500 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-green-500/20"
                    }`}
                  >
                    <Banknote className="w-6 h-6" />
                    Cash on Dine-in
                  </Button>

                  <Button
                    variant={selectedMethod === "qr" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("qr")}
                    className={`h-20 flex-col gap-2 ${
                      selectedMethod === "qr"
                        ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white"
                        : "border-gray-600 text-gray-300 hover:bg-purple-500/20"
                    }`}
                  >
                    <QrCode className="w-6 h-6" />
                    QR Code
                  </Button>
                </div>

                {/* Payment Method Details */}
                {selectedMethod === "upi" && (
                  <div className="space-y-4 p-4 bg-orange-500/10 rounded-lg border border-orange-500/30">
                    <Label htmlFor="upiId" className="text-orange-300">
                      UPI ID
                    </Label>
                    <Input
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="bg-slate-800/50 border-orange-500/50 text-white placeholder-gray-400"
                    />
                    <p className="text-sm text-orange-300">Enter your UPI ID to proceed with payment</p>
                  </div>
                )}

                {selectedMethod === "card" && (
                  <div className="space-y-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <div>
                      <Label htmlFor="cardNumber" className="text-blue-300">
                        Card Number
                      </Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                        className="bg-slate-800/50 border-blue-500/50 text-white placeholder-gray-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate" className="text-blue-300">
                          Expiry Date
                        </Label>
                        <Input
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                          className="bg-slate-800/50 border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-blue-300">
                          CVV
                        </Label>
                        <Input
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="bg-slate-800/50 border-blue-500/50 text-white placeholder-gray-400"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "cash" && (
                  <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                    <p className="text-green-300 font-semibold mb-2">Cash on Dine-in</p>
                    <p className="text-sm text-green-300">
                      Pay with cash when you dine in at the canteen. Please have exact change ready.
                    </p>
                  </div>
                )}

                {selectedMethod === "qr" && (
                  <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30 text-center">
                    <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-black" />
                    </div>
                    <p className="text-purple-300 font-semibold mb-2">Scan QR Code</p>
                    <p className="text-sm text-purple-300">Scan this QR code with your preferred payment app</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 bg-gradient-to-br from-slate-800/30 to-gray-900/30 border-gray-600/30">
              <CardHeader>
                <CardTitle className="text-white">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-300">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-cyan-400">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator className="bg-gray-600" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Subtotal</span>
                    <span className="text-cyan-400">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Tax (5%)</span>
                    <span className="text-yellow-400">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-400" : "text-orange-400"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                </div>

                <Separator className="bg-gray-600" />

                <div className="flex justify-between text-lg font-semibold">
                  <span className="text-white">Total</span>
                  <span className="text-2xl bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                    ₹{total}
                  </span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !customerName || !tableNumber}
                  className="w-full bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-600 hover:to-cyan-600 text-white font-bold"
                  size="lg"
                >
                  {isProcessing ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Place Order
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-400 text-center">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
