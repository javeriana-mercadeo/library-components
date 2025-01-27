// Header
document.getElementById('menu-toggle').addEventListener('click', function () {
  const mobileMenu = document.getElementById('mobile-menu');
  mobileMenu.classList.toggle('header__mobile-menu--open');
  document.dispatchEvent(new CustomEvent('menuToggled', { detail: { open: mobileMenu.classList.contains('header__mobile-menu--open') } }));
});
