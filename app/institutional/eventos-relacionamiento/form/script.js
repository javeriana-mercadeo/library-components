// ===========================================
// EVENTOS FORM MANAGER - Integración con FormModules
// ===========================================

// Instanciar FormModules para eventos
const EventosFormManager = {
  formModulesInstance: null,

  async init() {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return

    console.log('🚀 [EVENTOS] Inicializando FormModules para eventos')

    try {
      // Verificar que FormModules esté disponible
      if (!window.FormModules) {
        console.warn('⚠️ [EVENTOS] FormModules no está disponible')
        return
      }

      // Configuración hardcodeada para eventos
      this.formModulesInstance = new window.FormModules('form_SF', {
        // Datos del evento - hardcodeados
        eventName: 'Eventos de Relacionamiento - Todos los niveles académicos',
        eventDate: '', // Fecha se establecerá dinámicamente
        campaign: 'EVENTOS_RELACIONAMIENTO',
        typeAttendee: ['Aspirante', 'Padre de familia y/o acudiente', 'Docente y/o psicoorientador'],
        programs: ['TODOS'], // Todos los programas

        // Configuración del formulario
        test: false,
        debug: true,
        development: false,
        debugEmail: 'gesalas@javeriana.edu.co',
        thankYouUrl: 'https://www.javeriana.edu.co/info-prg/thank-you-eventos'
      })

      await this.formModulesInstance.initialize()
      console.log('✅ [EVENTOS] FormModules inicializado exitosamente')
    } catch (error) {
      console.error('❌ [EVENTOS] Error al inicializar FormModules:', error)
    }
  },

  cleanup() {
    if (this.formModulesInstance) {
      this.formModulesInstance.destroy()
      this.formModulesInstance = null
    }
  }
}

// ███████████████████████████████████████████████████████████████████████████████
// █                        INICIALIZACIÓN                                     █
// ███████████████████████████████████████████████████████████████████████████████

// Función de inicialización para React
function initEventosForm() {
  // Solo ejecutar en el cliente
  if (typeof window === 'undefined') return

  // Esperar a que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      EventosFormManager.init()
    })
  } else {
    EventosFormManager.init()
  }
}

// Auto-inicializar si no es un módulo
if (typeof module === 'undefined' && typeof window !== 'undefined') {
  initEventosForm()
}

// Exportar para uso en React
export default initEventosForm

// Exponer globalmente para debugging
if (typeof window !== 'undefined') {
  window.EventosFormManager = EventosFormManager
}
