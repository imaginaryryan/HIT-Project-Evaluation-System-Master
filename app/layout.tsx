import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "HIT PROJECT EVALUATION SYSTEM",
  description: "The system is a web based web application that is used at Harare Institute of technology for evaluating second (HIT200) and final (HIT400) projects."
  "The system aim to comuputerise the current manual evaluation system to a paper-less system",

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
