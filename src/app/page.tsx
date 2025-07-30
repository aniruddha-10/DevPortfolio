"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/components/layout/Sidebar"
import { MobileHeader } from "@/components/layout/MobileHeader"
import { CommandPalette } from "@/components/common/CommandPalette"
import { ActivityIndicator } from "@/components/common/ActivityIndicator"
import { HomeSection } from "@/components/sections/HomeSection"
import { AboutSection } from "@/components/sections/AboutSection"
import { ProjectsSection } from "@/components/sections/ProjectsSection"
import { TimelineSection } from "@/components/sections/TimelineSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { FloatingParticles } from "@/components/common/FloatingParticles"
import { useSidebarAutoCollapse } from "@/hooks/useSidebarAutoCollapse"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const [activityIndicatorVisible, setActivityIndicatorVisible] = useState(false)

  const {
    isCollapsed,
    isAutoCollapsed,
    screenSize,
    activityStatus,
    timeUntilCollapse,
    showActivityIndicator,
    toggleCollapse,
    handleSidebarHover,
    handleSidebarLeave,
    extendActivity,
  } = useSidebarAutoCollapse({
    inactivityTimeout: 120000, // 2 minutes
    collapseBreakpoint: 1280, // xl breakpoint
    defaultCollapsed: false,
    warningThreshold: 30000, // 30 seconds warning
    onInactivityTimeout: () => {
      // NEW: Redirect to home page when inactivity timeout is reached
      setActiveSection("home")
    },
  })

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    setCommandOpen(false)
  }

  const handleShowActivityIndicator = () => {
    setActivityIndicatorVisible(true)
  }

  const handleDismissActivityIndicator = () => {
    setActivityIndicatorVisible(false)
  }

  const handleExtendActivity = () => {
    extendActivity()
    setActivityIndicatorVisible(false)
  }

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection setActiveSection={setActiveSection} />
      case "about":
        return <AboutSection />
      case "projects":
        return <ProjectsSection />
      case "timeline":
        return <TimelineSection />
      case "contact":
        return <ContactSection />
      default:
        return <HomeSection setActiveSection={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-mono relative overflow-hidden">
      {/* Background particles for non-home sections */}
      {activeSection !== "home" && <FloatingParticles count={15} />}

      <ActivityIndicator
        status={activityStatus}
        timeUntilCollapse={timeUntilCollapse}
        isVisible={activityIndicatorVisible || (showActivityIndicator && activityStatus === "warning")}
        onExtendActivity={handleExtendActivity}
        onDismiss={handleDismissActivityIndicator}
      />

      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} onSectionChange={handleSectionChange} />

      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        setCommandOpen={setCommandOpen}
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />

      <div className="flex relative z-10">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isCollapsed={isCollapsed}
          isAutoCollapsed={isAutoCollapsed}
          screenSize={screenSize}
          activityStatus={activityStatus}
          timeUntilCollapse={timeUntilCollapse}
          showActivityIndicator={showActivityIndicator}
          onToggleCollapse={toggleCollapse}
          onSidebarHover={handleSidebarHover}
          onSidebarLeave={handleSidebarLeave}
          onShowActivityIndicator={handleShowActivityIndicator}
        />

        <motion.div
          initial={false}
          animate={{ paddingLeft: isCollapsed ? 80 : 256 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="hidden lg:flex lg:flex-col lg:flex-1"
        >
          <main className="flex-1">
            <div className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </motion.div>

        {/* Mobile content (unchanged) */}
        <div className="lg:hidden flex flex-col flex-1">
          <main className="flex-1 pt-16">
            <div className="max-w-4xl mx-auto px-6 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderSection()}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
