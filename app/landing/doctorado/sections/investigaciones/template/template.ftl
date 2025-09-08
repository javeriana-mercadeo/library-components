<!--$-->
<section class="investigations_container" data-component-id="investigaciones">
  <div
    class="container investigations"
    data-investigations-data='[{"id":1,"year":"2025","title":"Investigación principal","description":" Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam luctus dolor eget urna ullamcorper posuere. Vivamus sem diam, consequat et lobortis at, aliquam vitae felis. Nulla at sodales ligula. Duis quis condimentum neque, id mattis lorem. Curabitur cursus nulla id ipsum varius, sit amet cursus augue gravida. Ut ut neque sit amet metus commodo cursus. Sed quis ante vel justo egestas suscipit in non turpis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras lobortis, nunc in ullamcorper pretium, nibh eros mollis eros, ut finibus dolor metus sit amet leo. Curabitur lorem augue, dapibus id ultrices nec, convallis quis dolor. Quisque consectetur ipsum sit amet elit tristique rhoncus. Quisque tortor elit, egestas non viverra a, scelerisque eu ex. Quisque eget elit in dui aliquet eleifend sed sit amet purus. Proin mollis orci orci, bibendum hendrerit lectus scelerisque sit amet. Vivamus aliquet, eros eget consectetur pulvinar, leo ipsum tempus justo, id volutpat magna magna eu metus. Aenean fringilla semper erat, at blandit sapien sollicitudin eget. Fusce pulvinar ante eget semper convallis. Quisque convallis dui a laoreet molestie. Maecenas eleifend massa hendrerit nisi euismod scelerisque. Aenean pharetra dictum massa et tincidunt. Maecenas mi tellus, pulvinar eu velit eget, tristique eleifend turpis. Suspendisse potenti.","image":"https://sobrehistoria.com/wp-content/uploads/2010/08/era-victoriana.jpg","alt":"Desafíos sociales en América Latina"},{"id":2,"year":"2024","title":"Desafíos sociales en América Latina","description":"Investigación interdisciplinaria que analizó la desigualdad y las políticas públicas en América Latina, proponiendo soluciones basadas en enfoques participativos y equitativos.","image":"https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-1","alt":"Desafíos sociales en América Latina"},{"id":3,"year":"2023","title":"Métodos Cualitativos Avanzados en Investigación Social","description":"Desarrollo de herramientas para el análisis cualitativo aplicadas a conflictos sociales y dinámicas comunitarias.","image":"https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-2","alt":"Métodos Cualitativos Avanzados"},{"id":4,"year":"2022","title":"Perspectivas Críticas en Derechos Humanos","description":"Análisis comparativo de las políticas de derechos humanos en América Latina, con recomendaciones para organismos internacionales.","image":"https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-3","alt":"Perspectivas Críticas en Derechos Humanos"},{"id":5,"year":"2021","title":"Innovación Educativa en Contextos Vulnerables","description":"Estrategias pedagógicas innovadoras para comunidades en situación de vulnerabilidad social y económica. Hola mundo, lo he logrado","image":"https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-4","alt":"Innovación Educativa"},{"id":6,"year":"2020","title":"Tecnología y Desarrollo Sostenible","description":"Esta investigación interdisciplinaria aborda la implementación estratégica de tecnologías emergentes para el desarrollo sostenible en América Latina, centrándose en soluciones innovadoras que integren el crecimiento económico con la preservación ambiental y la equidad social. El estudio analiza casos específicos en Colombia, México, Brasil y Chile, donde se han implementado sistemas de energía renovable, tecnologías de agricultura de precisión y plataformas digitales para la gestión sostenible de recursos naturales. La metodología empleada combina análisis cuantitativo de indicadores de sostenibilidad con estudios cualitativos de impacto comunitario, incluyendo entrevistas en profundidad con más de 200 beneficiarios directos y 50 líderes comunitarios. Los resultados demuestran que la adopción de tecnologías verdes en comunidades rurales puede incrementar la productividad agrícola hasta en un 35% mientras reduce el consumo de agua en un 28% y las emisiones de carbono en un 42%. Además, se identificaron factores críticos de éxito como la participación comunitaria activa, la capacitación técnica continua y el acceso a financiamiento flexible. El proyecto también reveló desafíos significativos, incluyendo resistencia al cambio tecnológico en comunidades tradicionales, limitaciones en infraestructura de conectividad rural y necesidad de marcos regulatorios más adaptativos. Las recomendaciones incluyen el desarrollo de programas de alfabetización digital específicos para adultos mayores, la creación de cooperativas tecnológicas locales y la implementación de políticas públicas que incentiven la adopción gradual de tecnologías sostenibles. Este trabajo contribuye significativamente al entendimiento de cómo las tecnologías emergentes pueden ser herramientas efectivas para el desarrollo sostenible cuando se implementan con enfoques participativos y culturalmente sensibles.","image":"https://www.javeriana.edu.co/recursosdb/d/info-prg/innvestigaciones-5","alt":"Tecnología y Desarrollo Sostenible"}]'
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
