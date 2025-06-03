"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import useHighlightEffect from "@/components/highlight-effects"
import { Suspense, useState, useEffect } from "react"

// Create a client component that uses the highlight effect
function HighlightEffectWrapper() {
  const highlightStyles = useHighlightEffect()
  return highlightStyles
}

export default function ProjectsPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // Use a longer delay to ensure all styles and DOM are fully ready
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 300)
    
    return () => clearTimeout(timer)
  }, [])
  
  return (
    <>
      <Suspense fallback={null}>
        <HighlightEffectWrapper />
      </Suspense>
      <BackgroundElements />
      <div className={`page-transition-wrapper ${isLoaded ? 'loaded' : ''}`}>
        <div className="container mx-auto py-12 px-4 md:px-6">
          <h1 className="text-4xl font-bold mb-8 text-primary">Personal Projects</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
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
            <div>
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
            <div>
              <Card id="ai-ecommerce-scraper" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">AI-Assisted Ecommerce Scraper</h3>
                  <p className="mb-6 text-secondary">
                    An advanced web scraping tool that uses AI to extract product data from various e-commerce websites. It handles website navigation, data extraction, and processing automatically.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Python", "BeautifulSoup", "Gemini API"].map((tech) => (
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
            <div>
              <Card id="habit-tracker" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Habit Tracker</h3>
                  <p className="mb-6 text-secondary">
                    Track daily habits with progress visualization. A minimalist application for building consistent routines with streak tracking and analytics.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Flutter", "SQLite", "Firebase"].map((tech) => (
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
            <div>
              <Card id="recipe-finder" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Recipe Finder</h3>
                  <p className="mb-6 text-secondary">
                    Input ingredients to fetch recipes from an API. Find recipes based on ingredients you already have, with favorites and detailed cooking instructions.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Flutter", "Spoonacular API"].map((tech) => (
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
            <div>
              <Card id="expense-splitter" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">QR Code Expense Splitter</h3>
                  <p className="mb-6 text-secondary">
                    Enter bill details, generate QR codes to split expenses with UPI links. Simplifies debt settlement among friends or roommates.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Flutter", "QR Code Generator"].map((tech) => (
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
            <div>
              <Card id="kanban-task-board" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Kanban Task Board</h3>
                  <p className="mb-6 text-secondary">
                    Trello-like task board with drag and drop functionality. Helps visualize workflow, limit work-in-progress, and maximize efficiency.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Zustand", "Firebase"].map((tech) => (
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
            <div>
              <Card id="ai-daily-planner" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">AI Daily Planner</h3>
                  <p className="mb-6 text-secondary">
                    Mobile/Web app where users add goals and AI generates a daily plan. Optimizes schedules and improves productivity based on working patterns.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Node.js"].map((tech) => (
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
            <div>
              <Card id="ai-meeting-summary-tool" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">AI Meeting Summary Tool</h3>
                  <p className="mb-6 text-secondary">
                    Upload audio or transcript to get summary, action points, and sentiment analysis. Transcribes meeting recordings and identifies key information.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Whisper API"].map((tech) => (
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
            <div>
              <Card id="ai-powered-markdown-blog" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">AI-Powered Markdown Blog</h3>
                  <p className="mb-6 text-secondary">
                    Gemini helps write blog posts which can be saved, published, and viewed. Features topic suggestions, content enhancement, and SEO optimization.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "Gemini API"].map((tech) => (
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
            <div>
              <Card id="blog-cms-frontend" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Blog CMS Frontend</h3>
                  <p className="mb-6 text-secondary">
                    Create, edit, and publish markdown blogs. A modern, responsive frontend for a blog content management system.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Markdown Editor"].map((tech) => (
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
            <div>
              <Card id="expense-tracker-api" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Expense Tracker API</h3>
                  <p className="mb-6 text-secondary">
                    CRUD for transactions and category-wise reports. A RESTful API for tracking expenses with budget limits and multi-user support.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Spring Boot", "PostgreSQL", "Swagger"].map((tech) => (
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
            <div>
              <Card id="github-profile-visualizer" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">GitHub Profile Visualizer</h3>
                  <p className="mb-6 text-secondary">
                    Input GitHub username to show stats and activity graphs. Highlights repositories, contributions, and activity trends.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "GitHub GraphQL API"].map((tech) => (
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
            <div>
              <Card id="notes-app-backend" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Notes App with JWT Auth</h3>
                  <p className="mb-6 text-secondary">
                    API for taking notes with user login. Features note CRUD operations, tagging, and search functionality.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Spring Boot", "Spring Security", "PostgreSQL"].map((tech) => (
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
            <div>
              <Card id="personal-knowledge-base" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Personal Knowledge Base</h3>
                  <p className="mb-6 text-secondary">
                    Store and query notes with natural language. A personal knowledge management system with concept linking and knowledge graph visualization.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Spring Boot", "Gemini API"].map((tech) => (
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
            <div>
              <Card id="resume-analyzer" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Resume Analyzer</h3>
                  <p className="mb-6 text-secondary">
                    Upload resume (PDF), get feedback on formatting, grammar, and match with a job JD. Extracts key information and provides suggestions for improvements.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Next.js", "TypeScript", "Tailwind CSS", "Gemini API", "Node.js"].map((tech) => (
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
            <div>
              <Card id="url-shortener" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">URL Shortener</h3>
                  <p className="mb-6 text-secondary">
                    Simple backend for generating short URLs. Creates shortened links with optional analytics tracking.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Node.js", "Express", "MongoDB"].map((tech) => (
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
            <div>
              <Card id="webhook-listener" className="card-hover border border-secondary/20 h-full">
                <CardContent className="p-6">
                  <h3 className="text-2xl font-semibold mb-3 text-primary">Webhook Listener & Notifier</h3>
                  <p className="mb-6 text-secondary">
                    Listen to GitHub/Stripe webhooks and notify via Email/Slack. Validates payloads and triggers customizable actions.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Node.js", "Express", "Nodemailer"].map((tech) => (
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
      </div>
    </>
  )
}
