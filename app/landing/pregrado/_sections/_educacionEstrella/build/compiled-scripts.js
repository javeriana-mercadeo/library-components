// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 02/09/2025, 02:44:50 p. m. (COT)

"use strict";
(() => {
  // app/landing/pregrado/_sections/_educacionEstrella/script.js
  var EducacionEstrellaRichTextSystem = {
    config: {
      richContentSelector: ".educacion-estrella-rich-content",
      sectionSelector: ".educacion-estrella"
    },
    // Procesar contenido enriquecido desde CMS o datos locales
    processRichContent() {
      const richContentElements = document.querySelectorAll(this.config.richContentSelector);
      if (richContentElements.length === 0) {
        console.log("[EducacionEstrellaRichText] No se encontraron elementos de contenido enriquecido");
        return;
      }
      console.log(`[EducacionEstrellaRichText] Procesando ${richContentElements.length} elementos`);
      richContentElements.forEach((element) => {
        let content = element.getAttribute("data-raw-content");
        if (content) {
          content = this.decodeHtmlEntities(content);
          if (!content.includes("<") && !content.includes("&lt;")) {
            content = content.replace(/\n\n/g, "</p><p>");
            content = content.replace(/\n/g, "<br>");
            content = "<p>" + content + "</p>";
          }
          element.innerHTML = content;
          console.log(`[EducacionEstrellaRichText] Elemento procesado: ${element.className}`);
        }
      });
    },
    // Decodificador HTML avanzado (basado en el sistema FAQ)
    decodeHtmlEntities(text) {
      const textarea = document.createElement("textarea");
      let decoded = text;
      let previousDecoded = "";
      for (let i = 0; i < 3 && decoded !== previousDecoded; i++) {
        previousDecoded = decoded;
        textarea.innerHTML = decoded;
        decoded = textarea.value;
      }
      return decoded;
    }
  };
  var initEducacionEstrella = () => {
    const tryInitialize = (attempts = 0) => {
      const sections = document.querySelectorAll(".educacion-estrella");
      if (sections.length === 0 && attempts < 20) {
        setTimeout(() => tryInitialize(attempts + 1), 100);
        return;
      }
      EducacionEstrellaRichTextSystem.processRichContent();
      console.log("[EducacionEstrella] Secci\xF3n inicializada correctamente");
    };
    tryInitialize();
  };
  var initializeEducacionEstrella = () => {
    if (typeof window !== "undefined" && false) {
      window.EducacionEstrellaRichTextSystem = EducacionEstrellaRichTextSystem;
      window.EducacionEstrellaSystem = EducacionEstrellaSystem;
    }
    initEducacionEstrella();
  };
  var script_default = initializeEducacionEstrella;
  if (typeof window !== "undefined") {
    initializeEducacionEstrella();
  }
})();
