// Menú flotante con JavaScript vanilla - sin dependencias
// Menú flotante con JavaScript vanilla - sin dependencias
// Menú flotante con JavaScript vanilla - sin dependencias
// Menú flotante con JavaScript vanilla - sin dependencias
function initFloatingMenu() {
    // Cargar iconos Phosphor via CSS (más eficiente)
    if (!document.querySelector('link[href*="phosphor-icons"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/regular/style.css';
        document.head.appendChild(link);
    }

    // Variables globales
    const currentUrl = encodeURIComponent(window.location.href);
    const message = encodeURIComponent("Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.");
    let timeOut;
    let menu;

    // Configuración de elementos del menú
    const listSocial = [
        { type: "button", id: "btnOpen", icon: "ph-magnifying-glass-plus", backgroundColor: "#4866D1" },
        { type: "button", id: "btnZoomOut", icon: "ph-magnifying-glass-minus", backgroundColor: "#FF6B6B" },
        { type: "button", id: "btnThemeToggle", icon: "ph-sun", backgroundColor: "#F6E05E" }, // Solo este botón de tema
        { type: "button", id: "btnGradient", icon: "ph-gradient", backgroundColor: "#9F7AEA" },
        { type: "button", id: "btnContrast", icon: "ph-circle-half", backgroundColor: "#718096" },
        { type: "button", id: "btnVisibility", icon: "ph-eye", backgroundColor: "#38B2AC" },
        { type: "button", id: "btnShare", icon: "ph-share-fat", backgroundColor: "#4CAF50" },
        { type: "link", icon: "ph-whatsapp-logo", url: `https://api.whatsapp.com/send?text=${message}%20${currentUrl}`, backgroundColor: "#25D366" }
    ];

    // Utilidades de animación simple
    function animateElement(element, properties, duration = 500) {
        const startTime = performance.now();
        const startValues = {};
        
        Object.keys(properties).forEach(prop => {
            const currentValue = element.style[prop] || getComputedStyle(element)[prop];
            startValues[prop] = parseFloat(currentValue) || 0;
        });

        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);

            Object.keys(properties).forEach(prop => {
                const start = startValues[prop];
                const end = parseFloat(properties[prop]);
                const current = start + (end - start) * easeOut;
                element.style[prop] = current + 'px';
            });

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }

    // Variable global para el estado del tema
    let isDarkTheme = false;

    // Clase Item para elementos individuales
    function Item(type, id, icon, url, backgroundColor, index) {
        // Crear elemento contenedor
        this.element = document.createElement("div");
        this.element.className = "item";
        this.element.style.border = "1px solid " + backgroundColor;
        this.element.style.zIndex = index + 2;
        this.element.style.position = "absolute";
        this.element.style.left = "0px";
        this.element.style.top = "0px";
        this.element.style.width = "38px";
        this.element.style.height = "38px";
        this.element.style.backgroundColor = "white";
        this.element.style.borderRadius = "50%";
        this.element.style.display = "flex";
        this.element.style.alignItems = "center";
        this.element.style.justifyContent = "center";
        this.element.style.cursor = "pointer";
        this.element.style.overflow = "hidden";
        this.element.style.transition = "all 0.5s ease";

        // Guardar referencia al ID para lógica específica
        this.itemId = id;

        // Crear botón o enlace según el tipo
        if (type === "button") {
            this.item = document.createElement("button");
            this.item.id = id;
            this.item.addEventListener("click", () => {
                if (id === "btnZoomOut") alert("Función de zoom out activada");
                else if (id === "btnThemeToggle") this.toggleTheme();
                else if (id === "btnGradient") document.body.style.background = document.body.style.background.includes("gradient") ? "" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                else if (id === "btnContrast") document.body.style.filter = document.body.style.filter.includes("contrast") ? "" : "contrast(1.5)";
                else if (id === "btnVisibility") {
                    const content = document.querySelector('.demo-content');
                    if (content) content.style.opacity = content.style.opacity === "0.5" ? "1" : "0.5";
                }
                else if (id === "btnShare") {
                    if (navigator.share) {
                        navigator.share({ title: "Mi Página Web", text: "¡Mira esta increíble página!", url: window.location.href })
                            .then(() => console.log("Contenido compartido con éxito"))
                            .catch((error) => console.error("Error al compartir:", error));
                    } else {
                        alert("La funcionalidad de compartir no es compatible con tu dispositivo.");
                    }
                }
            });
        } else {
            this.item = document.createElement("a");
            this.item.href = url;
            this.item.target = "_blank";
        }

        // Estilos del botón/enlace
        this.item.className = "icon-button";
        this.item.style.textDecoration = "none";
        this.item.style.cursor = "pointer";
        this.item.style.display = "flex";
        this.item.style.alignItems = "center";
        this.item.style.justifyContent = "center";
        this.item.style.backgroundColor = "white";
        this.item.style.borderRadius = "50%";
        this.item.style.border = "none";
        this.item.style.width = "100%";
        this.item.style.height = "100%";
        this.item.style.outline = "none";
        this.element.appendChild(this.item);

        // Crear span para efecto hover
        const span = document.createElement("span");
        span.style.position = "absolute";
        span.style.top = "50%";
        span.style.left = "50%";
        span.style.width = "0";
        span.style.height = "0";
        span.style.backgroundColor = "#fff";
        span.style.borderRadius = "50%";
        span.style.transform = "translate(-50%, -50%)";
        span.style.transition = "all 0.3s ease";
        span.style.zIndex = "0";
        this.item.appendChild(span);

        // Crear icono
        const iconElement = document.createElement("i");
        iconElement.className = "ph " + icon;
        iconElement.style.fontSize = "19px";
        iconElement.style.color = backgroundColor;
        iconElement.style.transition = "all 0.3s ease";
        iconElement.style.zIndex = "1";
        iconElement.style.position = "relative";
        this.item.appendChild(iconElement);

        // Guardar referencias para uso posterior
        this.iconElement = iconElement;
        this.span = span;
        this.originalIcon = icon;
        this.backgroundColor = backgroundColor;

        // Eventos hover con lógica especial para tema
        this.item.addEventListener("mouseenter", () => {
            // Lógica especial para el botón de tema - cambiar icono ANTES del hover visual
            if (id === "btnThemeToggle") {
                if (isDarkTheme) {
                    // Si está en modo oscuro, mostrar sol al hacer hover
                    iconElement.className = "ph ph-sun";
                    iconElement.style.color = "#F6E05E"; // Color del sol
                } else {
                    // Si está en modo claro, mostrar luna al hacer hover
                    iconElement.className = "ph ph-moon";
                    iconElement.style.color = "#2D3748"; // Color de la luna
                }
            }
            
            // Aplicar efectos hover visuales después del cambio de icono
            setTimeout(() => {
                iconElement.style.color = "#fff";
                span.style.backgroundColor = this.backgroundColor;
                span.style.width = "3.6rem";
                span.style.height = "3.6rem";
            }, 50);
        });

        this.item.addEventListener("mouseleave", () => {
            // Restaurar efectos hover primero
            iconElement.style.color = this.backgroundColor;
            span.style.backgroundColor = "#fff";
            span.style.width = "0";
            span.style.height = "0";
            
            // Restaurar icono original después
            if (id === "btnThemeToggle") {
                setTimeout(() => {
                    iconElement.className = "ph " + this.originalIcon;
                    iconElement.style.color = this.backgroundColor;
                }, 50);
            }
        });

        // Propiedades para lista enlazada
        this.prev = null;
        this.next = null;
        this.isMoving = false;

        // Evento mousemove para seguimiento
        let element = this;
        this.element.addEventListener("mousemove", function () {
            clearTimeout(timeOut);
            timeOut = setTimeout(function () {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element);
                }
            }, 10);
        });

        // Método para cambiar tema
        this.toggleTheme = function() {
            isDarkTheme = !isDarkTheme;
            
            if (isDarkTheme) {
                // Activar modo oscuro
                document.body.style.filter = "invert(1)";
                this.originalIcon = "ph-moon";
                this.backgroundColor = "#2D3748";
                this.element.style.border = "1px solid #2D3748";
            } else {
                // Activar modo claro
                document.body.style.filter = "";
                this.originalIcon = "ph-sun";
                this.backgroundColor = "#F6E05E";
                this.element.style.border = "1px solid #F6E05E";
            }
            
            // Actualizar icono actual
            this.iconElement.className = "ph " + this.originalIcon;
            this.iconElement.style.color = this.backgroundColor;
        };

        // Métodos de movimiento
        this.moveTo = function(item) {
            const targetLeft = parseInt(item.element.style.left) || 0;
            const targetTop = parseInt(item.element.style.top) || 0;
            
            animateElement(this.element, {
                left: targetLeft,
                top: targetTop
            }, 700);
            
            if (this.next) this.next.moveTo(item);
        };

        this.updatePosition = function() {
            if (this.prev) {
                const targetLeft = parseInt(this.prev.element.style.left) || 0;
                const targetTop = parseInt(this.prev.element.style.top) || 0;
                
                animateElement(this.element, {
                    left: targetLeft,
                    top: targetTop
                }, 80);
            }
            
            if (this.next) this.next.updatePosition();
        };
    }

    // Clase Menu para manejar la colección de elementos
    function Menu(menuSelector) {
        this.element = document.querySelector(menuSelector);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.status = "closed";

        // Verificar que el elemento existe
        if (!this.element) {
            console.error(`Elemento ${menuSelector} no encontrado en el DOM`);
            return;
        }

        this.add = function(item) {
            let menu = this;
            
            // Verificar que el elemento del menú existe y tiene un contenedor
            if (!this.element) {
                console.error('Elemento del menú no existe');
                return;
            }

            if (this.first == null) {
                this.first = item;
                this.last = item;
                
                // Evento click para toggle
                this.first.element.addEventListener("mouseup", function () {
                    if (menu.first.isMoving) {
                        menu.first.isMoving = false;
                    } else {
                        menu.click();
                    }
                });

                // Simulación básica de drag (sin jQuery UI)
                let isDragging = false;
                
                item.element.addEventListener("mousedown", function(e) {
                    isDragging = true;
                    menu.close();
                    item.isMoving = true;
                    e.preventDefault();
                });

                document.addEventListener("mousemove", function(e) {
                    if (isDragging && item.isMoving) {
                        item.element.style.left = (e.clientX - 19) + "px";
                        item.element.style.top = (e.clientY - 19) + "px";
                        if (item.next) item.next.updatePosition();
                    }
                });

                document.addEventListener("mouseup", function() {
                    if (isDragging) {
                        isDragging = false;
                        item.isMoving = false;
                        if (item.next) item.next.moveTo(item);
                    }
                });
            } else {
                this.last.next = item;
                item.prev = this.last;
                this.last = item;
            }
            
            // Usar el elemento del menú directamente en lugar de parentNode
            this.element.appendChild(item.element);
        };

        this.open = function() {
            this.status = "open";
            let current = this.first.next;
            let iterator = 1;

            while (current != null) {
                const baseTop = parseInt(this.first.element.style.top) || 0;
                animateElement(current.element, {
                    left: parseInt(this.first.element.style.left) || 0,
                    top: baseTop + iterator * 50
                }, 500);
                iterator++;
                current = current.next;
            }
        };

        this.close = function() {
            this.status = "closed";
            let current = this.first.next;

            while (current != null) {
                animateElement(current.element, {
                    left: parseInt(this.first.element.style.left) || 0,
                    top: parseInt(this.first.element.style.top) || 0
                }, 500);
                current = current.next;
            }
        };

        this.click = function() {
            if (this.status == "closed") {
                this.open();
            } else {
                this.close();
            }
        };
    }

    // Inicialización del menú con verificación
    const menuElement = document.querySelector("#myMenu");
    if (!menuElement) {
        console.error('Elemento #myMenu no encontrado. Asegúrate de que existe <div id="myMenu"></div> en el HTML');
        return;
    }

    menu = new Menu("#myMenu");
    
    // Verificar que el menú se inicializó correctamente
    if (!menu.element) {
        console.error('No se pudo inicializar el menú');
        return;
    }

    listSocial.forEach((element, index) => {
        let item = new Item(element.type, element.id, element.icon, element.url, element.backgroundColor, listSocial.length - index);
        menu.add(item);
    });

    // Animación inicial - menú siempre desplegado
    setTimeout(() => {
        if (menu && menu.open) {
            menu.open();
            // Comentado para mantener el menú siempre abierto
            // setTimeout(() => {
            //     if (menu && menu.close) {
            //         menu.close();
            //     }
            // }, 1000);
        }
    }, 50);
}

// Inicializar cuando el DOM esté listo con mejor verificación
function initWhenReady() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Esperar un poco más para asegurar que el DOM esté completamente cargado
            setTimeout(initFloatingMenu, 100);
        });
    } else {
        // Esperar un tick para asegurar que todos los elementos estén renderizados
        setTimeout(initFloatingMenu, 100);
    }
}

initWhenReady();

<script src="https://unpkg.com/@phosphor-icons/web"></script>