import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar } from "lucide-react"
import BackgroundElements from "@/components/background-elements"

export default function ExperiencePage() {
  return (
    <>
      <BackgroundElements />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in">Experience</h1>
        <Card className="mb-8 card-hover border border-secondary/20 animate-fade-in animate-delay-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">SAP Labs India</h3>
                  <p className="text-secondary">Software Developer</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-secondary mt-4 md:mt-0">
                <Calendar className="h-4 w-4" />
                <p>August 2023 – Present</p>
              </div>
            </div>

            <Tabs defaultValue="ai" className="w-full">
              <TabsList className="mb-6 w-full justify-start bg-muted">
                <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  AI Developer
                </TabsTrigger>
                <TabsTrigger value="flutter" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Flutter Developer
                </TabsTrigger>
              </TabsList>
              <TabsContent value="ai" className="space-y-4">
                <ul className="list-disc pl-5 space-y-3 text-secondary">
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
                <div className="mt-6 pt-4 border-t border-secondary/20">
                  <p className="font-semibold text-primary mb-3">Tech Stack:</p>
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
                      <Badge key={tech} variant="outline" className="border-secondary/30 text-secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="flutter" className="space-y-4">
                <ul className="list-disc pl-5 space-y-3 text-secondary">
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
                <div className="mt-6 pt-4 border-t border-secondary/20">
                  <p className="font-semibold text-primary mb-3">Tech Stack:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Flutter", "Dart", "RESTful APIS"].map((tech) => (
                      <Badge key={tech} variant="outline" className="border-secondary/30 text-secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="card-hover border border-secondary/20 animate-fade-in animate-delay-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <Briefcase className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">Ziroh Labs</h3>
                  <p className="text-secondary">Intern</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-secondary mt-4 md:mt-0">
                <Calendar className="h-4 w-4" />
                <p>January 2023 – March 2023</p>
              </div>
            </div>
            <ul className="list-disc pl-5 space-y-3 text-secondary">
              <li>Built a Python script for automated MySQL setup and configuration for clients.</li>
            </ul>
            <div className="mt-6 pt-4 border-t border-secondary/20">
              <p className="font-semibold text-primary mb-3">Tech Stack:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Python", "MySQL"].map((tech) => (
                  <Badge key={tech} variant="outline" className="border-secondary/30 text-secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
