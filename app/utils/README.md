# 🛠️ Utils Library v2.0

Sistema de utilidades globales robusto y modular para aplicaciones web modernas.

## 📁 Estructura

```
utils/
├── README.md                    # Esta documentación
├── index.js                     # Punto de entrada principal
├── main.js                      # Archivo legacy (mantener compatibilidad)
├── core/                        # Módulos fundamentales
│   ├── logger.js               # Sistema de logging avanzado
│   ├── dom.js                  # Utilidades de manipulación DOM
│   ├── events.js               # Gestor de eventos centralizado
│   └── timing.js               # Control de tiempo y flujo
├── validation/                  # Sistema de validación
│   ├── validators.js           # Validadores extensibles
│   └── form-manager.js         # Gestión avanzada de formularios
├── api/                        # Cliente HTTP
│   └── http-client.js          # Cliente HTTP con interceptors
└── helpers/                    # Utilidades auxiliares
    ├── data-utils.js           # Manipulación de datos
    ├── string-utils.js         # Utilidades de strings
    └── storage-utils.js        # Gestión de almacenamiento
```

## 🚀 Uso Rápido

### Importación Moderna (Recomendada)

```javascript
// Importar todo
import { Logger, DOMUtils, FormManager, HTTPClient } from './utils/index.js'

// Importar específico
import Logger from './utils/core/logger.js'
import { ValidatorUtils } from './utils/validation/validators.js'
```

### Uso Legacy (Compatibilidad)

```javascript
// El archivo main.js sigue funcionando
import initGlobalUtils from './utils/main.js'

// O acceso global (browser)
Logger.info('Funciona igual que antes')
DOMHelpers.findElement('#myElement')
```

## 📋 Módulos Principales

### 🔍 Logger

Sistema de logging con niveles y configuración avanzada.

```javascript
import Logger from './utils/core/logger.js'

Logger.debug('Información de debug')
Logger.info('Información general')
Logger.success('Operación exitosa')
Logger.warning('Advertencia')
Logger.error('Error crítico')

// Configuración
Logger.setLevel(LogLevel.INFO)
Logger.setTimestamp(false)
Logger.group('Mi Grupo')
Logger.time('Operación')
```

### 🎯 DOMUtils

Utilidades mejoradas para manipular el DOM.

```javascript
import { DOMUtils } from './utils/index.js'

// Funciones existentes mejoradas
DOMUtils.findElement('#myElement')
DOMUtils.createElement('div', {
  className: 'my-class',
  attributes: { 'data-id': '123' },
  styles: { color: 'red' }
})

// Nuevas funcionalidades
DOMUtils.fadeIn(element)
DOMUtils.isInViewport(element)
DOMUtils.animate(element, keyframes)
```

### ⚡ EventManager

Gestor de eventos centralizado y avanzado.

```javascript
import { EventManager } from './utils/index.js'

// Gestión básica
const eventId = EventManager.add(button, 'click', handler)
EventManager.remove(eventId)

// Funcionalidades avanzadas
EventManager.delegate(container, '.button', 'click', handler)
EventManager.once(element, 'load', handler)
EventManager.emit(element, 'customEvent', { data: 'value' })

// Event bus
EventManager.on('myEvent', handler)
EventManager.trigger('myEvent', data)
```

### ⏱️ TimingUtils

Control de tiempo y flujo mejorado.

```javascript
import { TimingUtils } from './utils/index.js'

// Funciones básicas mejoradas
TimingUtils.debounce(fn, 300, true) // immediate option
TimingUtils.throttle(fn, 100, { leading: true, trailing: false })

// Nuevas utilidades
await TimingUtils.sleep(1000)
await TimingUtils.retry(asyncFn, 3, 1000)
await TimingUtils.waitFor(() => condition, { timeout: 5000 })

// Herramientas avanzadas
const scheduler = TimingUtils.createScheduler()
const rateLimiter = TimingUtils.createRateLimiter(10, 60000)
```

### ✅ ValidatorUtils

Sistema de validación extensible y robusto.

```javascript
import { ValidatorUtils } from './utils/index.js'

// Validadores básicos mejorados
ValidatorUtils.email(value)
ValidatorUtils.passwordStrong(value)
ValidatorUtils.phone(value)

// Nuevos validadores
ValidatorUtils.creditCard(value)
ValidatorUtils.age(birthDate, 18, 65)
ValidatorUtils.fileSize(file, 1024 * 1024) // 1MB
ValidatorUtils.similarity(str1, str2) // 0-1

// Composición de validadores
const validator = ValidatorUtils.compose(ValidatorUtils.required, ValidatorUtils.minLength(8), ValidatorUtils.passwordStrong)
```

### 📝 FormManager

Gestión avanzada de formularios con configuración flexible.

```javascript
import { FormManager } from './utils/index.js'

// Configuración por formulario
FormManager.setupForm(form, {
  fieldRules: {
    email: {
      validators: ['required', 'email'],
      message: 'Email válido requerido'
    },
    password: {
      validators: ['required', { validator: 'minLength', options: { min: 8 }, message: 'Mínimo 8 caracteres' }]
    }
  },
  liveValidation: true,
  onSubmit: (form, validation) => {
    console.log('Form válido!', FormManager.getFormData(form))
  }
})
```

### 🌐 HTTPClient

Cliente HTTP avanzado con interceptors y manejo de errores.

```javascript
import { HTTPClient, apiClient } from './utils/index.js'

// Cliente global
const response = await apiClient.get('/api/data')
await apiClient.post('/api/users', userData)

// Cliente personalizado
const client = new HTTPClient('https://api.example.com', {
  timeout: 5000,
  retries: 3
})

// Interceptors
client.addRequestInterceptor(async config => {
  config.headers.Authorization = `Bearer ${token}`
  return config
})

// Upload de archivos
await client.uploadFile('/upload', file)
```

### 📊 DataUtils

Utilidades poderosas para manipulación de datos.

```javascript
import { DataUtils } from './utils/index.js'

// Manipulación de objetos
const cloned = DataUtils.clone(obj, true)
const merged = DataUtils.deepMerge(obj1, obj2)
const value = DataUtils.get(obj, 'user.profile.name', 'Default')

// Manipulación de arrays
const grouped = DataUtils.groupBy(users, 'department')
const paginated = DataUtils.paginate(items, 2, 10)
const tree = DataUtils.createTree(flatData)
```

### 🔤 StringUtils

Utilidades completas para manipulación de strings.

```javascript
import { StringUtils } from './utils/index.js'

// Transformaciones
StringUtils.camelCase('hello world') // 'helloWorld'
StringUtils.slugify('Título con Acentos!') // 'titulo-con-acentos'
StringUtils.mask('1234567890', '*', 3, 7) // '123****890'

// Validaciones
StringUtils.similarity('hello', 'helo') // 0.8
StringUtils.levenshteinDistance('kitten', 'sitting') // 3
```

### 💾 StorageUtils

Gestión avanzada de almacenamiento con encriptación y TTL.

```javascript
import { StorageUtils } from './utils/index.js'

// Almacenamiento básico
StorageUtils.set('key', value, { ttl: 3600000 }) // 1 hora
const value = StorageUtils.get('key', { defaultValue: 'default' })

// Funcionalidades avanzadas
StorageUtils.set('sensitive', data, { encrypt: true })
StorageUtils.cleanExpired()

// Namespace
const userStorage = StorageUtils.createNamespacedStorage('user')
userStorage.set('profile', userData)
```

## 🔧 Configuración

### Inicialización Personalizada

```javascript
import { initGlobalUtils } from './utils/index.js'

// Configuración personalizada
initGlobalUtils({
  exposeToWindow: true, // Exponer globalmente
  logLevel: 'INFO', // Nivel de logging
  namespace: 'MyApp', // Namespace personalizado
  enableLegacySupport: true // Soporte para código legacy
})
```

### Variables de Entorno

```javascript
// Configuración desde variables de entorno
const config = {
  logLevel: process.env.LOG_LEVEL || 'DEBUG',
  apiBaseURL: process.env.API_BASE_URL || 'http://localhost:3000'
}
```

## 🔄 Migración desde v1.0

### Cambios Breaking

- Los nombres de las clases han cambiado: `DOMHelpers` → `DOMUtils`
- Algunas funciones tienen nuevos parámetros opcionales
- El sistema de validación es más estricto

### Migración Gradual

1. **Sin cambios**: El archivo `main.js` legacy sigue funcionando
2. **Migración gradual**: Cambia imports uno por uno
3. **Migración completa**: Usa la nueva estructura modular

```javascript
// Antes (v1.0)
import initGlobalUtils from './utils/main.js'

// Después (v2.0)
import { initGlobalUtils } from './utils/index.js'
```

## 🧪 Testing y Debugging

```javascript
// Debug del sistema de utilidades
import { getUtilsInfo, cleanupUtils } from './utils/index.js'

console.log(getUtilsInfo())
// { version: '2.0.0', modules: [...], loaded: true, environment: 'browser' }

// Limpieza al salir
window.addEventListener('beforeunload', cleanupUtils)
```

## 📈 Performance

### Optimizaciones Incluidas

- **Lazy loading**: Los módulos se cargan bajo demanda
- **Tree shaking**: Importa solo lo que necesitas
- **Caching**: Respuestas HTTP y validaciones cacheadas
- **Debouncing**: Validaciones optimizadas en formularios
- **Memory management**: Limpieza automática de event listeners

### Mejores Prácticas

```javascript
// ✅ Bueno: Importación específica
import { Logger } from './utils/index.js'

// ❌ Evitar: Importación completa si no es necesaria
import * as Utils from './utils/index.js'

// ✅ Bueno: Cleanup de recursos
EventManager.cleanup()
FormManager.destroyAll()
```

## 🎯 Roadmap

### v2.1 (Próximo)

- [ ] Soporte para Web Workers
- [ ] Validadores i18n
- [ ] Plugin system
- [ ] Performance metrics

### v2.2 (Futuro)

- [ ] React/Vue adapters
- [ ] TypeScript definitions
- [ ] Testing utilities
- [ ] Documentation generator

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama feature (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

---

**Versión:** 2.0.0  
**Compatibilidad:** ES2018+, Navegadores modernos  
**Tamaño:** ~15KB minified + gzipped
