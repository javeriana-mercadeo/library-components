'use client'
import { useEffect, useRef, useState } from 'react'

/**
 * Hook personalizado para cargar scripts solo en el cliente
 * Evita problemas de SSR al asegurar que el script se ejecute solo después del montaje
 *
 * @param {Function|Promise|null} scriptLoader - Función o promesa que ejecuta el script de cliente
 * @param {{ staticMode?: boolean }} options - Configuración adicional para controlar la ejecución
 * @returns {boolean} mounted - Estado que indica si el componente está montado
 *
 * @example
 * // Uso con importación estática
 * import script from './script.js'
 * const mounted = useScript(script)
 *
 * @example
 * // Uso con importación dinámica
 * const mounted = useScript(() => import('./script.js'))
 */
export function useScript(scriptLoader, options = {}) {
  const { staticMode = false } = options
  const [mounted, setMounted] = useState(false)
  const loaderRef = useRef(null)

  useEffect(() => {
    loaderRef.current = scriptLoader || null
  }, [scriptLoader])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || staticMode) return

    const loader = loaderRef.current
    if (!loader) return

    // Si scriptLoader es una función que retorna una promesa (import dinámico)
    if (typeof loader === 'function') {
      const result = loader()

      // Si es una promesa (import dinámico)
      if (result && typeof result.then === 'function') {
        result
          .then(module => {
            const script = module.default || module
            if (typeof script === 'function') {
              script()
            }
          })
          .catch(err => {
            console.error('[useScript] Error loading script:', err)
          })
      }
      // Si es una función directa (import estático)
      else {
        loader()
      }
    }
    // Si se pasa una promesa directamente
    else if (loader && typeof loader.then === 'function') {
      loader
        .then(module => {
          const script = module.default || module
          if (typeof script === 'function') {
            script()
          }
        })
        .catch(err => {
          console.error('[useScript] Error loading script:', err)
        })
    }
  }, [mounted, staticMode])

  return mounted
}

export default useScript
