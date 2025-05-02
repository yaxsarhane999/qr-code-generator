"use client"

import type React from "react"

import { useState, useRef } from "react"

export function useQRCode(initialUrl = "https://instagram.com/yaxsarhane") {
  const [url, setUrl] = useState(initialUrl)
  const [qrCode, setQRCode] = useState(initialUrl)
  const [color, setColor] = useState("#ffffff")
  const [backgroundColor, setBackgroundColor] = useState("#000000")
  const [isTransparent, setIsTransparent] = useState(false)
  const [size, setSize] = useState(200)
  const [errorCorrection, setErrorCorrection] = useState("M")
  const qrRef = useRef<HTMLDivElement>(null)

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault()
    setQRCode(url)
  }

  return {
    url,
    setUrl,
    qrCode,
    setQRCode,
    color,
    setColor,
    backgroundColor,
    setBackgroundColor,
    isTransparent,
    setIsTransparent,
    size,
    setSize,
    errorCorrection,
    setErrorCorrection,
    qrRef,
    generateQRCode,
  }
}
