// ===========================================
// FORM MANAGER - Integración con FormModules
// ===========================================

// Instanciar FormModules
const ModalForm = {
  formModulesInstance: null,

  async init() {
    document.addEventListener('data_load-program', async event => {
      const { programa, codPrograma } = event.detail.dataProgram
      console.log(`Iniciando FormModules para el programa: ${programa} con código: ${codPrograma}`)

      this.formModulesInstance = new window.FormModules('formProgram', {
        // Datos del evento
        eventName: `Landing Page: ${programa}`,
        eventDate: '', // Qué fecha se usará para el evento
        campaign: codPrograma,
        typeAttendee: ['Aspirante'],
        programs: [codPrograma],
        // Configuración del formulario
        test: false,
        debug: false,
        development: false,
        debugEmail: '', // Email para debug
        retUrl: 'https://www.javeriana.edu.co/info-prg/thank-you-pregrado'
      })

      await this.formModulesInstance.initialize()
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
