"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Search } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  isVeg: boolean
  isAvailable: boolean
  image: string
}

export default function MenuManagementPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: "1",
      name: "Masala Dosa",
      description: "Crispy dosa with spiced potato filling and coconut chutney",
      price: 80,
      category: "breakfast",
      isVeg: true,
      isAvailable: true,
      image: "/masala-dosa.png",
    },
    {
      id: "2",
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with tender chicken and spices",
      price: 150,
      category: "lunch",
      isVeg: false,
      isAvailable: true,
      image: "/chicken-biryani.png",
    },
    {
      id: "3",
      name: "Samosa Chat",
      description: "Crispy samosas topped with chutneys and yogurt",
      price: 60,
      category: "snacks",
      isVeg: true,
      isAvailable: false,
      image: "/samosa-chat-indian-snack.jpg",
    },
    {
      id: "4",
      name: "Fresh Lime Soda",
      description: "Refreshing lime juice with soda and mint",
      price: 40,
      category: "beverages",
      isVeg: true,
      isAvailable: true,
      image: "/fresh-lime-soda.jpg",
    },
  ])

  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    price: 0,
    category: "",
    isVeg: true,
    isAvailable: true,
    image: "",
  })

  const handleAddItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name,
        description: newItem.description || "",
        price: newItem.price,
        category: newItem.category,
        isVeg: newItem.isVeg || true,
        isAvailable: newItem.isAvailable || true,
        image: newItem.image || "/placeholder.svg",
      }
      setMenuItems((prev) => [...prev, item])
      setNewItem({
        name: "",
        description: "",
        price: 0,
        category: "",
        isVeg: true,
        isAvailable: true,
        image: "",
      })
      setIsAddDialogOpen(false)
    }
  }

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item)
  }

  const handleUpdateItem = () => {
    if (editingItem) {
      setMenuItems((prev) => prev.map((item) => (item.id === editingItem.id ? editingItem : item)))
      setEditingItem(null)
    }
  }

  const handleDeleteItem = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id))
  }

  const toggleAvailability = (id: string) => {
    setMenuItems((prev) => prev.map((item) => (item.id === id ? { ...item, isAvailable: !item.isAvailable } : item)))
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

  const ItemForm = ({
    item,
    onItemChange,
    onSubmit,
    submitLabel,
  }: {
    item: Partial<MenuItem>
    onItemChange: (field: string, value: any) => void
    onSubmit: () => void
    submitLabel: string
  }) => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={item.name || ""}
            onChange={(e) => onItemChange("name", e.target.value)}
            placeholder="Item name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price (₹)</Label>
          <Input
            id="price"
            type="number"
            value={item.price || ""}
            onChange={(e) => onItemChange("price", Number.parseInt(e.target.value))}
            placeholder="0"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={item.description || ""}
          onChange={(e) => onItemChange("description", e.target.value)}
          placeholder="Item description"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={item.category || ""} onValueChange={(value) => onItemChange("category", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="snacks">Snacks</SelectItem>
            <SelectItem value="beverages">Beverages</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            id="isVeg"
            checked={item.isVeg || false}
            onCheckedChange={(checked) => onItemChange("isVeg", checked)}
          />
          <Label htmlFor="isVeg">Vegetarian</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="isAvailable"
            checked={item.isAvailable !== false}
            onCheckedChange={(checked) => onItemChange("isAvailable", checked)}
          />
          <Label htmlFor="isAvailable">Available</Label>
        </div>
      </div>

      <Button onClick={onSubmit} className="w-full">
        {submitLabel}
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" notificationCount={2} />

      <div className="container max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-4">Menu Management</h1>
              <p className="text-muted-foreground">Manage your canteen menu items, prices, and availability</p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Menu Item</DialogTitle>
                  <DialogDescription>Create a new item for your menu</DialogDescription>
                </DialogHeader>
                <ItemForm
                  item={newItem}
                  onItemChange={(field, value) => setNewItem((prev) => ({ ...prev, [field]: value }))}
                  onSubmit={handleAddItem}
                  submitLabel="Add Item"
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
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
                  <Card key={item.id} className="overflow-hidden animate-fade-in">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {item.isVeg && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Veg
                          </Badge>
                        )}
                        <Badge variant={item.isAvailable ? "default" : "destructive"}>
                          {item.isAvailable ? "Available" : "Out of Stock"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-lg font-bold text-primary">₹{item.price}</span>
                      </div>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.isAvailable}
                            onCheckedChange={() => toggleAvailability(item.id)}
                            size="sm"
                          />
                          <span className="text-sm">Available</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditItem(item)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Edit Dialog */}
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Menu Item</DialogTitle>
              <DialogDescription>Update the details of this menu item</DialogDescription>
            </DialogHeader>
            {editingItem && (
              <ItemForm
                item={editingItem}
                onItemChange={(field, value) => setEditingItem((prev) => (prev ? { ...prev, [field]: value } : null))}
                onSubmit={handleUpdateItem}
                submitLabel="Update Item"
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  )
}
