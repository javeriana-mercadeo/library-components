function initGlobalUtils() {
  // ===========================================
  // UTILIDADES GLOBALES
  // ===========================================

  // Logger para debugging
  const Logger = {
    debug: (message, ...args) => console.log(`🔍 [DEBUG] ${message}`, ...args),
    info: (message, ...args) => console.log(`ℹ️ [INFO] ${message}`, ...args),
    success: (message, ...args) => console.log(`✅ [SUCCESS] ${message}`, ...args),
    warning: (message, ...args) => console.warn(`⚠️ [WARNING] ${message}`, ...args),
    error: (message, ...args) => console.error(`❌ [ERROR] ${message}`, ...args)
  }

  // Helpers para manipulación del DOM
  const DOMHelpers = {
    isReady(callback) {
      if (typeof document === 'undefined') return

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback)
      } else {
        callback()
      }
    },

    toggleClasses(element, classes, force = null) {
      if (!element) return
      classes.forEach(className => {
        if (force === null) {
          element.classList.toggle(className)
        } else {
          element.classList.toggle(className, force)
        }
      })
    },

    createElement(tag, className = '', content = '') {
      if (typeof document === 'undefined') return null

      const element = document.createElement(tag)
      if (className) element.className = className
      if (content) element.innerHTML = content
      return element
    },

    findElement(selector, context = document) {
      if (typeof document === 'undefined') return null
      return context.querySelector(selector)
    },

    findElements(selector, context = document) {
      if (typeof document === 'undefined') return []
      return Array.from(context.querySelectorAll(selector))
    }
  }

  // Gestor de eventos centralizado
  const EventManager = {
    listeners: new Map(),

    add(element, event, handler, options = {}) {
      if (!element) return false

      const key = `${element.constructor.name}-${event}-${Date.now()}`
      element.addEventListener(event, handler, options)

      this.listeners.set(key, { element, event, handler, options })
      return key
    },

    remove(key) {
      if (!this.listeners.has(key)) return false

      const { element, event, handler } = this.listeners.get(key)
      element.removeEventListener(event, handler)
      this.listeners.delete(key)
      return true
    },

    cleanup() {
      this.listeners.forEach(({ element, event, handler }) => {
        element.removeEventListener(event, handler)
      })
      this.listeners.clear()
      Logger.debug('Event listeners limpiados')
    }
  }

  // Utilidades de tiempo
  const TimingUtils = {
    delay(callback, ms = 0) {
      return setTimeout(callback, ms)
    },

    debounce(func, wait = 300) {
      let timeout
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout)
          func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
      }
    },

    throttle(func, limit = 100) {
      let inThrottle
      return function (...args) {
        if (!inThrottle) {
          func.apply(this, args)
          inThrottle = true
          setTimeout(() => (inThrottle = false), limit)
        }
      }
    }
  }

  // Validadores individuales
  const Validators = {
    // Validadores básicos
    required: value => value && value.toString().trim().length > 0,
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    phone: value => /^[+]?[\d\s\-()]{10,15}$/.test(value),
    document: value => /^\d{6,12}$/.test(value),
    name: value => value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value),

    // Validadores específicos del formulario
    firstName: value => value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value),
    lastName: value => value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value),
    identificationType: value => value && value.toString().trim().length > 0,
    identificationNumber: value => value && value.toString().trim().length > 0,
    phoneNumber: value => value && value.toString().trim().length > 0,
    emailField: value => (value.trim() !== '' ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) : true),
    country: value => value && value.toString().trim().length > 0,
    department: value => value && value.toString().trim().length > 0,
    city: value => value && value.toString().trim().length > 0,

    // Validadores de contraseña
    password: value => value.length >= 8,
    passwordStrong: value => {
      const hasUpper = /[A-Z]/.test(value)
      const hasLower = /[a-z]/.test(value)
      const hasNumber = /\d/.test(value)
      const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)
      return value.length >= 8 && hasUpper && hasLower && hasNumber && hasSpecial
    },

    // Validadores de URL
    url: value => {
      try {
        new URL(value)
        return true
      } catch {
        return false
      }
    },

    // Validadores numéricos
    number: value => !isNaN(value) && !isNaN(parseFloat(value)),
    integer: value => Number.isInteger(Number(value)),
    positive: value => Number(value) > 0,
    range: (value, min, max) => {
      const num = Number(value)
      return num >= min && num <= max
    },

    // Validadores de longitud
    minLength: (value, min) => value.toString().length >= min,
    maxLength: (value, max) => value.toString().length <= max,
    exactLength: (value, length) => value.toString().length === length
  }

  // Gestor de APIs - Solo métodos HTTP genéricos
  const APIManager = {
    async get(url, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const data = await response.json()
        Logger.success(`GET request exitoso: ${url}`)
        return data
      } catch (error) {
        Logger.error(`Error en GET request a ${url}:`, error)
        throw error
      }
    },

    async post(url, data = {}, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          body: JSON.stringify(data),
          ...options
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const responseData = await response.json()
        Logger.success(`POST request exitoso: ${url}`)
        return responseData
      } catch (error) {
        Logger.error(`Error en POST request a ${url}:`, error)
        throw error
      }
    },

    async put(url, data = {}, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          body: JSON.stringify(data),
          ...options
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const responseData = await response.json()
        Logger.success(`PUT request exitoso: ${url}`)
        return responseData
      } catch (error) {
        Logger.error(`Error en PUT request a ${url}:`, error)
        throw error
      }
    },

    async delete(url, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          ...options
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const responseData = await response.json()
        Logger.success(`DELETE request exitoso: ${url}`)
        return responseData
      } catch (error) {
        Logger.error(`Error en DELETE request a ${url}:`, error)
        throw error
      }
    },

    async patch(url, data = {}, options = {}) {
      try {
        const response = await fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          body: JSON.stringify(data),
          ...options
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }

        const responseData = await response.json()
        Logger.success(`PATCH request exitoso: ${url}`)
        return responseData
      } catch (error) {
        Logger.error(`Error en PATCH request a ${url}:`, error)
        throw error
      }
    }
  }

  // Sistema de gestión general de formularios
  const FormManager = {
    // Configuración de reglas de validación por campo
    fieldRules: {
      first_name: { validator: 'firstName', message: 'Mínimo 2 caracteres, solo letras' },
      last_name: { validator: 'lastName', message: 'Mínimo 2 caracteres, solo letras' },
      '00N5G00000WmhsT': { validator: 'identificationType', message: 'Selecciona un tipo de identificación' },
      '00NJw000002mzbM': { validator: 'identificationNumber', message: 'Ingresa un número de identificación' },
      phone: { validator: 'phoneNumber', message: 'Ingresa un número de teléfono' },
      email: { validator: 'emailField', message: 'Ingresa un email válido' },
      '00N5G00000WmhvJ': { validator: 'country', message: 'Selecciona un país' },
      '00N5G00000WmhvX': { validator: 'department', message: 'Selecciona un departamento' },
      '00N5G00000WmhvO': { validator: 'city', message: 'Selecciona una ciudad' }
    },

    // Validar un campo individual
    validateField(input, customRules = {}) {
      const rules = { ...this.fieldRules, ...customRules }
      const { name, value } = input

      if (!rules[name]) {
        return { isValid: true, message: '' }
      }

      const rule = rules[name]
      const validator = typeof rule.validator === 'string' ? Validators[rule.validator] : rule.validator

      if (!validator) {
        Logger.warning(`Validador no encontrado para el campo: ${name}`)
        return { isValid: true, message: '' }
      }

      const isValid = validator(value)
      return {
        isValid,
        message: isValid ? '' : rule.message
      }
    },

    // Validar múltiples campos
    validateFields(inputs, customRules = {}) {
      const results = {}
      let allValid = true

      inputs.forEach(input => {
        const result = this.validateField(input, customRules)
        results[input.name] = result
        if (!result.isValid) allValid = false
      })

      return { isValid: allValid, results }
    },

    // Validar formulario completo
    validateForm(form, customRules = {}) {
      if (!form) return { isValid: false, results: {} }

      const inputs = DOMHelpers.findElements('input[required], select[required]', form)
      return this.validateFields(inputs, customRules)
    },

    // Mostrar error en campo
    showFieldError(fieldId, message) {
      const field = DOMHelpers.findElement(`#${fieldId}`)
      if (!field) return

      const container = field.closest('.form-group') || field.parentElement
      if (!container) return

      // Limpiar errores existentes
      this.clearFieldError(fieldId)

      // Agregar clases de error
      DOMHelpers.toggleClasses(field, ['error'], true)
      DOMHelpers.toggleClasses(field, ['validated'], false)

      const label = container.querySelector('.form-label')
      if (label) {
        DOMHelpers.toggleClasses(label, ['error'], true)
      }

      // Agregar mensaje de error
      const errorElement = DOMHelpers.createElement('span', 'field-error', message)
      container.appendChild(errorElement)
    },

    // Limpiar error de campo
    clearFieldError(fieldId) {
      const field = DOMHelpers.findElement(`#${fieldId}`)
      if (!field) return

      const container = field.closest('.form-group') || field.parentElement
      if (!container) return

      // Remover clases de error
      DOMHelpers.toggleClasses(field, ['error'], false)

      const label = container.querySelector('.form-label')
      if (label) {
        DOMHelpers.toggleClasses(label, ['error'], false)
      }

      // Remover mensaje de error
      const existingError = container.querySelector('.field-error')
      if (existingError) existingError.remove()
    },

    // Marcar campo como válido
    markFieldAsValid(fieldId) {
      const field = DOMHelpers.findElement(`#${fieldId}`)
      if (!field) return

      this.clearFieldError(fieldId)
      DOMHelpers.toggleClasses(field, ['validated'], true)
    },

    // Configurar validación en tiempo real para un formulario
    setupLiveValidation(form, customRules = {}) {
      if (!form) return

      const inputs = DOMHelpers.findElements('input, select, textarea', form)

      inputs.forEach(input => {
        // Validación en blur para campos requeridos
        EventManager.add(input, 'blur', () => {
          if (input.hasAttribute('required')) {
            const result = this.validateField(input, customRules)
            if (!result.isValid) {
              this.showFieldError(input.id, result.message)
            } else {
              this.markFieldAsValid(input.id)
            }
          }
        })

        // Validación en tiempo real para email
        if (input.type === 'email') {
          EventManager.add(input, 'input', () => {
            if (input.value.trim() !== '') {
              const result = this.validateField(input, customRules)
              if (!result.isValid) {
                this.showFieldError(input.id, result.message)
              } else {
                this.markFieldAsValid(input.id)
              }
            } else {
              this.clearFieldError(input.id)
            }
          })
        }
      })
    },

    // Limpiar todos los errores del formulario
    clearFormErrors(form) {
      if (!form) return

      const inputs = DOMHelpers.findElements('input, select, textarea', form)
      inputs.forEach(input => {
        if (input.id) {
          this.clearFieldError(input.id)
        }
      })
    },

    // Configurar submit handler con validación
    setupSubmitValidation(form, onSubmit, customRules = {}) {
      if (!form || typeof onSubmit !== 'function') return

      EventManager.add(form, 'submit', e => {
        e.preventDefault()

        const validation = this.validateForm(form, customRules)

        // Mostrar errores si los hay
        Object.entries(validation.results).forEach(([fieldName, result]) => {
          const field = DOMHelpers.findElement(`[name="${fieldName}"]`, form)
          if (field && field.id) {
            if (!result.isValid) {
              this.showFieldError(field.id, result.message)
            } else {
              this.markFieldAsValid(field.id)
            }
          }
        })

        // Validar términos y condiciones si existen
        const termsCheckbox = DOMHelpers.findElement('input[name="00N5G00000WmhvF"]', form)
        if (termsCheckbox && !termsCheckbox.checked) {
          validation.isValid = false
          const termsGroup = DOMHelpers.findElement('.terms-group', form)
          if (termsGroup) termsGroup.classList.add('error')
        }

        // Ejecutar callback de submit si todo es válido
        if (validation.isValid) {
          onSubmit(form, validation)
        }
      })
    },

    // Configurar formulario completo (validación + submit)
    setupForm(form, options = {}) {
      const { customRules = {}, liveValidation = true, onSubmit = null } = options

      if (!form) return

      if (liveValidation) {
        this.setupLiveValidation(form, customRules)
      }

      if (onSubmit) {
        this.setupSubmitValidation(form, onSubmit, customRules)
      }

      Logger.success(`Formulario configurado: ${form.id || 'sin ID'}`)
    }
  }

  // Exponer utilidades globalmente solo en el navegador
  if (typeof window !== 'undefined') {
    window.Logger = Logger
    window.DOMHelpers = DOMHelpers
    window.EventManager = EventManager
    window.TimingUtils = TimingUtils
    window.Validators = Validators
    window.APIManager = APIManager
    window.FormManager = FormManager

    // Marcar como cargadas
    window.__GLOBAL_UTILS_LOADED__ = true

    Logger.success('Utilidades globales inicializadas')
  }
}

// Auto-ejecutar si estamos en el navegador
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  initGlobalUtils()
}

// Exportar la función para uso manual
export default initGlobalUtils
