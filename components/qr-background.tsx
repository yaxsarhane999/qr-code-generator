"use client"

import { useEffect, useRef } from "react"

export function QRBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // QR code patterns
    const patterns = [drawQRPattern1, drawQRPattern2, drawQRPattern3, drawQRPattern4, drawQRPattern5]

    // QR code elements
    const qrElements: QRElement[] = []
    const maxElements = 15

    // Initialize QR elements
    for (let i = 0; i < maxElements; i++) {
      qrElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 80 + 40,
        opacity: Math.random() * 0.2 + 0.05,
        rotation: Math.random() * Math.PI * 2,
        pattern: Math.floor(Math.random() * patterns.length),
        speed: Math.random() * 0.5 + 0.1,
        direction: Math.random() * Math.PI * 2,
      })
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update QR elements
      qrElements.forEach((element) => {
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)
        ctx.globalAlpha = element.opacity
        patterns[element.pattern](ctx, -element.size / 2, -element.size / 2, element.size)
        ctx.restore()

        // Move element
        element.x += Math.cos(element.direction) * element.speed
        element.y += Math.sin(element.direction) * element.speed
        element.rotation += 0.001

        // Bounce off edges
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size

        // Occasionally change direction
        if (Math.random() < 0.002) {
          element.direction = Math.random() * Math.PI * 2
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Clean up
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
}

// QR Element type
interface QRElement {
  x: number
  y: number
  size: number
  opacity: number
  rotation: number
  pattern: number
  speed: number
  direction: number
}

// QR Pattern 1: Basic QR code corner
function drawQRPattern1(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cellSize = size / 7
  ctx.fillStyle = "#ffffff"

  // Outer square
  ctx.fillRect(x, y, size, size)

  // Inner pattern
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize)
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize)
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + 3 * cellSize, y + 3 * cellSize, cellSize, cellSize)
}

// QR Pattern 2: Grid pattern
function drawQRPattern2(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cellSize = size / 8
  ctx.fillStyle = "#ffffff"

  // Create checkerboard pattern
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 0) {
        ctx.fillRect(x + i * cellSize, y + j * cellSize, cellSize, cellSize)
      }
    }
  }
}

// QR Pattern 3: Finder pattern
function drawQRPattern3(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cellSize = size / 7

  // Outer square
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x, y, size, size)

  // Finder pattern
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize)
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize)
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + 3 * cellSize, y + 3 * cellSize, cellSize, cellSize)
}

// QR Pattern 4: Random dots
function drawQRPattern4(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cellSize = size / 10
  ctx.fillStyle = "#ffffff"

  // Random dots
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (Math.random() > 0.6) {
        ctx.fillRect(x + i * cellSize, y + j * cellSize, cellSize, cellSize)
      }
    }
  }
}

// QR Pattern 5: Alignment pattern
function drawQRPattern5(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  const cellSize = size / 5

  // Alignment pattern
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x, y, size, size)
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + cellSize, y + cellSize, 3 * cellSize, 3 * cellSize)
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(x + 1.5 * cellSize, y + 1.5 * cellSize, 2 * cellSize, 2 * cellSize)
  ctx.fillStyle = "#000000"
  ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, cellSize, cellSize)
}
