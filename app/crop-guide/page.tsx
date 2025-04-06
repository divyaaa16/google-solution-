"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Volume2, VolumeX, ArrowRight, Sprout, Droplets, Sun, Wind, Scissors } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CropGuidePage() {
  const [language, setLanguage] = useState("en")
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleVoicePlayback = () => {
    // In a real app, this would use the Web Speech API
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      alert(`Playing voice instructions in ${language === "en" ? "English" : language === "hi" ? "Hindi" : "Marathi"}`)
      setTimeout(() => setIsPlaying(false), 1000)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Visual Crop Guide</h1>
          <p className="text-muted-foreground">Step-by-step pictorial guides for farming practices</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="mr">मराठी</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={toggleVoicePlayback}>
            {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            <span className="sr-only">{isPlaying ? "Stop voice" : "Play voice"}</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="tomato">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="tomato">Tomato Growing</TabsTrigger>
          <TabsTrigger value="wheat">Wheat Cultivation</TabsTrigger>
          <TabsTrigger value="pruning">Pruning Techniques</TabsTrigger>
        </TabsList>

        <TabsContent value="tomato">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Growing Tomatoes: Step-by-Step Guide</span>
                <Button variant="outline" size="sm" onClick={toggleVoicePlayback}>
                  {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                  Voice Instructions
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <StepCard
                  step={1}
                  title="Seed Selection & Sowing"
                  description="Choose healthy seeds and sow in seed trays with well-draining soil mix."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={2}
                  title="Transplanting Seedlings"
                  description="When seedlings have 4-6 true leaves, transplant to the field with 60cm spacing."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={3}
                  title="Staking & Support"
                  description="Install bamboo stakes or string trellis to support growing plants."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={4}
                  title="Watering & Fertilizing"
                  description="Water at the base of plants. Apply organic fertilizer every 2-3 weeks."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={5}
                  title="Pest Management"
                  description="Monitor for aphids, whiteflies and caterpillars. Use neem oil spray as needed."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={6}
                  title="Harvesting"
                  description="Harvest when fruits are firm and fully colored. Twist gently to remove."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wheat">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Wheat Cultivation: Step-by-Step Guide</span>
                <Button variant="outline" size="sm" onClick={toggleVoicePlayback}>
                  {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                  Voice Instructions
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <StepCard
                  step={1}
                  title="Land Preparation"
                  description="Plow the field 2-3 times and level it properly for even water distribution."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={2}
                  title="Seed Selection & Treatment"
                  description="Select certified seeds and treat with fungicide before sowing."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={3}
                  title="Sowing"
                  description="Sow seeds in rows 20cm apart at a depth of 5cm. Use 100kg seeds per hectare."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={4}
                  title="Irrigation"
                  description="First irrigation after 21 days, then at crown root, tillering, flowering and grain filling stages."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={5}
                  title="Weed Management"
                  description="Remove weeds manually or use recommended herbicides 30-35 days after sowing."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={6}
                  title="Harvesting"
                  description="Harvest when crop turns golden yellow and grains are hard. Use sickle or harvester."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pruning">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pruning Techniques: Visual Guide</span>
                <Button variant="outline" size="sm" onClick={toggleVoicePlayback}>
                  {isPlaying ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                  Voice Instructions
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <StepCard
                  step={1}
                  title="Heading Cut"
                  description="Cut at the top of the main stem to encourage branching and bushier growth."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={2}
                  title="Thinning Cut"
                  description="Remove entire branches at the base to improve air circulation and light penetration."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={3}
                  title="Pinching"
                  description="Remove growing tips with fingers to encourage branching and more flowers."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={4}
                  title="Deadheading"
                  description="Remove spent flowers to encourage more blooms and prevent seed formation."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={5}
                  title="Removing Suckers"
                  description="Remove shoots growing from the base or in leaf axils to direct energy to main stems."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />

                <StepCard
                  step={6}
                  title="Proper Cutting Technique"
                  description="Cut at a 45-degree angle just above a bud or branch junction. Use clean, sharp tools."
                  imageSrc="/placeholder.svg?height=200&width=400"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Quick Reference Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickGuideCard
            icon={<Sprout className="h-8 w-8 text-leaf-dark" />}
            title="Soil Preparation"
            items={[
              "Remove weeds and debris",
              "Add organic matter/compost",
              "Till to 8-10 inches depth",
              "Level the soil surface",
              "Create raised beds if needed",
            ]}
          />

          <QuickGuideCard
            icon={<Droplets className="h-8 w-8 text-sky-dark" />}
            title="Watering Guide"
            items={[
              "Water at base of plants",
              "Morning watering is best",
              "Check soil moisture before watering",
              "Reduce frequency in rainy season",
              "Increase during flowering/fruiting",
            ]}
          />

          <QuickGuideCard
            icon={<Scissors className="h-8 w-8 text-soil-light" />}
            title="Tool Maintenance"
            items={[
              "Clean tools after each use",
              "Sharpen blades regularly",
              "Oil moving parts monthly",
              "Store in dry location",
              "Disinfect when used on diseased plants",
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function StepCard({
  step,
  title,
  description,
  imageSrc,
}: {
  step: number
  title: string
  description: string
  imageSrc: string
}) {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-center">
      <div className="relative flex-shrink-0 w-full md:w-1/3">
        <div className="absolute -left-4 -top-4 h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
          {step}
        </div>
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={`Step ${step}: ${title}`}
          className="w-full h-auto rounded-lg border"
        />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-medium mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <IconTag icon={<Sun className="h-4 w-4 text-sun" />} text="Full sun" />
          <IconTag icon={<Droplets className="h-4 w-4 text-sky" />} text="Regular water" />
          <IconTag icon={<Wind className="h-4 w-4" />} text="Good airflow" />
        </div>
      </div>
      <div className="flex-shrink-0">
        <Button variant="ghost" size="icon">
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

function IconTag({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-1 bg-muted px-2 py-1 rounded-full text-xs">
      {icon}
      <span>{text}</span>
    </div>
  )
}

function QuickGuideCard({
  icon,
  title,
  items,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {icon}
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-xs">{index + 1}</span>
              </div>
              <span className="text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

