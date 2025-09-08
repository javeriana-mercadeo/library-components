// ===== LIBRERÍAS EXTERNAS =====
// Compilado automáticamente el: 2025-09-08T00:50:59.800Z


// ===== CÓDIGO PERSONALIZADO =====

// ===== IMPORTADO DE: ../utils/main =====
// Archivo: G:\Documentos\GitHub\library-components\utils\main.js

// ===== IMPORTADO DE: ./index.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\index.js

// ===== IMPORTADO DE: ./core/logger.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\core\logger.js
/**
 * @fileoverview Sistema de logging centralizado con diferentes niveles
 * @module Logger
 */

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  SUCCESS: 2,
  WARNING: 3,
  ERROR: 4
}

class LoggerClass {
  constructor() {
    this.level = LogLevel.ERROR // Solo mostrar errores
    this.enableTimestamp = true
    this.enableStackTrace = false
  }

  setLevel(level) {
    this.level = level
  }

  setTimestamp(enabled) {
    this.enableTimestamp = enabled
  }

  setStackTrace(enabled) {
    this.enableStackTrace = enabled
  }

  _formatMessage(level, message, emoji) {
    const timestamp = this.enableTimestamp ? `[${new Date().toISOString()}]` : ''
    const levelText = `[${level}]`
    return `${emoji} ${timestamp} ${levelText} ${message}`
  }

  _log(level, levelNum, emoji, message, ...args) {
    if (levelNum < this.level) return

    const formattedMessage = this._formatMessage(level, message, emoji)

    if (levelNum >= LogLevel.ERROR) {
      console.error(formattedMessage, ...args)
      if (this.enableStackTrace) console.trace()
    } else if (levelNum >= LogLevel.WARNING) {
      console.warn(formattedMessage, ...args)
    } else {
      console.log(formattedMessage, ...args)
    }
  }

  debug(message, ...args) {
    this._log('DEBUG', LogLevel.DEBUG, '🔍', message, ...args)
  }

  info(message, ...args) {
    this._log('INFO', LogLevel.INFO, 'ℹ️', message, ...args)
  }

  success(message, ...args) {
    this._log('SUCCESS', LogLevel.SUCCESS, '✅', message, ...args)
  }

  warning(message, ...args) {
    this._log('WARNING', LogLevel.WARNING, '⚠️', message, ...args)
  }

  error(message, ...args) {
    this._log('ERROR', LogLevel.ERROR, '❌', message, ...args)
  }

  group(label) {
    console.group(`📂 ${label}`)
  }

  groupEnd() {
    console.groupEnd()
  }

  table(data) {
    console.table(data)
  }

  time(label) {
    console.time(label)
  }

  timeEnd(label) {
    console.timeEnd(label)
  }
}

// Exportar instancia única
const Logger = new LoggerClass()


// ===== IMPORTADO DE: ./core/dom.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\core\dom.js
/**
 * @fileoverview Utilidades para manipulación del DOM
 * @module DOMUtils
 */

const DOMUtils = {
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
    const classArray = Array.isArray(classes) ? classes : [classes]

    classArray.forEach(className => {
      if (force === null) {
        element.classList.toggle(className)
      } else {
        element.classList.toggle(className, force)
      }
    })
  },

  addClass(element, classes) {
    if (!element) return
    const classArray = Array.isArray(classes) ? classes : [classes]
    element.classList.add(...classArray)
  },

  removeClass(element, classes) {
    if (!element) return
    const classArray = Array.isArray(classes) ? classes : [classes]
    element.classList.remove(...classArray)
  },

  hasClass(element, className) {
    return element ? element.classList.contains(className) : false
  },

  createElement(tag, options = {}) {
    if (typeof document === 'undefined') return null

    const element = document.createElement(tag)

    if (options.className) element.className = options.className
    if (options.id) element.id = options.id
    if (options.content) element.innerHTML = options.content
    if (options.textContent) element.textContent = options.textContent
    if (options.attributes) {
      Object.entries(options.attributes).forEach(([key, value]) => {
        element.setAttribute(key, value)
      })
    }
    if (options.styles) {
      Object.assign(element.style, options.styles)
    }

    return element
  },

  findElement(selector, context = document) {
    if (typeof document === 'undefined') return null
    return context.querySelector(selector)
  },

  findElements(selector, context = document) {
    if (typeof document === 'undefined') return []
    return Array.from(context.querySelectorAll(selector))
  },

  findParent(element, selector) {
    if (!element) return null
    return element.closest(selector)
  },

  findSiblings(element, selector = null) {
    if (!element || !element.parentNode) return []

    const siblings = Array.from(element.parentNode.children).filter(child => child !== element)
    return selector ? siblings.filter(sibling => sibling.matches(selector)) : siblings
  },

  insertAfter(newElement, targetElement) {
    if (!newElement || !targetElement || !targetElement.parentNode) return
    targetElement.parentNode.insertBefore(newElement, targetElement.nextSibling)
  },

  insertBefore(newElement, targetElement) {
    if (!newElement || !targetElement || !targetElement.parentNode) return
    targetElement.parentNode.insertBefore(newElement, targetElement)
  },

  remove(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element)
    }
  },

  empty(element) {
    if (element) {
      while (element.firstChild) {
        element.removeChild(element.firstChild)
      }
    }
  },

  getOffset(element) {
    if (!element) return { top: 0, left: 0 }

    const rect = element.getBoundingClientRect()
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset,
      width: rect.width,
      height: rect.height
    }
  },

  isVisible(element) {
    if (!element) return false
    return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
  },

  isInViewport(element, threshold = 0) {
    if (!element) return false

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const windowWidth = window.innerWidth || document.documentElement.clientWidth

    return (
      rect.top >= -threshold && rect.left >= -threshold && rect.bottom <= windowHeight + threshold && rect.right <= windowWidth + threshold
    )
  },

  scrollTo(element, options = {}) {
    if (!element) return

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    }

    element.scrollIntoView({ ...defaultOptions, ...options })
  },

  animate(element, keyframes, options = {}) {
    if (!element || !element.animate) return null

    const defaultOptions = {
      duration: 300,
      easing: 'ease-in-out',
      fill: 'both'
    }

    return element.animate(keyframes, { ...defaultOptions, ...options })
  },

  fadeIn(element, duration = 300) {
    if (!element) return

    element.style.opacity = '0'
    element.style.display = 'block'

    return this.animate(element, [{ opacity: 0 }, { opacity: 1 }], { duration })
  },

  fadeOut(element, duration = 300) {
    if (!element) return

    const animation = this.animate(element, [{ opacity: 1 }, { opacity: 0 }], { duration })

    if (animation) {
      animation.addEventListener('finish', () => {
        element.style.display = 'none'
      })
    }

    return animation
  }
}

// export { DOMUtils }


// ===== IMPORTADO DE: ./core/events.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\core\events.js

// ===== IMPORTADO DE: ./logger.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\core\logger.js
/**
 * @fileoverview Sistema de logging centralizado con diferentes niveles
 * @module Logger
 */

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  SUCCESS: 2,
  WARNING: 3,
  ERROR: 4
}

class LoggerClass {
  constructor() {
    this.level = LogLevel.ERROR // Solo mostrar errores
    this.enableTimestamp = true
    this.enableStackTrace = false
  }

  setLevel(level) {
    this.level = level
  }

  setTimestamp(enabled) {
    this.enableTimestamp = enabled
  }

  setStackTrace(enabled) {
    this.enableStackTrace = enabled
  }

  _formatMessage(level, message, emoji) {
    const timestamp = this.enableTimestamp ? `[${new Date().toISOString()}]` : ''
    const levelText = `[${level}]`
    return `${emoji} ${timestamp} ${levelText} ${message}`
  }

  _log(level, levelNum, emoji, message, ...args) {
    if (levelNum < this.level) return

    const formattedMessage = this._formatMessage(level, message, emoji)

    if (levelNum >= LogLevel.ERROR) {
      console.error(formattedMessage, ...args)
      if (this.enableStackTrace) console.trace()
    } else if (levelNum >= LogLevel.WARNING) {
      console.warn(formattedMessage, ...args)
    } else {
      console.log(formattedMessage, ...args)
    }
  }

  debug(message, ...args) {
    this._log('DEBUG', LogLevel.DEBUG, '🔍', message, ...args)
  }

  info(message, ...args) {
    this._log('INFO', LogLevel.INFO, 'ℹ️', message, ...args)
  }

  success(message, ...args) {
    this._log('SUCCESS', LogLevel.SUCCESS, '✅', message, ...args)
  }

  warning(message, ...args) {
    this._log('WARNING', LogLevel.WARNING, '⚠️', message, ...args)
  }

  error(message, ...args) {
    this._log('ERROR', LogLevel.ERROR, '❌', message, ...args)
  }

  group(label) {
    console.group(`📂 ${label}`)
  }

  groupEnd() {
    console.groupEnd()
  }

  table(data) {
    console.table(data)
  }

  time(label) {
    console.time(label)
  }

  timeEnd(label) {
    console.timeEnd(label)
  }
}

// Exportar instancia única
const Logger = new LoggerClass()


// ===== CÓDIGO PRINCIPAL =====
/**
 * @fileoverview Sistema de gestión de eventos centralizado
 * @module EventManager
 */


// Crear instancia única de EventManager
const EventManagerInstance = {
  listeners: new Map(),
  eventBus: new Map(),

  add(element, event, handler, options = {}) {
    if (!element) return false

    const key = `${element.constructor.name}-${event}-${Date.now()}-${Math.random()}`
    element.addEventListener(event, handler, options)

    this.listeners.set(key, { element, event, handler, options })
    Logger.debug(`Event listener agregado: ${event} en ${element.tagName || element.constructor.name}`)

    return key
  },

  remove(key) {
    if (!this.listeners.has(key)) return false

    const { element, event, handler } = this.listeners.get(key)
    element.removeEventListener(event, handler)
    this.listeners.delete(key)

    Logger.debug(`Event listener removido: ${key}`)
    return true
  },

  removeByElement(element) {
    let removedCount = 0

    for (const [key, listener] of this.listeners.entries()) {
      if (listener.element === element) {
        this.remove(key)
        removedCount++
      }
    }

    Logger.debug(`${removedCount} event listeners removidos del elemento`)
    return removedCount
  },

  removeByEvent(eventType) {
    let removedCount = 0

    for (const [key, listener] of this.listeners.entries()) {
      if (listener.event === eventType) {
        this.remove(key)
        removedCount++
      }
    }

    Logger.debug(`${removedCount} event listeners removidos del tipo: ${eventType}`)
    return removedCount
  },

  cleanup() {
    for (const [key] of this.listeners.entries()) {
      this.remove(key)
    }

    Logger.debug('Todos los event listeners limpiados')
  },

  delegate(container, selector, event, handler, options = {}) {
    if (!container) return false

    const delegatedHandler = e => {
      const target = e.target.closest(selector)
      if (target && container.contains(target)) {
        handler.call(target, e)
      }
    }

    return this.add(container, event, delegatedHandler, options)
  },

  once(element, event, handler, options = {}) {
    if (!element) return false

    const onceHandler = e => {
      handler(e)
      element.removeEventListener(event, onceHandler)
    }

    return this.add(element, event, onceHandler, options)
  },

  emit(element, eventType, detail = null, options = {}) {
    if (!element) return false

    const defaultOptions = {
      bubbles: true,
      cancelable: true,
      detail
    }

    const event = new CustomEvent(eventType, { ...defaultOptions, ...options })
    element.dispatchEvent(event)

    Logger.debug(`Evento custom emitido: ${eventType}`)
    return event
  },

  on(eventName, handler) {
    if (!this.eventBus.has(eventName)) {
      this.eventBus.set(eventName, new Set())
    }

    this.eventBus.get(eventName).add(handler)
    Logger.debug(`Handler agregado al event bus: ${eventName}`)
  },

  off(eventName, handler) {
    if (this.eventBus.has(eventName)) {
      this.eventBus.get(eventName).delete(handler)
      Logger.debug(`Handler removido del event bus: ${eventName}`)
    }
  },

  trigger(eventName, ...args) {
    if (this.eventBus.has(eventName)) {
      const handlers = this.eventBus.get(eventName)
      handlers.forEach(handler => {
        try {
          handler(...args)
        } catch (error) {
          Logger.error(`Error ejecutando handler para ${eventName}:`, error)
        }
      })

      Logger.debug(`Event bus disparado: ${eventName} con ${handlers.size} handlers`)
    }
  },

  getListenerCount() {
    return this.listeners.size
  },

  getEventBusCount() {
    let totalHandlers = 0
    for (const handlers of this.eventBus.values()) {
      totalHandlers += handlers.size
    }
    return totalHandlers
  },

  debug() {
    Logger.info(`Event Manager Stats:`)
    Logger.info(`  DOM Listeners: ${this.getListenerCount()}`)
    Logger.info(`  Event Bus Handlers: ${this.getEventBusCount()}`)
    Logger.table(
      Array.from(this.listeners.entries()).map(([key, listener]) => ({
        key,
        element: listener.element.tagName || listener.element.constructor.name,
        event: listener.event
      }))
    )
  }
}

const EventManager = EventManagerInstance


// ===== IMPORTADO DE: ./core/timing.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\core\timing.js
/**
 * @fileoverview Utilidades de tiempo y control de flujo
 * @module TimingUtils
 */

const TimingUtils = {
  delay(callback, ms = 0) {
    return setTimeout(callback, ms)
  },

  clearDelay(timeoutId) {
    clearTimeout(timeoutId)
  },

  interval(callback, ms = 1000) {
    return setInterval(callback, ms)
  },

  clearInterval(intervalId) {
    clearInterval(intervalId)
  },

  debounce(func, wait = 300, immediate = false) {
    let timeout

    return function executedFunction(...args) {
      const later = () => {
        timeout = null
        if (!immediate) func(...args)
      }

      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) func(...args)
    }
  },

  throttle(func, limit = 100, options = {}) {
    let inThrottle
    let lastFunc
    let lastRan

    const { leading = true, trailing = true } = options

    return function (...args) {
      if (!inThrottle) {
        if (leading) func.apply(this, args)
        lastRan = Date.now()
        inThrottle = true
      } else {
        if (trailing) {
          clearTimeout(lastFunc)
          lastFunc = setTimeout(
            () => {
              if (Date.now() - lastRan >= limit) {
                func.apply(this, args)
                lastRan = Date.now()
              }
            },
            limit - (Date.now() - lastRan)
          )
        }
      }

      setTimeout(() => (inThrottle = false), limit)
    }
  },

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  async retry(fn, maxAttempts = 3, delayMs = 1000) {
    let lastError

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await fn()
      } catch (error) {
        lastError = error

        if (attempt === maxAttempts) {
          throw lastError
        }

        await this.sleep(delayMs * attempt)
      }
    }
  },

  timeout(promise, ms, timeoutError = new Error('Timeout')) {
    return Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(timeoutError), ms))])
  },

  async waitFor(condition, options = {}) {
    const { timeout = 5000, interval = 100, timeoutError = new Error('Condition not met within timeout') } = options

    const startTime = Date.now()

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return true
      }
      await this.sleep(interval)
    }

    throw timeoutError
  },

  createScheduler() {
    const tasks = new Map()
    let taskId = 0

    return {
      schedule(callback, delay = 0) {
        const id = ++taskId
        const timeoutId = setTimeout(() => {
          callback()
          tasks.delete(id)
        }, delay)

        tasks.set(id, timeoutId)
        return id
      },

      cancel(id) {
        if (tasks.has(id)) {
          clearTimeout(tasks.get(id))
          tasks.delete(id)
          return true
        }
        return false
      },

      cancelAll() {
        tasks.forEach(timeoutId => clearTimeout(timeoutId))
        tasks.clear()
      },

      pending() {
        return tasks.size
      }
    }
  },

  createRateLimiter(maxCalls, windowMs) {
    const calls = []

    return {
      attempt() {
        const now = Date.now()
        const windowStart = now - windowMs

        while (calls.length > 0 && calls[0] < windowStart) {
          calls.shift()
        }

        if (calls.length < maxCalls) {
          calls.push(now)
          return true
        }

        return false
      },

      timeUntilReset() {
        if (calls.length === 0) return 0
        const oldestCall = calls[0]
        const windowEnd = oldestCall + windowMs
        return Math.max(0, windowEnd - Date.now())
      },

      remainingCalls() {
        return Math.max(0, maxCalls - calls.length)
      }
    }
  },

  measurePerformance(fn, iterations = 1) {
    const startTime = performance.now()

    for (let i = 0; i < iterations; i++) {
      fn()
    }

    const endTime = performance.now()
    const totalTime = endTime - startTime

    return {
      totalTime,
      averageTime: totalTime / iterations,
      iterations
    }
  },

  async measureAsyncPerformance(fn, iterations = 1) {
    const startTime = performance.now()

    for (let i = 0; i < iterations; i++) {
      await fn()
    }

    const endTime = performance.now()
    const totalTime = endTime - startTime

    return {
      totalTime,
      averageTime: totalTime / iterations,
      iterations
    }
  }
}

// export { TimingUtils }


// ===== IMPORTADO DE: ./validation/validators.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\validation\validators.js
/**
 * @fileoverview Sistema de validación robusto y extensible
 * @module Validators
 */

const ValidatorUtils = {
  required(value) {
    return value != null && value.toString().trim().length > 0
  },

  email(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value)
  },

  emailStrict(value) {
    const strictEmailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return strictEmailRegex.test(value)
  },

  phone(value) {
    const phoneRegex = /^[+]?[\d\s\-()]{10,15}$/
    return phoneRegex.test(value)
  },

  phoneInternational(value) {
    const intlPhoneRegex = /^\+?[1-9]\d{1,14}$/
    return intlPhoneRegex.test(value.replace(/[\s\-()]/g, ''))
  },

  document(value) {
    return /^\d{6,12}$/.test(value)
  },

  name(value) {
    return value.length >= 2 && /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/.test(value)
  },

  firstName(value) {
    return this.name(value) && value.trim().split(/\s+/).length >= 1
  },

  lastName(value) {
    return this.name(value) && value.trim().split(/\s+/).length >= 1
  },

  fullName(value) {
    return this.name(value) && value.trim().split(/\s+/).length >= 2
  },

  password(value) {
    return value.length >= 8
  },

  passwordStrong(value) {
    const hasUpper = /[A-Z]/.test(value)
    const hasLower = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value)
    const isLongEnough = value.length >= 8

    return isLongEnough && hasUpper && hasLower && hasNumber && hasSpecial
  },

  passwordMedium(value) {
    const hasUpper = /[A-Z]/.test(value)
    const hasLower = /[a-z]/.test(value)
    const hasNumber = /\d/.test(value)
    const isLongEnough = value.length >= 6

    return isLongEnough && ((hasUpper && hasLower) || (hasNumber && (hasUpper || hasLower)))
  },

  url(value) {
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  },

  urlHttp(value) {
    try {
      const url = new URL(value)
      return ['http:', 'https:'].includes(url.protocol)
    } catch {
      return false
    }
  },

  number(value) {
    return !isNaN(value) && !isNaN(parseFloat(value)) && isFinite(value)
  },

  integer(value) {
    return Number.isInteger(Number(value))
  },

  positive(value) {
    return this.number(value) && Number(value) > 0
  },

  negative(value) {
    return this.number(value) && Number(value) < 0
  },

  nonNegative(value) {
    return this.number(value) && Number(value) >= 0
  },

  range(value, min, max) {
    if (!this.number(value)) return false
    const num = Number(value)
    return num >= min && num <= max
  },

  minLength(value, min) {
    return value.toString().length >= min
  },

  maxLength(value, max) {
    return value.toString().length <= max
  },

  exactLength(value, length) {
    return value.toString().length === length
  },

  lengthRange(value, min, max) {
    const len = value.toString().length
    return len >= min && len <= max
  },

  alphanumeric(value) {
    return /^[a-zA-Z0-9]+$/.test(value)
  },

  alphabetic(value) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)
  },

  numeric(value) {
    return /^\d+$/.test(value)
  },

  slug(value) {
    return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
  },

  hexColor(value) {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value)
  },

  ipAddress(value) {
    const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/
    return ipv4Regex.test(value) || ipv6Regex.test(value)
  },

  creditCard(value) {
    const cleaned = value.replace(/[\s-]/g, '')
    if (!/^\d{13,19}$/.test(cleaned)) return false

    let sum = 0
    let isEven = false

    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i])

      if (isEven) {
        digit *= 2
        if (digit > 9) digit -= 9
      }

      sum += digit
      isEven = !isEven
    }

    return sum % 10 === 0
  },

  date(value) {
    const date = new Date(value)
    return date instanceof Date && !isNaN(date.getTime())
  },

  dateAfter(value, afterDate) {
    const date = new Date(value)
    const after = new Date(afterDate)
    return this.date(value) && this.date(afterDate) && date > after
  },

  dateBefore(value, beforeDate) {
    const date = new Date(value)
    const before = new Date(beforeDate)
    return this.date(value) && this.date(beforeDate) && date < before
  },

  dateRange(value, startDate, endDate) {
    const date = new Date(value)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return this.date(value) && this.date(startDate) && this.date(endDate) && date >= start && date <= end
  },

  age(value, minAge = 0, maxAge = 150) {
    const birthDate = new Date(value)
    if (!this.date(value)) return false

    const today = new Date()
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()

    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age

    return actualAge >= minAge && actualAge <= maxAge
  },

  regex(value, pattern, flags = '') {
    const regex = pattern instanceof RegExp ? pattern : new RegExp(pattern, flags)
    return regex.test(value)
  },

  oneOf(value, options) {
    return Array.isArray(options) && options.includes(value)
  },

  notOneOf(value, options) {
    return Array.isArray(options) && !options.includes(value)
  },

  array(value) {
    return Array.isArray(value)
  },

  arrayMinLength(value, min) {
    return this.array(value) && value.length >= min
  },

  arrayMaxLength(value, max) {
    return this.array(value) && value.length <= max
  },

  arrayUnique(value) {
    if (!this.array(value)) return false
    return new Set(value).size === value.length
  },

  object(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
  },

  boolean(value) {
    return typeof value === 'boolean'
  },

  file(value) {
    return value instanceof File
  },

  fileSize(value, maxSizeBytes) {
    return this.file(value) && value.size <= maxSizeBytes
  },

  fileType(value, allowedTypes) {
    if (!this.file(value)) return false
    const types = Array.isArray(allowedTypes) ? allowedTypes : [allowedTypes]
    return types.includes(value.type)
  },

  fileExtension(value, allowedExtensions) {
    if (!this.file(value)) return false
    const extensions = Array.isArray(allowedExtensions) ? allowedExtensions : [allowedExtensions]
    const fileName = value.name.toLowerCase()
    return extensions.some(ext => fileName.endsWith(ext.toLowerCase()))
  },

  compose(...validators) {
    return value => {
      for (const validator of validators) {
        if (!validator(value)) return false
      }
      return true
    }
  },

  custom(validatorFn) {
    return validatorFn
  }
}

// export { ValidatorUtils }


// ===== IMPORTADO DE: ./validation/form-manager.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\validation\form-manager.js
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
    DOMUtils: (typeof window !== 'undefined' && window.DOMUtils) ||
      window.DOMHelpers || {
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

// export { FormManager }


// ===== IMPORTADO DE: ./api/http-client.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\api\http-client.js
/**
 * @fileoverview Cliente HTTP avanzado con interceptors y manejo de errores
 * @module HTTPClient
 */

// HTTPClient como función constructora para evitar problemas de compilación
class HTTPClient {
  constructor(baseURL = '', options = {}) {
    // Propiedades de instancia
    this.baseURL = baseURL
    this.defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      timeout: 10000,
      retries: 0,
      retryDelay: 1000,
      ...options
    }

    this.requestInterceptors = []
    this.responseInterceptors = []
    this.errorInterceptors = []

    // Fallbacks para Logger y TimingUtils en caso de que no estén disponibles
    const Logger = (typeof window !== 'undefined' && window.Logger) || {
      debug: (...args) => console.log('[DEBUG]', ...args),
      error: (...args) => console.error('[ERROR]', ...args),
      success: (...args) => console.log('[SUCCESS]', ...args),
      info: (...args) => console.info('[INFO]', ...args)
    }

    const TimingUtils = (typeof window !== 'undefined' && window.TimingUtils) || {
      retry: async (fn, maxAttempts = 3, delayMs = 1000) => {
        let lastError
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
          try {
            return await fn()
          } catch (error) {
            lastError = error
            if (attempt === maxAttempts) throw lastError
            await new Promise(resolve => setTimeout(resolve, delayMs * attempt))
          }
        }
      },
      sleep: ms => new Promise(resolve => setTimeout(resolve, ms))
    }

    // Métodos de instancia
    this.addRequestInterceptor = function (interceptor) {
      this.requestInterceptors.push(interceptor)
    }

    this.addResponseInterceptor = function (interceptor) {
      this.responseInterceptors.push(interceptor)
    }

    this.addErrorInterceptor = function (interceptor) {
      this.errorInterceptors.push(interceptor)
    }

    this.processRequestInterceptors = async function (config) {
      let processedConfig = { ...config }

      for (const interceptor of this.requestInterceptors) {
        try {
          processedConfig = await interceptor(processedConfig)
        } catch (error) {
          Logger.error('Error en request interceptor:', error)
        }
      }

      return processedConfig
    }

    this.processResponseInterceptors = async function (response, config) {
      let processedResponse = response

      for (const interceptor of this.responseInterceptors) {
        try {
          processedResponse = await interceptor(processedResponse, config)
        } catch (error) {
          Logger.error('Error en response interceptor:', error)
        }
      }

      return processedResponse
    }

    this.processErrorInterceptors = async function (error, config) {
      let processedError = error

      for (const interceptor of this.errorInterceptors) {
        try {
          processedError = await interceptor(processedError, config)
        } catch (interceptorError) {
          Logger.error('Error en error interceptor:', interceptorError)
        }
      }

      return processedError
    }

    this.buildURL = function (endpoint) {
      if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
        return endpoint
      }

      const base = this.baseURL.replace(/\/$/, '')
      const path = endpoint.replace(/^\//, '')
      return base ? `${base}/${path}` : path
    }

    this.makeRequest = async function (method, endpoint, options = {}) {
      const config = {
        method: method.toUpperCase(),
        url: this.buildURL(endpoint),
        headers: { ...this.defaultOptions.headers, ...options.headers },
        timeout: options.timeout || this.defaultOptions.timeout,
        retries: options.retries !== undefined ? options.retries : this.defaultOptions.retries,
        retryDelay: options.retryDelay || this.defaultOptions.retryDelay,
        ...options
      }

      const processedConfig = await this.processRequestInterceptors(config)

      const makeAttempt = async () => {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), processedConfig.timeout)

        try {
          const fetchOptions = {
            method: processedConfig.method,
            headers: processedConfig.headers,
            signal: controller.signal,
            ...processedConfig
          }

          if (processedConfig.body) {
            if (processedConfig.headers['Content-Type'] === 'application/json') {
              fetchOptions.body = JSON.stringify(processedConfig.body)
            } else {
              fetchOptions.body = processedConfig.body
            }
          }

          Logger.debug(`${processedConfig.method} request iniciado: ${processedConfig.url}`)

          const response = await fetch(processedConfig.url, fetchOptions)
          clearTimeout(timeoutId)

          if (!response.ok) {
            const error = new Error(`HTTP ${response.status}: ${response.statusText}`)
            error.status = response.status
            error.statusText = response.statusText
            error.response = response
            throw error
          }

          const contentType = response.headers.get('content-type')
          let data

          if (contentType && contentType.includes('application/json')) {
            data = await response.json()
          } else if (contentType && contentType.includes('text/')) {
            data = await response.text()
          } else {
            data = await response.blob()
          }

          const result = {
            data,
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            config: processedConfig
          }

          Logger.success(`${processedConfig.method} request exitoso: ${processedConfig.url}`)
          return await this.processResponseInterceptors(result, processedConfig)
        } catch (error) {
          clearTimeout(timeoutId)

          if (error.name === 'AbortError') {
            error.message = `Request timeout después de ${processedConfig.timeout}ms`
          }

          Logger.error(`Error en ${processedConfig.method} request a ${processedConfig.url}:`, error)
          throw await this.processErrorInterceptors(error, processedConfig)
        }
      }

      if (processedConfig.retries > 0) {
        return await TimingUtils.retry(makeAttempt, processedConfig.retries + 1, processedConfig.retryDelay)
      } else {
        return await makeAttempt()
      }
    }

    this.get = async function (endpoint, options = {}) {
      return this.makeRequest('GET', endpoint, options)
    }

    this.post = async function (endpoint, data = null, options = {}) {
      return this.makeRequest('POST', endpoint, { ...options, body: data })
    }

    this.put = async function (endpoint, data = null, options = {}) {
      return this.makeRequest('PUT', endpoint, { ...options, body: data })
    }

    this.patch = async function (endpoint, data = null, options = {}) {
      return this.makeRequest('PATCH', endpoint, { ...options, body: data })
    }

    this.delete = async function (endpoint, options = {}) {
      return this.makeRequest('DELETE', endpoint, options)
    }

    this.head = async function (endpoint, options = {}) {
      return this.makeRequest('HEAD', endpoint, options)
    }

    this.options = async function (endpoint, options = {}) {
      return this.makeRequest('OPTIONS', endpoint, options)
    }

    this.uploadFile = async function (endpoint, file, options = {}) {
      const formData = new FormData()

      if (file instanceof File) {
        formData.append('file', file)
      } else if (typeof file === 'object') {
        Object.entries(file).forEach(([key, value]) => {
          formData.append(key, value)
        })
      }

      const uploadOptions = {
        ...options,
        body: formData,
        headers: {
          ...options.headers
        }
      }

      delete uploadOptions.headers['Content-Type']

      return this.makeRequest('POST', endpoint, uploadOptions)
    }

    this.createCancelToken = function () {
      const controller = new AbortController()

      return {
        signal: controller.signal,
        cancel: (reason = 'Request cancelled') => {
          controller.abort()
          Logger.info(`Request cancelado: ${reason}`)
        }
      }
    }

    this.setBaseURL = function (baseURL) {
      this.baseURL = baseURL
    }

    this.setDefaultHeader = function (name, value) {
      this.defaultOptions.headers[name] = value
    }

    this.removeDefaultHeader = function (name) {
      delete this.defaultOptions.headers[name]
    }

    this.setTimeout = function (timeout) {
      this.defaultOptions.timeout = timeout
    }

    this.setRetries = function (retries, retryDelay = 1000) {
      this.defaultOptions.retries = retries
      this.defaultOptions.retryDelay = retryDelay
    }
  }
}

// Instancia por defecto
const apiClient = new HTTPClient()

// Función helper para crear clientes
const createAPIClient = (baseURL, options) => {
  return new HTTPClient(baseURL, options)
}

// Helpers para interceptors
const setupAuthInterceptor = (client, getToken) => {
  client.addRequestInterceptor(async config => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

const setupRetryInterceptor = (client, shouldRetry = () => true) => {
  const TimingUtils = (typeof window !== 'undefined' && window.TimingUtils) || {
    sleep: ms => new Promise(resolve => setTimeout(resolve, ms))
  }

  client.addErrorInterceptor(async (error, config) => {
    if (shouldRetry(error, config) && config.retries > 0) {
      config.retries -= 1
      await TimingUtils.sleep(config.retryDelay)
      return client.makeRequest(config.method, config.url, config)
    }
    throw error
  })
}

const setupCacheInterceptor = (client, cache = new Map()) => {
  const Logger = (typeof window !== 'undefined' && window.Logger) || {
    debug: (...args) => console.log('[DEBUG]', ...args)
  }

  client.addRequestInterceptor(async config => {
    if (config.method === 'GET' && config.cache !== false) {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey)
        if (Date.now() - cached.timestamp < (config.cacheTime || 300000)) {
          Logger.debug(`Cache hit para: ${cacheKey}`)
          return Promise.resolve(cached.data)
        }
      }
    }
    return config
  })

  client.addResponseInterceptor(async (response, config) => {
    if (config.method === 'GET' && config.cache !== false) {
      const cacheKey = `${config.url}?${JSON.stringify(config.params || {})}`
      cache.set(cacheKey, {
        data: response,
        timestamp: Date.now()
      })
      Logger.debug(`Respuesta cacheada: ${cacheKey}`)
    }
    return response
  })
}

// Exportar con named exports
// export { HTTPClient, apiClient, createAPIClient, setupAuthInterceptor, setupRetryInterceptor, setupCacheInterceptor }


// ===== IMPORTADO DE: ./helpers/data-utils.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\helpers\data-utils.js
/**
 * @fileoverview Utilidades para manipulación de datos
 * @module DataUtils
 */

const DataUtils = {
  clone(obj, deep = true) {
    if (obj === null || typeof obj !== 'object') return obj

    if (obj instanceof Date) return new Date(obj.getTime())
    if (obj instanceof Array) {
      return deep ? obj.map(item => this.clone(item, deep)) : [...obj]
    }

    if (typeof obj === 'object') {
      if (deep) {
        const cloned = {}
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            cloned[key] = this.clone(obj[key], deep)
          }
        }
        return cloned
      } else {
        return { ...obj }
      }
    }

    return obj
  },

  deepMerge(target, ...sources) {
    if (!sources.length) return target
    const source = sources.shift()

    if (this.isObject(target) && this.isObject(source)) {
      for (const key in source) {
        if (this.isObject(source[key])) {
          if (!target[key]) Object.assign(target, { [key]: {} })
          this.deepMerge(target[key], source[key])
        } else {
          Object.assign(target, { [key]: source[key] })
        }
      }
    }

    return this.deepMerge(target, ...sources)
  },

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
  },

  isEmpty(value) {
    if (value == null) return true
    if (typeof value === 'string') return value.trim().length === 0
    if (Array.isArray(value)) return value.length === 0
    if (this.isObject(value)) return Object.keys(value).length === 0
    return false
  },

  isEqual(a, b) {
    if (a === b) return true
    if (a == null || b == null) return a === b
    if (typeof a !== typeof b) return false

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return false
      for (let i = 0; i < a.length; i++) {
        if (!this.isEqual(a[i], b[i])) return false
      }
      return true
    }

    if (this.isObject(a) && this.isObject(b)) {
      const keysA = Object.keys(a)
      const keysB = Object.keys(b)
      if (keysA.length !== keysB.length) return false

      for (const key of keysA) {
        if (!keysB.includes(key)) return false
        if (!this.isEqual(a[key], b[key])) return false
      }
      return true
    }

    return false
  },

  get(obj, path, defaultValue = undefined) {
    if (!obj || typeof path !== 'string') return defaultValue

    const keys = path.split('.')
    let result = obj

    for (const key of keys) {
      if (result == null || typeof result !== 'object') {
        return defaultValue
      }
      result = result[key]
    }

    return result !== undefined ? result : defaultValue
  },

  set(obj, path, value) {
    if (!obj || typeof path !== 'string') return obj

    const keys = path.split('.')
    let current = obj

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i]
      if (!(key in current) || !this.isObject(current[key])) {
        current[key] = {}
      }
      current = current[key]
    }

    current[keys[keys.length - 1]] = value
    return obj
  },

  omit(obj, keys) {
    const result = { ...obj }
    const keysToRemove = Array.isArray(keys) ? keys : [keys]

    keysToRemove.forEach(key => {
      delete result[key]
    })

    return result
  },

  pick(obj, keys) {
    const result = {}
    const keysToPick = Array.isArray(keys) ? keys : [keys]

    keysToPick.forEach(key => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })

    return result
  },

  mapKeys(obj, mapper) {
    const result = {}

    Object.entries(obj).forEach(([key, value]) => {
      const newKey = typeof mapper === 'function' ? mapper(key, value) : mapper[key] || key
      result[newKey] = value
    })

    return result
  },

  mapValues(obj, mapper) {
    const result = {}

    Object.entries(obj).forEach(([key, value]) => {
      result[key] = typeof mapper === 'function' ? mapper(value, key) : mapper
    })

    return result
  },

  groupBy(array, keyOrFn) {
    const grouped = {}

    array.forEach(item => {
      const key = typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(item)
    })

    return grouped
  },

  sortBy(array, keyOrFn, order = 'asc') {
    const sortedArray = [...array]

    sortedArray.sort((a, b) => {
      const aVal = typeof keyOrFn === 'function' ? keyOrFn(a) : a[keyOrFn]
      const bVal = typeof keyOrFn === 'function' ? keyOrFn(b) : b[keyOrFn]

      if (aVal < bVal) return order === 'asc' ? -1 : 1
      if (aVal > bVal) return order === 'asc' ? 1 : -1
      return 0
    })

    return sortedArray
  },

  unique(array, keyOrFn = null) {
    if (!keyOrFn) {
      return [...new Set(array)]
    }

    const seen = new Set()
    return array.filter(item => {
      const key = typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
  },

  chunk(array, size) {
    const chunks = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  },

  flatten(array, depth = 1) {
    return depth > 0 ? array.reduce((acc, val) => acc.concat(Array.isArray(val) ? this.flatten(val, depth - 1) : val), []) : array.slice()
  },

  intersection(array1, array2) {
    return array1.filter(item => array2.includes(item))
  },

  difference(array1, array2) {
    return array1.filter(item => !array2.includes(item))
  },

  union(array1, array2) {
    return [...new Set([...array1, ...array2])]
  },

  findDuplicates(array, keyOrFn = null) {
    const counts = new Map()
    const duplicates = []

    array.forEach(item => {
      const key = keyOrFn ? (typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]) : item
      counts.set(key, (counts.get(key) || 0) + 1)
    })

    array.forEach(item => {
      const key = keyOrFn ? (typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]) : item
      if (
        counts.get(key) > 1 &&
        !duplicates.some(dup => (keyOrFn ? (typeof keyOrFn === 'function' ? keyOrFn(dup) === key : dup[keyOrFn] === key) : dup === item))
      ) {
        duplicates.push(item)
      }
    })

    return duplicates
  },

  paginate(array, page = 1, pageSize = 10) {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize

    return {
      data: array.slice(startIndex, endIndex),
      page,
      pageSize,
      total: array.length,
      totalPages: Math.ceil(array.length / pageSize),
      hasNext: endIndex < array.length,
      hasPrevious: page > 1
    }
  },

  filterBy(array, filters) {
    return array.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (typeof value === 'function') {
          return value(item[key], item)
        }

        if (Array.isArray(value)) {
          return value.includes(item[key])
        }

        if (typeof value === 'object' && value.operator) {
          const itemValue = item[key]
          switch (value.operator) {
            case '>':
              return itemValue > value.value
            case '>=':
              return itemValue >= value.value
            case '<':
              return itemValue < value.value
            case '<=':
              return itemValue <= value.value
            case '!=':
              return itemValue !== value.value
            case 'contains':
              return String(itemValue).toLowerCase().includes(String(value.value).toLowerCase())
            case 'startsWith':
              return String(itemValue).toLowerCase().startsWith(String(value.value).toLowerCase())
            case 'endsWith':
              return String(itemValue).toLowerCase().endsWith(String(value.value).toLowerCase())
            default:
              return itemValue === value.value
          }
        }

        return item[key] === value
      })
    })
  },

  searchInObjects(array, searchTerm, searchFields = []) {
    const term = searchTerm.toLowerCase()

    return array.filter(item => {
      if (searchFields.length === 0) {
        return Object.values(item).some(value => String(value).toLowerCase().includes(term))
      }

      return searchFields.some(field => {
        const value = this.get(item, field, '')
        return String(value).toLowerCase().includes(term)
      })
    })
  },

  aggregateBy(array, groupKey, aggregations) {
    const grouped = this.groupBy(array, groupKey)
    const result = {}

    Object.entries(grouped).forEach(([key, items]) => {
      result[key] = {}

      Object.entries(aggregations).forEach(([aggKey, config]) => {
        const { field, operation } = config
        const values = items.map(item => this.get(item, field, 0))

        switch (operation) {
          case 'sum':
            result[key][aggKey] = values.reduce((sum, val) => sum + (Number(val) || 0), 0)
            break
          case 'avg':
            result[key][aggKey] = values.reduce((sum, val) => sum + (Number(val) || 0), 0) / values.length
            break
          case 'min':
            result[key][aggKey] = Math.min(...values.map(v => Number(v) || 0))
            break
          case 'max':
            result[key][aggKey] = Math.max(...values.map(v => Number(v) || 0))
            break
          case 'count':
            result[key][aggKey] = items.length
            break
          case 'unique':
            result[key][aggKey] = [...new Set(values)].length
            break
        }
      })
    })

    return result
  },

  createTree(array, idField = 'id', parentField = 'parentId', childrenField = 'children') {
    const map = new Map()
    const roots = []

    array.forEach(item => {
      map.set(item[idField], { ...item, [childrenField]: [] })
    })

    array.forEach(item => {
      const node = map.get(item[idField])
      const parentId = item[parentField]

      if (parentId && map.has(parentId)) {
        map.get(parentId)[childrenField].push(node)
      } else {
        roots.push(node)
      }
    })

    return roots
  },

  flattenTree(tree, childrenField = 'children') {
    const flattened = []

    const traverse = nodes => {
      nodes.forEach(node => {
        const { [childrenField]: children, ...nodeData } = node
        flattened.push(nodeData)
        if (children && children.length > 0) {
          traverse(children)
        }
      })
    }

    traverse(tree)
    return flattened
  }
}

// export { DataUtils }


// ===== IMPORTADO DE: ./helpers/string-utils.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\helpers\string-utils.js
/**
 * @fileoverview Utilidades para manipulación de strings
 * @module StringUtils
 */

const StringUtils = {
  capitalize(str) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  capitalizeWords(str) {
    if (!str) return ''
    return str.replace(/\b\w/g, char => char.toUpperCase())
  },

  camelCase(str) {
    if (!str) return ''
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())).replace(/\s+/g, '')
  },

  pascalCase(str) {
    if (!str) return ''
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase()).replace(/\s+/g, '')
  },

  kebabCase(str) {
    if (!str) return ''
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  },

  snakeCase(str) {
    if (!str) return ''
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase()
  },

  slugify(str) {
    if (!str) return ''
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-')
  },

  truncate(str, length = 100, suffix = '...') {
    if (!str || str.length <= length) return str
    return str.substring(0, length).trim() + suffix
  },

  truncateWords(str, wordCount = 10, suffix = '...') {
    if (!str) return ''
    const words = str.split(/\s+/)
    if (words.length <= wordCount) return str
    return words.slice(0, wordCount).join(' ') + suffix
  },

  stripTags(str) {
    if (!str) return ''
    return str.replace(/<[^>]*>/g, '')
  },

  escapeHtml(str) {
    if (!str) return ''
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return str.replace(/[&<>"']/g, char => map[char])
  },

  unescapeHtml(str) {
    if (!str) return ''
    const map = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'"
    }
    return str.replace(/&(amp|lt|gt|quot|#39);/g, entity => map[entity])
  },

  pad(str, length, padString = ' ', padLeft = true) {
    if (!str) str = ''
    const strLength = str.length
    if (strLength >= length) return str

    const padLength = length - strLength
    const pad = padString.repeat(Math.ceil(padLength / padString.length)).substring(0, padLength)

    return padLeft ? pad + str : str + pad
  },

  padStart(str, length, padString = ' ') {
    return this.pad(str, length, padString, true)
  },

  padEnd(str, length, padString = ' ') {
    return this.pad(str, length, padString, false)
  },

  reverse(str) {
    if (!str) return ''
    return str.split('').reverse().join('')
  },

  removeAccents(str) {
    if (!str) return ''
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  },

  words(str) {
    if (!str) return []
    return str.match(/\b\w+\b/g) || []
  },

  wordCount(str) {
    return this.words(str).length
  },

  characterCount(str, includeSpaces = true) {
    if (!str) return 0
    return includeSpaces ? str.length : str.replace(/\s/g, '').length
  },

  isEmail(str) {
    if (!str) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
  },

  isUrl(str) {
    if (!str) return false
    try {
      new URL(str)
      return true
    } catch {
      return false
    }
  },

  isNumeric(str) {
    if (!str) return false
    return !isNaN(str) && !isNaN(parseFloat(str))
  },

  isAlpha(str) {
    if (!str) return false
    return /^[a-zA-Z]+$/.test(str)
  },

  isAlphanumeric(str) {
    if (!str) return false
    return /^[a-zA-Z0-9]+$/.test(str)
  },

  contains(str, substring, caseSensitive = true) {
    if (!str || !substring) return false
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? substring : substring.toLowerCase()
    return haystack.includes(needle)
  },

  startsWith(str, prefix, caseSensitive = true) {
    if (!str || !prefix) return false
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? prefix : prefix.toLowerCase()
    return haystack.startsWith(needle)
  },

  endsWith(str, suffix, caseSensitive = true) {
    if (!str || !suffix) return false
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? suffix : suffix.toLowerCase()
    return haystack.endsWith(needle)
  },

  count(str, substring, caseSensitive = true) {
    if (!str || !substring) return 0
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? substring : substring.toLowerCase()

    let count = 0
    let position = 0

    while ((position = haystack.indexOf(needle, position)) !== -1) {
      count++
      position += needle.length
    }

    return count
  },

  replace(str, search, replacement, caseSensitive = true) {
    if (!str || !search) return str

    if (caseSensitive) {
      return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replacement)
    } else {
      return str.replace(new RegExp(this.escapeRegExp(search), 'gi'), replacement)
    }
  },

  escapeRegExp(str) {
    if (!str) return ''
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  },

  similarity(str1, str2) {
    if (!str1 || !str2) return 0
    if (str1 === str2) return 1

    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1

    if (longer.length === 0) return 1

    const editDistance = this.levenshteinDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  },

  levenshteinDistance(str1, str2) {
    const matrix = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }

    return matrix[str2.length][str1.length]
  },

  randomString(length = 10, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return result
  },

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0
      const v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
  },

  hash(str) {
    if (!str) return 0
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return Math.abs(hash)
  },

  extract(str, pattern, flags = '') {
    if (!str) return []
    const regex = new RegExp(pattern, flags)
    return str.match(regex) || []
  },

  extractAll(str, pattern, flags = 'g') {
    if (!str) return []
    const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
    const matches = []
    let match

    while ((match = regex.exec(str)) !== null) {
      matches.push(match)
    }

    return matches
  },

  template(str, data = {}) {
    if (!str) return ''

    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data.hasOwnProperty(key) ? data[key] : match
    })
  },

  mask(str, maskChar = '*', start = 0, end = null) {
    if (!str) return ''
    const endIndex = end === null ? str.length : end
    const before = str.substring(0, start)
    const masked = maskChar.repeat(Math.max(0, endIndex - start))
    const after = str.substring(endIndex)

    return before + masked + after
  },

  format(template, ...args) {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match
    })
  }
}

// export { StringUtils }


// ===== IMPORTADO DE: ./helpers/storage-utils.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\helpers\storage-utils.js

// ===== IMPORTADO DE: ../core/logger.js =====
// Archivo: G:\Documentos\GitHub\library-components\utils\core\logger.js
/**
 * @fileoverview Sistema de logging centralizado con diferentes niveles
 * @module Logger
 */

const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  SUCCESS: 2,
  WARNING: 3,
  ERROR: 4
}

class LoggerClass {
  constructor() {
    this.level = LogLevel.ERROR // Solo mostrar errores
    this.enableTimestamp = true
    this.enableStackTrace = false
  }

  setLevel(level) {
    this.level = level
  }

  setTimestamp(enabled) {
    this.enableTimestamp = enabled
  }

  setStackTrace(enabled) {
    this.enableStackTrace = enabled
  }

  _formatMessage(level, message, emoji) {
    const timestamp = this.enableTimestamp ? `[${new Date().toISOString()}]` : ''
    const levelText = `[${level}]`
    return `${emoji} ${timestamp} ${levelText} ${message}`
  }

  _log(level, levelNum, emoji, message, ...args) {
    if (levelNum < this.level) return

    const formattedMessage = this._formatMessage(level, message, emoji)

    if (levelNum >= LogLevel.ERROR) {
      console.error(formattedMessage, ...args)
      if (this.enableStackTrace) console.trace()
    } else if (levelNum >= LogLevel.WARNING) {
      console.warn(formattedMessage, ...args)
    } else {
      console.log(formattedMessage, ...args)
    }
  }

  debug(message, ...args) {
    this._log('DEBUG', LogLevel.DEBUG, '🔍', message, ...args)
  }

  info(message, ...args) {
    this._log('INFO', LogLevel.INFO, 'ℹ️', message, ...args)
  }

  success(message, ...args) {
    this._log('SUCCESS', LogLevel.SUCCESS, '✅', message, ...args)
  }

  warning(message, ...args) {
    this._log('WARNING', LogLevel.WARNING, '⚠️', message, ...args)
  }

  error(message, ...args) {
    this._log('ERROR', LogLevel.ERROR, '❌', message, ...args)
  }

  group(label) {
    console.group(`📂 ${label}`)
  }

  groupEnd() {
    console.groupEnd()
  }

  table(data) {
    console.table(data)
  }

  time(label) {
    console.time(label)
  }

  timeEnd(label) {
    console.timeEnd(label)
  }
}

// Exportar instancia única
const Logger = new LoggerClass()


// ===== CÓDIGO PRINCIPAL =====
/**
 * @fileoverview Utilidades para manejo de almacenamiento local y sesión
 * @module StorageUtils
 */


const StorageUtils = {
  isAvailable(type = 'localStorage') {
    try {
      const storage = window[type]
      const testKey = '__storage_test__'
      storage.setItem(testKey, 'test')
      storage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  },

  set(key, value, options = {}) {
    const { storage = 'localStorage', encrypt = false, compress = false, ttl = null } = options

    if (!this.isAvailable(storage)) {
      Logger.warning(`${storage} no está disponible`)
      return false
    }

    try {
      let dataToStore = {
        value,
        timestamp: Date.now(),
        ttl
      }

      if (compress && typeof value === 'string') {
        dataToStore.value = this.compress(value)
        dataToStore.compressed = true
      }

      if (encrypt) {
        dataToStore = this.encrypt(JSON.stringify(dataToStore))
        dataToStore = { encrypted: true, data: dataToStore }
      }

      const serialized = typeof dataToStore === 'string' ? dataToStore : JSON.stringify(dataToStore)
      window[storage].setItem(key, serialized)

      Logger.debug(`Dato guardado en ${storage}: ${key}`)
      return true
    } catch (error) {
      Logger.error(`Error guardando en ${storage}:`, error)
      return false
    }
  },

  get(key, options = {}) {
    const { storage = 'localStorage', defaultValue = null, decrypt = false, decompress = false } = options

    if (!this.isAvailable(storage)) {
      Logger.warning(`${storage} no está disponible`)
      return defaultValue
    }

    try {
      const item = window[storage].getItem(key)
      if (item === null) return defaultValue

      let parsedData

      try {
        parsedData = JSON.parse(item)
      } catch {
        return item
      }

      if (parsedData && parsedData.encrypted) {
        const decrypted = this.decrypt(parsedData.data)
        parsedData = JSON.parse(decrypted)
      }

      if (parsedData && typeof parsedData === 'object' && 'value' in parsedData) {
        if (parsedData.ttl && Date.now() > parsedData.timestamp + parsedData.ttl) {
          this.remove(key, { storage })
          Logger.debug(`Dato expirado removido: ${key}`)
          return defaultValue
        }

        let value = parsedData.value

        if (parsedData.compressed && decompress) {
          value = this.decompress(value)
        }

        return value
      }

      return parsedData
    } catch (error) {
      Logger.error(`Error obteniendo de ${storage}:`, error)
      return defaultValue
    }
  },

  remove(key, options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      Logger.warning(`${storage} no está disponible`)
      return false
    }

    try {
      window[storage].removeItem(key)
      Logger.debug(`Dato removido de ${storage}: ${key}`)
      return true
    } catch (error) {
      Logger.error(`Error removiendo de ${storage}:`, error)
      return false
    }
  },

  clear(options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      Logger.warning(`${storage} no está disponible`)
      return false
    }

    try {
      window[storage].clear()
      Logger.debug(`${storage} limpiado completamente`)
      return true
    } catch (error) {
      Logger.error(`Error limpiando ${storage}:`, error)
      return false
    }
  },

  keys(options = {}) {
    const { storage = 'localStorage', prefix = '' } = options

    if (!this.isAvailable(storage)) {
      Logger.warning(`${storage} no está disponible`)
      return []
    }

    try {
      const keys = []
      const storageObj = window[storage]

      for (let i = 0; i < storageObj.length; i++) {
        const key = storageObj.key(i)
        if (!prefix || key.startsWith(prefix)) {
          keys.push(key)
        }
      }

      return keys
    } catch (error) {
      Logger.error(`Error obteniendo claves de ${storage}:`, error)
      return []
    }
  },

  size(options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      return 0
    }

    try {
      return window[storage].length
    } catch (error) {
      Logger.error(`Error obteniendo tamaño de ${storage}:`, error)
      return 0
    }
  },

  usage(options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      return { used: 0, remaining: 0, total: 0 }
    }

    try {
      const storageObj = window[storage]
      let used = 0

      for (let i = 0; i < storageObj.length; i++) {
        const key = storageObj.key(i)
        const value = storageObj.getItem(key)
        used += key.length + (value ? value.length : 0)
      }

      const total = 1024 * 1024 * 5
      const remaining = total - used

      return {
        used,
        remaining: Math.max(0, remaining),
        total,
        percentage: (used / total) * 100
      }
    } catch (error) {
      Logger.error(`Error calculando uso de ${storage}:`, error)
      return { used: 0, remaining: 0, total: 0 }
    }
  },

  exists(key, options = {}) {
    const { storage = 'localStorage' } = options
    return this.get(key, { storage, defaultValue: '__NOT_FOUND__' }) !== '__NOT_FOUND__'
  },

  setExpiring(key, value, ttlMs, options = {}) {
    return this.set(key, value, { ...options, ttl: ttlMs })
  },

  getValidKeys(options = {}) {
    const { storage = 'localStorage', prefix = '' } = options
    const keys = this.keys({ storage, prefix })
    const validKeys = []

    keys.forEach(key => {
      const value = this.get(key, { storage })
      if (value !== null) {
        validKeys.push(key)
      }
    })

    return validKeys
  },

  cleanExpired(options = {}) {
    const { storage = 'localStorage', prefix = '' } = options
    const keys = this.keys({ storage, prefix })
    let cleanedCount = 0

    keys.forEach(key => {
      const value = this.get(key, { storage })
      if (value === null) {
        cleanedCount++
      }
    })

    const Logger = getLogger()
    Logger.info(`${cleanedCount} elementos expirados limpiados de ${storage}`)
    return cleanedCount
  },

  backup(keys = null, options = {}) {
    const { storage = 'localStorage' } = options
    const keysToBackup = keys || this.keys({ storage })
    const backup = {}

    keysToBackup.forEach(key => {
      const value = window[storage].getItem(key)
      if (value !== null) {
        backup[key] = value
      }
    })

    return backup
  },

  restore(backupData, options = {}) {
    const { storage = 'localStorage', overwrite = false } = options
    let restoredCount = 0

    Object.entries(backupData).forEach(([key, value]) => {
      if (overwrite || !this.exists(key, { storage })) {
        window[storage].setItem(key, value)
        restoredCount++
      }
    })

    const Logger = getLogger()
    Logger.info(`${restoredCount} elementos restaurados en ${storage}`)
    return restoredCount
  },

  compress(str) {
    try {
      return btoa(str)
    } catch (error) {
      Logger.warning('Error comprimiendo string:', error)
      return str
    }
  },

  decompress(compressedStr) {
    try {
      return atob(compressedStr)
    } catch (error) {
      Logger.warning('Error descomprimiendo string:', error)
      return compressedStr
    }
  },

  encrypt(str, key = 'default_key') {
    let encrypted = ''
    for (let i = 0; i < str.length; i++) {
      const keyChar = key.charCodeAt(i % key.length)
      const strChar = str.charCodeAt(i)
      encrypted += String.fromCharCode(strChar ^ keyChar)
    }
    return btoa(encrypted)
  },

  decrypt(encryptedStr, key = 'default_key') {
    try {
      const encrypted = atob(encryptedStr)
      let decrypted = ''

      for (let i = 0; i < encrypted.length; i++) {
        const keyChar = key.charCodeAt(i % key.length)
        const encChar = encrypted.charCodeAt(i)
        decrypted += String.fromCharCode(encChar ^ keyChar)
      }

      return decrypted
    } catch (error) {
      Logger.warning('Error desencriptando:', error)
      return encryptedStr
    }
  },

  createNamespacedStorage(namespace) {
    return {
      set: (key, value, options = {}) => this.set(`${namespace}:${key}`, value, options),

      get: (key, options = {}) => this.get(`${namespace}:${key}`, options),

      remove: (key, options = {}) => this.remove(`${namespace}:${key}`, options),

      keys: (options = {}) => this.keys({ ...options, prefix: `${namespace}:` }).map(key => key.replace(`${namespace}:`, '')),

      clear: (options = {}) => {
        const keys = this.keys({ ...options, prefix: `${namespace}:` })
        keys.forEach(key => this.remove(key, options))
        return keys.length
      }
    }
  }
}

// export { StorageUtils }


// ===== CÓDIGO PRINCIPAL =====
/**
 * @fileoverview Punto de entrada principal para todas las utilidades
 * @module GlobalUtils
 */

// Importar todas las utilidades con named imports

// Función de inicialización global
function initGlobalUtils(options = {}) {
  const { exposeToWindow = true, logLevel = 'DEBUG', namespace = '', enableLegacySupport = true } = options

  // Configurar logger si está disponible
  if (Logger && logLevel) {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 }
    if (Logger.setLevel) {
      Logger.setLevel(levels[logLevel] || 0)
    }
  }

  // Exponer utilidades globalmente solo en el navegador
  if (typeof window !== 'undefined' && exposeToWindow) {
    const utils = {
      LogLevel,
      Logger,
      DOMUtils,
      EventManager,
      TimingUtils,
      ValidatorUtils,
      FormManager,
      HTTPClient,
      DataUtils,
      StringUtils,
      StorageUtils
    }

    // Legacy compatibility - mantener nombres anteriores
    if (enableLegacySupport) {
      if (DOMUtils) utils.DOMHelpers = DOMUtils
      if (ValidatorUtils) utils.Validators = ValidatorUtils

      // APIManager como wrapper del HTTPClient
      if (HTTPClient) {
        try {
          const client = new HTTPClient()
          utils.APIManager = {
            get: (url, options) => client.get(url, options),
            post: (url, data, options) => client.post(url, data, options),
            put: (url, data, options) => client.put(url, data, options),
            patch: (url, data, options) => client.patch(url, data, options),
            delete: (url, options) => client.delete(url, options)
          }
          utils.apiClient = client
          utils.createAPIClient = (baseURL, options) => new HTTPClient(baseURL, options)
        } catch (error) {
          console.warn('Error creating HTTPClient instance:', error)
        }
      }
    }

    if (namespace) {
      window[namespace] = utils
    } else {
      Object.assign(window, utils)
    }

    // Marcar como cargadas
    window.__GLOBAL_UTILS_LOADED__ = true
    window.__GLOBAL_UTILS_VERSION__ = '2.0.0'

    if (Logger && Logger.success) {
      Logger.success('✨ Utilidades globales v2.0 inicializadas')
      Logger.info(`📦 Módulos cargados: ${Object.keys(utils).length}`)

      if (enableLegacySupport) {
        Logger.info('🔄 Soporte legacy habilitado')
      }
    } else {
      console.log('✨ Utilidades globales v2.0 inicializadas')
      console.log(`📦 Módulos cargados: ${Object.keys(utils).length}`)
    }

    return utils
  }

  return {
    LogLevel,
    Logger,
    DOMUtils,
    EventManager,
    TimingUtils,
    ValidatorUtils,
    FormManager,
    HTTPClient,
    DataUtils,
    StringUtils,
    StorageUtils
  }
}

// Función para obtener información del sistema de utilidades
function getUtilsInfo() {
  return {
    version: '2.0.0',
    modules: [
      'LogLevel',
      'Logger',
      'DOMUtils',
      'EventManager',
      'TimingUtils',
      'ValidatorUtils',
      'FormManager',
      'HTTPClient',
      'DataUtils',
      'StringUtils',
      'StorageUtils'
    ],
    loaded: typeof window !== 'undefined' ? !!window.__GLOBAL_UTILS_LOADED__ : false,
    environment: typeof window !== 'undefined' ? 'browser' : 'node'
  }
}

// Auto-ejecutar si estamos en el navegador y no se han cargado ya
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  // Pequeño delay para asegurar que todas las utilidades estén cargadas
  setTimeout(() => {
    initGlobalUtils()
  }, 10)
}

// Exponer funciones principales en window
if (typeof window !== 'undefined') {
  window.initGlobalUtils = initGlobalUtils
  window.getUtilsInfo = getUtilsInfo
}

// Exportar funciones para uso como módulos
// export {
  initGlobalUtils,
  getUtilsInfo,
  LogLevel,
  Logger,
  DOMUtils,
  EventManager,
  TimingUtils,
  ValidatorUtils,
  FormManager,
  HTTPClient,
  DataUtils,
  StringUtils,
  StorageUtils
}


// ===== CÓDIGO PRINCIPAL =====
/**
 * ARCHIVO LEGACY - MANTENIDO POR COMPATIBILIDAD
 *
 * ⚠️  NOTA: Este archivo se mantiene por compatibilidad con código existente.
 * 📦 Para nuevos proyectos, usa: import { Logger, DOMUtils, etc } from './utils/index.js'
 * 🔄 Este archivo redirige automáticamente a la nueva estructura modular.
 */


function initGlobalUtils() {
  console.warn('⚠️ utils/main.js es legacy. Migra a: import { initGlobalUtils } from "./utils/index.js"')
  return initModularUtils({
    enableLegacySupport: true,
    exposeToWindow: true
  })
}

// Auto-ejecutar si estamos en el navegador y no se han cargado ya
if (typeof window !== 'undefined' && !window.__GLOBAL_UTILS_LOADED__) {
  initGlobalUtils()
}
// Exportar la función para uso manual
initGlobalUtils


// ===== IMPORTADO DE: ../app/_library/components/contain/btn/script.js =====
// Archivo: G:\Documentos\GitHub\library-components\app\_library\components\contain\btn\script.js
/**
 * script.js - Efecto de onda optimizado para botones
 * Versión optimizada para mejor rendimiento y compatibilidad SSR
 */

// Configuración personalizable con mejores defaults
const CONFIG = {
  buttonSelector: '[data-dmpa-element-id="btn"]',
  rippleClassName: 'btn-ripple-effect',
  animationDuration: 600,
  rippleSize: 180,
  enableMutationObserver: true,
  disabledClasses: ['disabled', 'btn-disabled'],
  // Nuevas opciones de optimización
  throttleDelay: 16, // ~60fps para mejor rendimiento
  maxRipples: 3, // Máximo de ripples simultáneos por botón
  useRAF: true // Usar requestAnimationFrame para animaciones
}

// Cache optimizado para botones procesados
const processedButtons = new WeakMap()
const activeRipples = new WeakMap() // Tracking de ripples activos

// Pool de elementos ripple para reutilización (mejor performance)
const ripplePool = {
  pool: [],
  maxSize: 20,

  get() {
    if (this.pool.length > 0) {
      return this.pool.pop()
    }

    const ripple = document.createElement('span')
    ripple.className = CONFIG.rippleClassName
    return ripple
  },

  release(ripple) {
    if (this.pool.length < this.maxSize) {
      // Limpiar el elemento antes de devolverlo al pool
      ripple.style.cssText = ''
      ripple.classList.value = CONFIG.rippleClassName
      this.pool.push(ripple)
    }
  }
}

// Función optimizada para crear el efecto de onda
const createRippleEffect = event => {
  if (typeof document === 'undefined') return

  const button = event.currentTarget

  // Verificaciones de estado optimizadas
  if (
    button.disabled ||
    button.getAttribute('aria-disabled') === 'true' ||
    CONFIG.disabledClasses.some(cls => button.classList.contains(cls))
  ) {
    return
  }

  // Control de ripples máximos por botón
  const currentRipples = activeRipples.get(button) || []
  if (currentRipples.length >= CONFIG.maxRipples) {
    return
  }

  // Usar getBoundingClientRect con caching para mejor performance
  const buttonRect = button.getBoundingClientRect()

  // Calcular posición del clic relativa al botón
  const rippleX = event.clientX - buttonRect.left
  const rippleY = event.clientY - buttonRect.top

  // Obtener ripple del pool
  const ripple = ripplePool.get()

  // Configurar posición y tamaño
  const halfSize = CONFIG.rippleSize / 2
  ripple.style.cssText = `
    left: ${rippleX}px;
    top: ${rippleY}px;
    width: ${CONFIG.rippleSize}px;
    height: ${CONFIG.rippleSize}px;
    margin-top: -${halfSize}px;
    margin-left: -${halfSize}px;
  `

  // Añadir al botón
  button.appendChild(ripple)

  // Tracking de ripples activos
  currentRipples.push(ripple)
  activeRipples.set(button, currentRipples)

  // Función de limpieza optimizada
  const cleanup = () => {
    if (ripple.parentNode === button) {
      button.removeChild(ripple)
    }

    // Remover del tracking
    const ripples = activeRipples.get(button) || []
    const index = ripples.indexOf(ripple)
    if (index > -1) {
      ripples.splice(index, 1)
      if (ripples.length === 0) {
        activeRipples.delete(button)
      } else {
        activeRipples.set(button, ripples)
      }
    }

    // Devolver al pool
    ripplePool.release(ripple)
  }

  // Usar requestAnimationFrame si está disponible
  if (CONFIG.useRAF && typeof requestAnimationFrame !== 'undefined') {
    setTimeout(() => {
      requestAnimationFrame(cleanup)
    }, CONFIG.animationDuration)
  } else {
    setTimeout(cleanup, CONFIG.animationDuration)
  }
}

// Función throttled para mejor rendimiento en eventos masivos
const throttle = (func, delay) => {
  let timeoutId
  let lastExecTime = 0

  return function (...args) {
    const currentTime = Date.now()

    if (currentTime - lastExecTime > delay) {
      func.apply(this, args)
      lastExecTime = currentTime
    } else {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(
        () => {
          func.apply(this, args)
          lastExecTime = Date.now()
        },
        delay - (currentTime - lastExecTime)
      )
    }
  }
}

// Función optimizada para aplicar el efecto a un botón
const applyRippleToButton = button => {
  // Verificar si ya está procesado
  if (processedButtons.has(button)) {
    return
  }

  // Marcar como procesado
  processedButtons.set(button, true)

  // Crear versión throttled del efecto si es necesario
  const rippleHandler = CONFIG.throttleDelay > 0 ? throttle(createRippleEffect, CONFIG.throttleDelay) : createRippleEffect

  // Añadir event listener optimizado
  button.addEventListener('click', rippleHandler, { passive: true })

  // Opcional: Añadir soporte para touch en dispositivos móviles
  if ('ontouchstart' in window) {
    button.addEventListener('touchstart', rippleHandler, { passive: true })
  }
}

// Función principal optimizada con IntersectionObserver
const initializeRippleEffect = () => {
  if (typeof document === 'undefined') return

  // Usar DocumentFragment para mejor performance si hay muchos botones
  const fragment = document.createDocumentFragment()

  try {
    const buttonList = document.querySelectorAll(CONFIG.buttonSelector)

    // Batch processing para mejor performance
    const processBatch = (buttons, batchSize = 50) => {
      for (let i = 0; i < buttons.length; i += batchSize) {
        const batch = Array.from(buttons).slice(i, i + batchSize)

        // Usar requestIdleCallback si está disponible
        if (typeof requestIdleCallback !== 'undefined') {
          requestIdleCallback(() => {
            batch.forEach(applyRippleToButton)
          })
        } else {
          setTimeout(() => {
            batch.forEach(applyRippleToButton)
          }, 0)
        }
      }
    }

    processBatch(buttonList)
  } catch (error) {
    console.warn('Error al aplicar efecto de onda a los botones:', error)
  }
}

// Inicialización mejorada con mejor detección de estado
const initSafelyInBrowser = () => {
  if (typeof document === 'undefined') return

  const initialize = () => {
    // Usar requestIdleCallback para inicialización no bloqueante
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(initializeRippleEffect, { timeout: 1000 })
    } else {
      setTimeout(initializeRippleEffect, 100)
    }
  }

  // Detección mejorada del estado de carga
  if (document.readyState === 'complete') {
    initialize()
  } else if (document.readyState === 'interactive') {
    // DOM ya está listo, pero recursos pueden estar cargando
    initialize()
  } else {
    // Esperamos a DOMContentLoaded
    document.addEventListener('DOMContentLoaded', initialize, { once: true })
  }

  // MutationObserver optimizado
  if (CONFIG.enableMutationObserver && typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(
      throttle(mutationsList => {
        let shouldInit = false

        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Verificar solo nodos que realmente pueden contener botones
            for (const node of mutation.addedNodes) {
              if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches?.(CONFIG.buttonSelector) || node.querySelector?.(CONFIG.buttonSelector)) {
                  shouldInit = true
                  break
                }
              }
            }
            if (shouldInit) break
          }
        }

        if (shouldInit) {
          initializeRippleEffect()
        }
      }, CONFIG.throttleDelay)
    )

    // Iniciar observación cuando el DOM esté listo
    const startObserver = () => {
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          // Optimización: solo observar cambios relevantes
          attributes: false,
          characterData: false
        })
      }
    }

    if (document.body) {
      startObserver()
    } else {
      document.addEventListener('DOMContentLoaded', startObserver, { once: true })
    }

    // Cleanup al descargar la página
    window.addEventListener(
      'beforeunload',
      () => {
        observer.disconnect()
      },
      { once: true }
    )
  }
}

// API pública mejorada
const configureRippleEffect = newConfig => {
  if (typeof newConfig === 'object' && newConfig !== null) {
    Object.assign(CONFIG, newConfig)
  }
}

const applyRippleEffect = buttonElement => {
  if (buttonElement?.nodeType === Node.ELEMENT_NODE) {
    applyRippleToButton(buttonElement)
    return true
  }
  return false
}

// Función para limpiar recursos (útil para SPA)
const cleanupRippleEffect = () => {
  activeRipples.clear()
  processedButtons.clear()
  ripplePool.pool.length = 0
}

// Ejecutar inicialización
initSafelyInBrowser()

// Export por defecto
initializeRippleEffect


// ===== CÓDIGO PRINCIPAL =====

main()
btn()
