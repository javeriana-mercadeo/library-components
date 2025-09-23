<div class="experience-carousel__carousel swiper">
  <div class="experience-carousel__wrapper experience-swiper">
    <div class="experience-carousel__slides swiper-wrapper" role="list">
      <#if slides.getSiblings()?has_content>
        <#list slides.getSiblings() as cur_slides>
          <div class="experience-carousel__slide swiper-slide" role="listitem">
            
            <#-- CONTENIDO DINÁMICO SEGÚN TIPO -->
            <#if (cur_slides.type_item.getData())?? && cur_slides.type_item.getData()=="type_image">
              <#-- CONTENIDO IMAGEN -->
              <#if (cur_slides.image.image_link.getData())??>
                <a href="${cur_slides.image.image_link.getData()}"
                  target=""
                  class="experience-carousel__card-link">
              </#if>
              <div class="experience-carousel__image-card">
                <#if (cur_slides.image.image_image.getData())??>
                  <img src="${cur_slides.image.image_image.getData()}"
                    alt="${cur_slides.image.image_image.getAttribute("alt")}"
                    class="image image--no-zoom experience-carousel__image"
                    loading="lazy"
                    decoding="async" />
                </#if>
              </div>
              <#if (cur_slides.image.image_link.getData())??>
                </a>
              </#if>
              
            <#elseif (cur_slides.type_item.getData())?? && cur_slides.type_item.getData()=="type_testimonial">
              <#-- CONTENIDO TESTIMONIO -->
              <div class="experience-carousel__testimonial-card">
                <#if (cur_slides.testimonial.testimonial_text.getData())??>
                  <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-text">
                    ${cur_slides.testimonial.testimonial_text.getData()}
                  </p>
                </#if>
                <div class="experience-carousel__testimonial-user">
                  <div class="experience-carousel__testimonial-avatar">
                    <#if (cur_slides.testimonial.testimonial_image.getData())??>
                      <img alt="${cur_slides.testimonial.testimonial_image.getAttribute("alt")}"
                        class="image image--no-zoom"
                        src="${cur_slides.testimonial.testimonial_image.getData()}"
                        loading="lazy"
                        decoding="async" />
                    </#if>
                  </div>
                  <div class="experience-carousel__testimonial-info">
                    <#if (cur_slides.testimonial.testimonial_name.getData())??>
                      <h4 class="experience-carousel__testimonial-name">
                        ${cur_slides.testimonial.testimonial_name.getData()}
                      </h4>
                    </#if>
                    <#if (cur_slides.testimonial.testimonial_work.getData())??>
                      <p class="paragraph paragraph-neutral paragraph-md experience-carousel__testimonial-job">
                        ${cur_slides.testimonial.testimonial_work.getData()}
                      </p>
                    </#if>
                  </div>
                  <#if (cur_slides.testimonial.testimonial_link.getData())??>
                    <a href="${cur_slides.testimonial.testimonial_link.getData()}"
                      class="experience-carousel__testimonial-linkedin"
                      target="_blank"
                      rel="noopener noreferrer">
                      <span class="icon icon--neutral icon--xs">
                        <i class="ph ph-linkedin-logo" aria-hidden="true"></i>
                      </span>
                    </a>
                  </#if>
                </div>
              </div>
              
            <#elseif (cur_slides.type_item.getData())?? && cur_slides.type_item.getData()=="type_media">
              <#-- CONTENIDO VIDEO -->
              <#if (cur_slides.grupo_media.media_id.getData())??>
                <#assign videoOrientation = "vertical">
                <#if (cur_slides.grupo_media.media_orientation.getData())??>
                  <#assign videoOrientation = cur_slides.grupo_media.media_orientation.getData()>
                </#if>
                <div class="experience-carousel__video-card experience-carousel__video-card--${videoOrientation}">
                  <div class="experience-carousel__video-container"
                    data-video-id="${cur_slides.grupo_media.media_id.getData()}"
                    data-video-orientation="${videoOrientation}"
                    data-is-first-video="false"
                    style="aspect-ratio:<#if videoOrientation == 'horizontal'>16/9<#else>9/16</#if>">
                  </div>
                </div>
              </#if>
            </#if>
            
          </div>
        </#list>
      </#if>
    </div>
    
    <div class="swiper-pagination experience-carousel__pagination"
      role="tablist"
      aria-label="Control de páginas del carrusel">
    </div>
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