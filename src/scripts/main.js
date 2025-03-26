// Header
document.addEventListener("DOMContentLoaded", function () {
  const ctaContainer = document.getElementById("cta-container");
  const ctaButtons = document.querySelector(".header__cta");
  const header = document.querySelector(".header-color");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  function adjustCTAButtons() {
    if (window.innerWidth <= 768) {
      // Si los botones no están en el contenedor fijo, los movemos
      if (ctaContainer && ctaButtons && ctaButtons.children.length > 0) {
        ctaContainer.appendChild(ctaButtons); // Mueve los botones en lugar de usar innerHTML
      }
    } else {
      // En desktop, devolvemos los botones al header si es necesario
      if (ctaButtons && ctaContainer && ctaContainer.children.length > 0) {
        ctaButtons.appendChild(ctaContainer.firstChild);
      }
    }
  }

  adjustCTAButtons();
  window.addEventListener("resize", adjustCTAButtons);

  // Mostrar/Ocultar menú móvil
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("header__mobile-menu--open");
    });
  }
});

// seccion dos
new Swiper('.subjects-swiper', {
  loop: true,
  spaceBetween: 30,
  // Pagination bullets
  pagination: {
      el: '.subjects-pagination',
      clickable: true,
      dynamicBullets: true
  },
  // Navigation arrows
  navigation: {
      nextEl: '.subjects-next',
      prevEl: '.subjects-prev',
  },
  // Responsive breakpoints
  breakpoints: {
      0: {
          slidesPerView: 1
      },
      768: {
          slidesPerView: 2
      },
      1024: {
          slidesPerView: 3
      }
  }
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
      buttons.forEach((btn) => btn.classList.remove("active"));

      if (targetContent.classList.contains("hidden")) {
        targetContent.classList.remove("hidden");
        this.classList.add("active");
      }
    });
  });
});

//seccion cuatro

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

  handleAccordion();
  toggleContent();


  window.addEventListener("resize", handleAccordion);
});

//seccion seis

document.addEventListener("DOMContentLoaded", function () {

  const swiper = new Swiper(".expert-swiper", {
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".expert-next",
      prevEl: ".expert-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      550: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 4 },
      1200: { slidesPerView: 4 },
    },
    on: {
      init: equalizeHeights, // 🔹 Ajusta las alturas al cargar
      slideChangeTransitionEnd: equalizeHeights, // 🔹 Ajusta cuando cambia el slide
    },
  });

  function equalizeHeights() {
    let cards = document.querySelectorAll(".teacher-card-container");
    let maxHeight = 0;

    // Restablecer la altura para evitar acumulación de valores previos
    cards.forEach((card) => {
      card.style.height = "auto"; 
      let height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });

    // Aplicar la altura máxima a todas las tarjetas
    cards.forEach((card) => {
      card.style.height = maxHeight + "px";
    });
  }

  // Vuelve a ejecutar si la ventana cambia de tamaño (para responsive)
  window.addEventListener("resize", equalizeHeights);
});



// seccion siete
new Swiper('.experience-swiper', {
  loop: true,
  spaceBetween: 2,
  // Pagination bullets
  pagination: {
      el: '.experience-pagination',
      clickable: true,
      dynamicBullets: true
  },
  // Navigation arrows
  navigation: {
      nextEl: '.experience-next',
      prevEl: '.experience-prev',
  },
  // Responsive breakpoints
  breakpoints: {
      0: {
          slidesPerView: 1
      },
      768: {
          slidesPerView: 2
      },
      1024: {
          slidesPerView: 3
      },
      1280: { slidesPerView: 4 }
  }
});

// seccion nueve

document.addEventListener("DOMContentLoaded", function () {
  new Swiper('.projects-swiper', { 
      slidesPerView: 'auto',  
      autoWidth: true, 
      loop: true,
      spaceBetween: 0,
      navigation: { 
      nextEl: '.projects-next', 
      prevEl: '.projects-prev',
    },
    breakpoints: { 
      0: { slidesPerView: "auto" },
      1200:{ slidesPerView: 3 }
    }
  });
});

// Seccion diez
document.addEventListener("DOMContentLoaded", function () {
  new Swiper('.related-programs-swiper', {
    loop: true,
    spaceBetween: 10,
    pagination: {
      el: '.related-programs-pagination',
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: '.related-programs-next',
      prevEl: '.related-programs-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
});