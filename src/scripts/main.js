// Header
document.getElementById('menu-toggle').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('header__mobile-menu--open');
  document.dispatchEvent(new CustomEvent('menuToggled', { detail: { open: mobileMenu.classList.contains('header__mobile-menu--open') } }));
});

// Sección dos
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".subjects-carousel__track");
  const prevBtn = document.querySelector(".subjects-carousel__btn--prev");
  const nextBtn = document.querySelector(".subjects-carousel__btn--next");
  const items = document.querySelectorAll(".subjects-carousel__item");
  const itemWidth = items[0].offsetWidth + 16;
  let index = 0;

  function updateCarousel() {
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  nextBtn.addEventListener("click", () => {
    if (index < items.length - 1) {
      index++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });
});

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

      if (targetContent.classList.contains("hidden")) {
        targetContent.classList.remove("hidden");
      }
    });
  });
});

// Seccion cuatro

document.addEventListener("DOMContentLoaded", function () {
  function handleToggleButtons() {
    const isMobile = window.innerWidth <= 768;

    document.querySelectorAll('.why-javeriana__item').forEach(item => {
      const text = item.querySelector('.why-javeriana__text');
      let toggle = item.querySelector('.why-javeriana__toggle');

      if (isMobile) {
        // Si es mobile, asegurarse de que el texto esté truncado por defecto
        text.classList.remove("expanded");

        if (!toggle) {
          toggle = document.createElement('button');
          toggle.textContent = 'Leer Más ';
          toggle.classList.add('why-javeriana__toggle');

          toggle.addEventListener('click', () => {
            text.classList.toggle('expanded');
            toggle.classList.toggle('expanded');
            toggle.textContent = text.classList.contains('expanded') ? 'Leer Menos ' : 'Leer Más ';
          });

          item.appendChild(toggle);
        }
      } else {
        // En desktop, asegurarse de que el texto esté completamente visible y eliminar el botón
        text.classList.add("expanded");
        if (toggle) {
          toggle.remove();
        }
      }
    });
  }

  // Ejecutar cuando la página cargue
  handleToggleButtons();

  // Ejecutar cuando se redimensiona la pantalla (para cambios responsive)
  window.addEventListener('resize', handleToggleButtons);
});
