"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, Zap, Coffee } from "lucide-react"

export function ResponseTimeIndicator() {
  const [currentHour, setCurrentHour] = useState(0)

  useEffect(() => {
    const updateHour = () => {
      const now = new Date()
      const calgaryTime = new Date(now.toLocaleString("en-US", { timeZone: "America/Edmonton" }))
      setCurrentHour(calgaryTime.getHours())
    }

    updateHour()
    const interval = setInterval(updateHour, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [])

  const getResponseInfo = () => {
    if (currentHour >= 9 && currentHour < 17) {
      return {
        status: "online",
        message: "Usually responds within 1-2 hours",
        icon: Zap,
        color: "text-green-500",
        bg: "bg-green-50 dark:bg-green-950/20",
        border: "border-green-200 dark:border-green-800",
      }
    } else if ((currentHour >= 7 && currentHour < 9) || (currentHour >= 17 && currentHour < 22)) {
      return {
        status: "away",
        message: "Usually responds within 4-6 hours",
        icon: Coffee,
        color: "text-yellow-500",
        bg: "bg-yellow-50 dark:bg-yellow-950/20",
        border: "border-yellow-200 dark:border-yellow-800",
      }
    } else {
      return {
        status: "offline",
        message: "Usually responds within 8-12 hours",
        icon: Clock,
        color: "text-gray-500",
        bg: "bg-gray-50 dark:bg-gray-800",
        border: "border-gray-200 dark:border-gray-700",
      }
    }
  }

  const responseInfo = getResponseInfo()
  const IconComponent = responseInfo.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border ${responseInfo.bg} ${responseInfo.border}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          <IconComponent className={`h-5 w-5 ${responseInfo.color}`} />
          {responseInfo.status === "online" && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          )}
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">{responseInfo.status}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{responseInfo.message}</div>
        </div>
      </div>
    </motion.div>
  )
}
