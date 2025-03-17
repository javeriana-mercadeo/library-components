import '@/styles/_tailwind.css'
import '@/styles/global.scss'

//import '@/styles/liferayStyles.css'

import { Metadata } from 'next'
import { Providers } from './providers'
import { siteConfig } from '@/config/site'

import Footer from './_components/footer/footer'
import Header from './_components/header/header'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className="light">
      <head>
        {/* <!-- Flowbite CSS --> */}
        <link href="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.css" rel="stylesheet" />
      </head>
      <body>
        <Providers themeProps={{ attribute: 'data-theme' }}>
          <div className="relative flex flex-col h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>

        {/* <script>
          document.addEventListener("DOMContentLoaded", function () {
            document
              .querySelectorAll("link.lfr-css-file")
              .forEach((link) => link.remove());
          });
        </script> */}

        {/* <!-- Iconos Phosphor --> */}
        <script src="https://unpkg.com/@phosphor-icons/web@2.1.1"></script>

        {/* <!-- Tailwind css --> */}
        {/* <script src="https://www.javeriana.edu.co/planestudio/pages/libraries/tailwindcss/tailwindcss.js"></script> */}

        {/* <!-- Flowbite --> */}
        <script src="https://cdn.jsdelivr.net/npm/flowbite@3.1.2/dist/flowbite.min.js"></script>

        {/* <!-- DataTables --> */}
        <script src="https://www.javeriana.edu.co/planestudio/pages/libraries/simple_datatables/simple-datatables.js"></script>
      </body>
    </html>
  )
}
