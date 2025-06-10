// ===========================================
// DUPLICADOR AUTOMÁTICO DE ELEMENTOS
// ===========================================

const AutoDuplicator = {
  init() {
    const track = document.querySelector('.slider-track')
    const originalItems = document.querySelector('.slider-items--original')

    if (!track || !originalItems) return false

    // Limpiar duplicados existentes
    this.clearExistingDuplicates(track)

    // Crear duplicados necesarios para loop infinito
    this.createDuplicates(track, originalItems, 4)

    return true
  },

  clearExistingDuplicates(track) {
    const duplicates = track.querySelectorAll('.slider-items:not(.slider-items--original)')
    duplicates.forEach(duplicate => duplicate.remove())
  },

  createDuplicates(track, originalItems, count) {
    const suffixes = ['duplicate', 'third', 'fourth', 'fifth']

    for (let i = 0; i < count; i++) {
      const duplicateGroup = originalItems.cloneNode(true)
      duplicateGroup.className = `slider-items slider-items--${suffixes[i] || `copy-${i}`}`

      // Actualizar keys de elementos React
      this.updateKeys(duplicateGroup, suffixes[i] || `copy-${i}`)

      track.appendChild(duplicateGroup)
    }
  },

  updateKeys(duplicateGroup, suffix) {
    const items = duplicateGroup.querySelectorAll('.img-logos')
    items.forEach((item, index) => {
      item.setAttribute('data-key', `${suffix}-${index}`)
    })
  }
}

// ===========================================
// AUTO-INICIALIZACIÓN
// ===========================================
export default () => {
  if (typeof document !== 'undefined') {
    const init = () => AutoDuplicator.init()

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init)
    } else {
      init()
    }
  }
}
