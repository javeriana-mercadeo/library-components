<<<<<<< HEAD
 <div class="lab-slider-content">
     <#if container_sliders.getSiblings()?has_content>
         <#list container_sliders.getSiblings() as cur_container_sliders>
             <div class="lab-slider-text">
                 <h2
                     data-testid="slide-title"
                     class="title title-lg subtitle-lab"
                     data-lfr-editable-id="title-laboratorios-slide-title"
                     data-lfr-editable-type="rich-text">
                     <#if (cur_container_sliders.tutilo_lab.getData())??>
                         ${cur_container_sliders.tutilo_lab.getData()}
                     </#if>
                 </h2>
                 <lfr-editable
                     id="laboratorios-slide-description"
                     type="rich-text"
                     data-testid="slide-description"
                     class="paragraph paragraph-neutral paragraph-md paragraph-lab">
                     <#if (cur_container_sliders.descripcion_lab.getData())??>
                         ${cur_container_sliders.descripcion_lab.getData()}
                     </#if>
                 </lfr-editable>
                 <div class="lab-slider-navigation">
                     <button
                         aria-label="Imagen anterior"
                         class="nav-button prev"
                         type="button"
                         data-action="prev"
                         data-testid="prev-button">
                         <span><i class="ph ph-arrow-circle-left"></i></span>
                     </button>
                     <button
                         aria-label="Siguiente imagen"
                         class="nav-button next"
                         type="button"
                         data-action="next"
                         data-testid="next-button">
                         <span><i class="ph ph-arrow-circle-right"></i></span>
                     </button>
                 </div>
             </div>
             <div class="lab-slider-images">
                 <div class="image-container">
                     <#if (cur_container_sliders.Img_card_2.getData())?? && cur_container_sliders.Img_card_2.getData() !="">
                         <img class="lab-image" alt="${cur_container_sliders.Img_card_2.getAttribute("alt")}" data-fileentryid="${cur_container_sliders.Img_card_2.getAttribute("fileEntryId")}" src="${cur_container_sliders.Img_card_2.getData()}" />
                     </#if>
                     <div class="image-label" data-testid="first-label">
                         <#if (cur_container_sliders.img_card3.getData())?? && cur_container_sliders.img_card3.getData() !="">
                             <img alt="${cur_container_sliders.img_card3.getAttribute("alt")}" data-fileentryid="${cur_container_sliders.img_card3.getAttribute("fileEntryId")}" src="${cur_container_sliders.img_card3.getData()}" />
                         </#if>
                         <#if (cur_container_sliders.titulo_img_card2.getData())??>
                             ${cur_container_sliders.titulo_img_card2.getData()}
                         </#if>
                     </div>
                 </div>
                 <div class="image-container desktop-only">
                     <#if (cur_container_sliders.img_card3.getData())?? && cur_container_sliders.img_card3.getData() !="">
                         <img class="lab-image" alt="${cur_container_sliders.img_card3.getAttribute("alt")}" data-fileentryid="${cur_container_sliders.img_card3.getAttribute("fileEntryId")}" src="${cur_container_sliders.img_card3.getData()}" />
                     </#if>
                     <div class="image-label" data-testid="second-label">
                         <#if (cur_container_sliders.titulo_card3.getData())??>
                             ${cur_container_sliders.titulo_card3.getData()}
                         </#if>
                     </div>
                 </div>
             </div>
         </#list>
     </#if>
 </div>
=======
<#assign allSlides=[]>
    <#if container_sliders.getSiblings()?has_content>
        <#list container_sliders.getSiblings() as cur_container_sliders>
            <#assign slideInfo={ "id" : "${cur_container_sliders_index + 1}" , "title" : (cur_container_sliders.tutilo_lab.getData())!"Laboratorio ${cur_container_sliders_index + 1}", "description" : (cur_container_sliders.descripcion_lab.getData())!"Descripción del laboratorio", "imageSrc" : (cur_container_sliders.Img_card_2.getData())!"", "imageAlt" : (cur_container_sliders.Img_card_2.getAttribute("alt"))!"", "imageLabel" : (cur_container_sliders.titulo_img_card2.getData())!"Lab ${cur_container_sliders_index + 1}", "secondImageSrc" : (cur_container_sliders.img_card3.getData())!"", "secondImageAlt" : (cur_container_sliders.img_card3.getAttribute("alt"))!"", "secondImageLabel" : (cur_container_sliders.titulo_card3.getData())!"Lab ${cur_container_sliders_index + 1} - Card 2"
                }>
                <#assign allSlides=allSlides + [slideInfo]>
        </#list>
    </#if>
    <#if allSlides?has_content>
        <#list allSlides as slide>
            <#if slide.imageSrc?has_content>
                <link rel="preload" as="image" href="${slide.imageSrc}" />
            </#if>
            <#if slide.secondImageSrc?has_content>
                <link rel="preload" as="image" href="${slide.secondImageSrc}" />
            </#if>
        </#list>
    </#if>
    <div class="container lab-slider-container">
        <div class="lab-slider">
            <div class="lab-slider-content">
                <#if allSlides?has_content>
                    <#assign firstSlide=allSlides[0]>
                        <#assign secondSlide=(allSlides?size> 1)?then(allSlides[1]
                            , allSlides[0]
                            )>
                            <div class="lab-slider-text">
                                <h2
                                    data-testid="slide-title"
                                    class="title title-lg subtitle-lab"
                                    data-lfr-editable-id="laboratorios-slide-title"
                                    data-lfr-editable-type="rich-text">
                                    ${firstSlide.title}
                                </h2>
                                <div
                                    data-testid="slide-description"
                                    class="paragraph paragraph-neutral paragraph-md paragraph-lab"
                                    data-lfr-editable-id="laboratorios-slide-description"
                                    data-lfr-editable-type="rich-text">
                                    ${firstSlide.description}
                                </div>
                                <div class="lab-slider-navigation">
                                    <button
                                        aria-label="Imagen anterior"
                                        class="nav-button prev"
                                        type="button"
                                        data-action="prev"
                                        data-testid="prev-button">
                                        <span><i class="ph ph-arrow-circle-left"></i></span>
                                    </button>
                                    <button
                                        aria-label="Siguiente imagen"
                                        class="nav-button next"
                                        type="button"
                                        data-action="next"
                                        data-testid="next-button">
                                        <span><i class="ph ph-arrow-circle-right"></i></span>
                                    </button>
                                </div>
                            </div>
                            <div class="lab-slider-images">
                                <div class="image-container">
                                    <#if firstSlide.imageSrc?has_content>
                                        <img
                                            class="lab-image"
                                            alt="${firstSlide.imageAlt}"
                                            data-testid="first-image"
                                            src="${firstSlide.imageSrc}" />
                                    </#if>
                                    <div class="image-label" data-testid="first-label">
                                        ${firstSlide.imageLabel}
                                    </div>
                                </div>
                                <div class="image-container desktop-only">
                                    <#if secondSlide.secondImageSrc?has_content>
                                        <img
                                            class="lab-image"
                                            alt="${secondSlide.secondImageAlt}"
                                            data-testid="second-image"
                                            src="${secondSlide.secondImageSrc}" />
                                        <#else>
                                            <#if firstSlide.secondImageSrc?has_content>
                                                <img
                                                    class="lab-image"
                                                    alt="${firstSlide.secondImageAlt}"
                                                    data-testid="second-image"
                                                    src="${firstSlide.secondImageSrc}" />
                                            </#if>
                                    </#if>
                                    <div class="image-label" data-testid="second-label">
                                        <#if secondSlide.secondImageSrc?has_content>
                                            ${secondSlide.secondImageLabel}
                                            <#else>
                                                ${firstSlide.secondImageLabel}
                                        </#if>
                                    </div>
                                </div>
                            </div>
                            <#else>
                                <div class="lab-slider-text">
                                    <h2 class="title title-lg subtitle-lab">
                                        No hay laboratorios configurados
                                    </h2>
                                    <div class="paragraph paragraph-neutral paragraph-md paragraph-lab">
                                        Por favor, agrega contenido a través del panel de administración.
                                    </div>
                                </div>
                </#if>
            </div>
        </div>
    </div>
    <#if allSlides?has_content>
        <script type="text/javascript">
        (function() {
            var liferaySlideData = [ <
                #list allSlides as slide > {
                    id: "${slide.id}",
                    title: "${slide.title?js_string}",
                    description: "${slide.description?js_string}",
                    imageSrc: "${slide.imageSrc?js_string}",
                    label: "${slide.imageLabel?js_string}",
                    secondImageSrc: "${slide.secondImageSrc?js_string}",
                    secondImageLabel: "${slide.secondImageLabel?js_string}"
                } <
                #if slide_has_next > , < /#if> <
                /#list>
            ];
            var transformedSlides = [];
            liferaySlideData.forEach(function(slide, index) {
                transformedSlides.push({
                    id: slide.id + '_main',
                    title: slide.title,
                    description: slide.description,
                    imageSrc: slide.imageSrc,
                    label: slide.label
                });
                if (slide.secondImageSrc) {
                    transformedSlides.push({
                        id: slide.id + '_secondary',
                        title: slide.title,
                        description: slide.description,
                        imageSrc: slide.secondImageSrc,
                        label: slide.secondImageLabel
                    });
                }
            });
            if (typeof window !== 'undefined') {
                window.liferayLabSlides = transformedSlides;
                if (window.labSliderInstance && typeof window.labSliderInstance.updateSlideData === 'function') {
                    window.labSliderInstance.updateSlideData(transformedSlides);
                }
                var attempts = 0;
                var maxAttempts = 10;

                function tryUpdateSlider() {
                    attempts++;
                    if (window.labSliderInstance && typeof window.labSliderInstance.updateSlideData === 'function') {
                        window.labSliderInstance.updateSlideData(transformedSlides);
                    } else if (attempts < maxAttempts) {
                        setTimeout(tryUpdateSlider, 500);
                    }
                }
                setTimeout(tryUpdateSlider, 100);
            }
        })();
        </script>
    </#if>
>>>>>>> 72bbb717d91b2eaa550a0412e9c178f56e6c66db
