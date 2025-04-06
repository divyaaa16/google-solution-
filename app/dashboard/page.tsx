"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CloudSun, Droplets, Calendar, AlertTriangle, ThermometerSun, Wind, Umbrella, Sprout } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const [location, setLocation] = useState("Pune, Maharashtra")

  // Mock data for the dashboard
  const weatherData = {
    current: {
      temp: 28,
      humidity: 65,
      windSpeed: 12,
      condition: "Partly Cloudy",
      rainChance: 20,
    },
    forecast: [
      {
        day: "Today",
        temp: 28,
        condition: "Partly Cloudy",
        rainChance: 20,
      },
      {
        day: "Tomorrow",
        temp: 30,
        condition: "Sunny",
        rainChance: 0,
      },
      {
        day: "Wed",
        temp: 29,
        condition: "Sunny",
        rainChance: 0,
      },
      {
        day: "Thu",
        temp: 27,
        condition: "Cloudy",
        rainChance: 40,
      },
      {
        day: "Fri",
        temp: 25,
        condition: "Rain",
        rainChance: 80,
      },
    ],
  }

  const soilData = {
    moisture: 45,
    temperature: 24,
    ph: 6.5,
    nutrients: {
      nitrogen: 60,
      phosphorus: 40,
      potassium: 70,
    },
  }

  const cropData = {
    currentCrops: [
      {
        name: "Tomato",
        stage: "Flowering",
        daysToHarvest: 35,
        health: 85,
      },
      {
        name: "Wheat",
        stage: "Vegetative",
        daysToHarvest: 60,
        health: 90,
      },
    ],
    recommendations: [
      "Ideal time to sow okra in the next 5 days",
      "Consider harvesting onions within 2 weeks",
      "Good conditions for rice transplanting",
    ],
  }

  const alerts = [
    {
      type: "warning",
      title: "Rain Expected in 2 Days",
      description: "Delay pesticide application until after rainfall",
    },
    {
      type: "info",
      title: "Optimal Sowing Conditions",
      description: "Next week will be ideal for sowing maize",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Smart Dashboard</h1>
          <p className="text-muted-foreground">Current Location: {location}</p>
        </div>
        <div className="flex items-center mt-4 md:mt-0">
          <div className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-lg">
            <CloudSun className="h-5 w-5 text-sky-dark" />
            <span className="font-medium">{weatherData.current.temp}°C</span>
            <span className="text-muted-foreground">{weatherData.current.condition}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Weather Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Weather</CardTitle>
            <CloudSun className="h-5 w-5 text-sky-dark" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-3xl font-bold">{weatherData.current.temp}°C</p>
                <p className="text-muted-foreground">{weatherData.current.condition}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Droplets className="h-4 w-4 text-sky" />
                  <span>{weatherData.current.humidity}%</span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <Wind className="h-4 w-4" />
                  <span>{weatherData.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center justify-end gap-1">
                  <Umbrella className="h-4 w-4 text-sky-dark" />
                  <span>{weatherData.current.rainChance}%</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-sm font-medium">{day.day}</p>
                  <p className="text-lg font-semibold">{day.temp}°</p>
                  <p className="text-xs text-muted-foreground">{day.rainChance > 0 ? `${day.rainChance}%` : "—"}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Soil Conditions Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Soil Conditions</CardTitle>
            <Sprout className="h-5 w-5 text-leaf-dark" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Soil Moisture</span>
                  <span className="text-sm text-muted-foreground">{soilData.moisture}%</span>
                </div>
                <Progress value={soilData.moisture} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Soil Temperature</span>
                  <span className="text-sm text-muted-foreground">{soilData.temperature}°C</span>
                </div>
                <Progress value={(soilData.temperature / 40) * 100} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Soil pH</span>
                  <span className="text-sm text-muted-foreground">{soilData.ph}</span>
                </div>
                <Progress value={(soilData.ph / 14) * 100} className="h-2" />
              </div>

              <div className="pt-2">
                <p className="text-sm font-medium mb-2">Nutrient Levels</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-muted p-2 rounded-md text-center">
                    <p className="text-xs text-muted-foreground">N</p>
                    <p className="font-medium">{soilData.nutrients.nitrogen}%</p>
                  </div>
                  <div className="bg-muted p-2 rounded-md text-center">
                    <p className="text-xs text-muted-foreground">P</p>
                    <p className="font-medium">{soilData.nutrients.phosphorus}%</p>
                  </div>
                  <div className="bg-muted p-2 rounded-md text-center">
                    <p className="text-xs text-muted-foreground">K</p>
                    <p className="font-medium">{soilData.nutrients.potassium}%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Calendar Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl">Crop Calendar</CardTitle>
            <Calendar className="h-5 w-5 text-soil-light" />
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="current">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="current">Current Crops</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              </TabsList>
              <TabsContent value="current" className="space-y-4">
                {cropData.currentCrops.map((crop, index) => (
                  <div key={index} className="bg-muted p-3 rounded-lg space-y-2">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{crop.name}</h4>
                      <span className="text-sm text-muted-foreground">{crop.stage}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Days to harvest:</span>
                      <span className="font-medium">{crop.daysToHarvest}</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Health</span>
                        <span className="text-sm">{crop.health}%</span>
                      </div>
                      <Progress value={crop.health} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="recommendations">
                <ul className="space-y-2">
                  {cropData.recommendations.map((recommendation, index) => (
                    <li key={index} className="flex items-start gap-2 py-2 border-b last:border-0">
                      <div className="h-5 w-5 rounded-full bg-leaf-light/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-leaf-dark text-xs">{index + 1}</span>
                      </div>
                      <span className="text-sm">{recommendation}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      <div className="space-y-4 mb-8">
        <h2 className="text-xl font-bold">Alerts & Notifications</h2>
        {alerts.map((alert, index) => (
          <Alert key={index} variant={alert.type === "warning" ? "destructive" : "default"}>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{alert.title}</AlertTitle>
            <AlertDescription>{alert.description}</AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Farming Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Farming Tips Based on Current Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <ThermometerSun className="h-5 w-5 text-sun-dark flex-shrink-0 mt-0.5" />
              <span>With temperatures rising to 30°C tomorrow, ensure adequate irrigation for your tomato plants.</span>
            </li>
            <li className="flex items-start gap-2">
              <Umbrella className="h-5 w-5 text-sky-dark flex-shrink-0 mt-0.5" />
              <span>
                Expected rainfall on Friday. Plan your fertilizer application before the rain for better absorption.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Sprout className="h-5 w-5 text-leaf-dark flex-shrink-0 mt-0.5" />
              <span>Soil moisture is at 45%. Consider light irrigation for optimal growth of your wheat crop.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

