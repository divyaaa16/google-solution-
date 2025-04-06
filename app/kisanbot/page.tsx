"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Mic, MicOff, Volume2, VolumeX, Bot, User } from "lucide-react"

interface Message {
  role: "user" | "bot"
  content: string
}

export default function KisanBotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: "Hello! I'm KisanBot, your farming assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("en")
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [isLoading, setIsLoading] = useState(false)
  const suggestedQueries = [
    "fertilizer for sugarcane",
    "leaf curl in brinjal",
    "when to harvest rice"
  ]

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const { getChatResponse } = await import('./gemini')
      const response = await getChatResponse(input)

      const botMessage: Message = {
        role: "bot",
        content: response,
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting response:', error)
      const errorMessage: Message = {
        role: "bot",
        content: "I apologize, but I'm having trouble processing your request right now. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const toggleRecording = () => {
    // In a real app, this would use the Web Speech API
    setIsRecording(!isRecording)
    if (isRecording) {
      // Simulate stopping recording and getting a result
      setTimeout(() => {
        setInput("How to treat leaf curl in brinjal?")
        setIsRecording(false)
      }, 1500)
    } else {
      // Simulate starting recording
      alert(`Started voice recording in ${language === "en" ? "English" : language === "hi" ? "Hindi" : "Marathi"}`)
    }
  }

  const playMessage = (message: string) => {
    // In a real app, this would use the Web Speech API
    setIsPlaying(true)
    alert(`Playing in ${language === "en" ? "English" : language === "hi" ? "Hindi" : "Marathi"}: ${message}`)
    setTimeout(() => setIsPlaying(false), 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">KisanBot</h1>
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
      </div>

      <Card className="mb-4">
        <CardContent className="p-0">
          <div className="h-[60vh] overflow-y-auto p-4">
            {messages.map((message, index) => (
              <div key={index} className={`flex mb-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start gap-2 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.role === "bot" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-6 w-6 p-0"
                        onClick={() => playMessage(message.content)}
                      >
                        {isPlaying ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                        <span className="sr-only">Read aloud</span>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleRecording}
          className={isRecording ? "bg-red-100 text-red-500" : ""}
        >
          {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          <span className="sr-only">{isRecording ? "Stop recording" : "Start recording"}</span>
        </Button>
        <Input
          placeholder={`Ask a question in ${
            language === "en" ? "English" : language === "hi" ? "Hindi" : "Marathi"
          }...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1"
        />
        <Button onClick={handleSend} disabled={!input.trim() || isLoading} className={isLoading ? "opacity-50 cursor-not-allowed" : ""}>
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-5 w-5" />
          )}
          <span className="sr-only">Send</span>
        </Button>
      </div>

      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-2">Try asking about:</p>
        <div className="flex flex-wrap gap-2">
          {suggestedQueries.map((query, index) => (
            <Button key={index} variant="outline" size="sm" onClick={() => setInput(query + "?")} className="text-xs">
              {query}?
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

interface Message {
  role: "user" | "bot"
  content: string
}

