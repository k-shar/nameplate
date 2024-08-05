const formats = [
    { id: 'bold', text: 'B', className: 'bold', fn: bold },
    { id: 'italic', text: 'I', className: 'italic', fn: italic },
    { id: 'underline', text: 'U', className: 'underline', fn: underline },
];

const container = document.getElementById('formatting-buttons');

formats.forEach(format => {
    const label = document.createElement('label');
    label.setAttribute('for', format.id);
    label.className = 'flex items-center justify-center mr-4 w-12 h-12 bg-gray-800 text-white rounded cursor-pointer';

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.id = format.id;
    input.className = 'hidden';

    const span = document.createElement('span');
    span.className = `text-lg ${format.className}`;
    span.textContent = format.text;

    label.appendChild(input);
    label.appendChild(span);
    container.appendChild(label);

    // Add event listener
    input.addEventListener('change', format.fn);  // Use 'change' event to handle checkbox changes
});

function bold() {
    document.getElementById("nameplate").classList.toggle("font-bold");
}

function underline() {
    document.getElementById("nameplate").classList.toggle("underline");
}

function italic() {
    const italic = document.getElementById("italic").checked;
    const italic_file = italic ? 'nameplate-italic.md' : 'nameplate.md';
    fetch("/src/md/" + italic_file)
        .then(response => response.text())
        .then(text => {
            const contentDiv = document.getElementById('nameplate');
            contentDiv.innerText = text;
        })
        .catch(error => console.error('Error fetching the markdown file:', error));
}
