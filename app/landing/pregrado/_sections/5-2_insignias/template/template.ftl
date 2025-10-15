<#-- =====================================================
  TEMPLATE: Carrusel de Insignias con Swiper.js
  Versión: 3.0
  Compatible con: Liferay DXP

  Requisitos en Liferay:
  - Web Content Structure con campo repetible "ITEM"
  - Subcampos: image (Image), description (Text)
  - Swiper.js cargado globalmente

  Estructura generada:
  .swiper.insignias-swiper
    └── .swiper-wrapper
        └── .swiper-slide (generado por loop)
            └── .slide-content
                ├── .slide-content__image-wrapper
                │   └── img.slide-content__image
                └── p.slide-content__description
===================================================== -->

<div class="swiper insignias-swiper" role="region" aria-label="Carrusel de reconocimientos académicos">
  <div class="swiper-wrapper">
    <#-- =====================================================
      LOOP FTL: Itera sobre items repetibles
      - Verifica que existan items (ITEM.getSiblings())
      - Genera un swiper-slide por cada item
      - Solo renderiza 1 grupo (Swiper hace el loop infinito)
    ===================================================== -->
    <#if ITEM.getSiblings()?has_content>
      <#list ITEM.getSiblings() as cur_ITEM>
        <div class="swiper-slide">
          <div class="slide-content">
            <#-- Wrapper de imagen -->
            <div class="slide-content__image-wrapper">
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
                  class="slide-content__image" />
              </#if>
            </div>

            <#-- =====================================================
              DESCRIPCIÓN: Texto descriptivo del reconocimiento
              - Verifica que exista el campo
              - Se renderiza directamente (puede contener HTML)
            ===================================================== -->
            <p class="slide-content__description">
              <#if (cur_ITEM.description.getData())??>
                ${cur_ITEM.description.getData()}
              </#if>
            </p>
          </div>
        </div>
      </#list>
    </#if>
  </div>

  <#-- =====================================================
    PAGINACIÓN: Dots de navegación de Swiper
    - Swiper.js la inicializa automáticamente
    - Configurada en script.js con clickable: true
  ===================================================== -->
  <div class="swiper-pagination"></div>
</div>

<#-- =====================================================
  NOTAS DE IMPLEMENTACIÓN:

  1. ESTRUCTURA WEB CONTENT EN LIFERAY:
     {
       "name": "Reconocimientos Académicos",
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

  2. SWIPER.JS:
     - Script.js detecta automáticamente .insignias-swiper
     - Configuración: loop infinito, autoplay, responsive
     - Breakpoints: 320px, 576px, 768px, 992px, 1200px

  3. ESTILOS:
     - Definidos en styles.scss
     - Efectos: grayscale hover, gradientes laterales
     - Variables CSS del sistema de temas

  4. ACCESIBILIDAD:
     - role="region" y aria-label en contenedor
     - Módulo a11y de Swiper configurado en script.js
     - Soporte prefers-reduced-motion

  5. NO DUPLICAR MANUALMENTE:
     - Swiper.js maneja el loop infinito
     - Solo se renderiza 1 grupo de items
     - loopAdditionalSlides=6 en config de Swiper
===================================================== -->