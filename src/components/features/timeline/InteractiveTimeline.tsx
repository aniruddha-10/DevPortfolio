"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, MapPin, Award } from "lucide-react"

interface TimelineItemProps {
  item: {
    year: string
    role: string
    company: string
    description: string
    location?: string
    achievements?: string[]
    technologies?: string[]
  }
  index: number
  isExpanded: boolean
  onToggle: () => void
}

function TimelineItem({ item, index, isExpanded, onToggle }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start gap-6"
    >
      {/* Timeline dot */}
      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div
          className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all"
          onClick={onToggle}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.role}</h3>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded border border-gray-200 dark:border-gray-700">
                {item.year}
              </span>
            </div>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>

          <div className="flex items-center gap-4 mb-2">
            <p className="text-blue-600 font-medium">{item.company}</p>
            {item.location && (
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3 w-3" />
                {item.location}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-4 overflow-hidden"
              >
                {item.achievements && item.achievements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Key Achievements</h4>
                    </div>
                    <ul className="space-y-1">
                      {item.achievements.map((achievement, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2"
                        >
                          <span className="text-blue-500 mt-1">•</span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech, i) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05 }}
                          className="px-2 py-1 text-xs bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 rounded border border-blue-200 dark:border-blue-800"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

interface InteractiveTimelineProps {
  items: Array<{
    year: string
    role: string
    company: string
    description: string
    location?: string
    achievements?: string[]
    technologies?: string[]
  }>
}

export function InteractiveTimeline({ items }: InteractiveTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800"></div>

      <div className="space-y-8">
        {items.slice(0, 2).map((item, index) => (
          <TimelineItem
            key={`${item.year}-${item.company}`}
            item={item}
            index={index}
            isExpanded={expandedItems.has(index)}
            onToggle={() => toggleItem(index)}
          />
        ))}
      </div>
    </div>
  )
}
