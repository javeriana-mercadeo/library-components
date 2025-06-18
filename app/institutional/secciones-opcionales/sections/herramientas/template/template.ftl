 <div class="tools-logos-grid">
     <#if logo_herramientas.getSiblings()?has_content>
         <#list logo_herramientas.getSiblings() as cur_logo_herramientas>
             <div class="logo-item" title="AutoCAD">
                 <#if (cur_logo_herramientas.getData())?? && cur_logo_herramientas.getData() !="">
                     <img class="image" alt="${cur_logo_herramientas.getAttribute("alt")}" data-fileentryid="${cur_logo_herramientas.getAttribute("fileEntryId")}" src="${cur_logo_herramientas.getData()}" />
                 </#if>
             </div>
         </#list>
     </#if>
 </div>