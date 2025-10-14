# 🔄 Migración de ProjectModal al Modal de Librería

## Resumen

Se ha migrado el componente `ProjectCard` para usar el componente `Modal` de la librería en lugar del modal personalizado `ProjectModal`.

---

## Cambios Realizados

### **1. Archivo Creado**

✅ `app/institutional/secciones-opcionales/sections/proyectos/components/project-card/index_NEW.jsx`

### **2. Cambios en el ProjectCard**

#### **Antes (Sistema Antiguo)**

```jsx
<div className='carousel-slide swiper-slide' data-slide-index={index} role='button' tabIndex={0}>
  {/* Contenido de la card */}
</div>
```

- El card era solo un div con event listeners en JS
- El modal era un componente separado (`ProjectModal`) que se llenaba dinámicamente
- Requería lógica JavaScript compleja en `carousel-system.js` para manejar el modal

#### **Después (Nuevo Sistema)**

```jsx
<Modal id={`project-${index}`} size='lg' trigger={<div className='carousel-slide swiper-slide'>{/* Card del proyecto */}</div>}>
  {/* Contenido del modal específico para este proyecto */}
</Modal>
```

- Cada proyecto tiene su propio modal integrado
- El contenido del modal se genera en el componente
- No requiere lógica JS adicional para poblar el modal

---

## Ventajas del Nuevo Sistema

### ✅ **Menos Código**

- Eliminamos `ProjectModal` (componente separado ya no necesario)
- Eliminamos la lógica de `attachSlideEvents()` y `detachSlideEvents()` del `carousel-system.js`
- No necesitamos código para "llenar" el modal dinámicamente

### ✅ **Mejor Encapsulación**

- Cada `ProjectCard` es autosuficiente con su modal incluido
- El contenido del modal viaja junto con el proyecto
- Más fácil de mantener y entender

### ✅ **Mejor Performance**

- Los modales solo renderizan el contenido cuando se necesita
- No hay un modal compartido que se "repobla" cada vez

### ✅ **Accesibilidad Mejorada**

- El componente Modal de librería ya incluye todas las mejoras de accesibilidad
- Focus trap automático
- ARIA labels correctos
- Navegación por teclado

### ✅ **Sin Conflictos**

- Usa clases `puj-modal-*` que no chocan con el modal antiguo
- Puede coexistir con el sistema anterior durante la migración

---

## Estructura del Contenido del Modal

El nuevo modal incluye:

```jsx
<div className='project-modal__details'>
  <div className='project-modal__layout'>
    {/* Información del proyecto */}
    <div className='project-modal__info project-info'>
      <Title>{project.title}</Title>
      <div className='info-row'>Fecha</div>
      <div className='info-row'>Responsable</div>
      <div className='info-row'>Descripción</div>
    </div>

    {/* Galería y Videos */}
    <div className='project-modal__gallery project-gallery'>
      <div className='videos-container'>{/* iframes de YouTube */}</div>
      <div className='gallery-items'>{/* imágenes */}</div>
    </div>
  </div>
</div>
```

---

## Pasos para Migrar

### **Paso 1: Actualizar el import en index.jsx**

```jsx
// Antes
import ProjectCard from './components/project-card'

// Después
import ProjectCard from './components/project-card/index_NEW'
```

### **Paso 2: Eliminar el ProjectModal**

```jsx
// Eliminar esta línea
<ProjectModal />
```

El archivo `index.jsx` quedaría así:

```jsx
return (
  <section className='hero-carousel' id='carousel-section'>
    <Container className='hero-carousel__header'>
      <Title>Proyectos Destacados</Title>
    </Container>

    <Container className='main-container' id='proyectos-container'>
      <div className='hero-carousel__viewport'>
        <div className='carousel-container swiper'>
          <div className='swiper-wrapper'>
            {projects.map((project, index) => (
              <ProjectCard key={project.title} index={index} project={project} />
            ))}
          </div>

          <div className='swiper-button-prev'></div>
          <div className='swiper-button-next'></div>
          <div className='swiper-pagination'></div>
        </div>
      </div>
    </Container>

    {/* ❌ Eliminar esta línea */}
    {/* <ProjectModal /> */}
  </section>
)
```

### **Paso 3: Limpiar el JavaScript**

En `carousel-system.js`, puedes eliminar:

- El método `attachSlideEvents()`
- El método `detachSlideEvents()`
- Toda la lógica relacionada con abrir modales al hacer click en cards
- La lógica para llenar el modal con datos del proyecto

### **Paso 4: Verificar los estilos**

Los estilos del modal se mantienen en:

- `app/_library/components/feedback/modal/styles.scss` (estilos del modal base)
- `app/institutional/secciones-opcionales/sections/proyectos/components/project-modal/styles.scss` (estilos del contenido interno)

Puedes reutilizar los estilos de `project-modal/styles.scss` para el contenido interno del modal.

---

## Comparación de Tamaño de Código

### **Antes**

```
ProjectCard (index.jsx): ~100 líneas
ProjectModal (componente separado): ~50 líneas
carousel-system.js (lógica modal): ~100 líneas
-----------------
Total: ~250 líneas
```

### **Después**

```
ProjectCard (index_NEW.jsx): ~180 líneas
carousel-system.js (sin lógica modal): 0 líneas
-----------------
Total: ~180 líneas
```

**Reducción: ~30% menos código** ✅

---

## Características del Modal que se Mantienen

✅ **Tamaño:** `lg` (900px en tablet+) ✅ **Videos de YouTube:** Se muestran como iframes embebidos ✅ **Galería de imágenes:** Se muestra
en grid ✅ **Información del proyecto:** Título, fecha, responsable, descripción ✅ **Campos editables Liferay:** Se mantienen ocultos para
edición ✅ **Cerrar con Escape:** Sí ✅ **Cerrar al click fuera:** Sí ✅ **Botón de cerrar X:** Sí

---

## Notas Importantes

1. **Mantén los estilos existentes:** Los estilos de `.project-modal__details`, `.project-info`, etc. siguen funcionando
2. **Compatibilidad con Liferay:** Los campos editables ocultos se mantienen igual
3. **Responsive:** El modal se adapta automáticamente a móvil/tablet/desktop
4. **Testing:** Prueba abrir varios modales en secuencia para verificar que funciona correctamente

---

## Testing Checklist

- [ ] Los cards del carrusel se ven correctamente
- [ ] Al hacer click en un card, el modal se abre
- [ ] El modal muestra la información correcta del proyecto
- [ ] Los videos de YouTube se cargan correctamente
- [ ] Las imágenes de la galería se muestran
- [ ] El botón X cierra el modal
- [ ] Click fuera del modal lo cierra
- [ ] Tecla Escape cierra el modal
- [ ] Se pueden abrir múltiples modales en secuencia
- [ ] El modal funciona en móvil, tablet y desktop
- [ ] Los campos editables de Liferay funcionan correctamente

---

## Rollback (Si es Necesario)

Si necesitas volver al sistema anterior:

1. Restaura el import original:

   ```jsx
   import ProjectCard from './components/project-card'
   ```

2. Restaura el `<ProjectModal />` en el JSX

3. El sistema antiguo seguirá funcionando porque no se ha eliminado

---

## Próximos Pasos (Después de Migrar)

Una vez que el nuevo sistema esté probado y funcionando:

1. ✅ Renombrar `index_NEW.jsx` a `index.jsx`
2. ✅ Eliminar el componente `ProjectModal` completo
3. ✅ Limpiar el archivo `carousel-system.js`
4. ✅ Eliminar imports no utilizados

---

## Soporte

Para dudas o problemas con la migración, revisar:

- `MODAL_USAGE_EXAMPLES.md` - Guía completa del componente Modal
- `app/_library/components/feedback/modal/` - Código fuente del Modal
