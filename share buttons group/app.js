const currentUrl = encodeURIComponent(window.location.href);
const message = encodeURIComponent("Te invito a visitar este sitio web de la Pontificia Universidad Javeriana.");

let timeOut;
const listSocial = [
    {
        type: "button",
        id: "btnOpen",
        icon: "share-fill",
        backgroundColor: "#4866D1",
    },
    {
        type: "link",
        icon: "facebook",
        url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
        backgroundColor: "#1877F2", // Azul Facebook
    },
    {
        type: "link",
        icon: "twitter-x",
        url: `https://twitter.com/intent/tweet?text=${message}&url=${currentUrl}`,
        backgroundColor: "#14171A", // Azul Twitter
    },
    {
        type: "link",
        icon: "linkedin",
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}&summary=${message}`,
        backgroundColor: "#0077B5", // Azul LinkedIn
    },
    {
        type: "link",
        icon: "whatsapp",
        url: `https://api.whatsapp.com/send?text=${message}%20${currentUrl}`,
        backgroundColor: "#25D366", // Verde WhatsApp
    },
    {
        type: "button",
        id: "btnCopy",
        icon: "copy",
        backgroundColor: "#FFC107", // Color adicional
    },
    {
        type: "button",
        id: "btnShare",
        icon: "box-arrow-up-right",
        backgroundColor: "#4CAF50", // Color adicional
    },
];

class Item {
    constructor(type, id, icon, url, backgroundColor, index) {
        // Crear un elemento <button> o <a> según el tipo
        this.$element = $(document.createElement("div"));
        this.$element.addClass("item");
        this.$element.css("border", "1px solid " + backgroundColor);
        this.$element.css("z-index", index + 2);
        this.$item;

        if (type === "button") {
            this.$item = $(document.createElement("button"));
            this.$item.attr("id", id); // Asignar el id
            this.$item.on("click", () => {
                if (id === "btnCopy") {
                    this.copy();
                } else if (id === "btnShare") {
                    this.share();
                }
            });
        } else {
            this.$item = $(document.createElement("a"));
            this.$item.attr("href", url);
            this.$item.attr("target", "_blank");
        }

        // Asignar clases al elemento
        this.$item.addClass("icon-button");
        this.$element.append(this.$item); // Agregar el botón o enlace al elemento

        // Establecer el color de fondo original
        const originalColor = "#fff";
        const span = $(document.createElement("span"));
        span.css("background-color", originalColor);
        this.$item.append(span);

        // Crear un icono <ion-icon> y un <span> para el texto
        const $icon = $(document.createElement("i"));
        $icon.attr("class", "bi bi-" + icon); // Asignar el nombre del icono
        $icon.css("color", backgroundColor); // Establecer el color del icono
        this.$item.append($icon); // Agregar el icono al elemento

        // Cambiar el color de fondo al hacer hover
        this.$item.on("mouseenter", () => {
            $icon.css("color", originalColor);
            span.css("background-color", backgroundColor);
        });

        this.$item.on("mouseleave", () => {
            $icon.css("color", backgroundColor);
            span.css("background-color", originalColor);
        });

        // Inicializar referencias para la lista de elementos
        this.prev = null;
        this.next = null;
        this.isMoving = false;

        // Manejo del movimiento del ratón sobre el elemento
        let element = this; // Guardar referencia a 'this'
        this.$element.on("mousemove", function () {
            clearTimeout(timeOut); // Limpiar el timeout anterior
            timeOut = setTimeout(function () {
                if (element.next && element.isMoving) {
                    element.next.moveTo(element); // Mover al siguiente elemento si está en movimiento
                }
            }, 10); // Esperar 10 ms antes de ejecutar el movimiento
        });
    }

    moveTo(item) {
        console.log(this.$element[0]);

        anime({
            targets: this.$element[0],
            left: item.$element.css("left"),
            top: item.$element.css("top"),
            duration: 700,
            elasticity: 500,
        });
        if (this.next) {
            this.next.moveTo(item);
        }
    }

    updatePosition() {
        anime({
            targets: this.$element[0],
            left: this.prev.$element.css("left"),
            top: this.prev.$element.css("top"),
            duration: 80,
        });

        if (this.next) {
            this.next.updatePosition();
        }
    }

    copy() {
        navigator.clipboard
            .writeText(currentUrl)
            .then(() => {
                alert("Enlace copiado al portapapeles.");
            })
            .catch((error) => {
                console.error("Error al copiar el enlace:", error);
            });
    }

    async share() {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Mi Página Web",
                    text: "¡Mira esta increíble página!",
                    url: currentUrl,
                });
                console.log("Contenido compartido con éxito");
            } catch (error) {
                console.error("Error al compartir:", error);
            }
        } else {
            alert("La funcionalidad de compartir no es compatible con tu dispositivo.");
        }
    }
}

class Menu {
    constructor(menu) {
        this.$element = $(menu);
        this.size = 0;
        this.first = null;
        this.last = null;
        this.timeOut = null;
        this.hasMoved = false;
        this.status = "closed";
    }

    add(item) {
        let menu = this;
        if (this.first == null) {
            this.first = item;
            this.last = item;
            this.first.$element.on("mouseup", function () {
                if (menu.first.isMoving) {
                    menu.first.isMoving = false;
                } else {
                    menu.click();
                }
            });
            item.$element.draggable(
                {
                    start: function () {
                        menu.close();
                        item.isMoving = true;
                    },
                },
                {
                    drag: function () {
                        if (item.next) {
                            item.next.updatePosition();
                        }
                    },
                },
                {
                    stop: function () {
                        item.isMoving = false;
                        item.next.moveTo(item);
                    },
                }
            );
        } else {
            this.last.next = item;
            item.prev = this.last;
            this.last = item;
        }
        this.$element.after(item.$element);
    }

    open() {
        this.status = "open";
        let current = this.first.next;
        let iterator = 1;
        let head = this.first;

        // Sensores para movimiento. Sens = 1 para moverse a la derecha.
        let sens = 1; // Siempre hacia la derecha en lugar de izquierda.

        // Detectar si estamos en mobile
        const isMobile = window.innerWidth <= 768;

        while (current != null) {
            anime({
                targets: current.$element[0],
                left: !isMobile
                    ? parseInt(head.$element.css("left"), 10) + sens * (iterator * 50)
                    : head.$element.css("left"),
                top: isMobile ? parseInt(head.$element.css("top"), 10) + iterator * 50 : head.$element.css("top"),
                duration: 500,
            });
            iterator++;
            current = current.next;
        }
    }

    close() {
        this.status = "closed";
        let current = this.first.next;
        let head = this.first;
        let iterator = 1;
        while (current != null) {
            anime({
                targets: current.$element[0],
                left: head.$element.css("left"),
                top: head.$element.css("top"),
                duration: 500,
            });
            iterator++;
            current = current.next;
        }
    }

    click() {
        if (this.status == "closed") {
            this.open();
        } else {
            this.close();
        }
    }
}

let menu = new Menu("#myMenu");
listSocial.forEach((element, index) => {
    let item = new Item(
        element.type,
        element.id,
        element.icon,
        element.url,
        element.backgroundColor,
        listSocial.length - index
    );
    menu.add(item);
});

$(document)
    .delay(50)
    .queue(function (next) {
        menu.open();
        next();
        $(document)
            .delay(1000)
            .queue(function (next) {
                menu.close();
                next();
            });
    });
