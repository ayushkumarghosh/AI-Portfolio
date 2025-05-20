"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Phone, MapPin, Download, Code, Database, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import BackgroundElements from "@/components/background-elements"
import useHighlightEffect from "@/components/highlight-effects"

export default function AboutPage() {
  // Use the shared highlight effect hook
  const highlightStyles = useHighlightEffect()

  return (
    <>
      {highlightStyles}
      <BackgroundElements />
      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="animate-fade-in">
          <div id="profile" className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-20"></div>
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-primary">
                  AKG
                </div>
              </div>
            </div>
            <div className="w-full md:w-2/3">
              <h1 className="text-5xl font-bold mb-4 text-primary">Ayush Kumar Ghosh</h1>
              <p className="text-xl mb-6 text-secondary">Software Developer at SAP Labs India</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <div className="flex items-center gap-2 text-secondary">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Bengaluru, India</span>
                </div>
                <a
                  href="mailto:ayushkumarghosh@gmail.com"
                  className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  <span>ayushkumarghosh@gmail.com</span>
                </a>
                <div className="flex items-center gap-2 text-secondary">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 89850 39718</span>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://github.com/ayushkumarghosh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white hover:bg-primary transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/ayush-ghosh-146519202"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center h-8 w-8 rounded-full bg-secondary text-white hover:bg-primary transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </a>
                </div>
              </div>

              <Button className="mt-2">
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </Button>
            </div>
          </div>

          <div id="bio" className="gradient-border mb-8">
            <div>
              <Card className="border-0 shadow-none">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-primary">About Me</h2>
                  <p className="text-lg leading-relaxed mb-4">
                    Software Developer at SAP Labs India with expertise in AI development, full-stack development, and
                    cross-platform mobile applications. Passionate about creating efficient, user-friendly solutions
                    using cutting-edge technologies.
                  </p>
                  <p className="text-lg leading-relaxed">
                    I specialize in building intelligent applications that leverage the latest in AI and machine
                    learning, with a focus on creating intuitive user experiences across multiple platforms.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div id="expertise" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card id="ai-expertise" className="card-hover border border-secondary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Development</h3>
                <p className="text-secondary">Building intelligent systems with modern AI frameworks and tools</p>
              </CardContent>
            </Card>

            <Card id="fullstack-expertise" className="card-hover border border-secondary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Full-Stack</h3>
                <p className="text-secondary">Creating end-to-end solutions with modern web technologies</p>
              </CardContent>
            </Card>

            <Card id="mobile-expertise" className="card-hover border border-secondary/20">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mobile Apps</h3>
                <p className="text-secondary">Developing cross-platform mobile applications with Flutter</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
