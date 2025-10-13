           <div class="differentials_list">
               <#if itemsDiferenciales.getSiblings()?has_content>
                   <#list itemsDiferenciales.getSiblings() as cur_itemsDiferenciales>
                       <div class="differentials_item" id="maestria-different-approaches">
                           <#if (cur_itemsDiferenciales.icono.getData())??>
                               <div class="differentials_item-icon">
                                   ${cur_itemsDiferenciales.icono.getData()}
                               </div>
                           </#if>
                           <div class="differentials_item-content">
                               <#if (cur_itemsDiferenciales.subTitulo.getData())??>
                                   <span
                                       class="caption caption-neutral caption-default caption-lg caption-bold differentials_item-title">
                                       ${cur_itemsDiferenciales.subTitulo.getData()}
                                   </span>
                               </#if>
                               <#if (cur_itemsDiferenciales.Descripcion.getData())??>
                                   <p class="paragraph paragraph-neutral paragraph-md differentials_item-description">
                                       ${cur_itemsDiferenciales.Descripcion.getData()}
                                   </p>
                               </#if>
                           </div>
                       </div>
                   </#list>
               </#if>
           </div>