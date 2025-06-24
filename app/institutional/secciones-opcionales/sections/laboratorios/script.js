(function() {
  'use strict';

  if (typeof window === 'undefined') {
    return;
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
          updateContent();
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
      if (!isInitialized || slides.length === 0) {
        return;
      }
      
      currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
      updateContent();
    }

    function prevSlide() {
      if (!isInitialized || slides.length === 0) {
        return;
      }
      
      currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
      updateContent();
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

      var titleElement = null;
      for (var i = 0; i < titleSelectors.length; i++) {
        titleElement = document.querySelector(titleSelectors[i]);
        if (titleElement) break;
      }

      if (titleElement) {
        if (titleElement.hasAttribute('data-lfr-editable-id')) {
          titleElement.innerHTML = currentSlideData.title;
        } else {
          titleElement.textContent = currentSlideData.title;
        }
      }

      var paragraphElement = null;
      for (var i = 0; i < descriptionSelectors.length; i++) {
        paragraphElement = document.querySelector(descriptionSelectors[i]);
        if (paragraphElement) break;
      }

      if (paragraphElement) {
        if (paragraphElement.hasAttribute('data-lfr-editable-id')) {
          paragraphElement.innerHTML = currentSlideData.description;
        } else {
          paragraphElement.textContent = currentSlideData.description;
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

      if (imageContainers[0] && images.firstImage.imageSrc) {
        imageContainers[0].src = images.firstImage.imageSrc;
        imageContainers[0].alt = images.firstImage.label || 'Laboratorio';
      }
      if (imageLabels[0]) {
        imageLabels[0].textContent = images.firstImage.label || 'Lab';
      }

      if (imageContainers[1] && images.secondImage && images.secondImage.imageSrc) {
        imageContainers[1].src = images.secondImage.imageSrc;
        imageContainers[1].alt = images.secondImage.label || 'Laboratorio';
      }
      if (imageLabels[1] && images.secondImage) {
        imageLabels[1].textContent = images.secondImage.label || 'Lab';
      }
    }

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
      }
    }

    function bindEvents() {
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

      var prevButton = null;
      for (var i = 0; i < prevSelectors.length; i++) {
        prevButton = document.querySelector(prevSelectors[i]);
        if (prevButton) break;
      }

      var nextButton = null;
      for (var i = 0; i < nextSelectors.length; i++) {
        nextButton = document.querySelector(nextSelectors[i]);
        if (nextButton) break;
      }

      if (prevButton) {
        prevButton.onclick = null;
        prevButton.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          prevSlide();
        }, { passive: false });
      }

      if (nextButton) {
        nextButton.onclick = null;
        nextButton.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          nextSlide();
        }, { passive: false });
      }
    }

    function handleResize() {
      if (isInitialized) {
        initializeButtons();
      }
    }

    function initialize() {
      return new Promise(function(resolve) {
        try {
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
              updateContent();
              bindEvents();

              window.removeEventListener('resize', handleResize);
              window.addEventListener('resize', handleResize);

              isInitialized = true;
              resolve(true);
            } catch (error) {
              resolve(false);
            }
          }

          tryNextSelector();

        } catch (error) {
          resolve(false);
        }
      });
    }

    function cleanup() {
      try {
        isInitialized = false;
        window.removeEventListener('resize', handleResize);
      } catch (error) {
        console.error('Error en limpieza:', error);
      }
    }

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

  var labSliderInstance = createLabSlider();

  function executeInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setTimeout(function() {
          labSliderInstance.initialize();
        }, 100);
      });
    } else {
      setTimeout(function() {
        labSliderInstance.initialize();
      }, 100);
    }

    if (typeof window.Liferay !== 'undefined' && window.Liferay.on) {
      window.Liferay.on('allPortletsReady', function() {
        setTimeout(function() {
          labSliderInstance.initialize();
        }, 200);
      });
    }

    if ('MutationObserver' in window) {
      var observer = new MutationObserver(function(mutations) {
        var labSliderAdded = mutations.some(function(mutation) {
          return Array.from(mutation.addedNodes).some(function(node) {
            return node.nodeType === 1 &&
                   (node.classList && node.classList.contains('lab-slider')) ||
                   (node.querySelector && node.querySelector('.lab-slider'));
          });
        });

        if (labSliderAdded && !labSliderInstance.isInitialized()) {
          observer.disconnect();
          setTimeout(function() {
            labSliderInstance.initialize();
          }, 300);
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      setTimeout(function() {
        if (observer) observer.disconnect();
      }, 15000);
    }
  }

  executeInit();

  window.labSliderInstance = labSliderInstance;

  window.labSliderDebug = {
    next: function() { return labSliderInstance.nextSlide(); },
    prev: function() { return labSliderInstance.prevSlide(); },
    getState: function() { return labSliderInstance.getCurrentSlide(); },
    init: function() { return labSliderInstance.initialize(); },
    cleanup: function() { return labSliderInstance.cleanup(); },
    getData: function() { return labSliderInstance.getSlides(); }
  };

  // Exports para repositorio Node.js local
  var LabSliderAPI = {
    init: labSliderInstance.initialize,
    cleanup: labSliderInstance.cleanup,
    next: function() { return labSliderInstance.nextSlide(); },
    prev: function() { return labSliderInstance.prevSlide(); },
    getState: function() { return labSliderInstance.getCurrentSlide(); },
    getImages: function() { return labSliderInstance.getCurrentImages(); },
    isInitialized: function() { return labSliderInstance.isInitialized(); },
    getCurrentSlide: function() { return labSliderInstance.getCurrentSlide(); },
    getCurrentImages: function() { return labSliderInstance.getCurrentImages(); },
    getSlides: function() { return labSliderInstance.getSlides(); },
    updateSlideData: labSliderInstance.updateSlideData,
    getInstance: function() { return labSliderInstance; }
  };

  // CommonJS export (Node.js)
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = LabSliderAPI;
    module.exports.default = LabSliderAPI;
    module.exports.LabSlider = LabSliderAPI;
    module.exports.labSliderInstance = labSliderInstance;
  }

  // AMD export (RequireJS)
  if (typeof define === 'function' && define.amd) {
    define([], function() {
      return LabSliderAPI;
    });
  }

  // ES6 export para bundlers modernos
  if (typeof window !== 'undefined') {
    window.LabSlider = LabSliderAPI;
    window.LabSliderAPI = LabSliderAPI;
  }

  // Global export
  if (typeof globalThis !== 'undefined') {
    globalThis.LabSlider = LabSliderAPI;
    globalThis.LabSliderAPI = LabSliderAPI;
  }

  return LabSliderAPI;

})();