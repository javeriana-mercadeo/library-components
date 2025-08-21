// ===========================================
// FORM MANAGER - Integración con FormModules
// ===========================================

// Instanciar FormModules
const ModalForm = {
  formModulesInstance: null,

  async init() {
    document.addEventListener('data_load-program', async event => {
      try {
        const { programa, codPrograma } = event.detail.dataProgram
        if (typeof Logger !== 'undefined' && Logger.info) {
          Logger.info(`📋 [FORM] Iniciando FormModules para: ${programa} (${codPrograma})`)
        } else {
          console.log(`Iniciando FormModules para el programa: ${programa} con código: ${codPrograma}`)
        }

        this.formModulesInstance = new window.FormModules('formProgram', {
          // Datos del evento
          eventName: `Landing Page: ${programa}`,
          campaign: codPrograma,
          typeAttendee: ['Aspirante'],
          programs: [codPrograma],
          // Configuración del formulario
          test: false,
          debug: false,
          development: false,
          debugEmail: '', // Email para debug
          retUrl: 'https://www.javeriana.edu.co/info-prg/thank-you-pregrado',
          requestOrigin: 'Web to Lead'
        })

        await this.formModulesInstance.initialize()

        if (typeof Logger !== 'undefined' && Logger.success) {
          Logger.success(`📋 [FORM] FormModules inicializado correctamente para ${programa}`)
        }
      } catch (error) {
        if (typeof Logger !== 'undefined' && Logger.error) {
          Logger.error('📋 [FORM] Error inicializando FormModules:', error)
        } else {
          console.error('Error inicializando FormModules:', error)
        }
      }
    })
  },

  cleanup() {
    if (this.formModulesInstance) {
      this.formModulesInstance.destroy()
      this.formModulesInstance = null
    }
  }
}

export { ModalForm }
