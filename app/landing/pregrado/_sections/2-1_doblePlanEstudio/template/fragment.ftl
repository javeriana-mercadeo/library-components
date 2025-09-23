<section class="plan-estudio_container">
  <div class="container plan-estudio" id="doblePlanEstudio">
    <div class="plan-estudio_header">
      <h2
        class="title title-2xl title-center title-semibold"
        data-lfr-editable-id="title-doblePlanEstudio-title"
        data-lfr-editable-type="text">
        Plan de Estudios por Modalidad
      </h2>
      <lfr-editable
        id="doblePlanEstudio-description"
        type="rich-text"
        class="paragraph paragraph-neutral paragraph-md paragraph-center plan-estudio_subtitle">
        Conoce el plan de estudios según la modalidad de tu preferencia: diurna o nocturna.
      </lfr-editable>
    </div>
    <div class="plan-estudio__tabs-container">
      <div class="plan-estudio__tabs-nav" role="tablist" aria-label="Modalidades del programa">
        <div class="plan-estudio__tabs-wrapper">
          <button
            class="plan-estudio__tab-button active"
            id="diurna-tab"
            data-tabs-target="#diurna-panel"
            type="button"
            role="tab"
            aria-controls="diurna-panel"
            aria-selected="true"
            tabindex="0">
            <i class="ph ph-sun" aria-hidden="true"></i>
            <span>Jornada Diurna</span>
          </button>
          <button
            class="plan-estudio__tab-button"
            id="nocturna-tab"
            data-tabs-target="#nocturna-panel"
            type="button"
            role="tab"
            aria-controls="nocturna-panel"
            aria-selected="false"
            tabindex="-1">
            <i class="ph ph-moon" aria-hidden="true"></i>
            <span>Jornada Nocturna</span>
          </button>
        </div>
      </div>
      <lfr-widget-web-content id="widget1"></lfr-widget-web-content>
    </div>
  </div>
</section>