"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, MapPin, Phone, Truck, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DatePicker } from "@/components/date-picker"

export default function MarketPage() {
  const [cropType, setCropType] = useState("")
  const [location, setLocation] = useState("")
  const [harvestDate, setHarvestDate] = useState<Date | undefined>(undefined)
  const [searchResults, setSearchResults] = useState<MarketResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // Mock market data
  const marketData: MarketResult[] = [
    {
      id: 1,
      marketName: "Pune APMC Market",
      distance: 12,
      price: 2450,
      priceChange: 150,
      priceDirection: "up",
      contactName: "Rajesh Sharma",
      contactPhone: "9876543210",
      transportAvailable: true,
      transportCost: 800,
    },
    {
      id: 2,
      marketName: "Nashik Wholesale Market",
      distance: 28,
      price: 2380,
      priceChange: 80,
      priceDirection: "up",
      contactName: "Sunil Patil",
      contactPhone: "9876543211",
      transportAvailable: true,
      transportCost: 1200,
    },
    {
      id: 3,
      marketName: "Solapur Farmers Market",
      distance: 35,
      price: 2500,
      priceChange: 50,
      priceDirection: "down",
      contactName: "Anand Jadhav",
      contactPhone: "9876543212",
      transportAvailable: false,
      transportCost: 0,
    },
    {
      id: 4,
      marketName: "Kolhapur Agricultural Market",
      distance: 42,
      price: 2420,
      priceChange: 100,
      priceDirection: "up",
      contactName: "Vijay Mane",
      contactPhone: "9876543213",
      transportAvailable: true,
      transportCost: 1500,
    },
  ]

  const searchMarkets = () => {
    if (!cropType || !location) {
      alert("Please select crop type and location")
      return
    }

    setIsSearching(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setSearchResults(marketData)
      setIsSearching(false)
    }, 1500)
  }

  const resetSearch = () => {
    setCropType("")
    setLocation("")
    setHarvestDate(undefined)
    setSearchResults([])
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Local Market Finder</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-soil-light" />
              Find Buyers
            </CardTitle>
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
                  <SelectItem value="soybean">Soybean</SelectItem>
                  <SelectItem value="tomato">Tomato</SelectItem>
                  <SelectItem value="potato">Potato</SelectItem>
                  <SelectItem value="onion">Onion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Your Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger id="location">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pune">Pune, Maharashtra</SelectItem>
                  <SelectItem value="nashik">Nashik, Maharashtra</SelectItem>
                  <SelectItem value="nagpur">Nagpur, Maharashtra</SelectItem>
                  <SelectItem value="aurangabad">Aurangabad, Maharashtra</SelectItem>
                  <SelectItem value="solapur">Solapur, Maharashtra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="harvest-date">Expected Harvest Date</Label>
              <DatePicker date={harvestDate} setDate={setHarvestDate} />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={searchMarkets}
                disabled={isSearching}
                className="flex-1 bg-soil-light hover:bg-soil text-white"
              >
                {isSearching ? "Searching..." : "Find Markets"}
              </Button>
              <Button onClick={resetSearch} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Market Results</span>
              {searchResults.length > 0 && <Badge variant="outline">{searchResults.length} markets found</Badge>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
              <Tabs defaultValue="price">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="price">Best Price</TabsTrigger>
                  <TabsTrigger value="distance">Nearest</TabsTrigger>
                  <TabsTrigger value="transport">Transport Available</TabsTrigger>
                </TabsList>
                <TabsContent value="price">
                  <div className="space-y-4">
                    {[...searchResults]
                      .sort((a, b) => b.price - a.price)
                      .map((market) => (
                        <MarketCard key={market.id} market={market} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="distance">
                  <div className="space-y-4">
                    {[...searchResults]
                      .sort((a, b) => a.distance - b.distance)
                      .map((market) => (
                        <MarketCard key={market.id} market={market} />
                      ))}
                  </div>
                </TabsContent>
                <TabsContent value="transport">
                  <div className="space-y-4">
                    {[...searchResults]
                      .filter((market) => market.transportAvailable)
                      .map((market) => (
                        <MarketCard key={market.id} market={market} />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground opacity-20 mb-4" />
                <p className="text-muted-foreground">Search for markets by selecting your crop and location</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Market Trends Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Current Market Trends</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MarketTrendCard crop="Wheat" price={2450} change={150} direction="up" />
          <MarketTrendCard crop="Rice" price={3200} change={80} direction="up" />
          <MarketTrendCard crop="Soybean" price={4100} change={200} direction="down" />
          <MarketTrendCard crop="Cotton" price={6500} change={300} direction="up" />
        </div>
      </div>
    </div>
  )
}

function MarketCard({ market }: { market: MarketResult }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-medium text-lg">{market.marketName}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{market.distance} km away</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1">
              <span className="text-xl font-bold">₹{market.price}</span>
              <span className="text-sm text-muted-foreground">per quintal</span>
            </div>
            <div
              className={`flex items-center text-sm ${
                market.priceDirection === "up" ? "text-green-600" : "text-red-600"
              }`}
            >
              {market.priceDirection === "up" ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              <span>
                ₹{market.priceChange} {market.priceDirection === "up" ? "up" : "down"}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-muted p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Contact Details</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span>{market.contactName}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span>{market.contactPhone}</span>
              </div>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Transport</h4>
            {market.transportAvailable ? (
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-3 w-3 text-green-600" />
                  <span className="text-green-600">Available</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Cost: </span>
                  <span>₹{market.transportCost}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-3 w-3 text-muted-foreground" />
                <span>Not available</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button variant="outline" size="sm">
            Contact Buyer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function MarketTrendCard({
  crop,
  price,
  change,
  direction,
}: {
  crop: string
  price: number
  change: number
  direction: "up" | "down"
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">{crop}</h3>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold">₹{price}</span>
          <div className={`flex items-center text-sm ${direction === "up" ? "text-green-600" : "text-red-600"}`}>
            {direction === "up" ? (
              <ArrowUpRight className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDownRight className="h-3 w-3 mr-1" />
            )}
            <span>₹{change}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Price per quintal • Updated today</p>
      </CardContent>
    </Card>
  )
}

interface MarketResult {
  id: number
  marketName: string
  distance: number
  price: number
  priceChange: number
  priceDirection: "up" | "down"
  contactName: string
  contactPhone: string
  transportAvailable: boolean
  transportCost: number
}

