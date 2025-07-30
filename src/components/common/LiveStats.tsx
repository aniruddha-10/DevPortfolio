"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Coffee, Code, Clock, Zap } from "lucide-react"

interface Stat {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  unit: string
  color: string
  increment: number
}

const initialStats: Stat[] = [
  { icon: Code, label: "Lines of Code", value: 127543, unit: "", color: "text-blue-500", increment: 1 },
  { icon: Coffee, label: "Cups of Coffee", value: 287, unit: "", color: "text-amber-500", increment: 0.1 },
  { icon: Clock, label: "Hours Coding", value: 5897, unit: " h", color: "text-green-500", increment: 0.5 },
  { icon: Zap, label: "Projects Built", value: 10, unit: "", color: "text-purple-500", increment: 0.01 },
]

export function LiveStats() {
  const [stats, setStats] = useState(initialStats)

  // Removed the useEffect that was incrementing values every 2 seconds

  const formatValue = (value: number, unit: string) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M${unit}`
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K${unit}`
    } else {
      return `${Math.floor(value)}${unit}`
    }
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center"
        >
          <div className={`${stat.color} mb-2 flex justify-center`}>
            <stat.icon className="h-6 w-6" />
          </div>
          <motion.div
            key={stat.value}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-mono"
          >
            {formatValue(stat.value, stat.unit)}
          </motion.div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}
