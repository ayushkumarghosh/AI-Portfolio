"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function GradientBackground() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-10">
      {/* Light theme gradients */}
      {resolvedTheme !== "dark" && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(74, 173, 82, 0.4) 0%, transparent 30%),
                radial-gradient(circle at 80% 30%, rgba(89, 104, 105, 0.4) 0%, transparent 40%),
                radial-gradient(circle at 40% 70%, rgba(74, 173, 82, 0.4) 0%, transparent 35%),
                radial-gradient(circle at 70% 80%, rgba(89, 104, 105, 0.4) 0%, transparent 30%)
              `,
              animation: "pulse 15s infinite alternate ease-in-out",
            }}
          />
        </>
      )}

      {/* Dark theme gradients */}
      {resolvedTheme === "dark" && (
        <>
          <div
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(74, 173, 82, 0.5) 0%, transparent 30%),
                radial-gradient(circle at 80% 30%, rgba(89, 104, 105, 0.5) 0%, transparent 40%),
                radial-gradient(circle at 40% 70%, rgba(74, 173, 82, 0.5) 0%, transparent 35%),
                radial-gradient(circle at 70% 80%, rgba(89, 104, 105, 0.5) 0%, transparent 30%)
              `,
              animation: "pulse 15s infinite alternate ease-in-out",
            }}
          />
        </>
      )}
    </div>
  )
}
