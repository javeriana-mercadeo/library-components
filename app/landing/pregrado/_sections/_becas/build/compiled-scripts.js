// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 29/08/2025, 05:50:44 a. m. (COT)

"use strict";
(() => {
  // app/landing/pregrado/_sections/_becas/script.js
  var initScholarshipsTabs = () => {
    const tryInitialize = (attempts = 0) => {
      const tabsContainers = document.querySelectorAll(".scholarships__tabs-container");
      if (tabsContainers.length === 0 && attempts < 20) {
        setTimeout(() => tryInitialize(attempts + 1), 100);
        return;
      }
      tabsContainers.forEach((container) => {
        const tabButtons = container.querySelectorAll(".scholarships__tab-button");
        const tabPanels = container.querySelectorAll(".scholarships__tab-panel");
        if (tabButtons.length > 0 && tabPanels.length > 0) {
          activateTab(tabButtons[0], tabPanels[0]);
          tabButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
              activateTab(tabButtons[index], tabPanels[index]);
              updateTabStates(tabButtons, tabPanels, index);
            });
            button.addEventListener("keydown", (e) => {
              handleTabKeydown(e, tabButtons, tabPanels, index);
            });
          });
        }
      });
    };
    tryInitialize();
  };
  var activateTab = (activeButton, activePanel) => {
    if (!activeButton || !activePanel) return;
    const container = activeButton.closest(".scholarships__tabs-container");
    if (!container) return;
    const allButtons = container.querySelectorAll(".scholarships__tab-button");
    const allPanels = container.querySelectorAll(".scholarships__tab-panel");
    allButtons.forEach((button) => {
      const isActive = button === activeButton;
      button.setAttribute("aria-selected", isActive.toString());
      button.setAttribute("tabindex", isActive ? "0" : "-1");
      if (isActive) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
    allPanels.forEach((panel) => {
      panel.classList.add("hidden");
      panel.setAttribute("aria-hidden", "true");
    });
    if (activePanel) {
      setTimeout(() => {
        activePanel.classList.remove("hidden");
        activePanel.setAttribute("aria-hidden", "false");
        activePanel.offsetHeight;
      }, 50);
    }
  };
  var updateTabStates = (buttons, panels, activeIndex) => {
    buttons.forEach((button, index) => {
      if (index === activeIndex) {
        button.setAttribute("aria-selected", "true");
        button.setAttribute("tabindex", "0");
        button.classList.add("active");
        panels[index]?.classList.remove("hidden");
        panels[index]?.setAttribute("aria-hidden", "false");
      } else {
        button.setAttribute("aria-selected", "false");
        button.setAttribute("tabindex", "-1");
        button.classList.remove("active");
        panels[index]?.classList.add("hidden");
        panels[index]?.setAttribute("aria-hidden", "true");
      }
    });
  };
  var handleTabKeydown = (event, buttons, panels, currentIndex) => {
    let newIndex = currentIndex;
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        break;
      case "ArrowRight":
        event.preventDefault();
        newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        break;
      case "Home":
        event.preventDefault();
        newIndex = 0;
        break;
      case "End":
        event.preventDefault();
        newIndex = buttons.length - 1;
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        activateTab(buttons[currentIndex], panels[currentIndex]);
        return;
      default:
        return;
    }
    buttons[newIndex].focus();
    activateTab(buttons[newIndex], panels[newIndex]);
    updateTabStates(buttons, panels, newIndex);
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScholarshipsTabs);
  } else {
    initScholarshipsTabs();
  }
  if (typeof MutationObserver !== "undefined") {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          const addedNodes = Array.from(mutation.addedNodes);
          addedNodes.forEach((node) => {
            if (node.nodeType === 1 && // Element node
            (node.classList?.contains("scholarships_container") || node.querySelector?.(".scholarships__tabs-container"))) {
              initScholarshipsTabs();
            }
          });
        }
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }
  var script_default = initScholarshipsTabs;
})();
