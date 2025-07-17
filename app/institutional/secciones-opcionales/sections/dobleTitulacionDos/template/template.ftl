<#if container_doble_titulacion2.getSiblings()?has_content>
    <#list container_doble_titulacion2.getSiblings() as cur_container_doble_titulacion2>
        <div class="program-item">
            <#if (cur_container_doble_titulacion2.imagen_doble_titulacion_2.getData())?? && cur_container_doble_titulacion2.imagen_doble_titulacion_2.getData() !="">
                <img class="program-image" alt="${cur_container_doble_titulacion2.imagen_doble_titulacion_2.getAttribute("alt")}" data-fileentryid="${cur_container_doble_titulacion2.imagen_doble_titulacion_2.getAttribute("fileEntryId")}" src="${cur_container_doble_titulacion2.imagen_doble_titulacion_2.getData()}" />
            </#if>
            <div class="program-info">
                <h3 class="program-title" id="dt2-program-title-2">
                    <#if (cur_container_doble_titulacion2.titulo_doble_titulacion_2.getData())??>
                        ${cur_container_doble_titulacion2.titulo_doble_titulacion_2.getData()}
                    </#if>
                </h3>
                <lfr-editable
                    id="dt2-program-description-2"
                    type="rich-text"
                    class="paragraph paragraph-neutral paragraph-md program-description">
                    <#if (cur_container_doble_titulacion2.descripcion_doble_titulacion_2.getData())??>
                        ${cur_container_doble_titulacion2.descripcion_doble_titulacion_2.getData()}
                    </#if>
                </lfr-editable>
            </div>
        </div>
    </#list>
</#if>