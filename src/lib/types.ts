import type React from "react"
export interface Section {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export interface Project {
  title: string
  description: string
  tech: string[]
  link: string
  year: string
}

export interface TimelineItem {
  year: string
  role: string
  company: string
  description: string
}
