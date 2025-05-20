import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import BackgroundElements from "@/components/background-elements"

export default function ProjectsPage() {
  return (
    <>
      <BackgroundElements />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in">Personal Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="animate-fade-in animate-delay-100">
            <Card className="card-hover border border-secondary/20 h-full">
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
            <Card className="card-hover border border-secondary/20 h-full">
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
