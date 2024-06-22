// footer.js

// Function to update the current year dynamically
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = currentYear;
    }
}

// Event listener to update year on DOM load
document.addEventListener('DOMContentLoaded', function() {
    updateYear();
});
