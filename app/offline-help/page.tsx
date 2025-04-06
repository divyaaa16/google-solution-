"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText, WifiOff, CheckCircle2, Sprout, Droplets, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function OfflineHelpPage() {
  const [downloadedGuides, setDownloadedGuides] = useState<string[]>([])

  const handleDownload = (guideId: string) => {
    if (!downloadedGuides.includes(guideId)) {
      setDownloadedGuides([...downloadedGuides, guideId])
      // In a real app, this would download the guide for offline use
      alert(`Guide "${guideId}" downloaded for offline use`)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Offline Help</h1>
          <p className="text-muted-foreground">Download guides and resources for offline use</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <WifiOff className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            All downloaded content will be available without internet
          </span>
        </div>
      </div>

      <Tabs defaultValue="guides">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="guides">Farming Guides</TabsTrigger>
          <TabsTrigger value="crops">Crop Library</TabsTrigger>
          <TabsTrigger value="tools">Offline Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="guides">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GuideCard
              id="pest-management"
              title="Pest Management"
              description="Learn how to identify and manage common crop pests without chemicals"
              size="2.4 MB"
              isDownloaded={downloadedGuides.includes("pest-management")}
              onDownload={() => handleDownload("pest-management")}
            />
            <GuideCard
              id="water-conservation"
              title="Water Conservation"
              description="Techniques to reduce water usage while maintaining crop health"
              size="1.8 MB"
              isDownloaded={downloadedGuides.includes("water-conservation")}
              onDownload={() => handleDownload("water-conservation")}
            />
            <GuideCard
              id="organic-farming"
              title="Organic Farming"
              description="Complete guide to transitioning to organic farming methods"
              size="3.5 MB"
              isDownloaded={downloadedGuides.includes("organic-farming")}
              onDownload={() => handleDownload("organic-farming")}
            />
            <GuideCard
              id="soil-health"
              title="Soil Health"
              description="How to test, maintain and improve your soil quality naturally"
              size="2.1 MB"
              isDownloaded={downloadedGuides.includes("soil-health")}
              onDownload={() => handleDownload("soil-health")}
            />
            <GuideCard
              id="seed-saving"
              title="Seed Saving"
              description="Techniques for harvesting and storing seeds for next season"
              size="1.5 MB"
              isDownloaded={downloadedGuides.includes("seed-saving")}
              onDownload={() => handleDownload("seed-saving")}
            />
            <GuideCard
              id="crop-rotation"
              title="Crop Rotation"
              description="Maximize soil health and yields with proper crop rotation"
              size="1.9 MB"
              isDownloaded={downloadedGuides.includes("crop-rotation")}
              onDownload={() => handleDownload("crop-rotation")}
            />
          </div>
        </TabsContent>

        <TabsContent value="crops">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Cereal Crops</span>
                  <Badge variant="outline">6 crops</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <CropAccordionItem
                    id="wheat"
                    name="Wheat"
                    isDownloaded={downloadedGuides.includes("wheat")}
                    onDownload={() => handleDownload("wheat")}
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Sowing Season</p>
                          <p className="font-medium">October-November</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Harvest</p>
                          <p className="font-medium">March-April</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky" />
                          <span className="text-sm">Water: Medium (450-650mm)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-sun" />
                          <span className="text-sm">Sunlight: Full sun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-leaf" />
                          <span className="text-sm">Soil: Well-drained loamy</span>
                        </div>
                      </div>
                    </div>
                  </CropAccordionItem>
                  <CropAccordionItem
                    id="rice"
                    name="Rice"
                    isDownloaded={downloadedGuides.includes("rice")}
                    onDownload={() => handleDownload("rice")}
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Sowing Season</p>
                          <p className="font-medium">June-July</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Harvest</p>
                          <p className="font-medium">November-December</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky" />
                          <span className="text-sm">Water: High (1000-1500mm)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-sun" />
                          <span className="text-sm">Sunlight: Full sun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-leaf" />
                          <span className="text-sm">Soil: Clay or clay loam</span>
                        </div>
                      </div>
                    </div>
                  </CropAccordionItem>
                  <CropAccordionItem
                    id="maize"
                    name="Maize"
                    isDownloaded={downloadedGuides.includes("maize")}
                    onDownload={() => handleDownload("maize")}
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Sowing Season</p>
                          <p className="font-medium">June-July</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Harvest</p>
                          <p className="font-medium">September-October</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky" />
                          <span className="text-sm">Water: Medium (500-800mm)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-sun" />
                          <span className="text-sm">Sunlight: Full sun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-leaf" />
                          <span className="text-sm">Soil: Well-drained loamy</span>
                        </div>
                      </div>
                    </div>
                  </CropAccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Vegetable Crops</span>
                  <Badge variant="outline">8 crops</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <CropAccordionItem
                    id="tomato"
                    name="Tomato"
                    isDownloaded={downloadedGuides.includes("tomato")}
                    onDownload={() => handleDownload("tomato")}
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Sowing Season</p>
                          <p className="font-medium">Year-round</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Harvest</p>
                          <p className="font-medium">60-80 days after planting</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky" />
                          <span className="text-sm">Water: Medium (regular)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-sun" />
                          <span className="text-sm">Sunlight: Full sun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-leaf" />
                          <span className="text-sm">Soil: Well-drained, rich</span>
                        </div>
                      </div>
                    </div>
                  </CropAccordionItem>
                  <CropAccordionItem
                    id="potato"
                    name="Potato"
                    isDownloaded={downloadedGuides.includes("potato")}
                    onDownload={() => handleDownload("potato")}
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Sowing Season</p>
                          <p className="font-medium">October-November</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Harvest</p>
                          <p className="font-medium">January-February</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky" />
                          <span className="text-sm">Water: Medium (regular)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-sun" />
                          <span className="text-sm">Sunlight: Full sun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-leaf" />
                          <span className="text-sm">Soil: Loose, well-drained</span>
                        </div>
                      </div>
                    </div>
                  </CropAccordionItem>
                  <CropAccordionItem
                    id="onion"
                    name="Onion"
                    isDownloaded={downloadedGuides.includes("onion")}
                    onDownload={() => handleDownload("onion")}
                  >
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Sowing Season</p>
                          <p className="font-medium">October-November</p>
                        </div>
                        <div className="bg-muted p-2 rounded-md">
                          <p className="text-xs text-muted-foreground">Harvest</p>
                          <p className="font-medium">February-March</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Droplets className="h-4 w-4 text-sky" />
                          <span className="text-sm">Water: Medium (regular)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4 text-sun" />
                          <span className="text-sm">Sunlight: Full sun</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Sprout className="h-4 w-4 text-leaf" />
                          <span className="text-sm">Soil: Well-drained, fertile</span>
                        </div>
                      </div>
                    </div>
                  </CropAccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Seed Rate Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Calculate the amount of seeds needed based on your field size and crop type.
                </p>
                <Button className="w-full" onClick={() => handleDownload("seed-calculator")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tool
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Fertilizer Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Determine the right amount of fertilizer based on soil test results and crop needs.
                </p>
                <Button className="w-full" onClick={() => handleDownload("fertilizer-calculator")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tool
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Pest Identification</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Visual guide to identify common pests and diseases with treatment options.
                </p>
                <Button className="w-full" onClick={() => handleDownload("pest-identification")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tool
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Crop Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Month-by-month planting and harvesting guide for your region.
                </p>
                <Button className="w-full" onClick={() => handleDownload("crop-calendar")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tool
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Calculate potential profits based on input costs, yield estimates, and market prices.
                </p>
                <Button className="w-full" onClick={() => handleDownload("profit-calculator")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tool
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Weather Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Historical weather data and seasonal patterns for your region.
                </p>
                <Button className="w-full" onClick={() => handleDownload("weather-patterns")}>
                  <Download className="mr-2 h-4 w-4" />
                  Download Tool
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function GuideCard({
  id,
  title,
  description,
  size,
  isDownloaded,
  onDownload,
}: {
  id: string
  title: string
  description: string
  size: string
  isDownloaded: boolean
  onDownload: () => void
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{size}</span>
              {isDownloaded ? (
                <Badge variant="outline" className="flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>Downloaded</span>
                </Badge>
              ) : (
                <Button size="sm" variant="outline" onClick={onDownload}>
                  <Download className="mr-1 h-3 w-3" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CropAccordionItem({
  id,
  name,
  isDownloaded,
  onDownload,
  children,
}: {
  id: string
  name: string
  isDownloaded: boolean
  onDownload: () => void
  children: React.ReactNode
}) {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className="hover:no-underline">
        <div className="flex items-center justify-between w-full pr-4">
          <span>{name}</span>
          {isDownloaded ? (
            <Badge variant="outline" className="flex items-center gap-1 ml-auto mr-2">
              <CheckCircle2 className="h-3 w-3" />
              <span>Downloaded</span>
            </Badge>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              className="ml-auto mr-2 h-7"
              onClick={(e) => {
                e.stopPropagation()
                onDownload()
              }}
            >
              <Download className="h-3 w-3" />
              <span className="sr-only">Download</span>
            </Button>
          )}
        </div>
      </AccordionTrigger>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  )
}

