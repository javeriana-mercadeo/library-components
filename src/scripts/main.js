// Header
document.getElementById('menu-toggle').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('header__mobile-menu--open');
  document.dispatchEvent(new CustomEvent('menuToggled', { detail: { open: mobileMenu.classList.contains('header__mobile-menu--open') } }));
});

// seccion dos
document.addEventListener("DOMContentLoaded", () => {
  const carouselItems = document.querySelectorAll("[data-carousel-item]");
  let currentIndex = 0;

  function updateCarousel() {
    carouselItems.forEach((item, index) => {
      if (index === currentIndex) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % carouselItems.length;
    updateCarousel();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
  }

  document.getElementById("next-btn").addEventListener("click", nextSlide);
  document.getElementById("prev-btn").addEventListener("click", prevSlide);

  updateCarousel();
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

document.addEventListener("DOMContentLoaded", function () {
  function handleAccordion() {
    const isMobile = window.innerWidth < 768; // Cambio de 1024px a 768px

    document.querySelectorAll("[data-accordion-target]").forEach(button => {
      const content = document.querySelector(button.getAttribute("data-accordion-target"));

      if (isMobile) {
        content.classList.add("hidden"); 
        button.classList.remove("hidden"); 
      } else {
        content.classList.remove("hidden");
        button.classList.add("hidden"); // Oculta el botón en desktop
      }
    });
  }

  function toggleContent() {
    document.querySelectorAll("[data-accordion-target]").forEach(button => {
      button.addEventListener("click", () => {
        const content = document.querySelector(button.getAttribute("data-accordion-target"));
        content.classList.toggle("hidden"); // Muestra/oculta el contenido

        // Cambiar texto e icono dinámicamente
        const icon = button.querySelector("i");
        const text = button.querySelector("span");

        if (content.classList.contains("hidden")) {
          text.textContent = "Leer Más";
          icon.classList.replace("ph-minus", "ph-plus");
        } else {
          text.textContent = "Leer Menos";
          icon.classList.replace("ph-plus", "ph-minus");
        }
      });
    });
  }

  // Ejecutar cuando la página cargue
  handleAccordion();
  toggleContent();

  // Ejecutar cuando se redimensiona la pantalla
  window.addEventListener("resize", handleAccordion);
});

//Seccion cinco


document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".academic-carousel__track");
  const prevBtn = document.querySelector(".academic-carousel__btn--prev");
  const nextBtn = document.querySelector(".academic-carousel__btn--next");
  const items = document.querySelectorAll(".academic-carousel__item");
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

//seccion seis

document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".expert-carousel__track");
  const prevBtn = document.querySelector(".expert-carousel__btn--prev");
  const nextBtn = document.querySelector(".expert-carousel__btn--next");
  const items = document.querySelectorAll(".expert-carousel__item");
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

  
  window.addEventListener("resize", () => {
      track.style.transition = "none"; 
      index = 0; 
      updateCarousel();
      setTimeout(() => {
          track.style.transition = "transform 0.3s ease-in-out"; 
      }, 100);
  });
});
    // Seccion nueve
    document.addEventListener("DOMContentLoaded", function () {
      const track = document.querySelector(".projects-carousel__track");
      const prevBtn = document.querySelector(".projects-carousel__btn--prev");
      const nextBtn = document.querySelector(".projects-carousel__btn--next");
      const items = document.querySelectorAll(".projects-carousel__item");
  
      let currentIndex = 0;
      let totalItems = items.length;
    
      function updateCarousel() {
          const width = items[0].offsetWidth; // Ancho del item
          track.style.transform = `translateX(-${currentIndex * width}px)`;
      }
  
      nextBtn.addEventListener("click", () => {
          if (currentIndex < totalItems - 1) { // Detiene el deslizamiento en el último item
              currentIndex++;
              updateCarousel();
          }
      });
  
      prevBtn.addEventListener("click", () => {
          if (currentIndex > 0) {
              currentIndex--;
              updateCarousel();
          }
      });
  
      window.addEventListener("resize", updateCarousel);
  });
  