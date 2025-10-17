/**
 * @fileoverview Utilidades para manejo de almacenamiento local y sesión
 * @module StorageUtils
 */

import { Logger } from '../core/logger.js'

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
  },

  // ===========================================
  // MANEJO DE COOKIES
  // ===========================================

  getCookieSize() {
    try {
      const cookieString = document.cookie
      return new Blob([cookieString]).size
    } catch (error) {
      Logger.error('Error calculando tamaño de cookies:', error)
      return 0
    }
  },

  cleanLargeCookies(options = {}) {
    const {
      maxSize = 8192, // 8KB por defecto
      problematicCookies = ['NID', 'SID', 'SSID', 'SIDCC', 'SAPISID'],
      domains = ['.google.com', '.google.com.co']
    } = options

    try {
      const cookieSize = this.getCookieSize()

      if (cookieSize <= maxSize) {
        Logger.debug(`Tamaño de cookies OK: ${cookieSize} bytes`)
        return false
      }

      Logger.warning(`Cookies demasiado grandes: ${cookieSize} bytes. Limpiando...`)

      let cleanedCount = 0
      problematicCookies.forEach(cookieName => {
        domains.forEach(domain => {
          try {
            document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
            cleanedCount++
          } catch (error) {
            Logger.debug(`Error limpiando cookie ${cookieName} para ${domain}:`, error)
          }
        })
      })

      const newSize = this.getCookieSize()
      Logger.info(`Cookies limpiadas: ${cleanedCount} eliminadas. Tamaño: ${cookieSize} → ${newSize} bytes`)

      return {
        cleaned: true,
        before: cookieSize,
        after: newSize,
        cookiesRemoved: cleanedCount
      }
    } catch (error) {
      Logger.error('Error en limpieza de cookies:', error)
      return false
    }
  },

  setCookie(name, value, options = {}) {
    const { expires = null, maxAge = null, domain = null, path = '/', secure = false, sameSite = 'Lax' } = options

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (expires) {
      cookieString += `; expires=${expires.toUTCString()}`
    }

    if (maxAge !== null) {
      cookieString += `; max-age=${maxAge}`
    }

    if (domain) {
      cookieString += `; domain=${domain}`
    }

    cookieString += `; path=${path}`

    if (secure) {
      cookieString += '; secure'
    }

    cookieString += `; samesite=${sameSite}`

    try {
      document.cookie = cookieString
      Logger.debug(`Cookie establecida: ${name}`)
      return true
    } catch (error) {
      Logger.error(`Error estableciendo cookie ${name}:`, error)
      return false
    }
  },

  getCookie(name) {
    try {
      const nameEQ = encodeURIComponent(name) + '='
      const ca = document.cookie.split(';')

      for (let c of ca) {
        c = c.trim()
        if (c.indexOf(nameEQ) === 0) {
          return decodeURIComponent(c.substring(nameEQ.length))
        }
      }

      return null
    } catch (error) {
      Logger.error(`Error obteniendo cookie ${name}:`, error)
      return null
    }
  },

  removeCookie(name, options = {}) {
    const { domain = null, path = '/' } = options

    try {
      let cookieString = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`

      if (domain) {
        cookieString += `; domain=${domain}`
      }

      document.cookie = cookieString
      Logger.debug(`Cookie removida: ${name}`)
      return true
    } catch (error) {
      Logger.error(`Error removiendo cookie ${name}:`, error)
      return false
    }
  },

  getAllCookies() {
    try {
      const cookies = {}
      const ca = document.cookie.split(';')

      for (let c of ca) {
        c = c.trim()
        if (c) {
          const [name, ...rest] = c.split('=')
          const value = rest.join('=')
          cookies[decodeURIComponent(name)] = decodeURIComponent(value)
        }
      }

      return cookies
    } catch (error) {
      Logger.error('Error obteniendo todas las cookies:', error)
      return {}
    }
  },

  clearAllCookies(options = {}) {
    const { domains = [window.location.hostname, `.${window.location.hostname}`], paths = ['/'] } = options

    try {
      const cookies = this.getAllCookies()
      let clearedCount = 0

      Object.keys(cookies).forEach(name => {
        domains.forEach(domain => {
          paths.forEach(path => {
            this.removeCookie(name, { domain, path })
            clearedCount++
          })
        })
      })

      Logger.info(`${clearedCount} cookies limpiadas`)
      return clearedCount
    } catch (error) {
      Logger.error('Error limpiando todas las cookies:', error)
      return 0
    }
  }
}

export { StorageUtils }
