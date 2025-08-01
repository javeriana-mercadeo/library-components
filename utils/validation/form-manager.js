/**
 * @fileoverview Sistema de gestión de formularios avanzado
 * @module FormManager
 */

// Fallbacks para utilidades en caso de que no estén disponibles
const getUtilities = () => {
  return {
    ValidatorUtils: (typeof window !== 'undefined' && window.ValidatorUtils) ||
      window.Validators || {
        required: value => value != null && value.toString().trim().length > 0,
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      },
    DOMUtils: (typeof window !== 'undefined' && window.DOMUtils) || {
      findElements: (selector, context = document) => Array.from((context || document).querySelectorAll(selector)),
      findElement: (selector, context = document) => (context || document).querySelector(selector),
      addClass: (el, className) => el && el.classList.add(className),
      removeClass: (el, className) => el && el.classList.remove(className),
      createElement: (tag, options = {}) => {
        const el = document.createElement(tag)
        if (options.className) el.className = options.className
        if (options.content) el.textContent = options.content
        if (options.attributes) {
          Object.entries(options.attributes).forEach(([key, value]) => el.setAttribute(key, value))
        }
        return el
      },
      findParent: (el, selector) => el && el.closest(selector),
      remove: el => el && el.remove(),
      scrollTo: (el, options) => el && el.scrollIntoView(options)
    },
    EventManager: (typeof window !== 'undefined' && window.EventManager) || {
      add: (el, event, handler) => el && el.addEventListener(event, handler),
      removeByElement: el => console.log('EventManager.removeByElement not available')
    },
    Logger: (typeof window !== 'undefined' && window.Logger) || {
      warning: (...args) => console.warn('[WARNING]', ...args),
      success: (...args) => console.log('[SUCCESS]', ...args),
      info: (...args) => console.info('[INFO]', ...args)
    },
    TimingUtils: (typeof window !== 'undefined' && window.TimingUtils) || {
      debounce: (func, wait) => {
        let timeout
        return function (...args) {
          clearTimeout(timeout)
          timeout = setTimeout(() => func(...args), wait)
        }
      }
    }
  }
}

// Crear instancia única del FormManager
function createFormManager() {
  const fieldRules = new Map()
  const forms = new Map()
  const defaultMessages = {
    required: 'Este campo es requerido',
    email: 'Ingresa un email válido',
    phone: 'Ingresa un número de teléfono válido',
    minLength: 'Mínimo {min} caracteres',
    maxLength: 'Máximo {max} caracteres',
    pattern: 'Formato inválido',
    custom: 'Valor inválido'
  }

  return {
    setDefaultMessages(messages) {
      Object.assign(defaultMessages, messages)
    },

    setFieldRules(formId, rules) {
      fieldRules.set(formId, rules)
    },

    addFieldRule(formId, fieldName, rule) {
      if (!fieldRules.has(formId)) {
        fieldRules.set(formId, {})
      }
      fieldRules.get(formId)[fieldName] = rule
    },

    validateField(field, customRules = {}) {
      const formId = field.form?.id || 'default'
      const rules = {
        ...fieldRules.get(formId),
        ...fieldRules.get('default'),
        ...customRules
      }

      const { name, value, type } = field
      const rule = rules[name]

      if (!rule) {
        return { isValid: true, message: '' }
      }

      const validators = Array.isArray(rule.validators) ? rule.validators : [rule.validators || rule.validator]

      for (const validatorConfig of validators) {
        let validator,
          options = {},
          message = rule.message
        const { ValidatorUtils, Logger } = getUtilities()

        if (typeof validatorConfig === 'string') {
          validator = ValidatorUtils[validatorConfig]
        } else if (typeof validatorConfig === 'function') {
          validator = validatorConfig
        } else if (typeof validatorConfig === 'object') {
          validator = typeof validatorConfig.validator === 'string' ? ValidatorUtils[validatorConfig.validator] : validatorConfig.validator
          options = validatorConfig.options || {}
          message = validatorConfig.message || message
        }

        if (!validator) {
          Logger.warning(`Validador no encontrado para el campo: ${name}`)
          continue
        }

        let isValid
        if (Object.keys(options).length > 0) {
          isValid = validator(value, ...Object.values(options))
        } else {
          isValid = validator(value)
        }

        if (!isValid) {
          const finalMessage = this.interpolateMessage(message || defaultMessages.custom, options)
          return { isValid: false, message: finalMessage }
        }
      }

      return { isValid: true, message: '' }
    },

    interpolateMessage(message, options) {
      if (!message || typeof message !== 'string') return message

      return message.replace(/\{(\w+)\}/g, (match, key) => {
        return options[key] !== undefined ? options[key] : match
      })
    },

    validateFields(fields, customRules = {}) {
      const results = {}
      let allValid = true

      fields.forEach(field => {
        const result = this.validateField(field, customRules)
        results[field.name] = result
        if (!result.isValid) allValid = false
      })

      return { isValid: allValid, results }
    },

    validateForm(form, customRules = {}) {
      if (!form) return { isValid: false, results: {} }

      const { DOMUtils } = getUtilities()
      const fields = DOMUtils.findElements('input, select, textarea', form).filter(
        field => field.name && (field.required || this.hasRule(form.id, field.name))
      )

      return this.validateFields(fields, customRules)
    },

    hasRule(formId, fieldName) {
      const rules = fieldRules.get(formId) || fieldRules.get('default') || {}
      return !!rules[fieldName]
    },

    showFieldError(field, message) {
      if (!field) return

      const { DOMUtils } = getUtilities()
      const fieldId = field.id || field.name
      const container = this.getFieldContainer(field)

      if (!container) return

      this.clearFieldError(field)

      DOMUtils.addClass(field, 'error')
      DOMUtils.removeClass(field, 'validated')

      const label = container.querySelector('.form-label, label')
      if (label) {
        DOMUtils.addClass(label, 'error')
      }

      const errorElement = DOMUtils.createElement('span', {
        className: 'field-error',
        content: message,
        attributes: {
          'data-field': fieldId
        }
      })

      container.appendChild(errorElement)

      field.setAttribute('aria-invalid', 'true')
      field.setAttribute('aria-describedby', `${fieldId}-error`)
      errorElement.id = `${fieldId}-error`
    },

    clearFieldError(field) {
      if (!field) return

      const { DOMUtils } = getUtilities()
      const fieldId = field.id || field.name
      const container = this.getFieldContainer(field)

      if (!container) return

      DOMUtils.removeClass(field, 'error')

      const label = container.querySelector('.form-label, label')
      if (label) {
        DOMUtils.removeClass(label, 'error')
      }

      const existingError = container.querySelector('.field-error')
      if (existingError) {
        DOMUtils.remove(existingError)
      }

      field.removeAttribute('aria-invalid')
      field.removeAttribute('aria-describedby')
    },

    markFieldAsValid(field) {
      if (!field) return

      const { DOMUtils } = getUtilities()
      this.clearFieldError(field)
      DOMUtils.addClass(field, 'validated')
      field.setAttribute('aria-invalid', 'false')
    },

    getFieldContainer(field) {
      const { DOMUtils } = getUtilities()
      return DOMUtils.findParent(field, '.form-group, .field-group, .input-group') || field.parentElement
    },

    setupLiveValidation(form, options = {}) {
      if (!form) return

      const { customRules = {}, validateOnBlur = true, validateOnInput = false, debounceMs = 300 } = options

      const { DOMUtils, EventManager, TimingUtils } = getUtilities()
      const fields = DOMUtils.findElements('input, select, textarea', form)

      fields.forEach(field => {
        if (validateOnBlur) {
          EventManager.add(field, 'blur', () => {
            const result = this.validateField(field, customRules)
            if (!result.isValid) {
              this.showFieldError(field, result.message)
            } else if (field.value.trim() !== '') {
              this.markFieldAsValid(field)
            }
          })
        }

        if (validateOnInput) {
          const debouncedValidation = TimingUtils.debounce(() => {
            const result = this.validateField(field, customRules)
            if (!result.isValid && field.value.trim() !== '') {
              this.showFieldError(field, result.message)
            } else if (field.value.trim() !== '') {
              this.markFieldAsValid(field)
            } else {
              this.clearFieldError(field)
            }
          }, debounceMs)

          EventManager.add(field, 'input', debouncedValidation)
        }

        EventManager.add(field, 'focus', () => {
          DOMUtils.addClass(field, 'focused')
        })

        EventManager.add(field, 'blur', () => {
          DOMUtils.removeClass(field, 'focused')
        })
      })

      const { Logger } = getUtilities()
      Logger.success(`Validación en vivo configurada para ${fields.length} campos`)
    },

    setupSubmitValidation(form, onSubmit, options = {}) {
      if (!form || typeof onSubmit !== 'function') return

      const { customRules = {}, preventDefault = true } = options
      const { EventManager, DOMUtils } = getUtilities()

      EventManager.add(form, 'submit', e => {
        if (preventDefault) {
          e.preventDefault()
        }

        const validation = this.validateForm(form, customRules)

        Object.entries(validation.results).forEach(([fieldName, result]) => {
          const field = DOMUtils.findElement(`[name="${fieldName}"]`, form)
          if (field) {
            if (!result.isValid) {
              this.showFieldError(field, result.message)
            } else {
              this.markFieldAsValid(field)
            }
          }
        })

        if (validation.isValid) {
          onSubmit(form, validation, e)
        } else {
          const firstErrorField = DOMUtils.findElement('.error', form)
          if (firstErrorField) {
            DOMUtils.scrollTo(firstErrorField, { block: 'center' })
            firstErrorField.focus()
          }
        }
      })
    },

    setupForm(form, options = {}) {
      if (!form) return

      const {
        formId = form.id || 'default',
        fieldRules: formFieldRules = {},
        liveValidation = true,
        submitValidation = true,
        onSubmit = null,
        ...otherOptions
      } = options

      if (Object.keys(formFieldRules).length > 0) {
        this.setFieldRules(formId, formFieldRules)
      }

      if (liveValidation) {
        this.setupLiveValidation(form, otherOptions)
      }

      if (submitValidation && onSubmit) {
        this.setupSubmitValidation(form, onSubmit, otherOptions)
      }

      forms.set(formId, {
        form,
        options: { formId, fieldRules: formFieldRules, liveValidation, submitValidation, onSubmit, ...otherOptions }
      })

      const { Logger } = getUtilities()
      Logger.success(`Formulario configurado: ${formId}`)
      return formId
    },

    getFormData(form, options = {}) {
      if (!form) return {}

      const { includeEmpty = false, transform = null } = options
      const formData = new FormData(form)
      const data = {}

      for (const [key, value] of formData.entries()) {
        if (includeEmpty || value !== '') {
          data[key] = transform ? transform(key, value) : value
        }
      }

      return data
    },

    setFormData(form, data) {
      if (!form || !data) return

      const { DOMUtils } = getUtilities()
      Object.entries(data).forEach(([name, value]) => {
        const field = DOMUtils.findElement(`[name="${name}"]`, form)
        if (field) {
          if (field.type === 'checkbox' || field.type === 'radio') {
            field.checked = !!value
          } else {
            field.value = value
          }
        }
      })
    },

    clearForm(form) {
      if (!form) return

      const { DOMUtils } = getUtilities()
      const fields = DOMUtils.findElements('input, select, textarea', form)
      fields.forEach(field => {
        if (field.type === 'checkbox' || field.type === 'radio') {
          field.checked = false
        } else {
          field.value = ''
        }

        this.clearFieldError(field)
        DOMUtils.removeClass(field, ['error', 'validated', 'focused'])
      })

      form.reset()
    },

    destroyForm(formId) {
      if (forms.has(formId)) {
        const { form } = forms.get(formId)
        const { EventManager, Logger } = getUtilities()
        EventManager.removeByElement(form)
        forms.delete(formId)
        fieldRules.delete(formId)
        Logger.info(`Formulario destruido: ${formId}`)
      }
    },

    destroyAll() {
      for (const [formId] of forms.entries()) {
        this.destroyForm(formId)
      }
    }
  }
}

// Crear instancia única
const FormManager = createFormManager()

export { FormManager }
