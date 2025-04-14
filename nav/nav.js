// js/nav.js

// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // First include the HTML components
    includeHTML();
    
    // We'll initialize nav controls later, after components are loaded
});

// Create a function to include HTML files
function includeHTML() {
    const includes = document.getElementsByTagName('include');
    
    for (let i = 0; i < includes.length; i++) {
        const element = includes[i];
        const file = element.getAttribute('src');
        
        if (file) {
            // Create an XMLHttpRequest object
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.innerHTML = this.responseText;
                    }
                    
                    if (this.status == 404) {
                        element.innerHTML = "Page not found.";
                    }
                    
                    // Remove the include attribute
                    element.removeAttribute('src');
                    
                    // After including HTML, initialize nav controls
                    initNavControls();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

// Function to initialize navigation controls
function initNavControls() {
    // Hamburger menu toggle for mobile
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburgerIcon && navLinks) {
        hamburgerIcon.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // For mobile dropdown toggle
    const dropdownLink = document.querySelector('.dropdown-link');
    const dropdownContent = document.querySelector('.dropdown-content');
    
    if (dropdownLink && dropdownContent) {
        // Handle clicking on the "About" link to toggle the dropdown in mobile
        dropdownLink.addEventListener('click', function(event) {
            // Prevent the default link behavior (no page reload)
            event.preventDefault();
            // Toggle dropdown content visibility
            dropdownContent.classList.toggle('active');
        });
        
        // Close dropdown if clicking outside of the dropdown menu
        document.addEventListener('click', function(e) {
            // Close dropdown if the click happens outside of the "About" link or dropdown
            if (!dropdownLink.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('active');
            }
        });
    }
}