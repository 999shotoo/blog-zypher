"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button className="font-mono text-xs md:text-[11px] sm:text-[10px] px-3 py-1.5 md:px-2.5 md:py-1 sm:px-2 sm:py-1 border-2 border-border bg-background text-foreground">
        [...]
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="font-mono text-xs md:text-[11px] sm:text-[10px] px-3 py-1.5 md:px-2.5 md:py-1 sm:px-2 sm:py-1 border-2 border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
      aria-label="Toggle theme"
      type="button"
    >
      {isDark ? "[light]" : "[dark]"}
    </button>
  )
}
