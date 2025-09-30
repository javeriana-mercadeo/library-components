// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 25/09/2025, 04:25:08 p. m. (COT)

"use strict";
(() => {
  // app/_library/_configurations/loadProgram-v2/modules/utils.js
  var CONFIG = {
    EVENT_NAMES: {
      PROGRAM_DATA: "data_load-program",
      ALL_PROGRAMS: "data_load-program-all",
      WHATSAPP: "data_load-program-whatsapp"
    },
    API_ENDPOINTS: {
      JAVERIANA: "https://dti-pru.javeriana.edu.co/val-matricula/api/psujsfvaportals",
      SEARCH: "https://www.javeriana.edu.co/prg-api/searchpuj/general-search-program",
      WHATSAPP: "https://www.javeriana.edu.co/recursosdb/d/info-prg/whatsapps"
    },
    CACHE_TTL: 3e5,
    // 5 minutos
    RETRY_ATTEMPTS: 3,
    TIMEOUT: 1e4
  };
  var statusPage = {};
  if (typeof window !== "undefined") window.statusPage = statusPage;
  var updateStatus = (updates) => {
    statusPage = DataUtils.deepMerge(statusPage, updates);
    if (typeof window !== "undefined") window.statusPage = statusPage;
  };
  var dispatchEvent = (eventName, detail) => {
    EventManager.emit(document, eventName, detail);
  };
  var updateDisplay = (text, isError = false) => {
    const displayElement = DOMUtils.findElement("#code-program-configuration");
    if (displayElement) {
      displayElement.textContent = text;
      displayElement.style.color = isError ? "#dc3545" : "#28a745";
    }
    if (isError) {
      Logger.error(`Display: ${text}`);
    } else {
      Logger.info(`Display: ${text}`);
    }
  };

  // app/_library/_configurations/loadProgram-v2/modules/api-client.js
  var apiClient;
  var initializeApiClient = () => {
    apiClient = new HTTPClient("", {
      timeout: CONFIG.TIMEOUT,
      retries: CONFIG.RETRY_ATTEMPTS,
      retryDelay: 1e3,
      headers: {
        Accept: "application/json"
      }
    });
    return apiClient;
  };
  var fetchProgramData = async (codPrg) => {
    try {
      const response = await apiClient.get(`${CONFIG.API_ENDPOINTS.JAVERIANA}/filterprograma?codprograma=${codPrg}`);
      return response.data;
    } catch (error) {
      Logger.error(`Error obteniendo datos del programa ${codPrg}:`, error);
      throw new Error(`Error en API principal: ${error.message}`);
    }
  };
  var fetchAllPrograms = async () => {
    try {
      const response = await apiClient.post(CONFIG.API_ENDPOINTS.SEARCH, {
        query: "",
        visibilidad: "yes",
        tipoPrograma: "",
        areas: "",
        facultad: ""
      });
      return response.data;
    } catch (error) {
      Logger.error("Error obteniendo lista de programas:", error);
      throw new Error(`Error en API complementaria: ${error.message}`);
    }
  };
  var fetchWhatsApps = async () => {
    try {
      const response = await apiClient.get(CONFIG.API_ENDPOINTS.WHATSAPP);
      return response.data;
    } catch (error) {
      Logger.error("Error obteniendo configuraci\xF3n de WhatsApp:", error);
      throw new Error(`Error al cargar la configuraci\xF3n de WhatsApp: ${error.message}`);
    }
  };
  var processData = (programData, allPrograms, codPrg) => {
    const complementaryProgramData = allPrograms && Array.isArray(allPrograms) ? DataUtils.filterBy(allPrograms, { codigo: codPrg })[0] || null : null;
    const consolidatedData = {
      mainProgram: DataUtils.deepMerge(
        programData,
        complementaryProgramData ? DataUtils.pick(complementaryProgramData, ["metodologia", "duracion", "titulo"]) : {}
      ),
      complementaryProgram: complementaryProgramData,
      allPrograms,
      metadata: {
        timestamp: (/* @__PURE__ */ new Date()).toISOString(),
        programCode: codPrg,
        foundInComplementaryAPI: !!complementaryProgramData,
        totalPrograms: allPrograms ? allPrograms.length : 0,
        processingTime: performance.now()
      }
    };
    return consolidatedData;
  };

  // app/_library/_configurations/loadProgram-v2/modules/data-formatter.js
  var FacultyNormalizer = {
    normalize(facultyName) {
      if (!facultyName || typeof facultyName !== "string") return "";
      let clean = facultyName.replace(/^Facultad de /i, "").trim();
      const facultyMappings = {
        "Cs.Econ\xF3micas y Administrativ.": "Ciencias Econ\xF3micas y Administrativas",
        "Cs.Econ\xF3micas y Administrativas": "Ciencias Econ\xF3micas y Administrativas",
        "Cs.Pol\xEDticas y Relaciones Int.": "Ciencias Pol\xEDticas y Relaciones Internacionales",
        "Arquitectura y Dise\xF1o": "Arquitectura y Dise\xF1o"
      };
      return facultyMappings[clean] || clean;
    }
  };
  var LocationNormalizer = {
    normalize(locationName) {
      if (!locationName || typeof locationName !== "string") return "";
      const trimmed = typeof StringUtils !== "undefined" && StringUtils.trim ? StringUtils.trim(locationName) : locationName.trim();
      const locationMappings = {
        "Bogot\xE1 D.c.": "Bogot\xE1 D.C.",
        "Bogota D.c.": "Bogot\xE1 D.C.",
        "Bogota D.C.": "Bogot\xE1 D.C.",
        "BOGOT\xC1 D.c.": "Bogot\xE1 D.C.",
        "BOGOTA D.c.": "Bogot\xE1 D.C.",
        "bogot\xE1 d.c.": "Bogot\xE1 D.C."
      };
      return locationMappings[trimmed] || trimmed;
    }
  };
  var DataFormatter = {
    // Cache para números convertidos
    _numberWordsCache: /* @__PURE__ */ new Map(),
    // Diccionarios para conversión de números a palabras
    _numberDictionary: {
      units: [
        "",
        "uno",
        "dos",
        "tres",
        "cuatro",
        "cinco",
        "seis",
        "siete",
        "ocho",
        "nueve",
        "diez",
        "once",
        "doce",
        "trece",
        "catorce",
        "quince",
        "diecis\xE9is",
        "diecisiete",
        "dieciocho",
        "diecinueve"
      ],
      tens: ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"],
      hundreds: [
        "",
        "ciento",
        "doscientos",
        "trescientos",
        "cuatrocientos",
        "quinientos",
        "seiscientos",
        "setecientos",
        "ochocientos",
        "novecientos"
      ]
    },
    numberToWords(number) {
      if (this._numberWordsCache.has(number)) {
        return this._numberWordsCache.get(number);
      }
      const { units, tens, hundreds } = this._numberDictionary;
      const specialCases = { 0: "cero", 100: "cien", 1e3: "mil" };
      if (specialCases[number]) {
        this._numberWordsCache.set(number, specialCases[number]);
        return specialCases[number];
      }
      let result = "";
      let remaining = number;
      if (remaining >= 1e3) {
        const thousands = Math.floor(remaining / 1e3);
        result += thousands === 1 ? "mil " : `${this.numberToWords(thousands)} mil `;
        remaining %= 1e3;
      }
      if (remaining >= 100) {
        result += hundreds[Math.floor(remaining / 100)] + " ";
        remaining %= 100;
      }
      if (remaining >= 20) {
        const tensDigit = Math.floor(remaining / 10);
        const unitsDigit = remaining % 10;
        result += tens[tensDigit] + (unitsDigit > 0 ? ` y ${units[unitsDigit]}` : "");
      } else if (remaining > 0) {
        result += units[remaining];
      }
      const finalResult = result.trim();
      this._numberWordsCache.set(number, finalResult);
      return finalResult;
    },
    formatUnit(unit, number) {
      if (!unit) return "";
      const unitLower = unit.toLowerCase();
      if (number === 1) {
        if (unitLower.endsWith("s")) {
          return unitLower.slice(0, -1);
        }
        return unitLower;
      } else {
        if (!unitLower.endsWith("s")) {
          return unitLower + "s";
        }
        return unitLower;
      }
    },
    formatDuration(duracion, unidadDuracion) {
      if (!duracion || !unidadDuracion) {
        return "";
      }
      try {
        const number = typeof duracion === "string" ? parseInt(duracion, 10) : duracion;
        if (isNaN(number) || number <= 0) {
          return `${duracion} ${unidadDuracion}`.trim();
        }
        const numberInWords = this.capitalizeFirst(this.numberToWords(number));
        const formattedUnit = this.formatUnit(unidadDuracion, number);
        return `${numberInWords} (${number}) ${formattedUnit}.`;
      } catch (error) {
        return `${duracion} ${unidadDuracion}`.trim();
      }
    },
    clearUpperUnions(title) {
      const connectors = [
        // Artículos
        "el",
        "la",
        "los",
        "las",
        "un",
        "una",
        "unos",
        "unas",
        // Preposiciones
        "de",
        "del",
        "al",
        "en",
        "con",
        "por",
        "para",
        "sin",
        "sobre",
        "bajo",
        "entre",
        "hacia",
        "hasta",
        "desde",
        "durante",
        "mediante",
        "ante",
        "tras",
        "seg\xFAn",
        "como",
        "a",
        // Conjunciones
        "y",
        "e",
        "o",
        "u",
        "pero",
        "mas",
        "sino",
        "aunque",
        // Otros conectores
        "que",
        "cual",
        "donde",
        "cuando"
      ];
      let result = title;
      connectors.forEach((connector) => {
        const regex = new RegExp(`\\b${connector}\\b`, "gi");
        result = result.replace(regex, (match, offset) => {
          return offset === 0 ? match : connector;
        });
      });
      return result;
    },
    capitalizeFirst(str) {
      if (typeof StringUtils !== "undefined" && StringUtils.capitalize) {
        return StringUtils.capitalize(str);
      }
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    capitalizeWords(str) {
      if (typeof StringUtils !== "undefined" && StringUtils.capitalizeWords) {
        return StringUtils.capitalizeWords(str);
      }
      let result = str.toLowerCase().replace(/(?:^|\s)([a-záéíóúüñ])/g, (match, letter) => {
        return match.replace(letter, letter.toUpperCase());
      });
      result = result.replace(/d\.c\./gi, "D.C.");
      result = result.replace(/D\.c\./g, "D.C.");
      return result;
    },
    formatProgramName(programName) {
      if (!programName || typeof programName !== "string") {
        return programName || "";
      }
      try {
        const trimmed = typeof StringUtils !== "undefined" && StringUtils.trim ? StringUtils.trim(programName) : programName.trim();
        const capitalized = this.capitalizeWords(trimmed);
        const formatted = this.clearUpperUnions(capitalized);
        return formatted;
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.warning) {
          Logger.warning("Error formateando nombre de programa:", error);
        } else {
          console.warn("Error formateando nombre de programa:", error);
        }
        return programName;
      }
    },
    formatCurrencyCOP(amount) {
      return new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
      }).format(amount).replace(/\$[\s\u00A0]+/g, "$");
    },
    cleanDate(dateString) {
      if (!dateString || typeof dateString !== "string") {
        return dateString || "";
      }
      try {
        const cleanedDate = dateString.trim();
        if (/^\d{4}-\d{2}-\d{2}/.test(cleanedDate)) {
          const date = new Date(cleanedDate);
          if (!isNaN(date.getTime())) {
            return date.toLocaleDateString("es-CO", {
              year: "numeric",
              month: "long",
              day: "numeric"
            });
          }
        }
        return cleanedDate;
      } catch (error) {
        if (typeof Logger !== "undefined" && Logger.warning) {
          Logger.warning("Error limpiando fecha:", error);
        } else {
          console.warn("Error limpiando fecha:", error);
        }
        return dateString;
      }
    }
  };

  // app/_library/_configurations/loadProgram-v2/modules/dom-updater.js
  var DOMUpdater = {
    updateElementsText(elementId, value) {
      try {
        const elements = DOMUtils.findElements(`[${elementId}]`);
        for (const element of elements) element.innerHTML = value;
      } catch (error) {
        Logger.error(`Error actualizando DOM para ${elementId}:`, error);
      }
    },
    updateElementsTextEditable(elementId, value) {
      try {
        const elements = DOMUtils.findElements(`[${elementId}]`);
        for (const element of elements) {
          const elementAutomatic = DOMUtils.findElements(".lead", element);
          if (elementAutomatic.length) {
            elementAutomatic.forEach((textLead) => {
              textLead.textContent = value;
            });
          }
        }
      } catch (error) {
        Logger.error(`Error actualizando DOM para ${elementId}:`, error);
      }
    },
    updateRegistrationDates(fechasData) {
      try {
        const containers = DOMUtils.findElements('[data-puj-registration-dates="true"]');
        if (!containers || containers.length === 0) {
          Logger.warning("Contenedor de fechas de registro no encontrado");
          return false;
        }
        containers.forEach((container) => {
          DOMUtils.empty(container);
          if (!fechasData || fechasData.length === 0) {
            const dateItem = DOMUtils.createElement("div", {
              className: "program-dates_date-item"
            });
            const messageElement = DOMUtils.createElement("p", {
              className: "paragraph paragraph-neutral paragraph-md program-dates_date-period",
              attributes: { "data-component": "paragraph" },
              textContent: "Pr\xF3xima apertura siguiente semestre"
            });
            dateItem.appendChild(messageElement);
            container.appendChild(dateItem);
            return;
          }
          fechasData.forEach((fecha) => {
            const dateItem = DOMUtils.createElement("div", {
              className: "program-dates_date-item"
            });
            const periodElement = DOMUtils.createElement("p", {
              className: "paragraph paragraph-neutral paragraph-md paragraph-bold program-dates_date-period",
              attributes: { "data-component": "paragraph" },
              textContent: `${DataFormatter.capitalizeFirst(fecha.descCiclo)}: `
            });
            const valueElement = DOMUtils.createElement("p", {
              className: "paragraph paragraph-neutral paragraph-md program-dates_date-value",
              attributes: { "data-component": "paragraph" },
              textContent: DataFormatter.cleanDate(fecha.fFinCierreLetra)
            });
            dateItem.appendChild(periodElement);
            dateItem.appendChild(valueElement);
            container.appendChild(dateItem);
          });
        });
        return true;
      } catch (error) {
        Logger.error("Error actualizando fechas de registro:", error);
        return false;
      }
    },
    updateElementsAttribute(elementId, attribute, value) {
      try {
        const elements = DOMUtils.findElements(`[${elementId}]`);
        for (const element of elements) {
          element.setAttribute(attribute, value);
        }
      } catch (error) {
        Logger.error(`Error actualizando atributo ${attribute} para ${elementId}:`, error);
      }
    },
    removeElements(elementId) {
      try {
        const elements = DOMUtils.findElements(`[${elementId}]`);
        if (elements && elements.length > 0) {
          for (const element of elements) {
            element.remove();
          }
          return true;
        }
        return false;
      } catch (error) {
        Logger.error(`Error eliminando elementos con ${elementId}:`, error);
        return false;
      }
    }
  };

  // app/_library/_configurations/loadProgram-v2/modules/program-processor.js
  var FIELD_CONFIGS = {
    basic: [
      // CAMPOS QUE SE MANTIENEN DESDE V1
      {
        dataKey: "facultad",
        selector: "data-puj-faculty",
        updateKey: "faculty",
        formatter: (val) => DataFormatter.formatProgramName(FacultyNormalizer.normalize(val))
      },
      {
        dataKey: "programa",
        selector: "data-puj-name",
        updateKey: "program",
        formatter: (val) => DataFormatter.formatProgramName(val)
      },
      {
        dataKey: "snies",
        selector: "data-puj-snies",
        updateKey: "snies",
        formatter: (val) => `SNIES ${val}`
      },
      {
        dataKey: "nivelAcad",
        selector: "data-puj-academic-level",
        updateKey: "level",
        formatter: (val) => DataFormatter.formatProgramName(val)
      },
      {
        dataKey: "costo",
        selector: "data-puj-price",
        updateKey: "price",
        formatter: (val) => `*${DataFormatter.formatCurrencyCOP(val)}`
      },
      {
        dataKey: "tipo",
        selector: "data-puj-type",
        updateKey: "type"
      },
      {
        dataKey: "periodicidad",
        selector: "data-puj-periodicity",
        updateKey: "periodicity",
        formatter: (val) => DataFormatter.capitalizeFirst(val)
      },
      // CAMPOS MODIFICADOS EN V2
      // V1: tituloOtorgado - Ahora maneja arrays de títulos
      {
        dataKey: "titulo",
        selector: "data-puj-title-graduation",
        updateKey: "degree",
        special: true
        // Marcado como especial para manejo personalizado
      },
      // V1: duracion + unidadDuracion
      {
        dataKey: "duracion",
        selector: "data-puj-duration",
        updateKey: "duration"
      },
      // V1: modalidad
      {
        dataKey: "metodologia",
        selector: "data-puj-modality",
        updateKey: "modality",
        formatter: (val) => DataFormatter.formatProgramName(val)
      },
      // CAMPOS NUEVOS EN V2
      {
        dataKey: "codPrograma",
        selector: "data-puj-code",
        updateKey: "programCode"
      },
      {
        dataKey: "area",
        selector: "data-puj-area",
        updateKey: "area"
      },
      {
        dataKey: "creditos",
        selector: "data-puj-credits",
        updateKey: "credits",
        formatter: (val) => `${val} cr\xE9ditos`
      },
      {
        dataKey: "url",
        selector: "data-puj-program-url",
        updateKey: "programUrl",
        method: "updateElementsAttribute",
        attribute: "href"
      },
      {
        dataKey: "urlImagen",
        selector: "data-puj-program-image",
        updateKey: "programImage",
        method: "updateElementsAttribute",
        attribute: "src"
      },
      {
        dataKey: "descripcion",
        selector: "data-puj-description",
        updateKey: "description"
      },
      // CAMPOS CON LÓGICA ESPECIAL (solo para referencia de selectores)
      {
        dataKey: "jornada",
        selector: "data-puj-clock",
        updateKey: "schedule",
        special: true
        // Marcador para indicar que requiere lógica especial
      },
      {
        dataKey: "ciudad_full",
        selector: "data-puj-full-location",
        updateKey: "city",
        special: true
      },
      {
        dataKey: "ciudad_simple",
        selector: "data-puj-simple-location",
        updateKey: "city",
        special: true
      }
    ],
    // NUEVA FUNCIONALIDAD V2: Acreditación de alta calidad - Usando un solo selector
    accreditation: [
      {
        dataKey: "accreditationData",
        selector: "data-puj-accreditation",
        updateKey: "accreditation",
        special: true
        // Marcador para indicar que requiere lógica especial
      }
    ],
    // NUEVA FUNCIONALIDAD V2: Registro calificado
    registration: [
      {
        dataKey: "registryData",
        selector: "data-puj-registry",
        updateKey: "registry",
        special: true
        // Marcador para indicar que requiere lógica especial
      }
    ]
  };
  var getSelector = (configKey, dataKey) => {
    const config = FIELD_CONFIGS[configKey]?.find((item) => item.dataKey === dataKey);
    return config?.selector;
  };
  var ProgramDataProcessor = {
    // Función auxiliar para manejar grupos de elementos relacionados
    _handleElementGroup(groupName, shouldShow, elements, automationUpdates) {
      if (shouldShow) {
        return;
      }
      let removedElements = false;
      elements.forEach((elementId) => {
        if (DOMUpdater.removeElements(elementId)) {
          removedElements = true;
        }
      });
      automationUpdates[groupName] = false;
      if (removedElements) {
        automationUpdates[`${groupName}ElementsRemoved`] = true;
      }
    },
    // Función auxiliar mejorada para actualizaciones simples de campos
    _updateField(value, selector, updateKey, automationUpdates, formatter = null, method = "updateElementsText", attribute = null) {
      if (!value) return false;
      const formattedValue = formatter ? formatter(value) : value;
      if (method === "updateElementsAttribute" && attribute) {
        DOMUpdater[method](selector, attribute, formattedValue);
      } else {
        DOMUpdater[method](selector, formattedValue);
      }
      automationUpdates[updateKey] = true;
      return true;
    },
    // Función especializada para procesar campos configurados desde FIELD_CONFIGS
    _processConfiguredFields(configKey, dataProgram, automationUpdates) {
      const configs = FIELD_CONFIGS[configKey];
      if (!configs) return;
      configs.forEach((config) => {
        const { dataKey, selector, updateKey, formatter, method, attribute, value, special } = config;
        if (special) return;
        const fieldValue = value !== void 0 ? value : dataProgram[dataKey];
        this._updateField(fieldValue, selector, updateKey, automationUpdates, formatter, method, attribute);
      });
    },
    // Función especializada para manejo de acreditación
    _processAccreditation(dataProgram, automationUpdates) {
      const { acredit, estadoAcredit, numResolAcredit, fechaIniAcredit, fechaFinAcredit, vigenciaAcredit, recuReposAcredit, obserAcredit } = dataProgram;
      const isAccreditationActive = acredit === "Activo" && estadoAcredit === "Activo";
      const accreditationSelector = "data-puj-accreditation";
      if (isAccreditationActive && numResolAcredit && fechaIniAcredit && fechaFinAcredit && vigenciaAcredit) {
        let accreditationText = `Resoluci\xF3n de Acreditaci\xF3n de Alta Calidad: ${numResolAcredit} del ${fechaIniAcredit}, vigente por ${vigenciaAcredit} a\xF1os, hasta el ${fechaFinAcredit}`;
        if (recuReposAcredit === true && obserAcredit && obserAcredit.trim()) {
          accreditationText += `. ${obserAcredit.trim()}`;
        }
        accreditationText += ` |`;
        DOMUpdater.updateElementsText(accreditationSelector, accreditationText);
        automationUpdates.accreditation = true;
      } else {
        const elements = DOMUtils.findElements(`[${accreditationSelector}]`);
        elements.forEach((element) => {
          const comment = document.createComment("Acreditaci\xF3n de Alta Calidad no disponible - Estado Inactivo");
          element.parentNode.insertBefore(comment, element);
          element.style.display = "none";
          element.textContent = "";
        });
        automationUpdates.accreditation = false;
      }
    },
    // Función especializada para manejo de registro calificado
    _processRegistration(dataProgram, automationUpdates) {
      const { estadoRegisCali, numResolRegisCali, fechaIniRegisCali, fechaFinRegisCali, modRegisCali, obserRegisCali } = dataProgram;
      const hasRegistration = estadoRegisCali && estadoRegisCali.toLowerCase() === "activo";
      const registrySelector = "data-puj-registry";
      if (hasRegistration && numResolRegisCali && fechaIniRegisCali && fechaFinRegisCali) {
        let registryText = `Resoluci\xF3n de Registro Calificado: ${numResolRegisCali} del ${fechaIniRegisCali}, vigente hasta el ${fechaFinRegisCali}`;
        if (modRegisCali === true && obserRegisCali && obserRegisCali.trim()) {
          registryText += `. ${obserRegisCali.trim()}`;
        }
        registryText += ` |`;
        DOMUpdater.updateElementsText(registrySelector, registryText);
        automationUpdates.registry = true;
      } else {
        const elements = DOMUtils.findElements(`[${registrySelector}]`);
        elements.forEach((element) => {
          const comment = document.createComment("Registro calificado no disponible - Estado Inactivo");
          element.parentNode.insertBefore(comment, element);
          element.style.display = "none";
          element.textContent = "";
        });
        automationUpdates.registry = false;
      }
    },
    // Función especializada para manejo de título otorgar con modal para textos largos
    _processTitleGraduation(dataProgram, automationUpdates) {
      const { titulo } = dataProgram;
      const titleSelector = "data-puj-title-graduation";
      if (!titulo) return;
      let titleText = "";
      let fullTitleText = "";
      if (Array.isArray(titulo)) {
        fullTitleText = titulo.join(" - ");
      } else {
        fullTitleText = DataFormatter.formatProgramName(titulo);
      }
      const MAX_CHAR_LIMIT = 50;
      const shouldShowModal = fullTitleText.length > MAX_CHAR_LIMIT;
      if (shouldShowModal) {
        titleText = fullTitleText.substring(0, MAX_CHAR_LIMIT) + "...";
        DOMUpdater.updateElementsText(titleSelector, titleText);
        const elements = DOMUtils.findElements(`[${titleSelector}]`);
        elements.forEach((element) => {
          element.setAttribute("data-modal-content", fullTitleText);
          element.setAttribute("data-show-modal", "true");
          element.setAttribute("title", fullTitleText);
        });
        automationUpdates.degree = true;
        automationUpdates.degreeModal = true;
      } else {
        DOMUpdater.updateElementsText(titleSelector, fullTitleText);
        automationUpdates.degree = true;
        automationUpdates.degreeModal = false;
      }
    },
    processAndUpdateDOM(dataProgram) {
      const { jornada, datosFechaCierreInscripcion, ciudad, acredit, estadoAcredit, estadoRegisCali } = dataProgram;
      let automationUpdates = {};
      this._processConfiguredFields("basic", dataProgram, automationUpdates);
      if (jornada) {
        DOMUpdater.updateElementsTextEditable(getSelector("basic", "jornada"), DataFormatter.formatProgramName(jornada));
        automationUpdates.schedule = true;
      }
      if (Array.isArray(datosFechaCierreInscripcion)) {
        DOMUpdater.updateRegistrationDates(datosFechaCierreInscripcion);
        automationUpdates.deadline = true;
      }
      if (ciudad) {
        const normalizedLocation = LocationNormalizer.normalize(ciudad);
        DOMUpdater.updateElementsText(getSelector("basic", "ciudad_full"), normalizedLocation);
        const simpleLocation = normalizedLocation === "Bogot\xE1 D.C." ? "Bogot\xE1" : normalizedLocation;
        DOMUpdater.updateElementsText(getSelector("basic", "ciudad_simple"), simpleLocation);
        automationUpdates.city = true;
      }
      this._processAccreditation(dataProgram, automationUpdates);
      this._processRegistration(dataProgram, automationUpdates);
      this._processTitleGraduation(dataProgram, automationUpdates);
      if (Object.keys(automationUpdates).length && typeof window !== "undefined" && window.statusPage) {
        window.statusPage = DataUtils.deepMerge(window.statusPage, {
          automation: automationUpdates
        });
      }
      return automationUpdates;
    }
  };
  var loadDataProgram = async (codPrg) => {
    if (!window.HTTPClient) throw new Error("HTTPClient no est\xE1 disponible. Aseg\xFArate de que las utilidades est\xE9n cargadas.");
    if (!window.Logger) throw new Error("Logger no est\xE1 disponible. Aseg\xFArate de que las utilidades est\xE9n cargadas.");
    if (!window.DataUtils) throw new Error("DataUtils no est\xE1 disponible. Aseg\xFArate de que las utilidades est\xE9n cargadas.");
    initializeApiClient();
    const startTime = performance.now();
    let consolidatedData = { mainProgram: null, complementaryProgram: null };
    let allPrograms = null;
    try {
      updateStatus({
        loadDataProgram: "\u{1F7E1} Cargando informaci\xF3n del programa...",
        codigo: codPrg,
        startTime: (/* @__PURE__ */ new Date()).toISOString()
      });
      const handleProgramData = async () => {
        try {
          const data = await fetchProgramData(codPrg);
          const apiTime = performance.now() - startTime;
          consolidatedData = processData(data, allPrograms, codPrg);
          const domUpdates = ProgramDataProcessor.processAndUpdateDOM(consolidatedData.mainProgram);
          updateStatus({
            programData: "\u{1F7E2} Datos principales cargados",
            programa: data.programa,
            loadTime: `${apiTime.toFixed(2)}ms`
          });
          dispatchEvent(CONFIG.EVENT_NAMES.PROGRAM_DATA, {
            dataProgram: consolidatedData.mainProgram,
            domUpdates,
            performance: {
              loadTime: apiTime,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          });
          return data;
        } catch (error) {
          Logger.error(`\u274C Error cargando datos del programa:`, error);
          throw error;
        }
      };
      const handleAllPrograms = async () => {
        try {
          const data = await fetchAllPrograms();
          const apiTime = performance.now() - startTime;
          allPrograms = data;
          updateStatus({
            allPrograms: "\u{1F7E2} Lista completa de programas cargada",
            programCount: data?.length || 0,
            loadTime: `${apiTime.toFixed(2)}ms`
          });
          dispatchEvent(CONFIG.EVENT_NAMES.ALL_PROGRAMS, {
            allPrograms: data,
            performance: {
              loadTime: apiTime,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          });
          return data;
        } catch (error) {
          Logger.error(`\u274C Error cargando lista de programas:`, error);
          return null;
        }
      };
      const handleWhatsApp = async () => {
        try {
          const data = await fetchWhatsApps();
          const apiTime = performance.now() - startTime;
          updateStatus({
            whatsApps: "\u{1F7E2} Datos de WhatsApp cargados",
            whatsAppCount: data?.length || 0,
            loadTime: `${apiTime.toFixed(2)}ms`
          });
          dispatchEvent(CONFIG.EVENT_NAMES.WHATSAPP, {
            whatsApps: data,
            performance: {
              loadTime: apiTime,
              timestamp: (/* @__PURE__ */ new Date()).toISOString()
            }
          });
          return data;
        } catch (error) {
          Logger.error(`\u274C Error cargando datos de WhatsApp:`, error);
          return null;
        }
      };
      await handleProgramData();
      handleAllPrograms();
      handleWhatsApp();
      const totalTime = performance.now() - startTime;
      updateStatus({
        loadDataProgram: "\u{1F7E2} Datos del programa cargados correctamente",
        totalTime: `${totalTime.toFixed(2)}ms`,
        endTime: (/* @__PURE__ */ new Date()).toISOString()
      });
      return consolidatedData;
    } catch (error) {
      const loadTime = performance.now() - startTime;
      Logger.error(`\u274C Error cargando programa ${codPrg}:`, error);
      updateStatus({
        loadDataProgram: "\u274C Error al cargar informaci\xF3n",
        error: error.message,
        loadTime: `${loadTime.toFixed(2)}ms`,
        errorTime: (/* @__PURE__ */ new Date()).toISOString()
      });
      throw error;
    }
  };

  // app/_library/_configurations/loadProgram-v2/script.js
  var codProgram = configuration["codeProgram"];
  var initializeLoader = async () => {
    try {
      initializeApiClient();
      if (typeof StringUtils === "undefined" || !StringUtils) {
        throw new Error("StringUtils no est\xE1 disponible. Verificar carga de utilidades globales.");
      }
      const isEmptyCode = StringUtils.isEmpty ? StringUtils.isEmpty(codProgram?.toString()?.trim()) : !codProgram || codProgram.toString().trim().length === 0;
      if (!codProgram || isEmptyCode) throw new Error("C\xF3digo de programa no definido o vac\xEDo");
      const cleanCode = codProgram.toString().replace(/[-_]/g, "");
      const isValidCode = StringUtils.isAlphanumeric ? StringUtils.isAlphanumeric(cleanCode) : /^[a-zA-Z0-9]+$/.test(cleanCode);
      if (!isValidCode) throw new Error(`C\xF3digo de programa inv\xE1lido: ${codProgram}`);
      updateDisplay(`C\xF3digo de programa: ${codProgram}`);
      await loadDataProgram(codProgram);
    } catch (error) {
      if (typeof Logger !== "undefined" && Logger.error) {
        Logger.error("\u{1F4A5} Error al inicializar cargador:", error);
      } else {
        console.error("\u{1F4A5} Error al inicializar cargador:", error);
      }
      updateDisplay(`Error: ${error.message}`, true);
      if (typeof DOMUpdater !== "undefined" && DOMUpdater.clearCache) {
        DOMUpdater.clearCache();
      }
    }
  };
  var initializeEventListeners = () => {
    if (EventManager && EventManager.add) {
      EventManager.add(window, "beforeunload", () => {
        DOMUpdater.clearCache();
        if (EventManager.cleanup) EventManager.cleanup();
      });
    } else {
      window.addEventListener("beforeunload", () => {
        DOMUpdater.clearCache();
      });
    }
  };
  DOMUtils.isReady(async () => {
    await initializeLoader();
    initializeEventListeners();
    const apiClient2 = window.apiClient;
    if (apiClient2 && apiClient2.addErrorInterceptor) {
      apiClient2.addErrorInterceptor(async (error, config) => {
        Logger.error(`\u274C API Error: ${config.method} ${config.url}`, error);
        throw error;
      });
    }
  });
  if (typeof window !== "undefined") {
    window.loadProgramUtils = {
      loadDataProgram,
      initializeLoader,
      updateDisplay
    };
  }
})();
