"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface TechItem {
  name: string
  icon: string
  color: string
  size: number
  speed: number
}

const techItems: TechItem[] = [
  { name: "React", icon: "⚛️", color: "#61dafb", size: 40, speed: 1 },
  { name: "TypeScript", icon: "📘", color: "#3178c6", size: 35, speed: 1.2 },
  { name: "Next.js", icon: "▲", color: "#000000", size: 30, speed: 0.8 },
  { name: "Node.js", icon: "🟢", color: "#339933", size: 35, speed: 1.1 },
  { name: "Python", icon: "🐍", color: "#3776ab", size: 32, speed: 0.9 },
  { name: "AWS", icon: "☁️", color: "#ff9900", size: 28, speed: 1.3 },
  { name: "Docker", icon: "🐳", color: "#2496ed", size: 30, speed: 1.4 },
  { name: "Git", icon: "📚", color: "#f05032", size: 25, speed: 1.5 },
]

export function TechStackOrbit() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">Tech Stack Orbit</h3>
      <div ref={containerRef} className="relative w-80 h-80 mx-auto flex items-center justify-center overflow-hidden">
        {/* Center core */}
        <div className="absolute w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center z-10">
          <span className="text-white font-bold text-sm">ME</span>
        </div>

        {/* Orbiting tech items */}
        {techItems.map((tech, index) => {
          const radius = 120 + (index % 3) * 20 // Varying orbit radii
          const initialAngle = (index * 360) / techItems.length

          return (
            <motion.div
              key={tech.name}
              className="absolute flex items-center justify-center rounded-full shadow-lg cursor-pointer group"
              style={{
                width: tech.size,
                height: tech.size,
                backgroundColor: tech.color + "20",
                border: `2px solid ${tech.color}`,
                transformOrigin: `0 ${radius}px`,
                transform: `rotate(${initialAngle}deg) translateY(-${radius}px)`,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20 / tech.speed,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
              whileHover={{ scale: 1.2 }}
            >
              <span className="text-lg" style={{ transform: "rotate(-360deg)" }}>
                {tech.icon}
              </span>

              {/* Tooltip */}
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                {tech.name}
              </div>
            </motion.div>
          )
        })}

        {/* Orbit rings */}
        {[120, 140, 160].map((radius, index) => (
          <div
            key={radius}
            className="absolute border border-gray-200 dark:border-gray-700 rounded-full opacity-30"
            style={{
              width: radius * 2,
              height: radius * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}
