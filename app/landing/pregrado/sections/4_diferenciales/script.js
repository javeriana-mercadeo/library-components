export default () => {
  // Función principal del acordeón
  function initAccordion() {
    function handleAccordion() {
      const isMobile = window.innerWidth < 1024; // lg breakpoint
      
      document.querySelectorAll("[data-accordion-target]").forEach(button => {
        const targetId = button.getAttribute("data-accordion-target");
        const content = document.querySelector(targetId);
        
        if (!content) return; // Salir si no encuentra el contenido
        
        if (isMobile) {
          // En móviles: mostrar botones, ocultar contenido inicialmente
          content.classList.add("hidden");
          button.classList.remove("hidden");
          button.style.display = "flex";
          
          // Resetear estado del botón
          const icon = button.querySelector("i");
          const text = button.querySelector("span");
          if (icon && text) {
            text.textContent = "Leer Más";
            icon.classList.remove("ph-minus");
            icon.classList.add("ph-plus");
          }
        } else {
          // En desktop: ocultar botones, mostrar contenido
          content.classList.remove("hidden");
          button.style.display = "none";
        }
      });
    }

    function addClickListeners() {
      // Remover listeners existentes
      document.querySelectorAll("[data-accordion-target]").forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
      });
      
      // Agregar nuevos listeners
      document.querySelectorAll("[data-accordion-target]").forEach(button => {
        button.addEventListener("click", (e) => {
          e.preventDefault();
          
          const isMobile = window.innerWidth < 1024;
          if (!isMobile) return;
          
          const targetId = button.getAttribute("data-accordion-target");
          const content = document.querySelector(targetId);
          
          if (!content) return;
          
          // Toggle del contenido
          content.classList.toggle("hidden");
          
          // Cambiar texto e icono
          const icon = button.querySelector("i");
          const text = button.querySelector("span");
          
          if (content.classList.contains("hidden")) {
            text.textContent = "Leer Más";
            icon.classList.remove("ph-minus");
            icon.classList.add("ph-plus");
          } else {
            text.textContent = "Leer Menos";
            icon.classList.remove("ph-plus");
            icon.classList.add("ph-minus");
          }
        });
      });
    }

    // Función que ejecuta todo
    function setupAccordion() {
      handleAccordion();
      addClickListeners();
    }

    // Debounce para resize
    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setupAccordion, 100);
    }

    // Ejecutar setup inicial
    setupAccordion();
    
    // Listener para resize
    window.addEventListener("resize", handleResize);
    
    // Cleanup function (opcional, para remover listeners si es necesario)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }

  // Múltiples formas de asegurar que el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    // DOM ya está cargado
    initAccordion();
  }
  
  // Backup: también ejecutar en window.load por si acaso
  window.addEventListener('load', () => {
    setTimeout(initAccordion, 100);
  });
}