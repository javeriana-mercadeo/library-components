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

    // Configuración de elementos del menú (eliminados gradient, contrast, visibility)
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
            dynamicIcon: true
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

    // Funciones específicas para compartir en redes sociales
    const socialShareFunctions = {
        // Compartir en WhatsApp
        shareToWhatsApp: () => {
            const shareMessage = encodeURIComponent('Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.');
            const url = encodeURIComponent(window.location.href);
            const whatsappUrl = `https://api.whatsapp.com/send?text=${shareMessage}%20${url}`;
            window.open(whatsappUrl, '_blank');
            console.log('Compartido en WhatsApp');
            return true;
        },

        // Compartir en Facebook
        shareToFacebook: () => {
            const url = encodeURIComponent(window.location.href);
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
            window.open(facebookUrl, '_blank', 'width=600,height=400');
            console.log('Compartido en Facebook');
            return true;
        },

        // Compartir en Instagram (copiar link)
        shareToInstagram: async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copiado. Puedes pegarlo en tu historia de Instagram');
                console.log('Link copiado para Instagram');
                return true;
            } catch (error) {
                console.error('Error al copiar link:', error);
                prompt('Copia este link para Instagram:', window.location.href);
                return false;
            }
        },

        // Compartir en LinkedIn
        shareToLinkedIn: () => {
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent('Pontificia Universidad Javeriana');
            const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`;
            window.open(linkedinUrl, '_blank', 'width=600,height=400');
            console.log('Compartido en LinkedIn');
            return true;
        },

        // Compartir por correo
        shareByEmail: () => {
            const subject = encodeURIComponent('Te invito a visitar este sitio web');
            const body = encodeURIComponent(`Te invito a visitar este sitio web de la Pontificia Universidad Javeriana: ${window.location.href}`);
            const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
            window.open(mailtoUrl);
            console.log('Correo de compartir abierto');
            return true;
        },

        // Copiar link al portapapeles
        copyLink: async () => {
            try {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copiado al portapapeles');
                console.log('Link copiado al portapapeles');
                return true;
            } catch (error) {
                console.error('Error al copiar al portapapeles:', error);
                // Fallback para navegadores antiguos
                const textArea = document.createElement('textarea');
                textArea.value = window.location.href;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    alert('Link copiado al portapapeles');
                    return true;
                } catch (fallbackError) {
                    console.error('Error en fallback:', fallbackError);
                    prompt('Copia este link:', window.location.href);
                    return false;
                } finally {
                    document.body.removeChild(textArea);
                }
            }
        }
    };

    // Funciones de acciones principales (eliminadas gradient, contrast, visibility)
    const menuActions = {
        // Acción del primer botón (ya no cambia estado, solo placeholder)
        toggle: () => {
            console.log('El menú permanece siempre abierto');
            return true;
        },

        // Función de zoom out
        zoomOut: () => {
            alert('Función de zoom out activada');
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
        
        // Función de compartir - Retorna 'modal' para que React maneje el modal
        share: () => {
            console.log('Solicitud de abrir modal de compartir');
            // Retornar 'modal' indica a React que debe abrir el modal
            return 'modal';
        },
        
        // Función de compartir con Web Share API como fallback
        shareNative: async () => {
            if (navigator.share) {
                try {
                    await navigator.share({ 
                        title: "Mi Página Web", 
                        text: "¡Mira esta increíble página!", 
                        url: window.location.href 
                    });
                    console.log('Contenido compartido exitosamente');
                    return true;
                } catch (error) {
                    console.error("Error al compartir:", error);
                    return false;
                }
            } else {
                // Fallback: copiar al clipboard
                return socialShareFunctions.copyLink();
            }
        },
        
        // Abrir WhatsApp con mensaje predefinido
        whatsapp: () => {
            return socialShareFunctions.shareToWhatsApp();
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
                    color: isDarkTheme ? '#2D3748' : '#F6E05E',
                    hoverColor: isDarkTheme ? '#F6E05E' : '#2D3748'
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
                    const themeData = utils.getThemeIconData(false);
                    return {
                        ...item,
                        icon: themeData.icon,
                        color: themeData.color,
                        hoverColor: themeData.hoverColor
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

        // Acceso directo a funciones de redes sociales
        socialShare: socialShareFunctions
    };

    // Retornar objeto público con todas las funcionalidades
    return {
        actions: menuActions,
        config: menuConfig,
        utils: utils,
        socialShare: socialShareFunctions,
        
        // Métodos de conveniencia
        getMenuItems: utils.getUpdatedMenuConfig,
        executeAction: utils.executeAction,
        getThemeIcon: utils.getThemeIconData
    };
}

// Función deshabilitada para evitar menús duplicados
function initFloatingMenu() {
    console.warn('initFloatingMenu() está deshabilitada para evitar menús duplicados.');
    console.log('Usa createFloatingMenuFunctions() para acceder a las funcionalidades.');
    return null;
}

// Funciones globales adicionales para uso directo
window.shareToWhatsApp = () => {
    const functions = createFloatingMenuFunctions();
    return functions?.socialShare.shareToWhatsApp() || false;
};

window.shareToFacebook = () => {
    const functions = createFloatingMenuFunctions();
    return functions?.socialShare.shareToFacebook() || false;
};

window.shareToInstagram = () => {
    const functions = createFloatingMenuFunctions();
    return functions?.socialShare.shareToInstagram() || false;
};

window.shareToLinkedIn = () => {
    const functions = createFloatingMenuFunctions();
    return functions?.socialShare.shareToLinkedIn() || false;
};

window.shareByEmail = () => {
    const functions = createFloatingMenuFunctions();
    return functions?.socialShare.shareByEmail() || false;
};

window.copyLink = () => {
    const functions = createFloatingMenuFunctions();
    return functions?.socialShare.copyLink() || false;
};

// Exportar usando sintaxis ES6 para Next.js
export { createFloatingMenuFunctions, initFloatingMenu };

// Exportación por defecto
export default createFloatingMenuFunctions;

// Hacer disponible globalmente si se necesita
if (typeof window !== 'undefined') {
    window.FloatingMenuFunctions = createFloatingMenuFunctions;
}