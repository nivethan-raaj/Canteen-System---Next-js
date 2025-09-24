"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Smartphone, QrCode, Banknote } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

type PaymentMethod = "upi" | "card" | "cash" | "qr"

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi")
  const [customerName, setCustomerName] = useState("")
  const [tableNumber, setTableNumber] = useState("")
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  const { items, getTotal, createOrder } = useCartStore()

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
    onSuccess()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Details */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <Label htmlFor="tableNumber">Table Number</Label>
                  <Input
                    id="tableNumber"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button
                    variant={selectedMethod === "upi" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("upi")}
                    className="h-20 flex-col gap-2"
                  >
                    <Smartphone className="w-6 h-6" />
                    UPI
                  </Button>

                  <Button
                    variant={selectedMethod === "card" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("card")}
                    className="h-20 flex-col gap-2"
                  >
                    <CreditCard className="w-6 h-6" />
                    Card
                  </Button>

                  <Button
                    variant={selectedMethod === "cash" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("cash")}
                    className="h-20 flex-col gap-2"
                  >
                    <Banknote className="w-6 h-6" />
                    Cash on Dine-in
                  </Button>

                  <Button
                    variant={selectedMethod === "qr" ? "default" : "outline"}
                    onClick={() => setSelectedMethod("qr")}
                    className="h-20 flex-col gap-2"
                  >
                    <QrCode className="w-6 h-6" />
                    QR Code
                  </Button>
                </div>

                {/* Payment Method Details */}
                {selectedMethod === "upi" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                    />
                    <p className="text-sm text-blue-600">Enter your UPI ID to proceed with payment</p>
                  </div>
                )}

                {selectedMethod === "card" && (
                  <div className="space-y-4 p-4 bg-blue-50 rounded-lg border">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} placeholder="123" />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === "cash" && (
                  <div className="p-4 bg-green-50 rounded-lg border">
                    <p className="text-green-700 font-semibold mb-2">Cash on Dine-in</p>
                    <p className="text-sm text-green-600">
                      Pay with cash when you dine in at the canteen. Please have exact change ready.
                    </p>
                  </div>
                )}

                {selectedMethod === "qr" && (
                  <div className="p-4 bg-purple-50 rounded-lg border text-center">
                    <div className="w-32 h-32 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center border">
                      <QrCode className="w-24 h-24 text-black" />
                    </div>
                    <p className="text-purple-700 font-semibold mb-2">Scan QR Code</p>
                    <p className="text-sm text-purple-600">Scan this QR code with your preferred payment app</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-slate-600">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-slate-800 font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="text-slate-800">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Tax (5%)</span>
                    <span className="text-slate-800">₹{tax}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : "text-slate-800"}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-2xl text-blue-600">₹{total}</span>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing || !customerName || !tableNumber}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-slate-500 text-center">
                  By placing this order, you agree to our terms and conditions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
