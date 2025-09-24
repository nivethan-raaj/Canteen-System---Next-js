"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { type CartItem, useCartStore } from "@/lib/cart-store"
import Image from "next/image"

interface CartItemProps {
  item: CartItem
}

export function CartItemComponent({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-slate-800">{item.name}</h3>
          <p className="text-sm text-slate-500 capitalize">{item.category}</p>
          <p className="text-lg font-bold text-blue-600">₹{item.price}</p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-100"
          >
            <Minus className="h-4 w-4 text-slate-600" />
          </Button>

          <span className="w-8 text-center font-semibold text-slate-800">{item.quantity}</span>

          <Button
            size="sm"
            variant="outline"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="h-8 w-8 p-0 border-slate-300 hover:bg-slate-100"
          >
            <Plus className="h-4 w-4 text-slate-600" />
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => removeItem(item.id)}
            className="h-8 w-8 p-0 border-red-300 hover:bg-red-50 ml-2"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>

        <div className="text-right">
          <p className="font-bold text-lg text-slate-800">₹{(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
    </Card>
  )
}
