"use client"

import type React from "react"

import { motion } from "framer-motion"

interface Metric {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  change: string
  positive: boolean
}

interface ProjectMetricsProps {
  metrics: Metric[]
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-center"
        >
          <div className="flex items-center justify-center mb-1">
            <metric.icon className="h-3 w-3 text-blue-500" />
          </div>
          <div className="text-sm font-bold text-gray-900 dark:text-gray-100 font-mono">{metric.value}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{metric.label}</div>
          <div className={`text-xs ${metric.positive ? "text-green-500" : "text-red-500"}`}>{metric.change}</div>
        </motion.div>
      ))}
    </div>
  )
}
