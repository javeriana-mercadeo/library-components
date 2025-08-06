// Script para Liferay - Sistema de WhatsApp Institucional General
// Se ejecuta cuando NO hay programa específico detectado
const whatsAppConfig = configuration

// Obtener utilidades globales
const StringUtils = window.StringUtils || {
  removeAccents: str => str?.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '',
  slugify: str => str?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9\s-]/g, '').trim().replace(/[\s-]+/g, '-') || ''
}

try {
  const wpAcademicLevel = whatsAppConfig['whatsAppAcademicLevel']
  const academicLevel = wpAcademicLevel.startsWith('{') ? JSON.parse(wpAcademicLevel).dataTheme : wpAcademicLevel

  // Variables para control de programa detectado
  let programDetected = false
  let institutionalWhatsApp = null

  // ==========================================
  // FUNCIÓN PARA APLICAR WHATSAPP INSTITUCIONAL
  // ==========================================
  function applyInstitutionalWhatsApp(whatsApps, level) {
    // Siempre usar números institucionales (default)
    const institutionalNumbers = whatsApps['default']
    if (!institutionalNumbers) {
      console.warn('No se encontraron números institucionales de WhatsApp')
      return
    }

    const whatsAppNumber = institutionalNumbers[level]
    if (!whatsAppNumber) {
      console.warn(`No se encontró número institucional para nivel: ${level}`)
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
      institutionalWhatsApp = applyInstitutionalWhatsApp(window.whatsApps, academicLevel)
      console.log('WhatsApp institucional aplicado inmediatamente:', institutionalWhatsApp)
    } else {
      console.log('Esperando datos de WhatsApp...')
    }
  }

  // ==========================================
  // LISTENER PARA EVENTOS DE PROGRAMA
  // ==========================================
  document.addEventListener('data_load-program', function (event) {
    const dataProgram = event.detail.dataProgram
    const whatsApps = event.detail.whatsApps

    // Marcar que se detectó un programa
    programDetected = true
    
    console.log('Programa detectado en página con WhatsApp general - no aplicando números institucionales')
    
    // El sistema regular de WhatsApp se encargará de este caso
    // Este script solo actúa cuando NO hay programa
  })

  // ==========================================
  // TIMEOUT PARA APLICAR INSTITUCIONAL SI NO HAY PROGRAMA
  // ==========================================
  // Esperar un tiempo prudencial para que se dispare el evento de programa
  setTimeout(() => {
    if (!programDetected) {
      console.log('No se detectó programa específico - aplicando WhatsApp institucional')
      
      // Si no hay whatsApps globalmente, intentar usar estructura básica
      if (typeof window.whatsApps === 'undefined') {
        // Crear estructura mínima para pruebas
        window.whatsApps = {
          default: {
            pre: '+57 321 123 4567', // Número de ejemplo - reemplazar con real
            pos: '+57 321 123 4568'  // Número de ejemplo - reemplazar con real
          }
        }
        console.warn('Usando números de WhatsApp de ejemplo - configurar números reales')
      }
      
      institutionalWhatsApp = applyInstitutionalWhatsApp(window.whatsApps, academicLevel)
      
      // Actualizar display element
      const displayElement = document.getElementById('whatsAppSelector')
      if (displayElement) {
        displayElement.textContent = `WhatsApp institucional: ${academicLevel === 'pre' ? 'Pregrado' : 'Posgrado'} | General`
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