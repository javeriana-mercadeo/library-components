<div class="faq__container">
  <#if PREGUNTA.getSiblings()?has_content>
    <#list PREGUNTA.getSiblings() as cur_PREGUNTA>
      <div class="faq__item">
        <button class="faq__question">
          ${cur_PREGUNTA.getData()}
          <span class="faq__icon"><i class="ph ph-caret-down"></i></span>
        </button>
        <div class="faq__answer">
          <div class="faq__sub-questions">
            <p class="faq__sub-question">
              ${cur_PREGUNTA.RESPUESTA.getData()}
            </p>
          </div>
        </div>
      </div>
    </#list>
  </#if>
</div>