"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Star, Plus, Search } from "lucide-react"
import { useCartStore } from "@/lib/cart-store"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  rating: number
  image: string
  category: string
  isVeg: boolean
  isAvailable: boolean
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const { addItem, getItemCount } = useCartStore()

  const menuItems: MenuItem[] = [
    // Breakfast
    {
      id: "1",
      name: "Masala Dosa",
      description: "Crispy dosa with spiced potato filling and coconut chutney",
      price: 80,
      rating: 4.8,
      image: "/masala-dosa-south-indian-breakfast.jpg",
      category: "breakfast",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "2",
      name: "Poha",
      description: "Flattened rice with onions, peanuts and curry leaves",
      price: 50,
      rating: 4.5,
      image: "/poha-indian-breakfast-dish.jpg",
      category: "breakfast",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "3",
      name: "Upma",
      description: "Semolina porridge with vegetables and spices",
      price: 45,
      rating: 4.3,
      image: "/upma-semolina-breakfast.jpg",
      category: "breakfast",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "4",
      name: "Idli Sambar",
      description: "Steamed rice cakes with lentil curry and chutney",
      price: 60,
      rating: 4.7,
      image: "/idli-sambar-south-indian-breakfast.jpg",
      category: "breakfast",
      isVeg: true,
      isAvailable: true,
    },
    // Lunch
    {
      id: "5",
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with tender chicken and spices",
      price: 150,
      rating: 4.9,
      image: "/chicken-biryani.png",
      category: "lunch",
      isVeg: false,
      isAvailable: true,
    },
    {
      id: "6",
      name: "Dal Tadka",
      description: "Yellow lentils tempered with cumin and garlic",
      price: 80,
      rating: 4.4,
      image: "/dal-tadka-indian-lentil-curry.jpg",
      category: "lunch",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "7",
      name: "Paneer Butter Masala",
      description: "Cottage cheese in rich tomato and butter gravy",
      price: 120,
      rating: 4.6,
      image: "/paneer-butter-masala-curry.jpg",
      category: "lunch",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "8",
      name: "Rajma Rice",
      description: "Kidney bean curry served with steamed rice",
      price: 90,
      rating: 4.5,
      image: "/rajma-rice-kidney-bean-curry.jpg",
      category: "lunch",
      isVeg: true,
      isAvailable: true,
    },
    // Snacks
    {
      id: "9",
      name: "Samosa Chat",
      description: "Crispy samosas topped with chutneys and yogurt",
      price: 60,
      rating: 4.7,
      image: "/samosa-chat-indian-snack.jpg",
      category: "snacks",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "10",
      name: "Pav Bhaji",
      description: "Spiced vegetable curry served with buttered bread",
      price: 70,
      rating: 4.8,
      image: "/pav-bhaji-mumbai-street-food.jpg",
      category: "snacks",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "11",
      name: "Aloo Tikki",
      description: "Crispy potato patties with mint and tamarind chutney",
      price: 40,
      rating: 4.4,
      image: "/aloo-tikki-potato-patties.jpg",
      category: "snacks",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "12",
      name: "Bhel Puri",
      description: "Puffed rice salad with chutneys and vegetables",
      price: 35,
      rating: 4.3,
      image: "/bhel-puri-mumbai-street-food.jpg",
      category: "snacks",
      isVeg: true,
      isAvailable: true,
    },
    // Beverages
    {
      id: "13",
      name: "Fresh Lime Soda",
      description: "Refreshing lime juice with soda and mint",
      price: 40,
      rating: 4.6,
      image: "/fresh-lime-soda-drink.jpg",
      category: "beverages",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "14",
      name: "Masala Chai",
      description: "Traditional spiced tea with milk and sugar",
      price: 20,
      rating: 4.7,
      image: "/masala-chai-indian-tea.jpg",
      category: "beverages",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "15",
      name: "Mango Lassi",
      description: "Creamy yogurt drink with fresh mango pulp",
      price: 60,
      rating: 4.8,
      image: "/mango-lassi-yogurt-drink.jpg",
      category: "beverages",
      isVeg: true,
      isAvailable: true,
    },
    {
      id: "16",
      name: "Filter Coffee",
      description: "South Indian style strong coffee with milk",
      price: 25,
      rating: 4.5,
      image: "/filter-coffee-south-indian.jpg",
      category: "beverages",
      isVeg: true,
      isAvailable: true,
    },
  ]

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      category: item.category,
      image: item.image,
    })
  }

  const filteredItems = (category: string) => {
    return menuItems
      .filter((item) => item.category === category)
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" cartCount={getItemCount()} />

      <div className="container max-w-6xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 text-foreground">Our Menu</h1>
          <p className="text-muted-foreground mb-6">
            Fresh and delicious food prepared daily with the finest ingredients
          </p>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-border"
            />
          </div>
        </div>

        <Tabs defaultValue="breakfast" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
            <TabsTrigger value="lunch">Lunch</TabsTrigger>
            <TabsTrigger value="snacks">Snacks</TabsTrigger>
            <TabsTrigger value="beverages">Beverages</TabsTrigger>
          </TabsList>

          {["breakfast", "lunch", "snacks", "beverages"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems(category).map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow hover-lift">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {item.isVeg && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Veg
                          </Badge>
                        )}
                        {!item.isAvailable && <Badge variant="destructive">Out of Stock</Badge>}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                        <span className="text-lg font-bold text-primary">₹{item.price}</span>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium text-foreground">{item.rating}</span>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleAddToCart(item)}
                          disabled={!item.isAvailable}
                          className="gap-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Plus className="w-4 h-4" />
                          Add to Cart
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
