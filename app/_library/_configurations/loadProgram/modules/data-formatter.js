// ===========================================
// SISTEMA DE FORMATEO DE DATOS
// ===========================================
// Usa las utilidades globales disponibles en window

// Normalización de facultades
export const FacultyNormalizer = {
  normalize(facultyName) {
    if (!facultyName || typeof facultyName !== 'string') return ''

    // Usar StringUtils.trim() global
    let clean = facultyName.replace(/^Facultad de /i, '').trim()

    // Mapeo de abreviaciones conocidas a nombres completos
    const facultyMappings = {
      'Cs.Económicas y Administrativ.': 'Ciencias Económicas y Administrativas',
      'Cs.Económicas y Administrativas': 'Ciencias Económicas y Administrativas',
      'Cs.Políticas y Relaciones Int.': 'Ciencias Políticas y Relaciones Internacionales',
      'Arquitectura y Diseño': 'Arquitectura y Diseño'
    }

    return facultyMappings[clean] || clean
  }
}

// Sistema principal de formateo
export const DataFormatter = {
  // Cache para números convertidos
  _numberWordsCache: new Map(),

  // Diccionarios para conversión de números a palabras
  _numberDictionary: {
    units: [
      '',
      'uno',
      'dos',
      'tres',
      'cuatro',
      'cinco',
      'seis',
      'siete',
      'ocho',
      'nueve',
      'diez',
      'once',
      'doce',
      'trece',
      'catorce',
      'quince',
      'dieciséis',
      'diecisiete',
      'dieciocho',
      'diecinueve'
    ],
    tens: ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'],
    hundreds: [
      '',
      'ciento',
      'doscientos',
      'trescientos',
      'cuatrocientos',
      'quinientos',
      'seiscientos',
      'setecientos',
      'ochocientos',
      'novecientos'
    ]
  },

  numberToWords(number) {
    // Usar cache para números ya convertidos
    if (this._numberWordsCache.has(number)) {
      return this._numberWordsCache.get(number)
    }

    const { units, tens, hundreds } = this._numberDictionary

    // Casos especiales
    const specialCases = { 0: 'cero', 100: 'cien', 1000: 'mil' }
    if (specialCases[number]) {
      this._numberWordsCache.set(number, specialCases[number])
      return specialCases[number]
    }

    let result = ''
    let remaining = number

    // Miles (optimizado para casos comunes < 10000)
    if (remaining >= 1000) {
      const thousands = Math.floor(remaining / 1000)
      result += thousands === 1 ? 'mil ' : `${this.numberToWords(thousands)} mil `
      remaining %= 1000
    }

    // Centenas
    if (remaining >= 100) {
      result += hundreds[Math.floor(remaining / 100)] + ' '
      remaining %= 100
    }

    // Decenas y unidades
    if (remaining >= 20) {
      const tensDigit = Math.floor(remaining / 10)
      const unitsDigit = remaining % 10
      result += tens[tensDigit] + (unitsDigit > 0 ? ` y ${units[unitsDigit]}` : '')
    } else if (remaining > 0) {
      result += units[remaining]
    }

    const finalResult = result.trim()
    this._numberWordsCache.set(number, finalResult)
    return finalResult
  },

  formatUnit(unit, number) {
    if (!unit) return ''

    const unitLower = unit.toLowerCase()

    // Reglas de pluralización en español
    if (number === 1) {
      // Singular
      if (unitLower.endsWith('s')) {
        return unitLower.slice(0, -1) // "semestres" → "semestre"
      }
      return unitLower
    } else {
      // Plural
      if (!unitLower.endsWith('s')) {
        return unitLower + 's' // "semestre" → "semestres"
      }
      return unitLower
    }
  },

  formatDuration(duracion, unidadDuracion) {
    if (!duracion || !unidadDuracion) {
      return ''
    }

    try {
      const number = typeof duracion === 'string' ? parseInt(duracion, 10) : duracion

      if (isNaN(number) || number <= 0) {
        return `${duracion} ${unidadDuracion}`.trim()
      }

      const numberInWords = this.capitalizeFirst(this.numberToWords(number))
      const formattedUnit = this.formatUnit(unidadDuracion, number)

      return `${numberInWords} (${number}) ${formattedUnit}.`
    } catch (error) {
      return `${duracion} ${unidadDuracion}`.trim()
    }
  },

  clearUpperUnions(title) {
    // Conectores que deben ir en minúsculas (excepto al inicio)
    const connectors = [
      // Artículos
      'el',
      'la',
      'los',
      'las',
      'un',
      'una',
      'unos',
      'unas',
      // Preposiciones
      'de',
      'del',
      'al',
      'en',
      'con',
      'por',
      'para',
      'sin',
      'sobre',
      'bajo',
      'entre',
      'hacia',
      'hasta',
      'desde',
      'durante',
      'mediante',
      'ante',
      'tras',
      'según',
      'como',
      'a',
      // Conjunciones
      'y',
      'e',
      'o',
      'u',
      'pero',
      'mas',
      'sino',
      'aunque',
      // Otros conectores
      'que',
      'cual',
      'donde',
      'cuando'
    ]

    let result = title

    // Aplicar minúsculas a conectores que no estén al inicio
    connectors.forEach(connector => {
      const regex = new RegExp(`\\b${connector}\\b`, 'gi')
      result = result.replace(regex, (match, offset) => {
        // No cambiar si está al inicio de la cadena
        return offset === 0 ? match : connector
      })
    })

    return result
  },

  capitalizeFirst(str) {
    if (typeof StringUtils !== 'undefined' && StringUtils.capitalize) {
      return StringUtils.capitalize(str)
    }
    // Fallback
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  capitalizeWords(str) {
    if (typeof StringUtils !== 'undefined' && StringUtils.capitalizeWords) {
      return StringUtils.capitalizeWords(str)
    }

    // Fallback con soporte para acentos españoles
    return str.toLowerCase().replace(/(?:^|\s)([a-záéíóúüñ])/g, (match, letter) => {
      return match.replace(letter, letter.toUpperCase())
    })
  },

  formatProgramName(programName) {
    if (!programName || typeof programName !== 'string') {
      return programName || ''
    }

    try {
      // Usar StringUtils.trim si está disponible, sino trim nativo
      const trimmed = typeof StringUtils !== 'undefined' && StringUtils.trim ? StringUtils.trim(programName) : programName.trim()

      const capitalized = this.capitalizeWords(trimmed)
      const formatted = this.clearUpperUnions(capitalized)
      return formatted
    } catch (error) {
      // Usar Logger si está disponible, sino console
      if (typeof Logger !== 'undefined' && Logger.warning) {
        Logger.warning('Error formateando nombre de programa:', error)
      } else {
        console.warn('Error formateando nombre de programa:', error)
      }
      return programName
    }
  },

  formatCurrencyCOP(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount)
  },

  cleanDate(dateString) {
    if (!dateString || typeof dateString !== 'string') {
      return dateString || ''
    }
    
    try {
      // Limpiar formato de fecha común: "YYYY-MM-DD" o "DD/MM/YYYY"
      const cleanedDate = dateString.trim()
      
      // Si es formato ISO (YYYY-MM-DD), convertir a formato legible
      if (/^\d{4}-\d{2}-\d{2}/.test(cleanedDate)) {
        const date = new Date(cleanedDate)
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        }
      }
      
      return cleanedDate
    } catch (error) {
      if (typeof Logger !== 'undefined' && Logger.warning) {
        Logger.warning('Error limpiando fecha:', error)
      } else {
        console.warn('Error limpiando fecha:', error)
      }
      return dateString
    }
  }
}
