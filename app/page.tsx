"use client"

import type React from "react"

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { Download } from "lucide-react"

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://instagram.com/yaxsarhane")
  const [qrCode, setQRCode] = useState("https://instagram.com/yaxsarhane")
  const [color, setColor] = useState("#ffffff")
  const [backgroundColor, setBackgroundColor] = useState("#000000")
  const [isTransparent, setIsTransparent] = useState(false)
  const [size, setSize] = useState(200)
  const [errorCorrection, setErrorCorrection] = useState("M")
  const qrRef = useRef<HTMLDivElement>(null)

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault()
    setQRCode(url)

    // Scroll to QR code with smooth animation
    setTimeout(() => {
      if (qrRef.current) {
        qrRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })
      }
    }, 100)
  }

  // Button click effect
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  }

  const downloadQRCode = () => {
    if (!qrRef.current) return

    const svg = qrRef.current.querySelector("svg")
    if (!svg) return

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions to match QR code size
    canvas.width = size
    canvas.height = size

    // If background is transparent, ensure canvas is transparent
    if (isTransparent) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    } else {
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    // Convert SVG to data URL
    const svgData = new XMLSerializer().serializeToString(svg)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" })
    const DOMURL = window.URL || window.webkitURL || window
    const svgUrl = DOMURL.createObjectURL(svgBlob)

    // Draw SVG on canvas
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      DOMURL.revokeObjectURL(svgUrl)

      // Convert canvas to PNG and download
      const pngUrl = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = "qrcode.png"
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
    }
    img.src = svgUrl
  }

  return (
    <>
      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-2xl"
        >
          <Card className="glass-card border-0">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                QR Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={generateQRCode} className="space-y-6">
                <div>
                  <Label htmlFor="url" className="text-white/80">
                    URL
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="Enter a URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="color" className="text-white/80">
                      QR Code Color
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent"
                      />
                      <Input
                        type="text"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-1 bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="backgroundColor" className="text-white/80">
                      Background Color
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="w-12 h-10 p-1 bg-transparent"
                        disabled={isTransparent}
                      />
                      <Input
                        type="text"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="flex-1 bg-white/10 border-white/20 text-white"
                        disabled={isTransparent}
                      />
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="transparentBg"
                          checked={isTransparent}
                          onChange={(e) => setIsTransparent(e.target.checked)}
                          className="w-4 h-4 accent-pink-500"
                        />
                        <Label htmlFor="transparentBg" className="text-white/80 cursor-pointer">
                          Transparent Background
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="size" className="text-white/80">
                    Size: {size}x{size}
                  </Label>
                  <Slider
                    id="size"
                    min={100}
                    max={400}
                    step={10}
                    value={[size]}
                    onValueChange={(value) => setSize(value[0])}
                    className="my-2"
                  />
                </div>
                <div>
                  <Label htmlFor="errorCorrection" className="text-white/80">
                    Error Correction Level
                  </Label>
                  <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                    <SelectTrigger id="errorCorrection" className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select error correction level" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/90 border-white/20 text-white">
                      <SelectItem value="L">Low (7%)</SelectItem>
                      <SelectItem value="M">Medium (15%)</SelectItem>
                      <SelectItem value="Q">Quartile (25%)</SelectItem>
                      <SelectItem value="H">High (30%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <motion.div
                  variants={buttonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full"
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 btn-glow"
                  >
                    Generate QR Code
                  </Button>
                </motion.div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col justify-center">
              {qrCode && (
                <>
                  <motion.div
                    ref={qrRef}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 qr-container"
                  >
                    <QRCodeSVG
                      value={qrCode}
                      size={size}
                      fgColor={color}
                      bgColor={isTransparent ? "transparent" : backgroundColor}
                      level={errorCorrection}
                      includeMargin={true}
                    />
                  </motion.div>

                  <motion.div
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    className="mt-4"
                  >
                    <Button
                      onClick={downloadQRCode}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 btn-glow flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download PNG
                    </Button>
                  </motion.div>
                </>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
