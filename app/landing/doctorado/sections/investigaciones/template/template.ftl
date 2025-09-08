<!--$-->
<#-- ======================================== -->
<#-- GENERAR JSON DINÁMICO DESDE DATOS CMS -->
<#-- ======================================== -->
<#assign investigationsJSON = "[]">
<#if grad_investigationGroup.getSiblings()?has_content>
  <#assign investigationsJSON = "[">
  <#list grad_investigationGroup.getSiblings() as investigation>
    
    <#-- Procesar fecha con validación robusta -->
    <#assign dateData = getterUtil.getString(investigation.grad_investigationDate.getData())>
    <#assign yearString = "2024">
    <#if validator.isNotNull(dateData)>
      <#attempt>
        <#assign dateObj = dateUtil.parseDate("yyyy-MM-dd", dateData, locale)>
        <#assign yearString = dateUtil.getDate(dateObj, "yyyy", locale)>
      <#recover>
        <#assign yearString = "2024">
      </#attempt>
    </#if>
    
    <#-- Procesar imagen con fallback -->
    <#assign imageUrl = "https://via.placeholder.com/400x300">
    <#assign imageAlt = "Imagen investigación">
    <#if investigation.grad_investigationImg.getSiblings()?has_content>
      <#assign firstImage = investigation.grad_investigationImg.getSiblings()?first>
      <#if (firstImage.getData())?? && firstImage.getData() != "">
        <#assign imageUrl = firstImage.getData()>
        <#if firstImage.getAttribute("alt")??>
          <#assign imageAlt = firstImage.getAttribute("alt")>
        </#if>
      </#if>
    </#if>
    
    <#-- Procesar video YouTube (opcional) -->
    <#assign videoEmbedId = "">
    <#if investigation.grad_investigationYtId.getSiblings()?has_content>
      <#list investigation.grad_investigationYtId.getSiblings() as ytId>
        <#if ytId?index == 0 && (ytId.getData())??>
          <#assign videoEmbedId = ytId.getData()>
          <#break>
        </#if>
      </#list>
    </#if>
    
    <#-- Construir objeto JSON de la investigación -->
    <#assign investigationsJSON = investigationsJSON + '{'>
    <#assign investigationsJSON = investigationsJSON + '"id": ' + investigation?index + ','>
    <#assign investigationsJSON = investigationsJSON + '"year": "' + yearString + '",'>
    <#assign investigationsJSON = investigationsJSON + '"title": "' + (investigation.grad_investigationTitle.getData()!"")?json_string + '",'>
    <#assign investigationsJSON = investigationsJSON + '"description": "' + (investigation.grad_investigationDesc.getData()!"")?json_string + '",'>
    <#assign investigationsJSON = investigationsJSON + '"image": "' + imageUrl + '",'>
    <#assign investigationsJSON = investigationsJSON + '"alt": "' + imageAlt?json_string + '"'>
    
    <#-- Agregar videoEmbedId solo si existe -->
    <#if videoEmbedId != "">
      <#assign investigationsJSON = investigationsJSON + ',"videoEmbedId": "' + videoEmbedId + '"'>
    </#if>
    
    <#assign investigationsJSON = investigationsJSON + '}'>
    
    <#-- Agregar coma si no es el último elemento -->
    <#if investigation?has_next>
      <#assign investigationsJSON = investigationsJSON + ','>
    </#if>
    
  </#list>
  <#assign investigationsJSON = investigationsJSON + "]">
</#if>

<section class="investigations_container" data-component-id="investigaciones">
  <div
    class="container investigations"
    data-investigations-data='${investigationsJSON}'
    id="investigaciones">
    <h2
      class="title title-2xl title-center title-semibold investigations_main-title"
      data-lfr-editable-id="title-investigaciones-title"
      data-lfr-editable-type="text">
      Investigaciones
    </h2>
    <#if grad_investigationGroup.getSiblings()?has_content>
      <div class="investigations_layout">
        <#list grad_investigationGroup.getSiblings() as cur_grad_investigationGroup>
          <#if cur_grad_investigationGroup?index == 0>
            <!-- CARD PRINCIPAL -->
            <div class="investigations_fixed-column">
              <div class="investigations_main-card">
                <div
                  class="investigations_card investigations_card--main investigations_card"
                  role="button"
                  tabindex="0"
                  data-id="${cur_grad_investigationGroup?index}"
                  <#if cur_grad_investigationGroup.grad_investigationYtId.getSiblings()?has_content>
                    <#list cur_grad_investigationGroup.grad_investigationYtId.getSiblings() as cur_grad_investigationGroup_grad_investigationYtId>
                      <#if cur_grad_investigationGroup_grad_investigationYtId?index == 0 && (cur_grad_investigationGroup_grad_investigationYtId.getData())??>
                        data-video-embed-id="${cur_grad_investigationGroup_grad_investigationYtId.getData()}"
                      </#if>
                    </#list>
                  </#if>
                  aria-label="Ver detalles de la investigación: <#if (cur_grad_investigationGroup.grad_investigationTitle.getData())??>${cur_grad_investigationGroup.grad_investigationTitle.getData()}</#if>">
                  
                  <#if cur_grad_investigationGroup.grad_investigationImg.getSiblings()?has_content>
                    <#assign firstImage = cur_grad_investigationGroup.grad_investigationImg.getSiblings()?first>
                    <#if (firstImage.getData())?? && firstImage.getData() != "">
                      <img
                        loading="lazy"
                        src="${firstImage.getData()}"
                        alt="${firstImage.getAttribute("alt")}"
                        class="image image--no-zoom investigations_image investigations_image--main"
                        data-fileentryid="${firstImage.getAttribute("fileEntryId")}"
                        data-lfr-editable-id="image-image-investigaciones-${cur_grad_investigationGroup?index}"
                        data-lfr-editable-type="image" />
                    </#if>
                  </#if>
                  
                  <div class="investigations_content">
                    <span class="investigations_badge">
                      <#assign grad_investigationGroup_grad_investigationDate_Data = getterUtil.getString(cur_grad_investigationGroup.grad_investigationDate.getData())>
                      <#if validator.isNotNull(grad_investigationGroup_grad_investigationDate_Data)>
                        <#assign grad_invigationGroup_grad_investigationDate_DateObj = dateUtil.parseDate("yyyy-MM-dd", grad_investigationGroup_grad_investigationDate_Data, locale)>
                        ${dateUtil.getDate(grad_invigationGroup_grad_investigationDate_DateObj, "yyyy", locale)}
                      </#if>
                    </span>
                    <h3 class="title title-lg title-semibold investigations_title">
                      <#if (cur_grad_investigationGroup.grad_investigationTitle.getData())??>${cur_grad_investigationGroup.grad_investigationTitle.getData()}</#if>
                    </h3>
                    <p class="paragraph paragraph-neutral paragraph-md investigations_description">
                      <#if (cur_grad_investigationGroup.grad_investigationDesc.getData())??>${cur_grad_investigationGroup.grad_investigationDesc.getData()}</#if>
                      <span><i class="ph ph-arrow-square-in"></i></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- INICIO SWIPER PARA CARDS SECUNDARIAS -->
            <div class="investigations_slider-column">
              <div class="investigations_mask-container">
                <div class="investigations_wrapper investigations-swiper swiper">
                  <div class="investigations_slides swiper-wrapper" role="list">
          <#else>
            <!-- CARDS SECUNDARIAS -->
            <div
              class="investigations_slide investigations_slide--secondary swiper-slide"
              role="listitem">
              <div
                class="investigations_card investigations_card--secondary investigations_card"
                role="button"
                tabindex="0"
                data-id="${cur_grad_investigationGroup?index}"
                <#if cur_grad_investigationGroup.grad_investigationYtId.getSiblings()?has_content>
                  <#list cur_grad_investigationGroup.grad_investigationYtId.getSiblings() as cur_grad_investigationGroup_grad_investigationYtId>
                    <#if cur_grad_investigationGroup_grad_investigationYtId?index == 0 && (cur_grad_investigationGroup_grad_investigationYtId.getData())??>
                      data-video-embed-id="${cur_grad_investigationGroup_grad_investigationYtId.getData()}"
                    </#if>
                  </#list>
                </#if>
                aria-label="Ver detalles de la investigación: <#if (cur_grad_investigationGroup.grad_investigationTitle.getData())??>${cur_grad_investigationGroup.grad_investigationTitle.getData()}</#if>">
                
                <#if cur_grad_investigationGroup.grad_investigationImg.getSiblings()?has_content>
                  <#assign firstImage = cur_grad_investigationGroup.grad_investigationImg.getSiblings()?first>
                  <#if (firstImage.getData())?? && firstImage.getData() != "">
                    <img
                      loading="lazy"
                      src="${firstImage.getData()}"
                      alt="${firstImage.getAttribute("alt")}"
                      class="image image--no-zoom investigations_image investigations_image--secondary"
                      data-fileentryid="${firstImage.getAttribute("fileEntryId")}"
                      data-lfr-editable-id="image-image-investigaciones-${cur_grad_investigationGroup?index}"
                      data-lfr-editable-type="image" />
                  </#if>
                </#if>
                
                <div class="investigations_content">
                  <span class="investigations_badge">
                    <#assign grad_investigationGroup_grad_investigationDate_Data = getterUtil.getString(cur_grad_investigationGroup.grad_investigationDate.getData())>
                    <#if validator.isNotNull(grad_investigationGroup_grad_investigationDate_Data)>
                      <#assign grad_invigationGroup_grad_investigationDate_DateObj = dateUtil.parseDate("yyyy-MM-dd", grad_investigationGroup_grad_investigationDate_Data, locale)>
                      ${dateUtil.getDate(grad_invigationGroup_grad_investigationDate_DateObj, "yyyy", locale)}
                    </#if>
                  </span>
                  <h3 class="title title-md title-semibold investigations_title">
                    <#if (cur_grad_investigationGroup.grad_investigationTitle.getData())??>${cur_grad_investigationGroup.grad_investigationTitle.getData()}</#if>
                  </h3>
                  <p class="paragraph paragraph-neutral paragraph-md investigations_description">
                    <#if (cur_grad_investigationGroup.grad_investigationDesc.getData())??>${cur_grad_investigationGroup.grad_investigationDesc.getData()}</#if>
                    <span><i class="ph ph-arrow-square-in"></i></span>
                  </p>
                </div>
              </div>
            </div>
          </#if>
        </#list>
                  </div>
                </div>
                <button
                  class="swiper-slide-button investigations_prev"
                  aria-label="Ir al slide anterior"
                  type="button">
                  <i class="ph ph-arrow-circle-left" aria-hidden="true"></i>
                </button>
                <button
                  class="swiper-slide-button investigations_next"
                  aria-label="Ir al siguiente slide"
                  type="button">
                  <i class="ph ph-arrow-circle-right" aria-hidden="true"></i>
                </button>
              </div>
            </div>
      </div>
    </#if>
  </div>
</section>
<!--/$-->
