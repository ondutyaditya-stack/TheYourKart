import type { Metadata, Viewport } from 'next'
import { DM_Sans, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'TheYourKart - Next-Gen Tech at Unreal Prices',
  description: 'India\'s premium electronics destination. Shop mobiles, laptops, TVs, audio, cameras, wearables and accessories with 100% genuine products, easy EMI, and 7-day returns.',
  keywords: 'electronics, mobiles, laptops, TVs, audio, cameras, wearables, India, online shopping',
}

export const viewport: Viewport = {
  themeColor: '#ff4500',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
