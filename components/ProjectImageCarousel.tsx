"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectImage {
  src: string
  alt: string
  caption: string
}

interface ProjectImageCarouselProps {
  projectTitle: string
  images: ProjectImage[]
}

export function ProjectImageCarousel({ projectTitle, images }: ProjectImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  return (
    <>
      <div className="relative group">
        <div className="aspect-video bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={images[currentImage].src}
              alt={images[currentImage].alt}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsFullscreen(true)}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            />
          </AnimatePresence>

          {/* Navigation buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronLeft className="h-3 w-3" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              >
                <ChevronRight className="h-3 w-3" />
              </button>
            </>
          )}

          {/* Fullscreen button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(true)}
            className="absolute top-2 right-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70 h-8 w-8 z-10"
          >
            <Eye className="h-3 w-3" />
          </Button>

          {/* Image indicators - moved inside the image container with proper bottom padding */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentImage ? "bg-white" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caption with increased spacing to avoid overlap */}
        <motion.p
          key={currentImage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-gray-600 dark:text-gray-400 mt-4 text-center"
        >
          {images[currentImage].caption}
        </motion.p>
      </div>

      {/* Fullscreen modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[currentImage].src || "/placeholder.svg"}
                alt={images[currentImage].alt}
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={() => setIsFullscreen(false)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
