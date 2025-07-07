  <div class="experience-carousel__carousel swiper">
    <div class="experience-carousel__wrapper experience-swiper">
      <div class="experience-carousel__slides swiper-wrapper" role="list">
        <!-- Loop através de todos los siblings -->
        <#if slides.getSiblings()?has_content>
          <#list slides.getSiblings() as cur_slides>
            <!-- SLIDE DE TESTIMONIO -->
            <#if (cur_slides.type_item.getData())?? && cur_slides.type_item.getData()=="type_testimonial">
              <div class="experience-carousel__slide swiper-slide" role="listitem">
                <div class="experience-carousel__testimonial-card">
                  <!-- Texto del testimonio -->
                  <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-text">
                    <#if (cur_slides.testimonial.testimonial_text.getData())??>
                      ${cur_slides.testimonial.testimonial_text.getData()}
                    </#if>
                  </p>
                  <div class="experience-carousel__testimonial-user">
                    <!-- Avatar -->
                    <div class="experience-carousel__testimonial-avatar">
                      <#if (cur_slides.testimonial.testimonial_image.getData())?? && cur_slides.testimonial.testimonial_image.getData() !="">
                        <img alt="${cur_slides.testimonial.testimonial_image.getAttribute("alt")}" data-fileentryid="${cur_slides.testimonial.testimonial_image.getAttribute("fileEntryId")}" src="${cur_slides.testimonial.testimonial_image.getData()}" />
                      </#if>
                    </div>
                    <div class="experience-carousel__testimonial-info">
                      <!-- Nombre -->
                      <h4 class="experience-carousel__testimonial-name">
                        <#if (cur_slides.testimonial.testimonial_name.getData())??>
                          ${cur_slides.testimonial.testimonial_name.getData()}
                        </#if>
                      </h4>
                      <!-- Trabajo -->
                      <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-job">
                        <#if (cur_slides.testimonial.testimonial_work.getData())??>
                          ${cur_slides.testimonial.testimonial_work.getData()}
                        </#if>
                      </p>
                    </div>
                    <!-- Enlace LinkedIn -->
                    <#if (cur_slides.testimonial.testimonial_link.getData())??>
                      <a href="${cur_slides.testimonial.testimonial_link.getData()}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="experience-carousel__testimonial-linkedin">
                        <#if (cur_slides.testimonial.testimonial_icon.getData())??>
                          ${cur_slides.testimonial.testimonial_icon.getData()}
                          <#else>
                            <i class="ph ph-linkedin-logo"></i>
                        </#if>
                      </a>
                    </#if>
                  </div>
                </div>
              </div>
            </#if>
            <!-- SLIDE DE IMAGEN -->
            <#if (cur_slides.type_item.getData())?? && cur_slides.type_item.getData()=="type_image">
              <div class="experience-carousel__slide swiper-slide" role="listitem">
                <#if (cur_slides.image.image_link.getData())??>
                  <a href="${cur_slides.image.image_link.getData()}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="experience-carousel__card-link">
                    <div class="experience-carousel__image-card">
                      <#if (cur_slides.image.image_image.getData())?? && cur_slides.image.image_image.getData() !="">
                        <img class="experience-carousel__image" alt="${cur_slides.image.image_image.getAttribute("alt")}" data-fileentryid="${cur_slides.image.image_image.getAttribute("fileEntryId")}" src="${cur_slides.image.image_image.getData()}" />
                      </#if>
                    </div>
                  </a>
                </#if>
              </div>
            </#if>
            <!-- SLIDE DE VIDEO -->
            <#if (cur_slides.type_item.getData())?? && cur_slides.type_item.getData()=="type_media">
              <div class="experience-carousel__slide swiper-slide" role="listitem">
                <#if (cur_slides.grupo_media.media_id.getData())??>
                  <div
                    class="experience-carousel__card-link">
                    <div class="experience-carousel__video-card">
                      <div class="experience-carousel__video-container"
                        data-video-id="${cur_slides.grupo_media.media_id.getData()}"
                        data-video-options="">
                      </div>
                    </div>
                  </div>
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