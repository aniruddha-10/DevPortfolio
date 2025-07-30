"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Palette, Lightbulb } from "lucide-react"

const moods = [
  { emoji: "🚀", label: "Innovative", color: "from-blue-400 to-purple-600" },
  { emoji: "⚡", label: "Energetic", color: "from-yellow-400 to-orange-500" },
  { emoji: "🎯", label: "Focused", color: "from-green-400 to-blue-500" },
  { emoji: "🌟", label: "Creative", color: "from-pink-400 to-purple-500" },
  { emoji: "🔥", label: "Passionate", color: "from-red-400 to-pink-500" },
  { emoji: "🌊", label: "Calm", color: "from-blue-300 to-teal-400" },
]

const inspirations = [
  "Clean, minimal design",
  "Smooth animations",
  "User-first approach",
  "Performance matters",
  "Accessibility for all",
  "Modern technologies",
]

export function MoodBoard() {
  const [selectedMood, setSelectedMood] = useState(0)
  const [currentInspiration, setCurrentInspiration] = useState(0)

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Palette className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Current Vibe</h3>
      </div>

      <div className="space-y-6">
        {/* Mood selector */}
        <div className="grid grid-cols-3 gap-3">
          {moods.map((mood, index) => (
            <motion.button
              key={mood.label}
              onClick={() => setSelectedMood(index)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedMood === index
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-950/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{mood.emoji}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{mood.label}</div>
            </motion.button>
          ))}
        </div>

        {/* Selected mood display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMood}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`p-6 rounded-lg bg-gradient-to-r ${moods[selectedMood].color} text-white text-center`}
          >
            <div className="text-4xl mb-2">{moods[selectedMood].emoji}</div>
            <div className="text-xl font-semibold mb-2">Feeling {moods[selectedMood].label}</div>
            <div className="text-sm opacity-90">Ready to create something amazing!</div>
          </motion.div>
        </AnimatePresence>

        {/* Inspiration ticker */}
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Design Philosophy</span>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentInspiration}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 dark:text-gray-400 italic"
              onAnimationComplete={() => {
                setTimeout(() => {
                  setCurrentInspiration((prev) => (prev + 1) % inspirations.length)
                }, 2000)
              }}
            >
              "{inspirations[currentInspiration]}"
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
