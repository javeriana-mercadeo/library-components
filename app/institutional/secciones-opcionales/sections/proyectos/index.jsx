import { useEffect, useState, useRef } from 'react';
import DetalleProyecto from './components/detalleProyecto';
import './styles.scss';

// Datos de ejemplo - reemplazar con tu API o JSON
const SLIDES_DATA = [
  {
    id: 0,
    imagenPrincipal: 'https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg',
    titulo: 'Universidad Destacada',
    descripcionCorta: 'Descubre nuestros programas académicos de alta calidad.',
    tituloModal: 'Universidad Destacada',
    fecha: '2024',
    responsable: 'Equipo Académico',
    descripcionCompleta: 'Descubre nuestros programas académicos de alta calidad.',
    videosYoutube: ['https://www.youtube.com/watch?v=Y2KdypoCAYg&t=27s'],
    galeriaImagenes: ['https://www.javeriana.edu.co/sostenibilidad/wp-content/uploads/2021/07/Campus-Sustentable_0000_Javeriana-Sostenible.jpg']
  },
  {
    id: 1,
    imagenPrincipal: 'https://www.javeriana.edu.co/recursosdb/d/info-prg/proj1',
    titulo: 'Investigación de Clase Mundial',
    descripcionCorta: 'Proyectos innovadores y logros académicos destacados.',
    tituloModal: 'Investigación de Clase Mundial',
    fecha: '2023-2024',
    responsable: 'Centro de Investigación',
    descripcionCompleta: 'Proyectos innovadores y logros académicos destacados.',
    videosYoutube: ['https://www.youtube.com/watch?v=h3GuFxrk8aI'],
    galeriaImagenes: []
  }
];

const CONFIG = {
  SLIDE_TRANSITION_DURATION: 400,
  MIN_SWIPE_DISTANCE: 50
};

export default function Proyectos() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth <= 767;
  const isTabletSmall = () => typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth <= 899;
  const isMobileTablet = () => typeof window !== 'undefined' && window.innerWidth < 900;
  const shouldShowNavigationButtons = () => typeof window !== 'undefined' && window.innerWidth >= 900;

  const calculateRealLimit = () => {
    if (!containerRef.current) return 0;

    const containerWidth = containerRef.current.offsetWidth;
    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;
    const contentWidth = (SLIDES_DATA.length * slideWidth) + ((SLIDES_DATA.length - 1) * gap);

    if (contentWidth <= containerWidth) return 0;

    if (isMobileTablet()) {
      const slidesCompletelyVisible = Math.floor(containerWidth / (slideWidth + gap));
      return Math.max(0, SLIDES_DATA.length - slidesCompletelyVisible);
    }

    const maxDisplacement = contentWidth - containerWidth;
    const lastValidPosition = Math.floor(maxDisplacement / (slideWidth + gap));
    return Math.min(lastValidPosition, SLIDES_DATA.length - 1);
  };

  const shouldCenterContent = () => {
    if (!containerRef.current) return false;

    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;
    const containerWidth = containerRef.current.offsetWidth;
    const totalContentWidth = (SLIDES_DATA.length * slideWidth) + ((SLIDES_DATA.length - 1) * gap);

    if (totalContentWidth <= containerWidth) return true;
    if (SLIDES_DATA.length <= 2) return true;

    if (isMobileTablet()) {
      return totalContentWidth <= (containerWidth - 40);
    }

    if (SLIDES_DATA.length === 3 && typeof window !== 'undefined' && window.innerWidth >= 900) return true;
    if (SLIDES_DATA.length === 4 && typeof window !== 'undefined' && window.innerWidth >= 1200) return true;

    return false;
  };

  const updatePosition = () => {
    if (!wrapperRef.current || !containerRef.current) return;

    if (shouldCenterContent()) {
      wrapperRef.current.style.transform = 'none';
      return;
    }

    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;
    const translateX = currentSlide * (slideWidth + gap);
    
    wrapperRef.current.style.transform = `translateX(-${translateX}px)`;
  };

  const nextSlide = () => {
    if (isTransitioning) return;

    const limit = calculateRealLimit();
    if (currentSlide >= limit) return;

    setIsTransitioning(true);
    setCurrentSlide(prev => prev + 1);

    setTimeout(() => {
      setIsTransitioning(false);
    }, CONFIG.SLIDE_TRANSITION_DURATION);
  };

  const prevSlide = () => {
    if (isTransitioning || currentSlide <= 0) return;

    setIsTransitioning(true);
    setCurrentSlide(prev => prev - 1);

    setTimeout(() => {
      setIsTransitioning(false);
    }, CONFIG.SLIDE_TRANSITION_DURATION);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentSlide) return;

    const limit = calculateRealLimit();
    if (index >= 0 && index <= limit) {
      setIsTransitioning(true);
      setCurrentSlide(index);

      setTimeout(() => {
        setIsTransitioning(false);
      }, CONFIG.SLIDE_TRANSITION_DURATION);
    }
  };

  const handleTouchStart = (e) => {
    if (isTransitioning) return;
    touchStartX.current = e.touches[0].clientX;
    setIsTouching(true);
  };

  const handleTouchEnd = (e) => {
    if (!isTouching) return;

    touchEndX.current = e.changedTouches[0].clientX;
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > CONFIG.MIN_SWIPE_DISTANCE) {
      const limit = calculateRealLimit();
      
      if (distance > 0 && currentSlide < limit) {
        nextSlide();
      } else if (distance < 0 && currentSlide > 0) {
        prevSlide();
      }
    }

    setIsTouching(false);
  };

  const handleSlideClick = (project) => {
    if (!isTouching) {
      setSelectedProject(project);
      setModalOpen(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    const handleResize = () => {
      updatePosition();
    };

    const handleKeyDown = (e) => {
      if (modalOpen) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKeyDown);

    updatePosition();

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentSlide, modalOpen]);

  const limit = calculateRealLimit();

  return (
    <section className="container hero-carousel" id="carousel-section">
      <div>
        <h2 className="title title-lg carousel-title">
          Proyectos Destacados
        </h2>
      </div>

      <div className="container main-container" id="proyectos-container">
        <div>
          <div 
            className="carousel-container swiper"
            id="carousel-container"
            ref={containerRef}
            data-slides-count={SLIDES_DATA.length}
            data-max-cards="4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="swiper-wrapper" 
              id="slides-wrapper"
              ref={wrapperRef}
            >
              {SLIDES_DATA.map((slide, index) => (
                <div
                  key={slide.id}
                  className="carousel-slide swiper-slide"
                  data-slide-index={index}
                  onClick={() => handleSlideClick(slide)}
                >
                  <div 
                    className="slide-image"
                    style={{ backgroundImage: `url('${slide.imagenPrincipal}')` }}
                  >
                    <img 
                      src={slide.imagenPrincipal} 
                      alt={slide.titulo}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="slide-content">
                    <h3 className="slide-title">{slide.titulo}</h3>
                    <p className="paragraph paragraph-neutral paragraph-md description">
                      {slide.descripcionCorta}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {shouldShowNavigationButtons() && (
              <div className="carousel-controls" id="carousel-controls">
                <button
                  className="carousel-control prev"
                  type="button"
                  aria-label="Slide anterior"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  <i className="ph ph-arrow-circle-left" aria-hidden="true"></i>
                </button>
                <button
                  className="carousel-control next"
                  type="button"
                  aria-label="Slide siguiente"
                  onClick={nextSlide}
                  disabled={currentSlide >= limit}
                >
                  <i className="ph ph-arrow-circle-right" aria-hidden="true"></i>
                </button>
              </div>
            )}

            <div className="carousel-indicators" id="carousel-indicators">
              {SLIDES_DATA.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  data-indicator-index={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {modalOpen && selectedProject && (
        <DetalleProyecto 
          project={selectedProject} 
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
}