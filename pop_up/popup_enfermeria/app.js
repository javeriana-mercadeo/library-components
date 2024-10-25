// --- Lógica principal --- //
$(document).ready(() => {
    // Lógica para la administración del contenido desde Liferay
    const isEditMode = document.querySelectorAll(".has-edit-mode-menu");

    // Mostrar el modal si se está en modo de edición
    if (isEditMode) $("#benefitModal").modal("show");

    // Tener el modal cerrado por defecto
    $("#benefitModal").modal("hide");

    // Cerrar el modal cuando se hace clic en la X
    $("#btn-close").on("click", function () {
        $("#benefitModal").modal("hide");
    });
});

document.addEventListener("dataRendered", () => {
    // Elementos
    const elements = {
        date: null,
        investment: null,
        contactoElement: null,
        modal: null,
    };

    loadElements(elements);

    if (validateElements(elements)) {
        renderModalDiscount(elements);
        $("#benefitModal").modal("show");
    }
});

// Cargar los elementos
function loadElements(elements) {
    elements.date = document.querySelector(".fecha-cierre:first-of-type");
    elements.investment = document.getElementById("inversion");
    elements.contactoElement = document.getElementById("contacto");
    elements.modal = document.getElementById("benefitModal");
}

// Renderizar el descuento en el modal
function renderModalDiscount(elements) {
    const { date, investment } = elements;

    // ELEMENTOS DEL MODAL
    const discountRateModal = document.getElementById("discountRate");
    const dateModals = document.querySelectorAll(".dias");
    const investmentModals = document.querySelectorAll(".inversion");
    const discountModals = document.querySelectorAll(".discount");
    const totalModals = document.querySelectorAll(".inversionDiscount");

    // CALCULAR LOS DÍAS RESTANTES y EL DESCUENTO
    const remainingDays = calculateDaysRemaining(date.textContent);
    const investmentDiscount = calculateDiscount(investment.textContent, discountRateModal.textContent);
    console.log(investment.textContent);

    // RENDERIZAR LOS DATOS EN EL MODAL
    const remainingDaysText = remainingDays > 1 ? `quedan ${remainingDays} días` : `queda ${remainingDays} día`;

    dateModals.forEach((item) => (item.textContent = remainingDaysText));
    // investmentModals.forEach((item) => (item.textContent = investment.textContent));
    // discountModals.forEach((item) => (item.textContent = `$${investmentDiscount.discount.toLocaleString()}*`));
    // totalModals.forEach((item) => (item.textContent = `$${investmentDiscount.total.toLocaleString()}*`));
    investmentModals.forEach((item) => (item.textContent = convertStringToPrice(investment.textContent)));
    discountModals.forEach(
        (item) => (item.textContent = `$${convertStringToPrice(investment.textContent).toLocaleString()}`)
    );
    totalModals.forEach(
        (item) => (item.textContent = `$${convertStringToPrice(investment.textContent).toLocaleString()}`)
    );
}

// Validar si los elementos existen
function validateElements(elements) {
    return Object.keys(elements).every((key) => elements[key] !== null);
}

// Calcular los días restantes
function calculateDaysRemaining(futureDate) {
    futureDate = convertStringToDateISO(futureDate);

    const targetDate = new Date(futureDate);
    const actualDate = new Date();
    const differenceTime = targetDate.getTime() - actualDate.getTime();
    return Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
}

// Convertir una cadena de texto a una fecha ISO
function convertStringToDateISO(str) {
    const words = str.trim().split(" ");
    const months = {
        enero: "01",
        febrero: "02",
        marzo: "03",
        abril: "04",
        mayo: "05",
        junio: "06",
        julio: "07",
        agosto: "08",
        septiembre: "09",
        octubre: "10",
        noviembre: "11",
        diciembre: "12",
    };

    const day = words[0].length === 1 ? `0${words[0]}` : words[0];
    const month = months[words[2].toLowerCase()];
    const year = words[4];

    return `${year}-${month}-${day}T00:00:00`;
}

// Calcular el descuento
function calculateDiscount(investment, discountRate) {
    const investmentNumber = convertStringToPrice(investment);
    const discountRateModal = convertDiscountToNumber(discountRate);
    const discount = investmentNumber * (discountRateModal / 100);
    const total = investmentNumber - discount;

    return { discount, total };
}

// Convertir una cadena de texto a un número
function convertStringToPrice(str) {
    return parseFloat(str.trim().replace(/[\$,\.]+/g, ""));
}

// Convertir un descuento a un número
function convertDiscountToNumber(str) {
    return parseFloat(str.trim().replace("%", ""));
}
