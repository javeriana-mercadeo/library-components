<div class="plan-estudio_carousel swiper">
  <div class="plan-estudio_wrapper subjects-swiper">
    <div class="plan-estudio_slides swiper-wrapper" role="list">
      <#if ITEM.getSiblings()?has_content>
        <#list ITEM.getSiblings() as cur_ITEM>
          <div class="plan-estudio_slide swiper-slide" role="listitem">
            <div class="plan-estudio_card">
              <div class="plan-estudio_card-header">
                <span class="plan-estudio_badge plan-estudio_badge--primary">
                  <#if (cur_ITEM.YEAR.getData())??>
                    ${cur_ITEM.YEAR.getData()}
                  </#if>
                </span>
              </div>
              <h3 class="title title-lg title-bold plan-estudio_semester-title">
                <#if (cur_ITEM.SEMESTER.getData())??>
                  ${cur_ITEM.SEMESTER.getData()}
                </#if>
              </h3>
              <ul class="plan-estudio_subjects">
                <#if cur_ITEM.SUBJECTS.getSiblings()?has_content>
                  <#list cur_ITEM.SUBJECTS.getSiblings() as cur_SUBJECT>
                    <li>
                      <i class="ph ph-check" aria-hidden="true"></i>
                      <#if (cur_SUBJECT.getData())??>
                        ${cur_SUBJECT.getData()}
                      </#if>
                    </li>
                  </#list>
                </#if>
              </ul>
              <#if (cur_ITEM.CREDITS.getData())?? && (cur_ITEM.CREDITS.getData()?number> 0)>
                <div class="plan-estudio_credits">
                  <strong>
                    ${cur_ITEM.CREDITS.getData()}
                  </strong>
                  Créditos
                </div>
              </#if>
            </div>
          </div>
        </#list>
      </#if>
    </div>
    <div class="swiper-pagination plan-estudio_pagination" role="tablist" aria-label="Control de páginas del carrusel"></div>
    <button class="swiper-slide-button plan-estudio_prev" aria-label="Ir al slide anterior" type="button">
      <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
    </button>
    <button class="swiper-slide-button plan-estudio_next" aria-label="Ir al siguiente slide" type="button">
      <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
    </button>
  </div>
</div>