"use client"

import { Button } from "@/components/ui/button"
import { Search, Sun, Moon, ChevronLeft, ChevronRight, Wifi, WifiOff, Activity } from "lucide-react"
import { useTheme } from "next-themes"
import { sections } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  activeSection: string
  onSectionChange: (sectionId: string) => void
  isCollapsed: boolean
  isAutoCollapsed: boolean
  screenSize: "sm" | "md" | "lg" | "xl"
  activityStatus: "active" | "warning" | "inactive"
  timeUntilCollapse: number
  showActivityIndicator: boolean
  onToggleCollapse: () => void
  onSidebarHover: () => void
  onSidebarLeave: () => void
  onShowActivityIndicator: () => void
}

export function Sidebar({
  activeSection,
  onSectionChange,
  isCollapsed,
  isAutoCollapsed,
  screenSize,
  activityStatus,
  timeUntilCollapse,
  showActivityIndicator,
  onToggleCollapse,
  onSidebarHover,
  onSidebarLeave,
  onShowActivityIndicator,
}: SidebarProps) {
  const { theme, setTheme } = useTheme()

  const getActivityStatusColor = () => {
    switch (activityStatus) {
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

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 bg-gray-50 dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 z-20"
      onMouseEnter={onSidebarHover}
      onMouseLeave={onSidebarLeave}
    >
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-1 flex flex-col pt-8 pb-4 overflow-hidden">
          {/* Header */}
          <div className="px-6 mb-8 flex items-center justify-between">
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Aniruddha Khan </h1>
                   </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-1">
              {/* Activity status indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative group cursor-pointer"
                onClick={onShowActivityIndicator}
              >
                <div className="h-6 w-6 flex items-center justify-center">
                  {isAutoCollapsed ? (
                    screenSize === "lg" ? (
                      <Wifi className="h-3 w-3 text-orange-500" />
                    ) : (
                      <WifiOff className="h-3 w-3 text-blue-500" />
                    )
                  ) : (
                    <div className="relative">
                      <Activity className={`h-3 w-3 ${getActivityStatusColor()} transition-colors`} />
                      {activityStatus === "warning" && timeUntilCollapse > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full flex items-center justify-center"
                        >
                          <span className="text-[8px] font-bold text-white">{timeUntilCollapse}</span>
                        </motion.div>
                      )}
                      {activityStatus === "active" && (
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full opacity-75"
                        />
                      )}
                    </div>
                  )}
                </div>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  {isAutoCollapsed
                    ? screenSize === "lg"
                      ? "Auto-collapsed (inactive)"
                      : `Auto-collapsed (${screenSize} screen)`
                    : activityStatus === "warning"
                      ? `Collapsing in ${timeUntilCollapse}s - Click for details`
                      : activityStatus === "active"
                        ? "Active - Click for activity status"
                        : "Inactive - Click for details"}
                </div>
              </motion.div>

              <Button variant="ghost" size="icon" onClick={onToggleCollapse} className="h-8 w-8 ml-auto">
                {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Warning banner when about to collapse */}
          <AnimatePresence>
            {!isCollapsed && activityStatus === "warning" && timeUntilCollapse > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mx-4 mb-4 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-orange-500" />
                  <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                    Auto-collapse Warning
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-orange-600 dark:text-orange-400">Collapsing in:</span>
                  <motion.span
                    key={timeUntilCollapse}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    className={`text-sm font-bold font-mono ${
                      timeUntilCollapse <= 3 ? "text-red-600 dark:text-red-400" : "text-orange-600 dark:text-orange-400"
                    }`}
                  >
                    {timeUntilCollapse}s
                  </motion.span>
                </div>
                <div className="w-full bg-orange-200 dark:bg-orange-800 rounded-full h-1 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((10 - timeUntilCollapse) / 10) * 100}%` }}
                    transition={{ duration: 0.1 }}
                    className={`h-full rounded-full ${timeUntilCollapse <= 3 ? "bg-red-500" : "bg-orange-500"}`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1">
            {sections.map((section) => (
              <div key={section.id} className="relative group">
                <button
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-200 text-sm ${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 shadow-sm"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                  } ${isCollapsed ? "justify-center" : ""} ${
                    isAutoCollapsed ? "hover:scale-105" : ""
                  } ${activityStatus === "warning" ? "animate-pulse" : ""}`}
                >
                  <section.icon className="h-4 w-4 flex-shrink-0" />
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden whitespace-nowrap"
                      >
                        {section.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {section.label}
                    {isAutoCollapsed && (
                      <span className="block text-xs opacity-75 mt-1">
                        {screenSize === "lg" ? "Hover to expand" : "Click toggle to expand"}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div className="px-6 mt-8 space-y-4">
            <div className="relative group">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`w-full gap-3 text-sm transition-all duration-200 ${
                  isCollapsed ? "justify-center px-2" : "justify-start"
                } ${isAutoCollapsed ? "hover:scale-105" : ""}`}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 flex-shrink-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 flex-shrink-0" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      Toggle theme
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  Toggle theme
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 overflow-hidden"
                >
                  <Search className="h-3 w-3 flex-shrink-0" />
                  <span className="whitespace-nowrap">Press ⌘K to search</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Screen size indicator when collapsed */}
            {isCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center">
                <div className="text-xs text-gray-400 dark:text-gray-500 font-mono">{screenSize.toUpperCase()}</div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
