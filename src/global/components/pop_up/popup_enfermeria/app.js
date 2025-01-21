// --- Lógica principal --- //
$(document).ready(() => {
    // Inicializa el modal como cerrado
    $("#benefitModal").modal("hide");

    // Cerrar el modal cuando se hace clic en la X
    $("#btn-close").on("click", () => {
        $("#benefitModal").modal("hide");
    });

    const editMode = $(".has-edit-mode-menu");

    if (editMode.length > 0) {
        $("#benefitModal").addClass("show");
    }
});

$(document).on("dataRendered", () => {
    // Elementos
    const elements = {
        date: $(".fecha-cierre:first-of-type"),
        investment: $("#inversion"),
        contactoElement: $("#contacto"),
        modal: $("#benefitModal"),
    };

    if (validateElements(elements)) {
        renderModalDiscount(elements);
        $("#benefitModal").modal("show");
    }
});

// Validar si los elementos existen
function validateElements(elements) {
    return Object.values(elements).every((element) => element.length > 0);
}

// Renderizar el descuento en el modal
function renderModalDiscount(elements) {
    const { date, investment } = elements;

    // ELEMENTOS DEL MODAL
    const discountRateModal = $("#discountRate");
    const dateModals = $(".dias");
    const investmentModals = $(".inversion");
    const discountModals = $(".discount");
    const totalModals = $(".inversionDiscount");

    // CALCULAR LOS DÍAS RESTANTES y EL DESCUENTO
    const remainingDays = calculateDaysRemaining(date.eq(0).text());
    const investmentDiscount = calculateDiscount(investment.text(), discountRateModal.text());

    // RENDERIZAR LOS DATOS EN EL MODAL
    const remainingDaysText = remainingDays > 1 ? `quedan ${remainingDays} días` : `queda ${remainingDays} día`;

    dateModals.text(remainingDaysText);
    investmentModals.text(`$${convertStringToPrice(investment.text()).toLocaleString()}`);
    discountModals.text(`$${investmentDiscount.discount.toLocaleString()}*`);
    totalModals.text(`$${investmentDiscount.total.toLocaleString()}*`);
}

// Calcular los días restantes
function calculateDaysRemaining(futureDate) {
    futureDate = convertStringToDateISO(futureDate);

    const targetDate = new Date(futureDate);
    const actualDate = new Date();
    const differenceTime = targetDate - actualDate;
    return Math.ceil(differenceTime / (1000 * 60 * 60 * 24));
}

// Convertir una cadena de texto a una fecha ISO válida
function convertStringToDateISO(str) {
    // Asegurar que la fecha esté en minúsculas y sin puntos.
    str = str.toLowerCase().replace(/\./g, "").trim();

    const regex =
        /^(\d{1,2}) de (enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre) de (\d{4})$/;
    const match = str.match(regex);

    if (!match) {
        console.error("Formato de fecha incorrecto:", str);
        return null;
    }

    const day = match[1].padStart(2, "0"); // Asegura dos dígitos
    const month = {
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
    }[match[2]];
    const year = match[3];

    return `${year}-${month}-${day}T00:00:00`;
}

// Calcular el descuento
function calculateDiscount(investment, discountRate) {
    const investmentNumber = convertStringToPrice(investment);
    const discountRateNumber = convertDiscountToNumber(discountRate);
    const discount = investmentNumber * (discountRateNumber / 100);
    const total = investmentNumber - discount;

    return { discount, total };
}

// Convertir una cadena de texto a un número
function convertStringToPrice(str) {
    return parseFloat(str.replace(/[\$,\.]+/g, ""));
}

// Convertir un descuento a un número
function convertDiscountToNumber(str) {
    return parseFloat(str.replace("%", ""));
}
