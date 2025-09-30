<div class="plan-estudio__tabs-content">
  <!-- TAB PANEL JORNADA DIURNA -->
  <div
    class="plan-estudio__tab-panel"
    id="diurna-panel"
    role="tabpanel"
    aria-labelledby="diurna-tab"
    aria-hidden="false">
    <div class="plan-estudio_jornada-content">
      <a
        data-dmpa-element-id="btn"
        class="btn btn-primary btn-bordered plan-estudio_download-btn"
        aria-disabled="false"
        href="#diurna"
        data-senna-off="true"
        target="_blank"
        rel="noopener noreferrer"
        data-lfr-editable-id="btn-diurna"
        data-lfr-editable-type="link">
        <span class="btn-text">
          Descargar Plan de estudios - Jornada Diurna
        </span>
        <span class="btn-icon btn-icon-end">
          <i class="ph ph-download" aria-hidden="true"></i>
        </span>
      </a>

      <div class="plan-estudio_carousel swiper">
        <div class="plan-estudio_wrapper subjects-swiper">
          <div class="plan-estudio_slides swiper-wrapper" role="list">

            <!-- ITERACIÓN SEMESTRES JORNADA DIURNA -->
            <#if DAYTIMESHIFT.getSiblings()?has_content>
              <#list DAYTIMESHIFT.getSiblings() as cur_DAYTIMESHIFT>
                <div class="plan-estudio_slide swiper-slide" role="listitem">
                  <div class="plan-estudio_card">
                    <div class="plan-estudio_card-header">
                      <span class="plan-estudio_badge plan-estudio_badge">
                        <#if (cur_DAYTIMESHIFT.DAY_YEAR.getData())??>
                          ${cur_DAYTIMESHIFT.DAY_YEAR.getData()}
                        </#if>
                      </span>
                    </div>

                    <h2 class="title title-lg title-bold plan-estudio_semester-title">
                      <#if (cur_DAYTIMESHIFT.DAY_SEMESTER.getData())??>
                        ${cur_DAYTIMESHIFT.DAY_SEMESTER.getData()}
                      </#if>
                    </h2>

                    <ul class="plan-estudio_subjects">
                      <#if cur_DAYTIMESHIFT.DAY_SUBJECTS.getSiblings()?has_content>
                        <#list cur_DAYTIMESHIFT.DAY_SUBJECTS.getSiblings() as cur_DAYTIMESHIFT_DAY_SUBJECTS>
                          <li>
                            <i class="ph ph-check" aria-hidden="true"></i>
                            <#if (cur_DAYTIMESHIFT_DAY_SUBJECTS.getData())??>
                              ${cur_DAYTIMESHIFT_DAY_SUBJECTS.getData()}
                            </#if>
                          </li>
                        </#list>
                      </#if>
                    </ul>

                    <#if (cur_DAYTIMESHIFT.DAY_CREDITS.getData())??>
                      <div class="plan-estudio_credits">
                        <strong>${cur_DAYTIMESHIFT.DAY_CREDITS.getData()}</strong>
                      </div>
                    </#if>
                  </div>
                </div>
              </#list>
            </#if>

          </div>

          <div
            class="swiper-pagination plan-estudio_pagination"
            role="tablist"
            aria-label="Control de páginas del carrusel"></div>
          <button
            class="swiper-slide-button plan-estudio_prev"
            aria-label="Ir al slide anterior"
            type="button">
            <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
          </button>
          <button
            class="swiper-slide-button plan-estudio_next"
            aria-label="Ir al siguiente slide"
            type="button">
            <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB PANEL JORNADA NOCTURNA -->
  <div
    class="plan-estudio__tab-panel hidden"
    id="nocturna-panel"
    role="tabpanel"
    aria-labelledby="nocturna-tab"
    aria-hidden="true">
    <div class="plan-estudio_jornada-content">
      <a
        data-dmpa-element-id="btn"
        class="btn btn-primary btn-bordered plan-estudio_download-btn"
        aria-disabled="false"
        href="#nocturna"
        data-senna-off="true"
        target="_blank"
        rel="noopener noreferrer"
        data-lfr-editable-id="btn-nocturna"
        data-lfr-editable-type="link">
        <span class="btn-text">
          Descargar Plan de estudios - Jornada Nocturna
        </span>
        <span class="btn-icon btn-icon-end">
          <i class="ph ph-download" aria-hidden="true"></i>
        </span>
      </a>

      <div class="plan-estudio_carousel swiper">
        <div class="plan-estudio_wrapper subjects-swiper">
          <div class="plan-estudio_slides swiper-wrapper" role="list">

            <!-- ITERACIÓN SEMESTRES JORNADA NOCTURNA -->
            <#if NIGHTSHIFT.getSiblings()?has_content>
              <#list NIGHTSHIFT.getSiblings() as cur_NIGHTSHIFT>
                <div class="plan-estudio_slide swiper-slide" role="listitem">
                  <div class="plan-estudio_card">
                    <div class="plan-estudio_card-header">
                      <span class="plan-estudio_badge plan-estudio_badge">
                        <#if (cur_NIGHTSHIFT.NIGHT_YEAR.getData())??>
                          ${cur_NIGHTSHIFT.NIGHT_YEAR.getData()}
                        </#if>
                      </span>
                    </div>

                    <h2 class="title title-lg title-bold plan-estudio_semester-title">
                      <#if (cur_NIGHTSHIFT.NIGHT_SEMESTER.getData())??>
                        ${cur_NIGHTSHIFT.NIGHT_SEMESTER.getData()}
                      </#if>
                    </h2>

                    <ul class="plan-estudio_subjects">
                      <#if cur_NIGHTSHIFT.NIGHT_SUBJECTS.getSiblings()?has_content>
                        <#list cur_NIGHTSHIFT.NIGHT_SUBJECTS.getSiblings() as cur_NIGHTSHIFT_NIGHT_SUBJECTS>
                          <li>
                            <i class="ph ph-check" aria-hidden="true"></i>
                            <#if (cur_NIGHTSHIFT_NIGHT_SUBJECTS.getData())??>
                              ${cur_NIGHTSHIFT_NIGHT_SUBJECTS.getData()}
                            </#if>
                          </li>
                        </#list>
                      </#if>
                    </ul>

                    <#if (cur_NIGHTSHIFT.NIGHT_CREDITS.getData())??>
                      <div class="plan-estudio_credits">
                        <strong>${cur_NIGHTSHIFT.NIGHT_CREDITS.getData()}</strong>
                      </div>
                    </#if>
                  </div>
                </div>
              </#list>
            </#if>

          </div>

          <div
            class="swiper-pagination plan-estudio_pagination"
            role="tablist"
            aria-label="Control de páginas del carrusel"></div>
          <button
            class="swiper-slide-button plan-estudio_prev"
            aria-label="Ir al slide anterior"
            type="button">
            <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
          </button>
          <button
            class="swiper-slide-button plan-estudio_next"
            aria-label="Ir al siguiente slide"
            type="button">
            <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
