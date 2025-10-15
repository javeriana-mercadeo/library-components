<#-- =====================================================
  FRAGMENT: Wrapper principal del carrusel de insignias
  - Define la sección y contenedor
  - Título editable desde Liferay
  - Widget para incluir el template.ftl
===================================================== -->

<section id="section-five-swiper" data-component="insignias-swiper" class="insignias-section">
  <div class="container insignias-container">
    <#-- =====================================================
      TÍTULO: Editable desde Liferay
      - data-lfr-editable-id: ID único para edición
      - data-lfr-editable-type: Tipo de contenido editable
      - aria-label: Accesibilidad
    ===================================================== -->
    <h2
      aria-label="Reconocimientos académicos de la Universidad Javeriana"
      class="title title-lg title-bold insignias__title"
      data-lfr-editable-id="title-insignias-swiper"
      data-lfr-editable-type="text">
      Reconocimientos Académicos
    </h2>

    <#-- =====================================================
      WIDGET WEB CONTENT:
      - Aquí se incluye el contenido del template.ftl
      - El template genera la estructura Swiper con los datos
      - ID debe coincidir con la configuración del fragmento
    ===================================================== -->
    <lfr-widget-web-content id="widget1"></lfr-widget-web-content>
  </div>
</section>
