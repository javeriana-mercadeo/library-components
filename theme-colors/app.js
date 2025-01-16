const root = document.documentElement;

// Selecciona todos los botones con el atributo `data-theme`
const themeButtons = document.querySelectorAll("button[data-theme]");

// Añade un evento a cada botón
themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const themeName = button.getAttribute("data-theme");
        changeTheme(themeName);
    });
});

// Función para cambiar el tema
function changeTheme(themeName) {
    root.setAttribute("data-theme", themeName);
}
