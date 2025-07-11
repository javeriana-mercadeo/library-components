function initializeAccessibilityBar() {
    'use strict';

    const CONFIG = {
        version: '2.2.0',
        debug: false,
        
        // Configuración de inicialización
        initialization: {
            delayAfterMount: 1500,
            maxInitAttempts: 5,
            retryDelay: 1000
        },
        
        // Configuración de font scale
        fontScale: {
            min: 0.8,
            max: 2.0,
            step: 0.1,
            applyToRootFontSize: true
        },
        
        // Selectores para aplicar font scale
        zoomSelectors: {
            primary: [
                '#wrapper > .container-fluid:not([class*="accessibility"])',
                '#wrapper > main:not([class*="accessibility"])',
                '#wrapper > .main-content:not([class*="accessibility"])',
                'main:not([class*="accessibility"])',
                '.layout:not([class*="accessibility"])',
                '#content:not([class*="accessibility"])'
            ],
            fallback: [
                'body > .container:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)',
                'body > .container-fluid:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)',
                'body > main:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button)'
            ]
        },
        
        // Configuración de anuncios
        announcements: {
            enabled: true,
            elementId: 'accessibility-announcements',
            delay: 100
        },
        
        // URLs para compartir
        shareConfig: {
            whatsapp: 'https://api.whatsapp.com/send',
            facebook: 'https://www.facebook.com/sharer/sharer.php',
            linkedin: 'https://www.linkedin.com/sharing/share-offsite/',
            instagram: null
        },
        
        // Mensajes
        messages: {
            notifications: {
                darkThemeOn: 'Tema oscuro activado',
                darkThemeOff: 'Tema claro activado',
                grayscaleOn: 'Escala de grises activada',
                grayscaleOff: 'Escala de grises desactivada',
                linkCopied: 'Enlace copiado al portapapeles',
                linkCopyError: 'Error al copiar enlace',
                instagramCopy: 'Enlace copiado. Puedes pegarlo en tu historia de Instagram',
                fontSizeIncreased: 'Tamaño de fuente aumentado',
                fontSizeDecreased: 'Tamaño de fuente reducido',
                fontSizeMax: 'Tamaño máximo de fuente alcanzado',
                fontSizeMin: 'Tamaño mínimo de fuente alcanzado',
                menuReady: 'Barra de accesibilidad lista para usar'
            }
        }
    };

    // Estado global del sistema
    let accessibilityState = {
        initialized: false,
        initAttempts: 0,
        
        // Estados de funcionalidad (siempre inician en false/1.0)
        darkTheme: false,
        grayscale: false,
        fontScale: 1.0,
        modalOpen: false,
        
        // Estados de interacción
        isHoveringTheme: false,
        
        elements: {
            menu: null,
            whatsappButton: null,
            shareModal: null,
            themeButton: null,
            themeIcon: null,
            grayscaleButton: null,
            announcements: null
        }
    };

    // Funciones de utilidad
    const Logger = {
        info: (message, ...args) => {
            if (CONFIG.debug) {
                console.log(`🚀 [AccessibilityJaveriana] ${message}`, ...args);
            }
        },
        warn: (message, ...args) => {
            console.warn(`⚠️ [AccessibilityJaveriana] ${message}`, ...args);
        },
        error: (message, ...args) => {
            console.error(`❌ [AccessibilityJaveriana] ${message}`, ...args);
        },
        success: (message, ...args) => {
            if (CONFIG.debug) {
                console.log(`✅ [AccessibilityJaveriana] ${message}`, ...args);
            }
        }
    };

    // Sistema de anuncios para screen readers
    const Announcer = {
        announce: function(message) {
            if (!CONFIG.announcements.enabled) return;
            
            const announcer = accessibilityState.elements.announcements;
            if (!announcer) return;
            
            announcer.textContent = '';
            
            setTimeout(() => {
                announcer.textContent = message;
                Logger.info('Anuncio para screen reader:', message);
            }, CONFIG.announcements.delay);
        }
    };

    // Gestor de Font Scale
    const FontScaleManager = {
        applyFontScale: function(scale) {
            Logger.info(`Aplicando escala de fuente: ${scale}`);
            
            // Método 1: CSS custom property
            if (CONFIG.fontScale.applyToRootFontSize) {
                document.documentElement.style.setProperty('--accessibility-font-scale', scale);
                this.updateFontScaleCSS(scale);
            }
            
            // Método 2: Transform en elementos específicos
            const targets = this.getFontScaleTargets();
            
            if (targets.length > 0) {
                targets.forEach(element => {
                    if (element && !this.isAccessibilityElement(element)) {
                        element.style.transform = `scale(${scale})`;
                        element.style.transformOrigin = 'top left';
                        element.style.transition = 'transform 0.3s ease';
                    }
                });
                Logger.success(`Escala aplicada a ${targets.length} elementos`);
            } else {
                Logger.warn('No se encontraron elementos target para aplicar escala');
            }
            
            return true;
        },
        
        updateFontScaleCSS: function(scale) {
            let styleElement = document.getElementById('accessibility-font-scale-styles');
            
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'accessibility-font-scale-styles';
                document.head.appendChild(styleElement);
            }
            
            const css = `
                :root {
                    --accessibility-font-scale: ${scale};
                }
                
                body:not(.floating-menu):not(.whatsapp-floating-button) *:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button):not(.share-modal) {
                    font-size: calc(1rem * var(--accessibility-font-scale)) !important;
                }
                
                .floating-menu,
                .floating-menu *,
                .whatsapp-floating-button,
                .whatsapp-floating-button *,
                .share-modal-overlay,
                .share-modal-overlay *,
                [class*="accessibility"],
                [id*="accessibility"] {
                    font-size: initial !important;
                    transform: none !important;
                }
            `;
            
            styleElement.textContent = css;
        },
        
        getFontScaleTargets: function() {
            const targets = [];
            
            // Intentar selectores primarios
            for (const selector of CONFIG.zoomSelectors.primary) {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    if (!this.isAccessibilityElement(el)) {
                        targets.push(el);
                    }
                });
                
                if (targets.length > 0) {
                    Logger.info(`Usando selector primario: ${selector}, encontrados: ${targets.length}`);
                    break;
                }
            }
            
            // Si no encuentra, usar fallback
            if (targets.length === 0) {
                for (const selector of CONFIG.zoomSelectors.fallback) {
                    const elements = document.querySelectorAll(selector);
                    elements.forEach(el => {
                        if (!this.isAccessibilityElement(el)) {
                            targets.push(el);
                        }
                    });
                    
                    if (targets.length > 0) {
                        Logger.info(`Usando selector fallback: ${selector}, encontrados: ${targets.length}`);
                        break;
                    }
                }
            }
            
            return targets;
        },
        
        isAccessibilityElement: function(element) {
            if (!element) return false;
            
            const className = element.className || '';
            const id = element.id || '';
            
            if (className.includes('accessibility') || 
                className.includes('floating-menu') || 
                className.includes('whatsapp-floating-button') ||
                className.includes('share-modal') ||
                id.includes('accessibility')) {
                return true;
            }
            
            const parent = element.closest('.floating-menu, .whatsapp-floating-button, .share-modal-overlay, [class*="accessibility"]');
            return !!parent;
        },
        
        resetFontScale: function() {
            accessibilityState.fontScale = 1.0;
            this.applyFontScale(1.0);
            
            const targets = this.getFontScaleTargets();
            targets.forEach(element => {
                if (element) {
                    element.style.transform = '';
                    element.style.transformOrigin = '';
                    element.style.transition = '';
                }
            });
            
            document.documentElement.style.removeProperty('--accessibility-font-scale');
            
            const styleElement = document.getElementById('accessibility-font-scale-styles');
            if (styleElement) {
                styleElement.remove();
            }
            
            Logger.info('Escala de fuente reseteada a 100%');
        }
    };

    // Gestor de Escala de Grises
    const GrayscaleManager = {
        apply: function() {
            try {
                Logger.info('Aplicando escala de grises...');
                document.body.classList.add('grayscale-mode');
                this.createGrayscaleCSS();
                this.updateButtonState(true);
                Logger.success('Escala de grises aplicada correctamente');
            } catch (error) {
                Logger.error('Error aplicando escala de grises:', error);
            }
        },
        
        remove: function() {
            try {
                Logger.info('Removiendo escala de grises...');
                document.body.classList.remove('grayscale-mode');
                this.removeGrayscaleCSS();
                this.updateButtonState(false);
                Logger.success('Escala de grises removida');
            } catch (error) {
                Logger.error('Error removiendo escala de grises:', error);
            }
        },
        
        createGrayscaleCSS: function() {
            const styleId = 'accessibility-grayscale-styles';
            let styleElement = document.getElementById(styleId);
            
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);
            }
            
            const css = `
                body.grayscale-mode #wrapper:not(.accessibility-menu-portlet),
                body.grayscale-mode .portlet:not([class*="accessibility"]):not([id*="accessibility"]),
                body.grayscale-mode .portlet-content:not([class*="accessibility"]),
                body.grayscale-mode .journal-content-article:not([class*="accessibility"]),
                body.grayscale-mode .portlet-body:not([class*="accessibility"]),
                body.grayscale-mode main:not([class*="accessibility"]),
                body.grayscale-mode .container:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button),
                body.grayscale-mode .container-fluid:not([class*="accessibility"]):not(.floating-menu):not(.whatsapp-floating-button),
                body.grayscale-mode .content:not([class*="accessibility"]),
                body.grayscale-mode .main-content:not([class*="accessibility"]),
                body.grayscale-mode .page-content:not([class*="accessibility"]) {
                    filter: grayscale(100%) !important;
                    transition: filter 0.3s ease !important;
                }
                
                body.grayscale-mode img:not(.floating-menu img):not(.whatsapp-floating-button img):not(.share-modal img):not([class*="accessibility"]),
                body.grayscale-mode video:not(.floating-menu video):not(.whatsapp-floating-button video):not(.share-modal video):not([class*="accessibility"]) {
                    filter: grayscale(100%) !important;
                    transition: filter 0.3s ease !important;
                }
                
                body.grayscale-mode .floating-menu,
                body.grayscale-mode .floating-menu *,
                body.grayscale-mode .whatsapp-floating-button,
                body.grayscale-mode .whatsapp-floating-button *,
                body.grayscale-mode .share-modal-overlay,
                body.grayscale-mode .share-modal-overlay *,
                body.grayscale-mode [class*="accessibility"],
                body.grayscale-mode [id*="accessibility"] {
                    filter: none !important;
                    -webkit-filter: none !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                }
            `;
            
            styleElement.textContent = css;
        },
        
        removeGrayscaleCSS: function() {
            const styleElement = document.getElementById('accessibility-grayscale-styles');
            if (styleElement) {
                styleElement.remove();
            }
        },
        
        updateButtonState: function(isActive) {
            const grayscaleButton = document.querySelector('[data-action="grayscale"]');
            
            if (grayscaleButton) {
                if (isActive) {
                    grayscaleButton.classList.add('active');
                    grayscaleButton.setAttribute('aria-pressed', 'true');
                } else {
                    grayscaleButton.classList.remove('active');
                    grayscaleButton.setAttribute('aria-pressed', 'false');
                }
            }
        }
    };

    // Funciones principales de accesibilidad
    function increaseFontSize() {
        Logger.info('Ejecutando increaseFontSize');
        
        const newScale = Math.min(CONFIG.fontScale.max, accessibilityState.fontScale + CONFIG.fontScale.step);
        
        if (newScale === accessibilityState.fontScale) {
            Announcer.announce(CONFIG.messages.notifications.fontSizeMax);
            Logger.warn('Ya se alcanzó la escala máxima:', newScale);
            return accessibilityState.fontScale;
        }
        
        accessibilityState.fontScale = newScale;
        FontScaleManager.applyFontScale(accessibilityState.fontScale);
        
        const percentage = Math.round(accessibilityState.fontScale * 100);
        Announcer.announce(`${CONFIG.messages.notifications.fontSizeIncreased}. Nivel: ${percentage}%`);
        Logger.success(`Fuente aumentada: ${accessibilityState.fontScale} (${percentage}%)`);
        
        return accessibilityState.fontScale;
    }

    function decreaseFontSize() {
        Logger.info('Ejecutando decreaseFontSize');
        
        const newScale = Math.max(CONFIG.fontScale.min, accessibilityState.fontScale - CONFIG.fontScale.step);
        
        if (newScale === accessibilityState.fontScale) {
            Announcer.announce(CONFIG.messages.notifications.fontSizeMin);
            Logger.warn('Ya se alcanzó la escala mínima:', newScale);
            return accessibilityState.fontScale;
        }
        
        accessibilityState.fontScale = newScale;
        FontScaleManager.applyFontScale(accessibilityState.fontScale);
        
        const percentage = Math.round(accessibilityState.fontScale * 100);
        Announcer.announce(`${CONFIG.messages.notifications.fontSizeDecreased}. Nivel: ${percentage}%`);
        Logger.success(`Fuente reducida: ${accessibilityState.fontScale} (${percentage}%)`);
        
        return accessibilityState.fontScale;
    }

    function toggleGrayscale() {
        Logger.info('Ejecutando toggleGrayscale');
        
        accessibilityState.grayscale = !accessibilityState.grayscale;
        
        if (accessibilityState.grayscale) {
            GrayscaleManager.apply();
            Announcer.announce(CONFIG.messages.notifications.grayscaleOn);
        } else {
            GrayscaleManager.remove();
            Announcer.announce(CONFIG.messages.notifications.grayscaleOff);
        }
        
        return accessibilityState.grayscale;
    }

    function toggleTheme() {
        Logger.info('Ejecutando toggleTheme');
        
        accessibilityState.darkTheme = !accessibilityState.darkTheme;
        const themeButton = accessibilityState.elements.themeButton;
        const themeIcon = accessibilityState.elements.themeIcon;
        
        if (accessibilityState.darkTheme) {
            document.body.classList.add('accessibility-dark-theme');
            themeButton?.classList.add('active');
            themeButton?.setAttribute('aria-pressed', 'true');
            
            if (themeIcon && !accessibilityState.isHoveringTheme) {
                themeIcon.className = 'ph ph-moon';
                themeIcon.setAttribute('aria-label', 'Tema oscuro activo');
            }
            
            Announcer.announce(CONFIG.messages.notifications.darkThemeOn);
            Logger.success('Tema oscuro activado');
        } else {
            document.body.classList.remove('accessibility-dark-theme');
            themeButton?.classList.remove('active');
            themeButton?.setAttribute('aria-pressed', 'false');
            
            if (themeIcon && !accessibilityState.isHoveringTheme) {
                themeIcon.className = 'ph ph-sun';
                themeIcon.setAttribute('aria-label', 'Tema claro activo');
            }
            
            Announcer.announce(CONFIG.messages.notifications.darkThemeOff);
            Logger.success('Tema claro activado');
        }
        
        return accessibilityState.darkTheme;
    }

    function toggleShareModal() {
        Logger.info('Ejecutando toggleShareModal');
        
        const modal = accessibilityState.elements.shareModal;
        if (!modal) {
            Logger.error('Modal de compartir no encontrado');
            return false;
        }

        accessibilityState.modalOpen = !accessibilityState.modalOpen;
        
        if (accessibilityState.modalOpen) {
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            
            setTimeout(() => {
                const closeButton = document.getElementById('shareModalClose');
                if (closeButton) {
                    closeButton.focus();
                }
            }, 150);
            
            Logger.success('Modal de compartir abierto');
        } else {
            closeShareModal();
        }
        
        return accessibilityState.modalOpen;
    }

    function closeShareModal() {
        Logger.info('Cerrando modal de compartir');
        
        const modal = accessibilityState.elements.shareModal;
        if (modal && accessibilityState.modalOpen) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            accessibilityState.modalOpen = false;
            document.body.style.overflow = '';
            
            setTimeout(() => {
                const shareButton = document.querySelector('[data-action="share"]');
                if (shareButton) {
                    shareButton.focus();
                }
            }, 150);
            
            Logger.success('Modal de compartir cerrado');
        }
    }

    // Funciones para compartir en redes sociales
    const ShareFunctions = {
        getCurrentUrl: function() {
            return encodeURIComponent(window.location.href);
        },

        getShareMessage: function() {
            return encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.');
        },

        whatsapp: function() {
            const message = this.getShareMessage();
            const url = this.getCurrentUrl();
            const whatsappUrl = `${CONFIG.shareConfig.whatsapp}?text=${message}%20${url}`;
            
            window.open(whatsappUrl, '_blank');
            Logger.info('Compartido en WhatsApp');
            closeShareModal();
        },

        facebook: function() {
            const url = this.getCurrentUrl();
            const facebookUrl = `${CONFIG.shareConfig.facebook}?u=${url}`;
            
            window.open(facebookUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
            Logger.info('Compartido en Facebook');
            closeShareModal();
        },

        instagram: function() {
            this.copyToClipboard()
                .then(() => {
                    alert(CONFIG.messages.notifications.instagramCopy);
                    Logger.info('Enlace copiado para Instagram');
                })
                .catch(() => {
                    this.fallbackCopyPrompt();
                });
            
            closeShareModal();
        },

        linkedin: function() {
            const url = this.getCurrentUrl();
            const title = encodeURIComponent('Pontificia Universidad Javeriana');
            const linkedinUrl = `${CONFIG.shareConfig.linkedin}?url=${url}&title=${title}`;
            
            window.open(linkedinUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
            Logger.info('Compartido en LinkedIn');
            closeShareModal();
        },

        email: function() {
            const subject = encodeURIComponent('Te invito a visitar este sitio web');
            const body = encodeURIComponent(`Te invito a visitar este sitio web de la Pontificia Universidad Javeriana: ${window.location.href}`);
            const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
            
            window.open(mailtoUrl);
            Logger.info('Aplicación de email abierta');
            closeShareModal();
        },

        copy: function() {
            this.copyToClipboard()
                .then(() => {
                    alert(CONFIG.messages.notifications.linkCopied);
                    Logger.info('Enlace copiado al portapapeles');
                })
                .catch(() => {
                    this.fallbackCopyPrompt();
                });
            
            closeShareModal();
        },

        copyToClipboard: async function() {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                return await navigator.clipboard.writeText(window.location.href);
            } else {
                throw new Error('Clipboard API no disponible');
            }
        },

        fallbackCopyPrompt: function() {
            const url = window.location.href;
            
            if (window.prompt) {
                window.prompt('Copia este enlace:', url);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = url;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                
                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        alert(CONFIG.messages.notifications.linkCopied);
                    } else {
                        alert(CONFIG.messages.notifications.linkCopyError);
                    }
                } catch (err) {
                    Logger.error('Error copiando enlace:', err);
                    alert(`${CONFIG.messages.notifications.linkCopyError}: ${url}`);
                }
                
                document.body.removeChild(textArea);
            }
        }
    };

    // Manejadores de eventos
    function handleMenuClick(action, element) {
        Logger.info('Acción del menú:', action);

        if (element) {
            element.classList.add('clicked');
            setTimeout(() => element.classList.remove('clicked'), 200);
        }

        switch (action) {
            case 'zoomIn':
            case 'increaseFontSize':
                increaseFontSize();
                break;
            case 'zoomOut':
            case 'decreaseFontSize':
                decreaseFontSize();
                break;
            case 'themeToggle':
                toggleTheme();
                break;
            case 'grayscale':
                toggleGrayscale();
                break;
            case 'share':
                toggleShareModal();
                break;
            case 'whatsapp':
                ShareFunctions.whatsapp();
                break;
            default:
                Logger.warn('Acción no reconocida:', action);
        }
    }

    function handleShareAction(action, element) {
        Logger.info('Acción de compartir:', action);

        if (element) {
            element.classList.add('clicked');
            setTimeout(() => element.classList.remove('clicked'), 200);
        }

        const shareFunction = ShareFunctions[action];
        if (shareFunction && typeof shareFunction === 'function') {
            shareFunction.call(ShareFunctions);
        } else {
            Logger.warn('Función de compartir no encontrada:', action);
        }
    }

    function handleKeyboard(event) {
        const { key, target } = event;

        if (key === 'Escape' && accessibilityState.modalOpen) {
            event.preventDefault();
            closeShareModal();
            return;
        }

        if ((key === 'Enter' || key === ' ') && target) {
            const action = target.getAttribute('data-action');
            const shareAction = target.getAttribute('data-share-action');

            if (action) {
                event.preventDefault();
                handleMenuClick(action, target);
            } else if (shareAction) {
                event.preventDefault();
                handleShareAction(shareAction, target);
            } else if (target.id === 'shareModalClose') {
                event.preventDefault();
                closeShareModal();
            }
        }
    }

    function handleThemeHover(isHovering) {
        const themeIcon = accessibilityState.elements.themeIcon;
        if (!themeIcon) return;

        accessibilityState.isHoveringTheme = isHovering;

        if (isHovering) {
            const hoverIcon = accessibilityState.darkTheme ? 'ph ph-sun' : 'ph ph-moon';
            themeIcon.className = hoverIcon;
            Logger.info('Hover iniciado - Icono cambiado a:', hoverIcon);
        } else {
            const currentIcon = accessibilityState.darkTheme ? 'ph ph-moon' : 'ph ph-sun';
            themeIcon.className = currentIcon;
            themeIcon.setAttribute('aria-label', accessibilityState.darkTheme ? 'Tema oscuro activo' : 'Tema claro activo');
            Logger.info('Hover terminado - Icono restaurado a:', currentIcon);
        }
    }

    // Inicializador del menú
    function cacheElements() {
        accessibilityState.elements = {
            menu: document.querySelector('.floating-menu'),
            whatsappButton: document.querySelector('.whatsapp-floating-button'),
            shareModal: document.getElementById('shareModal'),
            themeButton: document.getElementById('theme-button'),
            themeIcon: document.getElementById('theme-icon'),
            grayscaleButton: document.getElementById('grayscale-button'),
            announcements: document.getElementById(CONFIG.announcements.elementId)
        };

        Logger.info('Elementos DOM cacheados');
    }

    function validateElements() {
        const required = ['menu', 'whatsappButton', 'shareModal'];
        const missing = required.filter(key => !accessibilityState.elements[key]);

        if (missing.length > 0) {
            Logger.error('Elementos críticos faltantes:', missing);
            return false;
        }

        const menu = accessibilityState.elements.menu;
        if (menu) {
            const styles = window.getComputedStyle(menu);
            if (styles.display === 'none' || styles.visibility === 'hidden') {
                Logger.warn('El menú existe pero no es visible');
            }
        }

        Logger.success('Elementos validados correctamente');
        return true;
    }

    function setupEventListeners() {
        Logger.info('Configurando event listeners...');

        document.querySelectorAll('[data-action]').forEach(element => {
            const action = element.getAttribute('data-action');
            if (action) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleMenuClick(action, element);
                });

                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '0');
                }

                Logger.success(`Listener agregado para: ${action}`);
            }
        });

        document.querySelectorAll('[data-share-action]').forEach(element => {
            const shareAction = element.getAttribute('data-share-action');
            if (shareAction) {
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleShareAction(shareAction, element);
                });

                if (!element.hasAttribute('tabindex')) {
                    element.setAttribute('tabindex', '0');
                }
            }
        });

        const closeButton = document.getElementById('shareModalClose');
        if (closeButton) {
            closeButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                closeShareModal();
            });
            Logger.success('Listener para cerrar modal agregado');
        }

        const modal = accessibilityState.elements.shareModal;
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    closeShareModal();
                }
            });
        }

        document.addEventListener('keydown', handleKeyboard);

        const themeButton = accessibilityState.elements.themeButton;
        if (themeButton) {
            themeButton.addEventListener('mouseenter', () => {
                handleThemeHover(true);
            });
            
            themeButton.addEventListener('mouseleave', () => {
                handleThemeHover(false);
            });
            
            themeButton.addEventListener('focus', () => {
                if (!accessibilityState.isHoveringTheme) {
                    handleThemeHover(true);
                }
            });
            
            themeButton.addEventListener('blur', () => {
                setTimeout(() => {
                    if (!accessibilityState.isHoveringTheme) {
                        handleThemeHover(false);
                    }
                }, 100);
            });
            
            Logger.success('Listeners de hover/focus para tema agregados');
        }

        Logger.success('Todos los event listeners configurados');
    }

    function setupInitialState() {
        Logger.info('Configurando estado inicial...');

        hideMenuInitially();

        const modal = accessibilityState.elements.shareModal;
        if (modal) {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
            accessibilityState.modalOpen = false;
        }

        setupAriaAttributes();

        setTimeout(() => {
            showMenuWithAnimation();
        }, 200);

        Logger.success('Estado inicial configurado');
    }

    function hideMenuInitially() {
        const menu = accessibilityState.elements.menu;
        const whatsappButton = accessibilityState.elements.whatsappButton;
        
        if (menu) {
            menu.style.opacity = '0';
            menu.style.transform = 'translateX(-100%)';
            menu.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        if (whatsappButton) {
            whatsappButton.style.opacity = '0';
            whatsappButton.style.transform = 'translateX(-100%)';
            whatsappButton.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
    }

    function showMenuWithAnimation() {
        const menu = accessibilityState.elements.menu;
        const whatsappButton = accessibilityState.elements.whatsappButton;
        
        if (menu) {
            menu.style.opacity = '1';
            menu.style.transform = 'translateX(0)';
        }
        
        if (whatsappButton) {
            setTimeout(() => {
                whatsappButton.style.opacity = '1';
                whatsappButton.style.transform = 'translateX(0)';
            }, 200);
        }
        
        Logger.success('Menú mostrado con animación');
    }

    function setupAriaAttributes() {
        const themeButton = accessibilityState.elements.themeButton;
        const grayscaleButton = accessibilityState.elements.grayscaleButton;

        if (themeButton) {
            themeButton.setAttribute('aria-pressed', accessibilityState.darkTheme.toString());
        }

        if (grayscaleButton) {
            grayscaleButton.setAttribute('aria-pressed', accessibilityState.grayscale.toString());
        }

        Logger.info('Atributos ARIA configurados');
    }

    function loadPhosphorIcons() {
        if (!document.querySelector('link[href*="phosphor-icons"]')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
            document.head.appendChild(link);
            Logger.info('Iconos Phosphor cargados');
        }
    }

    function initialize() {
        if (accessibilityState.initialized) {
            Logger.info('Menú ya inicializado');
            return true;
        }

        accessibilityState.initAttempts++;
        Logger.info(`Intento de inicialización ${accessibilityState.initAttempts}/${CONFIG.initialization.maxInitAttempts}`);

        loadPhosphorIcons();
        cacheElements();

        if (!validateElements()) {
            if (accessibilityState.initAttempts < CONFIG.initialization.maxInitAttempts) {
                Logger.warn(`Inicialización fallida, reintentando en ${CONFIG.initialization.retryDelay}ms...`);
                setTimeout(() => {
                    initialize();
                }, CONFIG.initialization.retryDelay);
                return false;
            } else {
                Logger.error('Máximo número de intentos alcanzado, inicialización abortada');
                return false;
            }
        }

        setupEventListeners();
        setupInitialState();

        accessibilityState.initialized = true;

        Logger.success(`🎉 Barra de Accesibilidad inicializada correctamente en intento ${accessibilityState.initAttempts}`);
        
        setTimeout(() => {
            Announcer.announce(CONFIG.messages.notifications.menuReady);
        }, 1000);

        return true;
    }

    // API pública
    const PublicAPI = {
        version: CONFIG.version,
        getState: () => ({ ...accessibilityState }),
        getConfig: () => ({ ...CONFIG }),
        increaseFontSize: increaseFontSize,
        decreaseFontSize: decreaseFontSize,
        zoomIn: increaseFontSize,
        zoomOut: decreaseFontSize,
        toggleGrayscale: toggleGrayscale,
        toggleTheme: toggleTheme,
        toggleShareModal: toggleShareModal,
        closeShareModal: closeShareModal,
        
        share: ShareFunctions,
        announcer: Announcer,
        fontScale: FontScaleManager,
        
        debug: function() {
            const debugInfo = {
                version: CONFIG.version,
                timestamp: new Date().toISOString(),
                state: accessibilityState,
                environment: {
                    userAgent: navigator.userAgent,
                    viewport: {
                        width: window.innerWidth,
                        height: window.innerHeight
                    },
                    url: window.location.href
                },
                elements: Object.keys(accessibilityState.elements).reduce((acc, key) => {
                    const element = accessibilityState.elements[key];
                    acc[key] = {
                        exists: !!element,
                        visible: element ? window.getComputedStyle(element).display !== 'none' : false
                    };
                    return acc;
                }, {}),
                fontScale: {
                    current: accessibilityState.fontScale,
                    percentage: Math.round(accessibilityState.fontScale * 100) + '%',
                    limits: CONFIG.fontScale
                }
            };
            
            console.group('🐛 Debug Info - Barra de Accesibilidad Javeriana');
            console.table(debugInfo.state);
            console.log('Información completa:', debugInfo);
            console.groupEnd();
            
            return debugInfo;
        },
        
        reinitialize: function() {
            Logger.info('Reinicializando sistema...');
            accessibilityState.initialized = false;
            accessibilityState.initAttempts = 0;
            return initialize();
        },
        
        reset: function() {
            Logger.info('Reseteando sistema completo...');
            
            document.body.classList.remove('accessibility-dark-theme', 'grayscale-mode');
            document.body.style.overflow = '';
            
            FontScaleManager.resetFontScale();
            closeShareModal();
            
            const themeButton = accessibilityState.elements.themeButton;
            const grayscaleButton = accessibilityState.elements.grayscaleButton;
            const themeIcon = accessibilityState.elements.themeIcon;
            
            themeButton?.classList.remove('active');
            themeButton?.setAttribute('aria-pressed', 'false');
            grayscaleButton?.classList.remove('active');
            grayscaleButton?.setAttribute('aria-pressed', 'false');
            
            if (themeIcon) {
                themeIcon.className = 'ph ph-sun';
                themeIcon.setAttribute('aria-label', 'Tema claro activo');
            }
            
            accessibilityState.darkTheme = false;
            accessibilityState.grayscale = false;
            accessibilityState.fontScale = 1.0;
            accessibilityState.modalOpen = false;
            accessibilityState.isHoveringTheme = false;
            
            Logger.success('Sistema reseteado completamente');
            Announcer.announce('Configuración de accesibilidad reseteada');
        },
        
        setDebug: function(enabled) {
            CONFIG.debug = enabled;
            Logger.info(`Modo debug ${enabled ? 'activado' : 'desactivado'}`);
        }
    };

    // Inicialización automática
    Logger.info(`🚀 Cargando Barra de Accesibilidad Javeriana v${CONFIG.version} (Sin Persistencia)`);

    // Estrategias de inicialización
    if (document.readyState === 'complete') {
        setTimeout(initialize, CONFIG.initialization.delayAfterMount);
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(initialize, CONFIG.initialization.delayAfterMount);
        });
    } else {
        setTimeout(initialize, CONFIG.initialization.delayAfterMount);
    }

    // Safety timeout
    setTimeout(() => {
        if (!accessibilityState.initialized) {
            Logger.warn('Inicialización por timeout de seguridad');
            initialize();
        }
    }, 5000);

    // Exponer API pública
    if (typeof window !== 'undefined') {
        window.AccessibilityMenuJaveriana = PublicAPI;
        Logger.info('🌍 API pública disponible en window.AccessibilityMenuJaveriana');
    }

    Logger.success('🏁 Sistema de accesibilidad cargado sin persistencia');

    return PublicAPI;
}