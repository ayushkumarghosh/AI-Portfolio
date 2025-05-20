"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function BackgroundElements() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0, pointerEvents: "none" }}>
      {/* Top left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "350px",
          height: "350px",
          left: "5%",
          top: "10%",
          backgroundColor: resolvedTheme === "dark" ? "rgba(74, 173, 82, 0.2)" : "rgba(74, 173, 82, 0.2)",
          filter: "blur(80px)",
          animation: "move1 8s infinite alternate ease-in-out",
        }}
      />

      {/* Top right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          right: "10%",
          top: "15%",
          backgroundColor: resolvedTheme === "dark" ? "rgba(89, 104, 105, 0.2)" : "rgba(89, 104, 105, 0.2)",
          filter: "blur(80px)",
          animation: "move2 6s infinite alternate ease-in-out",
        }}
      />

      {/* Center */}
      <div
        className="absolute rounded-full"
        style={{
          width: "400px",
          height: "400px",
          left: "40%",
          top: "40%",
          backgroundColor: resolvedTheme === "dark" ? "rgba(74, 173, 82, 0.2)" : "rgba(74, 173, 82, 0.2)",
          filter: "blur(100px)",
          animation: "move3 10s infinite alternate ease-in-out",
        }}
      />

      {/* Bottom left */}
      <div
        className="absolute rounded-full"
        style={{
          width: "320px",
          height: "320px",
          left: "15%",
          bottom: "15%",
          backgroundColor: resolvedTheme === "dark" ? "rgba(89, 104, 105, 0.2)" : "rgba(89, 104, 105, 0.2)",
          filter: "blur(90px)",
          animation: "move4 7s infinite alternate ease-in-out",
        }}
      />

      {/* Bottom right */}
      <div
        className="absolute rounded-full"
        style={{
          width: "380px",
          height: "380px",
          right: "15%",
          bottom: "10%",
          backgroundColor: resolvedTheme === "dark" ? "rgba(74, 173, 82, 0.2)" : "rgba(74, 173, 82, 0.2)",
          filter: "blur(85px)",
          animation: "move5 9s infinite alternate ease-in-out",
        }}
      />
    </div>
  )
}
