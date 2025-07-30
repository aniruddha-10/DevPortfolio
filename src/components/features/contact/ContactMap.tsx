"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { MapPin, Clock, Coffee, Sun, MoonIcon } from "lucide-react"

const timeZones = [
  { city: "Calgary", timezone: "America/Edmonton", flag: "🇨🇦", offset: -7 },
  { city: "India", timezone: "Asia/Kolkata", flag: "🇮🇳", offset: 5.5 },
  { city: "London", timezone: "Europe/London", flag: "🇬🇧", offset: 0 },
  { city: "UAE", timezone: "Asia/Dubai", flag: "🇦🇪", offset: 4 },
]

export function ContactMap() {
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({})
  const [myTime, setMyTime] = useState("")

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date()
      const times: Record<string, string> = {}

      // My local time (Calgary)
      setMyTime(
        now.toLocaleTimeString("en-US", {
          timeZone: "America/Edmonton",
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        }),
      )

      timeZones.forEach((tz) => {
        times[tz.city] = now.toLocaleTimeString("en-US", {
          timeZone: tz.timezone,
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
      })

      setCurrentTimes(times)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)
    return () => clearInterval(interval)
  }, [])

  const getTimeOfDay = (offset: number) => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const cityTime = new Date(utc + offset * 3600000)
    const hour = cityTime.getHours()

    if (hour >= 6 && hour < 12) return { icon: Sun, color: "text-yellow-500", period: "Morning" }
    if (hour >= 12 && hour < 18) return { icon: Sun, color: "text-orange-500", period: "Afternoon" }
    if (hour >= 18 && hour < 22) return { icon: Sun, color: "text-purple-500", period: "Evening" }
    return { icon: MoonIcon, color: "text-blue-500", period: "Night" }
  }

  return (
    <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Where I Am</h3>
      </div>

      {/* My Current Location */}
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <div>
              <div className="font-medium text-gray-900 dark:text-gray-100">🇨🇦 Calgary, Canada</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono font-bold text-blue-600">{myTime}</div>
            <div className="text-xs text-gray-500">Local Time</div>
          </div>
        </div>
      </div>

      {/* World Clock */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          World Clock
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {timeZones.map((tz, index) => {
            const timeInfo = getTimeOfDay(tz.offset)
            const IconComponent = timeInfo.icon

            return (
              <motion.div
                key={tz.city}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{tz.flag}</span>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{tz.city}</div>
                    <div className={`text-xs ${timeInfo.color} flex items-center gap-1`}>
                      <IconComponent className="h-3 w-3" />
                      {timeInfo.period}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-mono font-bold text-gray-900 dark:text-gray-100">
                    {currentTimes[tz.city]}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
        <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
          <Coffee className="h-4 w-4" />
          <span className="text-sm">Best response time: 9 AM - 6 PM MST (weekdays)</span>
        </div>
      </div>
    </div>
  )
}
