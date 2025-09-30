<!-- Container principal -->
<#if slides.getSiblings()?has_content>
    <div class="container main-container" id="proyectos-container">
        <div>
            <!-- Carousel container -->
            <div class="carousel-container swiper"
                id="carousel-container"
                data-slides-count="${slides.getSiblings()?size}"
                data-max-cards="4">
                <!-- Wrapper de slides -->
                <div class="swiper-wrapper" id="slides-wrapper">
                    <#list slides.getSiblings() as cur_slides>
                        <#assign slideIndex=cur_slides?index>
                            <!-- Slide ${slideIndex} -->
                            <div class="carousel-slide swiper-slide"
                                data-slide-index="${slideIndex}"
                                data-slide-type="universidad"
                                onclick="window.openCarouselModal && window.openCarouselModal(${slideIndex})">
                                <#if (cur_slides.imagen_principal.getData())?? && cur_slides.imagen_principal.getData() !="">
                                    <div class="slide-image"
                                        style="background-image: url('${cur_slides.imagen_principal.getData()}');">
                                        <img alt="${cur_slides.imagen_principal.getAttribute("alt")}"
                                            data-fileentryid="${cur_slides.imagen_principal.getAttribute("fileEntryId")}"
                                            src="${cur_slides.imagen_principal.getData()}"
                                            style="display: none;" />
                                    </div>
                                    <div class="slide-content">
                                        <#if (cur_slides.titulo.getData())??>
                                            <lfr-editable id="slide-title-${slideIndex}"
                                                type="rich-text"
                                                class="slide-title">
                                                ${cur_slides.titulo.getData()}
                                            </lfr-editable>
                                        </#if>
                                        <#if (cur_slides.descripcion_corta.getData())??>
                                            <lfr-editable id="slide-desc-${slideIndex}"
                                                type="rich-text"
                                                class="paragraph paragraph-neutral paragraph-md description">
                                                ${cur_slides.descripcion_corta.getData()}
                                            </lfr-editable>
                                        </#if>
                                    </div>
                                </#if>
                            </div>
                    </#list>
                </div> <!-- /swiper-wrapper -->
                <!-- Controles de navegación -->
                <div class="carousel-controls" id="carousel-controls">
                    <button class="carousel-control prev"
                        id="carousel-prev"
                        type="button"
                        aria-label="Slide anterior"
                        onclick="window.carouselPrevSlide && window.carouselPrevSlide()">
                        <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
                    </button>
                    <button class="carousel-control next"
                        id="carousel-next"
                        type="button"
                        aria-label="Slide siguiente"
                        onclick="window.carouselNextSlide && window.carouselNextSlide()">
                        <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
                    </button>
                </div>
                <!-- Indicadores -->
                <div class="carousel-indicators" id="carousel-indicators">
                    <#list slides.getSiblings() as cur_slides>
                        <#assign slideIndex=cur_slides?index>
                            <button class="indicator <#if slideIndex == 0>active</#if>"
                                data-indicator-index="${slideIndex}"
                                type="button"></button>
                    </#list>
                </div>
            </div> <!-- /carousel-container -->
        </div>
    </div>
    <!-- MODAL PARA PROYECTOS CON CAMPOS EDITABLES -->
    <div class="modal-backdrop"
        id="modal-backdrop-carousel"
        style="display: none;"
        onclick="window.closeCarouselModal && window.closeCarouselModal(event)">
        <div class="modal-content" onclick="event.stopPropagation()">
            <button
                onclick="window.closeCarouselModal && window.closeCarouselModal()"
                aria-label="Cerrar modal"
                data-dmpa-element-id="btn"
                class="btn btn-primary btn-light btn-icon-only"
                aria-disabled="false"
                type="button">
                <span class="btn-icon btn-icon-only"><i class="ph ph-x"></i></span>
            </button>
            <div class="modal-body">
                <div class="project-details">
                    <div class="project-layout">
                        <!-- Información del proyecto con campos editables -->
                        <div class="project-info">
                            <!-- Datos editables para cada slide -->
                            <#list slides.getSiblings() as cur_slides>
                                <#assign slideIndex=cur_slides?index>
                                    <div class="project-data" data-project="${slideIndex}" style="display: none;">
                                        <#if (cur_slides.titulo_modal.getData())??>
                                            <lfr-editable id="project-title-${slideIndex}" type="rich-text" class="project-title">
                                                ${cur_slides.titulo_modal.getData()}
                                            </lfr-editable>
                                        </#if>
                                        <div class="info-row">
                                            <strong>Fecha</strong>
                                            <#if (cur_slides.fecha_proyecto.getData())??>
                                                <lfr-editable id="project-date-${slideIndex}" type="text">
                                                    ${cur_slides.fecha_proyecto.getData()}
                                                </lfr-editable>
                                            </#if>
                                        </div>
                                        <div class="info-row">
                                            <strong>Responsable</strong>
                                            <#if (cur_slides.responsable.getData())??>
                                                <lfr-editable id="project-responsible-${slideIndex}" type="text">
                                                    ${cur_slides.responsable.getData()}
                                                </lfr-editable>
                                            </#if>
                                        </div>
                                        <!-- MÚLTIPLES VIDEOS - CORREGIDO -->
                                        <div class="info-row">
                                            <strong>Videos YouTube</strong>
                                            <#if cur_slides.galeria_videos_youtube.getSiblings()?has_content>
                                                <#list cur_slides.galeria_videos_youtube.getSiblings() as cur_video>
                                                    <#assign videoIndex=cur_video?index>
                                                        <#if (cur_video.getData())??>
                                                            <lfr-editable id="project-video-${slideIndex}-${videoIndex}" type="text">
                                                                ${cur_video.getData()}
                                                            </lfr-editable>
                                                        </#if>
                                                </#list>
                                                <#else>
                                                    <lfr-editable id="project-video-${slideIndex}-0" type="text">
                                                        https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s
                                                    </lfr-editable>
                                            </#if>
                                        </div>
                                        <div class="info-row">
                                            <strong>Descripción</strong>
                                            <#if (cur_slides.descripcion_completa.getData())??>
                                                <lfr-editable id="project-description-${slideIndex}" type="rich-text" class="project-description">
                                                    ${cur_slides.descripcion_completa.getData()}
                                                </lfr-editable>
                                            </#if>
                                        </div>
                                        <div class="info-row">
                                            <strong>Galería de Imágenes</strong>
                                            <#if cur_slides.galeria_imagenes.getSiblings()?has_content>
                                                <#assign galleryUrls=[]>
                                                    <#list cur_slides.galeria_imagenes.getSiblings() as cur_image>
                                                        <#if (cur_image.getData())?? && cur_image.getData() !="">
                                                            <#assign galleryUrls=galleryUrls + [cur_image.getData()]>
                                                        </#if>
                                                    </#list>
                                                    <#if galleryUrls?size gt 0>
                                                        <lfr-editable id="project-gallery-${slideIndex}" type="text">
                                                            ${galleryUrls?join(",")}
                                                        </lfr-editable>
                                                    </#if>
                                            </#if>
                                        </div>
                                        <!-- Campo de orden si existe -->
                                        <#if (cur_slides.orden.getData())??>
                                            <div class="info-row" style="display: none;">
                                                <strong>Orden</strong>
                                                <lfr-editable id="project-order-${slideIndex}" type="text">
                                                    ${cur_slides.orden.getData()}
                                                </lfr-editable>
                                            </div>
                                        </#if>
                                    </div>
                            </#list>
                            <!-- Contenedor dinámico donde se muestra la información -->
                            <div id="dynamic-project-info">
                                <h2 id="modal-project-title" class="project-title">
                                    <!-- Título dinámico del proyecto -->
                                </h2>
                                <div class="info-row">
                                    <strong>Fecha</strong>
                                    <span id="modal-project-date">
                                        <!-- Fecha dinámica -->
                                    </span>
                                </div>
                                <div class="info-row">
                                    <strong>Responsable</strong>
                                    <span id="modal-project-responsible">
                                        <!-- Responsable dinámico -->
                                    </span>
                                </div>
                                <div class="info-row">
                                    <strong>Descripción</strong>
                                    <p id="modal-project-description" class="project-description">
                                        <!-- Descripción dinámica -->
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- Galería multimedia con múltiples videos -->
                        <div class="project-gallery" id="modal-project-gallery">
                            <!-- Contenedor de videos múltiples -->
                            <div id="modal-project-videos" class="videos-container">
                                <!-- Los videos se insertarán dinámicamente aquí -->
                            </div>
                            <!-- Contenedor de imágenes -->
                            <div id="modal-project-gallery-items" class="gallery-items">
                                <!-- Las imágenes se insertarán dinámicamente -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</#if>