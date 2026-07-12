import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ShelfMate - Smart Grocery Shopping',
  description: 'AI-driven Smart Lists and premium delivery for busy urban professionals',
  keywords: ['grocery', 'shopping', 'AI', 'smart lists', 'delivery'],
  openGraph: {
    title: 'ShelfMate - Smart Grocery Shopping',
    description: 'AI-driven Smart Lists and premium delivery for busy urban professionals',
    type: 'website',
    url: 'https://shelfmate.app',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
