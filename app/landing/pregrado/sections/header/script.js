document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle')
  const mobileMenu = document.getElementById('mobile-menu')

  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active')
  })

  // Cerrar menú al hacer clic en un enlace
  document.querySelectorAll('.header__mobile-menu-list-link, .header__mobile-menu-cta-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active')
    })
  })
})
