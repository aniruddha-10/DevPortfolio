"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, MessageCircle, FileText } from "lucide-react"

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/aniruddha-10",
    color: "hover:text-gray-900 dark:hover:text-white",
    bg: "hover:bg-gray-100 dark:hover:bg-gray-800",
    description: "Check out my code",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/aniruddha-khan-4b052121a/",
    color: "hover:text-blue-600",
    bg: "hover:bg-blue-50 dark:hover:bg-blue-950/20",
    description: "Let's connect professionally",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:aniruddhakhan747@gmail.com",
    color: "hover:text-red-600",
    bg: "hover:bg-red-50 dark:hover:bg-red-950/20",
    description: "Send me an email",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com",
    color: "hover:text-blue-400",
    bg: "hover:bg-blue-50 dark:hover:bg-blue-950/20",
    description: "Follow my thoughts",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    url: "https://discordapp.com/users/754892975858778124",
    color: "hover:text-purple-600",
    bg: "hover:bg-purple-50 dark:hover:bg-purple-950/20",
    description: "Chat with me",
  },
  {
    name: "Resume",
    icon: FileText,
    url: "/resume.pdf",
    color: "hover:text-green-600",
    bg: "hover:bg-green-50 dark:hover:bg-green-950/20",
    description: "Download my resume",
    download: true, // Add download attribute
  },
]

export function SocialLinks() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Connect With Me</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {socialLinks.map((link, index) => (
          <motion.a
            key={link.name}
            href={link.url}
            target={link.name === "Email" ? "_self" : "_blank"}
            rel="noopener noreferrer"
            download={link.download ? "Aniruddha_Khan_Resume.pdf" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`group flex flex-col items-center p-5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 transition-all duration-200 ${link.bg} ${link.color} hover:shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <link.icon className="h-7 w-7 mb-3 transition-colors" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">{link.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center group-hover:text-current transition-colors">
              {link.description}
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  )
}
