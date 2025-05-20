"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { name: "About", path: "/" },
    { name: "Skills", path: "/skills" },
    { name: "Experience", path: "/experience" },
    { name: "Projects", path: "/projects" },
    { name: "Education", path: "/education" },
  ]

  return (
    <nav className="sticky top-0 z-10 border-b border-secondary/20 bg-background/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">AI Portfolio</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "relative transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-foreground/60",
                )}
              >
                {pathname === item.path && (
                  <motion.span
                    className="absolute -bottom-[1.5px] left-0 h-[2px] w-full bg-primary"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>

        <div className="flex md:hidden">
          <nav className="flex items-center space-x-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === item.path ? "text-primary" : "text-foreground/60",
                )}
              >
                {item.name.substring(0, 3)}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  )
}
