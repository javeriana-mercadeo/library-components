export default function swiperExperience (){
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

    if (window.Swiper) {
      window.experienceSwiper = new window.Swiper('.experience-swiper', {
        loop: true,
        spaceBetween: 2,
        // Pagination bullets
        pagination: {
          el: '.experience-pagination',
          clickable: true,
          dynamicBullets: true
        },
        // Navigation arrows
        navigation: {
          nextEl: '.experience-next',
          prevEl: '.experience-prev',
        },
        // Responsive breakpoints
        breakpoints: {
          0: {
            slidesPerView: 1
          },
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          },
          1280: { 
            slidesPerView: 5 
          }
        }
      });
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