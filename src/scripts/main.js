// Header
document.getElementById('menu-toggle').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('header__mobile-menu--open');
  document.dispatchEvent(new CustomEvent('menuToggled', { detail: { open: mobileMenu.classList.contains('header__mobile-menu--open') } }));
});

// seccion dos
new Swiper('.subjects-swiper', {
  loop: true,
  spaceBetween: 30,
  // Pagination bullets
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true
  },
  // Navigation arrows
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
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
    spaceBetween: 0,
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
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
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
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".experience-swiper", {
    loop: true,
    spaceBetween: 20, 
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: ".experience-next",
      prevEl: ".experience-prev",
    },
    breakpoints: {
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    on: {
      init: equalizeHeights, 
      slideChangeTransitionEnd: equalizeHeights, 
    },
  });

  function equalizeHeights() {
    let cards = document.querySelectorAll(
      ".testimonial-card, .experience-carousel__item"
    );
    let maxHeight = 0;
  
    // 1️⃣ Primero, restablecemos la altura para evitar acumulación de valores previos
    cards.forEach((card) => {
      card.style.height = "auto"; 
    });
  
    // 2️⃣ Encontramos la altura máxima
    cards.forEach((card) => {
      let height = card.offsetHeight;
      if (height > maxHeight) {
        maxHeight = height;
      }
    });
  
    // 3️⃣ Aplicamos la altura máxima a todas las tarjetas
    cards.forEach((card) => {
      card.style.height = maxHeight + "px";
    });
  }
  

  window.addEventListener("resize", equalizeHeights);
});

// seccion nueve

document.addEventListener("DOMContentLoaded", function () {
  new Swiper('.projects-swiper', { 
    loop: true,
    spaceBetween: 0,
    navigation: { 
      nextEl: '.projects-next', 
      prevEl: '.projects-prev',
    },
    breakpoints: { 
      0: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});

