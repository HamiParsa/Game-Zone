'use client'

import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaGamepad } from 'react-icons/fa'

// ============================================
// HOME PAGE COMPONENT
// ============================================

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // ============================================
  // PARTICLE BACKGROUND WITH RED THEME
  // ============================================

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Resize canvas to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Red theme colors for particles
    const redColors = ['#dc2626', '#ef4444', '#b91c1c', '#f87171', '#dc2626']

    // Create particles
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2.5 + 0.5,
      velocityX: (Math.random() - 0.5) * 0.6,
      velocityY: (Math.random() - 0.5) * 0.6,
      color: redColors[Math.floor(Math.random() * redColors.length)],
    }))

    let animationFrameId: number

    // Animation loop
    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        // Update position
        p.x += p.velocityX
        p.y += p.velocityY

        // Wrap around edges
        if (p.x > canvas.width) p.x = 0
        if (p.x < 0) p.x = canvas.width
        if (p.y > canvas.height) p.y = 0
        if (p.y < 0) p.y = canvas.height

        // Draw particle with glow effect
        ctx.shadowBlur = 15
        ctx.shadowColor = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(animateParticles)
    }

    animateParticles()

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Red Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-red-900/40 via-black to-red-800/30" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4"
      >
        {/* Title - White */}
        <motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-6xl sm:text-7xl md:text-8xl font-extrabold mb-6 text-white"
        >
          GameZone
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-300 text-lg sm:text-xl mb-10 max-w-md mx-auto"
        >
          Enter the ultimate gaming experience
        </motion.p>

        {/* Start Button with Red Gradient & Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: 'spring' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link
            href="/play"
            className="inline-flex items-center gap-3 px-12 sm:px-16 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full text-lg sm:text-xl font-bold text-white shadow-2xl shadow-red-500/40 hover:shadow-red-500/60 transition-all"
          >
            <FaGamepad className="text-2xl" />
            Start Now
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}