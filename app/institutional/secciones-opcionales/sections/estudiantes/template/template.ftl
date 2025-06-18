  <div class="slider-cards" id="student-slider-cards">
      <#if sliderstudent.getSiblings()?has_content>
          <#list sliderstudent.getSiblings() as cur_sliderstudent>
              <div class="student-card" id="student-slider-card-0" data-index="0">
                  <div class="student-image">
                      <#if (cur_sliderstudent.fotoestudiante.getData())?? && cur_sliderstudent.fotoestudiante.getData() !="">
                          <img class="image" alt="${cur_sliderstudent.fotoestudiante.getAttribute("alt")}" data-fileentryid="${cur_sliderstudent.fotoestudiante.getAttribute("fileEntryId")}" src="${cur_sliderstudent.fotoestudiante.getData()}" />
                      </#if>
                  </div>
                  <div class="student-info">
                      <h3 id="student-slider-name-0">
                          <#if (cur_sliderstudent.nombreestudiante.getData())??>
                              ${cur_sliderstudent.nombreestudiante.getData()}
                          </#if>
                      </h3>
                      <p id="student-slider-position-0">
                          <#if (cur_sliderstudent.descripcionestudiante.getData())??>
                              ${cur_sliderstudent.descripcionestudiante.getData()}
                          </#if>
                      </p>
                      <#if (cur_sliderstudent.logoestudiante.getData())?? && cur_sliderstudent.logoestudiante.getData() !="">
                          <img class="company-logo" alt="${cur_sliderstudent.logoestudiante.getAttribute("alt")}" data-fileentryid="${cur_sliderstudent.logoestudiante.getAttribute("fileEntryId")}" src="${cur_sliderstudent.logoestudiante.getData()}" />
                      </#if>
                  </div>
              </div>
          </#list>
      </#if>
  </div>