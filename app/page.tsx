import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, BarChart3, WifiOff, ShoppingCart, Camera, Bot, CloudSun } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-leaf-dark mb-6">Smart Farming. Simple Living.</h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Your AI-powered farming assistant that helps you grow better crops, save resources, and increase profits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-leaf-dark hover:bg-leaf text-white" asChild>
              <Link href="/crop-doctor">
                <Camera className="mr-2 h-5 w-5" /> Scan Crop Now
              </Link>
            </Button>
            <Button size="lg" className="bg-soil-light hover:bg-soil text-white" asChild>
              <Link href="/kisanbot">
                <Bot className="mr-2 h-5 w-5" /> Ask KisanBot
              </Link>
            </Button>
            <Button size="lg" className="bg-sky-dark hover:bg-sky text-white" asChild>
              <Link href="/dashboard">
                <CloudSun className="mr-2 h-5 w-5" /> Weather Dashboard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            title="AI Crop Doctor"
            icon={<Leaf className="h-10 w-10 text-leaf-dark" />}
            description="Scan your crops to identify diseases and get treatment recommendations instantly."
            href="/crop-doctor"
          />
          <FeatureCard
            title="Smart Dashboard"
            icon={<BarChart3 className="h-10 w-10 text-soil-light" />}
            description="Track weather, soil conditions, and get personalized farming recommendations."
            href="/dashboard"
          />
          <FeatureCard
            title="Offline Mode"
            icon={<WifiOff className="h-10 w-10 text-sky-dark" />}
            description="Access essential farming guides and tips even without internet connection."
            href="/offline-help"
          />
          <FeatureCard
            title="Local Market"
            icon={<ShoppingCart className="h-10 w-10 text-sun-dark" />}
            description="Find the best prices for your crops and connect with local buyers."
            href="/market"
          />
        </div>
      </section>

      {/* Testimonials or Additional Info */}
      <section className="py-12 bg-secondary rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted by Farmers Across the Country</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TestimonialCard
            quote="AgroAI helped me identify a disease in my tomato crop before it spread. Saved my entire harvest!"
            author="Ramesh Kumar, Madhya Pradesh"
          />
          <TestimonialCard
            quote="The weather alerts are so accurate. I know exactly when to irrigate and when to hold off."
            author="Sunita Patil, Maharashtra"
          />
          <TestimonialCard
            quote="I sold my wheat at 15% higher price by finding the right buyer through the market feature."
            author="Gurpreet Singh, Punjab"
          />
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  title,
  icon,
  description,
  href,
}: {
  title: string
  icon: React.ReactNode
  description: string
  href: string
}) {
  return (
    <Link href={href}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

function TestimonialCard({
  quote,
  author,
}: {
  quote: string
  author: string
}) {
  return (
    <Card className="bg-background">
      <CardContent className="pt-6">
        <p className="text-muted-foreground italic mb-4">"{quote}"</p>
        <p className="text-sm font-medium">— {author}</p>
      </CardContent>
    </Card>
  )
}

