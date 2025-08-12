<#-- Preload de imágenes y videos para performance -->
<#-- Preloads para videos de YouTube -->
<#if opc_multimedia_videoYt.getSiblings()?has_content>
  <#list opc_multimedia_videoYt.getSiblings() as cur_opc_multimedia_videoYt>
    <#-- Preload para thumbnails de video YouTube -->
    <#if (cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData())?? && cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData() != "">
      <link rel="preload" as="image" href="https://img.youtube.com/vi/${cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData()}/hqdefault.jpg" />
    </#if>
  </#list>
</#if>

<#-- Preloads para imágenes -->
<#if opc_multimedia_img.getSiblings()?has_content>
  <#list opc_multimedia_img.getSiblings() as cur_opc_multimedia_img>
    <#-- Preload para imágenes principales -->
    <#if (cur_opc_multimedia_img.opc_multimedia_imgUrl.getData())?? && cur_opc_multimedia_img.opc_multimedia_imgUrl.getData() != "">
      <link rel="preload" as="image" href="${cur_opc_multimedia_img.opc_multimedia_imgUrl.getData()}" />
    </#if>
  </#list>
</#if>

<div class="multimedia-slider_slider-container">
  <!-- Slider principal -->
  <div class="multimedia-slider_main-swiper swiper">
    <div class="multimedia-slider_main-wrapper swiper-wrapper" role="list">
      <#-- SLIDES DE IMAGEN -->
      <#if opc_multimedia_img.getSiblings()?has_content>
        <#list opc_multimedia_img.getSiblings() as cur_opc_multimedia_img>
          <#if (cur_opc_multimedia_img.opc_multimedia_imgUrl.getData())?? && cur_opc_multimedia_img.opc_multimedia_imgUrl.getData() != "">
            <div class="multimedia-slider_main-slide swiper-slide" role="listitem">
              <img 
                src="${cur_opc_multimedia_img.opc_multimedia_imgUrl.getData()}" 
                alt="${(cur_opc_multimedia_img.opc_multimedia_imgTitle.getData())!''}"
                data-lfr-editable-id="multimedia-main-image-${cur_opc_multimedia_img?index}"
                data-lfr-editable-type="image"
              />
              <!-- Overlay con texto para imágenes -->
              <div class="multimedia-slider_content-text-overlay">
                <div class="multimedia-slider_overlay-content">
                  <#if (cur_opc_multimedia_img.opc_multimedia_imgTitle.getData())??>
                    <h3 class="multimedia-slider_overlay-title"
                        data-lfr-editable-id="multimedia-image-title-${cur_opc_multimedia_img?index}"
                        data-lfr-editable-type="text">
                      ${cur_opc_multimedia_img.opc_multimedia_imgTitle.getData()}
                    </h3>
                  </#if>
                  <#if (cur_opc_multimedia_img.opc_multimedia_imgParagraph.getData())??>
                    <p class="multimedia-slider_overlay-text"
                       data-lfr-editable-id="multimedia-image-overlay-text-${cur_opc_multimedia_img?index}"
                       data-lfr-editable-type="rich-text">
                      ${cur_opc_multimedia_img.opc_multimedia_imgParagraph.getData()}
                    </p>
                  </#if>
                </div>
              </div>
            </div>
          </#if>
        </#list>
      </#if>

      <#-- SLIDES DE VIDEO YOUTUBE -->
      <#if opc_multimedia_videoYt.getSiblings()?has_content>
        <#list opc_multimedia_videoYt.getSiblings() as cur_opc_multimedia_videoYt>
          <#if (cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData())?? && cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData() != "">
            <div class="multimedia-slider_main-slide swiper-slide" role="listitem">
              <!-- Thumbnail del video como fallback -->
              <img
                src="https://img.youtube.com/vi/${cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData()}/hqdefault.jpg"
                alt="${(cur_opc_multimedia_videoYt.opc_multimedia_video_titleSlide.getData())!''}"
                style="z-index: 1; position: absolute; width: 100%; height: 100%; object-fit: cover;"
              />
              <!-- Iframe de YouTube con autoplay optimizado -->
              <iframe
                src="https://www.youtube.com/embed/${cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData()}?autoplay=1&mute=1&loop=1&playlist=${cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData()}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&enablejsapi=0"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen
                loading="lazy"
                title="${(cur_opc_multimedia_videoYt.opc_multimedia_video_titleSlide.getData())!''}"
                style="display: none; z-index: 2;"
                data-lfr-editable-id="multimedia-video-id-${cur_opc_multimedia_videoYt?index}"
                data-lfr-editable-type="text"
              ></iframe>
              <!-- Overlay con texto para videos -->
              <div class="multimedia-slider_content-text-overlay">
                <div class="multimedia-slider_overlay-content">
                  <#if (cur_opc_multimedia_videoYt.opc_multimedia_video_titleSlide.getData())??>
                    <h3 class="multimedia-slider_overlay-title"
                        data-lfr-editable-id="multimedia-video-title-${cur_opc_multimedia_videoYt?index}"
                        data-lfr-editable-type="text">
                      ${cur_opc_multimedia_videoYt.opc_multimedia_video_titleSlide.getData()}
                    </h3>
                  </#if>
                  <#if (cur_opc_multimedia_videoYt.opc_multimedia_video_paragraph.getData())??>
                    <p class="multimedia-slider_overlay-text"
                       data-lfr-editable-id="multimedia-video-overlay-text-${cur_opc_multimedia_videoYt?index}"
                       data-lfr-editable-type="rich-text">
                      ${cur_opc_multimedia_videoYt.opc_multimedia_video_paragraph.getData()}
                    </p>
                  </#if>
                </div>
              </div>
            </div>
          </#if>
        </#list>
      </#if>
    </div>
  </div>

  <!-- Slider de miniaturas -->
  <div class="multimedia-slider_thumbs-swiper swiper">
    <div class="multimedia-slider_thumbs-wrapper swiper-wrapper" role="list">
      <#-- THUMBNAILS DE IMAGEN -->
      <#if opc_multimedia_img.getSiblings()?has_content>
        <#list opc_multimedia_img.getSiblings() as cur_opc_multimedia_img>
          <#if (cur_opc_multimedia_img.opc_multimedia_imgUrl.getData())?? && cur_opc_multimedia_img.opc_multimedia_imgUrl.getData() != "">
            <div class="multimedia-slider_thumb-slide swiper-slide" role="listitem">
              <img 
                src="${cur_opc_multimedia_img.opc_multimedia_imgUrl.getData()}" 
                alt="${(cur_opc_multimedia_img.opc_multimedia_imgTitle.getData())!''}"
                data-lfr-editable-id="multimedia-thumb-image-${cur_opc_multimedia_img?index}"
                data-lfr-editable-type="image"
              />
            </div>
          </#if>
        </#list>
      </#if>

      <#-- THUMBNAILS DE VIDEO YOUTUBE -->
      <#if opc_multimedia_videoYt.getSiblings()?has_content>
        <#list opc_multimedia_videoYt.getSiblings() as cur_opc_multimedia_videoYt>
          <#if (cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData())?? && cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData() != "">
            <div class="multimedia-slider_thumb-slide swiper-slide" role="listitem">
              <img 
                src="https://img.youtube.com/vi/${cur_opc_multimedia_videoYt.opc_multimedia_videoId.getData()}/hqdefault.jpg" 
                alt="${(cur_opc_multimedia_videoYt.opc_multimedia_video_titleSlide.getData())!''}"
              />
              <div class="multimedia-slider_video-indicator">VIDEO</div>
            </div>
          </#if>
        </#list>
      </#if>
    </div>

    <!-- Botones de navegación para thumbnails -->
    <button class="swiper-slide-button multimedia-slider_thumbs-prev" aria-label="Ir al slide anterior" type="button">
      <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
    </button>
    <button class="swiper-slide-button multimedia-slider_thumbs-next" aria-label="Ir al siguiente slide" type="button">
      <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
    </button>
  </div>
</div>