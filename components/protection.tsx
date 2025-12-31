"use client"

import { useEffect } from "react"

export function Protection() {
  useEffect(() => {
    // Prevent right-click
    const handleContextMenu = (e: Event) => {
      e.preventDefault()
    }

    // Prevent copy/cut/paste
    const handleClipboard = (e: Event) => {
      e.preventDefault()
    }

    // Prevent keyboard shortcuts
    const handleKeyDown = (e: Event) => {
      const event = e as KeyboardEvent
      if ((event.ctrlKey || event.metaKey) && ['c', 'x', 'v', 'a'].includes(event.key.toLowerCase())) {
        e.preventDefault()
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('copy', handleClipboard)
    document.addEventListener('cut', handleClipboard)
    document.addEventListener('paste', handleClipboard)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('copy', handleClipboard)
      document.removeEventListener('cut', handleClipboard)
      document.removeEventListener('paste', handleClipboard)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}
