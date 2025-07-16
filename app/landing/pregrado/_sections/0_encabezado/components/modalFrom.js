// ===========================================
// FORM MANAGER - Integración con FormModules
// ===========================================

// Configuración del formulario
const configModalForm = {
  eventName: 'Open Day Pregrado Javeriana 2024',
  eventDate: '2024-07-15',
  campaign: 'PREGRADO_MODAL_2024',
  article: 'landing_pregrado',
  source: 'modal_landing',
  medium: 'organico',
  typeAttendee: ['Aspirante'],
  programs: ['PSICO'],
  sandboxMode: true,
  debugMode: true,
  devMode: false,
  debugEmail: 'gavilanm-j@javeriana.edu.co'
}

// Instanciar FormModules
const ModalForm = {
  formModulesInstance: null,

  async init() {
    this.formModulesInstance = new window.FormModules('formProgram', configModalForm)
    await this.formModulesInstance.initialize()
  },

  cleanup() {
    if (this.formModulesInstance) {
      this.formModulesInstance.destroy()
      this.formModulesInstance = null
    }
  }
}

export { ModalForm }
