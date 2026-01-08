import { ThemeProvider } from "@/components/ui/theme-provider"
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dar Al-Muzadat',
  description: 'Luxury Auction Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
