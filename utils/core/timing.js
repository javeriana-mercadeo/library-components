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
          lastFunc = setTimeout(() => {
            if (Date.now() - lastRan >= limit) {
              func.apply(this, args)
              lastRan = Date.now()
            }
          }, limit - (Date.now() - lastRan))
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
    return Promise.race([
      promise,
      new Promise((_, reject) => 
        setTimeout(() => reject(timeoutError), ms)
      )
    ])
  },

  async waitFor(condition, options = {}) {
    const { 
      timeout = 5000, 
      interval = 100, 
      timeoutError = new Error('Condition not met within timeout') 
    } = options
    
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

export default TimingUtils