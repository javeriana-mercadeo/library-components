<div class="slider">
  <div class="slider-track">
    <div class="slider-items slider-items--original">
      <#if ITEM.getSiblings()?has_content>
        <#list ITEM.getSiblings() as cur_ITEM>
          <div class="img-logos">
            <#if (cur_ITEM.image.getData())?? && cur_ITEM.image.getData() !="">
              <img alt="${cur_ITEM.image.getAttribute("alt")}" data-fileentryid="${cur_ITEM.image.getAttribute("fileEntryId")}" src="${cur_ITEM.image.getData()}" />
            </#if>
            <p>
              <#if (cur_ITEM.description.getData())??>
                ${cur_ITEM.description.getData()}
              </#if>
            </p>
          </div>
        </#list>
      </#if>
    </div>
  </div>
</div>