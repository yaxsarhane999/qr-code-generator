"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null,
      )
    }

    const handleMouseDown = () => setIsClicked(true)
    const handleMouseUp = () => setIsClicked(false)

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        className="custom-cursor-outer hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${isClicked ? 0.8 : 1})`,
          backgroundColor: isPointer ? "rgba(255, 255, 255, 0.2)" : "transparent",
          border: isPointer ? "1px solid rgba(255, 255, 255, 0.8)" : "1px solid rgba(255, 255, 255, 0.3)",
        }}
      />
      <div
        className="custom-cursor-inner hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `scale(${isClicked ? 0.5 : 1})`,
        }}
      />
    </>
  )
}
