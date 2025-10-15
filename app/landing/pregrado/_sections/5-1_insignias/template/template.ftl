<#-- =====================================================
  TEMPLATE: Carrusel de Insignias con CSS Animation
  Versión: 2.0 (ALT)
  Compatible con: Liferay DXP

  Requisitos en Liferay:
  - Web Content Structure con campo repetible "ITEM"
  - Subcampos: image (Image), description (Text)
  - NO requiere librerías externas (solo CSS)

  Estructura generada:
  .carousel-wrapper (fijo con fades)
    └── .carousel-scroll-container
        └── .carousel-track (animación CSS)
            └── .carousel-group × 3 (duplicados para loop infinito)
                └── .carousel-item (generado por loop FTL)
===================================================== -->

<div class="carousel-wrapper" role="region" aria-label="Carrusel de reconocimientos académicos">
  <div class="carousel-scroll-container">
    <div class="carousel-track">
      <#-- =====================================================
        LOOP DE GRUPOS DUPLICADOS:
        - Genera 3 grupos idénticos para loop infinito seamless
        - Cada grupo contiene todos los items de reconocimientos
        - Solo el primer grupo es visible para screen readers
      ===================================================== -->
      <#assign groupCount = 3>
      <#list 0..<groupCount as groupIndex>
        <div class="carousel-group" aria-hidden="${(groupIndex > 0)?string('true', 'false')}">
          <#-- =====================================================
            LOOP FTL: Itera sobre items repetibles
            - Verifica que existan items (ITEM.getSiblings())
            - Genera un carousel-item por cada reconocimiento
            - Este loop se ejecuta 3 veces (una por cada grupo)
          ===================================================== -->
          <#if ITEM.getSiblings()?has_content>
            <#list ITEM.getSiblings() as cur_ITEM>
              <div class="carousel-item">
                <#-- Wrapper de imagen -->
                <div class="carousel-item__image-wrapper">
                  <#-- =====================================================
                    IMAGEN: Verifica que exista y tenga datos
                    Atributos:
                    - src: URL de la imagen
                    - alt: Texto alternativo (accesibilidad)
                    - data-fileentryid: ID del archivo en Liferay
                    - loading="lazy": Carga diferida
                    - class: Para estilos CSS
                  ===================================================== -->
                  <#if (cur_ITEM.image.getData())?? && cur_ITEM.image.getData() != "">
                    <img
                      src="${cur_ITEM.image.getData()}"
                      alt="${cur_ITEM.image.getAttribute("alt")}"
                      data-fileentryid="${cur_ITEM.image.getAttribute("fileEntryId")}"
                      loading="lazy"
                      class="carousel-item__image" />
                  </#if>
                </div>

                <#-- =====================================================
                  DESCRIPCIÓN: Texto descriptivo del reconocimiento
                  - Verifica que exista el campo
                  - Se renderiza directamente (puede contener HTML)
                ===================================================== -->
                <p class="carousel-item__description">
                  <#if (cur_ITEM.description.getData())??>
                    ${cur_ITEM.description.getData()}
                  </#if>
                </p>
              </div>
            </#list>
          </#if>
        </div>
      </#list>
    </div>
  </div>
</div>

<#-- =====================================================
  NOTAS DE IMPLEMENTACIÓN:

  1. ESTRUCTURA WEB CONTENT EN LIFERAY:
     {
       "name": "Reconocimientos Académicos ALT",
       "fields": [
         {
           "name": "ITEM",
           "type": "fieldset",
           "repeatable": true,
           "nestedFields": [
             {
               "name": "image",
               "type": "ddm-image",
               "label": "Imagen del Reconocimiento"
             },
             {
               "name": "description",
               "type": "text",
               "label": "Descripción"
             }
           ]
         }
       ]
     }

  2. ANIMACIÓN CSS:
     - Definida en styles.scss como @keyframes scroll-infinite
     - NO requiere JavaScript para funcionar
     - Pausa automática en hover con animation-play-state
     - Duración por defecto: 40 segundos

  3. LOOP INFINITO:
     - Se duplican 3 grupos completos de items
     - Animación traslada -33.333% (1/3 del ancho total)
     - Cuando termina, vuelve al inicio sin saltos visibles

  4. ESTILOS:
     - Definidos en styles.scss
     - Efectos: grayscale hover, gradientes laterales
     - Variables CSS del sistema de temas
     - Fades laterales posicionados absolute (no se mueven)

  5. ACCESIBILIDAD:
     - role="region" y aria-label en contenedor
     - aria-hidden="true" en grupos duplicados (2 y 3)
     - Soporte prefers-reduced-motion (en CSS)

  6. DIFERENCIAS VS 5-2_insignias (Swiper):
     - NO usa librería externa (Swiper.js)
     - Duplicación manual en template (3 grupos)
     - Animación 100% CSS (más liviana)
     - Sin controles de navegación o paginación
     - Ideal para casos simples sin interacción

  7. PERFORMANCE:
     - will-change: transform en carousel-track
     - GPU acceleration con translateX
     - Lazy loading en imágenes
===================================================== -->