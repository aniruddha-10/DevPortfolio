"use client"

import { ContactMap } from "@/components/ContactMap"
import { ContactForm } from "@/components/ContactForm"
import { SocialLinks } from "@/components/SocialLinks"
import { ResponseTimeIndicator } from "@/components/ResponseTimeIndicator"

export function ContactSection() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Let's connect! I'm always interested in discussing new opportunities, collaborations, or just having a chat
          about technology.
        </p>
      </div>

      {/* Response Time Indicator */}
      <ResponseTimeIndicator />

      {/* Connect With Me - Full Width at Top */}
      <SocialLinks />

      {/* Where I Am and Send Message - 2 Column Layout with Equal Heights */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col">
          <div className="flex-1">
            <ContactMap />
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col">
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
