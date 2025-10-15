# 📋 Configuración en Liferay DXP - Carrusel de Insignias Swiper

## 🎯 Guía de Implementación Completa

Esta guía explica paso a paso cómo configurar el carrusel de insignias en Liferay DXP.

---

## 📦 Requisitos Previos

1. ✅ Liferay DXP 7.4+ instalado
2. ✅ Acceso administrativo al portal
3. ✅ Swiper.js cargado globalmente (incluido en el tema o como recurso)
4. ✅ Archivos CSS y JS del componente cargados

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
   - Nombre: `Reconocimientos Académicos Swiper`

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
     - **Name:** `Template Carrusel Insignias Swiper`
     - **Structure:** Seleccionar "Reconocimientos Académicos Swiper"
     - **Language:** FreeMarker (FTL)

3. **Copiar el contenido de `template.ftl`**
   - Abrir el archivo: `5-2_insignias/template/template.ftl`
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

2. **Crear Nueva Collection**
   - Click en "New"
   - Name: `Landing Pregrado Components`

3. **Crear Nuevo Fragment**
   - Click en la collection creada
   - Click en "New" → "Component"
   - Name: `Carrusel Insignias Swiper`

4. **Configurar Fragment**

   **HTML Tab:**
   ```html
   <section id="section-five-swiper" data-component="insignias-swiper" class="insignias-section">
     <div class="container insignias-container">
       <h2
         aria-label="Reconocimientos académicos de la Universidad Javeriana"
         class="title title-lg title-bold insignias__title"
         data-lfr-editable-id="title-insignias-swiper"
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
   /* El script principal (script.js) debe estar cargado globalmente */
   /* Este espacio se puede usar para inicializaciones específicas */
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
   - **Structure:** Seleccionar "Reconocimientos Académicos Swiper"
   - **Template:** Seleccionar "Template Carrusel Insignias Swiper"

3. **Agregar Items de Reconocimientos**

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
   - **Title:** `Reconocimientos Académicos - Pregrado`
   - Click en "Publish"

---

## 🌐 Paso 5: Agregar a una Página

### **Opción A: Usando Fragment**

1. **Editar Página**
   - Navegar a la página donde quieres el carrusel
   - Click en "Edit" (ícono de lápiz)

2. **Agregar Fragment**
   - En el panel lateral, buscar "Carrusel Insignias Swiper"
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
   - Seleccionar "Reconocimientos Académicos - Pregrado"
   - Guardar

4. **Publicar Página**

---

## 🎨 Paso 6: Cargar Recursos (CSS/JS)

### **CSS (styles.scss compilado)**

**Ubicación recomendada:**
```
/o/puj-landing-pregrado/css/insignias-swiper.css
```

**Incluir en el tema o mediante Application Display Template:**
```html
<link rel="stylesheet" href="/o/puj-landing-pregrado/css/insignias-swiper.css">
```

### **JavaScript (script.js)**

**Ubicación recomendada:**
```
/o/puj-landing-pregrado/js/insignias-swiper.js
```

**Incluir DESPUÉS de Swiper.js:**
```html
<!-- Swiper.js (primero) -->
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">

<!-- Script del componente (después) -->
<script src="/o/puj-landing-pregrado/js/insignias-swiper.js"></script>
```

### **Swiper.js (Librería)**

**Opción 1: CDN (Recomendado para testing)**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

**Opción 2: Autohosted (Producción)**
- Descargar Swiper.js desde: https://swiperjs.com/get-started
- Subir a: `/o/puj-landing-pregrado/lib/swiper/`
- Incluir en el tema

---

## ✅ Paso 7: Verificar Funcionamiento

### **Checklist de Verificación:**

- [ ] El carrusel se muestra correctamente
- [ ] Las imágenes cargan sin errores
- [ ] El autoplay funciona (se mueve automáticamente)
- [ ] El drag funciona (puedes arrastrar con el mouse)
- [ ] Responsive: funciona en móvil (1-2 slides visibles)
- [ ] Responsive: funciona en tablet (3-4 slides visibles)
- [ ] Responsive: funciona en desktop (5 slides visibles)
- [ ] Los efectos hover funcionan (imágenes de gris a color)
- [ ] Los dots de paginación aparecen y funcionan
- [ ] La consola del navegador no muestra errores
- [ ] El título es editable desde el Page Builder
- [ ] Se pueden agregar/eliminar items desde Web Content

### **Debugging:**

**Si el carrusel no aparece:**
1. Verificar que Swiper.js esté cargado: `console.log(window.Swiper)`
2. Verificar que el script se ejecutó: buscar mensajes en consola
3. Verificar que el elemento existe: `document.querySelector('.insignias-swiper')`

**Si las imágenes no cargan:**
1. Verificar URLs en el Web Content
2. Verificar permisos de acceso a las imágenes
3. Revisar la consola del navegador por errores 404

**Si el autoplay no funciona:**
1. Verificar configuración en `script.js` (delay, disableOnInteraction)
2. Verificar que el usuario no tenga `prefers-reduced-motion` activado

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

### **Personalizar Velocidad del Autoplay**

Editar en `script.js` (línea ~46):
```javascript
autoplay: {
  delay: 2500,  // Cambiar a 3000 para 3 segundos
  disableOnInteraction: false
}
```

### **Cambiar Número de Slides Visibles**

Editar breakpoints en `script.js` (líneas ~57-78):
```javascript
breakpoints: {
  1200: {
    slidesPerView: 6,  // Cambiar de 5 a 6 para mostrar más
    spaceBetween: 30
  }
}
```

### **Deshabilitar Loop Infinito**

En `script.js` (línea ~38):
```javascript
loop: false,  // Cambiar a false
```

---

## 📚 Recursos Adicionales

- **Documentación Swiper.js:** https://swiperjs.com/swiper-api
- **Documentación Liferay Web Content:** https://learn.liferay.com/web/guest/w/dxp/content-authoring-and-management/web-content
- **Documentación Liferay Fragments:** https://learn.liferay.com/web/guest/w/dxp/site-building/creating-pages/page-fragments-and-widgets

---

## 🆘 Soporte

**Contacto:** Equipo de Desarrollo - Pontificia Universidad Javeriana
**Versión del componente:** 3.0.0
**Última actualización:** Enero 2025

---

## 📝 Notas Importantes

1. ⚠️ **NO duplicar manualmente los items** en el Web Content. Swiper.js maneja el loop infinito automáticamente.

2. ⚠️ Los nombres de los campos (`ITEM`, `image`, `description`) **deben ser exactamente como se indica** (case-sensitive).

3. ✅ Si necesitas agregar más reconocimientos, simplemente click en "Add Item" (ícono +) en el Web Content.

4. ✅ El componente respeta la preferencia `prefers-reduced-motion` del usuario desactivando el autoplay automáticamente.

5. ✅ Todos los cambios en el Web Content se reflejan inmediatamente sin necesidad de recompilar código.