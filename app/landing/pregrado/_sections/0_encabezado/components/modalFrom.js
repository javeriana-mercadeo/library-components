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
        eventName: `Landing Page: ${programa}`,
        eventDate: '2024-07-15',
        campaign: 'PREGRADO_MODAL_2024',
        article: 'landing_pregrado',
        source: 'modal_landing',
        medium: 'organico',
        typeAttendee: ['Aspirante'],
        programs: [codPrograma],
        sandboxMode: true,
        debugMode: true,
        devMode: false,
        debugEmail: 'gavilanm-j@javeriana.edu.co'
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
