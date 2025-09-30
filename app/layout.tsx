import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-context'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://curiostack.com'),
  title: 'CurioStack - AI-Powered Technology & Business Insights',
  description: 'CurioStack publishes high-quality, AI-generated, SEO-optimized content in technology and business. Stay informed with our professional insights and analysis.',
  keywords: ['technology', 'business', 'AI', 'startups', 'APIs'],
  authors: [{ name: 'CurioStack' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png' },
    ],
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'CurioStack - AI-Powered Technology & Business Insights',
    description: 'CurioStack publishes high-quality, AI-generated, SEO-optimized content in technology and business.',
    type: 'website',
    url: 'https://curiostack.com',
    siteName: 'CurioStack',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurioStack - AI-Powered Technology & Business Insights',
    description: 'CurioStack publishes high-quality, AI-generated, SEO-optimized content in technology and business.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <ThemeProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}