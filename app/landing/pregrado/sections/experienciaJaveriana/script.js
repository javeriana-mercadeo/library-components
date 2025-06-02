export default function swiperExperience() {
  // Función para cargar Swiper dinámicamente
  const loadSwiper = async () => {
    // Verificar si Swiper ya está cargado globalmente
    if (typeof window !== 'undefined' && !window.Swiper) {
      // Verificar si ya existe el script
      const existingScript = document.querySelector('#swiper-js');
      const existingCSS = document.querySelector('#swiper-css');
      
      if (!existingScript) {
        // Cargar CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
        link.id = 'swiper-css';
        document.head.appendChild(link);

        // Cargar JS
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
        script.async = true;
        script.id = 'swiper-js';
        
        return new Promise((resolve) => {
          script.onload = () => {
            initializeSwiper();
            resolve();
          };
          document.head.appendChild(script);
        });
      } else {
        // Si el script existe pero Swiper no está listo, esperar
        return new Promise((resolve) => {
          const checkSwiper = () => {
            if (window.Swiper) {
              initializeSwiper();
              resolve();
            } else {
              setTimeout(checkSwiper, 100);
            }
          };
          checkSwiper();
        });
      }
    } else if (window.Swiper) {
      // Si Swiper ya está cargado, inicializar directamente
      initializeSwiper();
    }
  };

  // Función para inicializar Swiper específico para experience
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true);
    }

    // Verificar que el elemento existe
    const element = document.querySelector('.experience-swiper');
    if (!element) {
      console.warn('Elemento .experience-swiper no encontrado');
      return;
    }

    // Contar el número de slides disponibles
    const slides = element.querySelectorAll('.swiper-slide');
    const slideCount = slides.length;

    if (window.Swiper) {
      window.experienceSwiper = new window.Swiper('.experience-swiper', {
        // PROBLEMA 1: Loop infinito arreglado
        loop: true,
        loopedSlides: slideCount, // Especificar número de slides para loop
        centeredSlides: false,
        grabCursor: true,
        
        // PROBLEMA 2: Espaciado arreglado
        spaceBetween: 20, // Aumentado de 2 a 20 para mejor spacing
        
        // Lazy loading para mejor rendimiento
        lazy: {
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        },

        // Configuración de accesibilidad
        a11y: {
          enabled: true,
          prevSlideMessage: 'Experiencia anterior',
          nextSlideMessage: 'Siguiente experiencia',
        },

        // Keyboard navigation
        keyboard: {
          enabled: true,
          onlyInViewport: true,
        },

        // Pagination bullets (opcional)
        pagination: {
          el: '.experience-pagination',
          clickable: true,
          dynamicBullets: true,
        },

        // Navigation arrows
        navigation: {
          nextEl: '.experience-next',
          prevEl: '.experience-prev',
        },

        // PROBLEMA 3: Breakpoints mejorados para responsive
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 15,
            centeredSlides: true, // Centrar en móviles
          },
          480: {
            slidesPerView: 1.2,
            spaceBetween: 15,
            centeredSlides: false,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 25,
            centeredSlides: false,
          },
          1280: { 
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false,
          },
          1440: {
            slidesPerView: 5,
            spaceBetween: 30,
            centeredSlides: false,
          }
        },

        // Eventos para manejo de videos
        on: {
          init: function() {
            console.log('Swiper Experience inicializado correctamente');
            // Pausar videos cuando no están visibles
            pauseInactiveVideos(this);
          },
          slideChange: function() {
            // Pausar todos los videos y reproducir el actual si existe
            pauseInactiveVideos(this);
            playActiveVideo(this);
          },
          reachEnd: function() {
            // Asegurar que el loop funcione correctamente
            if (this.params.loop) {
              this.loopFix();
            }
          },
          reachBeginning: function() {
            // Asegurar que el loop funcione correctamente
            if (this.params.loop) {
              this.loopFix();
            }
          }
        }
      });

      // Agregar event listeners adicionales
      addCustomEventListeners();
      
      console.log('Swiper Experience inicializado exitosamente con', slideCount, 'slides');
    }
  };

  // Función para pausar videos inactivos
  const pauseInactiveVideos = (swiper) => {
    const videos = swiper.el.querySelectorAll('video');
    videos.forEach(video => {
      if (!video.paused) {
        video.pause();
      }
    });
  };

  // Función para reproducir video activo
  const playActiveVideo = (swiper) => {
    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
      const video = activeSlide.querySelector('video');
      if (video && video.paused) {
        video.play().catch(err => {
          console.warn('No se pudo reproducir el video automáticamente:', err);
        });
      }
    }
  };

  // Función para agregar event listeners personalizados
  const addCustomEventListeners = () => {
    const swiperContainer = document.querySelector('.experience-swiper');
    
    if (swiperContainer && window.experienceSwiper) {
      // Intersection Observer para pausar/reanudar cuando sale de vista
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (window.experienceSwiper) {
            if (!entry.isIntersecting) {
              // Pausar todos los videos cuando no está visible
              pauseInactiveVideos(window.experienceSwiper);
            }
          }
        });
      }, { threshold: 0.5 });

      observer.observe(swiperContainer);
    }
  };

  // Ejecutar la carga de Swiper
  loadSwiper();

  // Retornar función de cleanup
  return () => {
    if (window.experienceSwiper) {
      window.experienceSwiper.destroy(true, true);
      window.experienceSwiper = null;
    }
  };
}