# Instrucciones de Implementación del Formulario

Este documento contiene las instrucciones para implementar correctamente el formulario de inscripción.

## Estructura de Archivos

El formulario está compuesto por tres archivos principales:

1. `index.html` - Estructura del formulario
2. `style.css` - Estilos del formulario
3. `script.js` - Lógica y validación del formulario

Además, se requieren los siguientes archivos JSON para el funcionamiento correcto:

1. `json/ubicaciones.json` - Contiene los países, departamentos y ciudades
2. `json/codigos_pais.json` - Contiene los prefijos telefónicos internacionales
3. `json/programas.json` - Contiene las facultades y programas académicos
4. `json/periodos.json` - Contiene los periodos de inscripción

## Pasos para la Implementación

### 1. Crear estructura de carpetas

```
formulario-inscripcion/
├── index.html
├── style.css
├── script.js
└── json/
    ├── ubicaciones.json
    ├── codigos_pais.json
    ├── programas.json
    └── periodos.json
```

### 2. Verificar referencias a archivos externos

Asegúrate de que las referencias a los archivos CSS y JavaScript en el HTML sean correctas:

```html
<link rel="stylesheet" href="style.css" />
<script src="script.js"></script>
```

### 3. Verificar la conexión a Font Awesome

El formulario utiliza iconos de Font Awesome. Verifica que la siguiente línea esté presente en el HTML:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
```

### 4. Configurar URL de destino

En el archivo `script.js`, verifica la configuración de las URL de destino:

```javascript
const CONFIG = {
  // URLs de destino
  DESTINATION_URL: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
  URL_THANK_YOU: 'https://cloud.cx.javeriana.edu.co/EVENTOS_TKY'
  // ...
}
```

Modifica estas URL según las necesidades de tu implementación.

## Mejoras Implementadas

El código ha sido mejorado con las siguientes características:

1. **Datos de respaldo (fallback)**: Si los archivos JSON no están disponibles, el formulario utilizará datos predeterminados para permitir
   su funcionamiento básico.

2. **Mejora en la validación**: Se ha mejorado la validación de campos y el manejo de errores.

3. **Notificaciones mejoradas**: Se agregó un sistema de notificaciones para informar al usuario sobre el estado del formulario.

4. **Mejor manejo de errores**: El código ahora verifica la existencia de elementos del DOM antes de manipularlos, evitando errores en
   consola.

5. **Estilos adicionales**: Se agregaron nuevos estilos para mejorar la experiencia del usuario, incluyendo mejoras para dispositivos
   móviles.

## Solución de Problemas Comunes

### El formulario no carga los datos

1. Verifica que los archivos JSON estén en la carpeta correcta (`json/`).
2. Revisa las rutas en la configuración de `script.js`.
3. Verifica la consola del navegador para identificar errores de carga.

### Los campos no se validan correctamente

1. Asegúrate de que los IDs de los campos en el HTML coincidan con los definidos en la constante `INPUTS` del archivo `script.js`.
2. Verifica que los elementos de error (con IDs como `first_name_error`) existan en el HTML.

### El formulario no se envía

1. Verifica la URL de destino en la configuración.
2. Asegúrate de que todos los campos requeridos estén definidos correctamente.
3. Revisa la consola del navegador para ver si hay errores al momento del envío.

## Notas Importantes

- El formulario utiliza `localStorage` para cachear los datos JSON y mejorar el rendimiento. Esto se puede desactivar si es necesario.
- La validación se realiza en tiempo real para mejorar la experiencia del usuario.
- El formulario está diseñado para ser responsivo, adaptándose a diferentes tamaños de pantalla.
