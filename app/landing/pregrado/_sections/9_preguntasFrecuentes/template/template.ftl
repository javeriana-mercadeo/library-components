<div class="faq__container">
  <#if PREGUNTA.getSiblings()?has_content>
    <#list PREGUNTA.getSiblings() as cur_PREGUNTA>
      <div class="faq__item">
        <button
          data-dmpa-element-id="btn"
          class="btn btn-primary btn-light btn-full-width faq__question"
          aria-disabled="false"
          type="button">
          <span class="btn-text">
            ${cur_PREGUNTA.getData()}
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