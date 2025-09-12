<!--$-->
<#-- ======================================== -->
<#-- FUNCIÓN PARA TRUNCAR PALABRAS -->
<#-- ======================================== -->
<#function truncateWords text maxWords>
  <#if !text?has_content>
    <#return "">
  </#if>
  <#-- Remover HTML tags para contar palabras correctamente -->
  <#assign cleanText = text?replace("<[^>]+>", "", "r")?replace("&nbsp;", " ", "r")?trim>
  <#if !cleanText?has_content>
    <#return text>
  </#if>
  <#assign words = cleanText?split(" ")>
  <#if words?size <= maxWords>
    <#return text>
  </#if>
  <#-- Truncar y agregar puntos suspensivos -->
  <#assign truncated = "">
  <#list 0..maxWords-1 as i>
    <#if i < words?size>
      <#assign truncated = truncated + words[i] + " ">
    </#if>
  </#list>
  <#return truncated?trim + "...">
</#function>

<#-- ======================================== -->
<#-- GENERAR ARRAY ORDENADO POR AÑO -->
<#-- ======================================== -->
<#assign sortedInvestigations = []>
<#if grad_investigationGroup.getSiblings()?has_content>
  <#-- PASO 1: CREAR ARRAY CON DATOS Y AÑOS NUMÉRICOS -->
  <#list grad_investigationGroup.getSiblings() as investigation>
    <#-- Procesar fecha con validación robusta -->
    <#assign dateData = getterUtil.getString(investigation.grad_investigationDate.getData())>
    <#assign yearNum = 2024>
    <#if validator.isNotNull(dateData)>
      <#attempt>
        <#assign dateObj = dateUtil.parseDate("yyyy-MM-dd", dateData, locale)>
        <#assign yearNum = dateUtil.getDate(dateObj, "yyyy", locale)?number>
      <#recover>
        <#assign yearNum = 2024>
      </#attempt>
    </#if>
    
    <#-- Agregar al array con año numérico para ordenamiento -->
    <#assign sortedInvestigations = sortedInvestigations + [{"data": investigation, "year": yearNum, "originalIndex": investigation?index}]>
  </#list>
  
  <#-- PASO 2: ORDENAR POR AÑO DESCENDENTE (más reciente primero) -->
  <#assign sortedInvestigations = sortedInvestigations?sort_by("year")?reverse>

<#-- ======================================== -->
<#-- GENERAR JSON DINÁMICO DESDE DATOS ORDENADOS -->
<#-- ======================================== -->
<#assign investigationsJSON = "[]">
  <#assign investigationsJSON = "[">
  <#list sortedInvestigations as sortedItem>
    <#assign investigation = sortedItem.data>
    <#assign investigationYear = sortedItem.year>
    
    <#-- Usar año ya procesado y validado del ordenamiento -->
    <#assign yearString = investigationYear?string>
    
    <#-- Procesar imagen principal con fallback -->
    <#assign imageUrl = "https://via.placeholder.com/400x300">
    <#assign imageAlt = "Imagen investigación">
    <#assign additionalImages = "[]">
    <#if investigation.grad_investigationImg.getSiblings()?has_content>
      <#assign firstImage = investigation.grad_investigationImg.getSiblings()?first>
      <#if (firstImage.getData())?? && firstImage.getData() != "">
        <#assign imageUrl = firstImage.getData()>
        <#if firstImage.getAttribute("alt")??>
          <#assign imageAlt = firstImage.getAttribute("alt")>
        </#if>
      </#if>
      
      <#-- Procesar imágenes adicionales (desde la segunda en adelante) -->
      <#if investigation.grad_investigationImg.getSiblings()?size gt 1>
        <#assign additionalImages = "[">
        <#assign additionalImageItems = []>
        <#list investigation.grad_investigationImg.getSiblings() as imgSibling>
          <#if imgSibling?index gt 0 && (imgSibling.getData())?? && imgSibling.getData() != "">
            <#assign imgItem = '{"src": "' + imgSibling.getData() + '", "alt": "' + (imgSibling.getAttribute("alt")!"")?json_string + '"}'>
            <#assign additionalImageItems = additionalImageItems + [imgItem]>
          </#if>
        </#list>
        <#assign additionalImages = "[" + additionalImageItems?join(",") + "]">
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
    
    <#-- Procesar estudiante/autor con fallback -->
    <#assign authorName = "Estudiante Doctorado">
    <#if (investigation.grad_investigationStudent.getData())??> 
      <#assign authorName = investigation.grad_investigationStudent.getData()>
    </#if>
    
    <#-- Construir objeto JSON de la investigación con ID secuencial -->
    <#assign investigationsJSON = investigationsJSON + '{'>
    <#assign investigationsJSON = investigationsJSON + '"id": ' + sortedItem?index + ','>
    <#assign investigationsJSON = investigationsJSON + '"year": "' + yearString + '",'>
    <#assign investigationsJSON = investigationsJSON + '"title": "' + (investigation.grad_investigationTitle.getData()!"")?json_string + '",'>
    <#assign investigationsJSON = investigationsJSON + '"description": "' + (investigation.grad_investigationDesc.getData()!"")?json_string + '",'>
    <#assign investigationsJSON = investigationsJSON + '"image": "' + imageUrl + '",'>
    <#assign investigationsJSON = investigationsJSON + '"alt": "' + imageAlt?json_string + '",'>
    <#assign investigationsJSON = investigationsJSON + '"author": "' + authorName?json_string + '",'>
    <#assign investigationsJSON = investigationsJSON + '"additionalImages": ' + additionalImages + ''>
    
    <#-- Agregar videoEmbedId solo si existe -->
    <#if videoEmbedId != "">
      <#assign investigationsJSON = investigationsJSON + ',"videoEmbedId": "' + videoEmbedId + '"'>
    </#if>
    
    <#assign investigationsJSON = investigationsJSON + '}'>
    
    <#-- Agregar coma si no es el último elemento -->
    <#if sortedItem?has_next>
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
        <#list sortedInvestigations as cur_sortedItem>
          <#assign cur_grad_investigationGroup = cur_sortedItem.data>
          <#if cur_sortedItem?index == 0>
            <!-- CARD PRINCIPAL -->
            <div class="investigations_fixed-column">
              <div class="investigations_main-card">
                <div
                  class="investigations_card investigations_card--main investigations_card"
                  role="button"
                  tabindex="0"
                  data-id="${cur_sortedItem?index}"
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
                        data-lfr-editable-id="image-image-investigaciones-${cur_sortedItem?index}"
                        data-lfr-editable-type="image" />
                    </#if>
                  </#if>
                  
                  <div class="investigations_content">
                    <span class="investigations_badge">
                      ${cur_sortedItem.year}
                    </span>
                    <h3 class="title title-lg title-semibold investigations_title">
                      <#if (cur_grad_investigationGroup.grad_investigationTitle.getData())??>${cur_grad_investigationGroup.grad_investigationTitle.getData()}</#if>
                    </h3>
                    <div class="paragraph paragraph-neutral paragraph-md investigations_description">
                      <#if (cur_grad_investigationGroup.grad_investigationDesc.getData())??>${truncateWords(cur_grad_investigationGroup.grad_investigationDesc.getData(), 16)}</#if>
                      <span><i class="ph ph-arrow-square-in"></i></span>
                    </div>
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
                data-id="${cur_sortedItem?index}"
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
                      data-lfr-editable-id="image-image-investigaciones-${cur_sortedItem?index}"
                      data-lfr-editable-type="image" />
                  </#if>
                </#if>
                
                <div class="investigations_content">
                  <span class="investigations_badge">
                    ${cur_sortedItem.year}
                  </span>
                  <h3 class="title title-md title-semibold investigations_title">
                    <#if (cur_grad_investigationGroup.grad_investigationTitle.getData())??>${cur_grad_investigationGroup.grad_investigationTitle.getData()}</#if>
                  </h3>
                  <div class="paragraph paragraph-neutral paragraph-md investigations_description">
                    <#if (cur_grad_investigationGroup.grad_investigationDesc.getData())??>${truncateWords(cur_grad_investigationGroup.grad_investigationDesc.getData(), 16)}</#if>
                    <span><i class="ph ph-arrow-square-in"></i></span>
                  </div>
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
