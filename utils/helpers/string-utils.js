/**
 * @fileoverview Utilidades para manipulación de strings
 * @module StringUtils
 */

const StringUtils = {
  capitalize(str) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  }

   capitalizeWords(str) {
    if (!str) return ''
    return str.replace(/\b\w/g, char => char.toUpperCase())
  }

   camelCase(str) {
    if (!str) return ''
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '')
  }

   pascalCase(str) {
    if (!str) return ''
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, word => word.toUpperCase())
      .replace(/\s+/g, '')
  }

   kebabCase(str) {
    if (!str) return ''
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()
  }

   snakeCase(str) {
    if (!str) return ''
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase()
  }

   slugify(str) {
    if (!str) return ''
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/[\s-]+/g, '-')
  }

   truncate(str, length = 100, suffix = '...') {
    if (!str || str.length <= length) return str
    return str.substring(0, length).trim() + suffix
  }

   truncateWords(str, wordCount = 10, suffix = '...') {
    if (!str) return ''
    const words = str.split(/\s+/)
    if (words.length <= wordCount) return str
    return words.slice(0, wordCount).join(' ') + suffix
  }

   stripTags(str) {
    if (!str) return ''
    return str.replace(/<[^>]*>/g, '')
  }

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
  }

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
  }

   pad(str, length, padString = ' ', padLeft = true) {
    if (!str) str = ''
    const strLength = str.length
    if (strLength >= length) return str
    
    const padLength = length - strLength
    const pad = padString.repeat(Math.ceil(padLength / padString.length)).substring(0, padLength)
    
    return padLeft ? pad + str : str + pad
  }

   padStart(str, length, padString = ' ') {
    return this.pad(str, length, padString, true)
  }

   padEnd(str, length, padString = ' ') {
    return this.pad(str, length, padString, false)
  }

   reverse(str) {
    if (!str) return ''
    return str.split('').reverse().join('')
  }

   removeAccents(str) {
    if (!str) return ''
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

   words(str) {
    if (!str) return []
    return str.match(/\b\w+\b/g) || []
  }

   wordCount(str) {
    return this.words(str).length
  }

   characterCount(str, includeSpaces = true) {
    if (!str) return 0
    return includeSpaces ? str.length : str.replace(/\s/g, '').length
  }

   isEmail(str) {
    if (!str) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str)
  }

   isUrl(str) {
    if (!str) return false
    try {
      new URL(str)
      return true
    } catch {
      return false
    }
  }

   isNumeric(str) {
    if (!str) return false
    return !isNaN(str) && !isNaN(parseFloat(str))
  }

   isAlpha(str) {
    if (!str) return false
    return /^[a-zA-Z]+$/.test(str)
  }

   isAlphanumeric(str) {
    if (!str) return false
    return /^[a-zA-Z0-9]+$/.test(str)
  }

   contains(str, substring, caseSensitive = true) {
    if (!str || !substring) return false
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? substring : substring.toLowerCase()
    return haystack.includes(needle)
  }

   startsWith(str, prefix, caseSensitive = true) {
    if (!str || !prefix) return false
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? prefix : prefix.toLowerCase()
    return haystack.startsWith(needle)
  }

   endsWith(str, suffix, caseSensitive = true) {
    if (!str || !suffix) return false
    const haystack = caseSensitive ? str : str.toLowerCase()
    const needle = caseSensitive ? suffix : suffix.toLowerCase()
    return haystack.endsWith(needle)
  }

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
  }

   replace(str, search, replacement, caseSensitive = true) {
    if (!str || !search) return str
    
    if (caseSensitive) {
      return str.replace(new RegExp(this.escapeRegExp(search), 'g'), replacement)
    } else {
      return str.replace(new RegExp(this.escapeRegExp(search), 'gi'), replacement)
    }
  }

   escapeRegExp(str) {
    if (!str) return ''
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  }

   similarity(str1, str2) {
    if (!str1 || !str2) return 0
    if (str1 === str2) return 1
    
    const longer = str1.length > str2.length ? str1 : str2
    const shorter = str1.length > str2.length ? str2 : str1
    
    if (longer.length === 0) return 1
    
    const editDistance = this.levenshteinDistance(longer, shorter)
    return (longer.length - editDistance) / longer.length
  }

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
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          )
        }
      }
    }
    
    return matrix[str2.length][str1.length]
  }

   randomString(length = 10, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    return result
  }

   uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0
      const v = c === 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }

   hash(str) {
    if (!str) return 0
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash)
  }

   extract(str, pattern, flags = '') {
    if (!str) return []
    const regex = new RegExp(pattern, flags)
    return str.match(regex) || []
  }

   extractAll(str, pattern, flags = 'g') {
    if (!str) return []
    const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
    const matches = []
    let match
    
    while ((match = regex.exec(str)) !== null) {
      matches.push(match)
    }
    
    return matches
  }

   template(str, data = {}) {
    if (!str) return ''
    
    return str.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data.hasOwnProperty(key) ? data[key] : match
    })
  }

   mask(str, maskChar = '*', start = 0, end = null) {
    if (!str) return ''
    const endIndex = end === null ? str.length : end
    const before = str.substring(0, start)
    const masked = maskChar.repeat(Math.max(0, endIndex - start))
    const after = str.substring(endIndex)
    
    return before + masked + after
  }

   format(template, ...args) {
    return template.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match
    })
  }
}

export default StringUtils