

(function() {
  'use strict';

  
  let currentState = {
    activeIndex: null,
    isCollapsed: false, 
    isMobile: false,
    currentTitle: '',
    currentSection: 'Centro de Ayuda'
  };

  const accordionData = [
    {
      id: 'types-financing',
      title: '¿Qué tipos de becas ofrece la Universidad Javeriana?'
    },
    {
      id: 'application-financing', 
      title: '¿Cómo puedo aplicar a una beca en la Javeriana?'
    },
    {
      id: 'financing-requirements',
      title: '¿Cuáles son los requisitos para mantener una beca?'
    },
    {
      id: 'financing-options',
      title: '¿Cuáles son las opciones de financiación para pagar la matrícula?'
    },
    {
      id: 'financing-javeriana',
      title: '¿La Javeriana ofrece descuentos en la matrícula?'
    }
  ];


  function detectCurrentSection() {
    // 1. Props o atributo data-section-name
    const sectionElement = document.querySelector('[data-section-name]');
    if (sectionElement) {
      return sectionElement.getAttribute('data-section-name') || sectionElement.textContent.trim();
    }

    // 2. SessionStorage (navegación previa)
    const storedSection = sessionStorage.getItem('currentSection');
    if (storedSection) {
      return storedSection;
    }

    // 3. Parámetros de URL
    const urlParams = new URLSearchParams(window.location.search);
    const sectionParam = urlParams.get('section');
    if (sectionParam) {
      return decodeURIComponent(sectionParam);
    }

    // 4. Elemento con data-current-section
    const currentSectionElement = document.querySelector('[data-current-section]');
    if (currentSectionElement) {
      return currentSectionElement.getAttribute('data-current-section') || 
             currentSectionElement.textContent.trim();
    }

    // 5. Meta tag
    const metaSection = document.querySelector('meta[name="section"]');
    if (metaSection) {
      return metaSection.getAttribute('content');
    }

    // 6. Título de la página
    const pageTitle = document.title;
    const patterns = [
      /^([^-|]+)\s*[-|]\s*Centro de Ayuda/i,
      /^([^-|]+)\s*[-|]\s*Universidad/i,
      /^([^-|]+)\s*[-|]/i
    ];
    
    for (const pattern of patterns) {
      const match = pageTitle.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }

    // 7. Valor por defecto
    return 'Centro de Ayuda';
  }

  // ===============================================
  // FUNCIONES DE MIGAS DE PAN

  function updateBreadcrumb(title) {
    if (currentState.isMobile) {
      return;
    }

    let breadcrumb = document.querySelector('.breadcrumb');

    if (!breadcrumb) {
      breadcrumb = document.createElement('div');
      breadcrumb.className = 'breadcrumb';

      // Centro de Ayuda
      const helpCenter = document.createElement('a');
      helpCenter.href = '/institutional/helpPage/help';
      helpCenter.innerHTML = '<i class="ph ph-arrow-bend-up-left iconCenter"></i> Centro de Ayuda';
      helpCenter.onclick = function() {
        sessionStorage.removeItem('currentSection');
      };
      breadcrumb.appendChild(helpCenter);

      breadcrumb.appendChild(document.createTextNode(' / '));

      // Sección actual
      const sectionElement = document.createElement('span');
      sectionElement.textContent = currentState.currentSection;
      sectionElement.className = 'section-name';
      breadcrumb.appendChild(sectionElement);

      // Solo agregar pregunta si hay una
      if (title && title.trim()) {
        breadcrumb.appendChild(document.createTextNode(' / '));
        
        const currentPage = document.createElement('span');
        currentPage.className = 'current-page';
        currentPage.textContent = title;
        breadcrumb.appendChild(currentPage);
      }

      // Insertar en el DOM
      const accordionContainer = document.querySelector('.accordion-container');
      if (accordionContainer) {
        accordionContainer.parentNode.insertBefore(breadcrumb, accordionContainer);
      } else {
        const mainContainer = document.querySelector('main');
        if (mainContainer) {
          mainContainer.insertBefore(breadcrumb, mainContainer.firstChild);
        } else {
          document.body.insertBefore(breadcrumb, document.body.firstChild);
        }
      }
    } else {
      // Actualizar breadcrumb existente
      const sectionElement = breadcrumb.querySelector('.section-name');
      if (sectionElement) {
        sectionElement.textContent = currentState.currentSection;
      }

      let currentPage = breadcrumb.querySelector('.current-page');
      
      if (title && title.trim()) {
        if (currentPage) {
          currentPage.textContent = title;
        } else {
          breadcrumb.appendChild(document.createTextNode(' / '));
          
          currentPage = document.createElement('span');
          currentPage.className = 'current-page';
          currentPage.textContent = title;
          breadcrumb.appendChild(currentPage);
        }
      } else {
        if (currentPage) {
          const previousSibling = currentPage.previousSibling;
          if (previousSibling && previousSibling.nodeType === Node.TEXT_NODE) {
            breadcrumb.removeChild(previousSibling);
          }
          breadcrumb.removeChild(currentPage);
        }
      }

      showBreadcrumb();
    }

    // Actualizar título de página
    let pageTitle = 'Centro de Ayuda';
    if (currentState.currentSection && currentState.currentSection !== 'Centro de Ayuda') {
      pageTitle = currentState.currentSection + ' - Centro de Ayuda';
    }
    if (title && title.trim()) {
      pageTitle = title + ' - ' + pageTitle;
    }
    document.title = pageTitle;
  }

  function hideBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.style.display = 'none';
    }
  }

  function showBreadcrumb() {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb) {
      breadcrumb.style.display = '';
    }
  }

  // FUNCIONES DEL ACORDEÓN

  function toggleAccordion(element) {
    // Determinar si es móvil
    if (window.innerWidth <= 767) {
      const parent = element.parentElement;
      const isActive = parent.classList.contains('active');
      
      // Cerrar todos los items
      const items = document.querySelectorAll('.nav-item');
      items.forEach(function(item) {
        item.classList.remove('active');
        const content = item.querySelector('.accordion-content');
        const icon = item.querySelector('.accordion-icon');
        
        if (content) content.style.display = 'none';
        if (icon) icon.textContent = '+';
      });
      
      // Si el item no estaba activo, abrirlo
      if (!isActive) {
        parent.classList.add('active');
        const content = parent.querySelector('.accordion-content');
        const icon = parent.querySelector('.accordion-icon');
        
        if (content) content.style.display = 'block';
        if (icon) icon.textContent = '-';

        // Actualizar estado y breadcrumb
        const questionTitle = element.textContent.trim();
        currentState.currentTitle = questionTitle;
        updateBreadcrumb(questionTitle);
      } else {
        currentState.currentTitle = '';
        updateBreadcrumb('');
      }
    } else {
      // Comportamiento desktop
      const parent = element.parentElement;
      const questionTitle = element.textContent.trim();
      
      // Remover active de todos
      const items = document.querySelectorAll('.nav-item');
      items.forEach(function(item) {
        item.classList.remove('active');
      });
      
      // Activar el seleccionado
      parent.classList.add('active');
      
      // Actualizar estado y breadcrumb
      currentState.currentTitle = questionTitle;
      updateBreadcrumb(questionTitle);

      // Mostrar contenido en columna derecha
      showAccordionContent(element);
    }
  }

  function showAccordionContent(element) {
    const questionTitle = element.textContent.trim();
    const questionIndex = accordionData.findIndex(item => item.title === questionTitle);
    
    if (questionIndex !== -1) {
      const rightColumn = document.querySelector('.accordion-answer');
      if (rightColumn) {
        const dropZoneId = accordionData[questionIndex].id;
        rightColumn.innerHTML = `<lfr-drop-zone data-lfr-drop-zone-id="${dropZoneId}"></lfr-drop-zone>`;
      }
    }
  }

  function toggleAllAccordions() {
    return;
  }


  function handleResize() {
    const wasMobile = currentState.isMobile;
    currentState.isMobile = window.innerWidth <= 767;
    
    // Siempre mantener desplegado
    currentState.isCollapsed = false;
    
    // Asegurar que el acordeón esté desplegado SIEMPRE
    const items = document.querySelector('.accordion-items');
    if (items) {
      items.style.display = 'block';
    }

    // Mostrar/ocultar header según dispositivo
    const accordionHeader = document.querySelector('.accordion-header');
    if (accordionHeader) {
      if (currentState.isMobile) {
        accordionHeader.style.display = 'block';
        // Mantener ícono hacia arriba (desplegado)
        const icon = accordionHeader.querySelector('i');
        if (icon) {
          icon.className = 'ph ph-caret-up';
        }
      } else {
        accordionHeader.style.display = 'none';
      }
    }
    
    if (wasMobile && !currentState.isMobile) {
      // Cambió de móvil a desktop
      showBreadcrumb();
      if (currentState.currentTitle) {
        updateBreadcrumb(currentState.currentTitle);
      }
    } else if (!wasMobile && currentState.isMobile) {
      // Cambió de desktop a móvil
      hideBreadcrumb();
    }

    // Lógica original del resize
    if (window.innerWidth > 767) {
      const activeItem = document.querySelector('.nav-item.active');
      if (activeItem) {
        const content = activeItem.querySelector('.accordion-content');
        if (content) content.style.display = 'block';
      }
    }
  }

  function navigateToAccordion(sectionName, targetUrl) {
    if (!sectionName) return;
    
    sessionStorage.setItem('currentSection', sectionName);
    
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  }

  function setupNavigationLinks() {
    // Auto-configurar enlaces con data-section
    const sectionLinks = document.querySelectorAll('[data-section]');
    
    sectionLinks.forEach(function(link) {
      link.addEventListener('click', function(e) {
        const sectionName = this.getAttribute('data-section');
        const targetUrl = this.getAttribute('href');
        
        if (sectionName) {
          e.preventDefault();
          navigateToAccordion(sectionName, targetUrl);
        }
      });
    });
  }

  function initializeAccordion() {
    // Detectar sección actual
    currentState.currentSection = detectCurrentSection();
    currentState.isMobile = window.innerWidth <= 767;
    currentState.isCollapsed = false; // Siempre desplegado

    // Configurar event listeners
    setupEventListeners();
    
    // Configurar navegación
    setupNavigationLinks();

    // Inicializar breadcrumb si no es móvil
    if (!currentState.isMobile) {
      updateBreadcrumb('');
    }

    // Asegurar que el acordeón esté desplegado SIEMPRE
    const items = document.querySelector('.accordion-items');
    if (items) {
      items.style.display = 'block';
    }

    // Configurar header según dispositivo
    const accordionHeader = document.querySelector('.accordion-header');
    if (accordionHeader) {
      if (currentState.isMobile) {
        accordionHeader.style.display = 'block';
        // Fijar ícono hacia arriba (desplegado)
        const icon = accordionHeader.querySelector('i');
        if (icon) {
          icon.className = 'ph ph-caret-up';
        }
      } else {
        accordionHeader.style.display = 'none';
      }
    }

    // Lógica original de inicialización para móvil
    if (currentState.isMobile) {
      const activeItem = document.querySelector('.nav-item.active');
      if (activeItem) {
        const content = activeItem.querySelector('.accordion-content');
        const icon = activeItem.querySelector('.accordion-icon');
        
        if (content) content.style.display = 'block';
        if (icon) icon.textContent = '-';
        
        // Actualizar breadcrumb con pregunta activa
        const questionElement = activeItem.querySelector('.question-button, button');
        if (questionElement) {
          currentState.currentTitle = questionElement.textContent.trim();
        }
      }
    }
  }

  function setupEventListeners() {
    // Event listener para resize
    window.addEventListener('resize', handleResize);

    // Event listener para el botón toggle principal
    const toggleButton = document.querySelector('.accordion-toggle');
    if (toggleButton) {
      toggleButton.addEventListener('click', toggleAllAccordions);
    }

    // Event listeners para preguntas del acordeón
    const questionButtons = document.querySelectorAll('.question-button, .nav-item button');
    questionButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        toggleAccordion(this);
      });
    });
  }


  // Exponer funciones globalmente
  window.toggleAccordion = toggleAccordion;
  window.navigateToAccordion = navigateToAccordion;
  window.updateAccordionSection = function(sectionName) {
    currentState.currentSection = sectionName;
    updateBreadcrumb(currentState.currentTitle);
  };

  // Función de debugging
  window.debugAccordion = function() {
    console.log('=== DEBUG ACORDEÓN ===');
    console.log('Estado actual:', currentState);
    console.log('Sección detectada:', detectCurrentSection());
    console.log('Sección en sessionStorage:', sessionStorage.getItem('currentSection'));
    console.log('URL actual:', window.location.href);
  };


  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccordion);
  } else {
    initializeAccordion();
  }

  // También inicializar si se llama después de que la página ya cargó
  window.initAccordion = initializeAccordion;

})();


// Para mantener compatibilidad con llamadas directas
function toggleAccordion(element) {
  if (window.toggleAccordion) {
    window.toggleAccordion(element);
  }
}

// Para configuración externa
function configureAccordionSection(sectionName) {
  if (window.updateAccordionSection) {
    window.updateAccordionSection(sectionName);
  }
}