const elements = { buttonModalAlert: null, modal: null };

window.addEventListener("DOMContentLoaded", () => {
    console.log("🟠 [Modal de alerta] Cargando...");
    runMain(elements);
    console.log("🟢 [Modal de alerta] Cargado con éxito");
});

// FUNCIONES
function runMain(elements) {
    loadElements(elements);
    const { buttonModalAlert, modal } = elements;

    // VALIDAR SI LOS ELEMENTOS EXISTEN
    if (validateElements(elements)) {
        buttonModalAlert.style.display = "flex";
        modal.style.display = "block";
        renderModalAlert(elements);
    } else {
        buttonModalAlert.style.display = "none";
        modal.style.display = "none";
    }
}

// Cargar los elementos
function loadElements(elements) {
    elements.buttonModalAlert = document.getElementById("buttonModalAlert");
    elements.modal = document.getElementById("modalAlert");
}

// Validar si los elementos existen
function validateElements(elements) {
    return Object.keys(elements).every((key) => elements[key] !== null);
}

function renderModalAlert(elements) {
    const { buttonModalAlert } = elements;

    // MANEJAR LOS EVENTOS
    buttonModalAlert.click();
}
