(function() {
  'use strict';

  // ========================================
  // CONFIGURACIÓN Y DATOS
  // ========================================

  const studentsConfig = [
    {
      id: 0,
      name: "María González",
      program: "Ingeniería de Sistemas",
      year: "4to año",
      testimonial: "La universidad me ha dado las herramientas para crecer profesional y personalmente. Los profesores son excelentes y el ambiente es muy motivador.",
      image: "https://via.placeholder.com/400x500/4A90E2/FFFFFF?text=Maria+G",
      achievements: ["Mejor promedio 2023", "Proyecto destacado"]
    },
    {
      id: 1,
      name: "Carlos Ramírez",
      program: "Administración de Empresas",
      year: "3er año",
      testimonial: "Las oportunidades de networking y prácticas profesionales han sido increíbles. Recomiendo totalmente esta institución.",
      image: "https://via.placeholder.com/400x500/E67E22/FFFFFF?text=Carlos+R",
      achievements: ["Líder estudiantil", "Becario destacado"]
    },
    {
      id: 2,
      name: "Ana Martínez",
      program: "Medicina",
      year: "5to año",
      testimonial: "La formación integral que recibimos nos prepara para enfrentar cualquier reto. Estoy muy orgullosa de ser parte de esta comunidad.",
      image: "https://via.placeholder.com/400x500/27AE60/FFFFFF?text=Ana+M",
      achievements: ["Investigación destacada", "Intercambio internacional"]
    },
    {
      id: 3,
      name: "Diego López",
      program: "Arquitectura",
      year: "2do año",
      testimonial: "Los laboratorios y talleres son de primer nivel. Cada día aprendo algo nuevo que me acerca más a mis metas profesionales.",
      image: "https://via.placeholder.com/400x500/8E44AD/FFFFFF?text=Diego+L",
      achievements: ["Concurso de diseño ganador"]
    }
  ];

  const SLIDER_CONFIG = {
    sliderId: 'student-slider',
    autoSlideInterval: 5000,
    manualNavigationDelay: 5000,
    touchSensitivity: 30,
    touchMaxVerticalMovement: 100,
    touchDebounce: 300
  };

  let sliderState = {
    currentSlide: 0,
    autoSlideInterval: null,
    studentsCount: 0,
    isManualNavigation: false,
    manualNavigationTimeout: null,
    isInitialized: false,
    lastTouchTime: 0
  };

  let currentStudents = studentsConfig;

  // ========================================
  // GENERACIÓN DE HTML
  // ========================================

  function generateSliderHTML(students) {
    return `
      <section class="student-slider-section" id="${SLIDER_CONFIG.sliderId}">
        <div class="slider-header">
          <h2 class="slider-title">Testimonios de Estudiantes</h2>
          <p class="slider-subtitle">Conoce las experiencias de nuestra comunidad estudiantil</p>
        </div>

        <div class="slider-container" id="${SLIDER_CONFIG.sliderId}-content">
          <div class="slider-track">
            ${students.map((student, index) => `
              <div class="student-card ${index === 0 ? 'active' : ''}" data-student-id="${student.id}">
                <div class="card-image">
                  <img src="${student.image}" alt="${student.name}" loading="lazy">
                  <div class="card-overlay"></div>
                </div>
                <div class="card-content">
                  <h3 class="student-name">${student.name}</h3>
                  <p class="student-program">${student.program}</p>
                  <p class="student-year">${student.year}</p>
                  <blockquote class="student-testimonial">
                    "${student.testimonial}"
                  </blockquote>
                  ${student.achievements && student.achievements.length > 0 ? `
                    <div class="student-achievements">
                      ${student.achievements.map(achievement => `
                        <span class="achievement-badge">${achievement}</span>
                      `).join('')}
                    </div>
                  ` : ''}
                </div>
              </div>
            `).join('')}
          </div>

          <button class="slider-control slider-prev" id="${SLIDER_CONFIG.sliderId}-prev" aria-label="Anterior estudiante">
            <i class="ph ph-caret-left"></i>
          </button>
          <button class="slider-control slider-next" id="${SLIDER_CONFIG.sliderId}-next" aria-label="Siguiente estudiante">
            <i class="ph ph-caret-right"></i>
          </button>
        </div>

        <div class="slider-dots"></div>
      </section>
    `;
  }

  // ========================================
  // FUNCIONES DE NAVEGACIÓN
  // ========================================

  function getNextSlide(current, total) {
    return (current + 1) % total;
  }

  function getPrevSlide(current, total) {
    return current === 0 ? total - 1 : current - 1;
  }

  function getSlideClass(index, current, total) {
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
  }

  // ========================================
  // ACTUALIZACIÓN DE UI
  // ========================================

  function generateDots() {
    const dotsContainer = document.querySelector('.slider-dots');
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';

    for (let i = 0; i < sliderState.studentsCount; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot';
      if (i === sliderState.currentSlide) {
        dot.classList.add('active');
      }

      dot.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(i, true);
      };

      dotsContainer.appendChild(dot);
    }
  }

  function updateSlideClasses() {
    if (!sliderState.isInitialized) return;

    try {
      const cards = document.querySelectorAll('.student-card');
      const dots = document.querySelectorAll('.slider-dots .dot');

      cards.forEach(function(card, index) {
        card.classList.remove('active', 'next', 'prev', 'next-next', 'prev-prev');
        const slideClass = getSlideClass(index, sliderState.currentSlide, sliderState.studentsCount);
        if (slideClass) {
          card.classList.add(slideClass);
        }
        void card.offsetHeight;
      });

      dots.forEach(function(dot, index) {
        if (dot) {
          dot.classList.toggle('active', index === sliderState.currentSlide);
        }
      });
    } catch (error) {
      console.warn('Error actualizando clases:', error);
    }
  }

  // ========================================
  // AUTO-SLIDE
  // ========================================

  function stopAutoSlide() {
    if (sliderState.autoSlideInterval) {
      clearInterval(sliderState.autoSlideInterval);
      sliderState.autoSlideInterval = null;
    }
  }

  function startAutoSlide() {
    if (sliderState.isManualNavigation || !sliderState.isInitialized) return;

    stopAutoSlide();
    sliderState.autoSlideInterval = setInterval(function() {
      nextSlide(false);
    }, SLIDER_CONFIG.autoSlideInterval);
  }

  function handleManualNavigation() {
    sliderState.isManualNavigation = true;
    stopAutoSlide();

    if (sliderState.manualNavigationTimeout) {
      clearTimeout(sliderState.manualNavigationTimeout);
    }

    sliderState.manualNavigationTimeout = setTimeout(function() {
      sliderState.isManualNavigation = false;
      startAutoSlide();
    }, SLIDER_CONFIG.manualNavigationDelay);
  }

  // ========================================
  // CONTROLES DE NAVEGACIÓN
  // ========================================

  function nextSlide(isManual) {
    if (!sliderState.isInitialized) return;

    if (isManual) {
      handleManualNavigation();
    } else if (sliderState.isManualNavigation) {
      return;
    }

    sliderState.currentSlide = getNextSlide(sliderState.currentSlide, sliderState.studentsCount);
    updateSlideClasses();
  }

  function prevSlide(isManual) {
    if (!sliderState.isInitialized) return;

    if (isManual) {
      handleManualNavigation();
    } else if (sliderState.isManualNavigation) {
      return;
    }

    sliderState.currentSlide = getPrevSlide(sliderState.currentSlide, sliderState.studentsCount);
    updateSlideClasses();
  }

  function goToSlide(index, isManual) {
    if (!sliderState.isInitialized || index === sliderState.currentSlide) return;

    if (isManual) {
      handleManualNavigation();
    } else if (sliderState.isManualNavigation) {
      return;
    }

    sliderState.currentSlide = index;
    updateSlideClasses();
  }

  // ========================================
  // TOUCH EVENTS
  // ========================================

  function setupTouchEvents(touchArea) {
    if (!touchArea) return;

    let touchData = {
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startTime: 0,
      isTouching: false,
      hasMoved: false
    };

    touchArea.addEventListener('touchstart', function(e) {
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
    }, { passive: true });

    touchArea.addEventListener('touchmove', function(e) {
      if (!touchData.isTouching || e.touches.length !== 1) return;

      const touch = e.touches[0];
      touchData.currentX = touch.clientX;
      touchData.currentY = touch.clientY;

      const deltaX = Math.abs(touchData.currentX - touchData.startX);
      const deltaY = Math.abs(touchData.currentY - touchData.startY);

      if (deltaX > 5 || deltaY > 5) {
        touchData.hasMoved = true;
      }

      if (deltaX > deltaY && deltaX > SLIDER_CONFIG.touchSensitivity / 2) {
        e.preventDefault();
      }
    }, { passive: false });

    touchArea.addEventListener('touchend', function(e) {
      if (!touchData.isTouching) return;

      const touchEndTime = Date.now();
      const touchDuration = touchEndTime - touchData.startTime;

      if (touchEndTime - sliderState.lastTouchTime < SLIDER_CONFIG.touchDebounce) {
        touchData.isTouching = false;
        return;
      }

      const deltaX = touchData.currentX - touchData.startX;
      const deltaY = touchData.currentY - touchData.startY;
      const absDeltaX = Math.abs(deltaX);
      const absDeltaY = Math.abs(deltaY);

      const isValidSwipe = 
        touchData.hasMoved &&
        absDeltaX > SLIDER_CONFIG.touchSensitivity &&
        absDeltaX > absDeltaY &&
        absDeltaY < SLIDER_CONFIG.touchMaxVerticalMovement &&
        touchDuration < 1000;

      if (isValidSwipe) {
        sliderState.lastTouchTime = touchEndTime;

        if (deltaX > 0) {
          prevSlide(true);
        } else {
          nextSlide(true);
        }
      } else {
        setTimeout(function() {
          if (!sliderState.isManualNavigation && sliderState.isInitialized) {
            startAutoSlide();
          }
        }, 500);
      }

      touchData.isTouching = false;
    }, { passive: true });

    touchArea.addEventListener('touchcancel', function() {
      touchData.isTouching = false;
      setTimeout(function() {
        if (!sliderState.isManualNavigation && sliderState.isInitialized) {
          startAutoSlide();
        }
      }, 500);
    }, { passive: true });
  }

  // ========================================
  // EVENTOS DEL SLIDER
  // ========================================

  function setupEvents() {
    const sliderContainer = document.getElementById(SLIDER_CONFIG.sliderId);
    const prevButton = document.getElementById(SLIDER_CONFIG.sliderId + '-prev');
    const nextButton = document.getElementById(SLIDER_CONFIG.sliderId + '-next');
    const sliderContent = document.getElementById(SLIDER_CONFIG.sliderId + '-content') || sliderContainer;

    if (prevButton && nextButton) {
      prevButton.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        prevSlide(true);
      };

      nextButton.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        nextSlide(true);
      };
    }

    if (sliderContent) {
      sliderContent.onmouseenter = stopAutoSlide;
      sliderContent.onmouseleave = function() {
        if (!sliderState.isManualNavigation && sliderState.isInitialized) {
          startAutoSlide();
        }
      };

      setupTouchEvents(sliderContent);
    }

    document.addEventListener('keydown', function(e) {
      if (!sliderContainer) return;

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
    });

    document.addEventListener('visibilitychange', function() {
      if (document.hidden) {
        stopAutoSlide();
        if (sliderState.manualNavigationTimeout) {
          clearTimeout(sliderState.manualNavigationTimeout);
        }
      } else if (!sliderState.isManualNavigation && sliderState.isInitialized) {
        startAutoSlide();
      }
    });
  }

  // ========================================
  // INICIALIZACIÓN
  // ========================================

  function initStudentSlider(targetElement, students = studentsConfig) {
    if (!targetElement) {
      console.error('Elemento objetivo no encontrado');
      return false;
    }

    if (sliderState.isInitialized) {
      console.warn('Slider ya inicializado');
      return false;
    }

    currentStudents = students;
    targetElement.innerHTML = generateSliderHTML(students);

    const cards = document.querySelectorAll('.student-card');
    sliderState.studentsCount = cards.length;

    if (sliderState.studentsCount === 0) {
      console.error('No hay tarjetas de estudiantes');
      return false;
    }

    generateDots();
    setupEvents();

    sliderState.isInitialized = true;
    sliderState.currentSlide = 0;
    updateSlideClasses();

    setTimeout(function() {
      if (sliderState.isInitialized) {
        startAutoSlide();
      }
    }, 1000);

    console.log(`Student Slider inicializado con ${sliderState.studentsCount} estudiantes`);
    return true;
  }

  function resetSlider() {
    stopAutoSlide();
    if (sliderState.manualNavigationTimeout) {
      clearTimeout(sliderState.manualNavigationTimeout);
    }
    
    sliderState = {
      currentSlide: 0,
      autoSlideInterval: null,
      studentsCount: 0,
      isManualNavigation: false,
      manualNavigationTimeout: null,
      isInitialized: false,
      lastTouchTime: 0
    };
  }

  // ========================================
  // API PÚBLICA
  // ========================================

  const StudentSliderAPI = {
    initialize: initStudentSlider,
    next: function() {
      nextSlide(true);
    },
    prev: function() {
      prevSlide(true);
    },
    goTo: function(index) {
      goToSlide(index, true);
    },
    stop: stopAutoSlide,
    start: startAutoSlide,
    reset: resetSlider,
    getCurrentSlide: function() {
      return sliderState.currentSlide;
    },
    getTotalSlides: function() {
      return sliderState.studentsCount;
    },
    isAutoPlaying: function() {
      return sliderState.autoSlideInterval !== null;
    },
    getConfig: function() {
      return { ...SLIDER_CONFIG };
    }
  };

  window.StudentSlider = StudentSliderAPI;

  // ========================================
  // INICIALIZACIÓN AUTOMÁTICA
  // ========================================

  function autoInit() {
    const targetElement = document.getElementById('student-slider-root');
    if (targetElement && !sliderState.isInitialized) {
      initStudentSlider(targetElement);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    setTimeout(autoInit, 100);
  }

  console.log('Student Slider Module cargado');

})();