// JavaScript Fragment para Liferay - Lab Slider Logic
// VERSIÓN CON EXPORTS CORREGIDOS

(function() {
  'use strict';

  if (typeof window === 'undefined') {
    console.warn('Lab Slider: No se puede ejecutar en entorno servidor');
    return;
  }

  console.log('Lab Slider Logic cargado');

  const labSliderLogic = () => {
    // Configuración y datos
    const labSlides = [
      {
        id: 1,
        title: 'Laboratorio de Investigación Biomédica',
        description:
          'Nuestro laboratorio de investigación biomédica cuenta con equipos de última generación para el análisis molecular y celular. Desarrollamos investigaciones en genética, biología molecular y medicina regenerativa.',
        imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
        label: 'Lab. Biomédica'
      },
      {
        id: 2,
        title: 'Laboratorio de Ingeniería de Materiales',
        description:
          'Especializado en el desarrollo y caracterización de nuevos materiales. Contamos con microscopios electrónicos, equipos de análisis térmico y sistemas de pruebas mecánicas avanzadas.',
        imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
        label: 'Lab. Materiales'
      },
      {
        id: 3,
        title: 'Laboratorio de Química Analítica',
        description:
          'Enfocado en análisis cualitativos y cuantitativos de muestras complejas. Utilizamos cromatografía, espectrometría de masas y técnicas espectroscópicas avanzadas.',
        imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
        label: 'Lab. Química'
      },
      {
        id: 4,
        title: 'Laboratorio de Biotecnología',
        description:
          'Dedicado al desarrollo de procesos biotecnológicos innovadores. Trabajamos en fermentación, cultivos celulares y producción de biomoléculas con aplicaciones industriales.',
        imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
        label: 'Lab. Biotecnología'
      }
    ];

    let currentSlide = 0;
    let isInitialized = false;

    // Función para oscurecer color
    const darkenColor = (color, percent) => {
      const num = parseInt(color.replace('#', ''), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) - amt;
      const G = ((num >> 8) & 0x00ff) - amt;
      const B = (num & 0x0000ff) - amt;
      return (
        '#' +
        (0x1000000 + (R < 0 ? 0 : R) * 0x10000 + (G < 0 ? 0 : G) * 0x100 + (B < 0 ? 0 : B))
          .toString(16)
          .slice(1)
      );
    };

    // Función para esperar elementos
    const waitForElement = (selector, maxAttempts = 10, interval = 100) => {
      return new Promise((resolve, reject) => {
        let attempts = 0;

        const check = () => {
          attempts++;
          const element = document.querySelector(selector);

          if (element) {
            console.log(`Lab Slider - Elemento encontrado: ${selector}`);
            resolve(element);
          } else if (attempts >= maxAttempts) {
            console.warn(`Lab Slider - Elemento no encontrado después de ${maxAttempts} intentos: ${selector}`);
            reject(new Error(`Element not found: ${selector}`));
          } else {
            console.log(`Lab Slider - Intento ${attempts}/${maxAttempts} buscando: ${selector}`);
            setTimeout(check, interval);
          }
        };

        check();
      });
    };

    // Navegación del slider
    const nextSlide = () => {
      if (!isInitialized) return;
      
      currentSlide = currentSlide === labSlides.length - 1 ? 0 : currentSlide + 1;
      updateContent();
      console.log(`Lab Slider - Siguiente slide: ${currentSlide + 1}/${labSlides.length}`);
    };

    const prevSlide = () => {
      if (!isInitialized) return;
      
      currentSlide = currentSlide === 0 ? labSlides.length - 1 : currentSlide - 1;
      updateContent();
      console.log(`Lab Slider - Slide anterior: ${currentSlide + 1}/${labSlides.length}`);
    };

    // Obtener slide actual
    const getCurrentSlide = () => {
      return labSlides[currentSlide];
    };

    // Obtener imágenes actuales basadas en el slide
    const getCurrentImages = () => {
      const firstImageIndex = currentSlide;
      const secondImageIndex = (currentSlide + 1) % labSlides.length;

      return {
        firstImage: labSlides[firstImageIndex],
        secondImage: labSlides[secondImageIndex]
      };
    };

    // Actualizar todo el contenido cuando cambie el slide
    const updateContent = () => {
      try {
        updateText();
        updateImages();
      } catch (error) {
        console.error('Lab Slider - Error actualizando contenido:', error);
      }
    };

    // Actualizar el texto del slide actual - Compatible React y Liferay
    const updateText = () => {
      const currentSlideData = getCurrentSlide();

      // Múltiples selectores para compatibilidad React/Liferay
      const titleSelectors = [
        '#laboratorios-slide-title',
        '[data-lfr-editable-id="laboratorios-slide-title"]',
        '.lab-slider-text .subtitle-lab',
        '.lab-slider-text h3',
        '.lab-title'
      ];

      const descriptionSelectors = [
        '#laboratorios-slide-description',
        '[data-lfr-editable-id="laboratorios-slide-description"]',
        '.lab-slider-text .paragraph-lab',
        '.lab-slider-text p',
        '.lab-description'
      ];

      // Buscar título
      let titleElement = null;
      for (const selector of titleSelectors) {
        titleElement = document.querySelector(selector);
        if (titleElement) break;
      }

      // Buscar descripción
      let paragraphElement = null;
      for (const selector of descriptionSelectors) {
        paragraphElement = document.querySelector(selector);
        if (paragraphElement) break;
      }

      if (titleElement) {
        // Para elementos editables de Liferay usar innerHTML, para React textContent
        if (titleElement.hasAttribute('data-lfr-editable-id') || titleElement.tagName === 'SPAN') {
          titleElement.innerHTML = currentSlideData.title;
        } else {
          titleElement.textContent = currentSlideData.title;
        }
        console.log('Lab Slider - Título actualizado:', currentSlideData.title);
      } else {
        console.warn('Lab Slider - No se encontró elemento de título');
      }

      if (paragraphElement) {
        if (
          paragraphElement.hasAttribute('data-lfr-editable-id') ||
          paragraphElement.tagName === 'SPAN'
        ) {
          paragraphElement.innerHTML = currentSlideData.description;
        } else {
          paragraphElement.textContent = currentSlideData.description;
        }
        console.log('Lab Slider - Descripción actualizada');
      } else {
        console.warn('Lab Slider - No se encontró elemento de descripción');
      }
    };

    // Actualizar las imágenes en el DOM cuando cambie el slide
    const updateImages = () => {
      const images = getCurrentImages();
      
      // Selectores más amplios para las imágenes
      const imageSelectors = [
        '.lab-slider-images .lab-image',
        '.lab-image',
        '.lab-slider img'
      ];

      const labelSelectors = [
        '.lab-slider-images .image-label',
        '.image-label',
        '.lab-label'
      ];

      let imageContainers = [];
      let imageLabels = [];

      // Buscar contenedores de imagen
      for (const selector of imageSelectors) {
        imageContainers = document.querySelectorAll(selector);
        if (imageContainers.length > 0) break;
      }

      // Buscar etiquetas
      for (const selector of labelSelectors) {
        imageLabels = document.querySelectorAll(selector);
        if (imageLabels.length > 0) break;
      }

      // Actualizar primera imagen
      if (imageContainers[0]) {
        imageContainers[0].src = images.firstImage.imageSrc;
        imageContainers[0].alt = images.firstImage.label;
        console.log('Lab Slider - Primera imagen actualizada:', images.firstImage.label);
      }
      if (imageLabels[0]) {
        imageLabels[0].textContent = images.firstImage.label;
      }

      // Segunda imagen (solo en desktop)
      if (imageContainers[1]) {
        imageContainers[1].src = images.secondImage.imageSrc;
        imageContainers[1].alt = images.secondImage.label;
        console.log('Lab Slider - Segunda imagen actualizada:', images.secondImage.label);
      }
      if (imageLabels[1]) {
        imageLabels[1].textContent = images.secondImage.label;
      }
    };

    // Aplicar estilos iniciales a los botones
    const initializeButtons = () => {
      const buttonSelectors = [
        '.lab-slider-navigation .nav-button',
        '.nav-button',
        '.lab-navigation .btn',
        '.lab-btn'
      ];

      let buttons = [];
      for (const selector of buttonSelectors) {
        buttons = document.querySelectorAll(selector);
        if (buttons.length > 0) break;
      }

      buttons.forEach(button => {
        button.style.border = 'none';
        button.style.borderRadius = '50%';
        button.style.cursor = 'pointer';
        button.style.transition = 'all 0.3s ease';
        button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

        // Estilos responsivos
        if (window.innerWidth <= 768) {
          button.style.width = '32px';
          button.style.height = '32px';
          button.style.fontSize = '18px';
        } else {
          button.style.width = '40px';
          button.style.height = '40px';
          button.style.fontSize = '20px';
        }
      });

      console.log(`Lab Slider - ${buttons.length} botones inicializados`);
    };

    // Vincular eventos de navegación
    const bindEvents = () => {
      // Selectores más amplios para los botones
      const prevSelectors = [
        '.lab-slider-navigation .nav-button.prev',
        '.nav-button.prev',
        '.lab-prev',
        '.prev-btn',
        '[data-action="prev"]'
      ];

      const nextSelectors = [
        '.lab-slider-navigation .nav-button.next',
        '.nav-button.next',
        '.lab-next',
        '.next-btn',
        '[data-action="next"]'
      ];

      // Buscar botón anterior
      let prevButton = null;
      for (const selector of prevSelectors) {
        prevButton = document.querySelector(selector);
        if (prevButton) break;
      }

      // Buscar botón siguiente
      let nextButton = null;
      for (const selector of nextSelectors) {
        nextButton = document.querySelector(selector);
        if (nextButton) break;
      }

      if (prevButton) {
        // Limpiar eventos anteriores
        prevButton.onclick = null;
        prevButton.removeEventListener('click', prevSlide);
        
        // Agregar nuevo evento
        prevButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          prevSlide();
        }, { passive: false });
        
        console.log('Lab Slider - Botón anterior vinculado');
      } else {
        console.warn('Lab Slider - No se encontró botón anterior');
      }

      if (nextButton) {
        // Limpiar eventos anteriores
        nextButton.onclick = null;
        nextButton.removeEventListener('click', nextSlide);
        
        // Agregar nuevo evento
        nextButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopImmediatePropagation();
          nextSlide();
        }, { passive: false });
        
        console.log('Lab Slider - Botón siguiente vinculado');
      } else {
        console.warn('Lab Slider - No se encontró botón siguiente');
      }
    };

    // Manejar resize de ventana para estilos responsivos
    const handleResize = () => {
      if (isInitialized) {
        initializeButtons();
      }
    };

    // Inicialización principal
    const initialize = async () => {
      try {
        console.log('Lab Slider - Iniciando...');

        // Esperar a que algún elemento clave esté disponible
        const keySelectors = [
          '.lab-slider-navigation',
          '.lab-navigation',
          '.nav-button',
          '.lab-slider'
        ];

        let foundElement = false;
        for (const selector of keySelectors) {
          try {
            await waitForElement(selector, 5, 200);
            foundElement = true;
            break;
          } catch (error) {
            // Continuar con el siguiente selector
          }
        }

        if (!foundElement) {
          console.warn('Lab Slider - No se encontraron elementos clave, inicializando de todos modos...');
        }

        // Configurar componentes
        initializeButtons();
        updateContent();
        bindEvents();

        // Agregar listener para resize
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
          window.addEventListener('resize', handleResize);
        }

        isInitialized = true;
        console.log('Lab Slider - Inicializado correctamente');

        return true;
      } catch (error) {
        console.error('Lab Slider - Error en inicialización:', error);
        return false;
      }
    };

    // Función de limpieza
    const cleanup = () => {
      try {
        console.log('Lab Slider - Limpiando...');
        isInitialized = false;
        
        if (typeof window !== 'undefined') {
          window.removeEventListener('resize', handleResize);
        }
        
        console.log('Lab Slider - Limpieza completada');
      } catch (error) {
        console.error('Lab Slider - Error en limpieza:', error);
      }
    };

    // API pública
    return {
      nextSlide,
      prevSlide,
      getCurrentSlide,
      getCurrentImages,
      initialize,
      cleanup,
      darkenColor,
      isInitialized: () => isInitialized,
      getSlides: () => [...labSlides],
      waitForElement
    };
  };

  // Crear instancia global
  const labSliderInstance = labSliderLogic();

  // Auto-inicializar en Liferay
  const executeInit = () => {
    // Estrategia 1: DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => labSliderInstance.initialize(), 100);
      });
    } else {
      setTimeout(() => labSliderInstance.initialize(), 100);
    }

    // Estrategia 2: Liferay ready (si está disponible)
    if (typeof window.Liferay !== 'undefined' && window.Liferay.on) {
      window.Liferay.on('allPortletsReady', () => {
        setTimeout(() => labSliderInstance.initialize(), 200);
      });
    }

    // Estrategia 3: MutationObserver para contenido dinámico
    if ('MutationObserver' in window) {
      const observer = new MutationObserver(mutations => {
        const labSliderAdded = mutations.some(mutation =>
          Array.from(mutation.addedNodes).some(
            node =>
              node.nodeType === 1 &&
              (node.classList?.contains('lab-slider') || 
               node.classList?.contains('lab-navigation') ||
               (node.querySelector && (
                 node.querySelector('.lab-slider') || 
                 node.querySelector('.lab-navigation')
               )))
          )
        );

        if (labSliderAdded && !labSliderInstance.isInitialized()) {
          observer.disconnect();
          setTimeout(() => labSliderInstance.initialize(), 300);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Auto-desconectar después de 15 segundos
      setTimeout(() => {
        if (observer) observer.disconnect();
      }, 15000);
    }
  };

  // Ejecutar inicialización
  executeInit();

  // Exponer globalmente para Liferay
  window.labSliderLogic = labSliderLogic;
  window.labSliderInstance = labSliderInstance;

  // Debug utilities
  window.labSliderDebug = {
    next: () => labSliderInstance.nextSlide(),
    prev: () => labSliderInstance.prevSlide(),
    getState: () => labSliderInstance.getCurrentSlide(),
    init: () => labSliderInstance.initialize(),
    cleanup: () => labSliderInstance.cleanup()
  };

  // ========================
  // EXPORTS PARA MÓDULOS
  // ========================

  // API pública del módulo
  const LabSliderAPI = {
    // Métodos de control
    init: labSliderInstance.initialize,
    cleanup: labSliderInstance.cleanup,
    
    // Métodos de navegación
    next: () => labSliderInstance.nextSlide(),
    prev: () => labSliderInstance.prevSlide(),
    
    // Métodos de estado
    getState: () => labSliderInstance.getCurrentSlide(),
    getImages: () => labSliderInstance.getCurrentImages(),
    isInitialized: () => labSliderInstance.isInitialized(),
    getCurrentSlide: () => labSliderInstance.getCurrentSlide(),
    getCurrentImages: () => labSliderInstance.getCurrentImages(),
    
    // Métodos de configuración
    getSlides: () => labSliderInstance.getSlides(),
    
    // Utilidades
    darkenColor: labSliderInstance.darkenColor,
    waitForElement: labSliderInstance.waitForElement,
    
    // Acceso directo a la instancia para casos avanzados
    getInstance: () => labSliderInstance
  };

  // CommonJS export
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LabSliderAPI;
    module.exports.default = LabSliderAPI;
    module.exports.LabSlider = LabSliderAPI;
    module.exports.labSliderLogic = labSliderLogic;
  }

  // AMD export
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return LabSliderAPI;
    });
  }

  // ES6 export (para bundlers modernos)
  if (typeof window !== 'undefined') {
    window.LabSlider = LabSliderAPI;
    window.LabSliderAPI = LabSliderAPI;
  }

  // Export global para uso directo
  if (typeof globalThis !== 'undefined') {
    globalThis.LabSlider = LabSliderAPI;
    globalThis.LabSliderAPI = LabSliderAPI;
  }

  // Return para uso como módulo
  return LabSliderAPI;

})();