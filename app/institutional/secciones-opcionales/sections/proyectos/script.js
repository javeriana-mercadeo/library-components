(function() {
  'use strict';

  console.log('Inicializando Carousel v8.0...');

  // Variables globales
  let currentSlide = 0;
  let totalSlides = 0;
  let isTransitioning = false;
  let isInitialized = false;

  // Touch variables
  let touchStartX = 0;
  let touchEndX = 0;
  let isTouching = false;

  // Configuración
  const CONFIG = {
    INIT_TIMEOUT: 100,
    MAX_RETRIES: 5,
    SLIDE_TRANSITION_DURATION: 400,
    MIN_SWIPE_DISTANCE: 50,
    RESPONSIVE_BREAKPOINTS: {
      MOBILE: 768,
      TABLET: 900,
      DESKTOP: 1200
    }
  };

  let initRetries = 0;
  let preventiveMonitorInterval = null;

  // Funciones de detección de dispositivo
  function isMobileTablet() {
    return window.innerWidth < 900;
  }

  function isMobile() {
    return window.innerWidth <= 767;
  }

  function isTabletSmall() {
    return window.innerWidth >= 768 && window.innerWidth <= 899;
  }

  function shouldShowNavigationButtons() {
    return window.innerWidth >= 900;
  }

  // Aplicar fix para mobile/tablet
  function applyMobileTabletFix() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');

    if (!carouselSection || !container || !wrapper) {
      console.log('Elementos no encontrados para mobile fix');
      return;
    }

    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;

    console.log(`Aplicando fix para ${slideCount} slides en ${window.innerWidth}px`);

    if (isMobileTablet()) {
      carouselSection.classList.remove('content-fits', 'no-navigation', 'has-navigation', 'mobile-last-card-fix', 'mobile-needs-scroll', 'force-center-mobile', 'force-navigation-mobile');
      container.classList.remove('auto-center', 'force-center');
      wrapper.classList.remove('force-center');

      const slideWidth = 260;
      const gap = 8;
      const containerWidth = container.offsetWidth;
      const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);

      const shouldCenter = shouldCenterContent();

      if (shouldCenter) {
        console.log('Aplicando centrado');

        carouselSection.classList.add('content-fits', 'no-navigation', 'force-center-mobile');
        container.classList.add('auto-center', 'force-center');
        wrapper.classList.add('force-center');

        wrapper.style.paddingRight = '';
        wrapper.style.width = '';
        wrapper.style.marginRight = '';
        wrapper.style.transform = 'none';

        currentSlide = 0;
        hideNavigationButtons();

      } else {
        console.log('Aplicando navegación touch');

        carouselSection.classList.add('mobile-needs-scroll', 'has-navigation', 'force-navigation-mobile');

        let extraSpace = isMobile() ? 80 : 60;

        wrapper.style.paddingRight = `${extraSpace}px`;
        wrapper.style.width = `calc(100% + ${extraSpace}px)`;
        wrapper.style.marginRight = `-${extraSpace}px`;

        hideNavigationButtons();
      }
    } else {
      console.log('Desktop - respetando reglas CSS');

      carouselSection.classList.remove('mobile-last-card-fix', 'mobile-needs-scroll', 'force-center-mobile', 'force-navigation-mobile');

      wrapper.style.paddingRight = '';
      wrapper.style.width = '';
      wrapper.style.marginRight = '';

      const slides = wrapper.querySelectorAll('.carousel-slide');
      const slideCount = slides.length;
      const containerWidth = container.offsetWidth;
      const slideWidth = 280;
      const gap = 10;
      const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);

      if (totalContentWidth <= containerWidth) {
        carouselSection.classList.add('content-fits', 'no-navigation');
        hideNavigationButtons();
      } else {
        carouselSection.classList.add('has-navigation');
        showNavigationButtons();
      }
    }
  }

  function syncCarouselState() {
    const wrapper = document.getElementById('slides-wrapper');
    if (!wrapper) return null;

    const transform = wrapper.style.transform;
    const translateMatch = transform.match(/translateX\((-?\d+(?:\.\d+)?)px\)/);

    if (!translateMatch) return currentSlide;

    const currentTranslateX = Math.abs(parseFloat(translateMatch[1]));
    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;

    const realSlidePosition = Math.round(currentTranslateX / (slideWidth + gap));

    const oldSlide = currentSlide;
    currentSlide = realSlidePosition;

    return realSlidePosition;
  }

  function shouldCenterContent() {
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');

    if (!container || !wrapper) return false;

    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;

    const slideWidth = isMobileTablet() ? 260 : 280;
    const gap = isMobileTablet() ? 8 : 10;
    const containerWidth = container.offsetWidth;
    const totalContentWidth = (slideCount * slideWidth) + ((slideCount - 1) * gap);

    if (totalContentWidth <= containerWidth) return true;
    if (slideCount <= 2) return true;

    if (isMobileTablet()) {
      return totalContentWidth <= (containerWidth - 40);
    }

    if (slideCount === 3 && window.innerWidth >= 900) return true;
    if (slideCount === 4 && window.innerWidth >= 1200) return true;

    return false;
  }

  function calculateRealLimitMobileTablet() {
    const container = document.getElementById('carousel-container');
    if (!container || totalSlides === 0) return 0;

    if (shouldCenterContent()) return 0;

    const containerWidth = container.offsetWidth;
    const slideWidth = 260;
    const gap = 8;
    const contentWidth = (totalSlides * slideWidth) + ((totalSlides - 1) * gap);

    if (contentWidth <= containerWidth) return 0;

    const slidesCompletelyVisible = Math.floor(containerWidth / (slideWidth + gap));
    const lastValidPosition = Math.max(0, totalSlides - slidesCompletelyVisible);

    return Math.min(lastValidPosition, totalSlides - 1);
  }

  function calculateRealLimit() {
    if (isMobileTablet()) {
      return calculateRealLimitMobileTablet();
    } else {
      const container = document.getElementById('carousel-container');
      if (!container || totalSlides === 0) return 0;

      if (shouldCenterContent()) return 0;

      const containerWidth = container.offsetWidth;
      const slideWidth = 280;
      const gap = 10;
      const contentWidth = (totalSlides * slideWidth) + ((totalSlides - 1) * gap);

      if (contentWidth <= containerWidth) return 0;

      const maxDisplacement = contentWidth - containerWidth;
      const lastValidPosition = Math.floor(maxDisplacement / (slideWidth + gap));

      return Math.min(lastValidPosition, totalSlides - 1);
    }
  }

  function hideNavigationButtons() {
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
  }

  function showNavigationButtons() {
    if (window.innerWidth < 900) {
      hideNavigationButtons();
      return;
    }

    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (prevBtn) prevBtn.style.display = 'flex';
    if (nextBtn) nextBtn.style.display = 'flex';
  }

  function preventiveBlock() {
    const realSlide = syncCarouselState();
    const limit = calculateRealLimit();

    const shouldBlockNext = realSlide >= limit;
    const shouldBlockPrev = realSlide <= 0;

    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');

    if (nextBtn) {
      nextBtn.disabled = shouldBlockNext;
      nextBtn.style.opacity = shouldBlockNext ? '0.3' : '1';
      nextBtn.style.cursor = shouldBlockNext ? 'not-allowed' : 'pointer';
      nextBtn.style.pointerEvents = shouldBlockNext ? 'none' : 'auto';
    }

    if (prevBtn) {
      prevBtn.disabled = shouldBlockPrev;
      prevBtn.style.opacity = shouldBlockPrev ? '0.3' : '1';
      prevBtn.style.cursor = shouldBlockPrev ? 'not-allowed' : 'pointer';
      prevBtn.style.pointerEvents = shouldBlockPrev ? 'none' : 'auto';
    }

    return { shouldBlockNext, shouldBlockPrev, realSlide, limit };
  }

  function waitForLiferayReady() {
    return new Promise((resolve) => {
      const checkReady = () => {
        const hasRequiredElements =
          document.getElementById('carousel-container') &&
          document.getElementById('slides-wrapper');

        if (document.readyState === 'complete' && hasRequiredElements) {
          console.log('DOM listo');
          resolve();
        } else if (initRetries < CONFIG.MAX_RETRIES) {
          initRetries++;
          setTimeout(checkReady, CONFIG.INIT_TIMEOUT);
        } else {
          console.warn('Timeout esperando DOM');
          resolve();
        }
      };
      checkReady();
    });
  }

  function applyCenteringLogic() {
    const carouselSection = document.getElementById('carousel-section');
    const container = document.getElementById('carousel-container');
    const wrapper = document.getElementById('slides-wrapper');

    if (!carouselSection || !container || !wrapper) return;

    const slides = wrapper.querySelectorAll('.carousel-slide');
    const slideCount = slides.length;

    carouselSection.setAttribute('data-slides-count', slideCount);
    applyMobileTabletFix();
  }

  function initCarousel() {
    const wrapper = document.getElementById('slides-wrapper');
    const container = document.getElementById('carousel-container');

    if (!wrapper || !container) {
      setTimeout(initCarousel, 500);
      return false;
    }

    const slides = wrapper.querySelectorAll('.carousel-slide');
    totalSlides = slides.length;

    if (totalSlides === 0) {
      setTimeout(initCarousel, 500);
      return false;
    }

    console.log(`Carousel inicializado: ${totalSlides} slides`);

    currentSlide = 0;

    setupBasicStyles();
    setupEvents();
    updatePosition();
    updateIndicators();

    setTimeout(() => {
      applyCenteringLogic();
      setupPreventiveBlocking();
      preventiveBlock();

      if (isMobileTablet()) {
        forceMobile200pxFix();
      }
    }, 100);

    isInitialized = true;
    return true;
  }

  function setupBasicStyles() {
    const wrapper = document.getElementById('slides-wrapper');
    if (!wrapper) return;

    wrapper.style.display = 'flex';
    wrapper.style.transition = `transform ${CONFIG.SLIDE_TRANSITION_DURATION}ms ease`;
    wrapper.style.willChange = 'transform';
  }

  function setupPreventiveBlocking() {
    const nextBtn = document.getElementById('carousel-next');
    const prevBtn = document.getElementById('carousel-prev');

    if (nextBtn) {
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);

      newNextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const state = preventiveBlock();
        if (state.shouldBlockNext) return false;

        nextSlide();
        return false;
      }, { capture: true, passive: false });
    }

    if (prevBtn) {
      const newPrevBtn = prevBtn.cloneNode(true);
      prevBtn.parentNode.replaceChild(newPrevBtn, prevBtn);

      newPrevBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const state = preventiveBlock();
        if (state.shouldBlockPrev) return false;

        prevSlide();
        return false;
      }, { capture: true, passive: false });
    }

    if (preventiveMonitorInterval) {
      clearInterval(preventiveMonitorInterval);
    }

    preventiveMonitorInterval = setInterval(() => {
      preventiveBlock();
    }, 200);
  }

  function setupEvents() {
    const container = document.getElementById('carousel-container');
    if (!container) return;

    // Touch events
    container.addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1 || isTransitioning) return;
      touchStartX = e.touches[0].clientX;
      isTouching = true;
    }, { passive: true });

    container.addEventListener('touchmove', (e) => {
      if (!isTouching) return;
      const currentTouch = e.touches[0].clientX;
      const diff = Math.abs(currentTouch - touchStartX);

      if (diff > 15) e.preventDefault();
    }, { passive: false });

    container.addEventListener('touchend', (e) => {
      if (!isTouching) return;

      touchEndX = e.changedTouches[0].clientX;
      const distance = touchStartX - touchEndX;

      if (Math.abs(distance) > CONFIG.MIN_SWIPE_DISTANCE) {
        const state = preventiveBlock();

        if (distance > 0) {
          if (!state.shouldBlockNext) nextSlide();
        } else {
          if (!state.shouldBlockPrev) prevSlide();
        }
      }

      isTouching = false;
    }, { passive: true });

    // Indicadores
    const indicators = document.querySelectorAll('#carousel-indicators .indicator');
    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index;

      indicator.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(indicatorIndex);
      });
    });

    // Clicks en slides
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach((slide, index) => {
      const slideIndex = parseInt(slide.getAttribute('data-slide-index')) || index;

      if (!slide.getAttribute('onclick')) {
        slide.addEventListener('click', (e) => {
          if (!isTouching) {
            e.preventDefault();
            if (window.openCarouselModal) {
              window.openCarouselModal(slideIndex);
            }
          }
        });
      }
    });

    // Teclado
    document.addEventListener('keydown', (e) => {
      const modalOpen = document.getElementById('modal-backdrop-carousel')?.classList.contains('show');

      if (!modalOpen) {
        switch (e.key) {
          case 'ArrowLeft':
            e.preventDefault();
            const statePrev = preventiveBlock();
            if (!statePrev.shouldBlockPrev) prevSlide();
            break;
          case 'ArrowRight':
            e.preventDefault();
            const stateNext = preventiveBlock();
            if (!stateNext.shouldBlockNext) nextSlide();
            break;
        }
      }
    });

    // Responsive
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        updatePosition();
        applyCenteringLogic();

        if (isMobileTablet()) {
          setTimeout(() => {
            forceMobile200pxFix();
          }, 100);
        }

        preventiveBlock();
      }, 250);
    });
  }

  function nextSlide() {
    if (isTransitioning) return;

    const realSlide = syncCarouselState();
    const limit = calculateRealLimit();

    if (realSlide >= limit) {
      preventiveBlock();
      return;
    }

    currentSlide = currentSlide + 1;
    updatePositionWithAnimation();
    updateIndicators();

    setTimeout(() => {
      preventiveBlock();
    }, CONFIG.SLIDE_TRANSITION_DURATION + 50);
  }

  function prevSlide() {
    if (isTransitioning) return;

    const realSlide = syncCarouselState();

    if (realSlide <= 0) {
      preventiveBlock();
      return;
    }

    currentSlide = currentSlide - 1;
    updatePositionWithAnimation();
    updateIndicators();

    setTimeout(() => {
      preventiveBlock();
    }, CONFIG.SLIDE_TRANSITION_DURATION + 50);
  }

  function goToSlide(targetSlide) {
    if (isTransitioning || targetSlide === currentSlide) return;

    const limit = calculateRealLimit();

    if (targetSlide >= 0 && targetSlide <= limit) {
      currentSlide = targetSlide;
      updatePositionWithAnimation();
      updateIndicators();

      setTimeout(() => {
        preventiveBlock();
      }, CONFIG.SLIDE_TRANSITION_DURATION + 50);
    }
  }

  function updatePositionWithAnimation() {
    if (isTransitioning) return;

    isTransitioning = true;
    updatePosition();

    setTimeout(() => {
      isTransitioning = false;
    }, CONFIG.SLIDE_TRANSITION_DURATION);
  }

  function updatePosition() {
    const wrapper = document.getElementById('slides-wrapper');
    if (!wrapper) return;

    const container = document.getElementById('carousel-container');

    if (container && (
      container.classList.contains('force-center') ||
      container.classList.contains('auto-center') ||
      wrapper.classList.contains('force-center')
    )) {
      wrapper.style.transform = 'none';
      return;
    }

    if (isMobileTablet()) {
      const slideWidth = 260;
      const gap = 8;
      const containerWidth = container.offsetWidth;

      let translateX = currentSlide * (slideWidth + gap);

      if (currentSlide === 0 && containerWidth > slideWidth + gap) {
        const availableSpace = containerWidth - slideWidth;
        const centering = Math.max(0, availableSpace * 0.1);
        translateX = Math.max(0, translateX - centering);
      }

      wrapper.style.transform = `translateX(-${translateX}px)`;
    } else {
      const slideWidth = 280;
      const gap = 10;
      const translateX = currentSlide * (slideWidth + gap);
      wrapper.style.transform = `translateX(-${translateX}px)`;
    }
  }

  function updateIndicators() {
    const indicators = document.querySelectorAll('#carousel-indicators .indicator');
    indicators.forEach((indicator, index) => {
      const indicatorIndex = parseInt(indicator.getAttribute('data-indicator-index')) || index;

      if (indicatorIndex === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  function forceMobile200pxFix() {
    if (!isMobileTablet()) return;

    applyMobileTabletFix();

    if (currentSlide > 0) {
      const newLimit = calculateRealLimitMobileTablet();
      if (currentSlide > newLimit) {
        currentSlide = newLimit;
      }
      updatePosition();
    }

    preventiveBlock();
    updateIndicators();
  }

  // Funciones globales
  window.carouselPrevSlide = prevSlide;
  window.carouselNextSlide = nextSlide;
  window.goToSlide = goToSlide;
  window.applyCenteringLogic = applyCenteringLogic;
  window.preventiveBlock = preventiveBlock;
  window.syncCarouselState = syncCarouselState;

  // Inicialización
  async function initializeComplete() {
    console.log('Inicializando carousel...');

    try {
      await waitForLiferayReady();

      const carouselOK = initCarousel();

      if (carouselOK) {
        console.log('Carousel funcionando');
      }
    } catch (error) {
      console.error('Error crítico:', error);
    }
  }

  function cleanup() {
    if (preventiveMonitorInterval) {
      clearInterval(preventiveMonitorInterval);
      preventiveMonitorInterval = null;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeComplete);
  } else {
    initializeComplete();
  }

  if (typeof Liferay !== 'undefined' && Liferay.on) {
    Liferay.on('allPortletsReady', initializeComplete);
  }

  setTimeout(initializeComplete, 1000);

  window.addEventListener('beforeunload', cleanup);

  console.log('Carousel script cargado');

})();
