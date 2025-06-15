// script.js - Student Slider para repositorio local
// Compatible con React y Liferay

function createStudentSlider(options = {}) {
  if (typeof window === 'undefined') {
    console.warn('Student Slider: No se puede ejecutar en entorno servidor');
    return null;
  }

  console.log('Student Slider Module cargado');

  // Configuración por defecto
  const defaultConfig = {
    sliderId: 'student-slider',
    autoSlideInterval: 5000,
    manualNavigationDelay: 5000,
    waitElementMaxAttempts: 10,
    waitElementInterval: 100,
    initDelay: 100
  };

  const config = { ...defaultConfig, ...options };
  const SLIDER_NAMESPACE = `studentSlider_${config.sliderId}_${Date.now()}`;

  let sliderState = {
    currentSlide: 0,
    autoSlideInterval: null,
    studentsCount: 0,
    isManualNavigation: false,
    manualNavigationTimeout: null,
    isInitialized: false
  };

  // Función para buscar elementos con reintentos
  const waitForElement = (selector, maxAttempts = config.waitElementMaxAttempts, interval = config.waitElementInterval) => {
    return new Promise((resolve, reject) => {
      let attempts = 0;

      const check = () => {
        attempts++;
        const element = document.querySelector(selector);

        if (element) {
          console.log(`Elemento encontrado: ${selector}`);
          resolve(element);
        } else if (attempts >= maxAttempts) {
          console.warn(`Elemento no encontrado después de ${maxAttempts} intentos: ${selector}`);
          reject(new Error(`Element not found: ${selector}`));
        } else {
          console.log(`Intento ${attempts}/${maxAttempts} buscando: ${selector}`);
          setTimeout(check, interval);
        }
      };

      check();
    });
  };

  // Funciones del slider
  const getNextSlide = (current, total) => (current + 1) % total;
  const getPrevSlide = (current, total) => (current === 0 ? total - 1 : current - 1);

  const getSlideClass = (index, current, total) => {
    if (index === current) return 'active';

    const nextIndex = (current + 1) % total;
    const prevIndex = (current - 1 + total) % total;
    const nextNextIndex = (current + 2) % total;
    const prevPrevIndex = (current - 2 + total) % total;

    if (index === nextIndex) return 'next';
    if (index === prevIndex) return 'prev';
    if (index === nextNextIndex) return 'next-next';
    if (index === prevPrevIndex) return 'prev-prev';

    return '';
  };

  const updateSlideClasses = () => {
    if (!sliderState.isInitialized) return;

    try {
      const cards = document.querySelectorAll('.student-card');
      const dots = document.querySelectorAll('.slider-dots .dot');

      cards.forEach((card, index) => {
        card.classList.remove('active', 'next', 'prev', 'next-next', 'prev-prev');
        const slideClass = getSlideClass(index, sliderState.currentSlide, sliderState.studentsCount);
        if (slideClass) {
          card.classList.add(slideClass);
        }
        void card.offsetHeight; // Forzar reflow
      });

      dots.forEach((dot, index) => {
        if (dot) {
          dot.classList.toggle('active', index === sliderState.currentSlide);
        }
      });

      console.log(`Slide actualizado: ${sliderState.currentSlide + 1}/${sliderState.studentsCount}`);
    } catch (error) {
      console.error('Error actualizando slides:', error);
    }
  };

  // Declarar stopAutoSlide ANTES de startAutoSlide para evitar referencias
  const stopAutoSlide = () => {
    if (sliderState.autoSlideInterval) {
      clearInterval(sliderState.autoSlideInterval);
      sliderState.autoSlideInterval = null;
    }
  };

  const startAutoSlide = () => {
    if (sliderState.isManualNavigation || !sliderState.isInitialized) return;

    stopAutoSlide();
    sliderState.autoSlideInterval = setInterval(() => {
      nextSlide(false);
    }, config.autoSlideInterval);

    console.log('Auto-slide iniciado');
  };

  const handleManualNavigation = () => {
    sliderState.isManualNavigation = true;
    stopAutoSlide();

    if (sliderState.manualNavigationTimeout) {
      clearTimeout(sliderState.manualNavigationTimeout);
    }

    sliderState.manualNavigationTimeout = setTimeout(() => {
      sliderState.isManualNavigation = false;
      startAutoSlide();
    }, config.manualNavigationDelay);
  };

  const nextSlide = (isManual = false) => {
    if (!sliderState.isInitialized) return;

    if (isManual) {
      handleManualNavigation();
    } else if (sliderState.isManualNavigation) {
      return;
    }

    sliderState.currentSlide = getNextSlide(sliderState.currentSlide, sliderState.studentsCount);
    updateSlideClasses();
  };

  const prevSlide = (isManual = false) => {
    if (!sliderState.isInitialized) return;

    if (isManual) {
      handleManualNavigation();
    } else if (sliderState.isManualNavigation) {
      return;
    }

    sliderState.currentSlide = getPrevSlide(sliderState.currentSlide, sliderState.studentsCount);
    updateSlideClasses();
  };

  const goToSlide = (index, isManual = false) => {
    if (!sliderState.isInitialized || index === sliderState.currentSlide) return;

    if (isManual) {
      handleManualNavigation();
    } else if (sliderState.isManualNavigation) {
      return;
    }

    sliderState.currentSlide = index;
    updateSlideClasses();
  };

  // Función principal de inicialización
  const initializeSlider = async () => {
    try {
      console.log('Iniciando Student Slider Module...');

      // Esperar a que el slider esté disponible
      const sliderContainer = await waitForElement(`#${config.sliderId}`);

      // Contar estudiantes
      const cards = document.querySelectorAll('.student-card');
      sliderState.studentsCount = cards.length;

      if (sliderState.studentsCount === 0) {
        throw new Error('No se encontraron tarjetas de estudiantes');
      }

      console.log(`Slider encontrado con ${sliderState.studentsCount} estudiantes`);

      // Configurar controles
      const setupControls = () => {
        const prevButton = document.querySelector(`#${config.sliderId}-prev`);
        const nextButton = document.querySelector(`#${config.sliderId}-next`);

        // Solo vincular eventos en entorno Liferay (sin React)
        if (typeof React === 'undefined') {
          if (prevButton && nextButton) {
            prevButton.onclick = null;
            nextButton.onclick = null;

            prevButton.addEventListener('click', e => {
              e.preventDefault();
              e.stopImmediatePropagation();
              prevSlide(true);
            }, { passive: false });

            nextButton.addEventListener('click', e => {
              e.preventDefault();
              e.stopImmediatePropagation();
              nextSlide(true);
            }, { passive: false });

            console.log('Controles configurados para Liferay');
          }
        } else {
          console.log('Controles manejados por React');
        }

        // Configurar dots
        const dots = document.querySelectorAll('.slider-dots .dot');
        if (typeof React === 'undefined') {
          dots.forEach((dot, index) => {
            dot.onclick = null;
            dot.addEventListener('click', e => {
              e.preventDefault();
              e.stopImmediatePropagation();
              goToSlide(index, true);
            }, { passive: false });
          });
        }

        if (dots.length > 0) {
          console.log(`${dots.length} dots configurados`);
        }
      };

      // Configurar eventos globales
      const setupGlobalEvents = () => {
        // Hover en el contenido
        const sliderContent = document.querySelector(`#${config.sliderId}-content`) || 
                             document.querySelector(`#${config.sliderId}`);
        if (sliderContent) {
          sliderContent.addEventListener('mouseenter', stopAutoSlide);
          sliderContent.addEventListener('mouseleave', () => {
            if (!sliderState.isManualNavigation && sliderState.isInitialized) {
              startAutoSlide();
            }
          });
        }

        // Navegación por teclado
        const handleKeydown = e => {
          const sliderRect = sliderContainer.getBoundingClientRect();
          const isVisible = sliderRect.top < window.innerHeight && sliderRect.bottom > 0;

          if (!isVisible) return;

          if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide(true);
          } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide(true);
          }
        };

        document.addEventListener('keydown', handleKeydown);
        window[SLIDER_NAMESPACE + '_keydownHandler'] = handleKeydown;

        // Soporte táctil para móviles
        const setupTouchEvents = () => {
          let touchStartX = 0;
          let touchStartY = 0;
          let touchEndX = 0;
          let touchEndY = 0;
          let isTouch = false;

          const handleTouchStart = e => {
            if (e.touches.length > 1) return; // Solo un dedo
            
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            isTouch = true;
            
            // Pausar auto-slide durante el touch
            stopAutoSlide();
          };

          const handleTouchMove = e => {
            if (!isTouch || e.touches.length > 1) return;
            
            // Prevenir scroll vertical si hay swipe horizontal
            const touchCurrentX = e.touches[0].clientX;
            const touchCurrentY = e.touches[0].clientY;
            const deltaX = Math.abs(touchCurrentX - touchStartX);
            const deltaY = Math.abs(touchCurrentY - touchStartY);
            
            if (deltaX > deltaY && deltaX > 10) {
              e.preventDefault();
            }
          };

          const handleTouchEnd = e => {
            if (!isTouch) return;
            
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);
            
            // Verificar que es un swipe horizontal
            if (absDeltaX > absDeltaY && absDeltaX > 50) {
              if (deltaX > 0) {
                // Swipe derecha = slide anterior
                prevSlide(true);
              } else {
                // Swipe izquierda = siguiente slide
                nextSlide(true);
              }
            }
            
            isTouch = false;
            
            // Reanudar auto-slide después de un delay
            setTimeout(() => {
              if (!sliderState.isManualNavigation && sliderState.isInitialized) {
                startAutoSlide();
              }
            }, 1000);
          };

          const handleTouchCancel = () => {
            isTouch = false;
            // Reanudar auto-slide
            setTimeout(() => {
              if (!sliderState.isManualNavigation && sliderState.isInitialized) {
                startAutoSlide();
              }
            }, 500);
          };

          // Agregar eventos táctiles al contenedor del slider
          const touchArea = sliderContent || sliderContainer;
          if (touchArea) {
            touchArea.addEventListener('touchstart', handleTouchStart, { passive: false });
            touchArea.addEventListener('touchmove', handleTouchMove, { passive: false });
            touchArea.addEventListener('touchend', handleTouchEnd, { passive: true });
            touchArea.addEventListener('touchcancel', handleTouchCancel, { passive: true });
            
            // Guardar referencias para limpieza
            window[SLIDER_NAMESPACE + '_touchStartHandler'] = handleTouchStart;
            window[SLIDER_NAMESPACE + '_touchMoveHandler'] = handleTouchMove;
            window[SLIDER_NAMESPACE + '_touchEndHandler'] = handleTouchEnd;
            window[SLIDER_NAMESPACE + '_touchCancelHandler'] = handleTouchCancel;
            window[SLIDER_NAMESPACE + '_touchArea'] = touchArea;
            
            console.log('Eventos táctiles configurados');
          }
        };

        setupTouchEvents();

        // Visibilidad de la página
        const handleVisibilityChange = () => {
          if (document.hidden) {
            stopAutoSlide();
            if (sliderState.manualNavigationTimeout) {
              clearTimeout(sliderState.manualNavigationTimeout);
            }
          } else if (!sliderState.isManualNavigation && sliderState.isInitialized) {
            startAutoSlide();
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window[SLIDER_NAMESPACE + '_visibilityHandler'] = handleVisibilityChange;
      };

      // Configurar lazy loading
      const setupLazyLoading = () => {
        if (!('IntersectionObserver' in window)) return;

        const images = document.querySelectorAll('.student-card .student-image img');
        if (images.length === 0) return;

        const imageObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src && !img.src.includes(img.dataset.src)) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
              }
              imageObserver.unobserve(img);
            }
          });
        });

        images.forEach(img => imageObserver.observe(img));
        window[SLIDER_NAMESPACE + '_imageObserver'] = imageObserver;
        console.log(`Lazy loading configurado para ${images.length} imágenes`);
      };

      // Ejecutar configuración
      setupControls();
      setupGlobalEvents();
      setupLazyLoading();

      // Marcar como inicializado
      sliderState.isInitialized = true;

      // Inicializar estado visual
      updateSlideClasses();

      // Iniciar auto-slide después de un pequeño delay
      setTimeout(() => {
        if (sliderState.isInitialized) {
          startAutoSlide();
        }
      }, 1000);

      // Guardar referencia global
      window[SLIDER_NAMESPACE] = sliderState;

      console.log('Student Slider Module inicializado correctamente');

      return sliderInstance;
    } catch (error) {
      console.error('Error inicializando slider:', error);
      return null;
    }
  };

  // Función de limpieza
  const cleanup = () => {
    try {
      console.log('Limpiando Student Slider Module...');

      sliderState.isInitialized = false;
      stopAutoSlide();

      if (sliderState.manualNavigationTimeout) {
        clearTimeout(sliderState.manualNavigationTimeout);
      }

      // Limpiar eventos globales
      const keydownHandler = window[SLIDER_NAMESPACE + '_keydownHandler'];
      if (keydownHandler) {
        document.removeEventListener('keydown', keydownHandler);
        delete window[SLIDER_NAMESPACE + '_keydownHandler'];
      }

      const visibilityHandler = window[SLIDER_NAMESPACE + '_visibilityHandler'];
      if (visibilityHandler) {
        document.removeEventListener('visibilitychange', visibilityHandler);
        delete window[SLIDER_NAMESPACE + '_visibilityHandler'];
      }

      // Limpiar eventos táctiles
      const touchArea = window[SLIDER_NAMESPACE + '_touchArea'];
      const touchStartHandler = window[SLIDER_NAMESPACE + '_touchStartHandler'];
      const touchMoveHandler = window[SLIDER_NAMESPACE + '_touchMoveHandler'];
      const touchEndHandler = window[SLIDER_NAMESPACE + '_touchEndHandler'];
      const touchCancelHandler = window[SLIDER_NAMESPACE + '_touchCancelHandler'];

      if (touchArea && touchStartHandler) {
        touchArea.removeEventListener('touchstart', touchStartHandler);
        touchArea.removeEventListener('touchmove', touchMoveHandler);
        touchArea.removeEventListener('touchend', touchEndHandler);
        touchArea.removeEventListener('touchcancel', touchCancelHandler);
        
        delete window[SLIDER_NAMESPACE + '_touchArea'];
        delete window[SLIDER_NAMESPACE + '_touchStartHandler'];
        delete window[SLIDER_NAMESPACE + '_touchMoveHandler'];
        delete window[SLIDER_NAMESPACE + '_touchEndHandler'];
        delete window[SLIDER_NAMESPACE + '_touchCancelHandler'];
      }

      const imageObserver = window[SLIDER_NAMESPACE + '_imageObserver'];
      if (imageObserver) {
        imageObserver.disconnect();
        delete window[SLIDER_NAMESPACE + '_imageObserver'];
      }

      delete window[SLIDER_NAMESPACE];
      console.log('Limpieza completada');
    } catch (error) {
      console.error('Error en limpieza:', error);
    }
  };

  // API pública del slider
  const sliderInstance = {
    // Métodos de control
    next: () => nextSlide(true),
    prev: () => prevSlide(true),
    goTo: index => goToSlide(index, true),

    // Métodos de auto-slide
    start: startAutoSlide,
    stop: stopAutoSlide,

    // Estado
    getCurrentSlide: () => sliderState.currentSlide,
    getSlideCount: () => sliderState.studentsCount,
    isInitialized: () => sliderState.isInitialized,

    // Configuración
    getConfig: () => ({ ...config }),

    // Limpieza
    destroy: cleanup,

    // Inicialización manual para React
    init: initializeSlider,

    // Reinicialización
    reinit: async (newOptions = {}) => {
      cleanup();
      Object.assign(config, newOptions);
      sliderState = {
        currentSlide: 0,
        autoSlideInterval: null,
        studentsCount: 0,
        isManualNavigation: false,
        manualNavigationTimeout: null,
        isInitialized: false
      };
      return await initializeSlider();
    }
  };

  // Auto-inicializar SOLO en contexto Liferay (sin React)
  if (typeof React === 'undefined' && typeof document !== 'undefined') {
    // Múltiples estrategias de inicialización para Liferay
    const executeInit = () => {
      // Estrategia 1: DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(initializeSlider, config.initDelay);
        });
      } else {
        setTimeout(initializeSlider, config.initDelay);
      }

      // Estrategia 2: Liferay ready (si está disponible)
      if (typeof window.Liferay !== 'undefined' && window.Liferay.on) {
        window.Liferay.on('allPortletsReady', () => {
          setTimeout(initializeSlider, config.initDelay + 100);
        });
      }

      // Estrategia 3: MutationObserver para contenido dinámico
      if ('MutationObserver' in window) {
        const observer = new MutationObserver(mutations => {
          const sliderAdded = mutations.some(mutation =>
            Array.from(mutation.addedNodes).some(
              node =>
                node.nodeType === 1 &&
                (node.id === config.sliderId || 
                 (node.querySelector && node.querySelector(`#${config.sliderId}`)))
            )
          );

          if (sliderAdded && !sliderState.isInitialized) {
            observer.disconnect();
            setTimeout(initializeSlider, config.initDelay + 200);
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

    // Ejecutar inicialización solo en Liferay
    executeInit();
  }

  // Retornar instancia del slider
  return sliderInstance;
}

// Para contexto Liferay: exponer globalmente
if (typeof window !== 'undefined' && typeof React === 'undefined') {
  window.createStudentSlider = createStudentSlider;
}

// UNA SOLA FUNCIÓN EXPORTADA para React
export default createStudentSlider;