/**
 * @fileoverview Sistema de gestión de eventos centralizado
 * @module EventManager
 */

import { Logger } from './logger.js'

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

export const EventManager = EventManagerInstance
