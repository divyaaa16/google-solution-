"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplets, Info, Lightbulb } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function WaterWisePage() {
  const [cropType, setCropType] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [soilType, setSoilType] = useState("")
  const [season, setSeason] = useState("")
  const [results, setResults] = useState<WaterResults | null>(null)

  // Sample crop water requirements (liters per square meter per day)
  const cropWaterNeeds: Record<string, number> = {
    rice: 8.5,
    wheat: 4.2,
    sugarcane: 6.5,
    cotton: 5.0,
    tomato: 5.5,
    potato: 4.8,
    onion: 3.5,
    maize: 5.2,
  }

  // Soil type multipliers
  const soilMultipliers: Record<string, number> = {
    sandy: 1.2, // Sandy soils drain faster, need more water
    loam: 1.0, // Balanced soil, base multiplier
    clay: 0.8, // Clay retains water, needs less
    silt: 0.9, // Silty soil, slightly better retention than loam
  }

  // Season multipliers
  const seasonMultipliers: Record<string, number> = {
    summer: 1.3, // Higher evaporation in summer
    winter: 0.7, // Lower evaporation in winter
    monsoon: 0.5, // Rainfall reduces irrigation needs
    spring: 1.0, // Base season
  }

  const calculateWaterNeeds = () => {
    if (!cropType || !farmSize || !soilType || !season) {
      alert("Please fill all fields")
      return
    }

    const sizeInSquareMeters = Number.parseFloat(farmSize) * 4047 // 1 acre = 4047 square meters
    const baseWaterNeed = cropWaterNeeds[cropType] || 5.0 // Default if crop not found
    const soilMultiplier = soilMultipliers[soilType] || 1.0
    const seasonMultiplier = seasonMultipliers[season] || 1.0

    const dailyWaterNeed = baseWaterNeed * soilMultiplier * seasonMultiplier
    const totalDailyWater = dailyWaterNeed * sizeInSquareMeters

    // Convert to practical units
    const waterInLiters = totalDailyWater
    const waterInCubicMeters = waterInLiters / 1000

    // Calculate weekly and monthly estimates
    const weeklyWater = waterInCubicMeters * 7
    const monthlyWater = waterInCubicMeters * 30

    // Calculate water savings with different methods
    const dripSavings = waterInCubicMeters * 0.4 // 40% savings with drip
    const mulchingSavings = waterInCubicMeters * 0.25 // 25% savings with mulching

    setResults({
      dailyWater: waterInCubicMeters.toFixed(2),
      weeklyWater: weeklyWater.toFixed(2),
      monthlyWater: monthlyWater.toFixed(2),
      dripSavings: dripSavings.toFixed(2),
      mulchingSavings: mulchingSavings.toFixed(2),
    })
  }

  const resetForm = () => {
    setCropType("")
    setFarmSize("")
    setSoilType("")
    setSeason("")
    setResults(null)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Water-Wise Tool</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Calculate Water Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="crop-type">Crop Type</Label>
              <Select value={cropType} onValueChange={setCropType}>
                <SelectTrigger id="crop-type">
                  <SelectValue placeholder="Select crop" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rice">Rice</SelectItem>
                  <SelectItem value="wheat">Wheat</SelectItem>
                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                  <SelectItem value="cotton">Cotton</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="onion">Onion</SelectItem>
                  <SelectItem value="maize">Maize</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="farm-size">Farm Size (acres)</Label>
              <Input
                id="farm-size"
                type="number"
                min="0.1"
                step="0.1"
                placeholder="Enter farm size in acres"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soil-type">Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger id="soil-type">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="loam">Loam</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="season">Current Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                  <SelectItem value="monsoon">Monsoon</SelectItem>
                  <SelectItem value="spring">Spring</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 pt-4">
              <Button onClick={calculateWaterNeeds} className="flex-1 bg-sky-dark hover:bg-sky text-white">
                Calculate
              </Button>
              <Button onClick={resetForm} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-5 w-5 text-sky-dark" />
              Water Requirements
            </CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-sky-dark/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Daily</p>
                    <p className="text-2xl font-bold text-sky-dark">{results.dailyWater}</p>
                    <p className="text-xs text-muted-foreground">cubic meters</p>
                  </div>
                  <div className="bg-sky-dark/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Weekly</p>
                    <p className="text-2xl font-bold text-sky-dark">{results.weeklyWater}</p>
                    <p className="text-xs text-muted-foreground">cubic meters</p>
                  </div>
                  <div className="bg-sky-dark/10 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Monthly</p>
                    <p className="text-2xl font-bold text-sky-dark">{results.monthlyWater}</p>
                    <p className="text-xs text-muted-foreground">cubic meters</p>
                  </div>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-sun-dark" />
                    Water Saving Opportunities
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>With drip irrigation:</span>
                      <span className="font-medium text-sky-dark">Save {results.dripSavings} m³/day</span>
                    </li>
                    <li className="flex justify-between">
                      <span>With mulching:</span>
                      <span className="font-medium text-sky-dark">Save {results.mulchingSavings} m³/day</span>
                    </li>
                  </ul>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="tips">
                    <AccordionTrigger>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Water Conservation Tips
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>• Irrigate during early morning or evening to reduce evaporation</li>
                        <li>• Consider installing a rainwater harvesting system</li>
                        <li>• Use mulch around plants to retain soil moisture</li>
                        <li>• Monitor soil moisture regularly to avoid over-watering</li>
                        <li>• Maintain irrigation systems to prevent leaks and wastage</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-12 text-center">
                <Droplets className="h-16 w-16 text-muted-foreground opacity-20 mb-4" />
                <p className="text-muted-foreground">
                  Fill in the form and click Calculate to see your crop's water requirements
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface WaterResults {
  dailyWater: string
  weeklyWater: string
  monthlyWater: string
  dripSavings: string
  mulchingSavings: string
}

