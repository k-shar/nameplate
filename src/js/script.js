document.addEventListener("DOMContentLoaded", function() {

    fetch('./src/md/nameplate.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('nameplate').innerText = text;
        })
        .catch(error => console.error('Error fetching the markdown file:', error));

    fetch('./src/md/flowers.md')
        .then(response => response.text())
        .then(text => {
            document.getElementById('flowers').innerText = text;
        })
        .catch(error => console.error('Error fetching the markdown file:', error));
});