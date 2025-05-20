"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Calendar, MapPin, ExternalLink } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useHighlightEffect from "@/components/highlight-effects"

// Extend window interface for our debug functions
declare global {
  interface Window {
    activateFlutterTab: () => boolean;
    activateAITab: () => boolean;
  }
}

export default function ExperiencePage() {
  const searchParams = useSearchParams()
  const highlightParam = searchParams.get('highlight')
  const [activeTab, setActiveTab] = useState<string>("ai")
  
  // Use the shared highlight effect hook
  const highlightStyles = useHighlightEffect()

  useEffect(() => {
    // Special check for Flutter experience
    if (highlightParam && highlightParam.includes('sap-flutter')) {
      console.log('Flutter experience detected in URL, activating Flutter tab directly')
      setActiveTab('flutter')
    }
  }, [highlightParam])

  useEffect(() => {
    // Add utility functions to window for debugging
    const activateTabForTesting = (tabValue: string) => {
      console.log(`Manually activating ${tabValue} tab`)
      setActiveTab(tabValue)
      return true
    }
    
    // @ts-ignore - Add to window for debugging
    window.activateFlutterTab = () => activateTabForTesting('flutter')
    // @ts-ignore - Add to window for debugging
    window.activateAITab = () => activateTabForTesting('ai')
    
    if (highlightParam) {
      // Split the comma-separated list of subsections
      const highlightSections = highlightParam.split(',')
      
      // Add a small delay to ensure DOM is fully loaded
      setTimeout(() => {
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
            
            // Tab activation function with retry logic
            const activateTab = (tabValue: string, retryCount = 0, maxRetries = 5) => {
              console.log(`Attempting to activate ${tabValue} tab (attempt ${retryCount + 1})`)
              
              // Use React state to control tab (preferred method)
              setActiveTab(tabValue)
              
              // As a backup, also try DOM manipulation
              try {
                // Try multiple selector strategies
                let tabElement = document.querySelector(`[data-state="inactive"][value="${tabValue}"]`) as HTMLElement
                
                if (!tabElement) {
                  tabElement = document.querySelector(`[value="${tabValue}"]`) as HTMLElement
                  console.log(`Using fallback selector for ${tabValue} tab`)
                }
                
                if (tabElement) {
                  console.log(`Also clicking ${tabValue} tab manually`)
                  tabElement.click()
                } else if (retryCount < maxRetries) {
                  // Retry with delay if tab not found
                  console.log(`Tab element for ${tabValue} not found, retrying in 200ms...`)
                  setTimeout(() => activateTab(tabValue, retryCount + 1, maxRetries), 200)
                } else {
                  console.log(`Failed to find tab element for ${tabValue} after ${maxRetries} attempts`)
                }
              } catch (error) {
                console.error(`Error activating tab ${tabValue}:`, error)
              }
            }
            
            // If it's a tab section, activate the appropriate tab
            if (section === 'sap-ai') {
              activateTab('ai')
            } else if (section === 'sap-flutter') {
              activateTab('flutter')
            }
          } else {
            console.log("Could not find element with ID:", section)
          }
        })
      }, 100) // Small delay to ensure DOM is ready
    }
  }, [highlightParam])

  return (
    <>
      {highlightStyles}
      <BackgroundElements />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in">Experience</h1>
        <Card id="sap" className="mb-8 card-hover border border-secondary/20 animate-fade-in animate-delay-100">
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

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6 w-full justify-start bg-muted">
                <TabsTrigger value="ai" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  AI Developer
                </TabsTrigger>
                <TabsTrigger value="flutter" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                  Flutter Developer
                </TabsTrigger>
              </TabsList>
              <TabsContent id="sap-ai" value="ai" className="space-y-4">
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
              <TabsContent id="sap-flutter" value="flutter" className="space-y-4">
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

        <Card id="ziroh" className="card-hover border border-secondary/20 animate-fade-in animate-delay-200">
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
