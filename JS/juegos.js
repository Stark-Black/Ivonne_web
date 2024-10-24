window.onload = function() {
    // Barajar las notas y los dropzones al cargar la página
    shuffleElements('.notas', '.nota');
    shuffleElements('.dropzones', '.dropzone');
};

function shuffleElements(containerSelector, elementSelector) {
    const container = document.querySelector(containerSelector);
    const elements = Array.from(document.querySelectorAll(elementSelector));
    const shuffledElements = elements.sort(() => Math.random() - 0.5); // Barajar los elementos

    // Eliminar todos los elementos y agregarlos en el nuevo orden
    shuffledElements.forEach(element => container.appendChild(element));
}

const notas = document.querySelectorAll('.nota');
const dropzones = document.querySelectorAll('.dropzone');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Ajustar el tamaño del canvas al tamaño del contenedor del juego
const gameContainer = document.querySelector('.game-container');
canvas.width = gameContainer.clientWidth;
canvas.height = gameContainer.clientHeight;

// Permitir que las imágenes de notas sean arrastrables
notas.forEach(nota => {
    nota.addEventListener('dragstart', function (e) {
        e.dataTransfer.setData('text', e.target.id);
    });
});

// Configurar las áreas de drop para permitir el arrastre y la validación
dropzones.forEach(zone => {
    zone.addEventListener('dragover', function (e) {
        e.preventDefault(); // Permitir el drop
    });

    zone.addEventListener('drop', function (e) {
        e.preventDefault();
        const notaId = e.dataTransfer.getData('text');
        const draggedNota = document.getElementById(notaId);

        if (zone.id === 'drop-' + notaId) {
            zone.classList.add('correct'); // Cambiar color si es correcto

            // Dibujar línea
            const notaRect = draggedNota.getBoundingClientRect();
            const dropRect = zone.getBoundingClientRect();

            drawLine(notaRect.right, notaRect.top + notaRect.height / 2, dropRect.left, dropRect.top + dropRect.height / 2);
        }
    });
});

// Función para dibujar líneas
function drawLine(x1, y1, x2, y2) {
    const gameRect = gameContainer.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(x1 - gameRect.left, y1 - gameRect.top); // ajustar las coordenadas al contenedor
    ctx.lineTo(x2 - gameRect.left, y2 - gameRect.top); // ajustar las coordenadas al contenedor
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}

// Función para limpiar las líneas
function clearLines() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
