'use client'

import { useState } from 'react'
import Container from '@library/components/container'
import ViewComponent from '@/app/_components/viewComponent/viewComponent'
import Splash from '@/app/_library/components/splash'
import { Button as Btn } from '@heroui/react'

// Import modal components
import BasicModal from './components/BasicModal'

// Import modal styles
import './components/styles.scss'

/**
 * Componente para mostrar código y su resultado renderizado
 */
const CodePreview = ({
  title,
  code,
  children,
  description
}: {
  title: string
  code: string
  children: React.ReactNode
  description?: string
}) => {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="border border-[var(--neutral-800)] rounded-lg bg-[var(--background-100)] overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-[var(--background-200)] border-b border-[var(--neutral-800)]">
        <div>
          <h4 className="text-sm font-semibold text-[var(--neutral-200)]">{title}</h4>
          {description && <p className="text-xs text-[var(--neutral-500)] mt-1">{description}</p>}
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs px-3 py-1 bg-[var(--neutral-800)] text-[var(--neutral-300)] rounded hover:bg-[var(--neutral-700)] transition-colors">
          {showCode ? 'Ver resultado' : 'Ver código'}
        </button>
      </div>

      <div className="p-4">
        {showCode ? (
          <div className="bg-[var(--neutral-900)] rounded-lg p-4 overflow-x-auto">
            <pre className="text-sm text-[var(--neutral-300)]">
              <code>{code}</code>
            </pre>
          </div>
        ) : (
          <div className="space-y-2">{children}</div>
        )}
      </div>
    </div>
  )
}

export default function ModalShowcase() {
  return (
    <>
      <Splash />
      <Container>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-[var(--neutral-200)]">Biblioteca de Modales</h1>
          <p className="text-lg text-[var(--neutral-400)] max-w-2xl mx-auto">
            Sistema de modales basado en la estructura del popup existente. Diseñado para ser compatible con Liferay DXP y fácilmente
            extensible para diferentes casos de uso.
          </p>
        </div>

        {/* Modal Básico */}
        <div className="mb-12 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">🎯 Modal Básico</h2>

          <ViewComponent path="/app/fragments/components/modals/components/BasicModal">
            <BasicModal />
          </ViewComponent>

          <div className="mt-4 text-sm text-[var(--neutral-500)]">
            Modal base con estructura estándar: overlay, contenido, botón de cerrar y botón de acción.
            Basado en la estructura del popup existente y listo para ser personalizado según tus diseños específicos.
          </div>
        </div>

        {/* Guía de Uso */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">📋 Estructura Base</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2">
                <span className="text-green-500">🏗️</span>
                Componentes del Modal
              </h3>
              <div className="space-y-3 text-sm text-[var(--neutral-400)]">
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Botón Trigger</strong> - Botón para abrir el modal</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Overlay</strong> - Fondo semi-transparente</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Contenedor</strong> - Caja principal del modal</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Botón Cerrar</strong> - Ícono X en la esquina</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-green-500">•</span>
                  <span><strong>Contenido</strong> - Área editable con Liferay</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 text-[var(--neutral-300)] flex items-center gap-2">
                <span className="text-blue-500">⚙️</span>
                Compatibilidad Liferay
              </h3>
              <div className="space-y-3 text-sm text-[var(--neutral-400)]">
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Elementos <code className="bg-[var(--neutral-800)] px-1 rounded">lfr-editable</code> para contenido</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>JavaScript vanilla en archivos <code className="bg-[var(--neutral-800)] px-1 rounded">.js</code> separados</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>JSX estático sin hooks de React</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Variables CSS del sistema de temas</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-500">•</span>
                  <span>Responsive design automático</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Personalización */}
        <div className="mt-16 p-6 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h2 className="text-2xl font-semibold mb-6 text-[var(--neutral-200)]">🎨 Personalización</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <CodePreview
              title="Estructura Base del Modal"
              description="Componentes principales que puedes personalizar"
              code={`// Estructura JSX básica
<>
  {/* Botón trigger */}
  <Btn data-popup="#modalId">Abrir Modal</Btn>

  {/* Modal overlay */}
  <div id="modalId" className="popup-overlay">
    <div className="popup-content">
      {/* Botón cerrar */}
      <Btn className="popup-close close">×</Btn>

      {/* Contenido personalizable */}
      <div className="content">
        <lfr-editable id="modal-title" type="rich-text">
          Tu título aquí
        </lfr-editable>
        <lfr-editable id="modal-content" type="rich-text">
          Tu contenido aquí
        </lfr-editable>
      </div>
    </div>
  </div>
</>`}>
              <div className="space-y-2 text-[var(--neutral-400)] text-sm">
                <p>• <strong>Trigger Button:</strong> Personaliza color, tamaño y texto</p>
                <p>• <strong>Modal Content:</strong> Usa lfr-editable para contenido dinámico</p>
                <p>• <strong>Estilos:</strong> Variables CSS del sistema de temas</p>
              </div>
            </CodePreview>

            <CodePreview
              title="Script de Funcionalidad"
              description="JavaScript vanilla para la interactividad"
              code={`// Script básico en modalScript.js
export default () => {
  // Abrir modal
  setupEvent('[data-popup="#modalId"]', 'click', el => {
    document.querySelector('#modalId').style.display = 'flex'
  })

  // Cerrar modal
  setupEvent('.popup-close', 'click', el => {
    el.target.closest('.popup-overlay').style.display = 'none'
  })

  // Cerrar al hacer click en overlay
  setupEvent('.popup-overlay', 'click', el => {
    if (el.target === el.currentTarget) {
      el.target.style.display = 'none'
    }
  })
}`}>
              <div className="space-y-2 text-[var(--neutral-400)] text-sm">
                <p>• <strong>Event Listeners:</strong> Manejo de clicks y interacciones</p>
                <p>• <strong>Configuración:</strong> autoOpen, showOpenButton</p>
                <p>• <strong>Vanilla JS:</strong> Compatible 100% con Liferay</p>
              </div>
            </CodePreview>
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="mt-16 text-center p-8 bg-[var(--background-200)] rounded-xl border border-[var(--neutral-800)]">
          <h3 className="text-xl font-semibold mb-4 text-[var(--neutral-200)]">🚀 Listo para tus Diseños Específicos</h3>
          <p className="text-[var(--neutral-400)] mb-6 max-w-2xl mx-auto">
            Este modal básico está basado en la estructura del popup existente y está listo para ser extendido con tus diseños específicos.
            Mantiene total compatibilidad con Liferay DXP y el sistema de temas del proyecto.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Btn variant="solid" color="primary" startIcon={<i className="ph ph-code"></i>}>
              Ver código base
            </Btn>
            <Btn variant="bordered" color="secondary" startIcon={<i className="ph ph-download-simple"></i>}>
              Descargar estructura
            </Btn>
            <Btn variant="light" color="tertiary" startIcon={<i className="ph ph-plus"></i>}>
              Agregar modal personalizado
            </Btn>
          </div>
        </div>
      </Container>
    </>
  )
}