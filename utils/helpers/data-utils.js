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
  }

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
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
  }

   isEmpty(value) {
    if (value == null) return true
    if (typeof value === 'string') return value.trim().length === 0
    if (Array.isArray(value)) return value.length === 0
    if (this.isObject(value)) return Object.keys(value).length === 0
    return false
  }

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
  }

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
  }

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
  }

   omit(obj, keys) {
    const result = { ...obj }
    const keysToRemove = Array.isArray(keys) ? keys : [keys]
    
    keysToRemove.forEach(key => {
      delete result[key]
    })
    
    return result
  }

   pick(obj, keys) {
    const result = {}
    const keysToPick = Array.isArray(keys) ? keys : [keys]
    
    keysToPick.forEach(key => {
      if (key in obj) {
        result[key] = obj[key]
      }
    })
    
    return result
  }

   mapKeys(obj, mapper) {
    const result = {}
    
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = typeof mapper === 'function' ? mapper(key, value) : mapper[key] || key
      result[newKey] = value
    })
    
    return result
  }

   mapValues(obj, mapper) {
    const result = {}
    
    Object.entries(obj).forEach(([key, value]) => {
      result[key] = typeof mapper === 'function' ? mapper(value, key) : mapper
    })
    
    return result
  }

   groupBy(array, keyOrFn) {
    const grouped = {}
    
    array.forEach(item => {
      const key = typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]
      if (!grouped[key]) grouped[key] = []
      grouped[key].push(item)
    })
    
    return grouped
  }

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
  }

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
  }

   chunk(array, size) {
    const chunks = []
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size))
    }
    return chunks
  }

   flatten(array, depth = 1) {
    return depth > 0 
      ? array.reduce((acc, val) => 
          acc.concat(Array.isArray(val) ? this.flatten(val, depth - 1) : val), [])
      : array.slice()
  }

   intersection(array1, array2) {
    return array1.filter(item => array2.includes(item))
  }

   difference(array1, array2) {
    return array1.filter(item => !array2.includes(item))
  }

   union(array1, array2) {
    return [...new Set([...array1, ...array2])]
  }

   findDuplicates(array, keyOrFn = null) {
    const counts = new Map()
    const duplicates = []
    
    array.forEach(item => {
      const key = keyOrFn ? (typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]) : item
      counts.set(key, (counts.get(key) || 0) + 1)
    })
    
    array.forEach(item => {
      const key = keyOrFn ? (typeof keyOrFn === 'function' ? keyOrFn(item) : item[keyOrFn]) : item
      if (counts.get(key) > 1 && !duplicates.some(dup => 
        keyOrFn ? (typeof keyOrFn === 'function' ? keyOrFn(dup) === key : dup[keyOrFn] === key) : dup === item
      )) {
        duplicates.push(item)
      }
    })
    
    return duplicates
  }

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
  }

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
            case '>': return itemValue > value.value
            case '>=': return itemValue >= value.value
            case '<': return itemValue < value.value
            case '<=': return itemValue <= value.value
            case '!=': return itemValue !== value.value
            case 'contains': return String(itemValue).toLowerCase().includes(String(value.value).toLowerCase())
            case 'startsWith': return String(itemValue).toLowerCase().startsWith(String(value.value).toLowerCase())
            case 'endsWith': return String(itemValue).toLowerCase().endsWith(String(value.value).toLowerCase())
            default: return itemValue === value.value
          }
        }
        
        return item[key] === value
      })
    })
  }

   searchInObjects(array, searchTerm, searchFields = []) {
    const term = searchTerm.toLowerCase()
    
    return array.filter(item => {
      if (searchFields.length === 0) {
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(term)
        )
      }
      
      return searchFields.some(field => {
        const value = this.get(item, field, '')
        return String(value).toLowerCase().includes(term)
      })
    })
  }

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
  }

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
  }

   flattenTree(tree, childrenField = 'children') {
    const flattened = []
    
    const traverse = (nodes) => {
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

export default DataUtils