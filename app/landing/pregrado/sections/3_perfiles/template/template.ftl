<div class="program-profile__tabs-nav">
  <ul
    class="program-profile__tabs-list"
    id="profile-tabs"
    data-tabs-toggle="#${.vars["reserved-article-id_"].data}"
    data-tabs-active-classes="active"
    data-tabs-inactive-classes=""
    role="tablist">
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
              aria-selected="true">
              ${cur_tabs.tab.getData()}
            </button>
          </li>
        </#if>
      </#list>
    </#if>
  </ul>
</div>
<div id="${.vars["reserved-article-id_"].data}" class="program-profile__tabs-content">
  <#if tabs.getSiblings()?has_content>
    <#list tabs.getSiblings() as cur_tabs>
      <div class="program-profile__tab-panel" id="ingreso-panel" role="tabpanel" aria-labelledby="ingreso-tab">
        <div class="program-profile__content-wrapper">
          <div class="program-profile__image-container">
            <#if (cur_tabs.image.getData())?? && cur_tabs.image.getData() !="">
              <img class="image program-profile__image" alt="${cur_tabs.image.getAttribute("alt")}" data-fileentryid="${cur_tabs.image.getAttribute("fileEntryId")}" src="${cur_tabs.image.getData()}" />
            </#if>
          </div>
          <div class="program-profile__text-container">
            <div
              id="perfiles-paragraph-ingreso"
              type="rich-text"
              class="paragraph paragraph-neutral paragraph-md program-profile__paragraph">
              <#if (cur_tabs.content.getData())??>
                ${cur_tabs.content.getData()}
              </#if>
            </div>
          </div>
        </div>
      </div>
    </#list>
  </#if>
</div>