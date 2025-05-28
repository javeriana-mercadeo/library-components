//seccion tres

document.addEventListener("DOMContentLoaded", function () {
  console.log("JS cargado correctamente");

  const buttons = document.querySelectorAll(".program-profile__accordion-button");
  const contents = document.querySelectorAll(".program-profile__content-item");

  if (buttons.length === 0 || contents.length === 0) {
    console.warn("No se encontraron botones o contenido del acordeón.");
    return;
  }

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const contentId = this.getAttribute("data-content");
      const targetContent = document.getElementById(contentId);

      if (!targetContent) {
        console.error(`No se encontró el contenido con ID: ${contentId}`);
        return;
      }

      contents.forEach((content) => content.classList.add("hidden"));
      buttons.forEach((btn) => btn.classList.remove("active"));

      if (targetContent.classList.contains("hidden")) {
        targetContent.classList.remove("hidden");
        this.classList.add("active");
      }
    });
  });
});