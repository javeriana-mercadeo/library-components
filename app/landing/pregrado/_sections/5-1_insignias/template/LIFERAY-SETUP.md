# 📋 Configuración en Liferay DXP - Carrusel de Insignias ALT (CSS Animation)

## 🎯 Guía de Implementación Completa

Esta guía explica paso a paso cómo configurar el carrusel de insignias **versión ALT** en Liferay DXP. Esta versión usa **animación CSS pura** sin dependencias externas.

---

## 🆚 ¿Cuándo usar esta versión (5-1) vs Swiper (5-2)?

| Criterio | 5-1 ALT (CSS) | 5-2 Swiper (JS) |
|----------|---------------|-----------------|
| **Drag-to-scroll** | ❌ No | ✅ Sí |
| **Inercia al arrastrar** | ❌ No | ✅ Sí |
| **Controles navegación** | ❌ No | ✅ Sí (dots, flechas) |
| **Librería externa** | ✅ No requiere | ⚠️ Swiper.js (2.5MB) |
| **Complejidad** | ✅ Simple | ⚠️ Media |
| **Performance** | ✅ Excelente | ✅ Buena |
| **Mantenimiento** | ✅ Fácil | ⚠️ Depende de Swiper |
| **Uso recomendado** | Carrusel simple, solo vista | Interacción avanzada |

**Recomendación:** Usa **5-1 ALT** si solo necesitas mostrar los logos sin interacción del usuario. Usa **5-2 Swiper** si necesitas drag, controles o navegación.

---

## 📦 Requisitos Previos

1. ✅ Liferay DXP 7.4+ instalado
2. ✅ Acceso administrativo al portal
3. ✅ Archivos CSS del componente cargados
4. ❌ **NO requiere** Swiper.js ni JavaScript externo

---

## 🔧 Paso 1: Crear Web Content Structure

### **Opción A: Mediante la Interfaz de Liferay**

1. **Navegar a Web Content**
   ```
   Menu → Content & Data → Web Content
   ```

2. **Crear Nueva Structure**
   - Click en "Structures" (Estructuras)
   - Click en "New" (Nueva)
   - Nombre: `Reconocimientos Académicos ALT`

3. **Configurar Campos**

   **Campo 1: Grupo Repetible "ITEM"**
   - Arrastrar "Fieldset" al canvas
   - Propiedades:
     - **Name:** `ITEM` (IMPORTANTE: debe ser exactamente "ITEM")
     - **Label:** `Item de Reconocimiento`
     - **Repeatable:** ✅ Activar
     - **Show Label:** ✅ Activar

   **Campo 2: Imagen (dentro de ITEM)**
   - Arrastrar "Image" dentro del Fieldset "ITEM"
   - Propiedades:
     - **Name:** `image` (exactamente "image")
     - **Label:** `Imagen del Reconocimiento`
     - **Required:** ✅ Activar
     - **Show Label:** ✅ Activar

   **Campo 3: Descripción (dentro de ITEM)**
   - Arrastrar "Text" dentro del Fieldset "ITEM"
   - Propiedades:
     - **Name:** `description` (exactamente "description")
     - **Label:** `Descripción`
     - **Required:** ✅ Activar
     - **Show Label:** ✅ Activar

4. **Guardar Structure**
   - Click en "Save" (Guardar)

### **Opción B: Mediante JSON (Importación)**

```json
{
  "availableLanguageIds": ["es_ES", "en_US"],
  "defaultLanguageId": "es_ES",
  "fields": [
    {
      "label": {
        "es_ES": "Item de Reconocimiento",
        "en_US": "Recognition Item"
      },
      "predefinedValue": {
        "es_ES": "",
        "en_US": ""
      },
      "repeatable": true,
      "required": false,
      "showLabel": true,
      "dataType": "fieldset",
      "indexType": "",
      "localizable": false,
      "name": "ITEM",
      "readOnly": false,
      "type": "fieldset",
      "nestedFields": [
        {
          "label": {
            "es_ES": "Imagen del Reconocimiento",
            "en_US": "Recognition Image"
          },
          "predefinedValue": {
            "es_ES": "",
            "en_US": ""
          },
          "required": true,
          "showLabel": true,
          "dataType": "image",
          "fieldNamespace": "",
          "indexType": "",
          "localizable": false,
          "name": "image",
          "readOnly": false,
          "repeatable": false,
          "type": "ddm-image",
          "tip": {
            "es_ES": "Formato recomendado: WebP. Máximo 202px × 74px",
            "en_US": "Recommended format: WebP. Max 202px × 74px"
          }
        },
        {
          "label": {
            "es_ES": "Descripción",
            "en_US": "Description"
          },
          "predefinedValue": {
            "es_ES": "",
            "en_US": ""
          },
          "required": true,
          "showLabel": true,
          "dataType": "string",
          "fieldNamespace": "",
          "indexType": "keyword",
          "localizable": true,
          "name": "description",
          "readOnly": false,
          "repeatable": false,
          "type": "text",
          "tip": {
            "es_ES": "Breve descripción del reconocimiento (1-2 líneas)",
            "en_US": "Brief description of the recognition (1-2 lines)"
          }
        }
      ]
    }
  ]
}
```

**Para importar:**
1. En la pantalla de Structures, click en "Actions" → "Import"
2. Pegar el JSON anterior
3. Click en "Import"

---

## 📝 Paso 2: Crear Web Content Template

1. **Navegar a Templates**
   ```
   Content & Data → Web Content → Templates
   ```

2. **Crear Nuevo Template**
   - Click en "New"
   - Propiedades:
     - **Name:** `Template Carrusel Insignias ALT`
     - **Structure:** Seleccionar "Reconocimientos Académicos ALT"
     - **Language:** FreeMarker (FTL)

3. **Copiar el contenido de `template.ftl`**
   - Abrir el archivo: `5-1_insignias/template/template.ftl`
   - Copiar TODO el contenido
   - Pegar en el editor de Liferay

4. **Guardar Template**
   - Click en "Save"

---

## 🎨 Paso 3: Crear Fragment (Opcional pero Recomendado)

### **¿Por qué crear un Fragment?**
- Mayor control sobre la estructura de la página
- Título editable directamente desde el Page Builder
- Mejor integración con el sistema de temas

### **Pasos:**

1. **Navegar a Fragments**
   ```
   Site Builder → Page Fragments
   ```

2. **Crear Nueva Collection** (si no existe)
   - Click en "New"
   - Name: `Landing Pregrado Components`

3. **Crear Nuevo Fragment**
   - Click en la collection creada
   - Click en "New" → "Component"
   - Name: `Carrusel Insignias ALT`

4. **Configurar Fragment**

   **HTML Tab:**
   ```html
   <section id="section-five-alt" data-component="insignias-carousel" class="insignias-section">
     <div class="container insignias-container">
       <h2
         aria-label="Reconocimientos académicos de la Universidad Javeriana"
         class="title title-lg title-bold insignias__title"
         data-lfr-editable-id="title-insignias-alt"
         data-lfr-editable-type="text">
         Reconocimientos Académicos
       </h2>
       <lfr-widget-web-content id="widget1"></lfr-widget-web-content>
     </div>
   </section>
   ```

   **CSS Tab:**
   ```css
   /* Los estilos principales están en styles.scss del componente */
   /* Este espacio se puede usar para ajustes específicos de Liferay */
   ```

   **JavaScript Tab:**
   ```javascript
   /* Esta versión NO requiere JavaScript */
   /* El carrusel funciona 100% con CSS Animation */
   ```

   **Configuration Tab:**
   ```json
   {
     "fieldSets": [
       {
         "fields": [
           {
             "name": "webContentId",
             "label": "Web Content",
             "description": "Selecciona el Web Content con los reconocimientos",
             "type": "itemSelector",
             "typeOptions": {
               "itemType": "com.liferay.journal.model.JournalArticle"
             }
           }
         ]
       }
     ]
   }
   ```

5. **Guardar Fragment**

---

## 📄 Paso 4: Crear Web Content (Contenido)

1. **Navegar a Web Content**
   ```
   Content & Data → Web Content
   ```

2. **Crear Nuevo Article**
   - Click en "New"
   - **Structure:** Seleccionar "Reconocimientos Académicos ALT"
   - **Template:** Seleccionar "Template Carrusel Insignias ALT"

3. **Agregar Items de Reconocimientos**

   **⚠️ IMPORTANTE:** Añade **mínimo 6 items** para que el loop infinito funcione correctamente.

   **Ejemplo de contenido:**

   **Item 1:**
   - **Imagen:** Subir `THE-latin-america.webp`
   - **Alt Text:** "THE Latin America Rankings"
   - **Descripción:** `Tercer lugar en Colombia y 36 en Latinoamérica entre 230 instituciones.`

   **Item 2:**
   - **Imagen:** Subir `alta-calidad.webp`
   - **Alt Text:** "Acreditación de Alta Calidad"
   - **Descripción:** `Acreditación Institucional de Alta Calidad por 10 años (2020)`

   **Item 3:**
   - **Imagen:** Subir `qs-empleabilidad.webp`
   - **Alt Text:** "QS Empleabilidad"
   - **Descripción:** `3ra en empleabilidad de nuestros graduados`

   **Item 4:**
   - **Imagen:** Subir `merco.webp`
   - **Alt Text:** "MERCO"
   - **Descripción:** `1er en el sector educativo de Colombia (2023).`

   **Item 5:**
   - **Imagen:** Subir `the-impact.webp`
   - **Alt Text:** "THE Impact Rankings"
   - **Descripción:** `1er en Colombia por nuestro compromiso con los ODS (2023).`

   **Item 6:**
   - **Imagen:** Subir `qs-by-subject.webp`
   - **Alt Text:** "QS by Subject - ABET"
   - **Descripción:** `Acreditados en ABET.`

4. **Guardar Web Content**
   - **Title:** `Reconocimientos Académicos ALT - Pregrado`
   - Click en "Publish"

---

## 🌐 Paso 5: Agregar a una Página

### **Opción A: Usando Fragment**

1. **Editar Página**
   - Navegar a la página donde quieres el carrusel
   - Click en "Edit" (ícono de lápiz)

2. **Agregar Fragment**
   - En el panel lateral, buscar "Carrusel Insignias ALT"
   - Arrastrar al área de contenido

3. **Configurar Fragment**
   - Click en el fragment agregado
   - En el panel de configuración, seleccionar el Web Content creado
   - Guardar

4. **Publicar Página**
   - Click en "Publish"

### **Opción B: Usando Web Content Display Widget**

1. **Editar Página**
   - Navegar a la página
   - Click en "Edit"

2. **Agregar Widget**
   - Click en "Add" → "Widgets"
   - Buscar "Web Content Display"
   - Arrastrar al área de contenido

3. **Configurar Widget**
   - Click en "Select Web Content"
   - Seleccionar "Reconocimientos Académicos ALT - Pregrado"
   - Guardar

4. **Publicar Página**

---

## 🎨 Paso 6: Cargar Recursos (CSS)

### **CSS (styles.scss compilado)**

**Ubicación recomendada:**
```
/o/puj-landing-pregrado/css/insignias-alt.css
```

**Incluir en el tema o mediante Application Display Template:**
```html
<link rel="stylesheet" href="/o/puj-landing-pregrado/css/insignias-alt.css">
```

### **JavaScript (Opcional)**

Esta versión **NO requiere JavaScript** para funcionar. El carrusel se mueve automáticamente con CSS Animation.

Si quieres agregar controles adicionales (pausa/play con teclado), puedes incluir opcionalmente `script.js`:

```html
<script src="/o/puj-landing-pregrado/js/insignias-alt.js"></script>
```

---

## ✅ Paso 7: Verificar Funcionamiento

### **Checklist de Verificación:**

- [ ] El carrusel se muestra correctamente
- [ ] Las imágenes cargan sin errores
- [ ] El carrusel se mueve automáticamente (animación CSS)
- [ ] El carrusel se pausa al hacer hover
- [ ] Los 3 grupos duplicados son visibles en el inspector (pero el usuario ve un loop continuo)
- [ ] Los efectos hover funcionan (imágenes de gris a color)
- [ ] Responsive: funciona en móvil
- [ ] Responsive: funciona en tablet
- [ ] Responsive: funciona en desktop
- [ ] La consola del navegador no muestra errores
- [ ] El título es editable desde el Page Builder
- [ ] Se pueden agregar/eliminar items desde Web Content

### **Debugging:**

**Si el carrusel no se mueve:**
1. Verificar que el CSS esté cargado correctamente
2. Abrir inspector y buscar la clase `.carousel-track`
3. Verificar que tenga la propiedad `animation: scroll-infinite ...`
4. Verificar que el usuario no tenga `prefers-reduced-motion` activado

**Si las imágenes no cargan:**
1. Verificar URLs en el Web Content
2. Verificar permisos de acceso a las imágenes
3. Revisar la consola del navegador por errores 404

**Si el loop se ve "cortado" o con saltos:**
1. Verificar que tienes **mínimo 6 items** en el Web Content
2. Verificar que los 3 grupos se estén generando (inspector → 3 × `.carousel-group`)
3. Verificar en styles.scss que `translateX(-33.333%)` esté correcto

---

## 📊 Especificaciones de Imágenes

| Especificación | Valor Recomendado |
|----------------|-------------------|
| **Formato** | WebP con transparencia |
| **Ancho máximo** | 202px |
| **Alto máximo** | 74px |
| **Peso máximo** | 50KB |
| **Nombre archivo** | kebab-case (ej: `alta-calidad.webp`) |
| **Alt text** | Descriptivo y conciso |

### **Convertir a WebP:**

```bash
# Instalar cwebp
npm install -g cwebp

# Convertir una imagen
cwebp -q 80 input.png -o output.webp

# Batch conversion
for file in *.png; do cwebp -q 80 "$file" -o "${file%.png}.webp"; done
```

---

## 🔧 Configuración Avanzada

### **Personalizar Velocidad de Animación**

Editar en `styles.scss`:
```scss
$carousel-animation-duration: 40s;  // Cambiar a 30s para más rápido, 60s para más lento
```

**⚠️ Nota:** Requiere recompilar el SCSS y subir el CSS actualizado a Liferay.

### **Cambiar Espaciado Entre Items**

En `styles.scss`:
```scss
$carousel-gap-desktop: rem(30px);  // Espaciado en desktop
$carousel-gap-mobile: rem(20px);   // Espaciado en móvil
```

### **Ajustar Fades Laterales**

En `styles.scss`:
```scss
$carousel-fade-width: rem(100px);  // Ancho del degradado (más = fade más amplio)
```

### **Deshabilitar Pausa en Hover**

En `styles.scss`, comentar:
```scss
.carousel-track {
  animation: scroll-infinite 40s linear infinite;

  // &:hover {
  //   animation-play-state: paused;  // Comentar esta sección
  // }
}
```

---

## 🆚 Comparación con Versión Swiper (5-2)

| Característica | 5-1 ALT (CSS) | 5-2 Swiper (JS) |
|----------------|---------------|-----------------|
| **Animación** | CSS @keyframes | Swiper.js API |
| **Drag-to-scroll** | ❌ No | ✅ Sí |
| **Pausa en hover** | ✅ CSS (automatic) | ✅ Config Swiper |
| **Paginación/Dots** | ❌ No | ✅ Sí |
| **Controles (flechas)** | ❌ No | ✅ Opcional |
| **Dependencias** | ✅ Ninguna | ⚠️ Swiper.js (2.5MB) |
| **Bundle size** | ✅ ~10KB CSS | ⚠️ ~2.5MB + CSS |
| **Duplicación** | Manual (3 grupos FTL) | Automática (Swiper) |
| **Performance** | ✅ Excelente | ✅ Buena |
| **Complejidad setup** | ✅ Simple | ⚠️ Media |
| **Mantenimiento** | ✅ Fácil | ⚠️ Depende librería |
| **Uso recomendado** | Solo vista | Interacción |

**Conclusión:** Usa **5-1 ALT** si:
- Solo necesitas mostrar los logos (sin interacción)
- Quieres máximo performance
- No quieres dependencias externas
- Prefieres simplicidad

Usa **5-2 Swiper** si:
- Necesitas drag-to-scroll
- Quieres controles de navegación
- Requieres paginación con dots
- Necesitas funcionalidad avanzada

---

## 📚 Recursos Adicionales

- **Documentación Liferay Web Content:** https://learn.liferay.com/web/guest/w/dxp/content-authoring-and-management/web-content
- **Documentación Liferay Fragments:** https://learn.liferay.com/web/guest/w/dxp/site-building/creating-pages/page-fragments-and-widgets
- **CSS Animation Guide:** https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations

---

## 🆘 Soporte

**Contacto:** Equipo de Desarrollo - Pontificia Universidad Javeriana
**Versión del componente:** 2.0.0
**Última actualización:** Enero 2025

---

## 📝 Notas Importantes

1. ⚠️ **El template genera 3 grupos duplicados automáticamente.** NO dupliques manualmente los items en el Web Content.

2. ⚠️ Los nombres de los campos (`ITEM`, `image`, `description`) **deben ser exactamente como se indica** (case-sensitive).

3. ⚠️ **Añade mínimo 6 items** para que el loop infinito se vea fluido sin cortes.

4. ✅ El componente respeta la preferencia `prefers-reduced-motion` del usuario desactivando la animación y permitiendo scroll manual.

5. ✅ La animación es 100% CSS, por lo que funciona incluso si JavaScript está deshabilitado.

6. ✅ Esta versión es **más ligera** que la versión Swiper (no requiere librería externa de 2.5MB).

7. ✅ Todos los cambios en el Web Content se reflejan inmediatamente sin necesidad de recompilar código.

---

## 🎓 Conceptos Técnicos

### **¿Cómo funciona el loop infinito?**

1. El template FTL genera **3 grupos idénticos** de items
2. Todos se alinean horizontalmente en `.carousel-track`
3. La animación CSS traslada el track **-33.333%** (1/3 del ancho total)
4. Cuando termina la animación, vuelve a 0% instantáneamente
5. Como los 3 grupos son idénticos, el usuario no percibe el salto

**Visualización:**
```
[Grupo 1][Grupo 2][Grupo 3]
         ↓
         Animación translateX(-33.333%)
         ↓
         [Grupo 1][Grupo 2][Grupo 3]
                           ↑
                           Usuario ve aquí
```

### **¿Por qué 3 grupos y no 2?**

- Con 2 grupos: animación de -50%, más fácil de notar saltos
- Con 3 grupos: animación de -33.333%, transición más suave
- Más grupos = animación más compleja sin beneficio adicional

---

## ✨ Ventajas de la Versión CSS

1. ✅ **Sin dependencias externas:** No requiere Swiper.js ni otras librerías
2. ✅ **Más liviana:** Solo ~10KB de CSS vs 2.5MB de Swiper
3. ✅ **Más simple:** Menos código, más fácil de mantener
4. ✅ **Performance superior:** GPU acceleration nativa con CSS
5. ✅ **Funciona sin JS:** Incluso si JavaScript está deshabilitado
6. ✅ **Menos puntos de falla:** No depende de librerías de terceros

**Trade-off:** No tiene drag-to-scroll ni controles interactivos. Si los necesitas, usa la versión 5-2 Swiper.