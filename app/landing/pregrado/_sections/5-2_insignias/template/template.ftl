<div
  class="swiper insignias-swiper"
  role="region"
  aria-label="Carrusel de reconocimientos académicos">
  <div class="swiper-wrapper">
    <#if ITEM.getSiblings()?has_content>
      <#list ITEM.getSiblings() as cur_ITEM>
        <div class="swiper-slide">
          <div class="slide-content">
            <div class="slide-content__image-wrapper">
              <#if (cur_ITEM.image.getData())?? && cur_ITEM.image.getData() != "">
                <img
                  src="${cur_ITEM.image.getData()}"
                  alt="${cur_ITEM.image.getAttribute("alt")}"
                  data-fileentryid="${cur_ITEM.image.getAttribute("fileEntryId")}"
                  loading="lazy"
                  class="slide-content__image" />
              </#if>
            </div>
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
  <div class="swiper-pagination"></div>
</div>
