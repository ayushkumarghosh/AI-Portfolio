"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import useHighlightEffect from "@/components/highlight-effects"

export default function ProjectsPage() {
  // Use the shared highlight effect hook
  const highlightStyles = useHighlightEffect()

  return (
    <>
      {highlightStyles}
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
          <div className="animate-fade-in animate-delay-300">
            <Card id="ai-ecommerce-scraper" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">AI-Assisted Ecommerce Scraper</h3>
                <p className="mb-6 text-secondary">
                  An advanced web scraping tool that uses AI to extract product data from various e-commerce websites. It handles website navigation, data extraction, and processing automatically.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "BeautifulSoup", "NER", "Machine Learning"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/AI-Assisted-Ecommerce-Scraper"
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
          <div className="animate-fade-in animate-delay-400">
            <Card id="habit-tracker" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Habit Tracker</h3>
                <p className="mb-6 text-secondary">
                  A minimalist application for tracking daily habits and building consistent routines. Features include streak tracking, data visualization, and progress analytics.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "TypeScript", "Local Storage", "Chart.js"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Habit-Tracker"
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
          <div className="animate-fade-in animate-delay-500">
            <Card id="recipe-finder" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Recipe Finder</h3>
                <p className="mb-6 text-secondary">
                  A web application that helps users find recipes based on ingredients they already have. Features include recipe search, favorites, and detailed cooking instructions.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["JavaScript", "API Integration", "React", "Responsive Design"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Recipe-Finder"
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
          <div className="animate-fade-in animate-delay-600">
            <Card id="kanban-task-board" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Kanban Task Board</h3>
                <p className="mb-6 text-secondary">
                  A drag-and-drop task management system based on the Kanban methodology. Helps visualize workflow, limit work-in-progress, and maximize efficiency.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "Redux", "DnD", "Local Storage"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Kanban-Task-Board"
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
          <div className="animate-fade-in animate-delay-700">
            <Card id="expense-splitter" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Expense Splitter</h3>
                <p className="mb-6 text-secondary">
                  An application to track and split expenses among friends or roommates. Calculates who owes whom and simplifies debt settlement.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React Native", "Firebase", "Authentication", "Cloud Functions"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Expense-Splitter"
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
          <div className="animate-fade-in animate-delay-800">
            <Card id="ai-daily-planner" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">AI Daily Planner</h3>
                <p className="mb-6 text-secondary">
                  A smart daily planner that uses AI to optimize your schedule, suggest task prioritization, and improve productivity based on your working patterns.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "GPT-4 API", "TensorFlow", "Calendar Integration"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/AI-Daily-Planner"
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
          <div className="animate-fade-in animate-delay-900">
            <Card id="ai-meeting-summary-tool" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">AI Meeting Summary Tool</h3>
                <p className="mb-6 text-secondary">
                  An AI-powered application that transcribes meeting recordings, identifies key points, action items, and generates concise summaries.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "Whisper API", "NLP", "React"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/AI-Meeting-Summary-Tool"
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
          <div className="animate-fade-in animate-delay-1000">
            <Card id="ai-powered-markdown-blog" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">AI-Powered Markdown Blog</h3>
                <p className="mb-6 text-secondary">
                  A markdown-based blogging platform with AI features like topic suggestions, content enhancement, and SEO optimization tools.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Next.js", "OpenAI API", "MDX", "Tailwind CSS"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/AI-Powered-Markdown-Blog"
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
          <div className="animate-fade-in animate-delay-1100">
            <Card id="blog-cms-frontend" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Blog CMS Frontend</h3>
                <p className="mb-6 text-secondary">
                  A modern, responsive frontend for a blog content management system with rich text editing, image handling, and user management features.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "Redux", "TinyMCE", "Styled Components"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Blog-CMS-Frontend"
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
          <div className="animate-fade-in animate-delay-1200">
            <Card id="expense-tracker-api" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Expense Tracker API</h3>
                <p className="mb-6 text-secondary">
                  A RESTful API for tracking expenses with features like categorization, budget limits, reports, and multi-user support.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Node.js", "Express", "MongoDB", "JWT Authentication"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Expense-Tracker-API"
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
          <div className="animate-fade-in animate-delay-1300">
            <Card id="github-profile-visualizer" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">GitHub Profile Visualizer</h3>
                <p className="mb-6 text-secondary">
                  A web application that creates visual representations of GitHub profiles, highlighting repositories, contributions, and activity trends.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "D3.js", "GitHub API", "Chart.js"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/GitHub-Profile-Visualizer"
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
          <div className="animate-fade-in animate-delay-1400">
            <Card id="notes-app-backend" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Notes App Backend</h3>
                <p className="mb-6 text-secondary">
                  A robust backend for a notes application with features like user authentication, note CRUD operations, tagging, and search functionality.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Node.js", "Express", "MongoDB", "RESTful API"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Notes-App-Backend"
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
          <div className="animate-fade-in animate-delay-1500">
            <Card id="personal-knowledge-base" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Personal Knowledge Base</h3>
                <p className="mb-6 text-secondary">
                  A personal knowledge management system with note-taking, concept linking, and knowledge graph visualization to build a digital second brain.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["React", "D3.js", "IndexedDB", "Markdown"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Personal-Knowledge-Base"
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
          <div className="animate-fade-in animate-delay-1600">
            <Card id="resume-analyzer" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Resume Analyzer</h3>
                <p className="mb-6 text-secondary">
                  An AI-powered tool that analyzes resumes, extracts key information, and provides suggestions for improvements based on job postings.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Python", "NLP", "Flask", "PyPDF2"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Resume-Analyzer"
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
          <div className="animate-fade-in animate-delay-1700">
            <Card id="url-shortener" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">URL Shortener</h3>
                <p className="mb-6 text-secondary">
                  A service that creates shortened URLs with analytics tracking for click-through rates, geographic data, and referrer information.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Express", "MongoDB", "Redis", "Analytics"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/URL-Shortener"
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
          <div className="animate-fade-in animate-delay-1800">
            <Card id="webhook-listener" className="card-hover border border-secondary/20 h-full">
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold mb-3 text-primary">Webhook Listener</h3>
                <p className="mb-6 text-secondary">
                  A configurable webhook receiver service that processes incoming events, validates payloads, and triggers customizable actions or notifications.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["Node.js", "Express", "WebSockets", "Queue System"].map((tech) => (
                    <Badge key={tech} variant="secondary" className="bg-secondary text-white">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <a
                  href="https://github.com/ayushkumarghosh/Webhook-Listener"
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
