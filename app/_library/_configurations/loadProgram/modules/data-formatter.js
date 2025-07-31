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
  // Cache para números convertidos - usando Map nativo optimizado
  _numberWordsCache: new Map(),

  // Diccionarios optimizados (solo hasta 20 para casos comunes)
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

  capitalizeFirst(str) {
    return StringUtils.capitalize(str)
  },

  cleanDate(dateStr) {
    if (!dateStr) return dateStr
    return StringUtils.replace(dateStr, '.', '').trim()
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
    const connectorsMap = {
      En: 'en',
      La: 'la',
      Los: 'los',
      Las: 'las',
      El: 'el',
      Y: 'y',
      E: 'e',
      O: 'o',
      Para: 'para',
      De: 'de',
      Del: 'del',
      Al: 'al',
      Desde: 'desde',
      Como: 'como',
      Con: 'con',
      Sin: 'sin',
      Por: 'por',
      Sobre: 'sobre',
      Bajo: 'bajo',
      Entre: 'entre',
      Hacia: 'hacia',
      Hasta: 'hasta',
      Según: 'según',
      Durante: 'durante',
      Mediante: 'mediante',
      Ante: 'ante',
      Tras: 'tras',
      Él: 'el',
      UN: 'un',
      UNA: 'una',
      UNOS: 'unos',
      UNAS: 'unas'
    }

    let result = title
    for (const [upperCase, lowerCase] of Object.entries(connectorsMap)) {
      const regex = new RegExp(` ${upperCase} `, 'g')
      result = result.replace(regex, ` ${lowerCase} `)
    }
    return result
  },

  capitalizeWords(str) {
    return StringUtils.capitalizeWords(str)
  },

  formatProgramName(programName) {
    if (!programName || typeof programName !== 'string') {
      return programName || ''
    }

    try {
      const trimmed = StringUtils.trim(programName)
      const capitalized = this.capitalizeWords(trimmed)
      const formatted = this.clearUpperUnions(capitalized)
      return formatted
    } catch (error) {
      Logger.warning('Error formateando nombre de programa:', error)
      return programName
    }
  },

  formatCurrencyCOP(amount) {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(amount)
  }
}