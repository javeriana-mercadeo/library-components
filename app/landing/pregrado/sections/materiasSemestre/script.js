export default function swiperCarousel() {
  // Función para cargar Swiper dinámicamente
  const loadSwiper = async () => {
    // Verificar si Swiper ya está cargado globalmente
    if (typeof window !== 'undefined' && !window.Swiper) {
      // Verificar si ya existe el script
      const existingScript = document.querySelector('#swiper-js')
      const existingCSS = document.querySelector('#swiper-css')

      if (!existingScript) {
        // Cargar CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
        link.id = 'swiper-css'
        document.head.appendChild(link)

        // Cargar JS
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
        script.async = true
        script.id = 'swiper-js'

        return new Promise(resolve => {
          script.onload = () => {
            initializeSwiper()
            resolve()
          }
          document.head.appendChild(script)
        })
      } else {
        // Si el script existe pero Swiper no está listo, esperar
        return new Promise(resolve => {
          const checkSwiper = () => {
            if (window.Swiper) {
              initializeSwiper()
              resolve()
            } else {
              setTimeout(checkSwiper, 100)
            }
          }
          checkSwiper()
        })
      }
    } else if (window.Swiper) {
      // Si Swiper ya está cargado, inicializar directamente
      initializeSwiper()
    }
  }

  // Función para inicializar Swiper específico para subjects
  const initializeSwiper = () => {
    // Destruir instancia existente si existe
    if (window.subjectsSwiper) {
      window.subjectsSwiper.destroy(true, true)
    }

    // Verificar que el elemento existe
    const element = document.querySelector('.subjects-swiper')
    if (!element) {
      console.warn('Elemento .subjects-swiper no encontrado')
      return
    }

    if (window.Swiper) {
      window.subjectsSwiper = new window.Swiper('.subjects-swiper', {
        loop: true,
        spaceBetween: 30,
        // Pagination bullets
        pagination: {
          el: '.subjects-pagination',
          clickable: true,
          dynamicBullets: true
        },
        // Navigation arrows
        navigation: {
          nextEl: '.subjects-next',
          prevEl: '.subjects-prev'
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
          }
        }
      })
    }
  }

  // Ejecutar la carga de Swiper
  loadSwiper()
}

// Retornar función de cleanup
return () => {
  if (window.subjectsSwiper) {
    window.subjectsSwiper.destroy(true, true)
    window.subjectsSwiper = null
  }
}
