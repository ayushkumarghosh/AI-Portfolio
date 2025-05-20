"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface CanvasContentProps {
  activeSection: string
}

export default function CanvasContent({ activeSection }: CanvasContentProps) {
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
  }

  useEffect(() => {
    // Scroll to active section when it changes
    const sectionRef = sectionRefs[activeSection as keyof typeof sectionRefs]
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [activeSection])

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div id="about" ref={sectionRefs.about} className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Ayush Kumar Ghosh</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="flex items-center text-muted-foreground">
            <span>Bengaluru, India</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span>•</span>
          </div>
          <a href="mailto:ayushkumarghosh@gmail.com" className="text-primary hover:underline">
            ayushkumarghosh@gmail.com
          </a>
          <div className="flex items-center text-muted-foreground">
            <span>•</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <span>+91 89850 39718</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-8">
          <a
            href="https://github.com/ayushkumarghosh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ayush-ghosh-146519202"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-primary hover:underline"
          >
            LinkedIn
          </a>
        </div>
        <Card className="card-hover border border-secondary/20">
          <CardContent className="p-6">
            <p className="text-lg">
              Software Developer at SAP Labs India with expertise in AI development, full-stack development, and
              cross-platform mobile applications. Passionate about creating efficient, user-friendly solutions using
              cutting-edge technologies.
            </p>
          </CardContent>
        </Card>
      </div>

      <div id="skills" ref={sectionRefs.skills} className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Languages & Frameworks</h3>
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
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Databases & Tools</h3>
              <div className="flex flex-wrap gap-2">
                {["MySQL", "Supabase", "Firebase", "Git", "Docker", "Kubernetes", "Vercel"].map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-secondary text-white">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Cloud & AI</h3>
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

      <div id="experience" ref={sectionRefs.experience} className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Experience</h2>
        <Card className="mb-6 card-hover border border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">SAP Labs India</h3>
                <p className="text-muted-foreground">Software Developer</p>
              </div>
              <div className="text-muted-foreground mt-2 md:mt-0">
                <p>Karnataka, India • August 2023 – Present</p>
              </div>
            </div>

            <Tabs defaultValue="ai">
              <TabsList className="mb-4">
                <TabsTrigger value="ai">AI Developer</TabsTrigger>
                <TabsTrigger value="flutter">Flutter Developer</TabsTrigger>
              </TabsList>
              <TabsContent value="ai" className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Developed a GenAI based python application from scratch, capable of processing millions of rows of
                    tabular data and answering complex queries with 90%+ accuracy using Query-to-SQL and Agentic AI and
                    increased the productivity of the users by 40%.
                  </li>
                  <li>
                    Implemented dynamic, interactive visualizations (charts and graphs) to effectively communicate key
                    patterns and trends alongside AI-generated messages.
                  </li>
                  <li>
                    Implemented an agentic approach using Langgraph workflow agents to handle complex queries with
                    tool-based reasoning and step-by-step execution.
                  </li>
                  <li>
                    Reduced average response time from 13 seconds to 5 seconds through optimized prompt engineering,
                    caching strategies, and efficient tool invocation.
                  </li>
                  <li>
                    Employed OpenAI GPT-4o and LangChain for sophisticated query interpretation, semantic understanding,
                    and response generation.
                  </li>
                  <li>
                    Built a modular Python-based backend, ensuring extensibility and smooth integration with diverse
                    datasets and data formats.
                  </li>
                  <li>
                    Developed RESTful APIs using Java Spring Boot for efficient data manipulation and retrieval in SAP
                    HANA DB, ensuring optimized performance and seamless integration.
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="font-semibold">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {[
                      "Python",
                      "Langchain",
                      "Langgraph",
                      "Gen-ai-hub",
                      "Joule",
                      "SAP BTP",
                      "Fast API",
                      "Uvicorn",
                      "AI Agents",
                      "Flask",
                      "Java",
                      "SAP UI5",
                      "Cloudfoundry",
                    ].map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="flutter" className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Developed a cross-platform mobile application to centralize workplace services for SAP employees,
                    streamlining day-to-day tasks for improved convenience and efficiency.
                  </li>
                  <li>
                    Implemented services such as cafeteria food booking and employee news, consolidating multiple
                    employee needs into a single platform.
                  </li>
                  <li>
                    Built a seamless, responsive UI using Flutter and Dart, ensuring an intuitive user experience across
                    both Android and iOS devices.
                  </li>
                  <li>
                    Integrated multiple backend APIs with the frontend, enabling smooth real-time data exchange and a
                    cohesive user experience.
                  </li>
                </ul>
                <div className="mt-4">
                  <p className="font-semibold">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Flutter", "Dart", "RESTful APIS"].map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="card-hover border border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold">Ziroh Labs</h3>
                <p className="text-muted-foreground">Intern</p>
              </div>
              <div className="text-muted-foreground mt-2 md:mt-0">
                <p>Karnataka, India • January 2023 – March 2023</p>
              </div>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>Built a Python script for automated MySQL setup and configuration for clients.</li>
            </ul>
            <div className="mt-4">
              <p className="font-semibold">Tech Stack:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Python", "MySQL"].map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div id="projects" ref={sectionRefs.projects} className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Personal Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-hover border border-secondary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">AI DB Analyzer</h3>
              <p className="mb-4">
                A chatbot that analyzes databases and answers user's queries through messages, tables, and graphical
                representations.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
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
                className="text-primary hover:underline"
              >
                View on GitHub
              </a>
            </CardContent>
          </Card>
          <Card className="card-hover border border-secondary/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">AI Live</h3>
              <p className="mb-4">
                An imitation of google AI studio's live stream feature using only pollinations APIs.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
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
                className="text-primary hover:underline"
              >
                View on GitHub
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      <div id="education" ref={sectionRefs.education} className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <Card className="mb-6 card-hover border border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">M.Tech in Software Engineering</h3>
                <p className="text-muted-foreground">BITS Pilani, Rajasthan</p>
              </div>
              <div className="text-muted-foreground mt-2 md:mt-0">
                <p>2025</p>
              </div>
            </div>
            <p>CGPA: 6.9 (out of 10)</p>
          </CardContent>
        </Card>
        <Card className="card-hover border border-secondary/20">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">B.Tech in Computer Science Engineering</h3>
                <p className="text-muted-foreground">Amity University Kolkata, West Bengal</p>
              </div>
              <div className="text-muted-foreground mt-2 md:mt-0">
                <p>2023</p>
              </div>
            </div>
            <p className="mb-2">CGPA: 8.12 (out of 10)</p>
            <p>Captained IT Club and hosted college events.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
