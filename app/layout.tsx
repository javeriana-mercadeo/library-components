// Styles
import '@styles/vendors/_tailwind.css'
import '@styles/global.scss'

// Next.js
import { Metadata, Viewport } from 'next'
import Script from 'next/script'

// Components
import { ThemeSwitch } from '../components/ui'
import { BtnReturn, NavigationLoader } from '../components/layout/Navigation'
import { ClientSideUtils } from '../components/utils'
import { Header } from '../components/layout'

// Providers and Config
import { Providers } from './providers'

import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Component Library'],
  authors: [{ name: 'Javeriana' }],
  creator: 'Javeriana',
  publisher: 'Javeriana',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  colorScheme: 'light dark'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className='light' lang='es'>
      <head>
        {/* External Stylesheets */}
        {/* <link href='https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css' rel='stylesheet' crossOrigin='anonymous' /> */}
        <link crossOrigin='anonymous' href='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css' rel='stylesheet' />
        <link crossOrigin='anonymous' href='https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css' rel='stylesheet' />
        <link
          crossOrigin='anonymous'
          href='https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css'
          rel='stylesheet'
        />
      </head>
      <body suppressHydrationWarning className='antialiased'>
        <Providers themeProps={{ attribute: 'data-theme' }}>
          <ClientSideUtils />
          <NavigationLoader />

          {/* Layout Structure */}
          <div className='relative flex min-h-screen flex-col'>
            {/* Navigation Header */}
            <Header />

            {/* Fixed UI Elements */}
            <ThemeSwitch />
            <BtnReturn />

            {/* Main Content */}
            <main suppressHydrationWarning className='global-container flex-1'>
              {children}
            </main>
          </div>
        </Providers>

        {/* External Scripts */}
        <Script crossOrigin='anonymous' src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js' strategy='afterInteractive' />
        {/* <Script
          src='https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js'
          strategy='afterInteractive'
          crossOrigin='anonymous'
        /> */}
      </body>
    </html>
  )
}
