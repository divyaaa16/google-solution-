"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Bug, Filter, Upload, AlertTriangle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"

export default function PestMapPage() {
  const [cropFilter, setCropFilter] = useState("all")
  const [pestFilter, setPestFilter] = useState("all")
  const [timeRange, setTimeRange] = useState([30]) // Days in the past

  // Mock data for pest outbreaks
  const pestOutbreaks = [
    {
      id: 1,
      location: "Nashik, Maharashtra",
      crop: "tomato",
      pest: "whitefly",
      severity: "high",
      reportedDays: 5,
      lat: 19.9975,
      lng: 73.7898,
    },
    {
      id: 2,
      location: "Pune, Maharashtra",
      crop: "sugarcane",
      pest: "aphid",
      severity: "medium",
      reportedDays: 12,
      lat: 18.5204,
      lng: 73.8567,
    },
    {
      id: 3,
      location: "Nagpur, Maharashtra",
      crop: "cotton",
      pest: "bollworm",
      severity: "high",
      reportedDays: 8,
      lat: 21.1458,
      lng: 79.0882,
    },
    {
      id: 4,
      location: "Amravati, Maharashtra",
      crop: "soybean",
      pest: "caterpillar",
      severity: "low",
      reportedDays: 20,
      lat: 20.932,
      lng: 77.7523,
    },
    {
      id: 5,
      location: "Kolhapur, Maharashtra",
      crop: "rice",
      pest: "stem borer",
      severity: "medium",
      reportedDays: 15,
      lat: 16.705,
      lng: 74.2433,
    },
    {
      id: 6,
      location: "Aurangabad, Maharashtra",
      crop: "cotton",
      pest: "aphid",
      severity: "low",
      reportedDays: 25,
      lat: 19.8762,
      lng: 75.3433,
    },
    {
      id: 7,
      location: "Solapur, Maharashtra",
      crop: "sugarcane",
      pest: "mealybug",
      severity: "high",
      reportedDays: 3,
      lat: 17.6599,
      lng: 75.9064,
    },
  ]

  // Filter outbreaks based on selected filters
  const filteredOutbreaks = pestOutbreaks.filter((outbreak) => {
    const matchesCrop = cropFilter === "all" || outbreak.crop === cropFilter
    const matchesPest = pestFilter === "all" || outbreak.pest === pestFilter
    const matchesTime = outbreak.reportedDays <= timeRange[0]
    return matchesCrop && matchesPest && matchesTime
  })

  // Get unique crops and pests for filters
  const crops = [...new Set(pestOutbreaks.map((o) => o.crop))]
  const pests = [...new Set(pestOutbreaks.map((o) => o.pest))]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Pest Heatmap</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Crop Type</label>
                <Select value={cropFilter} onValueChange={setCropFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Crops</SelectItem>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop.charAt(0).toUpperCase() + crop.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Pest Type</label>
                <Select value={pestFilter} onValueChange={setPestFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Pests</SelectItem>
                    {pests.map((pest) => (
                      <SelectItem key={pest} value={pest}>
                        {pest.charAt(0).toUpperCase() + pest.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Time Range</label>
                  <span className="text-sm text-muted-foreground">Last {timeRange[0]} days</span>
                </div>
                <Slider defaultValue={[30]} max={60} min={1} step={1} value={timeRange} onValueChange={setTimeRange} />
              </div>

              <Button className="w-full bg-primary">Apply Filters</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Report Pest
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Help other farmers by reporting pest sightings in your area.
              </p>
              <Button className="w-full">Report New Pest Sighting</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Legend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500"></span>
                  <span className="text-sm">High Severity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-amber-500"></span>
                  <span className="text-sm">Medium Severity</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-green-500"></span>
                  <span className="text-sm">Low Severity</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Pest Outbreak Map</span>
                <Badge variant="outline">{filteredOutbreaks.length} outbreaks found</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden mb-4">
                {/* This would be replaced with an actual map component in a real app */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map would be displayed here</p>
                </div>

                {/* Simulated map markers */}
                {filteredOutbreaks.map((outbreak) => {
                  // Calculate position based on lat/lng (simplified for demo)
                  const left = ((outbreak.lng - 73) / 7) * 100
                  const top = (1 - (outbreak.lat - 16) / 6) * 100

                  return (
                    <TooltipProvider key={outbreak.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div
                            className={`absolute w-4 h-4 rounded-full flex items-center justify-center cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${
                              outbreak.severity === "high"
                                ? "bg-red-500"
                                : outbreak.severity === "medium"
                                  ? "bg-amber-500"
                                  : "bg-green-500"
                            }`}
                            style={{
                              left: `${Math.min(Math.max(left, 5), 95)}%`,
                              top: `${Math.min(Math.max(top, 5), 95)}%`,
                            }}
                          >
                            <Bug className="h-2.5 w-2.5 text-white" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="space-y-1">
                            <p className="font-medium">{outbreak.location}</p>
                            <p className="text-xs">
                              Crop: {outbreak.crop.charAt(0).toUpperCase() + outbreak.crop.slice(1)}
                            </p>
                            <p className="text-xs">
                              Pest: {outbreak.pest.charAt(0).toUpperCase() + outbreak.pest.slice(1)}
                            </p>
                            <p className="text-xs">Reported: {outbreak.reportedDays} days ago</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )
                })}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Recent Outbreaks</h3>
                <div className="space-y-2">
                  {filteredOutbreaks.length > 0 ? (
                    filteredOutbreaks
                      .sort((a, b) => a.reportedDays - b.reportedDays)
                      .slice(0, 5)
                      .map((outbreak) => (
                        <div key={outbreak.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                outbreak.severity === "high"
                                  ? "bg-red-500"
                                  : outbreak.severity === "medium"
                                    ? "bg-amber-500"
                                    : "bg-green-500"
                              }`}
                            ></div>
                            <div>
                              <p className="font-medium text-sm">{outbreak.location}</p>
                              <p className="text-xs text-muted-foreground">
                                {outbreak.crop.charAt(0).toUpperCase() + outbreak.crop.slice(1)} |{" "}
                                {outbreak.pest.charAt(0).toUpperCase() + outbreak.pest.slice(1)}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {outbreak.reportedDays}d ago
                          </Badge>
                        </div>
                      ))
                  ) : (
                    <div className="flex items-center justify-center p-8 text-center">
                      <div>
                        <AlertTriangle className="h-8 w-8 text-muted-foreground opacity-40 mx-auto mb-2" />
                        <p className="text-muted-foreground">No pest outbreaks match your current filters</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

