// GLOBAL APPLICATION FILE
// Any changes made to this file will be reflected in other components

import { ClerkProvider } from "@clerk/nextjs"

import { Inter, Space_Grotesk } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css" // globals.css imports ../styles/theme.css which is where the class h1-bold is defined
import { ThemeProvider } from "@/context/ThemeProvider"

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
})

// Metadata displayed in the tab and elsewhere
export const metadata: Metadata = {
  title: "DevStackOverflow",
  description: "A mini clone of StackOverflow",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>
            {/* <h1 className="h1-bold">This is a piece of text!</h1> */}
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
