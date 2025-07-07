// Funciones centralizadas para el menú flotante
// Todas las funcionalidades están aquí para ser usadas por React

function createFloatingMenuFunctions() {
    // Verificar que estamos en el cliente (navegador)
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return null;
    }

    // Variables globales
    const currentUrl = encodeURIComponent(window.location.href);
    const message = encodeURIComponent("Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.");
    let isDarkTheme = false;

    // Configuración de elementos del menú
    const menuConfig = [
        { 
            id: 'btnOpen', 
            icon: 'ph-magnifying-glass-plus', 
            color: '#4866D1', 
            action: 'toggle',
            title: 'Abrir/Cerrar menú'
        },
        { 
            id: 'btnZoomOut', 
            icon: 'ph-magnifying-glass-minus', 
            color: '#FF6B6B', 
            action: 'zoomOut',
            title: 'Zoom Out'
        },
        { 
            id: 'btnThemeToggle', 
            icon: 'ph-sun', 
            color: '#F6E05E', 
            action: 'themeToggle',
            title: 'Cambiar tema',
            dynamicIcon: true // Indica que el icono cambia según el estado
        },
        { 
            id: 'btnGradient', 
            icon: 'ph-gradient', 
            color: '#9F7AEA', 
            action: 'gradient',
            title: 'Activar gradiente'
        },
        { 
            id: 'btnContrast', 
            icon: 'ph-circle-half', 
            color: '#718096', 
            action: 'contrast',
            title: 'Cambiar contraste'
        },
        { 
            id: 'btnVisibility', 
            icon: 'ph-eye', 
            color: '#38B2AC', 
            action: 'visibility',
            title: 'Cambiar visibilidad'
        },
        { 
            id: 'btnShare', 
            icon: 'ph-share-fat', 
            color: '#4CAF50', 
            action: 'share',
            title: 'Compartir página'
        },
        {
            id: 'btnWhatsapp',
            icon: 'ph-whatsapp-logo',
            color: '#25D366',
            action: 'whatsapp',
            title: 'Compartir en WhatsApp',
            url: `https://api.whatsapp.com/send?text=${message}%20${currentUrl}`
        }
    ];

    // Funciones de acciones principales del menú
    const menuActions = {
        // Acción del primer botón (ya no cambia estado, solo placeholder)
        toggle: () => {
            console.log('El menú permanece siempre abierto');
            return true;
        },

        // Función de zoom out
        zoomOut: () => {
            alert('Función de zoom out activada');
            // Aquí se puede implementar lógica real de zoom
            console.log('Zoom out ejecutado');
            return true;
        },
        
        // Cambio de tema oscuro/claro
        themeToggle: () => {
            isDarkTheme = !isDarkTheme;
            
            if (isDarkTheme) {
                document.body.style.filter = "invert(1)";
                console.log('Tema oscuro activado');
            } else {
                document.body.style.filter = "";
                console.log('Tema claro activado');
            }
            
            return isDarkTheme;
        },
        
        // Toggle de fondo gradiente
        gradient: () => {
            const hasGradient = document.body.style.background.includes("gradient");
            
            if (hasGradient) {
                document.body.style.background = "";
                console.log('Gradiente desactivado');
            } else {
                document.body.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                console.log('Gradiente activado');
            }
            
            return !hasGradient;
        },
        
        // Toggle de contraste
        contrast: () => {
            const currentFilter = document.body.style.filter;
            const hasContrast = currentFilter.includes("contrast");
            
            if (hasContrast) {
                // Remover solo el contraste, mantener otros filtros como invert
                const newFilter = currentFilter.replace(/contrast\([^)]*\)\s*/g, '').trim();
                document.body.style.filter = newFilter;
                console.log('Contraste desactivado');
            } else {
                // Agregar contraste a filtros existentes
                const newFilter = currentFilter ? `${currentFilter} contrast(1.5)` : 'contrast(1.5)';
                document.body.style.filter = newFilter;
                console.log('Contraste activado');
            }
            
            return !hasContrast;
        },
        
        // Toggle de visibilidad del contenido demo
        visibility: () => {
            const content = document.querySelector('.demo-content');
            if (content) {
                const isHidden = content.style.opacity === "0.5";
                content.style.opacity = isHidden ? "1" : "0.5";
                console.log(`Visibilidad: ${isHidden ? 'mostrado' : 'atenuado'}`);
                return !isHidden;
            }
            console.warn('Elemento .demo-content no encontrado');
            return false;
        },
        
        // Función de compartir nativa (ahora abre modal)
        share: async () => {
            console.log('Acción de compartir - abriendo modal');
            return true;
        },
        
        // Abrir WhatsApp con mensaje predefinido
        whatsapp: () => {
            const url = `https://api.whatsapp.com/send?text=${message}%20${currentUrl}`;
            if (typeof window !== 'undefined') {
                window.open(url, '_blank');
                console.log('WhatsApp abierto');
                return true;
            }
            console.error('Window no disponible');
            return false;
        }
    };

    // Funciones específicas para el modal de compartir
    const shareModalActions = {
        whatsapp: () => {
            const url = `https://api.whatsapp.com/send?text=${message}%20${currentUrl}`;
            window.open(url, '_blank');
            console.log('WhatsApp compartido desde modal');
            return true;
        },

        facebook: () => {
            const url = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
            window.open(url, '_blank');
            console.log('Facebook compartido desde modal');
            return true;
        },

        instagram: () => {
            // Instagram no permite compartir directamente vía URL
            const url = decodeURIComponent(currentUrl);
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(() => {
                    alert('Enlace copiado. Puedes pegarlo en Instagram Stories o enviar por DM.');
                    console.log('Enlace copiado para Instagram');
                }).catch(err => {
                    console.error('Error al copiar para Instagram:', err);
                    // Fallback si falla clipboard
                    fallbackCopyText(url);
                });
            } else {
                fallbackCopyText(url);
            }
            return true;
        },

        linkedin: () => {
            const url = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
            window.open(url, '_blank');
            console.log('LinkedIn compartido desde modal');
            return true;
        },

        email: () => {
            const subject = encodeURIComponent("Te comparto este sitio web");
            const body = encodeURIComponent(`Hola,\n\nTe invito a visitar este increíble sitio web:\n${decodeURIComponent(currentUrl)}\n\n¡Espero que te guste!`);
            const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
            window.location.href = mailtoUrl;
            console.log('Email compartido desde modal');
            return true;
        },

        copylink: async () => {
            const url = decodeURIComponent(currentUrl);
            try {
                await navigator.clipboard.writeText(url);
                alert('Enlace copiado al portapapeles');
                console.log('Enlace copiado desde modal');
                return true;
            } catch (err) {
                console.error('Error al copiar:', err);
                // Fallback para navegadores antiguos
                fallbackCopyText(url);
                return true;
            }
        }
    };

    // Función auxiliar para copiar texto en navegadores antiguos
    const fallbackCopyText = (text) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.top = '-9999px';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        
        try {
            document.execCommand('copy');
            alert('Enlace copiado al portapapeles');
            console.log('Texto copiado usando fallback');
        } catch (err) {
            console.error('Error en fallback de copia:', err);
            alert('No se pudo copiar el enlace. Por favor, cópialo manualmente: ' + text);
        } finally {
            document.body.removeChild(textArea);
        }
    };

    // Utilidades del menú
    const utils = {
        // Cargar iconos Phosphor
        loadPhosphorIcons: () => {
            if (!document.querySelector('link[href*="phosphor-icons"]')) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
                document.head.appendChild(link);
                console.log('Iconos Phosphor cargados');
            }
        },

        // Obtener configuración de icono para el tema según hover
        getThemeIconData: (isHovered = false) => {
            if (!isHovered) {
                return {
                    icon: isDarkTheme ? 'ph-moon' : 'ph-sun',
                    color: isDarkTheme ? '#2D3748' : '#F6E05E'
                };
            }
            
            // En hover, mostrar el icono contrario
            return {
                icon: isDarkTheme ? 'ph-sun' : 'ph-moon',
                color: isDarkTheme ? '#F6E05E' : '#2D3748',
                hoverColor: isDarkTheme ? '#F6E05E' : '#2D3748'
            };
        },

        // Obtener configuración actualizada del menú
        getUpdatedMenuConfig: () => {
            return menuConfig.map(item => {
                if (item.id === 'btnThemeToggle') {
                    const themeData = utils.getThemeIconData(false); // Sin hover por defecto
                    return {
                        ...item,
                        icon: themeData.icon,
                        color: themeData.color,
                        hoverColor: themeData.hoverColor || themeData.color
                    };
                }
                return item;
            });
        },

        // Obtener estado actual
        getState: () => ({
            isDarkTheme,
            currentUrl,
            message
        }),

        // Datos útiles
        getCurrentUrl: () => currentUrl,
        getMessage: () => message,
        isDarkTheme: () => isDarkTheme,

        // Ejecutar acción por nombre
        executeAction: (actionName, url = null) => {
            if (actionName === 'whatsapp' && url) {
                window.open(url, '_blank');
                return true;
            }
            
            if (menuActions[actionName]) {
                return menuActions[actionName]();
            }
            
            console.warn(`Acción '${actionName}' no encontrada`);
            return false;
        },

        // Ejecutar acción de compartir del modal
        executeShareAction: (platform) => {
            if (shareModalActions[platform]) {
                return shareModalActions[platform]();
            }
            
            console.warn(`Acción de compartir '${platform}' no encontrada`);
            return false;
        }
    };

    // Retornar objeto público con todas las funcionalidades
    return {
        actions: menuActions,
        shareActions: shareModalActions, // Nuevo objeto de acciones de compartir
        config: menuConfig,
        utils: utils,
        
        // Métodos de conveniencia
        getMenuItems: utils.getUpdatedMenuConfig,
        executeAction: utils.executeAction,
        executeShareAction: utils.executeShareAction, // Nueva función expuesta
        getThemeIcon: utils.getThemeIconData
    };
}

// Función deshabilitada para evitar menús duplicados
function initFloatingMenu() {
    console.warn('initFloatingMenu() está deshabilitada para evitar menús duplicados.');
    console.log('Usa createFloatingMenuFunctions() para acceder a las funcionalidades.');
    return null;
}

// Exportar usando sintaxis ES6 para Next.js
export { createFloatingMenuFunctions, initFloatingMenu };

// Exportación por defecto
export default createFloatingMenuFunctions;

// Hacer disponible globalmente si se necesita
if (typeof window !== 'undefined') {
    window.FloatingMenuFunctions = createFloatingMenuFunctions;
}