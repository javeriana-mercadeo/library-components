<div class="faq__container">
  <div class="faq__item active">
    <button
      data-dmpa-element-id="btn"
      class="btn btn-primary btn-light btn-full-width faq__question"
      aria-disabled="false"
      type="button">
      <span class="btn-text">
        <h3>¿Cuáles son los criterios de evaluación específicos para el ingreso al programa?</h3>
        <span class="faq__icon"><i class="ph ph-caret-down"></i></span>
      </span>
    </button>
    <div class="faq__answer">
      <div class="faq__sub-questions">
        <h2>Criterios de Evaluación para Admisión</h2>
        <p>
          El proceso de admisión evalúa diferentes aspectos del aspirante a través de una
          <strong>prueba específica</strong>
          que mide las competencias necesarias para el programa académico.
        </p>
        <h3>Criterios por Categoría</h3>
        <div class="overflow-auto portlet-msg-info">
          La evaluación se realiza mediante prueba específica con los siguientes pesos y criterios:
        </div>
        <div puj-data-requirements></div>
      </div>
    </div>
  </div>
  <#if PREGUNTA.getSiblings()?has_content>
    <#list PREGUNTA.getSiblings() as cur_PREGUNTA>
      <div class="faq__item">
        <button
          data-dmpa-element-id="btn"
          class="btn btn-primary btn-light btn-full-width faq__question"
          aria-disabled="false"
          type="button">
          <span class="btn-text">
            <h3>
              ${cur_PREGUNTA.getData()}
            </h3>
            <span class="faq__icon"><i class="ph ph-caret-down"></i></span>
          </span>
        </button>
        <div class="faq__answer">
          <div class="faq__sub-questions" data-raw-content="${cur_PREGUNTA.RESPUESTA.getData()?html}">
            <#assign contenidoHTML=cur_PREGUNTA.RESPUESTA.getData()>
              <#assign contenidoHTML=contenidoHTML?replace("&amp;lt;", "<" )?replace("&amp;gt;", ">" )>
                <#assign contenidoHTML=contenidoHTML?replace("&lt;", "<" )?replace("&gt;", ">" )>
                  <#assign contenidoHTML=contenidoHTML?replace("&amp;nbsp;", " " )?replace("&nbsp;", " " )>
                    <#assign contenidoHTML=contenidoHTML?replace("&amp;quot;", "\"")?replace(" &quot;", "\"")>
            <#assign contenidoHTML = contenidoHTML?replace(" &amp;amp;", "&" )?replace("&amp;", "&" )>
                      <#if !contenidoHTML?contains("<")>
                        <#assign contenidoHTML=contenidoHTML?replace("\r\n", "\n" )?replace("\r", "\n" )>
                          <#assign contenidoHTML=contenidoHTML?replace("\n\n", "</p><p>" )>
                            <#assign contenidoHTML=contenidoHTML?replace("\n", "<br>" )>
                              <#assign contenidoHTML="<p>" + contenidoHTML + "</p>">
                      </#if>
                      ${contenidoHTML}
          </div>
        </div>
      </div>
    </#list>
  </#if>
</div>
