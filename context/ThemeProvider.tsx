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
    // check local storage or if theme does not exist in localstorage and the browser is not set to prefer dark mode
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark").matches)
    ) {
      setMode("dark")
      document.documentElement.classList.add("dark")
    } else {
      setMode("light")
      document.documentElement.classList.remove("dark")
    }
  }
  // we want to run this when the component loads
  useEffect(() => {
    handleThemeChange()
  }, [mode])

  console.log(mode)

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
