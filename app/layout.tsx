import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans, DM_Mono } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import '@/app/globals.css'
import { SITE } from '@/lib/site'

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400'], style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-sans', display: 'swap' })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['400'], variable: '--font-dm-mono', display: 'swap' })

export const metadata: Metadata = {
  title: { default: SITE.name, template: `%s — ${SITE.name}` },
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  openGraph: { type: 'website', locale: 'en_US', url: SITE.url, siteName: SITE.name },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.ico', apple: '/apple-touch-icon.png' },
}
export const viewport: Viewport = { themeColor: '#2C1F14', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${dmMono.variable}`} suppressHydrationWarning>
        <head>
          {process.env['NEXT_PUBLIC_PLAUSIBLE_DOMAIN'] && (
            <script defer data-domain={process.env['NEXT_PUBLIC_PLAUSIBLE_DOMAIN']} src="https://plausible.io/js/script.tagged-events.js" />
          )}
        </head>
        <body className="font-body antialiased">{children}</body>
      </html>
    </ClerkProvider>
  )
}
