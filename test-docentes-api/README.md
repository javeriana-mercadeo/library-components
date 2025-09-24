# Prueba de Concepto - Docentes API

Este es un ejemplo funcional de cómo implementar la sección de docentes consumiendo la API de investigadores de la Universidad Javeriana.

## Estructura del proyecto

- `index.html` - Página principal con la interfaz de prueba
- `styles.css` - Estilos CSS para la interfaz
- `script.js` - Lógica JavaScript para consumir la API
- `README.md` - Esta documentación

## Funcionalidades

### 1. Consumo de API

- Consume la API: `https://dti-pru.javeriana.edu.co/api-portal/investigadores?idProgramaAcademico={CODIGO}`
- Maneja estados de carga, error y datos vacíos
- Parsea la estructura de datos de la respuesta

### 2. Evento personalizado

- Escucha el evento `data_load-program` para obtener el código del programa
- Botón para simular el evento y probar la funcionalidad

### 3. Interfaz de usuario

- Carrusel responsive con Swiper.js
- Tarjetas de docentes con imagen, nombre, cargo y enlace al perfil
- Placeholder para imágenes faltantes
- Estados visuales para carga, error y datos vacíos

### 4. Debug y monitoreo

- Panel de debug que muestra logs en tiempo real
- Información detallada sobre eventos y respuestas de API

## Cómo usar

1. Abrir `index.html` en un navegador
2. Escribir un código de programa (ej: "ISIST") en el campo de texto
3. Hacer clic en "Cargar Docentes" o "Simular Evento"
4. Ver los resultados en el carrusel y el panel de debug

## Códigos de programa de ejemplo

- `ISIST` - Ingeniería de Sistemas (tiene datos)
- Otros códigos pueden no tener datos y mostrarán el estado vacío

## Estructura de datos de la API

La API devuelve un objeto con la siguiente estructura:

```json
{
  "investigadores": [
    {
      "emplid": "string",
      "uuid": "string",
      "foto": [{ "url": "string" }],
      "nombresApellidos": {
        "nombres": "string",
        "apellidos": "string"
      },
      "informacionAdicional": {
        "portalUrl": "string"
      },
      "asociacionesOrganizacionales": [
        {
          "cargo": {
            "descripcion": [
              {
                "idioma": "es_CO",
                "valor": "string"
              }
            ]
          }
        }
      ]
    }
  ]
}
```

## Integración con el proyecto principal

Para integrar esta funcionalidad en el proyecto principal:

1. Usar la sección `6-1_docentes` creada en `app/landing/pregrado/_sections/6-1_docentes/`
2. Asegurarse de que el evento `data_load-program` se dispare con el código correcto
3. La sección se actualizará automáticamente cuando reciba el evento
