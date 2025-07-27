"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  life: number
  maxLife: number
}

interface ParticleBackgroundProps {
  particleCount?: number;
}

export function ParticleBackground({ particleCount = 50 }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (x?: number, y?: number): Particle => {
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        life: 0,
        maxLife: Math.random() * 300 + 200,
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push(createParticle())
      }
    }

    const updateParticles = () => {
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i]

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        // Mouse interaction
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Fade in/out effect
        const lifeRatio = particle.life / particle.maxLife
        if (lifeRatio < 0.1) {
          particle.opacity = (lifeRatio / 0.1) * 0.6
        } else if (lifeRatio > 0.9) {
          particle.opacity = ((1 - lifeRatio) / 0.1) * 0.6
        }

        // Boundary wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particles.splice(i, 1)
          particles.push(createParticle())
        }
      }
    }

    const drawParticles = () => {
      const particles = particlesRef.current
      const isDark = theme === "dark"

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      ctx.lineWidth = 0.5

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            const opacity = ((120 - distance) / 120) * 0.3
            ctx.globalAlpha = opacity
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      particles.forEach((particle) => {
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = isDark ? "rgba(59, 130, 246, 0.8)" : "rgba(59, 130, 246, 0.6)"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Add glow effect
        ctx.shadowColor = isDark ? "rgba(59, 130, 246, 0.5)" : "rgba(59, 130, 246, 0.3)"
        ctx.shadowBlur = 10
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0
      })

      ctx.globalAlpha = 1
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationRef.current = requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleResize = () => {
      resizeCanvas()
      initParticles()
    }

    // Initialize
    resizeCanvas()
    initParticles()
    animate()

    // Event listeners
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
    }
  }, [theme, particleCount])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
  )
}
