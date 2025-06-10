<div class="expert-carousel_carousel swiper">
  <div class="expert-carousel_wrapper expert-swiper">
    <div class="expert-carousel_slides swiper-wrapper" role="list">
      <#if ITEM.getSiblings()?has_content>
        <#list ITEM.getSiblings() as cur_ITEM>
          <div class="expert-carousel_slide swiper-slide" role="listitem">
            <div class="expert-carousel_card">
              <div class="expert-carousel_card-header">
                <#if (cur_ITEM.image.getData())?? && cur_ITEM.image.getData() !="">
                  <img class="image expert-carousel_card-image" alt="${cur_ITEM.image.getAttribute("alt")}" data-fileentryid="${cur_ITEM.image.getAttribute("fileEntryId")}" src="${cur_ITEM.image.getData()}" />
                </#if>
              </div>
              <div class="expert-carousel_card-content">
                <h3 class="title title-neutral title-md title-bold expert-carousel_card-name">
                  <#if (cur_ITEM.name.getData())??>
                    ${cur_ITEM.name.getData()}
                  </#if>
                </h3>
                <p class="paragraph paragraph-neutral paragraph-sm expert-carousel_card-title">
                  <#if (cur_ITEM.tax.getData())??>
                    ${cur_ITEM.tax.getData()}
                  </#if>
                </p>
                <#if (cur_ITEM.link.getData())??>
                  <a
                    class="btn btn-neutral btn-light btn-sm expert-carousel_card-link"
                    aria-disabled="false"
                    href="${cur_ITEM.link.getData()}"
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