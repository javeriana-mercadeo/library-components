<!-- Preload de imágenes para optimización -->
<#if tabs.getSiblings()?has_content>
  <#list tabs.getSiblings() as cur_tabs>
    <#if (cur_tabs.image.getData())?? && cur_tabs.image.getData() !="">
      <link rel="preload" as="image" href="${cur_tabs.image.getData()}" />
    </#if>
  </#list>
</#if>
<section class="program-profile-section">
  <div class="container program-profile" id="${.vars["reserved-article-id_"].data}">
    <div class="program-profile__tabs-container">
      <!-- Navegación de tabs -->
      <div class="program-profile__tabs-nav" role="tablist" aria-label="Perfiles del programa">
        <ul class="program-profile__tabs-list">
          <#if tabs.getSiblings()?has_content>
            <#list tabs.getSiblings() as cur_tabs>
              <#if (cur_tabs.id.getData())?? && (cur_tabs.tab.getData())??>
                <li role="presentation">
                  <button
                    class="program-profile__tab-button"
                    id="${cur_tabs.id.getData()}-tab"
                    data-tabs-target="#${cur_tabs.id.getData()}-panel"
                    type="button"
                    role="tab"
                    aria-controls="${cur_tabs.id.getData()}-panel"
                    aria-selected="${cur_tabs?is_first?then('true', 'false')}"
                    tabindex="${cur_tabs?is_first?then('0', '-1')}">
                    ${cur_tabs.tab.getData()}
                  </button>
                </li>
              </#if>
            </#list>
          </#if>
        </ul>
      </div>
      <!-- Contenido de las tabs -->
      <div class="program-profile__tabs-content">
        <#if tabs.getSiblings()?has_content>
          <#list tabs.getSiblings() as cur_tabs>
            <#if (cur_tabs.id.getData())?? && (cur_tabs.tab.getData())??>
              <div
                class="program-profile__tab-panel${cur_tabs?is_first?then('', ' hidden')}"
                id="${cur_tabs.id.getData()}-panel"
                role="tabpanel"
                aria-labelledby="${cur_tabs.id.getData()}-tab"
                aria-hidden="${cur_tabs?is_first?then('false', 'true')}">
                <div class="program-profile__content-wrapper">
                  <!-- Contenedor de imagen -->
                  <div class="program-profile__image-container">
                    <#if (cur_tabs.image.getData())?? && cur_tabs.image.getData() !="">
                      <img
                        class="image program-profile__image"
                        alt="${cur_tabs.image.getAttribute("alt")!'Imagen de ' + cur_tabs.tab.getData()}"
                        data-fileentryid="${cur_tabs.image.getAttribute("fileEntryId")!''}"
                        src="${cur_tabs.image.getData()}" />
                    </#if>
                  </div>
                  <!-- Contenedor de texto -->
                  <div class="program-profile__text-container">
                    <div class="program-profile__paragraph">
                      <#if (cur_tabs.content.getData())??>
                        ${cur_tabs.content.getData()}
                      </#if>
                    </div>
                  </div>
                </div>
              </div>
            </#if>
          </#list>
        </#if>
      </div>
    </div>
  </div>
  </div>