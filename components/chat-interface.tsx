"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  onNavigate: (section: string) => void
}

export default function ChatInterface({ onNavigate }: ChatInterfaceProps) {
  // Use localStorage to persist chat messages across page navigation
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatMessages")
      return savedMessages
        ? JSON.parse(savedMessages)
        : [
            {
              role: "assistant",
              content:
                "Hi there! I'm Ayush's portfolio assistant. Ask me anything about Ayush's experience, skills, or projects!",
            },
          ]
    }
    return [
      {
        role: "assistant",
        content:
          "Hi there! I'm Ayush's portfolio assistant. Ask me anything about Ayush's experience, skills, or projects!",
      },
    ]
  })

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Save messages to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatMessages", JSON.stringify(messages))
    }
  }, [messages])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSend = async () => {
    if (input.trim() === "") return

    const userMessage = input.trim()
    setInput("")

    // Add user message to chat
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])

    setIsLoading(true)

    try {
      // Process navigation commands
      const navigationKeywords = {
        about: ["about", "who is ayush", "introduction", "bio", "home"],
        experience: ["experience", "work", "job", "sap", "ziroh"],
        skills: ["skills", "technologies", "tech stack", "programming"],
        projects: ["projects", "personal projects", "portfolio", "github"],
        education: ["education", "university", "college", "degree", "bits", "amity"],
      }

      let sectionToNavigate = null

      // Check if the message contains navigation keywords
      for (const [section, keywords] of Object.entries(navigationKeywords)) {
        if (keywords.some((keyword) => userMessage.toLowerCase().includes(keyword))) {
          sectionToNavigate = section
          break
        }
      }

      // Get AI response
      const allMessages = [...messages, { role: "user", content: userMessage }]
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: allMessages }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch response")
      }

      const data = await response.json()

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])

      // Navigate if a section was matched
      if (sectionToNavigate) {
        onNavigate(sectionToNavigate)
      }
    } catch (error) {
      console.error("Error generating response:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <style jsx>{`
        .chat-input::placeholder {
          color: #6b7280;
        }
        :global(.dark) .chat-input::placeholder {
          color: #ffffff;
        }
      `}</style>
      <div className="flex h-full flex-col bg-background border-r border-secondary/20">
        <div className="flex items-center justify-between border-b border-secondary/20 px-4 py-3">
          <h2 className="text-lg font-semibold text-primary">Chat with Portfolio</h2>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="flex flex-col gap-4 w-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2 rounded-lg px-3 py-2 text-sm break-words",
                  message.role === "user"
                    ? "ml-auto bg-primary chat-message-user max-w-[85%]"
                    : "bg-muted chat-message-assistant max-w-[90%]",
                )}
                style={{ color: message.role === "user" ? "#ffffff" : "#000000" }}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-muted max-w-[90%] flex-col gap-2 rounded-lg px-3 py-2 text-sm">
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-bounce rounded-full bg-secondary"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-secondary [animation-delay:0.2s]"></div>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-secondary [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        <div className="border-t border-secondary/20 p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask something about Ayush..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-muted/50 border-secondary/20 focus-visible:ring-primary chat-input placeholder:text-gray-500 dark:bg-white dark:placeholder:text-gray-500"
              style={{ color: "#000000" }}
            />
            <Button size="icon" disabled={isLoading} onClick={handleSend} className="bg-primary hover:bg-primary/90">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
