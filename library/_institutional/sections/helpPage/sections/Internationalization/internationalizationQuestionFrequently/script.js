function toggleAccordion(element) {
  // Check if we're on mobile
  if (window.innerWidth <= 767) {
    var parent = element.parentElement;
    var isActive = parent.classList.contains('active');
    
    // Close all accordion items
    var items = document.querySelectorAll('.nav-item');
    items.forEach(function(item) {
      item.classList.remove('active');
      item.querySelector('.accordion-content').style.display = 'none';
      item.querySelector('.accordion-icon').textContent = '+';
    });
    
    // If the clicked item wasn't active before, open it
    if (!isActive) {
      parent.classList.add('active');
      parent.querySelector('.accordion-content').style.display = 'block';
      parent.querySelector('.accordion-icon').textContent = '-';
    }
  }
}

// Add event listener to check if screen size changes
window.addEventListener('resize', function() {
  if (window.innerWidth > 767) {
    // If on desktop, show the active content
    var activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
      activeItem.querySelector('.accordion-content').style.display = 'block';
    }
  }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  // If on mobile, ensure only one item is open
  if (window.innerWidth <= 767) {
    var activeItem = document.querySelector('.nav-item.active');
    if (activeItem) {
      activeItem.querySelector('.accordion-content').style.display = 'block';
      activeItem.querySelector('.accordion-icon').textContent = '-';
    }
  }
});