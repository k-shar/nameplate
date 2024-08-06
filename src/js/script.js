document.addEventListener("DOMContentLoaded", function() {
    fetch('./src/md/nameplate.md')
        .then(response => response.text())
        .then(text => {
            const contentDiv = document.getElementById('nameplate');
            contentDiv.innerText = text;
        })
        .catch(error => console.error('Error fetching the markdown file:', error));
});