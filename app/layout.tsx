import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import PortfolioLayout from "@/components/portfolio-layout"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ayush Kumar Ghosh | Portfolio",
  description: "Portfolio website of Ayush Kumar Ghosh, Software Developer at SAP Labs India",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <PortfolioLayout>
            <div className="flex flex-col h-full">
              <Navigation />
              <main className="flex-1 overflow-auto relative">{children}</main>
            </div>
          </PortfolioLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
