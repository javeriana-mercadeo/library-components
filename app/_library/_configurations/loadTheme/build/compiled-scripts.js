// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 25/09/2025, 04:36:58 p. m. (COT)

"use strict";
(() => {
  // app/_library/_configurations/loadTheme/script.js
  var selectedTheme = configuration;
  var getGlobalUtils = () => {
    if (typeof window === "undefined") {
      console.warn("Window no disponible, usando fallbacks b\xE1sicos");
      return {
        StringUtils: {
          removeAccents: (str) => str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "",
          slugify: (str) => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-") || ""
        }
      };
    }
    return {
      StringUtils: window.StringUtils || {
        removeAccents: (str) => str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "") || "",
        slugify: (str) => str?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/[\s-]+/g, "-") || ""
      }
    };
  };
  var { StringUtils } = getGlobalUtils();
  try {
    let normalizeFacultyName = function(facultyName) {
      if (!facultyName || typeof facultyName !== "string") return "";
      let clean = facultyName.replace(/^Facultad de /i, "").trim();
      const facultyMappings = {
        "Cs.Econ\xF3micas y Administrativ.": "Ciencias Econ\xF3micas y Administrativas",
        "Cs.Econ\xF3micas y Administrativas": "Ciencias Econ\xF3micas y Administrativas",
        "Cs.Pol\xEDticas y Relaciones Int.": "Ciencias Pol\xEDticas y Relaciones Internacionales",
        "Arquitectura y Dise\xF1o": "Arquitectura y Dise\xF1o"
        // Agregar más mapeos según sea necesario
      };
      if (facultyMappings[clean]) {
        return facultyMappings[clean];
      }
      return clean;
    }, parseThemeBase = function(theme) {
      if (theme === "dark" || theme.endsWith("-dark")) {
        return "dark";
      }
      return "light";
    }, applyTheme = function(base, faculty) {
      const html = document.documentElement;
      html.setAttribute("data-theme-base", base);
      if (faculty === "default" || !faculty) {
        html.removeAttribute("data-theme-faculty");
      } else {
        html.setAttribute("data-theme-faculty", faculty);
      }
      window.currentBase = currentBase;
      window.currentFaculty = currentFaculty;
      window.applyTheme = applyTheme;
      let combinedTheme;
      if (faculty === "default" || !faculty) {
        combinedTheme = base;
      } else {
        combinedTheme = base === "dark" ? `${faculty}-dark` : faculty;
      }
      html.setAttribute("data-theme", combinedTheme);
      const displayElement = document.getElementById("themeSelector");
      if (displayElement) {
        displayElement.textContent = `Tema seleccionado: ${combinedTheme}`;
      }
    };
    normalizeFacultyName2 = normalizeFacultyName, parseThemeBase2 = parseThemeBase, applyTheme2 = applyTheme;
    const rowBaseTheme = selectedTheme["themeBase"];
    const baseTheme = rowBaseTheme.startsWith("{") ? JSON.parse(rowBaseTheme).dataTheme : rowBaseTheme;
    const rowFacultyTheme = selectedTheme["themeFaculty"];
    const facultyTheme = rowFacultyTheme.startsWith("{") ? JSON.parse(rowFacultyTheme).dataTheme : rowFacultyTheme;
    let currentBase = baseTheme || "light";
    let currentFaculty = facultyTheme || "default";
    document.addEventListener("data_load-program", function(event) {
      const { facultad } = event.detail.dataProgram;
      if (facultad && currentFaculty === "default") {
        const normalizedFaculty = normalizeFacultyName(facultad);
        const facultySlug = StringUtils.slugify(normalizedFaculty);
        currentFaculty = facultySlug;
        applyTheme(currentBase, currentFaculty);
      }
    });
    currentBase = parseThemeBase(baseTheme);
    if (facultyTheme && facultyTheme !== "default") {
      currentFaculty = facultyTheme;
    }
    applyTheme(currentBase, currentFaculty);
  } catch (error) {
    console.error("Error en la configuraci\xF3n del tema:", error);
  }
  var normalizeFacultyName2;
  var parseThemeBase2;
  var applyTheme2;
})();
