"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink, TrendingUp, Calendar } from "lucide-react"
import { projects } from "@/lib/data"

const getProjectAge = (year: string) => {
  const currentYear = new Date().getFullYear()
  const projectYear = Number.parseInt(year)
  const age = currentYear - projectYear

  if (age === 0) return "Latest"
  if (age === 1) return "1 year ago"
  return `${age} years ago`
}

const getProjectMaturity = (year: string) => {
  const currentYear = new Date().getFullYear()
  const projectYear = Number.parseInt(year)
  const age = currentYear - projectYear

  if (age === 0)
    return {
      label: "Latest",
      color: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
    }
  if (age === 1)
    return {
      label: "Recent",
      color: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    }
  if (age === 2)
    return {
      label: "Mature",
      color:
        "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    }
  return {
    label: "Legacy",
    color: "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
  }
}

export function ProjectsSection() {
  // Sort projects by year (newest first)
  const sortedProjects = [...projects].sort((a, b) => Number.parseInt(b.year) - Number.parseInt(a.year))

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Projects💻</h2>
        <p className="text-base text-gray-600 dark:text-gray-400">
          A collection of projects showcasing my evolution as a developer, from recent innovations to foundational work and more to come!
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {sortedProjects.map((project, index) => {
          const maturity = getProjectMaturity(project.year)

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300 group bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
                <CardHeader className="flex-shrink-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">{getProjectAge(project.year)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs rounded border ${maturity.color}`}>{maturity.label}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                        asChild
                      >
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors text-gray-900 dark:text-gray-100 leading-tight">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Built in {project.year}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-shrink-0">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Project Evolution Timeline */}
      <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-500" />
          Project Evolution
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              year: "2021",
              focus: "Foundation",
              description: "Learning core web technologies",
              color: "text-amber-600",
            },
            { year: "2022", focus: "Frontend", description: "Mastering React & UI/UX", color: "text-purple-600" },
            { year: "2022-2023", focus: "Full-Stack", description: "Backend APIs & databases", color: "text-blue-600" },
            { year: "2024", focus: "Scale", description: "Enterprise & performance", color: "text-green-600" },
          ].map((phase, index) => (
            <motion.div
              key={phase.year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div className={`text-lg font-bold ${phase.color} mb-1`}>{phase.year}</div>
              <div className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">{phase.focus}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">{phase.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
