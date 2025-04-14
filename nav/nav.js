// js/nav.js

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
                    // Run the function again to include nested includes
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

// Run the function when the page loads
document.addEventListener('DOMContentLoaded', includeHTML);