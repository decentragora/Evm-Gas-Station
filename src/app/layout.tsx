import type { Metadata } from 'next'
import '@fontsource-variable/space-grotesk';
import { Inter } from 'next/font/google'
import { Footer, Header } from '@/components'
import { Analytics } from '@vercel/analytics/react';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Evm Gas Station',
  description: 'One stop shop for all your evm gas needs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <Analytics mode={'production'} />
      </body>
    </html>
  )
}
