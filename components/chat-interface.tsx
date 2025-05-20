"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

interface ChatInterfaceProps {
  onNavigate: (section: string) => void
}

// Define the structure of the API response
interface ChatResponse {
  response: string
  section: string
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
      // Get AI response with structured output
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

      const data: ChatResponse = await response.json()

      // Add AI response to chat
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])

      // Navigate if section is specified and not 'none'
      if (data.section && data.section !== "none") {
        onNavigate(data.section)
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
        .markdown p {
          margin-bottom: 0.5rem;
        }
        .markdown ul, .markdown ol {
          margin-left: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .markdown ul {
          list-style-type: disc;
        }
        .markdown ol {
          list-style-type: decimal;
        }
        .markdown code {
          background-color: rgba(0, 0, 0, 0.1);
          padding: 0.1rem 0.2rem;
          border-radius: 0.2rem;
          font-family: monospace;
        }
        .markdown pre {
          background-color: rgba(0, 0, 0, 0.1);
          padding: 0.5rem;
          border-radius: 0.3rem;
          overflow-x: auto;
          margin-bottom: 0.5rem;
        }
        .markdown a {
          color: #3b82f6;
          text-decoration: underline;
        }
        .markdown h1, .markdown h2, .markdown h3, .markdown h4, .markdown h5, .markdown h6 {
          font-weight: bold;
          margin-top: 0.5rem;
          margin-bottom: 0.5rem;
        }
        .markdown blockquote {
          border-left: 4px solid rgba(0, 0, 0, 0.2);
          padding-left: 0.5rem;
          margin-left: 0.5rem;
          color: rgba(0, 0, 0, 0.7);
        }
        .user-markdown code, .user-markdown pre, .user-markdown blockquote {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .user-markdown {
          color: white;
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
                    ? "ml-auto bg-primary chat-message-user max-w-[85%] user-markdown"
                    : "bg-muted chat-message-assistant max-w-[90%] markdown",
                )}
                style={{ color: message.role === "user" ? "#ffffff" : "#000000" }}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {message.content}
                </ReactMarkdown>
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
