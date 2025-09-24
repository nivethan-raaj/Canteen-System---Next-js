import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Star, Utensils, Zap, Shield, Users, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Ordering",
      description: "Get your orders processed instantly with our smart load balancing system",
    },
    {
      icon: Utensils,
      title: "Fresh Menu Daily",
      description: "Enjoy fresh breakfast, lunch, snacks and beverages updated daily",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Multiple payment options including UPI, cards, and cash on dine-in",
    },
    {
      icon: Users,
      title: "Smart Management",
      description: "Efficient canteen management with real-time feedback and analytics",
    },
  ]

  const popularItems = [
    {
      name: "Masala Dosa",
      category: "Breakfast",
      price: "₹80",
      rating: 4.8,
      image: "/masala-dosa-south-indian-breakfast.jpg",
    },
    {
      name: "Chicken Biryani",
      category: "Lunch",
      price: "₹150",
      rating: 4.9,
      image: "/chicken-biryani.png",
    },
    {
      name: "Samosa Chat",
      category: "Snacks",
      price: "₹60",
      rating: 4.7,
      image: "/samosa-chat-indian-snack.jpg",
    },
    {
      name: "Fresh Lime Soda",
      category: "Beverages",
      price: "₹40",
      rating: 4.6,
      image: "/fresh-lime-soda-drink.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" cartCount={0} />

      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-accent to-primary/5">
        <div className="container max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-primary text-primary-foreground hover-lift">
            <Clock className="w-3 h-3 mr-1" />
            Open 7:00 AM - 10:00 PM
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 text-balance animate-fade-in text-foreground">
            <span className="text-primary">Smart Canteen</span>
            <span className="block text-foreground">Management System</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty animate-fade-in">
            Experience the future of canteen dining with real-time ordering, smart load balancing, and seamless payment
            options.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Link href="/menu">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold hover-lift"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Order Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/feedback">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 hover:border-primary hover-lift bg-transparent"
              >
                Give Feedback
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-background">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Why Choose Smart Canteen?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Our advanced system ensures fast, reliable, and enjoyable dining experience for everyone.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover-lift border-border animate-fade-in hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-accent/30">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-foreground">Popular Items</h2>
            <p className="text-muted-foreground text-lg">Try our most loved dishes across all categories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularItems.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-lift border-border animate-fade-in hover:border-primary/50 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">{item.category}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                    <span className="text-xl font-bold text-primary">{item.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{item.rating}</span>
                    <span className="text-sm text-muted-foreground">(50+ reviews)</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/menu">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold hover-lift">
                <Utensils className="w-4 h-4 mr-2" />
                View Full Menu
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
