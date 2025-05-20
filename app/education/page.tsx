"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function EducationPage() {
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
        <h1 className="text-4xl font-bold mb-8 text-primary animate-fade-in">Education</h1>
        <Card id="masters" className="mb-8 card-hover border border-secondary/20 animate-fade-in animate-delay-100">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">M.Tech in Software Engineering</h3>
                  <p className="text-secondary">BITS Pilani, Rajasthan</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-secondary mt-4 md:mt-0 md:ml-4">
                <Calendar className="h-4 w-4" />
                <p>2025</p>
              </div>
            </div>
            <div className="ml-12 mt-4">
              <p className="text-secondary">
                <span className="font-medium text-foreground">CGPA:</span> 6.9 (out of 10)
              </p>
            </div>
          </CardContent>
        </Card>
        <Card id="bachelors" className="card-hover border border-secondary/20 animate-fade-in animate-delay-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full mt-1">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold">B.Tech in Computer Science Engineering</h3>
                  <p className="text-secondary">Amity University Kolkata, West Bengal</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-secondary mt-4 md:mt-0 md:ml-4">
                <Calendar className="h-4 w-4" />
                <p>2023</p>
              </div>
            </div>
            <div className="ml-12 mt-4 space-y-2">
              <p className="text-secondary">
                <span className="font-medium text-foreground">CGPA:</span> 8.12 (out of 10)
              </p>
              <p className="text-secondary">Captained IT Club and hosted college events.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
