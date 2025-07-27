"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type FormStatus = "idle" | "sending" | "success" | "error"

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [status, setStatus] = useState<FormStatus>("idle")
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === "message") {
      setCharCount(value.length)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate random success/error for demo
    const success = Math.random() > 0.3
    setStatus(success ? "success" : "error")

    if (success) {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setCharCount(0)
    }

    // Reset status after 3 seconds
    setTimeout(() => setStatus("idle"), 3000)
  }

  const isFormValid = formData.name && formData.email && formData.message && formData.subject

  return (
    <Card className="bg-white dark:bg-gray-950 h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Send className="h-5 w-5 text-blue-500" />
          Send a Message
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Input
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
                disabled={status === "sending"}
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
                disabled={status === "sending"}
              />
            </div>
          </div>

          <div>
            <Input
              placeholder="Subject"
              value={formData.subject}
              onChange={(e) => handleInputChange("subject", e.target.value)}
              className="border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100"
              disabled={status === "sending"}
            />
          </div>

          <div className="relative flex-1">
            <Textarea
              placeholder="Your message"
              rows={8}
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              className="border-gray-200 dark:border-gray-800 resize-none bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 h-full"
              disabled={status === "sending"}
              maxLength={500}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">{charCount}/500</div>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid || status === "sending"}
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {status === "sending" ? (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </motion.div>
              ) : status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Message Sent!
                </motion.div>
              ) : status === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  Try Again
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </form>

        {/* Status Messages */}
        <AnimatePresence>
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg"
            >
              <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Thanks! I'll get back to you within 24 hours.</span>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg"
            >
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">Something went wrong. Please try again or email me directly.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}
