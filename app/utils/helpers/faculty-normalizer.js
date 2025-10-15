/**
 * @fileoverview Utilidad para normalización de nombres de facultades
 * @module FacultyNormalizer
 */

const FacultyNormalizer = {
  /**
   * Normaliza el nombre de una facultad para comparación
   * Convierte a minúsculas, remueve acentos y caracteres especiales
   * @param {string} facultyName - Nombre de la facultad
   * @returns {string} Nombre normalizado
   */
  normalize(facultyName) {
    if (!facultyName || typeof facultyName !== 'string') return ''

    // Normalización básica: trim, lowercase
    let normalized = facultyName.trim().toLowerCase()

    // Remover acentos
    normalized = normalized.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

    // Remover puntos, comas y otros caracteres especiales
    normalized = normalized.replace(/[.,\-()]/g, ' ')

    // Remover prefijos comunes como "Facultad de", "Facultad", etc.
    normalized = normalized.replace(/^facultad\s+de\s+/i, '')
    normalized = normalized.replace(/^facultad\s+/i, '')

    // Remover espacios múltiples
    normalized = normalized.replace(/\s+/g, ' ').trim()

    return normalized
  },

  /**
   * Compara dos nombres de facultad
   * @param {string} faculty1 - Primera facultad
   * @param {string} faculty2 - Segunda facultad
   * @returns {boolean} True si son iguales después de normalizar
   */
  areEqual(faculty1, faculty2) {
    return this.normalize(faculty1) === this.normalize(faculty2)
  },

  /**
   * Busca una facultad en una lista
   * @param {string} facultyName - Nombre de la facultad a buscar
   * @param {Array<string>} facultyList - Lista de nombres de facultades
   * @returns {number} Índice de la facultad en la lista, o -1 si no se encuentra
   */
  findInList(facultyName, facultyList) {
    if (!Array.isArray(facultyList)) return -1
    const normalizedName = this.normalize(facultyName)
    return facultyList.findIndex(f => this.normalize(f) === normalizedName)
  }
}

export { FacultyNormalizer }
