export default function swiperCarousel() {
  const loadSwiper = async () => {
    if (typeof window !== 'undefined' && !window.Swiper) {
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js'
      script.async = true

      script.onload = () => {
        initializeSwiper()
      }

      document.head.appendChild(script)

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css'
      document.head.appendChild(link)
    } else if (window.Swiper) {
      initializeSwiper()
    }
  }

  const initializeSwiper = () => {
    if (window.Swiper) {
      new window.Swiper('.subjects-swiper', {
        loop: true,
        spaceBetween: 30,
        pagination: {
          el: '.subjects-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.subjects-next',
          prevEl: '.subjects-prev'
        },
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

  const hexagonalPatterns = {
    1: { columns: [[0]], offsets: [false] },
    2: { columns: [[0], [1]], offsets: [false, false] },
    3: { columns: [[0], [1], [2]], offsets: [false, true, false] },
    4: {
      columns: [
        [0, 3],
        [1, 2]
      ],
      offsets: [false, true]
    },
    // 5 elementos - patrón 2-1-2 CENTRADO
    5: { columns: [[0, 3], [1], [2, 4]], offsets: [false, false, false] }, // ✅ CAMBIO: Sin offsets
    6: {
      columns: [
        [0, 3],
        [1, 4],
        [2, 5]
      ],
      offsets: [false, true, false]
    },
    // 7 elementos - patrón 2-3-2 CENTRADO
    7: {
      columns: [
        [0, 4],
        [1, 3, 6],
        [2, 5]
      ],
      offsets: [false, false, false]
    },
    8: {
      columns: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5]
      ],
      offsets: [false, true, false]
    },
    9: {
      columns: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      offsets: [false, true, false]
    }
  }

  let isReorganizing = false
  let reorganizeAttempts = 0
  const maxAttempts = 5

const reorganizeToHexagonal = () => {
  if (isReorganizing) return false;

  const gridContainer = document.querySelector('.tools-logos-grid');
  if (!gridContainer) {
    if (reorganizeAttempts < maxAttempts) {
      reorganizeAttempts++;
      setTimeout(reorganizeToHexagonal, 100);
    }
    return false;
  }

  const allLogoItems = Array.from(gridContainer.querySelectorAll('.logo-item'));
  if (allLogoItems.length === 0) {
    if (reorganizeAttempts < maxAttempts) {
      reorganizeAttempts++;
      setTimeout(reorganizeToHexagonal, 100);
    }
    return false;
  }

    isReorganizing = true
    reorganizeAttempts = 0

    const totalItems = allLogoItems.length
    const pattern = hexagonalPatterns[totalItems] || hexagonalPatterns[9]
    const { columns: columnConfig, offsets } = pattern

    // Guardar elementos originales
    const originalElements = allLogoItems.map(item => ({
      element: item.cloneNode(true),
      html: item.outerHTML
    }))

    // Marcar el contenedor
    gridContainer.setAttribute('data-reorganized', 'true')
    gridContainer.setAttribute('data-original-count', totalItems)

    // Limpiar contenido
    gridContainer.innerHTML = ''

    // Crear nuevas columnas
    columnConfig.forEach((elementIndexes, columnIndex) => {
      const columna = document.createElement('div')
      columna.className = 'columna-logos'

    if (totalItems !== 5 && offsets[columnIndex]) {
      columna.classList.add('offset');
    }

    if (totalItems === 5) {
      if (columnIndex === 1) {
        columna.classList.add('columna-central-5');
      } else {
        columna.classList.add('columna-lateral-5');
      }
    }

    if (totalItems === 7) {
      if (columnIndex === 1) {
        columna.classList.add('columna-central-7');
      } else {
        columna.classList.add('columna-lateral-7');
      }
    }

      elementIndexes.forEach(elementIndex => {
        if (originalElements[elementIndex]) {
          const clonedItem = originalElements[elementIndex].element.cloneNode(true)
          columna.appendChild(clonedItem)
        }
      })

    gridContainer.appendChild(columna);
  });

  gridContainer.setAttribute('data-total-items', totalItems);
  gridContainer.setAttribute('data-pattern', columnConfig.map(col => col.length).join('-'));

  applyHexagonalStyles(gridContainer);

  setTimeout(() => {
    isReorganizing = false;

      const event = new CustomEvent('hexagonalReorganized', {
        detail: {
          totalItems,
          pattern: columnConfig.map(col => col.length).join('-'),
          timestamp: Date.now()
        }
      })
      document.dispatchEvent(event)
    }, 100)

    return true
  }

  const applyHexagonalStyles = gridContainer => {
    const columnas = gridContainer.querySelectorAll('.columna-logos')
    const totalItems = parseInt(gridContainer.getAttribute('data-total-items'))

    // Estilos base para todas las columnas
    columnas.forEach((columna, index) => {
      // Resetear estilos existentes
      columna.style.cssText = ''

      // Aplicar estilos base
      columna.style.display = 'flex'
      columna.style.flexDirection = 'column'
      columna.style.gap = '25px'
      columna.style.rowGap = '25px'
      columna.style.alignItems = 'center'
      columna.style.position = 'relative'

    if (totalItems === 5) {
      columna.style.justifyContent = 'center';
      columna.style.alignItems = 'center';
      columna.style.minHeight = '200px';
      columna.style.marginTop = '0px';
      columna.style.paddingTop = '0px';

        // Centrado perfecto de elementos individuales
        const logoItems = columna.querySelectorAll('.logo-item')
        logoItems.forEach(item => {
          item.style.alignSelf = 'center'
          item.style.margin = '0 auto'
        })
      } else if (totalItems === 7) {
        if (index === 1) {
          // Columna central con 3 elementos
          columna.style.justifyContent = 'center'
          columna.style.alignItems = 'center'
          columna.style.minHeight = '300px'
          columna.style.marginTop = '0px'
        } else {
          // Columnas laterales con 2 elementos cada una - CENTRAR VERTICALMENTE
          columna.style.justifyContent = 'center'
          columna.style.alignItems = 'center'
          columna.style.minHeight = '300px'
          columna.style.paddingTop = '50px'
          columna.style.marginTop = '0px'
        }
      } else {
        columna.style.justifyContent = 'center';
        columna.style.alignItems = 'center';
        columna.style.minHeight = '300px';
        columna.style.paddingTop = '50px';
        columna.style.marginTop = '0px';
      }
    } else {
      columna.style.justifyContent = 'flex-start';
    }
  });

  gridContainer.style.display = 'flex';
  gridContainer.style.justifyContent = 'center';
  gridContainer.style.gap = '20px';
  gridContainer.style.flexWrap = 'nowrap';
  gridContainer.style.alignItems = 'flex-start';
  gridContainer.style.width = 'fit-content';
  gridContainer.style.maxWidth = '100%';
  gridContainer.style.margin = '0 auto';

  if (totalItems === 5 || totalItems === 7) {
    gridContainer.style.alignItems = 'center';
    gridContainer.style.transform = 'none';
  }
};

const setupObserver = () => {
  const gridContainer = document.querySelector('.tools-logos-grid');
  if (!gridContainer) return null;

    const observer = new MutationObserver(mutations => {
      let shouldReorganize = false

      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const target = mutation.target

          if (isReorganizing) return

        if (target.classList.contains('tools-logos-grid')) {
          const currentCount = target.querySelectorAll('.logo-item').length;
          const originalCount = parseInt(target.getAttribute('data-original-count') || '0');

          if (currentCount !== originalCount && currentCount > 0) {
            shouldReorganize = true;
          }
        }
      }
    });

    if (shouldReorganize) {
      setTimeout(() => {
        if (!isReorganizing) {
          reorganizeToHexagonal();
        }
      }, 300);
    }
  });

  observer.observe(gridContainer, {
    childList: true,
    subtree: false,
    attributes: false
  });

  return observer;
};

const waitForElements = (callback, timeout = 5000) => {
  const startTime = Date.now();

  const checkElements = () => {
    const gridContainer = document.querySelector('.tools-logos-grid');
    const logoItems = gridContainer ? gridContainer.querySelectorAll('.logo-item') : [];

    if (logoItems.length > 0) {
      callback();
    } else if (Date.now() - startTime < timeout) {
      setTimeout(checkElements, 100);
    }
  };

  checkElements();
};

  const initialize = () => {
    loadSwiper()

    waitForElements(() => {
      reorganizeToHexagonal()
      setupObserver()
    })
  }

  // API pública
  if (typeof window !== 'undefined') {
    window.reorganizeHexagon = () => {
      isReorganizing = false
      reorganizeAttempts = 0
      reorganizeToHexagonal()
    }

    window.setColumnGap = gapValue => {
      const columnas = document.querySelectorAll('.tools-logos-grid .columna-logos')
      columnas.forEach(columna => {
        columna.style.gap = `${gapValue}px`
        columna.style.rowGap = `${gapValue}px`
      })
    }

    window.setColumnSpacing = gapValue => {
      const gridContainer = document.querySelector('.tools-logos-grid')
      if (gridContainer) {
        gridContainer.style.gap = `${gapValue}px`
      }
    }
  };

  window.showHexagonPattern = () => {
    const gridContainer = document.querySelector('.tools-logos-grid');
    if (!gridContainer) return null;

    const totalItems = gridContainer.getAttribute('data-total-items');
    const pattern = gridContainer.getAttribute('data-pattern');
    const isReorganized = gridContainer.getAttribute('data-reorganized') === 'true';

    return {
      totalItems: parseInt(totalItems),
      pattern,
      isReorganized,
      currentElements: gridContainer.querySelectorAll('.logo-item').length
    };
  };

  window.forceReorganize = () => {
    const gridContainer = document.querySelector('.tools-logos-grid');
    if (gridContainer) {
      gridContainer.removeAttribute('data-reorganized');
      gridContainer.removeAttribute('data-original-count');
    }
    isReorganizing = false;
    reorganizeAttempts = 0;
    setTimeout(reorganizeToHexagonal, 100);
  };
}

// Auto-ejecutar cuando el DOM esté listo
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    setTimeout(initialize, 100);
  }

  const waitForContainer = () => {
    const gridContainer = document.querySelector('.tools-logos-grid');
    if (!gridContainer) {
      setTimeout(waitForContainer, 200);
    } else {
      initialize();
    }
  };

  setTimeout(waitForContainer, 50);
}

export default initialize;

export default initialize;
