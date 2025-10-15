const fragment = fragmentElement;

if (!isEditMode) {
  // Configurar evento para abrir modal
  setupModalEvent('[data-modal]', 'click', element => {
    const modal = fragment.querySelector(element.target.dataset.modal);
    openEducationalModal(modal);
    console.log('Educational modal opened:', modal);
  });

  // Configurar evento para cerrar modal
  setupModalEvent('.educational-modal-close', 'click', element => {
    const modal = element.target.closest('.educational-modal-overlay');
    closeEducationalModal(modal);
  });

  // Prevenir cierre al hacer clic en el contenido del modal
  setupModalEvent('.educational-modal-content', 'click', element => {
    element.stopPropagation();
  });

  // Cerrar modal al hacer clic en el overlay
  setupModalEvent('.educational-modal-overlay', 'click', element => {
    closeEducationalModal(element.target);
  });

  // Cerrar modal al hacer clic en el botón de acción
  setupModalEvent('.program-content-btn', 'click', element => {
    const modal = element.target.closest('.educational-modal-overlay');
    closeEducationalModal(modal);
  });

  // Auto apertura del modal
  const autoModal = fragment.querySelector('.educational-modal-overlay');
  if (configuration.autoOpen) {
    openEducationalModal(autoModal);
  }

  // Mostrar/ocultar botón de apertura
  const showTriggerBtn = fragment.querySelector('.educational-modal-trigger');
  if (configuration.showOpenButton === false) {
    showTriggerBtn.style.display = 'none';
  }

  // Funciones de animación compatibles con Liferay
  function openEducationalModal(modal) {
    modal.style.display = 'flex';
    // Forzar repaint para activar la animación
    modal.offsetHeight;
    modal.classList.add('active');
  }

  function closeEducationalModal(modal) {
    modal.classList.remove('active');
    // Esperar a que termine la animación antes de ocultar
    setTimeout(() => {
      modal.style.display = 'none';
    }, 300);
  }

  function setupModalEvent(selector, event, callback) {
    fragment.querySelectorAll(selector).forEach(el => {
      el.addEventListener(event, callback);
    });
  }
}