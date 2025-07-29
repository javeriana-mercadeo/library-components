/**
 * @fileoverview Cliente HTTP avanzado con interceptors y manejo de errores
 * @module HTTPClient
 */

// HTTPClient como función constructora para evitar problemas de compilación
function HTTPClient(baseURL = '', options = {}) {
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
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms))
  }
  
  // Métodos de instancia
  this.addRequestInterceptor = function(interceptor) {
    this.requestInterceptors.push(interceptor)
  }

  this.addResponseInterceptor = function(interceptor) {
    this.responseInterceptors.push(interceptor)
  }

  this.addErrorInterceptor = function(interceptor) {
    this.errorInterceptors.push(interceptor)
  }

  this.processRequestInterceptors = async function(config) {
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

  this.processResponseInterceptors = async function(response, config) {
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

  this.processErrorInterceptors = async function(error, config) {
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

  this.buildURL = function(endpoint) {
    if (endpoint.startsWith('http://') || endpoint.startsWith('https://')) {
      return endpoint
    }
    
    const base = this.baseURL.replace(/\/$/, '')
    const path = endpoint.replace(/^\//, '')
    return base ? `${base}/${path}` : path
  }

  this.makeRequest = async function(method, endpoint, options = {}) {
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

  this.get = async function(endpoint, options = {}) {
    return this.makeRequest('GET', endpoint, options)
  }

  this.post = async function(endpoint, data = null, options = {}) {
    return this.makeRequest('POST', endpoint, { ...options, body: data })
  }

  this.put = async function(endpoint, data = null, options = {}) {
    return this.makeRequest('PUT', endpoint, { ...options, body: data })
  }

  this.patch = async function(endpoint, data = null, options = {}) {
    return this.makeRequest('PATCH', endpoint, { ...options, body: data })
  }

  this.delete = async function(endpoint, options = {}) {
    return this.makeRequest('DELETE', endpoint, options)
  }

  this.head = async function(endpoint, options = {}) {
    return this.makeRequest('HEAD', endpoint, options)
  }

  this.options = async function(endpoint, options = {}) {
    return this.makeRequest('OPTIONS', endpoint, options)
  }

  this.uploadFile = async function(endpoint, file, options = {}) {
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

  this.createCancelToken = function() {
    const controller = new AbortController()
    
    return {
      signal: controller.signal,
      cancel: (reason = 'Request cancelled') => {
        controller.abort()
        Logger.info(`Request cancelado: ${reason}`)
      }
    }
  }

  this.setBaseURL = function(baseURL) {
    this.baseURL = baseURL
  }

  this.setDefaultHeader = function(name, value) {
    this.defaultOptions.headers[name] = value
  }

  this.removeDefaultHeader = function(name) {
    delete this.defaultOptions.headers[name]
  }

  this.setTimeout = function(timeout) {
    this.defaultOptions.timeout = timeout
  }

  this.setRetries = function(retries, retryDelay = 1000) {
    this.defaultOptions.retries = retries
    this.defaultOptions.retryDelay = retryDelay
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
  client.addRequestInterceptor(async (config) => {
    const token = await getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })
}

const setupRetryInterceptor = (client, shouldRetry = () => true) => {
  const TimingUtils = (typeof window !== 'undefined' && window.TimingUtils) || {
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms))
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
  
  client.addRequestInterceptor(async (config) => {
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

// Exportar como objeto para evitar problemas de compilación
export default {
  HTTPClient,
  apiClient,
  createAPIClient,
  setupAuthInterceptor,
  setupRetryInterceptor,
  setupCacheInterceptor
}