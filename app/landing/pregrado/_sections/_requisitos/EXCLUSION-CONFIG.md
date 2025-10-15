# Sistema de Exclusión de Programas - Requisitos de Admisión

## 📋 Descripción

Sistema de lista negra (blacklist) que permite ocultar completamente el componente de requisitos de admisión para códigos de programa específicos.

---

## 🎯 Configuración Básica

### Ubicación
La configuración se encuentra en `script.js` líneas 89-97:

```javascript
const PROGRAM_EXCLUSION_CONFIG = {
  enabled: true,           // Activar/desactivar funcionalidad
  programs: [
    'EMSCL'               // Códigos de programa excluidos
  ],
  hideMode: 'display',    // 'display' o 'remove'
  logExclusions: true     // Mostrar logs en consola
}
```

---

## ✏️ Agregar Códigos a la Lista de Exclusión

### Método 1: Editar directamente en código

```javascript
const PROGRAM_EXCLUSION_CONFIG = {
  enabled: true,
  programs: [
    'EMSCL',
    'PROG123',
    'TEST001'
    // Agregar más códigos aquí
  ],
  hideMode: 'display',
  logExclusions: true
}
```

**Nota:** Los códigos se normalizan automáticamente a mayúsculas, así que `'emscl'`, `'EMSCL'` o `' emscl '` funcionan igual.

---

## 🎛️ Control Dinámico desde Consola

### Ver Configuración Actual
```javascript
window.AdmissionRequirements.getExclusionConfig()
// Retorna: { enabled: true, programs: ['EMSCL'], hideMode: 'display', logExclusions: true }
```

### Verificar si un Programa está Excluido
```javascript
window.AdmissionRequirements.isProgramExcluded('EMSCL')
// Retorna: true
```

### Agregar Programa Temporalmente
```javascript
window.AdmissionRequirements.addExcludedProgram('PROG456')
// Log: Added "PROG456" to exclusion list
```

### Remover Programa
```javascript
window.AdmissionRequirements.removeExcludedProgram('EMSCL')
// Log: Removed "EMSCL" from exclusion list
```

### Limpiar Toda la Lista
```javascript
window.AdmissionRequirements.clearExclusionList()
// Log: Cleared exclusion list (removed 1 programs)
```

### Activar/Desactivar Funcionalidad
```javascript
// Desactivar temporalmente
window.AdmissionRequirements.setExclusionEnabled(false)

// Reactivar
window.AdmissionRequirements.setExclusionEnabled(true)
```

### Cambiar Modo de Ocultación
```javascript
// Ocultar con display: none (por defecto)
window.AdmissionRequirements.setHideMode('display')

// Eliminar completamente del DOM
window.AdmissionRequirements.setHideMode('remove')
```

---

## 🔍 Modos de Ocultación

### Modo `display` (Recomendado)
- Oculta el componente con `display: none`
- El componente permanece en el DOM
- Más rápido y reversible
- Agrega `aria-hidden="true"` para accesibilidad

### Modo `remove`
- Elimina completamente el componente del DOM
- Más limpio pero irreversible
- Libera memoria

---

## 🧪 Cómo Probar

### 1. Simular Evento con Programa Excluido
```javascript
// Simular que se carga el programa EMSCL
const event = new CustomEvent('data_load-program', {
  detail: {
    dataProgram: {
      codPrograma: 'EMSCL'
    }
  }
})
document.dispatchEvent(event)
```

**Resultado esperado:**
```
⚠️ [RequirementsAPI] Program "EMSCL" is in exclusion list - component will be hidden
ℹ️ [RequirementsAPI] Requirements component hidden with display:none
```

### 2. Verificar que el Componente está Oculto
```javascript
const component = document.querySelector('[data-component-id="requisitos"]')
console.log(component.style.display) // 'none'
console.log(component.getAttribute('aria-hidden')) // 'true'
```

### 3. Probar con Programa NO Excluido
```javascript
const event = new CustomEvent('data_load-program', {
  detail: {
    dataProgram: {
      codPrograma: 'PROG999'
    }
  }
})
document.dispatchEvent(event)
```

**Resultado esperado:**
```
ℹ️ [RequirementsAPI] Fetching requirements for program: PROG999
(El componente se renderiza normalmente)
```

---

## 📊 Flujo de Funcionamiento

```
1. Evento 'data_load-program' llega con codPrograma
              ↓
2. setupAPIIntegration() recibe el evento
              ↓
3. isProgramExcluded(codPrograma) verifica lista
              ↓
      ┌───────┴───────┐
      ↓               ↓
   Excluido      No Excluido
      ↓               ↓
hideComponent()   fetchAPI()
      ↓               ↓
   (FIN)      renderComponent()
```

---

## 🐛 Debugging

### Activar Todos los Logs
```javascript
window.RequirementsLogger.enableAll()
```

### Ver Logs de Exclusión
Asegúrate de que `logExclusions: true` en la configuración:
```javascript
PROGRAM_EXCLUSION_CONFIG.logExclusions = true
```

### Ver Estado Actual
```javascript
console.table(window.AdmissionRequirements.getExclusionConfig())
```

---

## 📝 Ejemplos de Uso

### Caso 1: Excluir múltiples programas permanentemente
```javascript
// En script.js
const PROGRAM_EXCLUSION_CONFIG = {
  enabled: true,
  programs: [
    'EMSCL',
    'PROG123',
    'TEST001',
    'DEMO999'
  ],
  hideMode: 'display',
  logExclusions: true
}
```

### Caso 2: Probar exclusión temporalmente
```javascript
// En consola del navegador
window.AdmissionRequirements.addExcludedProgram('TEST999')

// Simular evento
const event = new CustomEvent('data_load-program', {
  detail: { dataProgram: { codPrograma: 'TEST999' } }
})
document.dispatchEvent(event)

// Remover después de probar
window.AdmissionRequirements.removeExcludedProgram('TEST999')
```

### Caso 3: Desactivar temporalmente para debugging
```javascript
// Desactivar exclusión
window.AdmissionRequirements.setExclusionEnabled(false)

// Probar programa que normalmente estaría excluido
const event = new CustomEvent('data_load-program', {
  detail: { dataProgram: { codPrograma: 'EMSCL' } }
})
document.dispatchEvent(event)
// Ahora se renderiza aunque esté en la lista

// Reactivar exclusión
window.AdmissionRequirements.setExclusionEnabled(true)
```

---

## ⚠️ Notas Importantes

1. **Códigos normalizados:** Todos los códigos se convierten a mayúsculas automáticamente
2. **Cambios temporales:** Los cambios desde consola solo duran la sesión actual
3. **Cambios permanentes:** Editar `script.js` y redesplegar
4. **Sin API call:** Cuando un programa está excluido, NO se llama a la API (ahorro de recursos)
5. **Accesibilidad:** El componente oculto tiene `aria-hidden="true"`

---

## 🔄 Deshacer Cambios

Si necesitas deshacer la implementación, simplemente:

1. Remover la configuración `PROGRAM_EXCLUSION_CONFIG` (líneas 73-97)
2. Remover funciones `isProgramExcluded()` y `hideRequirementsComponent()` (líneas 99-149)
3. Restaurar `setupAPIIntegration()` a su versión original (líneas 1066-1091)
4. Remover funciones de control dinámico de `window.AdmissionRequirements` (líneas 544-645)

---

## 📞 Soporte

Para preguntas o issues, contactar al equipo de desarrollo o revisar el código en:
`app/landing/pregrado/_sections/_requisitos/script.js`
