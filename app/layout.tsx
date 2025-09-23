import '@/styles/vendors/_tailwind.css'
import '@/styles/global.scss'
//import '@/styles/liferayStyles.css'
import { Metadata, Viewport } from 'next'
import Script from 'next/script'

import ThemeSwitch from '../components/themeSwitch/theme-switch'
import BtnReturn from '../components/btnReturn/btnReturn'
import { ClientSideUtils } from '../components/clientSideUtils/ClientSideUtils'

import { Providers } from './providers'

import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className='light' lang='en'>
      <head>
        {/* <!-- Flowbite CSS --> */}
        <link href='https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css' rel='stylesheet' />
        <link href='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css' rel='stylesheet' />

        <link href='https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/regular/style.css' rel='stylesheet' type='text/css' />
        <link href='https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.1/src/fill/style.css' rel='stylesheet' type='text/css' />
        {/* Utilidades globales - DEBE CARGARSE PRIMERO */}
        <title>Librería de componentes</title>
      </head>
      <body suppressHydrationWarning>
        <Providers themeProps={{ attribute: 'data-theme' }}>
          <ClientSideUtils />
          <div className='relative flex flex-col'>
            <ThemeSwitch />
            <BtnReturn />
            <main className='global-container'>{children}</main>
          </div>
        </Providers>

        {/* <script>
          const isEditMode = document.body.classList.contains('has-edit-mode-menu');
          const isSignedIn = document.body.classList.contains('signed-in');

          if (!isEditMode && !isSignedIn) {
            document
              .querySelectorAll("link.lfr-css-file")
              .forEach((link) => link.remove());
          }
        </script> */}
        {/* <!-- Swiper JS --> */}
        <Script src='https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js' strategy='afterInteractive' />

        {/* <!-- Tailwind css --> */}
        {/* <Script src="https://www.javeriana.edu.co/planestudio/pages/libraries/tailwindcss/tailwindcss.js" strategy="afterInteractive" /> */}

        {/* <!-- Flowbite --> */}
        <Script src='https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js' strategy='afterInteractive' />

        {/* <!-- DataTables --> */}
        {/* <Script
          src='https://www.javeriana.edu.co/planestudio/pages/libraries/simple_datatables/simple-datatables.js'
          strategy='afterInteractive'
        /> */}
      </body>
    </html>
  )
}
