# Scripts para Experiencia Javeriana

## Archivos disponibles

### `script.js` - Para Next.js
- ✅ **Uso:** Desarrollo en Next.js
- ✅ **Export:** `export default` para importación ES6
- ✅ **Compatible:** Con React y desarrollo local

### `script-liferay.js` - Para Liferay DXP
- ✅ **Uso:** Producción en Liferay DXP
- ✅ **Vanilla JS:** Sin exports, sin módulos
- ✅ **Auto-inicialización:** Se ejecuta automáticamente
- ✅ **Sin use strict:** Máxima compatibilidad

## Instrucciones de uso

### En Liferay DXP:

1. **Usar `script-liferay.js`** (NO usar `script.js`)
2. **Incluir en Fragment o Template:**
```html
<script src="path/to/script-liferay.js"></script>
```

3. **O copiar directamente el contenido** en el campo JavaScript del Fragment

4. **Verificar en consola:**
```
[EXPERIENCE] Script cargado - Estado del DOM: complete
[EXPERIENCE] Inicializando carrusel - Slides encontrados: 6
[EXPERIENCE] Activando modo Swiper
```

### En Next.js:

1. **Usar `script.js`** (como está actualmente)
2. **El import funciona normalmente:**
```jsx
import script from './script.js'
```

## Dependencias requeridas

### Swiper.js
```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### Phosphor Icons
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.0.3/regular/style.css">
```

## Debugging

### Si el script no funciona en Liferay:

1. **Verificar consola:**
   - Debe aparecer `[EXPERIENCE] Script cargado`
   - Debe aparecer `[EXPERIENCE] Inicializando carrusel`

2. **Verificar dependencias:**
   - `window.Swiper` debe existir
   - Elementos `.experience-carousel__slide` deben existir

3. **Verificar DOM:**
   - Los elementos HTML deben estar presentes antes de ejecutar el script
   - El script debe cargarse DESPUÉS del HTML

4. **Forzar inicialización manual:**
```javascript
// En consola del navegador
window.initExperienceCarousel();
```

## Diferencias principales

| Característica | script.js | script-liferay.js |
|---------------|-----------|-------------------|
| **Export** | ✅ ES6 export default | ❌ Sin exports |
| **Auto-init** | ❌ Manual | ✅ Automática |
| **Use strict** | ⚠️ Posible | ❌ Evitado |
| **Logging** | 🔇 Mínimo | 🔊 Detallado |
| **Contexto** | 🟦 Next.js | 🟨 Liferay |