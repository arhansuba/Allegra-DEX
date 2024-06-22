// header.js

// Function to toggle mobile menu visibility
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('active');
}

// Function to close mobile menu when a menu item is clicked
function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('active');
}

// Event listener to close mobile menu on item click
document.addEventListener('DOMContentLoaded', function() {
    const menuItems = document.querySelectorAll('#mobile-menu a');
    menuItems.forEach(item => {
        item.addEventListener('click', closeMobileMenu);
    });
});
