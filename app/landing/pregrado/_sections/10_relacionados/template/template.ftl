<div class="related-programs__carousel-container">
  <div class="related-programs__carousel swiper related-programs-swiper">
    <button
      class="swiper-slide-button related-programs__prev related-programs-prev"
      aria-label="Ver programas anteriores"
      type="button">
      <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
    </button>
    <div class="related-programs__slides swiper-wrapper card-list" role="list">
      <#if related_program_single_card.getSiblings()?has_content>
        <#list related_program_single_card.getSiblings() as cur_related_program_single_card>
          <div class="related-programs__slide swiper-slide card-item" role="listitem">
            <div class="related-programs__program-card">
              <div class="related-programs__image-container">
                <img
                  src="<#if (cur_related_program_single_card.related_program_thumb.getData())??>
            ${cur_related_program_single_card.related_program_thumb.getData()}
            </#if>"
                  alt=""
                  class="related-programs__image"
                  data-lfr-editable-id="program-image-${cur_related_program_single_card?index}"
                  data-lfr-editable-type="image"
                  loading="lazy" />
                <div class="related-programs__overlay"></div>
                <div class="related-programs__content">
                  <h3
                    class="related-programs__name"
                    data-lfr-editable-id="program-name-${cur_related_program_single_card?index}"
                    data-lfr-editable-type="text">
                    <#if (cur_related_program_single_card.related_program_title.getData())??>
                      Estudiar ${cur_related_program_single_card.related_program_title.getData()}
                    </#if>
                  </h3>
                  <p class="paragraph paragraph-neutral paragraph-md related-programs__faculty">
                    <#if (cur_related_program_single_card.related_program_faculty.getData())??>
                      ${cur_related_program_single_card.related_program_faculty.getData()}
                    </#if>
                  </p>
                  <a
                    data-senna-off="true"
                    href="${cur_related_program_single_card.related_program_link.getFriendlyUrl()}"
                    class="related-programs__link"
                    data-lfr-editable-id="program-link-${cur_related_program_single_card?index}"
                    data-lfr-editable-type="link"
                    aria-label="Ver detalles del programa">
                    Ver Programa
                    <i class="ph ph-arrow-up-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </#list>
      </#if>
    </div>
    <button
      class="swiper-slide-button related-programs__next related-programs-next"
      aria-label="Ver más programas"
      type="button">
      <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
    </button>
    <div
      class="swiper-pagination related-programs__pagination related-programs-pagination"
      role="tablist"
      aria-label="Control de páginas del carrusel"></div>
  </div>
</div>