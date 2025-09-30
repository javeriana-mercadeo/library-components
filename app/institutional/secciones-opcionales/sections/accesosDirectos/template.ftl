 <h2>
     <#if (AcordeonConDropZones.titulo_principal.getData())??>
         ${AcordeonConDropZones.titulo_principal.getData()}
     </#if>
 </h2>
 <#if AcordeonConDropZones.Fieldset47212448.getSiblings()?has_content>
     <#list AcordeonConDropZones.Fieldset47212448.getSiblings() as cur_AcordeonConDropZones_Fieldset47212448>
         <div class="accordion-container">
             <div class="accordion-item">
                 <button class="accordion-button" type="button" data-target="panel-1">
                     <span class="accordion-title">
                         <#if (AcordeonConDropZones.Fieldset47212448.titulo_seccion.getData())??>
                             ${AcordeonConDropZones.Fieldset47212448.titulo_seccion.getData()}
                         </#if>
                     </span>
                     <span class="accordion-icon">+</span>
                 </button>
                 <div class="accordion-panel" id="panel-1">
                     <div class="accordion-content">
                         <#if (AcordeonConDropZones.Fieldset47212448.id_drop_zone.getData())??>
                             ${AcordeonConDropZones.Fieldset47212448.id_drop_zone.getData()}
                         </#if>
                         <lfr-drop-zone data-lfr-drop-zone-id="panel-1">
                         </lfr-drop-zone>
                     </div>
                 </div>
             </div>
         </div>
     </#list>
 </#if>