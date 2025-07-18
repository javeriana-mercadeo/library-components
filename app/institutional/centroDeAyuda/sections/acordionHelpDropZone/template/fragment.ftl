<section class="accordion-container">
    <div class="container">
        <div class="accordion-header">
            <div class="accordion-toggle">
                <span>Preguntas Frecuentes</span>
                <i class="ph ph-caret-up"></i>
            </div>
        </div>
        <div class="accordion-items">
            <!-- Botones de preguntas -->
            <div class="accordion-questions">
                <button class="question-button active" data-target="types-financing" type="button">
                    <span>¿Qué tipos de becas ofrece la Universidad Javeriana?</span>
                    <i class="ph ph-caret-up"></i>
                </button>
                <button class="question-button" data-target="application-financing" type="button">
                    <span>¿Cómo puedo aplicar a una beca en la Javeriana?</span>
                    <i class="ph ph-caret-down"></i>
                </button>
                <button class="question-button" data-target="financing-requirements" type="button">
                    <span>¿Cuáles son los requisitos para mantener una beca?</span>
                    <i class="ph ph-caret-down"></i>
                </button>
                <button class="question-button" data-target="financing-options" type="button">
                    <span>¿Cuáles son las opciones de financiación para pagar la matrícula?</span>
                    <i class="ph ph-caret-down"></i>
                </button>
                <button class="question-button" data-target="financing-javeriana" type="button">
                    <span>¿La Javeriana ofrece descuentos en la matrícula?</span>
                    <i class="ph ph-caret-down"></i>
                </button>
            </div>
            <!-- Paneles con múltiples drop zones -->
            <div class="accordion-answer">
                <!-- Panel 1 -->
                <div class="accordion-panel active" data-panel="types-financing">
                    <lfr-drop-zone data-lfr-drop-zone-id="types-financing"></lfr-drop-zone>
                </div>
                <!-- Panel 2 -->
                <div class="accordion-panel" data-panel="application-financing">
                    <lfr-drop-zone data-lfr-drop-zone-id="application-financing"></lfr-drop-zone>
                </div>
                <!-- Panel 3 -->
                <div class="accordion-panel" data-panel="financing-requirements">
                    <lfr-drop-zone data-lfr-drop-zone-id="financing-requirements"></lfr-drop-zone>
                </div>
                <!-- Panel 4 -->
                <div class="accordion-panel" data-panel="financing-options">
                    <lfr-drop-zone data-lfr-drop-zone-id="financing-options"></lfr-drop-zone>
                </div>
                <!-- Panel 5 -->
                <div class="accordion-panel" data-panel="financing-javeriana">
                    <lfr-drop-zone data-lfr-drop-zone-id="financing-javeriana"></lfr-drop-zone>
                </div>
            </div>
        </div>
    </div>
</section>