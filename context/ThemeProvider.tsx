"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

// we must define a type to pass to createContext
interface ThemeContextType {
  mode: string
  setMode: (mode: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("")

  // handler
  const handleThemeChange = () => {
    if (mode === "dark") {
      setMode("light")
      document.documentElement.classList.add("light")
    } else {
      setMode("dark")
      document.documentElement.classList.add("dark")
    }
  }
  // we want to run this when the component loads
  useEffect(() => {
    handleThemeChange()
  }, [mode])

  // every Provider has to return something as to make values available to the children they are wrapped around
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }

  return context
}
