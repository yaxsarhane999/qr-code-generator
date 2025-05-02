/**
 * Utility function to download a QR code as a PNG image
 * @param {HTMLElement} qrElement - The element containing the QR code SVG
 * @param {number} size - The size of the QR code
 * @param {string} backgroundColor - The background color of the QR code
 * @param {boolean} isTransparent - Whether the background should be transparent
 */
export function downloadQRCode(qrElement, size, backgroundColor, isTransparent) {
  if (!qrElement) return

  const svg = qrElement.querySelector("svg")
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
