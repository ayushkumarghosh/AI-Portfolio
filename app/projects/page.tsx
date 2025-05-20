"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function ProjectsPage() {
  const searchParams = useSearchParams()
  const highlightParam = searchParams.get('highlight')
  
  useEffect(() => {
    if (highlightParam) {
      // Split the comma-separated list of subsections
      const highlightSections = highlightParam.split(',')
      
      highlightSections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          console.log("Found element to highlight:", section)
          
          // Scroll to the first element
          if (section === highlightSections[0]) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
          
          // Add highlight effect
          element.classList.add('highlight-section')
          
          // Make the highlight flash a few times
          let flashCount = 0;
          const flashInterval = setInterval(() => {
            element.classList.toggle('highlight-flash')
            flashCount++;
            if (flashCount >= 6) {
              clearInterval(flashInterval);
            }
          }, 500);
          
          // Remove highlight after 6 seconds instead of 3
          setTimeout(() => {
            element.classList.remove('highlight-section')
            element.classList.remove('highlight-flash')
          }, 6000)
        } else {
          console.log("Could not find element with ID:", section)
        }
      })
    }
  }, [highlightParam])

  return (
    <>
      <style jsx global>{`
        .highlight-section {
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.6) !important; /* Use a hardcoded blue color */
          animation: pulse 3s ease-out;
          position: relative;
          z-index: 10;
        }
        .highlight-section::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(59, 130, 246, 0.1);
          z-index: -1;
        }
        .highlight-flash {
          background-color: rgba(59, 130, 246, 0.2) !important;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
      `}</style>
      <BackgroundElements />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in">Personal Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fade-in animate-delay-100">
            <Card id="ai-analyzer" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">AI DB Analyzer</h3>
                <p className="mb-6 text-secondary">
                  A chatbot that analyzes databases and answers user's queries through messages, tables, and graphical
                  representations.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "Pollinations AI", "Chroma DB", "SQLite"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/AI-DB-Analyzer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </CardContent>
            </Card>
          </div>
          <div className="animate-fade-in animate-delay-200">
            <Card id="ai-live" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">AI Live</h3>
                <p className="mb-6 text-secondary">
                  An imitation of google AI studio's live stream feature using only pollinations APIs.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "Pollinations AI", "Silero VAD"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/AI-Live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <Github className="h-4 w-4" />
                  <span>View on GitHub</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
