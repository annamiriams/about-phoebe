// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // First include the HTML components
    includeHTML();
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
            xhttp.onreadystatechange = function () {
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

    // If no includes are found, still initialize navigation
    initNavControls();
}

function initNavControls() {
    // Hamburger menu toggle for mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
    }

    // For mobile dropdown toggle
    const dropdownLink = document.querySelector('.dropdown-link');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Only add the event listener if both elements exist
    if (dropdownLink && dropdownContent) {
        dropdownLink.addEventListener('click', function (event) {
            console.log('Dropdown clicked!');
            if (window.innerWidth <= 768) {
                event.preventDefault();
                dropdownContent.classList.toggle('active');
            }
        });
    }

}
