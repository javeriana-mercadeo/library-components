class DocentesAPI {
    constructor() {
        this.swiper = null;
        this.docentes = [];
        this.programCode = null;
        
        this.initializeElements();
        this.bindEvents();
        this.listenForProgramEvent();
    }

    initializeElements() {
        this.elements = {
            programCodeInput: document.getElementById('programCode'),
            loadBtn: document.getElementById('loadBtn'),
            loadingState: document.getElementById('loadingState'),
            errorState: document.getElementById('errorState'),
            emptyState: document.getElementById('emptyState'),
            docentesSection: document.getElementById('docentes-section'),
            docentesContainer: document.getElementById('docentes-container'),
            docentesCount: document.getElementById('docentes-count'),
            debugContent: document.getElementById('debug-content'),
            errorMessage: document.getElementById('errorMessage')
        };
    }

    bindEvents() {
        this.elements.loadBtn.addEventListener('click', () => {
            const code = this.elements.programCodeInput.value.trim();
            if (code) {
                this.loadDocentes(code);
            }
        });

        // Enter en el input
        this.elements.programCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.elements.loadBtn.click();
            }
        });
    }

    listenForProgramEvent() {
        window.addEventListener('data_load-program', (event) => {
            this.updateDebug('Evento recibido: data_load-program');
            this.updateDebug(`Datos del evento: ${JSON.stringify(event.detail, null, 2)}`);
            
            if (event.detail && event.detail.program && event.detail.program.codigo) {
                this.programCode = event.detail.program.codigo;
                this.updateDebug(`Código de programa detectado: ${this.programCode}`);
                this.loadDocentes(this.programCode);
            }
        });
    }


    async loadDocentes(programCode) {
        try {
            this.showLoadingState();
            this.updateDebug(`Cargando docentes para programa: ${programCode}`);
            
            const url = `https://dti-pru.javeriana.edu.co/api-portal/investigadores?idProgramaAcademico=${programCode}`;
            this.updateDebug(`URL de la API: ${url}`);
            
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            this.updateDebug(`Respuesta recibida: ${data.investigadores?.length || 0} investigadores`);
            
            if (data.investigadores && Array.isArray(data.investigadores)) {
                this.docentes = data.investigadores;
                
                if (this.docentes.length > 0) {
                    this.renderDocentes();
                    this.updateDocentesCount();
                    this.showDocentesSection();
                } else {
                    this.showEmptyState();
                }
            } else {
                this.showEmptyState();
            }
            
        } catch (error) {
            console.error('Error cargando docentes:', error);
            this.updateDebug(`Error: ${error.message}`);
            this.showErrorState(error.message);
        }
    }

    renderDocentes() {
        const container = this.elements.docentesContainer;
        container.innerHTML = '';
        
        this.docentes.forEach((investigador, index) => {
            const slide = this.createDocenteSlide(investigador, index);
            container.appendChild(slide);
        });
        
        // Verificar si Swiper está disponible
        if (typeof Swiper !== 'undefined') {
            // Inicializar Swiper después de renderizar
            setTimeout(() => {
                this.initializeSwiper();
            }, 100);
        } else {
            // Fallback: usar CSS Grid sin Swiper
            this.initializeFallbackLayout();
        }
    }

    initializeFallbackLayout() {
        this.updateDebug('Usando layout fallback sin Swiper');
        const container = this.elements.docentesContainer;
        
        // Cambiar clases para usar CSS Grid
        container.className = 'docentes-grid';
        container.parentElement.className = 'docentes-grid-wrapper';
        
        // Ocultar botones de navegación
        const prevBtn = document.querySelector('.docentes-prev');
        const nextBtn = document.querySelector('.docentes-next');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        
        // Añadir estilos fallback
        const style = document.createElement('style');
        style.textContent = `
            .docentes-grid-wrapper {
                padding: 20px 0 !important;
            }
            
            .docentes-grid {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
                gap: 20px !important;
                padding: 0 !important;
            }
            
            .docentes-grid .swiper-slide {
                margin-top: 0 !important;
                height: auto !important;
                max-height: none !important;
            }
            
            @media (max-width: 768px) {
                .docentes-grid {
                    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
                    gap: 15px !important;
                }
            }
            
            @media (max-width: 480px) {
                .docentes-grid {
                    grid-template-columns: 1fr 1fr !important;
                    gap: 10px !important;
                }
            }
        `;
        document.head.appendChild(style);
        
        this.updateDebug('Layout fallback aplicado correctamente');
    }

    updateDocentesCount() {
        const countElement = this.elements.docentesCount;
        if (countElement && this.docentes.length > 0) {
            countElement.textContent = `${this.docentes.length} docentes encontrados`;
            countElement.style.display = 'block';
        }
    }

    createDocenteSlide(investigador, index) {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.setAttribute('role', 'listitem');
        
        const nombreCompleto = `${investigador.nombresApellidos.nombres} ${investigador.nombresApellidos.apellidos}`;
        const cargo = this.getPrimaryCargo(investigador);
        const imagen = investigador.foto && investigador.foto.length > 0 ? investigador.foto[0].url : null;
        const profileUrl = investigador.informacionAdicional?.portalUrl || '#';
        
        slide.innerHTML = `
            <div class="docente-card">
                <div class="docente-card-header">
                    ${imagen ? 
                        `<img src="${imagen}" alt="${nombreCompleto}" class="docente-image">` :
                        `<div class="image-placeholder">
                            <i class="ph ph-user-circle" aria-hidden="true"></i>
                        </div>`
                    }
                </div>
                <div class="docente-card-content">
                    <h3 class="docente-name">${nombreCompleto}</h3>
                    <p class="docente-cargo">${cargo}</p>
                    ${profileUrl !== '#' ? 
                        `<a href="${profileUrl}" target="_blank" class="docente-link">Ver Perfil</a>` :
                        ''
                    }
                </div>
            </div>
        `;
        
        return slide;
    }

    getPrimaryCargo(investigador) {
        if (!investigador.asociacionesOrganizacionales || investigador.asociacionesOrganizacionales.length === 0) {
            return 'Docente';
        }

        const cargo = investigador.asociacionesOrganizacionales[0].cargo;
        if (!cargo.descripcion) return 'Docente';

        // Buscar descripción en español
        const cargoES = cargo.descripcion.find(desc => desc.idioma === 'es_CO');
        return cargoES ? cargoES.valor : cargo.descripcion[0].valor || 'Docente';
    }

    initializeSwiper() {
        // Destruir instancia anterior si existe
        if (this.swiper) {
            this.swiper.destroy(true, true);
        }

        // Verificar si Swiper está disponible
        if (typeof Swiper === 'undefined') {
            this.updateDebug('Swiper no está disponible, esperando...');
            setTimeout(() => this.initializeSwiper(), 100);
            return;
        }

        // Buscar el elemento
        const element = document.querySelector('.docentes-wrapper');
        if (!element) {
            this.updateDebug('Error: No se encontró el contenedor del carrusel');
            return;
        }

        // Contar slides
        const slides = document.querySelectorAll('.swiper-slide');
        const totalSlides = slides.length;
        this.updateDebug(`Total de slides: ${totalSlides}`);

        if (totalSlides === 0) {
            this.updateDebug('No hay slides para inicializar');
            return;
        }

        // Esperar un frame para que el DOM se actualice
        requestAnimationFrame(() => {
            try {
                this.swiper = new Swiper('.docentes-carousel', {
                loop: false,
                spaceBetween: 20,
                watchOverflow: true,
                centeredSlides: false,
                grabCursor: true,
                allowTouchMove: totalSlides > 1,

                navigation: {
                    nextEl: '.docentes-next',
                    prevEl: '.docentes-prev',
                    disabledClass: 'swiper-button-disabled',
                    hiddenClass: 'swiper-button-hidden'
                },

                // Breakpoints optimizados - mostramos menos slides para que sea claro que hay navegación
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    428: {
                        slidesPerView: totalSlides > 1 ? 1.5 : 1, // Mostrar parcialmente el siguiente
                        spaceBetween: 10
                    },
                    576: {
                        slidesPerView: totalSlides > 2 ? 2.5 : Math.min(2, totalSlides),
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: totalSlides > 3 ? 3.5 : Math.min(3, totalSlides),
                        spaceBetween: 15
                    },
                    1024: {
                        slidesPerView: totalSlides > 4 ? 4.5 : Math.min(4, totalSlides),
                        spaceBetween: 20
                    },
                    1200: {
                        slidesPerView: totalSlides > 5 ? 5.5 : Math.min(5, totalSlides),
                        spaceBetween: 20
                    },
                    1440: {
                        slidesPerView: totalSlides > 6 ? 6.5 : Math.min(6, totalSlides),
                        spaceBetween: 20
                    }
                },

                on: {
                    init: (swiper) => {
                        this.equalizeHeights();
                        this.updateNavigationVisibility(swiper, totalSlides);
                        this.updateButtonStates(swiper);
                        this.updateDebug('Swiper inicializado correctamente');
                    },
                    update: (swiper) => {
                        this.equalizeHeights();
                        this.updateNavigationVisibility(swiper, totalSlides);
                        this.updateButtonStates(swiper);
                    },
                    resize: (swiper) => {
                        setTimeout(() => {
                            this.equalizeHeights();
                            this.updateNavigationVisibility(swiper, totalSlides);
                            this.updateButtonStates(swiper);
                        }, 100);
                    },
                    breakpoint: (swiper) => {
                        setTimeout(() => {
                            this.updateNavigationVisibility(swiper, totalSlides);
                            this.updateButtonStates(swiper);
                        }, 150);
                    },
                    slideChange: (swiper) => {
                        this.equalizeHeights();
                        this.updateButtonStates(swiper);
                    },
                    reachBeginning: (swiper) => {
                        this.updateButtonStates(swiper);
                    },
                    reachEnd: (swiper) => {
                        this.updateButtonStates(swiper);
                    }
                }
            });
            
            this.updateDebug(`Swiper inicializado con ${totalSlides} slides`);
            
            } catch (error) {
                this.updateDebug(`Error inicializando Swiper: ${error.message}`);
                console.error('Error al inicializar Swiper:', error);
                this.initializeFallbackLayout();
            }
        });
    }

    equalizeHeights() {
        let cards = document.querySelectorAll('.docente-card');
        let maxHeight = 0;

        // Restablecer la altura para evitar acumulación
        cards.forEach(card => {
            card.style.height = 'auto';
            let height = card.offsetHeight;
            if (height > maxHeight) {
                maxHeight = height;
            }
        });

        // Aplicar la altura máxima a todas las tarjetas
        cards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }

    updateNavigationVisibility(swiper, totalSlides) {
        const nextBtn = document.querySelector('.docentes-next');
        const prevBtn = document.querySelector('.docentes-prev');

        if (!nextBtn || !prevBtn) {
            this.updateDebug('Botones de navegación no encontrados');
            return;
        }

        // Validar que swiper y sus parámetros estén disponibles
        if (!swiper || !swiper.params) {
            this.updateDebug('Swiper o sus parámetros no están disponibles');
            return;
        }

        // Obtener los slides visibles actuales desde la instancia de swiper
        const slidesPerView =
            swiper.params.slidesPerView === 'auto'
                ? swiper.slidesPerViewDynamic
                    ? swiper.slidesPerViewDynamic()
                    : 1
                : swiper.params.slidesPerView || 1;

        // Si hay más slides que los que se pueden ver completamente, mostrar navegación
        // Usamos Math.floor para considerar solo slides completos
        const needsNavigation = totalSlides > Math.floor(slidesPerView);

        if (needsNavigation) {
            // Mostrar contenedor de botones
            nextBtn.classList.add('show-navigation');
            nextBtn.classList.remove('swiper-button-hidden');
            nextBtn.setAttribute('aria-hidden', 'false');

            prevBtn.classList.add('show-navigation');
            prevBtn.classList.remove('swiper-button-hidden');
            prevBtn.setAttribute('aria-hidden', 'false');

            this.updateButtonStates(swiper);
        } else {
            // Ocultar completamente si todos los slides son visibles
            nextBtn.classList.remove('show-navigation');
            nextBtn.classList.add('swiper-button-hidden');
            nextBtn.setAttribute('aria-hidden', 'true');

            prevBtn.classList.remove('show-navigation');
            prevBtn.classList.add('swiper-button-hidden');
            prevBtn.setAttribute('aria-hidden', 'true');
        }
    }

    updateButtonStates(swiper) {
        const nextBtn = document.querySelector('.docentes-next');
        const prevBtn = document.querySelector('.docentes-prev');

        if (!nextBtn || !prevBtn) {
            this.updateDebug('Botones de navegación no encontrados para actualizar estados');
            return;
        }

        // Validar que swiper esté disponible
        if (!swiper) {
            this.updateDebug('Swiper no está disponible para actualizar estados de botones');
            return;
        }

        // Verificar si los botones deben estar activos
        const isBeginning = swiper.isBeginning || false;
        const isEnd = swiper.isEnd || false;
        const allowSlideNext = swiper.allowSlideNext !== undefined ? swiper.allowSlideNext : true;
        const allowSlidePrev = swiper.allowSlidePrev !== undefined ? swiper.allowSlidePrev : true;

        // Botón anterior
        if (isBeginning || !allowSlidePrev) {
            prevBtn.classList.add('swiper-button-disabled');
            prevBtn.style.opacity = '0.3';
            prevBtn.style.pointerEvents = 'none';
            prevBtn.setAttribute('aria-disabled', 'true');
        } else {
            prevBtn.classList.remove('swiper-button-disabled');
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
            prevBtn.setAttribute('aria-disabled', 'false');
        }

        // Botón siguiente
        if (isEnd || !allowSlideNext) {
            nextBtn.classList.add('swiper-button-disabled');
            nextBtn.style.opacity = '0.3';
            nextBtn.style.pointerEvents = 'none';
            nextBtn.setAttribute('aria-disabled', 'true');
        } else {
            nextBtn.classList.remove('swiper-button-disabled');
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
            nextBtn.setAttribute('aria-disabled', 'false');
        }

        // Asegurar visibilidad si la navegación está habilitada
        if (nextBtn.classList.contains('show-navigation')) {
            nextBtn.style.visibility = 'visible';
            nextBtn.style.display = 'flex';
        }
        if (prevBtn.classList.contains('show-navigation')) {
            prevBtn.style.visibility = 'visible';
            prevBtn.style.display = 'flex';
        }
    }

    showLoadingState() {
        this.hideAllStates();
        this.elements.loadingState.style.display = 'block';
    }

    showErrorState(message) {
        this.hideAllStates();
        this.elements.errorMessage.textContent = message;
        this.elements.errorState.style.display = 'block';
    }

    showEmptyState() {
        this.hideAllStates();
        this.elements.emptyState.style.display = 'block';
    }

    showDocentesSection() {
        this.hideAllStates();
        this.elements.docentesSection.style.display = 'block';
    }

    hideAllStates() {
        this.elements.loadingState.style.display = 'none';
        this.elements.errorState.style.display = 'none';
        this.elements.emptyState.style.display = 'none';
        this.elements.docentesSection.style.display = 'none';
    }

    updateDebug(message) {
        const timestamp = new Date().toLocaleTimeString();
        const currentContent = this.elements.debugContent.textContent;
        const newContent = `[${timestamp}] ${message}\n${currentContent}`;
        this.elements.debugContent.textContent = newContent;
    }
}

// Ejemplo de datos de prueba (igual que la API)
const ejemploDatos = {
    "investigadores": [
        {
            "emplid": "00020312822",
            "uuid": "6959ae13-6803-4c3d-8bd7-a737f5948e05",
            "foto": [
                {
                    "url": "https://puj-staging.elsevierpure.com/ws/files/13229864/00020312822.jpg"
                }
            ],
            "nombresApellidos": {
                "nombres": "Carlos Andrés",
                "apellidos": "Parra Acevedo"
            },
            "informacionAdicional": {
                "portalUrl": "https://puj-staging.elsevierpure.com/en/persons/6959ae13-6803-4c3d-8bd7-a737f5948e05"
            },
            "asociacionesOrganizacionales": [
                {
                    "cargo": {
                        "descripcion": [
                            {
                                "idioma": "en_US",
                                "valor": "Associate Professor"
                            },
                            {
                                "idioma": "es_CO",
                                "valor": "Profesor Asociado"
                            }
                        ]
                    }
                }
            ]
        }
    ]
};

// Función para verificar dependencias
function checkDependencies() {
    return new Promise((resolve) => {
        let attempts = 0;
        const maxAttempts = 100; // 15 segundos máximo
        
        const checkInterval = setInterval(() => {
            attempts++;
            
            if (typeof Swiper !== 'undefined') {
                console.log(`Swiper encontrado después de ${attempts * 150}ms`);
                clearInterval(checkInterval);
                resolve(true);
                return;
            }
            
            if (attempts >= maxAttempts) {
                console.log('Timeout esperando Swiper');
                clearInterval(checkInterval);
                resolve(false);
                return;
            }
            
            // Log cada segundo
            if (attempts % 7 === 0) {
                console.log(`Esperando Swiper... ${attempts * 150}ms`);
            }
        }, 150);
    });
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM cargado, verificando dependencias...');
    
    const swiperAvailable = await checkDependencies();
    
    if (!swiperAvailable) {
        console.error('Swiper no se cargó correctamente');
        // Mostrar mensaje de error en la UI
        document.body.innerHTML += `
            <div style="background: #ff6b6b; color: white; padding: 20px; margin: 20px; border-radius: 8px;">
                <h3>Error de Carga</h3>
                <p>No se pudo cargar Swiper. La funcionalidad del carrusel no estará disponible.</p>
                <p>Por favor, verifica tu conexión a internet e intenta recargar la página.</p>
                <button onclick="location.reload()" style="background: white; color: #ff6b6b; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">
                    Recargar Página
                </button>
            </div>
        `;
        // Aún así inicializar la aplicación sin Swiper
        const app = new DocentesAPI();
        window.docentesApp = app;
        return;
    }
    
    console.log('Swiper disponible, inicializando aplicación...');
    
    const app = new DocentesAPI();
    
    // Exposer para debugging
    window.docentesApp = app;
    
    console.log('Aplicación de prueba cargada');
    console.log('Ejemplo de datos:', ejemploDatos);
});