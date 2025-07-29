/**
 * @fileoverview Utilidades para manejo de almacenamiento local y sesión
 * @module StorageUtils
 */

// Fallback para Logger en caso de que no esté disponible
const getLogger = () => (typeof window !== 'undefined' && window.Logger) || {
  debug: (...args) => console.log('[DEBUG]', ...args),
  warning: (...args) => console.warn('[WARNING]', ...args),
  error: (...args) => console.error('[ERROR]', ...args),
  info: (...args) => console.info('[INFO]', ...args)
}

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
  }

   set(key, value, options = {}) {
    const { 
      storage = 'localStorage', 
      encrypt = false, 
      compress = false,
      ttl = null 
    } = options

    if (!this.isAvailable(storage)) {
      const Logger = getLogger()
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
      
      const Logger = getLogger()
      Logger.debug(`Dato guardado en ${storage}: ${key}`)
      return true
    } catch (error) {
      const Logger = getLogger()
      Logger.error(`Error guardando en ${storage}:`, error)
      return false
    }
  }

   get(key, options = {}) {
    const { 
      storage = 'localStorage', 
      defaultValue = null, 
      decrypt = false,
      decompress = false 
    } = options

    if (!this.isAvailable(storage)) {
      const Logger = getLogger()
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
          const Logger = getLogger()
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
      const Logger = getLogger()
      Logger.error(`Error obteniendo de ${storage}:`, error)
      return defaultValue
    }
  }

   remove(key, options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      const Logger = getLogger()
      Logger.warning(`${storage} no está disponible`)
      return false
    }

    try {
      window[storage].removeItem(key)
      const Logger = getLogger()
      Logger.debug(`Dato removido de ${storage}: ${key}`)
      return true
    } catch (error) {
      const Logger = getLogger()
      Logger.error(`Error removiendo de ${storage}:`, error)
      return false
    }
  }

   clear(options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      const Logger = getLogger()
      Logger.warning(`${storage} no está disponible`)
      return false
    }

    try {
      window[storage].clear()
      const Logger = getLogger()
      Logger.debug(`${storage} limpiado completamente`)
      return true
    } catch (error) {
      const Logger = getLogger()
      Logger.error(`Error limpiando ${storage}:`, error)
      return false
    }
  }

   keys(options = {}) {
    const { storage = 'localStorage', prefix = '' } = options

    if (!this.isAvailable(storage)) {
      const Logger = getLogger()
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
      const Logger = getLogger()
      Logger.error(`Error obteniendo claves de ${storage}:`, error)
      return []
    }
  }

   size(options = {}) {
    const { storage = 'localStorage' } = options

    if (!this.isAvailable(storage)) {
      return 0
    }

    try {
      return window[storage].length
    } catch (error) {
      const Logger = getLogger()
      Logger.error(`Error obteniendo tamaño de ${storage}:`, error)
      return 0
    }
  }

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
      const Logger = getLogger()
      Logger.error(`Error calculando uso de ${storage}:`, error)
      return { used: 0, remaining: 0, total: 0 }
    }
  }

   exists(key, options = {}) {
    const { storage = 'localStorage' } = options
    return this.get(key, { storage, defaultValue: '__NOT_FOUND__' }) !== '__NOT_FOUND__'
  }

   setExpiring(key, value, ttlMs, options = {}) {
    return this.set(key, value, { ...options, ttl: ttlMs })
  }

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
  }

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

    Logger.info(`${cleanedCount} elementos expirados limpiados de ${storage}`)
    return cleanedCount
  }

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
  }

   restore(backupData, options = {}) {
    const { storage = 'localStorage', overwrite = false } = options
    let restoredCount = 0

    Object.entries(backupData).forEach(([key, value]) => {
      if (overwrite || !this.exists(key, { storage })) {
        window[storage].setItem(key, value)
        restoredCount++
      }
    })

    Logger.info(`${restoredCount} elementos restaurados en ${storage}`)
    return restoredCount
  }

   compress(str) {
    try {
      return btoa(str)
    } catch (error) {
      const Logger = getLogger()
      Logger.warning('Error comprimiendo string:', error)
      return str
    }
  }

   decompress(compressedStr) {
    try {
      return atob(compressedStr)
    } catch (error) {
      const Logger = getLogger()
      Logger.warning('Error descomprimiendo string:', error)
      return compressedStr
    }
  }

   encrypt(str, key = 'default_key') {
    let encrypted = ''
    for (let i = 0; i < str.length; i++) {
      const keyChar = key.charCodeAt(i % key.length)
      const strChar = str.charCodeAt(i)
      encrypted += String.fromCharCode(strChar ^ keyChar)
    }
    return btoa(encrypted)
  }

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
      const Logger = getLogger()
      Logger.warning('Error desencriptando:', error)
      return encryptedStr
    }
  }

   createNamespacedStorage(namespace) {
    return {
      set: (key, value, options = {}) => 
        this.set(`${namespace}:${key}`, value, options),
      
      get: (key, options = {}) => 
        this.get(`${namespace}:${key}`, options),
      
      remove: (key, options = {}) => 
        this.remove(`${namespace}:${key}`, options),
      
      keys: (options = {}) => 
        this.keys({ ...options, prefix: `${namespace}:` })
          .map(key => key.replace(`${namespace}:`, '')),
      
      clear: (options = {}) => {
        const keys = this.keys({ ...options, prefix: `${namespace}:` })
        keys.forEach(key => this.remove(key, options))
        return keys.length
      }
    }
  }
}

export default StorageUtils