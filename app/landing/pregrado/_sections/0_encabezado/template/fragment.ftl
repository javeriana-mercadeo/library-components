<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<link
  rel="preload"
  as="image"
  href="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-blue" />
<link
  rel="preload"
  as="image"
  href="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white" />
<header class="header">
  <div class="container header__container">
    <figure class="logo logo--horizontal">
      <img
        src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-blue"
        alt="Logo Javeriana horizontal"
        class="logo-image light" />
      <img
        src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white"
        alt="Logo Javeriana horizontal"
        class="logo-image dark" />
    </figure>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li>
          <a
            data-dmpa-element-id="btn"
            class="btn btn-primary btn-light"
            aria-disabled="false"
            href="#"
            data-senna-off="true">
            <span class="btn-text">Centro de Ayuda</span>
          </a>
        </li>
      </ul>
    </nav>
    <div class="header__cta">
      <button
        data-modal-target="contact-modal"
        data-dmpa-element-id="btn"
        class="btn btn-primary btn-faded"
        aria-disabled="false"
        type="button">
        <span class="btn-text">Recibe más Información</span>
      </button>
      <button
        data-dmpa-element-id="btn"
        class="btn btn-primary btn-solid"
        aria-disabled="false"
        type="button">
        <span class="btn-text">¡Inscríbete Ahora!</span>
      </button>
    </div>
    <button
      aria-label="Abrir menú de navegación"
      data-dmpa-element-id="btn"
      class="btn btn-primary btn-light header__menu-toggle"
      aria-disabled="false"
      type="button">
      <span class="btn-text">
        <div class="menu-icon" id="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </span>
    </button>
    <div class="header__overlay" id="menu-overlay"></div>
    <div class="header__mobile-menu" id="mobile-menu">
      <div class="header__mobile-menu-content">
        <figure class="logo logo--horizontal">
          <img
            src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-blue"
            alt="Logo Javeriana horizontal"
            class="logo-image light" />
          <img
            src="https://www.javeriana.edu.co/recursosdb/d/info-prg/logo-jave-h-white"
            alt="Logo Javeriana horizontal"
            class="logo-image dark" />
        </figure>
        <nav>
          <ul class="header__mobile-menu-list">
            <li>
              <a
                data-dmpa-element-id="btn"
                class="btn btn-primary btn-light header__mobile-menu-link"
                aria-disabled="false"
                href="#"
                data-senna-off="true">
                <span class="btn-icon btn-icon-start"><i class="ph ph-clipboard-text"></i></span>
                <span class="btn-text">Proceso de Inscripción</span>
              </a>
            </li>
            <li>
              <a
                data-dmpa-element-id="btn"
                class="btn btn-primary btn-light header__mobile-menu-link"
                aria-disabled="false"
                href="#"
                data-senna-off="true">
                <span class="btn-icon btn-icon-start"><i class="ph ph-question"></i></span>
                <span class="btn-text">Centro de Ayuda</span>
              </a>
            </li>
            <li>
              <a
                data-dmpa-element-id="btn"
                class="btn btn-primary btn-light header__mobile-menu-link whats"
                aria-disabled="false"
                href="#"
                data-senna-off="true">
                <span class="btn-icon btn-icon-start"><i class="ph ph-whatsapp-logo"></i></span>
                <span class="btn-text">Escríbenos por WhatsApp</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</header>
<div class="mobile-cta-fixed">
  <div class="container mobile-cta-fixed__container">
    <a
      data-dmpa-element-id="btn"
      class="btn btn-primary btn-solid btn-full-width mobile-cta-fixed__btn"
      aria-disabled="false"
      href="#"
      data-senna-off="true">
      <span class="btn-text">¡Inscríbete Ahora!</span>
    </a>
    <button
      data-modal-target="contact-modal"
      data-dmpa-element-id="btn"
      class="btn btn-primary btn-faded btn-full-width mobile-cta-fixed__btn"
      aria-disabled="false"
      type="button">
      <span class="btn-text">Recibe más Información</span>
    </button>
  </div>
</div>
<div class="modal-overlay" id="modal-overlay">
  <div
    class="contact-modal justify-center items-center"
    id="contact-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-title">
    <div
      class="modal-image"
      style='background-image:url("https://bienalsca.co/wp-content/uploads/2022/11/APR2085.jpg")'></div>
    <div class="modal-form-container">
      <div class="modal-header">
        <button
          class="modal-header__close btn"
          id="modal-close"
          aria-label="Cerrar modal"
          type="button"></button>
      </div>
      <div class="modal-content">
        <div class="form-intro">
          <h3 class="title title-primary title-2xl title-bold">¿Tienes dudas?</h3>
          <p class="form-intro__subtitle">
            Déjanos tus datos y te contactaremos para brindarte toda la información.
          </p>
        </div>
        <lfr-widget-web-content id="widget1"></lfr-widget-web-content>
      </div>
    </div>
  </div>
</div>