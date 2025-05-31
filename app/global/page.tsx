// app/global-assets/page.tsx
import Container from '@library/components/container/Container'
import Splash from '@/app/_library/components/splash'
import GlobalAssetsViewer from './components/GlobalAssetsViewer'

export default function GlobalAssetsPage() {
  return (
    <>
      <Splash />
      <div className="min-h-screen bg-[var(--background-100)] py-8">
        <Container className="max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--neutral-200)] mb-2">Assets Globales Compilados</h1>
            <p className="text-[var(--neutral-400)] max-w-2xl mx-auto">
              CSS y JavaScript compilados desde tus archivos SCSS y utilidades globales. Listos para usar en producción o desarrollo.
            </p>
          </div>

          {/* Global Assets Viewer */}
          <GlobalAssetsViewer />

          {/* Additional info */}
          <div className="mt-8 p-4 bg-[var(--background-200)] rounded-lg border border-[var(--neutral-700)]">
            <div className="flex items-start gap-3">
              <i className="ph ph-info text-[var(--primary-600)] mt-1"></i>
              <div className="text-sm">
                <p className="font-medium text-[var(--neutral-200)] mb-1">💡 Sobre la compilación automática</p>
                <p className="text-[var(--neutral-400)]">
                  Estos archivos se generan automáticamente cuando ejecutas el comando de compilación. Incluyen todos los estilos SCSS
                  compilados, variables de tema y utilidades JavaScript necesarias para el correcto funcionamiento de los componentes.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export const metadata = {
  title: 'Assets Globales Compilados',
  description: 'CSS y JavaScript compilados de la biblioteca de componentes'
}
