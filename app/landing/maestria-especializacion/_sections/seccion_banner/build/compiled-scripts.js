// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 10/10/2025, 10:42:34 a. m. (COT)

"use strict";
(() => {
  // app/landing/maestria-especializacion/_sections/_seccion_banner/script.js
  (function() {
    "use strict";
    const CONFIG = {
      SELECTORS: {
        root: ".mastership-banner",
        modalTrigger: "[data-modal-target]",
        modalClose: ".program-detail-modal__close",
        modal: ".program-detail-modal"
      },
      CLASSES: {
        modalActive: "program-detail-modal--active"
      }
    };
    let systemState = {
      initialized: false,
      activeModal: null
    };
    const ModalSystem = {
      init() {
        this.setupEventListeners();
      },
      setupEventListeners() {
        document.addEventListener("click", (e) => {
          const trigger = e.target.closest(CONFIG.SELECTORS.modalTrigger);
          if (trigger) {
            e.preventDefault();
            const modalId = trigger.getAttribute("data-modal-target");
            this.openModal(modalId);
          }
          const closeBtn = e.target.closest(CONFIG.SELECTORS.modalClose);
          if (closeBtn) {
            e.preventDefault();
            this.closeModal();
          }
          if (e.target.classList.contains("program-detail-modal") && e.target.classList.contains(CONFIG.CLASSES.modalActive)) {
            this.closeModal();
          }
        });
        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && systemState.activeModal) {
            this.closeModal();
          }
        });
      },
      openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add(CONFIG.CLASSES.modalActive);
          document.body.style.overflow = "hidden";
          systemState.activeModal = modalId;
          const closeButton = modal.querySelector(CONFIG.SELECTORS.modalClose);
          if (closeButton) {
            setTimeout(() => closeButton.focus(), 100);
          }
          console.log("Maestria: Modal abierto:", modalId);
        }
      },
      closeModal() {
        if (systemState.activeModal) {
          const modal = document.getElementById(systemState.activeModal);
          if (modal) {
            modal.classList.remove(CONFIG.CLASSES.modalActive);
          }
        }
        document.body.style.overflow = "";
        systemState.activeModal = null;
        console.log("Maestria: Modal cerrado");
      }
    };
    function initializeSystem() {
      if (systemState.initialized) return;
      const root = document.querySelector(CONFIG.SELECTORS.root);
      if (!root)
        ModalSystem.init();
      systemState.initialized = true;
    }
    window.MastershipSystem = {
      init: initializeSystem,
      openModal: ModalSystem.openModal.bind(ModalSystem),
      closeModal: ModalSystem.closeModal.bind(ModalSystem),
      getState: () => ({ ...systemState })
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeSystem);
    } else {
      initializeSystem();
    }
    setTimeout(initializeSystem, 100);
    console.log("Maestria: Script cargado");
  })();
  function initMastership() {
    if (window.MastershipSystem) {
      window.MastershipSystem.init();
    }
  }
})();
