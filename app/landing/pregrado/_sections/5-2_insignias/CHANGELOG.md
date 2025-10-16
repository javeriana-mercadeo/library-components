# Changelog - Carrusel de Insignias Swiper

Todos los cambios notables de este componente serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

---

## [3.2.0] - 2025-10-16

### 🔴 BUGFIXES CRÍTICOS

Esta versión corrige **4 bugs críticos de usabilidad** identificados después de testing:

#### ✅ Fix 1: Drag se atasca al deslizar a la derecha
- **Problema**: Al arrastrar hacia la derecha, el carrusel se detenía en el punto de loop infinito
- **Causa**: `freeMode: true` + `loop: true` son **incompatibles** en Swiper.js
- **Solución**: Removido `freeMode` completamente
- **Resultado**: Drag funciona perfectamente en ambas direcciones

#### ✅ Fix 2: Drag a la izquierda no muestra imágenes
- **Problema**: Al arrastrar hacia la izquierda, no aparecían imágenes
- **Causa**: `loopAdditionalSlides: 6` era insuficiente para 6 slides totales
- **Solución**: Cambiado a `loopAdditionalSlides: totalSlides` (dinámico)
- **Resultado**: Loop infinito funciona correctamente en ambas direcciones

#### ✅ Fix 3: Paginación no responde a clicks
- **Problema**: Los bullets de paginación no eran visibles ni clickeables
- **Causa**: **Faltaban estilos CSS** para `.swiper-pagination-bullet`
- **Solución**: Agregados 48 líneas de estilos completos con hover y active states
- **Resultado**: Bullets visibles, clickeables y con animaciones

#### ✅ Fix 4: Gradientes no ocultan overflow
- **Problema**: Las imágenes se desbordaban por los lados, gradientes no funcionaban
- **Causa**: `z-index: 2` era demasiado bajo, Swiper lo sobrescribía
- **Solución**:
  - Aumentado a `z-index: 10` en gradientes
  - Agregado `z-index: 1` en `.swiper-wrapper`
  - Forzado `overflow: hidden !important`
- **Resultado**: Gradientes laterales funcionan correctamente

---

### 🔧 Mejoras Técnicas

#### Configuración de Swiper Optimizada
```javascript
// ❌ REMOVIDO (causaba conflicto con loop)
freeMode: { enabled: true }

// ✅ AGREGADO
speed: 600,  // Transiciones más suaves
loopAdditionalSlides: totalSlides,  // Dinámico
loopFillGroupWithBlank: false
```

#### Estilos de Paginación Completos
- Bullets con tamaño 10px × 10px
- Hover effect con scale(1.15)
- Active state con forma alargada (24px ancho)
- Colores adaptativos para dark mode
- Transiciones suaves de 0.3s
- Gap de 8px entre bullets

#### Z-index Mejorado
```scss
.insignias-swiper {
  overflow: hidden !important;  // Forzado

  &::before, &::after {
    z-index: 10;  // Antes: 2
  }
}

.swiper-wrapper {
  z-index: 1;  // Nuevo
}
```

---

### 📊 Impacto del Fix

| Problema | Antes | Después | Estado |
|----------|-------|---------|--------|
| Drag derecha | ❌ Se atasca | ✅ Fluido | **RESUELTO** |
| Drag izquierda | ❌ No muestra | ✅ Funcional | **RESUELTO** |
| Paginación | ❌ No responde | ✅ Clickeable | **RESUELTO** |
| Gradientes | ❌ No ocultan | ✅ Funcionan | **RESUELTO** |

---

### 🎯 Testing Realizado

- ✅ Drag horizontal en ambas direcciones
- ✅ Loop infinito sin interrupciones
- ✅ Clicks en bullets de paginación
- ✅ Gradientes laterales ocultan overflow
- ✅ Hover effects en imágenes y bullets
- ✅ Autoplay funcional
- ✅ Responsive en todos los breakpoints

---

### 📝 Notas de Migración

#### De v3.1.0 a v3.2.0

**Sin breaking changes** - Actualización transparente:
- Si usabas `freeMode`, ahora está deshabilitado pero el drag sigue funcionando
- La paginación ahora es visible (antes era invisible)
- Los gradientes ahora funcionan correctamente

**Beneficios inmediatos**:
- Mejor UX en drag/swipe
- Navegación con bullets funcional
- Estética mejorada con gradientes

---

## [3.1.0] - 2025-10-16

### 🎉 Cambios Mayores

#### ✅ Compatibilidad Liferay 100%
- **REMOVIDO**: `useEffect` de React
- **AGREGADO**: Auto-inicialización vanilla JS en `script.js`
- **RESULTADO**: Ahora el componente es completamente compatible con Liferay DXP sin modificaciones

### 🚀 Optimizaciones

#### Imágenes WebP
- **Convertidas** todas las imágenes PNG a WebP
- **Reducción total**: 79KB → 30KB (-62%)
- **Detalle por archivo**:
  - `The-acreditada.png`: 48.67KB → 15.40KB (-68.3%)
  - `obet.png`: 8.38KB → 4.03KB (-51.9%)
  - `qs-ranking.png`: 7.07KB → 3.51KB (-50.4%)
  - `alta-calidad.png`: 5.85KB → 3.01KB (-48.5%)
  - `impact-rankings.png`: 4.79KB → 2.09KB (-56.4%)
  - `merco.png`: 3.69KB → 1.85KB (-49.9%)

### 🔧 Mejoras Técnicas

#### Sistema de Reintentos
- **AGREGADO**: Límite de 20 intentos (antes era infinito)
- **AGREGADO**: Backoff exponencial: [100, 200, 300, 500, 1000, 2000, 3000, 5000]ms
- **PREVIENE**: Memory leaks por timeouts infinitos
- **AGREGADO**: Mensaje de error claro si falla después de todos los intentos

#### Cleanup de Event Listeners
- **AGREGADO**: Función `destroyInsigniasSwiper()` para cleanup
- **AGREGADO**: Referencia a resize handler en `window.insigniasSwiper._resizeHandler`
- **PREVIENE**: Acumulación de listeners en múltiples instancias
- **EXPORTADO**: Función pública para uso manual

#### Estilos Simplificados
- **SIMPLIFICADO**: Efectos de hover (eliminada regla conflictiva)
- **CORREGIDO**: Fades laterales usando `transparent` en lugar de `rgba()` hardcodeado
- **MEJORADO**: Orden de reglas CSS para mayor claridad

### 📝 Documentación

#### Nuevos Archivos
- **AGREGADO**: `CHANGELOG.md` (este archivo)
- **AGREGADO**: Script de conversión `assets/convert-to-webp.js`

#### Actualizaciones
- **ACTUALIZADO**: `info.json` con versión 3.1.0 y mejoras detalladas
- **ACTUALIZADO**: Comentarios en `script.js` con headers descriptivos

### 🐛 Fixes

- **CORREGIDO**: Componente usaba `useEffect` (no compatible Liferay)
- **CORREGIDO**: Timeouts infinitos sin límite
- **CORREGIDO**: Fades con colores hardcodeados
- **CORREGIDO**: Reglas de hover que podían conflictuar
- **CORREGIDO**: Referencias de imágenes fallback apuntando a PNG

---

## [3.0.0] - 2025-01-07

### Lanzamiento Inicial

- Implementación con Swiper.js 11.x
- Loop infinito nativo
- Autoplay continuo
- Drag-to-scroll robusto
- Free mode con momentum
- Responsive con 5 breakpoints
- Accesibilidad completa (a11y)
- Soporte `prefers-reduced-motion`
- Fallback de imágenes
- Templates para Liferay (FTL)
- Documentación completa

---

## Comparación con Versiones Anteriores

### vs v2.0 (5-1_insignias)
- ✅ Código -60% más simple (428 → 294 líneas SCSS)
- ✅ Sin bugs de drag custom
- ✅ Loop infinito sin triplicar elementos
- ✅ Librería mantenida profesionalmente

### vs v1.0 (5_insignias)
- ✅ Compatible con Liferay (v1 usa hooks)
- ✅ Drag funcional (v1 no tiene)
- ✅ Momentum/inercia (v1 no tiene)
- ✅ Mejor rendimiento general

---

## Roadmap Futuro

### v3.2.0 (Planeado)
- [ ] Responsive images con `srcset`
- [ ] Lazy loading mejorado
- [ ] Prefetch de imágenes
- [ ] Analytics tracking opcional

### v3.3.0 (Considerando)
- [ ] Tema dark mode mejorado
- [ ] Animaciones personalizables
- [ ] Más opciones de configuración expuestas

---

## Notas de Migración

### De v3.0.0 a v3.1.0

**Sin breaking changes** - La migración es automática si:
- Usas el componente via React (Next.js): funciona igual
- Usas en Liferay: ahora funciona correctamente (antes técnicamente no)

**Opcional**:
- Puedes eliminar los PNG antiguos si ya no los necesitas
- Puedes usar `destroyInsigniasSwiper()` si necesitas cleanup manual

### De v2.0 (5-1_insignias) a v3.1.0

1. Reemplazar componente completo
2. Asegurar que Swiper.js esté cargado
3. Actualizar referencias a assets (de PNG a WebP si usas fallbacks locales)
4. Eliminar script custom de v2.0

### De v1.0 (5_insignias) a v3.1.0

1. Reemplazar componente completo
2. Instalar/cargar Swiper.js
3. Actualizar estructura de datos (agregar `id` y `srcFallback`)
4. No se necesita `useEffect` - auto-inicialización

---

**Mantenido por**: Pontificia Universidad Javeriana
**Última actualización**: 2025-10-16
