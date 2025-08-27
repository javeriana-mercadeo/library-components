// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 15/08/2025, 07:15:34 a. m. (COT)

"use strict";
(() => {
  // app/_library/components/footer/script.js
  var script_default = () => {
    const FOOTER_CONFIG = {
      logSettings: {
        enableLogs: false
        // Control maestro - cambiar a true para activar TODOS los logs
      },
      updateSettings: {
        intervalMinutes: 1,
        // Intervalo de actualización en minutos
        enableAutoUpdate: true
        // Habilitar actualización automática
      }
    };
    function logMessage(message, ...args) {
      if (FOOTER_CONFIG.logSettings.enableLogs) {
        console.log(message, ...args);
      }
    }
    logMessage("\u{1F4E6} [FOOTER] Script cargado - iniciando sistema de copyright din\xE1mico...");
    const updateCopyrightYear = () => {
      const copyrightElement = document.querySelector("#footer .footer__bottom p:not(.footer__info)");
      if (copyrightElement) {
        const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        const previousText = copyrightElement.textContent;
        const copyrightText = `Copyright \xA9 ${currentYear} Pontificia Universidad Javeriana`;
        logMessage(`\u{1F5D3}\uFE0F  [FOOTER] A\xF1o actual detectado: ${currentYear}`);
        logMessage(`\u{1F4DD} [FOOTER] Texto anterior: "${previousText}"`);
        logMessage(`\u2728 [FOOTER] Nuevo texto: "${copyrightText}"`);
        if (copyrightElement.textContent !== copyrightText) {
          copyrightElement.textContent = copyrightText;
        } else {
          logMessage(`\u2139\uFE0F  [FOOTER] El copyright ya est\xE1 actualizado con el a\xF1o ${currentYear}`);
        }
      } else {
        logMessage("\u274C [FOOTER] Elemento de copyright no encontrado");
      }
    };
    const initializeFooter = () => {
      updateCopyrightYear();
      if (FOOTER_CONFIG.updateSettings.enableAutoUpdate) {
        const intervalMs = FOOTER_CONFIG.updateSettings.intervalMinutes * 60 * 1e3;
        logMessage(`\u23F0 [FOOTER] Configurando actualizaci\xF3n autom\xE1tica cada ${FOOTER_CONFIG.updateSettings.intervalMinutes} minuto(s)`);
        setInterval(updateCopyrightYear, intervalMs);
      } else {
        logMessage("\u23F8\uFE0F  [FOOTER] Actualizaci\xF3n autom\xE1tica deshabilitada");
      }
    };
    const checkAndInit = () => {
      if (typeof window !== "undefined") {
        logMessage("\u{1F310} [FOOTER] Window disponible, iniciando footer...");
        initializeFooter();
      } else {
        logMessage("\u23F3 [FOOTER] Window no disponible, reintentando en 300ms...");
        setTimeout(checkAndInit, 300);
      }
    };
    checkAndInit();
  };
})();
