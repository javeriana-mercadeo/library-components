<div class="expert-carousel_carousel swiper">
  <div class="expert-carousel_wrapper expert-swiper">
    <div class="expert-carousel_slides swiper-wrapper" role="list">
      <#if TITULOITEMFieldSet.getSiblings()?has_content>
        <#list TITULOITEMFieldSet.getSiblings() as cur_TITULOITEMFieldSet>
          <div class="expert-carousel_slide swiper-slide" role="listitem">
            <div class="expert-carousel_card">
              <div class="expert-carousel_card-header">
                <#if (cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.IMAGENITEM.getData())?? && cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.IMAGENITEM.getData() !="">
                  <img class="image expert-carousel_card-image" alt="${cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.IMAGENITEM.getAttribute("alt")}" data-fileentryid="${cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.IMAGENITEM.getAttribute("fileEntryId")}" src="${cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.IMAGENITEM.getData()}" />
                </#if>
              </div>
              <div class="expert-carousel_card-content">
                <h3 class="title title-neutral title-md title-bold expert-carousel_card-name">
                  <#if (cur_TITULOITEMFieldSet.TITULOITEM.getData())??>
                    ${cur_TITULOITEMFieldSet.TITULOITEM.getData()}
                  </#if>
                </h3>
                <p class="paragraph paragraph-neutral paragraph-sm expert-carousel_card-title">
                  <#if (cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.ENLACEITEM.getData())??>
                    ${cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.ENLACEITEM.getData()}
                  </#if>
                </p>
                <#if (cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.BOTONITEMFieldSet.BOTONITEMFieldSetFieldSet.LINKITEM.getData())??>
                  <a
                    class="btn btn-neutral btn-link expert-carousel_card-link"
                    aria-disabled="false"
                    href="${cur_TITULOITEMFieldSet.TITULOITEMFieldSetFieldSet.BOTONITEMFieldSet.BOTONITEMFieldSetFieldSet.LINKITEM.getData()}"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-senna-off="true">
                    <span class="btn-text">Ver Perfil</span>
                  </a>
                </#if>
              </div>
            </div>
          </div>
        </#list>
      </#if>
    </div>
    <button
      class="swiper-slide-button expert-carousel_prev"
      aria-label="Ir al slide anterior"
      type="button">
      <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
    </button>
    <button
      class="swiper-slide-button expert-carousel_next"
      aria-label="Ir al siguiente slide"
      type="button">
      <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
    </button>
  </div>
</div>