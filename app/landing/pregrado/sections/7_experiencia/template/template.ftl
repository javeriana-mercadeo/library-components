<#-- Preload de imágenes para performance - Todos los siblings -->
  <#if slides.getSiblings()?has_content>
    <#list slides.getSiblings() as cur_slides>
      <#if (cur_slides.image.image_for_image.getData())?? && cur_slides.image.image_for_image.getData() !="">
        <link rel="preload" as="image" href="${cur_slides.image.image_for_image.getData()}" />
      </#if>
      <#if (cur_slides.testimonial.image_for_testimonial.getData())?? && cur_slides.testimonial.image_for_testimonial.getData() !="">
        <link rel="preload" as="image" href="${cur_slides.testimonial.image_for_testimonial.getData()}" />
      </#if>
    </#list>
  </#if>
  <div class="experience-carousel__carousel swiper">
    <div class="experience-carousel__wrapper experience-swiper">
      <div class="experience-carousel__slides swiper-wrapper" role="list">
        <#-- Loop através de todos los siblings -->
          <#if slides.getSiblings()?has_content>
            <#list slides.getSiblings() as cur_slides>
              <#-- SLIDE DE IMAGEN -->
                <#if (cur_slides.image.image_for_image.getData())?? && cur_slides.image.image_for_image.getData() !="">
                  <div class="experience-carousel__slide swiper-slide" role="listitem">
                    <#if (cur_slides.image.link_for_image.getData())??>
                      <a href="${cur_slides.image.link_for_image.getData()}"
                        class="experience-carousel__card-link"
                        data-lfr-editable-id="experience-image-link-${cur_slides?index}"
                        data-lfr-editable-type="link">
                    </#if>
                    <div class="experience-carousel__image-card">
                      <img src="${cur_slides.image.image_for_image.getData()}"
                        alt="${cur_slides.image.image_for_image.getAttribute("alt")}"
                        class="experience-carousel__image"
                        data-fileentryid="${cur_slides.image.image_for_image.getAttribute("fileEntryId")}"
                        data-lfr-editable-id="experience-image-${cur_slides?index}"
                        data-lfr-editable-type="image" />
                    </div>
                    <#if (cur_slides.image.link_for_image.getData())??>
                      </a>
                    </#if>
                  </div>
                </#if>
                <#-- SLIDE DE TESTIMONIO -->
                  <#if (cur_slides.testimonial.text.getData())?? || (cur_slides.testimonial.name.getData())??>
                    <div class="experience-carousel__slide swiper-slide" role="listitem">
                      <div class="experience-carousel__testimonial-card">
                        <#-- Texto del testimonio -->
                          <#if (cur_slides.testimonial.text.getData())??>
                            <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-text"
                              data-lfr-editable-id="experience-testimonial-text-${cur_slides?index}"
                              data-lfr-editable-type="rich-text">
                              ${cur_slides.testimonial.text.getData()}
                            </p>
                          </#if>
                          <div class="experience-carousel__testimonial-user">
                            <#-- Avatar -->
                              <div class="experience-carousel__testimonial-avatar">
                                <#if (cur_slides.testimonial.image_for_testimonial.getData())?? && cur_slides.testimonial.image_for_testimonial.getData() !="">
                                  <img alt="${cur_slides.testimonial.image_for_testimonial.getAttribute("alt")}"
                                    data-fileentryid="${cur_slides.testimonial.image_for_testimonial.getAttribute("fileEntryId")}"
                                    data-lfr-editable-id="experience-testimonial-image-${cur_slides?index}"
                                    data-lfr-editable-type="image"
                                    src="${cur_slides.testimonial.image_for_testimonial.getData()}" />
                                </#if>
                              </div>
                              <div class="experience-carousel__testimonial-info">
                                <#-- Nombre -->
                                  <#if (cur_slides.testimonial.name.getData())?? && cur_slides.testimonial.name.getData() !="">
                                    <h4 class="experience-carousel__testimonial-name"
                                      data-lfr-editable-id="experience-name-${cur_slides?index}"
                                      data-lfr-editable-type="text">
                                      ${cur_slides.testimonial.name.getData()}
                                    </h4>
                                  </#if>
                                  <#-- Trabajos (campo repetible) -->
                                    <#if cur_slides.testimonial.work.getSiblings()?has_content>
                                      <#list cur_slides.testimonial.work.getSiblings() as cur_work>
                                        <#if (cur_work.getData())??>
                                          <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-job"
                                            data-lfr-editable-id="experience-work-${cur_slides?index}-${cur_work?index}"
                                            data-lfr-editable-type="text">
                                            ${cur_work.getData()}
                                          </p>
                                        </#if>
                                      </#list>
                                    </#if>
                              </div>
                              <#-- Enlace LinkedIn -->
                                <#if (cur_slides.testimonial.link_for_testimonial.getData())??>
                                  <a href="${cur_slides.testimonial.link_for_testimonial.getData()}"
                                    class="experience-carousel__testimonial-linkedin"
                                    data-lfr-editable-id="experience-linkedin-${cur_slides?index}"
                                    data-lfr-editable-type="link">
                                    <i class="ph ph-linkedin-logo"></i>
                                  </a>
                                </#if>
                          </div>
                      </div>
                    </div>
                  </#if>
                  <#-- SLIDE DE VIDEO -->
                    <#if (cur_slides.video.id_video.getData())?? || (cur_slides.video.link_for_video.getData())??>
                      <div class="experience-carousel__slide swiper-slide" role="listitem">
                        <#if (cur_slides.video.link_for_video.getData())??>
                          <a href="${cur_slides.video.link_for_video.getData()}"
                            class="experience-carousel__card-link"
                            data-lfr-editable-id="experience-video-link-${cur_slides?index}"
                            data-lfr-editable-type="link">
                        </#if>
                        <div class="experience-carousel__video-card">
                          <#if (cur_slides.video.id_video.getData())??>
                            <div class="experience-carousel__video-container"
                              data-video-id="${cur_slides.video.id_video.getData()}"
                              data-lfr-editable-id="experience-video-${cur_slides?index}"
                              data-lfr-editable-type="text"></div>
                          </#if>
                        </div>
                        <#if (cur_slides.video.link_for_video.getData())??>
                          </a>
                        </#if>
                      </div>
                    </#if>
            </#list>
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