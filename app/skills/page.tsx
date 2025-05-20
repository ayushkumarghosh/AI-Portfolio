"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Cloud } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import useHighlightEffect from "@/components/highlight-effects"
import { Suspense } from "react"

// Create a client component that uses the highlight effect
function HighlightEffectWrapper() {
  const highlightStyles = useHighlightEffect()
  return highlightStyles
}

export default function SkillsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <HighlightEffectWrapper />
      </Suspense>
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
