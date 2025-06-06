export default () => {
  const MOBILE_BREAKPOINT = 1024;
  let isInitialized = false;

  function isMobileView() {
    return window.innerWidth < MOBILE_BREAKPOINT;
  }

  function initAccordion() {
    if (isInitialized) return;

    const accordionButtons = document.querySelectorAll("[data-accordion-target]");
    
    if (accordionButtons.length === 0) {
      // DOM not ready yet, try again later
      setTimeout(initAccordion, 100);
      return;
    }

    setupAccordionBehavior();
    attachEventListeners();
    isInitialized = true;
  }

  function setupAccordionBehavior() {
    const accordionButtons = document.querySelectorAll("[data-accordion-target]");
    
    accordionButtons.forEach(button => {
      const targetId = button.getAttribute("data-accordion-target");
      const content = document.querySelector(targetId);
      
      if (!content) return;

      if (isMobileView()) {
        // Mobile: hide content, show buttons
        content.classList.add("hidden");
        button.style.display = "flex";
        resetButtonState(button);
      } else {
        // Desktop: show content, hide buttons
        content.classList.remove("hidden");
        button.style.display = "none";
      }
    });
  }

  function resetButtonState(button) {
    const icon = button.querySelector(".toggle-icon");
    const text = button.querySelector(".toggle-text");
    
    if (text) text.textContent = "Leer Más";
    if (icon) {
      icon.classList.remove("ph-minus");
      icon.classList.add("ph-plus");
    }
    
    button.setAttribute("aria-expanded", "false");
  }

  function toggleAccordion(button) {
    const targetId = button.getAttribute("data-accordion-target");
    const content = document.querySelector(targetId);
    
    if (!content) return;

    const isHidden = content.classList.contains("hidden");
    const icon = button.querySelector(".toggle-icon");
    const text = button.querySelector(".toggle-text");
    
    // Toggle content visibility
    content.classList.toggle("hidden");
    
    // Update button state
    if (isHidden) {
      // Opening
      text.textContent = "Leer Menos";
      icon.classList.remove("ph-plus");
      icon.classList.add("ph-minus");
      button.setAttribute("aria-expanded", "true");
    } else {
      // Closing
      text.textContent = "Leer Más";
      icon.classList.remove("ph-minus");
      icon.classList.add("ph-plus");
      button.setAttribute("aria-expanded", "false");
    }
  }

  function attachEventListeners() {
    // Remove existing listeners by cloning buttons
    const accordionButtons = document.querySelectorAll("[data-accordion-target]");
    
    accordionButtons.forEach(button => {
      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);
    });

    // Add new listeners
    const newButtons = document.querySelectorAll("[data-accordion-target]");
    
    newButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        
        if (!isMobileView()) return;
        
        toggleAccordion(button);
      });
    });
  }

  // Debounced resize handler
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setupAccordionBehavior();
    }, 150);
  }

  function cleanup() {
    window.removeEventListener("resize", handleResize);
    isInitialized = false;
  }

  // Initialize based on document state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccordion);
  } else {
    // DOM is already loaded
    initAccordion();
  }

  // Backup initialization
  window.addEventListener('load', () => {
    if (!isInitialized) {
      setTimeout(initAccordion, 50);
    }
  });

  // Add resize listener
  window.addEventListener("resize", handleResize);

  // Return cleanup function
  return cleanup;
};