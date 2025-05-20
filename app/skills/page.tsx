"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function SkillsPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in">Skills</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="animate-fade-in animate-delay-100">
            <Card id="languages" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Languages & Frameworks</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "Flask",
                    "FastAPI",
                    "Java",
                    "Flutter",
                    "Dart",
                    "Node",
                    "Javascript",
                    "TypeScript",
                    "NextJS",
                    "ReactJS",
                  ].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-in animate-delay-200">
            <Card id="databases" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Database className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Databases & Tools</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["MySQL", "Supabase", "Firebase", "Git", "Docker", "Kubernetes", "Vercel"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="animate-fade-in animate-delay-300">
            <Card id="cloud" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Cloud className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Cloud & AI</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Azure", "Cloud Computing", "AWS Lambda", "Generative AI", "OOP", "Microservices"].map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-secondary text-white">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-primary animate-fade-in animate-delay-400">Additional Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card id="dev-practices" className="card-hover border border-secondary/20 animate-fade-in animate-delay-500">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Development Practices</h3>
                <div className="flex flex-wrap gap-2">
                  {["Agile/Scrum", "CI/CD", "Test-Driven Development", "Microservices", "RESTful APIs", "GraphQL"].map(
                    (skill) => (
                      <Badge key={skill} variant="outline" className="border-secondary/30 text-secondary">
                        {skill}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>

            <Card id="ai-ml" className="card-hover border border-secondary/20 animate-fade-in animate-delay-600">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">AI & Machine Learning</h3>
                <div className="flex flex-wrap gap-2">
                  {["LangChain", "LangGraph", "OpenAI APIs", "Prompt Engineering", "Agentic AI", "Query-to-SQL"].map(
                    (skill) => (
                      <Badge key={skill} variant="outline" className="border-secondary/30 text-secondary">
                        {skill}
                      </Badge>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
