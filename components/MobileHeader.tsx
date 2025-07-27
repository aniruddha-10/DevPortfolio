"use client"

import { Button } from "@/components/ui/button"
import { Menu, X, Search, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { sections } from "@/lib/data"

interface MobileHeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  setCommandOpen: (open: boolean) => void
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export function MobileHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
  setCommandOpen,
  activeSection,
  onSectionChange,
}: MobileHeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Aniruddha Khan</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setCommandOpen(true)} className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="h-8 w-8">
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black"
          >
            <nav className="p-4 space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400"
                      : "hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  {section.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
