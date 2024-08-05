document.addEventListener("DOMContentLoaded", function() {
    fetch('nameplate.md')
        .then(response => response.text())
        .then(text => {
            const contentDiv = document.getElementById('nameplate');
            contentDiv.innerText = text;
        })
        .catch(error => console.error('Error fetching the markdown file:', error));
});


// Utility function to toggle classes
function toggleClass(className) {
    document.getElementById("nameplate").classList.toggle(className);
}

// Add event listeners for buttons
document.getElementById("bold").addEventListener("click", () => toggleClass("font-bold"));
document.getElementById("italic").addEventListener("click", () => toggleClass("italic"));
document.getElementById("underline").addEventListener("click", () => toggleClass("underline"));
