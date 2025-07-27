"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { ParticleBackground } from "@/components/ParticleBackground"

interface HomeSectionProps {
  setActiveSection: (section: string) => void
}

export function HomeSection({ setActiveSection }: HomeSectionProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  const fullText = "Welcome to my portfolio"

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + fullText[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, fullText])

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center items-center text-center space-y-8">
      <ParticleBackground />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6 relative z-10"
      >
        <div className="space-y-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {"Hey I am Aniruddha!👋"} 
          </motion.h1>
          <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 h-8">
            {displayText}
            <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed relative z-10"
        >
          {"Final Year CS Major @ UofC"}          
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
        className="flex flex-col sm:flex-row gap-4 relative z-10"
      >
        <Button
          onClick={() => setActiveSection("projects")}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          View My Work
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveSection("contact")}
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-8 py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Get In Touch
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="flex gap-6 mt-8 relative z-10"
      >
        <motion.a
          href="https://github.com/aniruddha-10"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github className="h-6 w-6" />
        </motion.a>
        <motion.a
          href="https://www.linkedin.com/in/aniruddha-khan-4b052121a/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="h-6 w-6" />
        </motion.a>
        <motion.a
          href="mailto:aniruddhakhan747@gmail.com"
          className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors transform hover:scale-110"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Mail className="h-6 w-6" />
        </motion.a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-gray-400 dark:text-gray-500"
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 dark:bg-gray-500 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
