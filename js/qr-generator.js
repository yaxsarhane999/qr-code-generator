// This file contains the core QR code generation functionality
// It's referenced by the index.html for direct browser preview

import QRCode from "qrcode"

/**
 * Generates a QR code with the specified options
 * @param {string} url - The URL to encode in the QR code
 * @param {string} color - The foreground color of the QR code
 * @param {string} backgroundColor - The background color of the QR code
 * @param {boolean} isTransparent - Whether the background should be transparent
 * @param {number} size - The size of the QR code in pixels
 * @param {string} errorCorrection - The error correction level (L, M, Q, H)
 * @returns {Promise<HTMLCanvasElement>} - A promise that resolves to the QR code canvas
 */
export function generateQRCode(url, color, backgroundColor, isTransparent, size, errorCorrection) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    QRCode.toCanvas(
      canvas,
      url,
      {
        width: size,
        height: size,
        color: {
          dark: color,
          light: isTransparent ? "#00000000" : backgroundColor,
        },
        errorCorrectionLevel: errorCorrection,
      },
      (error) => {
        if (error) reject(error)
        else resolve(canvas)
      },
    )
  })
}

/**
 * Downloads the QR code as a PNG image
 * @param {HTMLCanvasElement} canvas - The QR code canvas element
 * @param {boolean} isTransparent - Whether the background is transparent
 */
export function downloadQRCode(canvas, isTransparent) {
  if (!canvas) return

  // If background is transparent, ensure it stays transparent in the download
  if (isTransparent) {
    // Create a new canvas with the same dimensions
    const downloadCanvas = document.createElement("canvas")
    downloadCanvas.width = canvas.width
    downloadCanvas.height = canvas.height

    const ctx = downloadCanvas.getContext("2d")
    // Make sure the background is transparent
    ctx.clearRect(0, 0, downloadCanvas.width, downloadCanvas.height)
    // Draw the original canvas onto our new one
    ctx.drawImage(canvas, 0, 0)

    // Convert to PNG and download
    const pngUrl = downloadCanvas.toDataURL("image/png")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = "qrcode.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  } else {
    // For non-transparent backgrounds, we can download directly
    const pngUrl = canvas.toDataURL("image/png")
    const downloadLink = document.createElement("a")
    downloadLink.href = pngUrl
    downloadLink.download = "qrcode.png"
    document.body.appendChild(downloadLink)
    downloadLink.click()
    document.body.removeChild(downloadLink)
  }
}
