// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 29/09/2025, 03:31:12 p. m. (COT)

"use strict";
(() => {
  // app/_library/components/header/headerManager.js
  var MobileMenu = {
    // Namespace específico para evitar conflictos
    namespace: "puj-mobile-menu",
    initialized: false,
    init() {
      if (this.initialized) {
        return true;
      }
      if (typeof window === "undefined" || !window.DOMUtils || !window.Logger || !window.EventManager) {
        return false;
      }
      this.mobileMenu = DOMUtils.findElement("#mobile-menu");
      this.menuOverlay = DOMUtils.findElement("#menu-overlay");
      this.menuIcon = DOMUtils.findElement("#menu-icon");
      this.triggers = DOMUtils.findElements('[data-menu-target="mobile-menu"]');
      if (this.triggers.length === 0) {
        const fallbackTrigger = DOMUtils.findElement("#menu-toggle");
        if (fallbackTrigger) {
          this.triggers = [fallbackTrigger];
        }
      }
      const uniqueTriggers = [];
      const seenElements = /* @__PURE__ */ new Set();
      this.triggers.forEach((trigger) => {
        if (!seenElements.has(trigger)) {
          seenElements.add(trigger);
          uniqueTriggers.push(trigger);
        }
      });
      this.triggers = uniqueTriggers;
      if (this.triggers.length === 0 || !this.mobileMenu) {
        return false;
      }
      this.setupEventListeners();
      this.setupKeyboardNavigation();
      this.setupLinkHandlers();
      this.initialized = true;
      return true;
    },
    setupEventListeners() {
      this.triggers.forEach((trigger) => {
        EventManager.add(trigger, "click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = this.mobileMenu.classList.contains("show");
          if (isOpen) {
            this.close();
          } else {
            this.open();
          }
        });
      });
      if (this.menuOverlay) {
        EventManager.add(this.menuOverlay, "click", (e) => {
          if (e.target === this.menuOverlay && !e.defaultPrevented) {
            e.preventDefault();
            this.close();
          }
        });
      }
      EventManager.add(this.mobileMenu, "click", (e) => {
        e.stopPropagation();
      });
    },
    setupKeyboardNavigation() {
      EventManager.add(document, "keydown", (e) => {
        if (e.key === "Escape" && this.mobileMenu && this.mobileMenu.classList.contains("show") && this.mobileMenu.id === "mobile-menu") {
          this.close();
        }
      });
    },
    setupLinkHandlers() {
      const menuLinks = DOMUtils.findElements("a", this.mobileMenu);
      menuLinks.forEach((link) => {
        EventManager.add(link, "click", () => {
          this.close();
        });
      });
    },
    open() {
      DOMUtils.toggleClasses(this.mobileMenu, ["show"], true);
      if (this.menuOverlay) {
        DOMUtils.toggleClasses(this.menuOverlay, ["active"], true);
      }
      TimingUtils.delay(() => {
        DOMUtils.toggleClasses(this.mobileMenu, ["active"], true);
        if (this.menuIcon) {
          DOMUtils.toggleClasses(this.menuIcon, ["active"], true);
        }
      }, 10);
    },
    close() {
      if (this.menuIcon) {
        DOMUtils.toggleClasses(this.menuIcon, ["active"], false);
      }
      DOMUtils.toggleClasses(this.mobileMenu, ["active"], false);
      TimingUtils.delay(() => {
        DOMUtils.toggleClasses(this.mobileMenu, ["show"], false);
        if (this.menuOverlay) {
          DOMUtils.toggleClasses(this.menuOverlay, ["active"], false);
        }
      }, 300);
    },
    cleanup() {
      this.initialized = false;
      if (typeof window !== "undefined" && window.EventManager) {
        EventManager.cleanup();
      }
    }
  };
  var ContactModal = {
    // Namespace específico para evitar conflictos
    namespace: "puj-contact-modal",
    initialized: false,
    init() {
      if (this.initialized) {
        return true;
      }
      if (typeof window === "undefined" || !window.DOMUtils || !window.Logger || !window.EventManager) {
        return false;
      }
      this.modal = DOMUtils.findElement("#contact-modal");
      this.overlay = DOMUtils.findElement("#modal-overlay");
      this.closeBtn = null;
      this.form = DOMUtils.findElement("#contact-form");
      this.triggers = DOMUtils.findElements('[data-modal-target="contact-modal"]');
      if (this.modal && !this.modal.classList.contains("contact-modal")) {
        return false;
      }
      if (!this.modal || !this.overlay) {
        return false;
      }
      this.setupEventListeners();
      this.initialized = true;
      return true;
    },
    setupEventListeners() {
      this.triggers.forEach((trigger) => {
        EventManager.add(trigger, "click", (e) => {
          e.preventDefault();
          this.open();
        });
      });
      this.setupCloseButton();
      EventManager.add(this.overlay, "click", (e) => {
        if (e.target === this.overlay && !e.defaultPrevented) {
          e.preventDefault();
          this.close();
        }
        const isOurModal = e.target.closest("#contact-modal.contact-modal");
        const isCloseButton = e.target.id === "modal-close" || e.target.closest("#modal-close") || e.target.closest(".modal-header button") || e.target.matches("button") && e.target.closest(".modal-header");
        if (isOurModal && isCloseButton) {
          e.preventDefault();
          e.stopPropagation();
          this.close();
        }
      });
      EventManager.add(this.modal, "click", (e) => {
        e.stopPropagation();
      });
      EventManager.add(document, "keydown", (e) => {
        if (e.key === "Escape" && this.modal && this.modal.classList.contains("show") && this.modal.classList.contains("contact-modal")) {
          this.close();
        }
      });
    },
    setupCloseButton() {
      const findAndSetupCloseButton = () => {
        const closeBtn = DOMUtils.findElement("#modal-close", this.modal) || DOMUtils.findElement(".modal-header button", this.modal);
        if (closeBtn) {
          if (!closeBtn.hasAttribute(`data-${this.namespace}-setup`)) {
            EventManager.add(closeBtn, "click", (e) => {
              e.preventDefault();
              e.stopPropagation();
              this.close();
            });
            closeBtn.setAttribute(`data-${this.namespace}-setup`, "true");
          }
          return true;
        }
        return false;
      };
      if (findAndSetupCloseButton()) {
        return;
      }
      TimingUtils.delay(() => {
        if (findAndSetupCloseButton()) {
          return;
        }
        TimingUtils.delay(() => {
          if (!findAndSetupCloseButton()) {
          }
        }, 200);
      }, 50);
    },
    async open() {
      DOMUtils.toggleClasses(this.modal, ["show"], true);
      DOMUtils.toggleClasses(this.overlay, ["active"], true);
      DOMUtils.toggleClasses(document.body, ["modal-open"], true);
      TimingUtils.delay(() => {
        DOMUtils.toggleClasses(this.modal, ["active"], true);
      }, 10);
      TimingUtils.delay(() => {
        this.setupCloseButton();
      }, 50);
      this.initializeForm();
    },
    async initializeForm() {
      if (typeof window !== "undefined" && window.ModalFormManager) {
        try {
          await window.ModalFormManager.initLocationData();
          TimingUtils.delay(() => {
            window.ModalFormManager.initFormAnimations();
          }, 50);
          TimingUtils.delay(() => {
            const firstInput = DOMUtils.findElement('input:not([type="radio"]):not([type="checkbox"])', this.modal);
            if (firstInput) firstInput.focus();
          }, 100);
          if (this.form) {
            window.ModalFormManager.setupFormValidation(this.form);
          }
        } catch (error) {
          if (typeof Logger !== "undefined" && Logger.error) {
            Logger.error("\u{1F4CB} [MODAL] Error al inicializar formulario:", error);
          } else {
            console.error("Error al inicializar formulario del modal:", error);
          }
        }
      }
    },
    close() {
      DOMUtils.toggleClasses(this.modal, ["active"], false);
      if (this.modal) {
        this.modal.classList.remove("program-detail-modal--active");
        const modalClasses = Array.from(this.modal.classList).filter((cls) => cls.includes("modal") && cls.includes("active"));
        modalClasses.forEach((cls) => this.modal.classList.remove(cls));
      }
      TimingUtils.delay(() => {
        DOMUtils.toggleClasses(this.modal, ["show"], false);
        DOMUtils.toggleClasses(this.overlay, ["active"], false);
        DOMUtils.toggleClasses(document.body, ["modal-open"], false);
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.width = "";
        document.body.style.height = "";
        this.modal.style.transform = "";
        this.modal.style.opacity = "";
        this.modal.style.visibility = "";
        this.modal.style.pointerEvents = "";
        this.overlay.style.opacity = "";
        this.overlay.style.visibility = "";
        this.overlay.style.pointerEvents = "";
        if (this.modal && this.modal.classList.contains("contact-modal")) {
          this.modal.classList.remove("program-detail-modal--active", "show", "active");
        }
        if (this.overlay) {
          this.overlay.classList.remove("active");
        }
        this.overlay.offsetHeight;
      }, 200);
    },
    cleanup() {
      this.initialized = false;
      if (typeof window !== "undefined" && window.EventManager) {
        EventManager.cleanup();
      }
    }
  };
  var HeaderManager = {
    // Namespace principal del header
    namespace: "puj-header-manager",
    init() {
      const systems = {
        mobileMenu: MobileMenu.init(),
        contactModal: ContactModal.init()
      };
      return systems;
    },
    cleanup() {
      MobileMenu.cleanup();
      ContactModal.cleanup();
      if (typeof window !== "undefined" && window.EventManager) {
        EventManager.cleanup();
      }
    }
  };

  // app/_library/components/header/script.js
  function waitForGlobalUtils() {
    return new Promise((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 100;
      const checkUtils = () => {
        attempts++;
        if (typeof window !== "undefined" && (window.__GLOBAL_UTILS_LOADED__ || window.Logger && window.DOMUtils && window.EventManager && window.TimingUtils)) {
          resolve(true);
        } else if (attempts >= maxAttempts) {
          console.warn("\u26A0\uFE0F Utilidades globales no disponibles, usando fallback local");
          createFallbackUtils();
          resolve(true);
        } else {
          setTimeout(checkUtils, 10);
        }
      };
      checkUtils();
    });
  }
  function createFallbackUtils() {
    if (typeof window === "undefined") return;
    if (!window.Logger) {
      window.Logger = {
        debug: (msg, ...args) => console.log(`\u{1F50D} [DEBUG] ${msg}`, ...args),
        info: (msg, ...args) => console.log(`\u2139\uFE0F [INFO] ${msg}`, ...args),
        success: (msg, ...args) => console.log(`\u2705 [SUCCESS] ${msg}`, ...args),
        warning: (msg, ...args) => console.warn(`\u26A0\uFE0F [WARNING] ${msg}`, ...args),
        error: (msg, ...args) => console.error(`\u274C [ERROR] ${msg}`, ...args)
      };
    }
    if (!window.DOMUtils) {
      window.DOMUtils = {
        findElement: (selector, context = document) => context?.querySelector(selector) || null,
        findElements: (selector, context = document) => Array.from(context?.querySelectorAll(selector) || []),
        toggleClasses: (element, classes, force = null) => {
          if (!element) return;
          classes.forEach((className) => {
            if (force === null) {
              element.classList.toggle(className);
            } else {
              element.classList.toggle(className, force);
            }
          });
        },
        isReady: (callback) => {
          if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", callback);
          } else {
            callback();
          }
        }
      };
    }
    if (!window.EventManager) {
      window.EventManager = {
        listeners: /* @__PURE__ */ new Map(),
        add: (element, event, handler, options = {}) => {
          if (!element) return false;
          const key = `${element.constructor.name}-${event}-${Date.now()}`;
          element.addEventListener(event, handler, options);
          return key;
        },
        cleanup: () => console.log("EventManager cleanup called")
      };
    }
    if (!window.TimingUtils) {
      window.TimingUtils = {
        delay: (callback, ms = 0) => setTimeout(callback, ms)
      };
    }
    window.__GLOBAL_UTILS_LOADED__ = true;
  }
  var AppSystem = {
    init() {
      try {
        const systems = {
          mobileMenu: this.initMobileMenu(),
          contactModal: this.initContactModal(),
          modalForm: this.initModalForm()
        };
        const activeSystems = Object.entries(systems).filter(([_, isActive]) => isActive).map(([name]) => name);
        return systems;
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.error) {
          Logger.error("\u274C [HEADER] Error al inicializar:", error);
        } else {
          console.error("\u274C [HEADER] Error al inicializar:", error);
        }
        return {
          mobileMenu: false,
          contactModal: false,
          modalForm: false
        };
      }
    },
    initMobileMenu() {
      try {
        return HeaderManager.init().mobileMenu || false;
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.error) {
          Logger.error("Error en mobile menu:", error);
        } else {
          console.error("Error en mobile menu:", error);
        }
        return false;
      }
    },
    initContactModal() {
      try {
        return HeaderManager.init().contactModal || false;
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.error) {
          Logger.error("Error en contact modal:", error);
        } else {
          console.error("Error en contact modal:", error);
        }
        return false;
      }
    },
    initModalForm() {
      try {
        return true;
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.error) {
          Logger.error("Error en modal form:", error);
        } else {
          console.error("Error en modal form:", error);
        }
        return false;
      }
    },
    cleanup() {
      try {
        if (window.HeaderManager) HeaderManager.cleanup();
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.debug) {
          Logger.debug("Cleanup warning:", error);
        } else {
          console.debug("Cleanup warning:", error);
        }
      }
    }
  };
  function initHeaderSystem() {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }
    const initWhenReady = () => {
      try {
        waitForGlobalUtils().then(() => {
          setTimeout(() => {
            AppSystem.init();
          }, 100);
        }).catch(() => {
          setTimeout(() => {
            AppSystem.init();
          }, 100);
        });
        window.addEventListener("beforeunload", AppSystem.cleanup);
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.error) {
          Logger.error("\u274C [INIT] Error al inicializar:", error);
        } else {
          console.error("\u274C [INIT] Error al inicializar:", error);
        }
      }
    };
    if (typeof DOMUtils !== "undefined" && DOMUtils.isReady) {
      DOMUtils.isReady(initWhenReady);
    } else {
      if (typeof document !== "undefined") {
        if (document.readyState === "loading") {
          document.addEventListener("DOMContentLoaded", initWhenReady);
        } else {
          initWhenReady();
        }
      }
    }
  }
  if (typeof module === "undefined" && typeof window !== "undefined") {
    initHeaderSystem();
  }
  if (typeof window !== "undefined") {
    window.initHeaderSystem = initHeaderSystem;
  }
  var script_default = initHeaderSystem;
})();
