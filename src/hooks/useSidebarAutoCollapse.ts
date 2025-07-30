"use client"

import { useState, useEffect, useCallback, useRef } from "react"

interface UseSidebarAutoCollapseOptions {
  inactivityTimeout?: number // milliseconds
  collapseBreakpoint?: number // pixels
  defaultCollapsed?: boolean
  warningThreshold?: number // milliseconds before timeout to show warning
  onInactivityTimeout?: () => void // callback for when inactivity timeout is reached
}

export function useSidebarAutoCollapse({
  inactivityTimeout = 60000, // 60 seconds (updated from 90 seconds)
  collapseBreakpoint = 1280, // xl breakpoint
  defaultCollapsed = false,
  warningThreshold = 10000, // 10 seconds warning
  onInactivityTimeout, // callback function
}: UseSidebarAutoCollapseOptions = {}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
  const [isAutoCollapsed, setIsAutoCollapsed] = useState(false)
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("xl")
  const [activityStatus, setActivityStatus] = useState<"active" | "warning" | "inactive">("active")
  const [timeUntilCollapse, setTimeUntilCollapse] = useState(0)
  const [showActivityIndicator, setShowActivityIndicator] = useState(false)

  const inactivityTimerRef = useRef<NodeJS.Timeout>()
  const warningTimerRef = useRef<NodeJS.Timeout>()
  const countdownIntervalRef = useRef<NodeJS.Timeout>()
  const lastActivityRef = useRef<number>(Date.now())
  const debounceTimerRef = useRef<NodeJS.Timeout>()

  // Handle screen size changes
  const handleResize = useCallback(() => {
    const width = window.innerWidth

    let newScreenSize: "sm" | "md" | "lg" | "xl"
    if (width < 768) newScreenSize = "sm"
    else if (width < 1024) newScreenSize = "md"
    else if (width < 1280) newScreenSize = "lg"
    else newScreenSize = "xl"

    setScreenSize(newScreenSize)

    // Auto-collapse on smaller screens
    if (width < collapseBreakpoint) {
      if (!isCollapsed) {
        setIsCollapsed(true)
        setIsAutoCollapsed(true)
        setActivityStatus("inactive")
        setShowActivityIndicator(false)
      }
    } else {
      // Auto-expand when screen is large enough, but only if it was auto-collapsed
      if (isAutoCollapsed && isCollapsed) {
        setIsCollapsed(false)
        setIsAutoCollapsed(false)
        setActivityStatus("active")
        setShowActivityIndicator(false)
      }
    }
  }, [isCollapsed, isAutoCollapsed, collapseBreakpoint])

  // Start countdown
  const startCountdown = useCallback(() => {
    console.log("Starting countdown...") // Debug log
    const startTime = Date.now()
    const endTime = startTime + warningThreshold

    setActivityStatus("warning")
    setShowActivityIndicator(true)
    console.log("Set status to warning and showActivityIndicator to true") // Debug log

    countdownIntervalRef.current = setInterval(() => {
      const now = Date.now()
      const remaining = Math.max(0, endTime - now)
      setTimeUntilCollapse(Math.ceil(remaining / 1000))

      if (remaining <= 0) {
        if (countdownIntervalRef.current) {
          clearInterval(countdownIntervalRef.current)
        }
      }
    }, 100)
  }, [warningThreshold])

  // Clear all timers
  const clearAllTimers = useCallback(() => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current)
      inactivityTimerRef.current = undefined
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current)
      warningTimerRef.current = undefined
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current)
      countdownIntervalRef.current = undefined
    }
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
      debounceTimerRef.current = undefined
    }
  }, [])

  // Handle user activity with debouncing
  const handleActivity = useCallback(() => {
    // Don't reset if we're in warning state
    if (activityStatus === "warning") {
      console.log("Activity detected but in warning state - ignoring") // Debug log
      return
    }

    // Clear any existing debounce timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Set a new debounce timer
    debounceTimerRef.current = setTimeout(() => {
      lastActivityRef.current = Date.now()

      // Clear existing timers
      clearAllTimers()

      // Reset status
      setActivityStatus("active")
      setShowActivityIndicator(false)
      setTimeUntilCollapse(0)

      // Only set timers if screen is large enough and not manually collapsed
      if (window.innerWidth >= collapseBreakpoint && !isCollapsed) {
        console.log("Setting timers...") // Debug log
        console.log("inactivityTimeout:", inactivityTimeout) // Debug log
        console.log("warningThreshold:", warningThreshold) // Debug log
        
        // Set warning timer - show warning before collapse
        const warningDelay = inactivityTimeout - warningThreshold
        console.log("Warning delay:", warningDelay) // Debug log
        
        if (warningDelay > 0) {
          warningTimerRef.current = setTimeout(() => {
            console.log("Warning timer fired!") // Debug log
            startCountdown()
          }, warningDelay)
        }

        // Set collapse timer
        inactivityTimerRef.current = setTimeout(() => {
          console.log("Inactivity timer fired!") // Debug log
          setIsCollapsed(true)
          setIsAutoCollapsed(true)
          setActivityStatus("inactive")
          setShowActivityIndicator(false)
          setTimeUntilCollapse(0)
          
          // Call the callback function when inactivity timeout is reached
          if (onInactivityTimeout) {
            onInactivityTimeout()
          }
        }, inactivityTimeout)
      }
    }, 100) // 100ms debounce
  }, [inactivityTimeout, warningThreshold, collapseBreakpoint, isCollapsed, clearAllTimers, startCountdown, onInactivityTimeout, activityStatus])

  // Manual toggle function
  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev)
    setIsAutoCollapsed(false) // Reset auto-collapse flag when manually toggled

    // Clear timers and reset status
    clearAllTimers()
    setActivityStatus("active")
    setShowActivityIndicator(false)
    setTimeUntilCollapse(0)

    // Reset activity timer
    setTimeout(() => {
      handleActivity()
    }, 100)
  }, [clearAllTimers, handleActivity])

  // Handle hover to expand when auto-collapsed
  const handleSidebarHover = useCallback(() => {
    if (isAutoCollapsed && isCollapsed && window.innerWidth >= collapseBreakpoint) {
      setIsCollapsed(false)
      // Don't reset auto-collapsed flag on hover, just temporarily expand
    }
  }, [isAutoCollapsed, isCollapsed, collapseBreakpoint])

  // Handle mouse leave to collapse again if it was auto-collapsed
  const handleSidebarLeave = useCallback(() => {
    if (isAutoCollapsed && !isCollapsed && window.innerWidth >= collapseBreakpoint) {
      // Small delay to prevent flickering
      setTimeout(() => {
        setIsCollapsed(true)
      }, 300)
    }
  }, [isAutoCollapsed, isCollapsed, collapseBreakpoint])

  // Extend activity (for when user interacts with warning)
  const extendActivity = useCallback(() => {
    handleActivity()
  }, [handleActivity])

  useEffect(() => {
    // Initial setup
    handleResize()
    handleActivity()

    // Event listeners
    window.addEventListener("resize", handleResize)

    // Activity listeners
    const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart", "click"]
    activityEvents.forEach((event) => {
      document.addEventListener(event, handleActivity, { passive: true })
    })

    return () => {
      window.removeEventListener("resize", handleResize)

      activityEvents.forEach((event) => {
        document.removeEventListener(event, handleActivity)
      })

      clearAllTimers()
    }
  }, [handleResize, handleActivity, clearAllTimers])

  useEffect(() => {
    const resetInactivityTimer = () => {
      console.log("Resetting inactivity timer..."); // Debug log
      setActivityStatus("active");
      setShowActivityIndicator(false);
      lastActivityRef.current = Date.now();

      // Clear existing timers
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);

      // Set new timers
      inactivityTimerRef.current = setTimeout(() => {
        console.log("Inactivity timeout reached."); // Debug log
        setActivityStatus("inactive");
        setIsCollapsed(true);
        if (onInactivityTimeout) onInactivityTimeout();
      }, inactivityTimeout);

      warningTimerRef.current = setTimeout(() => {
        console.log("Warning threshold reached."); // Debug log
        setActivityStatus("warning");
        setShowActivityIndicator(true);

        // Start countdown for warning
        let remainingTime = warningThreshold;
        setTimeUntilCollapse(Math.ceil(remainingTime / 1000));
        countdownIntervalRef.current = setInterval(() => {
          remainingTime -= 1000;
          setTimeUntilCollapse(Math.ceil(remainingTime / 1000));
          if (remainingTime <= 0) {
            clearInterval(countdownIntervalRef.current);
          }
        }, 1000);
      }, inactivityTimeout - warningThreshold);
    };

    // Attach event listeners for activity detection
    const handleActivity = () => {
      console.log("Activity detected."); // Debug log
      resetInactivityTimer();
    };
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);

    // Initialize the inactivity timer
    resetInactivityTimer();

    return () => {
      // Cleanup event listeners and timers
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [inactivityTimeout, warningThreshold, onInactivityTimeout]);

  return {
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
    setIsCollapsed, // For manual control if needed
  }
}
