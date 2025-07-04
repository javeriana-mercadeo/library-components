<form class="contact-form" id="contact-form">
  <div class="form-row">
    <div class="form-group">
      <label for="nombres" class="form-label required">Nombre(s)</label>
      <input
        type="text"
        id="first_name"
        class="form-input"
        maxlength="40"
        placeholder="Ingresa tu nombre"
        required=""
        autocomplete="given-name"
        name="nombres"
        required="" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="apellidos" class="form-label required">Apellidos</label>
      <input
        type="text"
        id="last_name"
        class="form-input"
        placeholder="Ingresa tus apellidos"
        required=""
        autocomplete="family-name"
        name="apellidos" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group form-group-half">
      <label for="tipoDocumento" class="form-label required">Tipo de documento</label>
      <div class="select-wrapper">
        <select
          id="00N7j000002Bl3X"
          name="tipoDocumento"
          class="form-select"
          required="">
          <option value="">Selecciona tipo</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="TI">Tarjeta de Identidad</option>
          <option value="CE">Cédula de Extranjería</option>
          <option value="PP">Pasaporte</option>
        </select>
      </div>
    </div>
    <div class="form-group form-group-half">
      <label for="numeroDocumento" class="form-label required">Número de documento</label>
      <input
        type="text"
        id="n00N7j000002Bl3V"
        class="form-input"
        placeholder="Número de documento"
        required=""
        autocomplete="off"
        name="numeroDocumento" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="email" class="form-label required">Email</label>
      <input
        type="email"
        id="email"
        class="form-input"
        placeholder="ejemplo@correo.com"
        required=""
        autocomplete="email"
        name="email" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group form-group-prefix">
      <label for="prefijo" class="form-label required">Indicativo</label>
      <div class="select-wrapper select-prefijo">
        <select
          id="p00NO4000002lUPh"
          name="prefijo"
          class="form-select select-prefijo-input"
          required="">
          <option value="+57" data-flag="🇨🇴">🇨🇴 +57</option>
          <option value="+1" data-flag="🇺🇸">🇺🇸 +1</option>
          <option value="+52" data-flag="🇲🇽">🇲🇽 +52</option>
          <option value="+54" data-flag="🇦🇷">🇦🇷 +54</option>
          <option value="+34" data-flag="🇪🇸">🇪🇸 +34</option>
        </select>
      </div>
    </div>
    <div class="form-group form-group-phone">
      <label for="telefono" class="form-label required">Teléfono celular</label>
      <input
        type="tel"
        id="mobile"
        class="form-input"
        placeholder="3001234567"
        required=""
        autocomplete="tel"
        name="telefono" />
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="paisResidencia" class="form-label required">País de residencia</label>
      <div class="select-wrapper">
        <select
          id="00N7j000002BY1c"
          name="paisResidencia"
          class="form-select"
          required="">
          <option value="">Cargando países...</option>
        </select>
      </div>
    </div>
  </div>
  <div class="form-row location-row" id="location-row" style="display:none">
    <div class="form-group form-group-half">
      <label for="departamento" class="form-label required">Departamento</label>
      <div class="select-wrapper">
        <select
          id="d00N7j000002BY1h"
          name="departamento"
          class="form-select"
          required=""
          disabled="">
          <option value="">Selecciona departamento</option>
        </select>
      </div>
    </div>
    <div class="form-group form-group-half">
      <label for="ciudad" class="form-label required">Ciudad</label>
      <div class="select-wrapper">
        <select
          id="00N7j000002BY1i"
          name="ciudad" class="form-select"
          required=""
          disabled="">
          <option value="">Selecciona ciudad</option>
        </select>
      </div>
    </div>
  </div>
  <div class="form-row">
    <div class="form-group">
      <label for="periodoIngreso" class="form-label required">Período de Ingreso</label>
      <div class="select-wrapper">
        <select
          id="00N7j000002BY1i"
          name="periodoIngreso"
          class="form-select"
          required="">
          <option value="">Selecciona período</option>
          <option value="Primer semestre 2025">Primer semestre 2025</option>
          <option value="Segundo semestre 2025">Segundo semestre 2025</option>
          <option value="Primer semestre 2026">Primer semestre 2026</option>
        </select>
      </div>
    </div>
  </div>
  <div class="terms-group" id="terms-group">
    <input type="checkbox" id="terms" class="terms-checkbox" required="" name="terms" />
    <label for="terms" class="terms-label">
      ¿Autoriza usted el tratamiento de sus datos personales de acuerdo con la
      <!-- -->
      <a href="#" class="terms-link">autorización de privacidad</a>
      ?
    </label>
    <div class="radio-options">
      <label class="radio-label">
        <input type="radio" required="" name="autorizacion" value="si" />
        <span class="radio-custom"></span>
        Sí
      </label>
      <label class="radio-label">
        <input type="radio" required="" name="autorizacion" value="no" />
        <span class="radio-custom"></span>
        No
      </label>
    </div>
  </div>
  <div class="form-submit">
    <button
      data-dmpa-element-id="btn"
      class="btn btn-primary btn-solid btn-lg btn-full-width"
      aria-disabled="false"
      type="submit"
      data-lfr-editable-id="btn"
      data-lfr-editable-type="text">
      <span class="btn-text">Enviar</span>
    </button>
  </div>
</form>