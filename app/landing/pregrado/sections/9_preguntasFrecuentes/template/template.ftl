<div class="faq__container">
    <#if lista_preguntas.getSiblings()?has_content>
        <#list lista_preguntas.getSiblings() as cur_lista_preguntas>
            <div class="faq__item">
                <button class="faq__question">
                    <#if (cur_lista_preguntas.pregunta.getData())??>
                        ${cur_lista_preguntas.pregunta.getData()}
                    </#if>
                    <span class="faq__icon"><i class="ph ph-caret-down"></i></span>
                </button>
                <div class="faq__answer">
                    <div class="faq__sub-questions">
                        <#if lista_preguntas.lista_respuestas.getSiblings()?has_content>
                            <#list lista_preguntas.lista_respuestas.getSiblings() as cur_lista_preguntas_lista_respuestas>
                                <p class="faq__sub-question">
                                    <#if (cur_lista_preguntas_lista_respuestas.getData())??>
                                        ${cur_lista_preguntas_lista_respuestas.getData()}
                                    </#if>
                                </p>
                            </#list>
                        </#if>
                    </div>
                </div>
            </div>
        </#list>
    </#if>
</div>