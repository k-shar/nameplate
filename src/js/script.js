document.addEventListener("DOMContentLoaded", function() {
    fetch('/src/md/nameplate.md')
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
document.getElementById("underline").addEventListener("click", () => toggleClass("underline"));

document.getElementById("italic").addEventListener("click", () => {
    // see if checkbox is clicked
    const italic = document.getElementById("italic").checked;
    const italic_file = italic ? 'nameplate-italic.md' : 'nameplate.md';
    fetch("/src/md/" + italic_file)
        .then(response => response.text())
        .then(text => {
            const contentDiv = document.getElementById('nameplate');
            contentDiv.innerText = text;
        })
        .catch(error => console.error('Error fetching the markdown file:', error));
});

