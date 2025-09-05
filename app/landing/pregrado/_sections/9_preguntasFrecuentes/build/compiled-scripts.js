// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 03/09/2025, 06:45:01 a. m. (COT)

"use strict";
(() => {
  // app/landing/pregrado/_sections/9_preguntasFrecuentes/script.js
  var FAQAccordionSystem = {
    config: {
      itemSelector: ".faq__item",
      questionSelector: ".faq__question",
      answerSelector: ".faq__answer",
      iconSelector: ".faq__icon",
      subQuestionSelector: ".faq__sub-question",
      richContentSelector: ".faq-rich-content",
      activeClass: "active",
      hiddenClass: "hidden",
      animationDuration: 300
    },
    init() {
      const faqItems = document.querySelectorAll(this.config.itemSelector);
      if (faqItems.length === 0) {
        console.warn("[FAQ] No se encontraron elementos del acorde\xF3n");
        return false;
      }
      this.processRichContent();
      this.setupInitialState();
      this.attachEventListeners();
      this.setupSubQuestions();
      return true;
    },
    // Procesar contenido enriquecido desde el CMS
    processRichContent() {
      const richContentElements = document.querySelectorAll(this.config.richContentSelector);
      if (richContentElements.length === 0) return;
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
        }
      });
    },
    // Decodificar entidades HTML
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
    },
    // Configurar estado inicial del acordeón
    setupInitialState() {
      const faqItems = document.querySelectorAll(this.config.itemSelector);
      faqItems.forEach((item) => {
        const answer = item.querySelector(this.config.answerSelector);
        if (!item.classList.contains(this.config.activeClass)) {
          answer.classList.add(this.config.hiddenClass);
          answer.style.display = "none";
        } else {
          answer.classList.remove(this.config.hiddenClass);
          answer.style.display = "block";
        }
      });
    },
    // Abrir item del acordeón con animación
    openAccordionItem(item, answer, icon) {
      answer.style.display = "block";
      answer.style.height = "auto";
      answer.style.maxHeight = "none";
      answer.style.opacity = "0";
      answer.style.overflow = "hidden";
      const targetHeight = answer.scrollHeight;
      answer.style.height = "0px";
      answer.style.maxHeight = "0px";
      answer.style.transform = "translateY(-10px)";
      answer.style.paddingTop = "0px";
      answer.style.paddingBottom = "0px";
      answer.classList.remove(this.config.hiddenClass);
      item.classList.add(this.config.activeClass);
      icon.innerHTML = '<i class="ph ph-caret-up"></i>';
      answer.offsetHeight;
      answer.style.transition = `
      height ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      padding ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
    `;
      requestAnimationFrame(() => {
        answer.style.height = `${targetHeight}px`;
        answer.style.maxHeight = `${targetHeight + 20}px`;
        answer.style.opacity = "1";
        answer.style.transform = "translateY(0)";
        answer.style.paddingTop = "";
        answer.style.paddingBottom = "";
      });
      setTimeout(() => {
        answer.style.transition = "";
        answer.style.height = "auto";
        answer.style.maxHeight = "none";
        answer.style.transform = "";
        answer.style.opacity = "";
        answer.style.overflow = "visible";
        answer.style.paddingTop = "";
        answer.style.paddingBottom = "";
      }, this.config.animationDuration + 50);
    },
    // Cerrar item del acordeón con animación
    closeAccordionItem(item, answer, icon) {
      item.classList.remove(this.config.activeClass);
      icon.innerHTML = '<i class="ph ph-caret-down"></i>';
      const currentHeight = answer.scrollHeight;
      answer.style.height = `${currentHeight}px`;
      answer.style.maxHeight = `${currentHeight}px`;
      answer.style.overflow = "hidden";
      answer.style.opacity = "1";
      answer.style.transform = "translateY(0)";
      answer.offsetHeight;
      answer.style.transition = `
      height ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      opacity ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      transform ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
      padding ${this.config.animationDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)
    `;
      requestAnimationFrame(() => {
        answer.style.height = "0px";
        answer.style.maxHeight = "0px";
        answer.style.opacity = "0";
        answer.style.transform = "translateY(-10px)";
        answer.style.paddingTop = "0px";
        answer.style.paddingBottom = "0px";
      });
      setTimeout(() => {
        answer.style.display = "none";
        answer.classList.add(this.config.hiddenClass);
        answer.style.transition = "";
        answer.style.height = "";
        answer.style.maxHeight = "";
        answer.style.opacity = "";
        answer.style.transform = "";
        answer.style.overflow = "";
        answer.style.paddingTop = "";
        answer.style.paddingBottom = "";
      }, this.config.animationDuration + 50);
    },
    // Toggle del acordeón (solo una pregunta abierta a la vez)
    toggleAccordion(clickedItem) {
      const faqItems = document.querySelectorAll(this.config.itemSelector);
      const isCurrentlyActive = clickedItem.classList.contains(this.config.activeClass);
      const activeItems = [];
      faqItems.forEach((item) => {
        if (item.classList.contains(this.config.activeClass)) {
          const answer = item.querySelector(this.config.answerSelector);
          const icon = item.querySelector(this.config.iconSelector);
          activeItems.push({ item, answer, icon });
        }
      });
      activeItems.forEach(({ item, answer, icon }) => {
        this.closeAccordionItem(item, answer, icon);
      });
      if (!isCurrentlyActive) {
        const answer = clickedItem.querySelector(this.config.answerSelector);
        const icon = clickedItem.querySelector(this.config.iconSelector);
        setTimeout(
          () => {
            this.openAccordionItem(clickedItem, answer, icon);
          },
          activeItems.length > 0 ? this.config.animationDuration + 100 : 0
        );
      }
    },
    // Configurar event listeners
    attachEventListeners() {
      const faqItems = document.querySelectorAll(this.config.itemSelector);
      faqItems.forEach((item, index) => {
        const question = item.querySelector(this.config.questionSelector);
        if (!question) {
          console.warn(`[FAQ] Bot\xF3n no encontrado en item ${index + 1}`);
          return;
        }
        const newQuestion = question.cloneNode(true);
        question.parentNode.replaceChild(newQuestion, question);
        newQuestion.addEventListener("click", (e) => {
          e.preventDefault();
          this.toggleAccordion(item);
        });
        newQuestion.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this.toggleAccordion(item);
          }
        });
      });
    },
    // Configurar sub-preguntas
    setupSubQuestions() {
      const subQuestions = document.querySelectorAll(this.config.subQuestionSelector);
      subQuestions.forEach((subQuestion) => {
        subQuestion.addEventListener("click", function(e) {
          e.stopPropagation();
        });
      });
    }
  };
  var FAQSystem = {
    init() {
      const systems = {
        accordion: FAQAccordionSystem.init()
      };
      return systems;
    }
  };
  var initializeFAQ = () => {
    if (typeof window !== "undefined" && false) {
      window.FAQAccordionSystem = FAQAccordionSystem;
      window.FAQSystem = FAQSystem;
    }
    FAQSystem.init();
  };
  var script_default = initializeFAQ;
  if (typeof window !== "undefined") {
    initializeFAQ();
  }
})();
