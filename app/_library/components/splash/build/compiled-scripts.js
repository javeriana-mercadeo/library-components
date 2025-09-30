// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 30/09/2025, 10:09:01 a. m. (COT)

"use strict";
(() => {
  // app/_library/components/splash/script.js
  function initSplash() {
    const splash = document.getElementById("splash");
    if (splash) {
      let isHidden = false;
      const codProgram = typeof configuration !== "undefined" && configuration?.["codeProgram"] || null;
      const hideSplash = () => {
        if (isHidden) return;
        isHidden = true;
        splash.classList.add("hidden");
        setTimeout(() => {
          splash.style.display = "none";
        }, 300);
      };
      if (!codProgram) {
        setTimeout(() => {
          hideSplash();
        }, 1e3);
      } else {
        document.addEventListener("data_load-program", hideSplash, { once: true });
        setTimeout(() => {
          hideSplash();
        }, 3e3);
      }
    } else {
      console.warn("\u{1F6AB} Elemento splash no encontrado");
    }
  }
  if (typeof module === "undefined" && typeof window !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initSplash);
    } else {
      initSplash();
    }
  }
  if (typeof window !== "undefined") {
    window.initSplash = initSplash;
  }
  var script_default = initSplash;
})();
