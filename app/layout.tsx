import "@/styles/globals.css"
import { Inter } from "next/font/google"
import type React from "react"
import { CustomCursor } from "@/components/custom-cursor"
import { QRBackground } from "@/components/qr-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "QR Code Generator",
  description: "Generate QR codes from URLs with modern design",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QRBackground />
        <CustomCursor />
        <div className="flex flex-col min-h-screen">{children}</div>
      </body>
    </html>
  )
}
