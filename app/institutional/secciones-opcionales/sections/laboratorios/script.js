<<<<<<< HEAD
// Lab Slider - Versión corregida y optimizada
(function() {
  'use strict';

  // ✅ Verificación de entorno mejorada
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    console.log('LabSlider: Entorno servidor detectado, script no ejecutado');
    return;
  }

  // ✅ Evitar múltiples instancias
  if (window.LabSliderInstance) {
    console.log('LabSlider ya existe, limpiando instancia anterior...');
    window.LabSliderInstance.cleanup();
  }

  function createLabSlider() {
    var defaultSlides = [
      {
        id: 1,
        title: 'Laboratorio de Investigación Biomédica',
        description: 'Nuestro laboratorio de investigación biomédica cuenta con equipos de última generación para el análisis molecular y celular.',
        imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
        label: 'Lab. Biomédica'
      },
      {
        id: 2,
        title: 'Laboratorio de Ingeniería de Materiales',
        description: 'Especializado en el desarrollo y caracterización de nuevos materiales. Contamos con equipos avanzados.',
        imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
        label: 'Lab. Materiales'
      }
    ];

    var slides = [];
    var currentSlide = 0;
    var isInitialized = false;
    var isAnimating = false;
    
    // ✅ NUEVO: Referencias de event listeners para limpieza
    var eventListeners = [];
    var resizeHandler = null;
    var mutationObserver = null;

    function initializeSlides() {
      if (window.liferayLabSlides && Array.isArray(window.liferayLabSlides) && window.liferayLabSlides.length > 0) {
        slides = window.liferayLabSlides.slice();
      } else {
        slides = defaultSlides.slice();
      }
    }

    function updateSlideData(newSlides) {
      if (Array.isArray(newSlides) && newSlides.length > 0) {
        slides = newSlides.slice();
        currentSlide = 0;
        
        if (isInitialized) {
          updateContentWithAnimation();
        }
        return true;
      }
      return false;
    }

    function waitForElement(selector, maxAttempts, interval) {
      maxAttempts = maxAttempts || 10;
      interval = interval || 100;
      
      return new Promise(function(resolve, reject) {
        var attempts = 0;

        function check() {
          attempts++;
          var element = document.querySelector(selector);

          if (element) {
            resolve(element);
          } else if (attempts >= maxAttempts) {
            reject(new Error('Element not found: ' + selector));
          } else {
            setTimeout(check, interval);
          }
        }

        check();
      });
    }

    function nextSlide() {
      if (!isInitialized || slides.length === 0 || isAnimating) {
        return;
      }
      
      currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      updateContentWithAnimation();
    }

    function prevSlide() {
      if (!isInitialized || slides.length === 0 || isAnimating) {
        return;
      }
      
      currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      updateContentWithAnimation();
    }

    function getCurrentSlide() {
      return slides.length > 0 ? slides[currentSlide] : null;
    }

    function getCurrentImages() {
      if (slides.length === 0) return { firstImage: null, secondImage: null };
      
      var firstImageIndex = currentSlide;
      var secondImageIndex = (currentSlide + 1) % slides.length;

      return {
        firstImage: slides[firstImageIndex],
        secondImage: slides[secondImageIndex]
      };
    }

    // ✅ MEJORADO: Función de animación con mejor manejo de errores
    function updateContentWithAnimation() {
      if (isAnimating) return;
      
      try {
        isAnimating = true;
        
        var sliderContent = document.querySelector('.lab-slider-content');
        var sliderText = document.querySelector('.lab-slider-text');
        var sliderImages = document.querySelector('.lab-slider-images');

        if (!sliderContent) {
          updateContent();
          isAnimating = false;
          return;
        }

        var elementsToAnimate = [sliderContent];
        if (sliderText) elementsToAnimate.push(sliderText);
        if (sliderImages) elementsToAnimate.push(sliderImages);

        // Reiniciar animaciones
        elementsToAnimate.forEach(function(element) {
          if (element) {
            element.classList.remove('lab-slider-transition');
          }
        });
        
        // Forzar reflow
        if (sliderContent) {
          void sliderContent.offsetWidth;
        }

        // Aplicar animaciones
        elementsToAnimate.forEach(function(element) {
          if (element) {
            element.classList.add('lab-slider-transition');
          }
        });

        // Actualizar contenido
        updateContent();

        // Limpiar después de la animación
        setTimeout(function() {
          try {
            elementsToAnimate.forEach(function(element) {
              if (element) {
                element.classList.remove('lab-slider-transition');
              }
            });
          } catch (e) {
            console.warn('Error limpiando animaciones:', e);
          }
          isAnimating = false;
        }, 450);

      } catch (error) {
        console.error('Error actualizando contenido con animación:', error);
        isAnimating = false;
      }
    }

    function updateContent() {
      try {
        updateText();
        updateImages();
      } catch (error) {
        console.error('Error actualizando contenido:', error);
      }
    }

    function updateText() {
      var currentSlideData = getCurrentSlide();
      if (!currentSlideData) return;

      var titleSelectors = [
        '[data-lfr-editable-id="laboratorios-slide-title"]',
        '[data-testid="slide-title"]',
        '.lab-slider-text .subtitle-lab',
        '.subtitle-lab'
      ];

      var descriptionSelectors = [
        '[data-lfr-editable-id="laboratorios-slide-description"]',
        '[data-testid="slide-description"]',
        '.lab-slider-text .paragraph-lab',
        '.paragraph-lab'
      ];

      // Buscar y actualizar título
      var titleElement = null;
      for (var i = 0; i < titleSelectors.length; i++) {
        titleElement = document.querySelector(titleSelectors[i]);
        if (titleElement) break;
      }

      if (titleElement && currentSlideData.title) {
        try {
          if (titleElement.hasAttribute('data-lfr-editable-id')) {
            titleElement.innerHTML = currentSlideData.title;
          } else {
            titleElement.textContent = currentSlideData.title;
          }
        } catch (e) {
          console.warn('Error actualizando título:', e);
        }
      }

      // Buscar y actualizar descripción
      var paragraphElement = null;
      for (var i = 0; i < descriptionSelectors.length; i++) {
        paragraphElement = document.querySelector(descriptionSelectors[i]);
        if (paragraphElement) break;
      }

      if (paragraphElement && currentSlideData.description) {
        try {
          if (paragraphElement.hasAttribute('data-lfr-editable-id')) {
            paragraphElement.innerHTML = currentSlideData.description;
          } else {
            paragraphElement.textContent = currentSlideData.description;
          }
        } catch (e) {
          console.warn('Error actualizando descripción:', e);
        }
      }
    }

    function updateImages() {
      var images = getCurrentImages();
      if (!images.firstImage) return;
      
      var imageSelectors = [
        '[data-testid="first-image"], [data-testid="second-image"]',
        '.lab-slider-images .lab-image',
        '.lab-image'
      ];

      var labelSelectors = [
        '[data-testid="first-label"], [data-testid="second-label"]',
        '.lab-slider-images .image-label',
        '.image-label'
      ];

      var imageContainers = [];
      for (var i = 0; i < imageSelectors.length; i++) {
        imageContainers = document.querySelectorAll(imageSelectors[i]);
        if (imageContainers.length > 0) break;
      }

      var imageLabels = [];
      for (var i = 0; i < labelSelectors.length; i++) {
        imageLabels = document.querySelectorAll(labelSelectors[i]);
        if (imageLabels.length > 0) break;
      }

      // Actualizar primera imagen
      if (imageContainers[0] && images.firstImage.imageSrc) {
        try {
          imageContainers[0].src = images.firstImage.imageSrc;
          imageContainers[0].alt = images.firstImage.label || 'Laboratorio';
        } catch (e) {
          console.warn('Error actualizando primera imagen:', e);
        }
      }
      if (imageLabels[0]) {
        try {
          imageLabels[0].textContent = images.firstImage.label || 'Lab';
        } catch (e) {
          console.warn('Error actualizando primera etiqueta:', e);
        }
      }

      // Actualizar segunda imagen
      if (imageContainers[1] && images.secondImage && images.secondImage.imageSrc) {
        try {
          imageContainers[1].src = images.secondImage.imageSrc;
          imageContainers[1].alt = images.secondImage.label || 'Laboratorio';
        } catch (e) {
          console.warn('Error actualizando segunda imagen:', e);
        }
      }
      if (imageLabels[1] && images.secondImage) {
        try {
          imageLabels[1].textContent = images.secondImage.label || 'Lab';
        } catch (e) {
          console.warn('Error actualizando segunda etiqueta:', e);
        }
      }
    }

    // ✅ MEJORADO: Inicialización de botones con mejor manejo
    function initializeButtons() {
      var buttonSelectors = [
        '[data-testid="prev-button"], [data-testid="next-button"]',
        '.lab-slider-navigation .nav-button',
        '.nav-button'
      ];

      var buttons = [];
      for (var i = 0; i < buttonSelectors.length; i++) {
        buttons = document.querySelectorAll(buttonSelectors[i]);
        if (buttons.length > 0) break;
      }

      for (var i = 0; i < buttons.length; i++) {
        var button = buttons[i];
        if (!button) continue;

        try {
          button.style.border = 'none';
          button.style.borderRadius = '50%';
          button.style.cursor = 'pointer';
          button.style.transition = 'all 0.3s ease';
          button.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

          if (window.innerWidth <= 768) {
            button.style.width = '32px';
            button.style.height = '32px';
            button.style.fontSize = '18px';
          } else {
            button.style.width = '40px';
            button.style.height = '40px';
            button.style.fontSize = '20px';
          }
        } catch (e) {
          console.warn('Error estilizando botón:', e);
        }
      }
    }

    // ✅ MEJORADO: Bind events con limpieza mejorada
    function bindEvents() {
      // Limpiar eventos anteriores
      clearEventListeners();

      var prevSelectors = [
        '[data-testid="prev-button"]',
        '[data-action="prev"]',
        '.lab-slider-navigation .nav-button.prev',
        '.nav-button.prev'
      ];

      var nextSelectors = [
        '[data-testid="next-button"]', 
        '[data-action="next"]',
        '.lab-slider-navigation .nav-button.next',
        '.nav-button.next'
      ];

      // Buscar botón anterior
      var prevButton = null;
      for (var i = 0; i < prevSelectors.length; i++) {
        prevButton = document.querySelector(prevSelectors[i]);
        if (prevButton) break;
      }

      // Buscar botón siguiente
      var nextButton = null;
      for (var i = 0; i < nextSelectors.length; i++) {
        nextButton = document.querySelector(nextSelectors[i]);
        if (nextButton) break;
      }

      // Evento botón anterior
      if (prevButton) {
        var prevHandler = function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          prevSlide();
        };
        prevButton.addEventListener('click', prevHandler, { passive: false });
        eventListeners.push({ element: prevButton, event: 'click', handler: prevHandler });
      }

      // Evento botón siguiente
      if (nextButton) {
        var nextHandler = function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          nextSlide();
        };
        nextButton.addEventListener('click', nextHandler, { passive: false });
        eventListeners.push({ element: nextButton, event: 'click', handler: nextHandler });
      }
    }

    // ✅ NUEVO: Función para limpiar event listeners
    function clearEventListeners() {
      for (var i = 0; i < eventListeners.length; i++) {
        var listener = eventListeners[i];
        try {
          if (listener.element && listener.element.removeEventListener) {
            listener.element.removeEventListener(listener.event, listener.handler);
          }
        } catch (e) {
          console.warn('Error removiendo event listener:', e);
        }
      }
      eventListeners = [];
    }

    // ✅ MEJORADO: Handle resize con throttling
    function createResizeHandler() {
      var throttleTimeout = null;
      return function() {
        if (throttleTimeout) return;
        
        throttleTimeout = setTimeout(function() {
          if (isInitialized) {
            try {
              initializeButtons();
            } catch (e) {
              console.warn('Error en resize handler:', e);
            }
          }
          throttleTimeout = null;
        }, 250);
      };
    }

    // ✅ MEJORADO: Inicialización con mejor manejo de errores
    function initialize() {
      return new Promise(function(resolve) {
        try {
          // Evitar doble inicialización
          if (isInitialized) {
            resolve(true);
            return;
          }

          initializeSlides();

          var keySelectors = [
            '.lab-slider-navigation',
            '.lab-slider',
            '[data-testid="prev-button"]'
          ];

          var selectorIndex = 0;

          function tryNextSelector() {
            if (selectorIndex >= keySelectors.length) {
              proceedWithInit();
              return;
            }

            waitForElement(keySelectors[selectorIndex], 5, 200)
              .then(function() {
                proceedWithInit();
              })
              .catch(function() {
                selectorIndex++;
                tryNextSelector();
              });
          }

          function proceedWithInit() {
            try {
              initializeButtons();
              updateContent(); // Inicialización sin animación
              bindEvents();

              // Configurar resize handler
              if (resizeHandler) {
                window.removeEventListener('resize', resizeHandler);
              }
              resizeHandler = createResizeHandler();
              window.addEventListener('resize', resizeHandler, { passive: true });

              isInitialized = true;
              console.log('LabSlider inicializado correctamente');
              resolve(true);
            } catch (error) {
              console.error('Error en proceedWithInit:', error);
              resolve(false);
            }
          }

          tryNextSelector();

        } catch (error) {
          console.error('Error en initialize:', error);
          resolve(false);
        }
      });
    }

    // ✅ MEJORADO: Cleanup completo
    function cleanup() {
      try {
        console.log('Limpiando LabSlider...');
        
        isInitialized = false;
        isAnimating = false;
        
        // Limpiar event listeners
        clearEventListeners();
        
        // Limpiar resize handler
        if (resizeHandler) {
          window.removeEventListener('resize', resizeHandler);
          resizeHandler = null;
        }
        
        // Limpiar mutation observer
        if (mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
        
        // Limpiar variables globales
        if (window.labSliderInstance === this) {
          window.labSliderInstance = null;
        }
        if (window.labSliderDebug) {
          window.labSliderDebug = null;
        }
        
        console.log('LabSlider limpiado correctamente');
      } catch (error) {
        console.error('Error en cleanup:', error);
      }
    }

    // ✅ API pública
    return {
      nextSlide: nextSlide,
      prevSlide: prevSlide,
      getCurrentSlide: getCurrentSlide,
      getCurrentImages: getCurrentImages,
      initialize: initialize,
      cleanup: cleanup,
      updateSlideData: updateSlideData,
      isInitialized: function() { return isInitialized; },
      getSlides: function() { return slides.slice(); }
    };
  }

  // ✅ Crear instancia
  var labSliderInstance = createLabSlider();

  // ✅ MEJORADO: Función de inicialización única
  function executeInit() {
    var initPromise = null;
    var hasInitialized = false;

    function performInit() {
      if (hasInitialized || initPromise) return initPromise;
      
      hasInitialized = true;
      initPromise = labSliderInstance.initialize();
      return initPromise;
    }

    // DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(performInit, 100);
      });
    } else {
      setTimeout(performInit, 100);
    }

    // Liferay ready
    if (typeof window.Liferay !== 'undefined' && window.Liferay.on) {
      window.Liferay.on('allPortletsReady', function() {
        setTimeout(performInit, 200);
      });
    }

    // ✅ MEJORADO: MutationObserver con mejor gestión
    if ('MutationObserver' in window && !labSliderInstance.isInitialized()) {
      var observer = new MutationObserver(function(mutations) {
        if (hasInitialized) return;

        var labSliderAdded = mutations.some(function(mutation) {
          return Array.from(mutation.addedNodes).some(function(node) {
            return node.nodeType === 1 &&
                   ((node.classList && node.classList.contains('lab-slider')) ||
                    (node.querySelector && node.querySelector('.lab-slider')));
          });
        });

        if (labSliderAdded) {
          observer.disconnect();
          setTimeout(performInit, 300);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      // Cleanup después de 15 segundos
      setTimeout(function() {
        try {
          if (observer) {
            observer.disconnect();
          }
        } catch (e) {
          console.warn('Error desconectando MutationObserver:', e);
        }
      }, 15000);
    }
  }

  // ✅ Ejecutar inicialización
  executeInit();

  // ✅ MEJORADO: Exports globales más limpios
  window.LabSliderInstance = labSliderInstance;

  // Debug API (solo en desarrollo)
  if (typeof window.location !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.search.includes('debug=true'))) {
    window.labSliderDebug = {
      next: function() { return labSliderInstance.nextSlide(); },
      prev: function() { return labSliderInstance.prevSlide(); },
      getState: function() { return labSliderInstance.getCurrentSlide(); },
      init: function() { return labSliderInstance.initialize(); },
      cleanup: function() { return labSliderInstance.cleanup(); },
      getData: function() { return labSliderInstance.getSlides(); }
    };
  }

  // ✅ CORREGIDO: API para exports (solo si es necesario)
  var LabSliderAPI = {
    init: labSliderInstance.initialize,
    cleanup: labSliderInstance.cleanup,
    next: labSliderInstance.nextSlide,
    prev: labSliderInstance.prevSlide,
    getState: labSliderInstance.getCurrentSlide,
    getImages: labSliderInstance.getCurrentImages,
    isInitialized: labSliderInstance.isInitialized,
    getSlides: labSliderInstance.getSlides,
    updateSlideData: labSliderInstance.updateSlideData,
    getInstance: function() { return labSliderInstance; }
  };

  // Solo exports si es necesario
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LabSliderAPI;
  }

  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return LabSliderAPI;
    });
  }

  // ✅ CORREGIDO: No return innecesario
})();
=======
export const buttonColor = '#596773'

export const labImages = [
  {
    id: 1,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-uno',
    label: 'Nombre del Laboratorio'
  },
  {
    id: 2,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/project-dos',
    label: 'Nombre del Laboratorio'
  },
  {
    id: 3,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
    label: 'Nombre del Laboratorio'
  },
  {
    id: 4,
    imageSrc: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj2',
    label: 'Nombre del Laboratorio'
  }
]

// Función helper para oscurecer un color
export const darkenColor = (color, percent) => {
  const num = parseInt(color.replace('#', ''), 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) - amt,
    G = ((num >> 8) & 0x00ff) - amt,
    B = (num & 0x0000ff) - amt
  return '#' + (0x1000000 + (R < 0 ? 0 : R) * 0x10000 + (G < 0 ? 0 : G) * 0x100 + (B < 0 ? 0 : B)).toString(16).slice(1)
}

// Funciones de navegación
export const getNextSlide = (currentSlide, totalSlides) => {
  return currentSlide === totalSlides - 1 ? 0 : currentSlide + 1
}

export const getPrevSlide = (currentSlide, totalSlides) => {
  return currentSlide === 0 ? totalSlides - 1 : currentSlide - 1
}

// Función para obtener las imágenes actuales
export const getCurrentImages = (currentSlide, images) => {
  const firstImageIndex = currentSlide
  const secondImageIndex = (currentSlide + 1) % images.length

  return {
    firstImage: images[firstImageIndex],
    secondImage: images[secondImageIndex]
  }
}

// Estilos inline para los botones
export const getButtonStyle = color => ({
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '50%',
  backgroundColor: color,
  color: 'white',
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  margin: '0 0.5rem',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  fontSize: '1.25rem'
})

export const navContainerStyle = {
  display: 'flex',
  marginTop: '1.5rem',
  position: 'relative',
  zIndex: 10
}
>>>>>>> 2d8d35b1ac780cae4c25b45686a49a08060ebc9f
