<#-- Preload de imágenes para performance -->
  <#if (ITEM.image.image_for_image.getData())?? && ITEM.image.image_for_image.getData() !="">
    <link rel="preload" as="image" href="${ITEM.image.image_for_image.getData()}" />
  </#if>
  <#if (ITEM.testimonial.image_for_testimonial.getData())?? && ITEM.testimonial.image_for_testimonial.getData() !="">
    <link rel="preload" as="image" href="${ITEM.testimonial.image_for_testimonial.getData()}" />
  </#if>
  <div class="experience-carousel__carousel swiper">
    <div class="experience-carousel__wrapper experience-swiper">
      <div class="experience-carousel__slides swiper-wrapper" role="list">
        <#-- SLIDE DE IMAGEN -->
          <#if (ITEM.image.image_for_image.getData())?? && ITEM.image.image_for_image.getData() !="">
            <div class="experience-carousel__slide swiper-slide" role="listitem">
              <#if (ITEM.image.link_for_image.getData())??>
                <a href="${ITEM.image.link_for_image.getData()}"
                  class="experience-carousel__card-link"
                  data-lfr-editable-id="experience-image-link-0"
                  data-lfr-editable-type="link">
              </#if>
              <div class="experience-carousel__image-card">
                <img src="${ITEM.image.image_for_image.getData()}"
                  alt="${ITEM.image.image_for_image.getAttribute("alt")}"
                  class="experience-carousel__image"
                  data-fileentryid="${ITEM.image.image_for_image.getAttribute("fileEntryId")}"
                  data-lfr-editable-id="experience-image-0"
                  data-lfr-editable-type="image" />
              </div>
              <#if (ITEM.image.link_for_image.getData())??>
                </a>
              </#if>
            </div>
          </#if>
          <#-- SLIDE DE TESTIMONIO -->
            <#if (ITEM.testimonial.text.getData())?? || (ITEM.testimonial.name.data)??>
              <div class="experience-carousel__slide swiper-slide" role="listitem">
                <div class="experience-carousel__testimonial-card">
                  <#-- Texto del testimonio -->
                    <#if (ITEM.testimonial.text.getData())??>
                      <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-text">
                        ${ITEM.testimonial.text.getData()}
                      </p>
                    </#if>
                    <div class="experience-carousel__testimonial-user">
                      <#-- Avatar -->
                        <div class="experience-carousel__testimonial-avatar">
                          <#if (ITEM.testimonial.image_for_testimonial.getData())?? && ITEM.testimonial.image_for_testimonial.getData() !="">
                            <img alt="${ITEM.testimonial.image_for_testimonial.getAttribute("alt")}"
                              data-fileentryid="${ITEM.testimonial.image_for_testimonial.getAttribute("fileEntryId")}"
                              src="${ITEM.testimonial.image_for_testimonial.getData()}" />
                          </#if>
                        </div>
                        <div class="experience-carousel__testimonial-info">
                          <#-- Nombre -->
                            <#if (ITEM.testimonial.name.data)?? && ITEM.testimonial.name.data !="">
                              <h4 class="experience-carousel__testimonial-name"
                                data-lfr-editable-id="experience-name-1"
                                data-lfr-editable-type="text">
                                ${ITEM.testimonial.name.data}
                              </h4>
                            </#if>
                            <#-- Trabajos (campo repetible) -->
                              <#if ITEM.testimonial.work.getSiblings()?has_content>
                                <#list ITEM.testimonial.work.getSiblings() as cur_ITEM_testimonial_work>
                                  <#if (cur_ITEM_testimonial_work.getData())??>
                                    <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-job">
                                      ${cur_ITEM_testimonial_work.getData()}
                                    </p>
                                  </#if>
                                </#list>
                              </#if>
                        </div>
                        <#-- Enlace LinkedIn -->
                          <#if (ITEM.testimonial.link_for_testimonial.getData())??>
                            <a href="${ITEM.testimonial.link_for_testimonial.getData()}"
                              class="experience-carousel__testimonial-linkedin"
                              data-lfr-editable-id="experience-linkedin-1"
                              data-lfr-editable-type="link">
                              <i class="ph ph-linkedin-logo"></i>
                            </a>
                          </#if>
                    </div>
                </div>
              </div>
            </#if>
            <#-- SLIDE DE VIDEO -->
              <#if (ITEM.video.id_video.getData())?? || (ITEM.video.link_for_video.getData())??>
                <div class="experience-carousel__slide swiper-slide" role="listitem">
                  <#if (ITEM.video.link_for_video.getData())??>
                    <a href="${ITEM.video.link_for_video.getData()}"
                      class="experience-carousel__card-link"
                      data-lfr-editable-id="experience-video-link-2"
                      data-lfr-editable-type="link">
                  </#if>
                  <div class="experience-carousel__video-card">
                    <#if (ITEM.video.id_video.getData())??>
                      <div class="experience-carousel__video-container"
                        data-video-id="${ITEM.video.id_video.getData()}"></div>
                    </#if>
                  </div>
                  <#if (ITEM.video.link_for_video.getData())??>
                    </a>
                  </#if>
                </div>
              </#if>
      </div>
      <#-- Controles del carrusel -->
        <div class="swiper-pagination experience-carousel__pagination"
          role="tablist"
          aria-label="Control de páginas del carrusel"></div>
        <button class="swiper-slide-button experience-carousel__prev"
          aria-label="Ir al slide anterior"
          type="button">
          <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
        </button>
        <button class="swiper-slide-button experience-carousel__next"
          aria-label="Ir al siguiente slide"
          type="button">
          <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
        </button>
    </div>
  </div>