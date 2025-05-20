"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Calendar } from "lucide-react"
import BackgroundElements from "@/components/background-elements"
import useHighlightEffect from "@/components/highlight-effects"
import { Suspense } from "react"

// Create a client component that uses the highlight effect
function HighlightEffectWrapper() {
  const highlightStyles = useHighlightEffect()
  return highlightStyles
}

export default function EducationPage() {
  return (
    <>
      <Suspense fallback={null}>
        <HighlightEffectWrapper />
      </Suspense>
      <BackgroundElements />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
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
      </div>
    </>
  )
}
