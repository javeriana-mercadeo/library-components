<div class="container lab-slider-container">
    <div class="lab-slider">
        <h2
            class="title title-lg lab-slider-title"
            data-lfr-editable-id="title-laboratorios-main-title"
            data-lfr-editable-type="rich-text">
            Laboratorios
        </h2>
        <div class="lab-slider-content">
            <#if container_sliders.getSiblings()?has_content>
                <#list container_sliders.getSiblings() as cur_container_sliders>
                    <div class="lab-slider-text">
                        <h2
                            class="title title-lg subtitle-lab"
                            <#if (cur_container_sliders.tutilo_lab.getData())??>
                            ${cur_container_sliders.tutilo_lab.getData()}
            </#if>
            </h2>
            <lfr-editable
                class="paragraph paragraph-neutral paragraph-md paragraph-lab">
                <#if (cur_container_sliders.descripcion_lab.getData())??>
                    ${cur_container_sliders.descripcion_lab.getData()}
                </#if>
            </lfr-editable>
            <div class="lab-slider-navigation">
                <button aria-label="Previous image" class="nav-button prev" type="button">
                    <span><i class="ph ph-arrow-circle-left"></i></span>
                </button>
                <button aria-label="Next image" class="nav-button next" type="button">
                    <span><i class="ph ph-arrow-circle-right"></i></span>
                </button>
            </div>
        </div>
        <div class="lab-slider-images">
            <div class="image-container">
                <#if (cur_container_sliders.Img_card_2.getData())?? && cur_container_sliders.Img_card_2.getData() !="">
                    <img class="lab-image" alt="${cur_container_sliders.Img_card_2.getAttribute("alt")}" data-fileentryid="${cur_container_sliders.Img_card_2.getAttribute("fileEntryId")}" src="${cur_container_sliders.Img_card_2.getData()}" />
                </#if>
                <div class="image-label">
                    <#if (cur_container_sliders.titulo_img_card2.getData())??>
                        ${cur_container_sliders.titulo_img_card2.getData()}
                    </#if>
                </div>
            </div>
            <div class="image-container desktop-only">
                <#if (cur_container_sliders.img_card3.getData())?? && cur_container_sliders.img_card3.getData() !="">
                    <img class="lab-image" alt="${cur_container_sliders.img_card3.getAttribute("alt")}" data-fileentryid="${cur_container_sliders.img_card3.getAttribute("fileEntryId")}" src="${cur_container_sliders.img_card3.getData()}" />
                </#if>
                <div class="image-label">
                    <#if (cur_container_sliders.titulo_card3.getData())??>
                        ${cur_container_sliders.titulo_card3.getData()}
                    </#if>
                </div>
            </div>
        </div>
        </#list>
        </#if>
    </div>
</div>
</div>