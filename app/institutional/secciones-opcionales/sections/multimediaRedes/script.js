export default function swiperCarousel() {

  const loadSwiper = async () => {

    if (typeof window !== 'undefined' && !window.Swiper) {

      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
      script.async = true

      script.onload = () => {

        setTimeout(() => {
          initializeSwiper()
        }, 100)
      }

      document.head.appendChild(script)

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
      document.head.appendChild(link)
    } else if (window.Swiper) {

      setTimeout(() => {
        initializeSwiper()
      }, 100)
    }
  }


  const initializeSwiper = () => {

    const swiperContainer = document.querySelector('.subjects-swiper')
    
    if (window.Swiper && swiperContainer) {

      if (swiperContainer.swiper) {
        swiperContainer.swiper.destroy(true, true)
      }


      const swiper = new window.Swiper('.subjects-swiper', {
        loop: true,
        spaceBetween: 30,
        grabCursor: true,
        centeredSlides: false,

        pagination: {
          el: '.subjects-pagination',
          clickable: true,
          dynamicBullets: true
        },
        

        navigation: {
          nextEl: '.subjects-next',
          prevEl: '.subjects-prev'
        },
        
        // Responsive breakpoints
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30
          }
        },

        // Eventos para debugging
        on: {
          init: function () {
            console.log('Swiper inicializado correctamente')
          },
          slideChange: function () {
            console.log('Slide cambiado')
          }
        }
      })

      return swiper
    } else {
      console.warn('Swiper o el contenedor no encontrado')
      // Intentar de nuevo después de un delay
      setTimeout(() => {
        initializeSwiper()
      }, 500)
    }
  }

  loadSwiper()
}