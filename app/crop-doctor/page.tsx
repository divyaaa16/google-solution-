"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Upload, Volume2, VolumeX, AlertCircle, CheckCircle2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CropDoctorPage() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const [language, setLanguage] = useState("en")
  const [isPlaying, setIsPlaying] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  // Mock diagnosis results for demo
  const mockDiagnosis: DiagnosisResult = {
    disease: "Tomato Late Blight",
    confidence: 92,
    description:
      "Late blight is a fungal disease that affects tomato plants, causing dark lesions on leaves and stems.",
    treatment: [
      "Remove and destroy infected plant parts",
      "Apply copper-based fungicide",
      "Ensure proper spacing between plants for air circulation",
      "Water at the base of plants to avoid wetting foliage",
    ],
    preventiveMeasures: [
      "Use disease-resistant varieties",
      "Rotate crops annually",
      "Apply preventive fungicide during humid weather",
      "Keep garden free of plant debris",
    ],
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setResult(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCameraCapture = async () => {
    try {
      if (streamRef.current) {
        // If camera is already open, take a picture
        if (videoRef.current) {
          const canvas = document.createElement("canvas")
          canvas.width = videoRef.current.videoWidth
          canvas.height = videoRef.current.videoHeight
          const ctx = canvas.getContext("2d")
          ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL("image/jpeg")
          setImage(dataUrl)

          // Stop the camera stream
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
          setResult(null)
        }
      } else {
        // Open the camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("Could not access camera. Please check permissions.")
    }
  }

  const analyzeCrop = () => {
    if (!image) return

    setIsAnalyzing(true)
    // Simulate API call with timeout
    setTimeout(() => {
      setResult(mockDiagnosis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const toggleVoicePlayback = () => {
    // In a real app, this would use the Web Speech API or a similar service
    setIsPlaying(!isPlaying)
    // Mock implementation
    if (!isPlaying && result) {
      alert(
        `Playing voice in ${
          language === "en" ? "English" : language === "hi" ? "Hindi" : "Marathi"
        }: ${result.disease} detected. ${result.treatment.join(". ")}`,
      )
      setIsPlaying(false)
    }
  }

  const resetAnalysis = () => {
    setImage(null)
    setResult(null)
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI Crop Doctor</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Scan Your Crop</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="camera" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="camera">Camera</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="camera" className="space-y-4">
                <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                  {streamRef.current ? (
                    <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                  ) : image ? (
                    <img src={image || "/placeholder.svg"} alt="Captured crop" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Camera className="h-16 w-16 text-muted-foreground opacity-50" />
                    </div>
                  )}
                </div>
                <Button onClick={handleCameraCapture} className="w-full bg-leaf hover:bg-leaf-dark">
                  <Camera className="mr-2 h-4 w-4" />
                  {streamRef.current ? "Capture Photo" : "Open Camera"}
                </Button>
              </TabsContent>
              <TabsContent value="upload" className="space-y-4">
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {image ? (
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Uploaded crop"
                      className="max-h-[300px] mx-auto object-contain"
                    />
                  ) : (
                    <>
                      <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">Click to upload or drag and drop</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG or JPEG (max. 5MB)</p>
                    </>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/jpg"
                    className="hidden"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-4">
              <Button onClick={analyzeCrop} disabled={!image || isAnalyzing} className="flex-1 bg-primary">
                {isAnalyzing ? "Analyzing..." : "Analyze Crop"}
              </Button>
              <Button onClick={resetAnalysis} variant="outline" className="flex-1">
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Diagnosis Results</CardTitle>
            <div className="flex items-center gap-2">
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
              <Button variant="ghost" size="icon" onClick={toggleVoicePlayback} disabled={!result}>
                {isPlaying ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                <span className="sr-only">{isPlaying ? "Stop voice" : "Play voice"}</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                  <h3 className="text-xl font-semibold">{result.disease}</h3>
                  <span className="ml-auto bg-primary/10 text-primary px-2 py-1 rounded-full text-sm">
                    {result.confidence}% confidence
                  </span>
                </div>

                <p className="text-muted-foreground">{result.description}</p>

                <div>
                  <h4 className="font-medium mb-2">Treatment Recommendations:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.treatment.map((item, index) => (
                      <li key={index} className="text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Preventive Measures:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {result.preventiveMeasures.map((item, index) => (
                      <li key={index} className="text-muted-foreground">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important Note</AlertTitle>
                  <AlertDescription>
                    This is an AI-powered diagnosis. For critical cases, please consult with your local agricultural
                    extension officer.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground opacity-50" />
                <p className="mt-4 text-muted-foreground">Upload or capture an image of your crop to get a diagnosis</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface DiagnosisResult {
  disease: string
  confidence: number
  description: string
  treatment: string[]
  preventiveMeasures: string[]
}

