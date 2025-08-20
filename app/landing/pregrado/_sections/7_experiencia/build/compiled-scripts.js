// ===== CÓDIGO COMPILADO CON ESBUILD (IIFE) =====
// Compilado el: 19/08/2025, 05:38:41 a. m. (COT)

"use strict";
(() => {
  // app/landing/pregrado/_sections/7_experiencia/script.js
  function initExperienceCarousel() {
    var experienceSwiper = null;
    function getSlidesVisibleInViewport(windowWidth, slideWidth, gap) {
      var containerPadding = windowWidth < 768 ? 30 : 60;
      var availableWidth = windowWidth - containerPadding;
      var slideWithGap = slideWidth + gap;
      var slidesVisible = Math.floor((availableWidth + gap) / slideWithGap);
      return Math.max(1, slidesVisible);
    }
    function getDisplayConfig(windowWidth, totalSlides) {
      var slidesPerView, slideWidth;
      var gap = 25;
      if (windowWidth < 576) {
        slidesPerView = 1;
        slideWidth = 320;
      } else if (windowWidth < 768) {
        slidesPerView = 2;
        slideWidth = 280;
      } else if (windowWidth < 1024) {
        slidesPerView = 3;
        slideWidth = 300;
      } else {
        slidesPerView = 4;
        slideWidth = 320;
      }
      return {
        slidesPerView,
        useGrid: totalSlides <= slidesPerView,
        slideWidth,
        gap
      };
    }
    function activateGridMode() {
      var slidesContainer = document.querySelector(".experience-carousel__slides");
      var paginationEl = document.querySelector(".experience-carousel__pagination");
      var prevButton = document.querySelector(".experience-carousel__prev");
      var nextButton = document.querySelector(".experience-carousel__next");
      if (slidesContainer) {
        slidesContainer.classList.add("use-grid");
        slidesContainer.classList.remove("swiper-wrapper");
      }
      if (paginationEl) paginationEl.style.display = "none";
      if (prevButton) prevButton.style.display = "none";
      if (nextButton) nextButton.style.display = "none";
      setTimeout(function() {
        loadVideos();
      }, 100);
    }
    function activateSwiperMode() {
      var slidesContainer = document.querySelector(".experience-carousel__slides");
      var paginationEl = document.querySelector(".experience-carousel__pagination");
      var prevButton = document.querySelector(".experience-carousel__prev");
      var nextButton = document.querySelector(".experience-carousel__next");
      if (slidesContainer) {
        slidesContainer.classList.remove("use-grid");
        slidesContainer.classList.add("swiper-wrapper");
      }
      if (paginationEl) paginationEl.style.display = "flex";
      if (prevButton) prevButton.style.display = "flex";
      if (nextButton) nextButton.style.display = "flex";
      initializeSwiper();
    }
    function initializeSwiper() {
      if (experienceSwiper) {
        experienceSwiper.destroy(true, true);
        experienceSwiper = null;
      }
      var element = document.querySelector(".experience-carousel__wrapper.experience-swiper");
      if (!element) {
        var fallbackElement = document.querySelector(".experience-swiper");
        if (!fallbackElement) {
          console.error("Ning\xFAn elemento swiper encontrado");
          return;
        }
      }
      if (!window.Swiper) {
        console.error("Swiper no est\xE1 disponible");
        return;
      }
      var swiperSelector = element ? ".experience-carousel__wrapper.experience-swiper" : ".experience-swiper";
      try {
        experienceSwiper = new window.Swiper(swiperSelector, {
          loop: false,
          spaceBetween: 25,
          watchOverflow: true,
          centeredSlides: false,
          grabCursor: true,
          allowTouchMove: true,
          slidesPerView: 1,
          pagination: {
            el: ".experience-carousel__pagination",
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 1,
            renderBullet: function(index, className) {
              return '<span class="' + className + '" aria-label="Ir a slide ' + (index + 1) + '"></span>';
            }
          },
          navigation: {
            nextEl: ".experience-carousel__next",
            prevEl: ".experience-carousel__prev"
          },
          breakpoints: {
            576: {
              slidesPerView: "auto",
              spaceBetween: 25
            },
            768: {
              slidesPerView: "auto",
              spaceBetween: 25
            },
            1024: {
              slidesPerView: "auto",
              spaceBetween: 25
            }
          },
          on: {
            init: function(swiper) {
              setTimeout(function() {
                loadVideos();
              }, 100);
            },
            slideChange: function(swiper) {
              pauseAllVideos();
            }
          }
        });
      } catch (error) {
        console.error("[EXPERIENCE] Error inicializando Swiper:", error);
      }
    }
    function loadVideos() {
      var videoContainers = document.querySelectorAll(".experience-carousel__video-container[data-video-id]");
      for (var i = 0; i < videoContainers.length; i++) {
        var container = videoContainers[i];
        var videoId = container.getAttribute("data-video-id");
        var orientation = container.getAttribute("data-video-orientation") || "vertical";
        if (!videoId) continue;
        var iframe = document.createElement("iframe");
        var params = new URLSearchParams({
          autoplay: "0",
          mute: "1",
          loop: "0",
          controls: "1",
          modestbranding: "1",
          playsinline: "1",
          enablejsapi: "1",
          rel: "0"
        });
        iframe.src = "https://www.youtube.com/embed/" + videoId + "?" + params.toString();
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.style.opacity = "0";
        iframe.style.transition = "opacity 0.5s ease";
        iframe.allow = "autoplay; encrypted-media; fullscreen";
        iframe.allowFullscreen = true;
        iframe.loading = "lazy";
        iframe.addEventListener("load", function() {
          this.style.opacity = "1";
          this.classList.add("loaded");
          this.parentNode.classList.add("video-loaded");
        });
        iframe.addEventListener("error", function() {
        });
        container.innerHTML = "";
        container.appendChild(iframe);
        createMuteButton(container, iframe, videoId);
      }
    }
    function createMuteButton(container, iframe, videoId) {
      if (window.innerWidth < 1024) return;
      var muteButton = document.createElement("button");
      muteButton.className = "video-mute-button";
      muteButton.setAttribute("aria-label", "Silenciar/Activar audio del video");
      muteButton.setAttribute("data-video-id", videoId);
      var isMuted = true;
      updateMuteButtonIcon(muteButton, isMuted);
      muteButton.addEventListener("click", function(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
          if (isMuted) {
            iframe.contentWindow.postMessage('{"event":"command","func":"unMute","args":""}', "*");
            isMuted = false;
            muteButton.classList.remove("muted");
          } else {
            iframe.contentWindow.postMessage('{"event":"command","func":"mute","args":""}', "*");
            isMuted = true;
            muteButton.classList.add("muted");
          }
          updateMuteButtonIcon(muteButton, isMuted);
        } catch (error) {
          console.error("[VIDEO] Error controlando audio: " + videoId, error);
        }
      });
      container.appendChild(muteButton);
    }
    function updateMuteButtonIcon(button, isMuted) {
      var iconClass = isMuted ? "ph-speaker-slash" : "ph-speaker-high";
      button.innerHTML = '<i class="ph ' + iconClass + '"></i>';
    }
    function pauseAllVideos() {
      var videos = document.querySelectorAll(".experience-carousel__video-container iframe");
      for (var i = 0; i < videos.length; i++) {
        try {
          videos[i].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
        } catch (e) {
        }
      }
    }
    function handleResize() {
      var muteButtons = document.querySelectorAll(".video-mute-button");
      var isDesktop = window.innerWidth >= 1024;
      for (var i = 0; i < muteButtons.length; i++) {
        muteButtons[i].style.display = isDesktop ? "flex" : "none";
      }
    }
    function initializeCarousel() {
      var slides = document.querySelectorAll(".experience-carousel__slide");
      var totalSlides = slides.length;
      var windowWidth = window.innerWidth;
      var config = getDisplayConfig(windowWidth, totalSlides);
      console.log("[INIT] Ventana: " + windowWidth + "px, Slides: " + totalSlides + ", Visibles: " + config.slidesPerView + ", Usar Grid: " + config.useGrid);
      if (config.useGrid) {
        console.log("[INIT] Activando modo Grid");
        activateGridMode();
      } else {
        console.log("[INIT] Activando modo Swiper");
        activateSwiperMode();
      }
    }
    function handleCarouselResize() {
      var slides = document.querySelectorAll(".experience-carousel__slide");
      var totalSlides = slides.length;
      var windowWidth = window.innerWidth;
      var config = getDisplayConfig(windowWidth, totalSlides);
      var currentlyUsingGrid = document.querySelector(".experience-carousel__slides.use-grid");
      console.log("[RESIZE] Ventana: " + windowWidth + "px, Slides: " + totalSlides + ", Visibles: " + config.slidesPerView + ", Usar Grid: " + config.useGrid);
      if (config.useGrid && !currentlyUsingGrid) {
        console.log("[RESIZE] Cambiando a modo Grid");
        if (experienceSwiper) {
          experienceSwiper.destroy(true, true);
          experienceSwiper = null;
        }
        activateGridMode();
      } else if (!config.useGrid && currentlyUsingGrid) {
        console.log("[RESIZE] Cambiando a modo Swiper");
        activateSwiperMode();
      }
      handleResize();
    }
    function checkAndInit() {
      if (typeof window !== "undefined") {
        initializeCarousel();
        window.addEventListener("resize", handleCarouselResize);
      } else {
        setTimeout(checkAndInit, 300);
      }
    }
    if (typeof document !== "undefined") {
      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", checkAndInit);
      } else {
        checkAndInit();
      }
    }
    checkAndInit();
  }
  var script_default = initExperienceCarousel;
  if (typeof module !== "undefined" && module.exports) {
    module.exports = initExperienceCarousel;
  }
  if (typeof window !== "undefined" && !window.initExperienceCarousel) {
    window.initExperienceCarousel = initExperienceCarousel;
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initExperienceCarousel);
    } else {
      initExperienceCarousel();
    }
  }
})();
