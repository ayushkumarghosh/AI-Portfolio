"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import ChatInterface from "@/components/chat-interface"
import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  const navigateToSection = (section: string, subsections: string[] = []) => {
    // Map section names to routes
    const routes: Record<string, string> = {
      about: "/",
      skills: "/skills",
      experience: "/experience",
      projects: "/projects",
      education: "/education",
    }

    if (routes[section]) {
      // If subsections are provided, add them as query parameters
      if (subsections && subsections.length > 0) {
        router.push(`${routes[section]}?highlight=${subsections.join(',')}`)
      } else {
        router.push(routes[section])
      }
    }
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <ResizablePanelGroup direction="horizontal">
        {isChatOpen ? (
          <>
            <ResizablePanel defaultSize={25} minSize={20} maxSize={40} className="relative">
              <div className="absolute right-2 top-2 z-10">
                <Button variant="ghost" size="icon" onClick={() => setIsChatOpen(false)} aria-label="Close chat">
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <ChatInterface onNavigate={navigateToSection} />
            </ResizablePanel>
            <ResizableHandle withHandle className="bg-secondary/20 hover:bg-secondary/30" />
          </>
        ) : (
          <div className="fixed bottom-4 left-4 z-10">
            <Button onClick={() => setIsChatOpen(true)} className="rounded-full shadow-lg" aria-label="Open chat">
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </Button>
          </div>
        )}
        <ResizablePanel defaultSize={isChatOpen ? 75 : 100}>
          <div className="h-full overflow-auto">{children}</div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
