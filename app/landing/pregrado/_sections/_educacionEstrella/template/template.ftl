<div class="educacion-estrella__content-wrapper">
  <!-- Text Container con contenido enriquecido -->
  <div class="educacion-estrella__text-container">
    
    <!-- Subtítulo con texto enriquecido -->
    <#if CONTENIDO_SUBTITULO.getData()?has_content>
      <div 
        class="educacion-estrella__subtitle educacion-estrella-rich-content"
        data-raw-content="${CONTENIDO_SUBTITULO.getData()?html}">
        
        <!-- PROCESAMIENTO DE TEXTO ENRIQUECIDO (SIMILAR AL SISTEMA FAQ) -->
        <#assign contenidoHTML = CONTENIDO_SUBTITULO.getData()>
        
        <!-- DECODIFICACIÓN EN CASCADA DE ENTIDADES HTML -->
        <#assign contenidoHTML = contenidoHTML?replace("&amp;lt;", "<")?replace("&amp;gt;", ">")>
        <#assign contenidoHTML = contenidoHTML?replace("&lt;", "<")?replace("&gt;", ">")>
        <#assign contenidoHTML = contenidoHTML?replace("&amp;nbsp;", " ")?replace("&nbsp;", " ")>
        <#assign contenidoHTML = contenidoHTML?replace("&amp;quot;", "\"")?replace("&quot;", "\"")>
        <#assign contenidoHTML = contenidoHTML?replace("&amp;amp;", "&")?replace("&amp;", "&")>
        
        <!-- CONVERSIÓN DE TEXTO PLANO A HTML SI ES NECESARIO -->
        <#if !contenidoHTML?contains("<")>
          <#assign contenidoHTML = contenidoHTML?replace("\r\n", "\n")?replace("\r", "\n")>
          <#assign contenidoHTML = contenidoHTML?replace("\n\n", "</p><p>")>
          <#assign contenidoHTML = contenidoHTML?replace("\n", "<br>")>
          <#assign contenidoHTML = "<p>" + contenidoHTML + "</p>">
        </#if>
        
        <!-- RENDERIZAR CONTENIDO PROCESADO -->
        ${contenidoHTML}
      </div>
    <#else>
      <!-- Fallback estático -->
      <div class="educacion-estrella__subtitle educacion-estrella-rich-content">
        <p>Con <strong>Educación Estrella®</strong> y la Javeriana, accede a <em>'Línea Estrella Cero'</em> o <em>'Línea Estrella Plus'</em> para financiar tu pregrado.</p>
      </div>
    </#if>

    <!-- Beneficios y contenido enriquecido principal -->
    <#if CONTENIDO_BENEFICIOS.getData()?has_content>
      <div 
        class="educacion-estrella__benefits educacion-estrella-rich-content"
        data-raw-content="${CONTENIDO_BENEFICIOS.getData()?html}">
        
        <!-- PROCESAMIENTO DE TEXTO ENRIQUECIDO -->
        <#assign contenidoHTML = CONTENIDO_BENEFICIOS.getData()>
        
        <!-- DECODIFICACIÓN EN CASCADA DE ENTIDADES HTML -->
        <#assign contenidoHTML = contenidoHTML?replace("&amp;lt;", "<")?replace("&amp;gt;", ">")>
        <#assign contenidoHTML = contenidoHTML?replace("&lt;", "<")?replace("&gt;", ">")>
        <#assign contenidoHTML = contenidoHTML?replace("&amp;nbsp;", " ")?replace("&nbsp;", " ")>
        <#assign contenidoHTML = contenidoHTML?replace("&amp;quot;", "\"")?replace("&quot;", "\"")>
        <#assign contenidoHTML = contenidoHTML?replace("&amp;amp;", "&")?replace("&amp;", "&")>
        
        <!-- CONVERSIÓN DE TEXTO PLANO A HTML SI ES NECESARIO -->
        <#if !contenidoHTML?contains("<")>
          <#assign contenidoHTML = contenidoHTML?replace("\r\n", "\n")?replace("\r", "\n")>
          <#assign contenidoHTML = contenidoHTML?replace("\n\n", "</p><p>")>
          <#assign contenidoHTML = contenidoHTML?replace("\n", "<br>")>
          <#assign contenidoHTML = "<p>" + contenidoHTML + "</p>">
        </#if>
        
        <!-- RENDERIZAR CONTENIDO PROCESADO -->
        ${contenidoHTML}
      </div>
    <#else>
      <!-- Fallback estático con contenido enriquecido de ejemplo -->
      <div class="educacion-estrella__benefits educacion-estrella-rich-content">
        <h3>Beneficios Destacados</h3>
        <ul>
          <li><strong>Puedes cubrir hasta el 100%</strong> de tu matrícula</li>
          <li><strong>Con tasas desde 0%</strong> de interés</li>
          <li><strong>Cuotas fijas mensuales</strong> sin sorpresas</li>
          <li><strong>Largo plazo</strong> para mayor comodidad</li>
        </ul>
        
        <div class="overflow-auto portlet-msg-info">
          El proceso es 100% digital, tarda menos de 10 minutos y está disponible para estudiantes nuevos.
        </div>
        
        <h4>Líneas de Financiamiento Disponibles</h4>
        <table border="1" style="width: 100%">
          <caption>Opciones de Financiamiento Educación Estrella®</caption>
          <tbody>
            <tr>
              <td><strong>Línea</strong></td>
              <td><strong>Tasa de Interés</strong></td>
              <td><strong>Cobertura</strong></td>
            </tr>
            <tr>
              <td>Línea Estrella Cero</td>
              <td>0% E.A.</td>
              <td>Hasta 100% matrícula</td>
            </tr>
            <tr>
              <td>Línea Estrella Plus</td>
              <td>Desde 8.5% E.A.</td>
              <td>Hasta 100% matrícula + gastos</td>
            </tr>
          </tbody>
        </table>
        
        <div class="overflow-auto portlet-msg-alert">
          El cupo es limitado y está sujeto a evaluación crediticia. Aplica solo para estudiantes de primer ingreso.
        </div>
        
        <p>Para más información sobre el proceso de aplicación, visita el <a href="https://www.educacionestrella.com">portal oficial de Educación Estrella</a></p>
        
        <cite>*Educación Estrella® es una marca registrada. Consulta términos y condiciones específicos.</cite>
      </div>
    </#if>

    <!-- CTA Button -->
    <div class="educacion-estrella__cta">
      <a
        data-dmpa-element-id="btn"
        class="btn btn-primary btn-solid educacion-estrella__cta-button"
        aria-disabled="false"
        href="${ENLACE_BOTON.getData()!"https://www.educacionestrella.com/javeriana"}"
        target="_blank"
        rel="noopener noreferrer"
        data-senna-off="true"
        data-lfr-editable-id="btn-educacion-estrella-cta"
        data-lfr-editable-type="link">
        <span 
          class="btn-text"
          data-lfr-editable-id="btn-text-educacion-estrella"
          data-lfr-editable-type="text">
          ${TEXTO_BOTON.getData()!"Solicitar financiamiento"}
        </span>
      </a>
    </div>
  </div>

  <!-- Media Container - Logo -->
  <div class="educacion-estrella__media-container">
    <div class="educacion-estrella__logo-container">
      <#if IMAGEN_LOGO.getData()?has_content>
        <img
          src="${IMAGEN_LOGO.getData()}"
          alt="${ALT_LOGO.getData()!"Educación Estrella - Financiamiento estudiantil"}"
          class="image educacion-estrella__logo"
          loading="lazy"
          decoding="async"
          data-lfr-editable-id="image-educacion-estrella-logo"
          data-lfr-editable-type="image" />
      <#else>
        <!-- Fallback estático -->
        <img
          src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-ee-r"
          alt="Educación Estrella - Financiamiento estudiantil"
          class="image educacion-estrella__logo"
          loading="lazy"
          decoding="async"
          data-lfr-editable-id="image-educacion-estrella-logo"
          data-lfr-editable-type="image" />
      </#if>
    </div>
  </div>

</div>