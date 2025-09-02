<div class="scholarships__tabs-container">
  <!-- Navegación de tabs -->
  <div class="scholarships__tabs-nav" role="tablist" aria-label="Opciones de becas y financiación">
    <div class="scholarships__tabs-wrapper">
      <#if BECA_TAB.getSiblings()?has_content>
        <#list BECA_TAB.getSiblings() as cur_BECA_TAB>
          <button
            class="scholarships__tab-button <#if cur_BECA_TAB_index == 0>active</#if>"
            id="${cur_BECA_TAB.ID.getData()}-tab"
            data-tabs-target="#${cur_BECA_TAB.ID.getData()}-panel"
            type="button"
            role="tab"
            aria-controls="${cur_BECA_TAB.ID.getData()}-panel"
            aria-selected="<#if cur_BECA_TAB_index == 0>true<#else>false</#if>"
            tabindex="<#if cur_BECA_TAB_index == 0>0<#else>-1</#if>">
            <span
              class="icon icon--neutral icon--sm scholarships__tab-icon"
              data-lfr-editable-id="icon-${cur_BECA_TAB.ID.getData()}"
              data-lfr-editable-type="html">
              <i class="${cur_BECA_TAB.ICONO.getData()}" aria-hidden="true"></i>
            </span>
            <span 
              id="span-becas-tab-${cur_BECA_TAB.ID.getData()}"
              data-lfr-editable-id="span-${cur_BECA_TAB.ID.getData()}-label"
              data-lfr-editable-type="text">
              ${cur_BECA_TAB.ETIQUETA.getData()}
            </span>
          </button>
        </#list>
      <#else>
        <!-- Fallback estático si no hay datos dinámicos -->
        <button class="scholarships__tab-button active" id="becas-tab" data-tabs-target="#becas-panel" type="button" role="tab">
          <span class="icon icon--neutral icon--sm scholarships__tab-icon">
            <i class="ph ph-graduation-cap" aria-hidden="true"></i>
          </span>
          <span>Nuestras Becas</span>
        </button>
        <button class="scholarships__tab-button" id="financiacion-tab" data-tabs-target="#financiacion-panel" type="button" role="tab">
          <span class="icon icon--neutral icon--sm scholarships__tab-icon">
            <i class="ph ph-credit-card" aria-hidden="true"></i>
          </span>
          <span>Programa de Financiación</span>
        </button>
      </#if>
    </div>
  </div>

  <!-- Contenido de las tabs -->
  <div class="scholarships__tabs-content">
    <#if BECA_TAB.getSiblings()?has_content>
      <#list BECA_TAB.getSiblings() as cur_BECA_TAB>
        <div
          class="scholarships__tab-panel <#if cur_BECA_TAB_index != 0>hidden</#if>"
          id="${cur_BECA_TAB.ID.getData()}-panel"
          role="tabpanel"
          aria-labelledby="${cur_BECA_TAB.ID.getData()}-tab"
          aria-hidden="<#if cur_BECA_TAB_index != 0>true<#else>false</#if>">
          
          <div class="scholarships__content-wrapper">
            <div class="scholarships__media-container">
              <#if cur_BECA_TAB.IMAGEN.getData()?has_content>
                <img
                  src="${cur_BECA_TAB.IMAGEN.getData()}"
                  alt="${cur_BECA_TAB.IMAGEN_ALT.getData()!"Imagen de " + cur_BECA_TAB.TITULO.getData()}"
                  class="image image--no-zoom scholarships__content-image"
                  loading="lazy"
                  decoding="async"
                  data-lfr-editable-id="image-${cur_BECA_TAB.ID.getData()}"
                  data-lfr-editable-type="image" />
              <#else>
                <!-- Ícono de fallback si no hay imagen -->
                <span class="icon icon--primary icon--lg scholarships__content-icon">
                  <i class="${cur_BECA_TAB.ICONO.getData()}" aria-hidden="true"></i>
                </span>
              </#if>
            </div>
            
            <div class="scholarships__text-container">
              <span
                class="caption caption-neutral caption-default caption-xl scholarships__content-title"
                data-lfr-editable-id="caption-${cur_BECA_TAB.ID.getData()}-title"
                data-lfr-editable-type="text">
                ${cur_BECA_TAB.TITULO.getData()}
              </span>
              
              <!-- 🆕 CONTENEDOR PARA TEXTO ENRIQUECIDO CON PROCESAMIENTO AVANZADO -->
              <div 
                id="div-becas-${cur_BECA_TAB.ID.getData()}-content" 
                class="scholarships__content-text scholarships-rich-content"
                data-raw-content="${cur_BECA_TAB.CONTENIDO.getData()?html}">
                
                <!-- PROCESAMIENTO DE TEXTO ENRIQUECIDO (SIMILAR AL SISTEMA FAQ) -->
                <#assign contenidoHTML = cur_BECA_TAB.CONTENIDO.getData()>
                
                <!-- DECODIFICACIÓN EN CASCADA DE ENTIDADES HTML -->
                <#assign contenidoHTML = contenidoHTML?replace("&amp;lt;", "<")?replace("&amp;gt;", ">")>
                <#assign contenidoHTML = contenidoHTML?replace("&lt;", "<")?replace("&gt;", ">")>
                <#assign contenidoHTML = contenidoHTML?replace("&amp;nbsp;", " ")?replace("&nbsp;", " ")>
                <#assign contenidoHTML = contenidoHTML?replace("&amp;quot;", "\"")?replace("&quot;", "\"")>
                <#assign contenidoHTML = contenidoHTML?replace("&amp;amp;", "&")?replace("&amp;", "&")>
                
                <!-- CONVERSIÓN DE TEXTO PLANO A HTML SI ES NECESARIO -->
                <#if !contenidoHTML?contains("<")>
                  <#assign contenidoHTML = contenidoHTML?replace("\r\n", "\n")?replace("\r", "\n")>
                  <#assign contenidoHTML = contenidoHTML?replace("\n\n", "</p><p>")>
                  <#assign contenidoHTML = contenidoHTML?replace("\n", "<br>")>
                  <#assign contenidoHTML = "<p>" + contenidoHTML + "</p>">
                </#if>
                
                <!-- RENDERIZAR CONTENIDO PROCESADO -->
                ${contenidoHTML}
              </div>
              
              <a
                data-dmpa-element-id="btn"
                class="btn btn-primary btn-solid scholarships__cta-button"
                aria-disabled="false"
                href="${cur_BECA_TAB.ENLACE.getData()!"#"}"
                data-senna-off="true"
                data-lfr-editable-id="btn-${cur_BECA_TAB.ID.getData()}"
                data-lfr-editable-type="link">
                <span 
                  class="btn-text"
                  data-lfr-editable-id="btn-text-${cur_BECA_TAB.ID.getData()}"
                  data-lfr-editable-type="text">
                  ${cur_BECA_TAB.TEXTO_BOTON.getData()!"Más información"}
                </span>
              </a>
            </div>
          </div>
        </div>
      </#list>
    <#else>
      <!-- Fallback estático con contenido enriquecido de ejemplo -->
      <div class="scholarships__tab-panel" id="becas-panel" role="tabpanel" aria-labelledby="becas-tab">
        <div class="scholarships__content-wrapper">
          <div class="scholarships__media-container">
            <img
              src="https://www.javeriana.edu.co/recursosdb/20125/12256677/apoyo-financiero-y-descuentos.JPG/25b2a8f4-71f3-da2e-2728-b8af1111a992"
              alt="Apoyo financiero y descuentos - Becas Universidad Javeriana"
              class="image image--no-zoom scholarships__content-image" />
          </div>
          <div class="scholarships__text-container">
            <span class="caption scholarships__content-title">Becas disponibles</span>
            <div class="scholarships__content-text scholarships-rich-content">
              <p>Contamos con un <strong>área de apoyo financiero</strong> que ofrece diferentes becas para que inicies tus estudios de pregrado.</p>
              <h3>Tipos de Becas Disponibles</h3>
              <ul>
                <li><strong>Beca Ingresa a la Javeriana</strong> - Hasta 50% de descuento en matrícula</li>
                <li><strong>Beca Bachiller Destacado</strong> - Para estudiantes con promedio superior a 4.5</li>
              </ul>
              <div class="overflow-auto portlet-msg-info">
                Es importante presentar todos los documentos en las fechas establecidas.
              </div>
            </div>
            <a href="#" class="btn btn-primary btn-solid scholarships__cta-button">
              <span class="btn-text">Más información</span>
            </a>
          </div>
        </div>
      </div>
    </#if>
  </div>
</div>