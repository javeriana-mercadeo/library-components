# Guía de Utilidades Globales

**PARA AGENTES DE IA**: Reglas estrictas. Léelas antes de escribir código.

## 🎯 3 Reglas de Oro

1. **USA directamente**: `Logger.info()`, `TimingUtils.sleep()`, etc.
2. **NUNCA crees**: wrappers, fallbacks, validaciones de existencia
3. **HTTPClient es especial**: Es una clase. Usa `fetch()` o `new HTTPClient()`

## 📋 Referencia Rápida

```javascript
// ✅ CORRECTO
Logger.info('mensaje')
EventManager.add(el, 'click', fn)
TimingUtils.createScheduler()
const res = await fetch('/api')  // Para HTTP simple

// ❌ INCORRECTO
console.log()                    // Usa Logger
setTimeout()                      // Usa scheduler
addEventListener()                // Usa EventManager
await HTTPClient.get()            // HTTPClient es clase, usa fetch()
if (Logger) Logger.info()         // NUNCA valides existencia
```

---

## Utilidades Globales Disponibles

## 🔑 Tipos de Utilidades

### 9 Objetos Directos (NO uses `new`)
```javascript
Logger.info()           EventManager.add()      TimingUtils.sleep()
DOMUtils.findElement()  ValidatorUtils.isEmail() FormManager.validate()
DataUtils.isEmpty()     StringUtils.capitalize() StorageUtils.set()
```

### 1 Clase (HTTPClient)
```javascript
// ❌ ERROR: HTTPClient.get()  → "is not a function"

// ✅ Opción 1: fetch (RECOMENDADO 95% casos)
const res = await fetch('/api/data')
const data = await res.json()

// ✅ Opción 2: new HTTPClient() (casos avanzados)
const client = new HTTPClient()
await client.get('/api/data')
```

**Regla simple**: Si es `HTTPClient` → usa `fetch()`. Si no → usa directo.

---

### 1. **TimingUtils** - Control de tiempo y flujo

#### `createScheduler()`

Crea un scheduler para gestionar múltiples timers.

```javascript
const scheduler = TimingUtils.createScheduler()

// Programar una tarea
const taskId = scheduler.schedule(() => {
  console.log('Tarea ejecutada')
}, 1000)

// Cancelar una tarea
scheduler.cancel(taskId)

// Cancelar todas las tareas
scheduler.cancelAll()

// Ver tareas pendientes
console.log(scheduler.pending())
```

#### `debounce(fn, wait, immediate)`

Retrasa la ejecución de una función.

```javascript
const debouncedFn = TimingUtils.debounce(() => {
  console.log('Búsqueda ejecutada')
}, 300)

input.addEventListener('input', debouncedFn)
```

#### `throttle(fn, limit, options)`

Limita la frecuencia de ejecución de una función.

```javascript
const throttledFn = TimingUtils.throttle(
  () => {
    console.log('Scroll manejado')
  },
  100,
  { leading: true, trailing: true }
)

window.addEventListener('scroll', throttledFn)
```

#### `sleep(ms)`

Pausa la ejecución de forma asíncrona.

```javascript
async function waitAndExecute() {
  await TimingUtils.sleep(1000)
  console.log('Ejecutado después de 1 segundo')
}
```

#### `retry(fn, maxAttempts, delayMs)`

Reintenta una función asíncrona en caso de error.

```javascript
await TimingUtils.retry(
  async () => {
    const response = await fetch('/api/data')
    return response.json()
  },
  3, // 3 intentos
  1000 // 1 segundo entre intentos
)
```

#### `timeout(promise, ms, timeoutError)`

Añade timeout a una promesa.

```javascript
const result = await TimingUtils.timeout(fetch('/api/slow-endpoint'), 5000, new Error('Timeout de 5 segundos excedido'))
```

#### `waitFor(condition, options)`

Espera hasta que una condición sea verdadera.

```javascript
await TimingUtils.waitFor(() => document.querySelector('.elemento-dinamico'), { timeout: 5000, interval: 100 })
```

#### `createRateLimiter(maxCalls, windowMs)`

Limita la cantidad de llamadas en una ventana de tiempo.

```javascript
const limiter = TimingUtils.createRateLimiter(5, 60000) // 5 llamadas por minuto

if (limiter.attempt()) {
  // Ejecutar acción
} else {
  console.log(`Espera ${limiter.timeUntilReset()}ms antes de reintentar`)
}
```

---

### 2. **EventManager** - Gestión de eventos

#### `add(element, event, handler, options)`

Añade un event listener y retorna una key única.

```javascript
const eventKey = EventManager.add(document, 'click', e => console.log('Click detectado'), { passive: true })
```

#### `remove(key)`

Remueve un event listener por su key.

```javascript
EventManager.remove(eventKey)
```

#### `removeByElement(element)`

Remueve todos los listeners de un elemento.

```javascript
EventManager.removeByElement(document)
```

#### `removeByEvent(eventType)`

Remueve todos los listeners de un tipo de evento.

```javascript
EventManager.removeByEvent('click')
```

#### `cleanup()`

Limpia todos los event listeners registrados.

```javascript
EventManager.cleanup()
```

#### `delegate(container, selector, event, handler, options)`

Event delegation para elementos dinámicos.

```javascript
EventManager.delegate(document.body, '.dynamic-button', 'click', e => console.log('Botón dinámico clickeado'))
```

#### `once(element, event, handler, options)`

Event listener que se ejecuta solo una vez.

```javascript
EventManager.once(button, 'click', () => console.log('Solo se ejecuta una vez'))
```

#### `emit(element, eventType, detail, options)`

Dispara un evento personalizado.

```javascript
EventManager.emit(element, 'custom:event', { data: 'valor' }, { bubbles: true })
```

#### Event Bus: `on(eventName, handler)`, `off(eventName, handler)`, `trigger(eventName, ...args)`

Sistema de eventos global sin elementos DOM.

```javascript
// Suscribirse
EventManager.on('data:loaded', data => {
  console.log('Datos cargados:', data)
})

// Emitir
EventManager.trigger('data:loaded', { id: 1, name: 'Test' })

// Desuscribirse
EventManager.off('data:loaded', handler)
```

---

### 3. **DOMUtils** - Utilidades DOM

#### `isElementVisible(element, threshold)`

Verifica si un elemento está visible en el viewport.

```javascript
const isVisible = DOMUtils.isElementVisible(element, 0.5) // 50% visible
if (isVisible) {
  console.log('Elemento visible')
}
```

---

### 4. **Logger** - Sistema de logging

#### Métodos disponibles

```javascript
Logger.debug('Mensaje de debug', { extra: 'data' })
Logger.info('Información general')
Logger.warning('Advertencia')
Logger.error('Error ocurrido', error)
Logger.table(arrayData) // Muestra datos en tabla
```

---

### 5. **StringUtils** - Utilidades de strings

```javascript
// Ejemplo de uso común
const normalized = StringUtils.normalize(text)
const truncated = StringUtils.truncate(text, 100)
```

---

### 6. **FacultyNormalizer** - Normalización de facultades

```javascript
const normalizedName = FacultyNormalizer.normalize('Facultad de Ingeniería')
```

---

### 7. **DataUtils** - Utilidades de datos

```javascript
// Validaciones y transformaciones de datos
const isValid = DataUtils.validate(data, schema)
```

---

### 8. **HTTPClient** - Cliente HTTP

**⚠️ ADVERTENCIA:** `HTTPClient` es una **clase**, NO un objeto. Debes crear una instancia.

#### Opción 1: Crear instancia (para uso avanzado con interceptors)

```javascript
// Crear instancia
const apiClient = new HTTPClient('https://api.example.com', {
  headers: { 'Authorization': 'Bearer token' },
  timeout: 5000
})

// Realizar peticiones
const response = await apiClient.get('/endpoint')
const data = response.data

await apiClient.post('/endpoint', { name: 'value' })
```

#### Opción 2: Usar fetch nativo (⭐ Recomendado para requests simples)

```javascript
// Para peticiones simples, usa fetch directamente
const response = await fetch('/api/endpoint')
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`)
}
const data = await response.json()

// POST request
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: 'value' })
})
```

**❌ ERROR COMÚN:**
```javascript
// ❌ INCORRECTO - HTTPClient.get is not a function
const data = await HTTPClient.get('/api/endpoint')
```

---

## Patrones de Uso Comunes

### Patrón 1: Gestión de Timers en una Clase

```javascript
class MyComponent {
  constructor() {
    this.scheduler = TimingUtils.createScheduler()
  }

  startPolling() {
    const pollFn = () => {
      this.fetchData()
      this.scheduler.schedule(pollFn, 5000)
    }
    this.scheduler.schedule(pollFn, 5000)
  }

  destroy() {
    this.scheduler.cancelAll()
  }
}
```

### Patrón 2: Gestión de Eventos en una Clase

```javascript
class MyComponent {
  constructor() {
    this.eventListeners = new Set()
  }

  init() {
    const clickKey = EventManager.add(this.element, 'click', this.handleClick.bind(this))
    this.eventListeners.add(clickKey)

    const resizeKey = EventManager.add(window, 'resize', TimingUtils.throttle(this.handleResize.bind(this), 100))
    this.eventListeners.add(resizeKey)
  }

  destroy() {
    this.eventListeners.forEach(key => EventManager.remove(key))
    this.eventListeners.clear()
  }
}
```

### Patrón 3: Lazy Loading con Intersection Observer

```javascript
class LazyLoader {
  constructor() {
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadContent(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )
  }

  async loadContent(element) {
    try {
      await TimingUtils.sleep(300) // Pequeño delay

      if (DOMUtils.isElementVisible(element, 0.3)) {
        // Cargar contenido
        Logger.info('Contenido cargado')
      }
    } catch (error) {
      Logger.error('Error cargando contenido', error)
    }
  }
}
```

### Patrón 4: Funciones Helper Locales (cuando sea necesario)

Solo define funciones locales si son **específicas del módulo** y no tienen equivalente global:

```javascript
// ✅ CORRECTO - Función específica del módulo
function getVideoUrl(container, type) {
  if (typeof configuration !== 'undefined') {
    const configUrl = type === 'mobile' ? configuration.urlVideoMobile : configuration.urlVideoDesktop
    if (configUrl?.trim()) return configUrl
  }

  const dataAttr = type === 'mobile' ? 'data-video-mobile-url' : 'data-video-desktop-url'
  return container.getAttribute(dataAttr)?.trim() || null
}

// ✅ CORRECTO - Función simple de utilidad del script principal
function onDOMReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    callback()
  }
}
```

---

## Contexto: Next.js + Turbopack + SSR

### Importante: Utilidades solo disponibles en Cliente

Las utilidades globales se cargan mediante el componente `ClientSideUtils` y **solo están disponibles en el navegador**, no durante
Server-Side Rendering (SSR).

#### ✅ Correcto: Uso en componentes de cliente

```javascript
'use client'

import { useEffect, useState } from 'react'

export default function MyComponent() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Importación dinámica para scripts que usan utilidades globales
    import('./script.js')
      .then(module => {
        const script = module.default
        if (typeof script === 'function') {
          script()
        }
      })
      .catch(err => {
        console.error('Error loading script:', err)
      })
  }, [mounted])

  return <div>Mi componente</div>
}
```

#### ❌ Incorrecto: Uso directo en SSR

```javascript
// ❌ INCORRECTO - Esto fallará en SSR
import script from './script.js' // Este script usa utilidades globales

export default function MyComponent() {
  useEffect(() => {
    script() // Error: TimingUtils is not defined
  }, [])
}
```

---

## 🤖 Algoritmo de Decisión (2 pasos)

```
1. ¿HTTP? → fetch()
2. ¿Otra cosa? → NombreUtil.metodo()
```

**Nunca**: validar existencia, crear wrappers, usar `new` (excepto HTTPClient)

---

## ✅ Checklist Pre-Código

- [ ] HTTP → `fetch()` (no `HTTPClient.get()`)
- [ ] Logs → `Logger.error()` (no `console.log`)
- [ ] Timers → `scheduler.schedule()` (no `setTimeout`)
- [ ] Eventos → `EventManager.add()` (no `addEventListener`)
- [ ] Sin validaciones de existencia
- [ ] Sin wrappers
- [ ] Limpieza en `destroy()`: scheduler, eventos, observers

---

## Referencias Rápidas

### Limpieza de Recursos

Siempre limpia recursos en el método `destroy()`:

```javascript
destroy() {
  // Limpiar scheduler
  if (this.scheduler) {
    this.scheduler.cancelAll()
  }

  // Limpiar eventos
  if (this.eventListeners) {
    this.eventListeners.forEach(key => EventManager.remove(key))
    this.eventListeners.clear()
  }

  // Limpiar observers
  if (this.observer) {
    this.observer.disconnect()
  }
}
```

### Logging Consistente

```javascript
// Usar prefijos para identificar el módulo
Logger.info('[MyModule] Iniciando...')
Logger.error('[MyModule] Error:', error)
Logger.debug('[MyModule] Estado:', { initialized: true })
```

---

## ❌ Top 3 Errores

### 1. HTTPClient como objeto
```javascript
❌ await HTTPClient.get('/api')  // TypeError
✅ await fetch('/api')            // Correcto
```

### 2. Validaciones innecesarias
```javascript
❌ if (Logger) Logger.info()     // NUNCA valides
✅ Logger.info()                 // Usa directo
```

### 3. console.log / setTimeout / addEventListener
```javascript
❌ console.log() / setTimeout() / addEventListener()
✅ Logger.info() / scheduler.schedule() / EventManager.add()
```

---

## FAQ

**P: ¿Por qué `HTTPClient.get()` da error?**
R: Es clase, no objeto. Usa `fetch()` o `new HTTPClient()`

**P: ¿Cuándo crear funciones helper locales?**
R: Solo si son específicas del módulo (ej: `getVideoUrl()` para sistema de videos)

**P: ¿Validar si existe utilidad?**
R: NUNCA. Siempre están disponibles.

**P: ¿setTimeout o scheduler?**
R: Scheduler. Permite limpieza fácil en `destroy()`

---

## Ubicación de Archivos

- **Utilidades globales**: `app/utils/core/`, `app/utils/helpers/`, `app/utils/api/`
- **Carga de utilidades**: `components/utils/ClientSideUtils/ClientSideUtils.tsx`
- **Ejemplos de uso**: `app/landing/pregrado/_sections/1_datos/`

---

**Última actualización**: 2025-10-15

---

## 🚨 TL;DR para IAs

**Antes de escribir código:**
1. HTTP → `fetch()`
2. Logger, EventManager, etc. → directo (ej: `Logger.info()`)
3. NUNCA: validar, crear wrappers, usar `console/setTimeout/addEventListener`
4. SIEMPRE: limpiar en `destroy()` (scheduler, eventos, observers)

---

**FIN DE LA GUÍA**
