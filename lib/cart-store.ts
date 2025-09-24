import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  image: string
  customizations?: string[]
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered"
  timestamp: Date
  customerName?: string
  tableNumber?: string
  paymentMethod?: string
}

interface CartStore {
  items: CartItem[]
  orders: Order[]
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
  createOrder: (customerInfo: { name: string; tableNumber: string; paymentMethod: string }) => void
  updateOrderStatus: (orderId: string, status: Order["status"]) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      orders: [],

      addItem: (item) => {
        const existingItem = get().items.find((i) => i.id === item.id)
        if (existingItem) {
          set((state) => ({
            items: state.items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)),
          }))
        } else {
          set((state) => ({
            items: [...state.items, { ...item, quantity: 1 }],
          }))
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      createOrder: (customerInfo) => {
        const items = get().items
        if (items.length === 0) return

        const order: Order = {
          id: `ORD-${Date.now()}`,
          items: [...items],
          total: get().getTotal(),
          status: "pending",
          timestamp: new Date(),
          ...customerInfo,
        }

        set((state) => ({
          orders: [order, ...state.orders],
          items: [], // Clear cart after order
        }))

        // Simulate real-time notification
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("newOrder", { detail: order }))
        }
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === orderId ? { ...order, status } : order)),
        }))
      },
    }),
    {
      name: "canteen-cart-storage",
    },
  ),
)
