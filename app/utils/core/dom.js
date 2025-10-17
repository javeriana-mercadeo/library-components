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

export { DOMUtils }
