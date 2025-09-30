// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 08/09/2025, 11:14:17 a. m. (COT)

"use strict";
(() => {
  // app/_library/components/header_simple/headerManager.js
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
  var HeaderManager = {
    // Namespace principal del header
    namespace: "puj-header-manager",
    init() {
      const systems = {
        mobileMenu: MobileMenu.init()
      };
      return systems;
    },
    cleanup() {
      MobileMenu.cleanup();
      if (typeof window !== "undefined" && window.EventManager) {
        EventManager.cleanup();
      }
    }
  };

  // app/_library/components/header_simple/script.js
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
          mobileMenu: this.initMobileMenu()
        };
        const activeSystems = Object.entries(systems).filter(([_, isActive]) => isActive).map(([name]) => name);
        return systems;
      } catch (error) {
        console.error("\u274C [HEADER] Error al inicializar:", error);
        return {
          mobileMenu: false
        };
      }
    },
    initMobileMenu() {
      try {
        return HeaderManager.init().mobileMenu || false;
      } catch (error) {
        console.error("Error en mobile menu:", error);
        return false;
      }
    },
    cleanup() {
      try {
        if (window.HeaderManager) HeaderManager.cleanup();
      } catch (error) {
        console.debug("Cleanup warning:", error);
      }
    }
  };
  function initHeaderSystem() {
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
        console.error("\u274C [INIT] Error al inicializar:", error);
      }
    };
    if (typeof DOMUtils !== "undefined" && DOMUtils.isReady) {
      DOMUtils.isReady(initWhenReady);
    } else {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initWhenReady);
      } else {
        initWhenReady();
      }
    }
  }
  if (typeof module === "undefined") {
    initHeaderSystem();
  }
  if (typeof window !== "undefined") {
    window.initHeaderSystem = initHeaderSystem;
  }
  var script_default = initHeaderSystem;
})();
