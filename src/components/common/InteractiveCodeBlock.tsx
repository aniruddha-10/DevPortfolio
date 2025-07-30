"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Play, RotateCcw, Copy, Check } from "lucide-react"

const codeExamples = [
  {
    title: "React Hook",
    language: "typescript",
    code: `const useCounter = (initial = 0) => {
  const [count, setCount] = useState(initial);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initial);
  
  return { count, increment, decrement, reset };
};`,
    output: "Custom hook for counter logic",
  },
  {
    title: "API Fetch",
    language: "javascript",
    code: `const fetchUserData = async (userId) => {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
};`,
    output: "Async function for fetching user data",
  },
  {
    title: "CSS Animation",
    language: "css",
    code: `@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-in {
  animation: slideIn 0.3s ease-out;
}`,
    output: "Smooth slide-in animation",
  },
]

export function InteractiveCodeBlock() {
  const [currentExample, setCurrentExample] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [displayedCode, setDisplayedCode] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const example = codeExamples[currentExample]

  useEffect(() => {
    setDisplayedCode("")
    setCurrentIndex(0)
  }, [currentExample])

  useEffect(() => {
    if (isRunning && currentIndex < example.code.length) {
      const timeout = setTimeout(() => {
        setDisplayedCode((prev) => prev + example.code[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 20)
      return () => clearTimeout(timeout)
    } else if (currentIndex >= example.code.length) {
      setIsRunning(false)
    }
  }, [isRunning, currentIndex, example.code])

  const handleRun = () => {
    if (isRunning) return
    setIsRunning(true)
    setDisplayedCode("")
    setCurrentIndex(0)
  }

  const handleReset = () => {
    setIsRunning(false)
    setDisplayedCode("")
    setCurrentIndex(0)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(example.code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-2">
          {codeExamples.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentExample(index)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                currentExample === index
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              {codeExamples[index].title}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={handleRun} disabled={isRunning}>
            <Play className="h-4 w-4 mr-1" />
            Run
          </Button>
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      </div>

      <div className="relative">
        <pre className="p-4 bg-gray-50 dark:bg-gray-900 text-sm font-mono overflow-x-auto min-h-[200px]">
          <code className="text-gray-800 dark:text-gray-200">
            {displayedCode}
            {isRunning && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-blue-500"
              >
                |
              </motion.span>
            )}
          </code>
        </pre>

        <AnimatePresence>
          {displayedCode && !isRunning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute bottom-4 right-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded text-sm"
            >
              ✓ {example.output}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
