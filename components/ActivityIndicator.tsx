"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Clock, Pause, Play, X } from "lucide-react"

interface ActivityIndicatorProps {
  status: "active" | "warning" | "inactive"
  timeUntilCollapse: number
  isVisible: boolean
  onExtendActivity: () => void
  onDismiss: () => void
}

export function ActivityIndicator({
  status,
  timeUntilCollapse,
  isVisible,
  onExtendActivity,
  onDismiss,
}: ActivityIndicatorProps) {
  // Debug logging
  console.log("ActivityIndicator props:", {
    status,
    timeUntilCollapse,
    isVisible,
  })

  const getStatusColor = () => {
    switch (status) {
      case "active":
        return "text-green-500"
      case "warning":
        return "text-orange-500"
      case "inactive":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "active":
        return <Play className="h-3 w-3" />
      case "warning":
        return <Clock className="h-3 w-3" />
      case "inactive":
        return <Pause className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getProgressPercentage = () => {
    if (status !== "warning" || timeUntilCollapse <= 0) return 0
    return ((10 - timeUntilCollapse) / 10) * 100
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 min-w-[280px]"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`${getStatusColor()} transition-colors`}>{getStatusIcon()}</div>
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">Activity Status</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onDismiss} className="h-6 w-6 -mt-1 -mr-1">
              <X className="h-3 w-3" />
            </Button>
          </div>

          {status === "warning" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Auto-collapse in:</span>
                <motion.span
                  key={timeUntilCollapse}
                  initial={{ scale: 1.2, color: "#f59e0b" }}
                  animate={{ scale: 1, color: timeUntilCollapse <= 3 ? "#ef4444" : "#f59e0b" }}
                  className="text-lg font-bold font-mono"
                >
                  {timeUntilCollapse}s
                </motion.span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.1 }}
                  className={`h-full rounded-full transition-colors ${
                    timeUntilCollapse <= 3 ? "bg-red-500" : timeUntilCollapse <= 5 ? "bg-orange-500" : "bg-yellow-500"
                  }`}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={onExtendActivity}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs"
                >
                  Stay Active
                </Button>
                <Button size="sm" variant="outline" onClick={onDismiss} className="text-xs bg-transparent">
                  Dismiss
                </Button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Sidebar will collapse due to inactivity
              </p>
            </div>
          )}

          {status === "active" && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Currently active</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Sidebar will auto-collapse after 30s of inactivity
              </p>
            </div>
          )}

          {status === "inactive" && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Inactive - Auto-collapsed</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">Move mouse or press any key to reactivate</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
