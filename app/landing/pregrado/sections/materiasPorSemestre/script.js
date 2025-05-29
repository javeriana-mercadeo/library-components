export default function swiperCarousel() {
    // Función para cargar Swiper dinámicamente
    const loadSwiper = async () => {
        // Verificar si Swiper ya está cargado
        if (typeof window !== 'undefined' && !window.Swiper) {
            // Crear y agregar el script de Swiper
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js';
            script.async = true;
            
            script.onload = () => {
                initializeSwiper();
            };
            
            document.head.appendChild(script);
            
            // También cargar los estilos CSS
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css';
            document.head.appendChild(link);
        } else if (window.Swiper) {
            // Si Swiper ya está cargado, inicializar directamente
            initializeSwiper();
        }
    };

    // Función para inicializar Swiper
    const initializeSwiper = () => {
        if (window.Swiper) {
            new window.Swiper('.subjects-swiper', {
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
                    prevEl: '.subjects-prev',
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
            });
        }
    };

    // Ejecutar la carga de Swiper
    loadSwiper();
}