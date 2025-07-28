export default () => {
  // ==========================================
  // CONFIGURACIÓN DEL FOOTER
  // ==========================================
  const FOOTER_CONFIG = {
    logSettings: {
      enableLogs: false // Control maestro - cambiar a true para activar TODOS los logs
    },
    updateSettings: {
      intervalMinutes: 1, // Intervalo de actualización en minutos
      enableAutoUpdate: true // Habilitar actualización automática
    }
  }

  // ==========================================
  // SISTEMA DE LOGGING CENTRALIZADO
  // ==========================================

  /**
   * Función centralizada para manejo de logs - control maestro simple
   */
  function logMessage(message, ...args) {
    if (FOOTER_CONFIG.logSettings.enableLogs) {
      console.log(message, ...args)
    }
  }

  // Log de inicialización
  logMessage('📦 [FOOTER] Script cargado - iniciando sistema de copyright dinámico...')

  const updateCopyrightYear = () => {
    const copyrightElement = document.querySelector('#footer .footer__bottom p:not(.footer__info)')

    if (copyrightElement) {
      const currentYear = new Date().getFullYear()
      const previousText = copyrightElement.textContent
      const copyrightText = `Copyright © ${currentYear} Pontificia Universidad Javeriana`

      logMessage(`🗓️  [FOOTER] Año actual detectado: ${currentYear}`)
      logMessage(`📝 [FOOTER] Texto anterior: "${previousText}"`)
      logMessage(`✨ [FOOTER] Nuevo texto: "${copyrightText}"`)

      if (copyrightElement.textContent !== copyrightText) {
        copyrightElement.textContent = copyrightText
        logMessage(`✅ [FOOTER] Copyright actualizado exitosamente a año ${currentYear}`)
      } else {
        logMessage(`ℹ️  [FOOTER] El copyright ya está actualizado con el año ${currentYear}`)
      }
    } else {
      logMessage('❌ [FOOTER] Elemento de copyright no encontrado')
    }
  }

  const initializeFooter = () => {
    logMessage('🚀 [FOOTER] Inicializando footer script...')
    updateCopyrightYear()

    if (FOOTER_CONFIG.updateSettings.enableAutoUpdate) {
      const intervalMs = FOOTER_CONFIG.updateSettings.intervalMinutes * 60 * 1000
      logMessage(`⏰ [FOOTER] Configurando actualización automática cada ${FOOTER_CONFIG.updateSettings.intervalMinutes} minuto(s)`)
      setInterval(updateCopyrightYear, intervalMs)
    } else {
      logMessage('⏸️  [FOOTER] Actualización automática deshabilitada')
    }
  }

  // Patrón exacto de las secciones que funcionan en Liferay - inicialización directa
  const checkAndInit = () => {
    if (typeof window !== 'undefined') {
      logMessage('🌐 [FOOTER] Window disponible, iniciando footer...')
      initializeFooter()
    } else {
      logMessage('⏳ [FOOTER] Window no disponible, reintentando en 300ms...')
      setTimeout(checkAndInit, 300)
    }
  }

  checkAndInit()
}
