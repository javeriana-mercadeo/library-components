function createStudentSlider(options = {}) {
  // Verificar entorno de navegador
  if (typeof window === 'undefined') {
    console.warn('Student Slider: No disponible en servidor');
    return null;
  }

  console.log('Student Slider Module cargado');

  // Configuración por defecto
  const defaultConfig = {
    sliderId: 'student-slider',
    autoSlideInterval: 5000,
    manualNavigationDelay: 5000,
    touchSensitivity: 30,
    touchMaxVerticalMovement: 100,
    touchDebounce: 300,
    waitElementMaxAttempts: 10,
    waitElementInterval: 100,
    initDelay: 100
  };

  const config = { ...defaultConfig, ...options };
  const SLIDER_NAMESPACE = `studentSlider_${config.sliderId}_${Date.now()}`;

  // Estado del slider
  let sliderState = {
    currentSlide: 0,
    autoSlideInterval: null,
    studentsCount: 0,
    isManualNavigation: false,
    manualNavigationTimeout: null,
    isInitialized: false,
    lastTouchTime: 0
  };

  // Función para buscar elementos con reintentos
  const waitForElement = (
    selector,
    maxAttempts = config.waitElementMaxAttempts,
    interval = config.waitElementInterval
  ) => {
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

  // Funciones auxiliares del slider
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

      const sliderContainer = await waitForElement(`#${config.sliderId}`);

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

        // Para React: Los eventos se manejan en el JSX
        // Para vanilla JS: configurar eventos aquí
        if (typeof React === 'undefined') {
          if (prevButton && nextButton) {
            prevButton.onclick = null;
            nextButton.onclick = null;

            prevButton.addEventListener(
              'click',
              e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                prevSlide(true);
              },
              { passive: false }
            );

            nextButton.addEventListener(
              'click',
              e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                nextSlide(true);
              },
              { passive: false }
            );

            console.log('Controles configurados para Vanilla JS');
          }

          // Configurar dots para vanilla JS
          const dots = document.querySelectorAll('.slider-dots .dot');
          dots.forEach((dot, index) => {
            dot.onclick = null;
            dot.addEventListener(
              'click',
              e => {
                e.preventDefault();
                e.stopImmediatePropagation();
                goToSlide(index, true);
              },
              { passive: false }
            );
          });

          if (dots.length > 0) {
            console.log(`${dots.length} dots configurados para Vanilla JS`);
          }
        } else {
          console.log('Eventos manejados por React');
        }
      };

      // Configurar eventos globales
      const setupGlobalEvents = () => {
        const sliderContent =
          document.querySelector(`#${config.sliderId}-content`) ||
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

        // Configurar eventos táctiles
        const setupTouchEvents = () => {
          let touchData = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            startTime: 0,
            isTouching: false,
            hasMoved: false
          };

          const handleTouchStart = e => {
            if (e.touches.length !== 1) return;

            const touch = e.touches[0];
            touchData = {
              startX: touch.clientX,
              startY: touch.clientY,
              currentX: touch.clientX,
              currentY: touch.clientY,
              startTime: Date.now(),
              isTouching: true,
              hasMoved: false
            };

            stopAutoSlide();
            console.log('Touch start:', touchData.startX, touchData.startY);
          };

          const handleTouchMove = e => {
            if (!touchData.isTouching || e.touches.length !== 1) return;

            const touch = e.touches[0];
            touchData.currentX = touch.clientX;
            touchData.currentY = touch.clientY;

            const deltaX = Math.abs(touchData.currentX - touchData.startX);
            const deltaY = Math.abs(touchData.currentY - touchData.startY);

            if (deltaX > 5 || deltaY > 5) {
              touchData.hasMoved = true;
            }

            if (deltaX > deltaY && deltaX > config.touchSensitivity / 2) {
              e.preventDefault();
              console.log('Previniendo scroll, deltaX:', deltaX, 'deltaY:', deltaY);
            }
          };

          const handleTouchEnd = e => {
            if (!touchData.isTouching) return;

            const touchEndTime = Date.now();
            const touchDuration = touchEndTime - touchData.startTime;

            if (touchEndTime - sliderState.lastTouchTime < config.touchDebounce) {
              console.log('Touch ignorado por debounce');
              touchData.isTouching = false;
              return;
            }

            const deltaX = touchData.currentX - touchData.startX;
            const deltaY = touchData.currentY - touchData.startY;
            const absDeltaX = Math.abs(deltaX);
            const absDeltaY = Math.abs(deltaY);

            console.log('Touch end - deltaX:', deltaX, 'deltaY:', deltaY, 'duration:', touchDuration);

            const isValidSwipe =
              touchData.hasMoved &&
              absDeltaX > config.touchSensitivity &&
              absDeltaX > absDeltaY &&
              absDeltaY < config.touchMaxVerticalMovement &&
              touchDuration < 1000;

            if (isValidSwipe) {
              sliderState.lastTouchTime = touchEndTime;

              if (deltaX > 0) {
                console.log('Swipe derecha - slide anterior');
                prevSlide(true);
              } else {
                console.log('Swipe izquierda - siguiente slide');
                nextSlide(true);
              }
            } else {
              console.log('Swipe no válido:', {
                hasMoved: touchData.hasMoved,
                absDeltaX,
                absDeltaY,
                touchDuration,
                isValidSwipe
              });

              setTimeout(() => {
                if (!sliderState.isManualNavigation && sliderState.isInitialized) {
                  startAutoSlide();
                }
              }, 500);
            }

            touchData.isTouching = false;
          };

          const handleTouchCancel = () => {
            console.log('Touch cancelado');
            touchData.isTouching = false;

            setTimeout(() => {
              if (!sliderState.isManualNavigation && sliderState.isInitialized) {
                startAutoSlide();
              }
            }, 500);
          };

          const touchArea = sliderContent || sliderContainer;

          if (touchArea) {
            // Remover eventos existentes
            const existingHandlers = {
              start: window[SLIDER_NAMESPACE + '_touchStartHandler'],
              move: window[SLIDER_NAMESPACE + '_touchMoveHandler'],
              end: window[SLIDER_NAMESPACE + '_touchEndHandler'],
              cancel: window[SLIDER_NAMESPACE + '_touchCancelHandler']
            };

            Object.values(existingHandlers).forEach(handler => {
              if (handler) {
                touchArea.removeEventListener('touchstart', handler);
                touchArea.removeEventListener('touchmove', handler);
                touchArea.removeEventListener('touchend', handler);
                touchArea.removeEventListener('touchcancel', handler);
              }
            });

            // Agregar nuevos eventos
            touchArea.addEventListener('touchstart', handleTouchStart, { passive: true });
            touchArea.addEventListener('touchmove', handleTouchMove, { passive: false });
            touchArea.addEventListener('touchend', handleTouchEnd, { passive: true });
            touchArea.addEventListener('touchcancel', handleTouchCancel, { passive: true });

            // Guardar referencias
            window[SLIDER_NAMESPACE + '_touchStartHandler'] = handleTouchStart;
            window[SLIDER_NAMESPACE + '_touchMoveHandler'] = handleTouchMove;
            window[SLIDER_NAMESPACE + '_touchEndHandler'] = handleTouchEnd;
            window[SLIDER_NAMESPACE + '_touchCancelHandler'] = handleTouchCancel;
            window[SLIDER_NAMESPACE + '_touchArea'] = touchArea;

            console.log('Eventos táctiles configurados en:', touchArea.id || touchArea.className);
          } else {
            console.warn('No se pudo encontrar área táctil para el slider');
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

      sliderState.isInitialized = true;
      updateSlideClasses();

      // Iniciar auto-slide
      setTimeout(() => {
        if (sliderState.isInitialized) {
          startAutoSlide();
        }
      }, 1000);

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

    // Inicialización manual
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
        isInitialized: false,
        lastTouchTime: 0
      };
      return await initializeSlider();
    }
  };

  // Auto-inicialización para contexto vanilla JS
  if (typeof React === 'undefined' && typeof document !== 'undefined') {
    const executeInit = () => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          setTimeout(initializeSlider, config.initDelay);
        });
      } else {
        setTimeout(initializeSlider, config.initDelay);
      }

      // Next.js ready
      if (typeof window !== 'undefined' && window.next) {
        window.addEventListener('load', () => {
          setTimeout(initializeSlider, config.initDelay + 100);
        });
      }

      // MutationObserver para contenido dinámico
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

        setTimeout(() => {
          if (observer) observer.disconnect();
        }, 15000);
      }
    };

    executeInit();
  }

  return sliderInstance;
}

// Para uso en Next.js/React: exponer globalmente solo si no es servidor
if (typeof window !== 'undefined') {
  window.createStudentSlider = createStudentSlider;
}

// Export para ES6 modules
export default createStudentSlider;