// Script para Liferay - Sistema de WhatsApp Institucional General
// Se ejecuta cuando NO hay programa específico detectado

// Configuración mock para desarrollo en Next.js
const mockConfiguration = {
  whatsAppAcademicLevel: 'pre',
  applyImmediate: false,
  enableDebugLogs: true // En dev siempre habilitado, en Liferay controlado por configuración
}

// En Liferay usa 'configuration', en Next.js usa mock
const whatsAppConfig = typeof configuration !== 'undefined' ? configuration : mockConfiguration

// Obtener utilidades globales
const StringUtils = window.StringUtils || {
  removeAccents: str => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '',
  slugify: str =>
    str
      ?.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-') || ''
}

try {
  // Log inicial SIEMPRE visible (confirmación de carga)
  console.log('📱 [WhatsApp-Gral] Script cargado')

  const wpAcademicLevel = whatsAppConfig['whatsAppAcademicLevel'] || 'pre'
  let academicLevel = wpAcademicLevel

  // Parsing robusto para configuración de Liferay
  try {
    if (typeof wpAcademicLevel === 'string' && wpAcademicLevel.startsWith('{')) {
      const parsed = JSON.parse(wpAcademicLevel)
      academicLevel = parsed.dataTheme || parsed.value || wpAcademicLevel
    }
  } catch (e) {
    console.log('📱 [WhatsApp-Gral] Usando configuración simple:', wpAcademicLevel)
    academicLevel = wpAcademicLevel
  }

  // Variables para control de programa detectado
  let programDetected = false
  let institutionalWhatsApp = null

  // Obtener configuración de debug logs
  const debugEnabled = (() => {
    try {
      // En desarrollo (Next.js) siempre mostrar logs
      if (typeof configuration === 'undefined') {
        return true
      }

      // En Liferay, verificar configuración
      const enableLogs = whatsAppConfig['enableDebugLogs']
      if (typeof enableLogs === 'string' && enableLogs.startsWith('{')) {
        const parsed = JSON.parse(enableLogs)
        return parsed.dataTheme === 'true' || parsed.value === true
      }

      return enableLogs === true || enableLogs === 'true'
    } catch (e) {
      // Por defecto, NO mostrar logs en producción
      return false
    }
  })()

  // Logger configurable
  const logger = {
    log: (message, ...args) => {
      if (debugEnabled) {
        console.log(`🟢 [WhatsApp-Gral] ${message}`, ...args)
      }
    },
    warn: (message, ...args) => {
      if (debugEnabled) {
        console.warn(`🟠 [WhatsApp-Gral] ${message}`, ...args)
      }
    },
    error: (message, ...args) => {
      if (debugEnabled) {
        console.error(`🔴 [WhatsApp-Gral] ${message}`, ...args)
      }
    },
    // Logs que SIEMPRE se muestran (críticos)
    forceLog: (message, ...args) => {
      console.log(`📱 [WhatsApp-Gral] ${message}`, ...args)
    },
    forceWarn: (message, ...args) => {
      console.warn(`⚠️ [WhatsApp-Gral] ${message}`, ...args)
    },
    forceError: (message, ...args) => {
      console.error(`❌ [WhatsApp-Gral] ${message}`, ...args)
    }
  }

  logger.log(`Inicializando WhatsApp institucional - Nivel: ${academicLevel}`)
  logger.log(`Debug logs habilitados: ${debugEnabled}`)

  // ==========================================
  // FUNCIÓN PARA CARGAR WHATSAPP DIRECTAMENTE DESDE API
  // ==========================================
  async function loadWhatsAppsDirectly() {
    try {
      logger.log('🔄 Cargando WhatsApps directamente desde API...')
      const response = await fetch('https://www.javeriana.edu.co/recursosdb/d/info-prg/whatsapps')

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const whatsApps = await response.json()

      if (whatsApps && typeof whatsApps === 'object') {
        window.whatsApps = whatsApps
        logger.log('✅ WhatsApps cargados directamente desde API')
        showWhatsAppTable(whatsApps)
        return whatsApps
      } else {
        throw new Error('Datos de WhatsApp inválidos recibidos de la API')
      }
    } catch (error) {
      logger.error('❌ Error cargando WhatsApps desde API:', error)
      return null
    }
  }

  // ==========================================
  // FUNCIÓN PARA MOSTRAR TABLA DE WHATSAPP DISPONIBLES
  // ==========================================
  function showWhatsAppTable(whatsApps) {
    // Solo mostrar tabla si debug está habilitado
    if (!debugEnabled) {
      return
    }

    if (!whatsApps) {
      logger.warn('No hay datos de WhatsApp disponibles')
      return
    }

    console.log('📋 [WhatsApp-Gral] TABLA DE NÚMEROS DE WHATSAPP DISPONIBLES:')
    console.log('='.repeat(80))

    // Crear tabla para mostrar en consola
    const tableData = []

    Object.keys(whatsApps).forEach(facultyKey => {
      const faculty = whatsApps[facultyKey]
      if (faculty && typeof faculty === 'object') {
        Object.keys(faculty).forEach(level => {
          const number = faculty[level]
          tableData.push({
            Facultad: facultyKey,
            Nivel: level,
            Número: number,
            Tipo: facultyKey === 'default' ? '🏛️ Institucional' : '🎓 Específico'
          })
        })
      }
    })

    if (tableData.length > 0) {
      console.table(tableData)
      console.log(`📊 Total de números encontrados: ${tableData.length}`)

      // Mostrar resumen por facultad
      const facultyCount = Object.keys(whatsApps).length
      console.log(`🏢 Facultades disponibles: ${facultyCount}`)
      console.log('🔍 Facultades:', Object.keys(whatsApps).join(', '))
    } else {
      console.warn('⚠️ No se encontraron números de WhatsApp válidos')
    }

    console.log('='.repeat(80))
  }

  // ==========================================
  // FUNCIÓN PARA APLICAR WHATSAPP INSTITUCIONAL
  // ==========================================
  function applyInstitutionalWhatsApp(whatsApps, level) {
    // Siempre usar números institucionales (default)
    const institutionalNumbers = whatsApps['default']
    if (!institutionalNumbers) {
      logger.warn('No se encontraron números institucionales de WhatsApp')
      return
    }

    const whatsAppNumber = institutionalNumbers[level]
    if (!whatsAppNumber) {
      logger.warn(`No se encontró número institucional para nivel: ${level}`)
      return
    }

    // Modifica el link de WhatsApp en elementos <a> con data-puj-link-whatsapp="true"
    document.querySelectorAll('[data-puj-link-whatsapp="true"]').forEach(el => {
      el.setAttribute('href', `https://wa.me/${whatsAppNumber.replace(/\s+/g, '')}`)
      el.setAttribute('target', '_blank')
      el.setAttribute('data-whatsapp-type', 'institucional')
    })

    // Modifica el texto en cualquier elemento con data-puj-number-whatsapp="true"
    document.querySelectorAll('[data-puj-number-whatsapp="true"]').forEach(el => {
      el.textContent = whatsAppNumber
      el.setAttribute('data-whatsapp-type', 'institucional')
    })

    return whatsAppNumber
  }

  // ==========================================
  // APLICACIÓN INMEDIATA (SIN PROGRAMA)
  // ==========================================
  // Aplicar WhatsApp institucional inmediatamente para páginas sin programa
  function initializeInstitutionalWhatsApp() {
    // Verificar si existe el objeto global de WhatsApps
    if (typeof window.whatsApps !== 'undefined' && window.whatsApps) {
      logger.log('Datos de WhatsApp encontrados globalmente')
      showWhatsAppTable(window.whatsApps)
      institutionalWhatsApp = applyInstitutionalWhatsApp(window.whatsApps, academicLevel)
      logger.log('WhatsApp institucional aplicado inmediatamente:', institutionalWhatsApp)
    } else {
      logger.log('Esperando datos de WhatsApp...')
    }
  }

  // ==========================================
  // LISTENER PARA EVENTOS DE PROGRAMA
  // ==========================================
  document.addEventListener('data_load-program', function (event) {
    const dataProgram = event.detail.dataProgram
    const whatsApps = event.detail.whatsApps

    // **SOLUCIÓN**: Guardar WhatsApps globalmente para uso posterior
    if (whatsApps) {
      window.whatsApps = whatsApps
      logger.log('✅ WhatsApps guardados globalmente desde evento data_load-program')
      logger.log('Mostrando WhatsApps disponibles desde evento:')
      showWhatsAppTable(whatsApps)
    }

    // Marcar que se detectó un programa
    programDetected = true

    logger.log('Programa detectado en página con WhatsApp general')
    logger.log('Datos del programa:', dataProgram)

    logger.log('No aplicando números institucionales - el sistema regular de WhatsApp se encargará')

    // El sistema regular de WhatsApp se encargará de este caso
    // Este script solo actúa cuando NO hay programa
  })

  // ==========================================
  // TIMEOUT PARA APLICAR INSTITUCIONAL SI NO HAY PROGRAMA
  // ==========================================
  // Esperar un tiempo prudencial para que se dispare el evento de programa
  setTimeout(async () => {
    if (!programDetected) {
      logger.log('No se detectó programa específico - aplicando WhatsApp institucional')

      // Verificar si hay datos reales de WhatsApp (guardados por el evento o ya existentes)
      if (typeof window.whatsApps !== 'undefined' && window.whatsApps) {
        logger.log('✅ Usando datos reales de WhatsApp disponibles:')
        showWhatsAppTable(window.whatsApps)
        institutionalWhatsApp = applyInstitutionalWhatsApp(window.whatsApps, academicLevel)

        // Actualizar display element con éxito
        const displayElement = document.getElementById('whatsAppSelector')
        if (displayElement) {
          displayElement.textContent = `WhatsApp institucional: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | General`
        }
      } else {
        // Solo para desarrollo en Next.js - NO crear números fake en Liferay
        if (typeof configuration === 'undefined') {
          // Estamos en Next.js - crear datos mock
          window.whatsApps = {
            default: {
              pre: '+57 310 200 1234',
              pos: '+57 310 200 1235'
            }
          }
          logger.log('🔧 [DEV] Usando números mock para Next.js')
          showWhatsAppTable(window.whatsApps)
          institutionalWhatsApp = applyInstitutionalWhatsApp(window.whatsApps, academicLevel)

          // Actualizar display element
          const displayElement = document.getElementById('whatsAppSelector')
          if (displayElement) {
            displayElement.textContent = `WhatsApp institucional: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | General (DEV)`
          }
        } else {
          // Estamos en Liferay - intentar cargar directamente desde API
          logger.log('⚠️ No se encontraron datos desde evento - intentando cargar desde API directamente')

          const whatsApps = await loadWhatsAppsDirectly()

          if (whatsApps) {
            institutionalWhatsApp = applyInstitutionalWhatsApp(whatsApps, academicLevel)

            // Actualizar display element con éxito
            const displayElement = document.getElementById('whatsAppSelector')
            if (displayElement) {
              displayElement.textContent = `WhatsApp institucional: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | General (API)`
            }
          } else {
            // ERROR CRÍTICO - siempre mostrar
            logger.forceError('No se pudieron cargar los datos de WhatsApp desde API')
            logger.forceError('Verifica la conectividad y que la API esté funcionando')

            // Actualizar display element con error
            const displayElement = document.getElementById('whatsAppSelector')
            if (displayElement) {
              displayElement.textContent = 'WhatsApp institucional: ERROR - No se pudieron cargar datos'
            }
          }
        }
      }
    } else {
      // Programa detectado - mostrar en display element que no aplica
      const displayElement = document.getElementById('whatsAppSelector')
      if (displayElement) {
        displayElement.textContent = 'WhatsApp institucional: No aplicable (hay programa específico)'
      }
    }
  }, 2000) // Esperar 2 segundos para detectar programa

  // ==========================================
  // INICIALIZACIÓN INMEDIATA OPCIONAL
  // ==========================================
  // Si se quiere aplicar inmediatamente (sin esperar)
  if (whatsAppConfig['applyImmediate'] === 'true') {
    initializeInstitutionalWhatsApp()
  }

  // Actualizar display element inicial
  const displayElement = document.getElementById('whatsAppSelector')
  if (displayElement) {
    displayElement.textContent = `WhatsApp institucional: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | Esperando detección...`
  }
} catch (error) {
  console.error('Error al cargar la configuración de WhatsApp institucional:', error)
}
