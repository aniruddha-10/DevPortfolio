"use client"

import { timeline } from "@/lib/data"
import { InteractiveTimeline } from "@/components/features/timeline/InteractiveTimeline"

export function TimelineSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Timeline 💼</h2>
        <p className="text-base text-gray-600 dark:text-gray-400">
          My professional journey with detailed achievements and technologies used.
        </p>
      </div>

      <InteractiveTimeline items={timeline} />
    </div>
  )
}
