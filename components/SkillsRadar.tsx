"use client"

import { useEffect, useRef } from "react"

interface Skill {
  name: string
  level: number // 0-100
  category: "frontend" | "backend" | "tools" | "soft"
}

const skills: Skill[] = [
  { name: "React", level: 95, category: "frontend" },
  { name: "TypeScript", level: 90, category: "frontend" },
  { name: "Next.js", level: 88, category: "frontend" },
  { name: "Node.js", level: 85, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "PostgreSQL", level: 75, category: "backend" },
  { name: "AWS", level: 70, category: "tools" },
  { name: "Docker", level: 78, category: "tools" },
  { name: "Leadership", level: 85, category: "soft" },
  { name: "Communication", level: 90, category: "soft" },
]

const categoryColors = {
  frontend: "#3b82f6", // blue
  backend: "#10b981", // green
  tools: "#f59e0b", // orange
  soft: "#8b5cf6", // purple
}

export function SkillsRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 40

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw concentric circles
      for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius / 5) * i
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(156, 163, 175, 0.3)"
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw skill axes
      const angleStep = (Math.PI * 2) / skills.length
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const endX = centerX + Math.cos(angle) * maxRadius
        const endY = centerY + Math.sin(angle) * maxRadius

        // Draw axis line
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = "rgba(156, 163, 175, 0.2)"
        ctx.lineWidth = 1
        ctx.stroke()

        // Draw skill point
        const skillRadius = (skill.level / 100) * maxRadius
        const skillX = centerX + Math.cos(angle) * skillRadius
        const skillY = centerY + Math.sin(angle) * skillRadius

        ctx.beginPath()
        ctx.arc(skillX, skillY, 4, 0, Math.PI * 2)
        ctx.fillStyle = categoryColors[skill.category]
        ctx.fill()

        // Draw skill label
        const labelX = centerX + Math.cos(angle) * (maxRadius + 20)
        const labelY = centerY + Math.sin(angle) * (maxRadius + 20)

        ctx.fillStyle = "#374151"
        ctx.font = "12px monospace"
        ctx.textAlign = "center"
        ctx.fillText(skill.name, labelX, labelY)
        ctx.fillText(`${skill.level}%`, labelX, labelY + 15)
      })

      // Draw connecting lines between skill points
      ctx.beginPath()
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const skillRadius = (skill.level / 100) * maxRadius
        const skillX = centerX + Math.cos(angle) * skillRadius
        const skillY = centerY + Math.sin(angle) * skillRadius

        if (index === 0) {
          ctx.moveTo(skillX, skillY)
        } else {
          ctx.lineTo(skillX, skillY)
        }
      })
      ctx.closePath()
      ctx.strokeStyle = "rgba(59, 130, 246, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
      ctx.fill()
    }

    drawRadar()
  }, [])

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">Skills Radar</h3>
      <div className="flex justify-center">
        <canvas ref={canvasRef} width={400} height={400} className="max-w-full" />
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{category}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
