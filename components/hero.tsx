"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Play } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import type React from "react"

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  // Smooth scroll to section
  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault()
    const element = document.getElementById(targetId)

    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
      window.history.pushState(null, "", `#${targetId}`)
    }
  }

  return (
    <section
      id="home"
      className="hero-section min-h-screen py-20 flex flex-col justify-center text-center relative overflow-hidden"
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>

      {/* Ink Splashes */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-red-900/10 blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-red-900/5 blur-3xl -z-10"></div>

      {/* Content Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <div className="brush-border p-8 md:p-12 bg-black/30 backdrop-blur-sm mb-16 w-full">
          <img
            src="https://i.ibb.co/tphm5gmW/Screenshot-2025-05-03-010020.png"
            alt="Kalakaar Logo"
            className="h-20 w-auto mx-auto mb-4"
          />
          <h2 className="text-xl md:text-3xl mb-8 text-gray-300 font-light">
             VFX Artist | Filmmaker | Photographer
          </h2>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-400 calligraphy">
            As a Kalakaar,
            <br />
            I chase light, frame emotions, and carve timeless tales from the dust of moments.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/starography"
              className="zen-button text-red-700 hover:text-red-600 px-8 py-3 font-cinzel"
            >
              View Starography: My Photography Portfolio
            </Link>

            <a
              href="#projects"
              onClick={(e) => handleSmoothScroll(e, "projects")}
              className="zen-button text-gray-300 hover:text-white px-8 py-3 font-cinzel"
            >
              View Projects
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="w-6 h-16 border-2 border-gray-500 rounded-full flex justify-center mb-12">
          <div className="w-1 h-3 bg-red-700 rounded-full animate-bounce mt-2"></div>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl w-full mx-auto relative">
          <div className="aspect-[16/9] relative">
            {isPlaying ? (
              <iframe
                src="https://player.vimeo.com/video/1080975472?h=d6c9df0f8d&autoplay=1&muted=1"
                className="w-full h-full absolute inset-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Hero Video"
              ></iframe>
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-lQJe60OxxGongNvLeFeJWGT3Gz0Rra.png"
                    alt="Video thumbnail"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    className="relative z-10 size-16 md:size-20 rounded-full p-0 bg-black/20 hover:bg-black/30 transition-all duration-200 backdrop-blur-sm"
                  >
                    <Play className="size-6 md:size-8 text-white" />
                  </Button>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
