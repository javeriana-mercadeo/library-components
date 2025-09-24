<<<<<<< HEAD
import { main } from '../utils/main'
import btn from '../app/_library/components/contain/btn/script.js'

main()

/* // ==========================================
// VERSIÓN SIMPLIFICADA PARA LIFERAY
// ==========================================

let hasExecuted = false

function safeExecute() {
  if (hasExecuted) {
    console.log('🔄 Ya ejecutado, saltando...')
    return
  }

  hasExecuted = true
  console.log('✅ Ejecutando main()...')

  try {
    console.log('DOM completamente cargado y analizado')
    main()
    console.log('🎉 main() ejecutado exitosamente')
  } catch (error) {
    console.error('❌ Error ejecutando main():', error)
  }
}

// ==========================================
// MÉTODOS ESENCIALES PARA LIFERAY
// ==========================================

// 1. Método principal: Liferay events
if (typeof Liferay !== 'undefined' && Liferay.on) {
  console.log('🟢 Liferay detectado - usando eventos nativos')

  Liferay.on('allPortletsReady', function () {
    console.log('📦 Todos los portlets listos')
    safeExecute()
  })
} else {
  console.log('🟡 Liferay no detectado - usando DOMContentLoaded')
}

// 2. Fallback: DOMContentLoaded (tu método original)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      if (!hasExecuted) {
        safeExecute()
      }
    }, 200) // Dar tiempo a Liferay
  })
} else {
  // DOM ya está listo
  setTimeout(() => {
    if (!hasExecuted) {
      safeExecute()
    }
  }, 100)
}

// 3. Fallback final: window.load
window.addEventListener('load', () => {
  setTimeout(() => {
    if (!hasExecuted) {
      console.log('⚠️ Ejecutando por window.load')
      safeExecute()
    }
  }, 500)
})
 */
=======
import initGlobalUtils from '../utils/main'
import btn from '../app/_library/components/contain/btn/script.js'

initGlobalUtils()
btn()
>>>>>>> 2605cab52aa8312d63618e4bc012d1168c315cb3
