"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function AnimatedBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate random bubbles
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.floor(Math.random() * 200) + 100, // Random size between 100px and 300px
    positionX: Math.floor(Math.random() * 100), // Random X position (0-100%)
    positionY: Math.floor(Math.random() * 100), // Random Y position (0-100%)
    animationDuration: Math.floor(Math.random() * 40) + 40, // Random duration between 40s and 80s
    animationDelay: Math.floor(Math.random() * 10), // Random delay between 0s and 10s
  }))

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute rounded-full bubble-animation"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.positionX}%`,
            top: `${bubble.positionY}%`,
            backgroundColor: resolvedTheme === "dark" ? "rgba(74, 173, 82, 0.15)" : "rgba(89, 104, 105, 0.15)",
            filter: "blur(30px)",
            animationDuration: `${bubble.animationDuration}s`,
            animationDelay: `-${bubble.animationDelay}s`,
          }}
        />
      ))}
    </div>
  )
}
