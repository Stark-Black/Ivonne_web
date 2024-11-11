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

// Variables para el arrastre
let selectedNota = null;
let ghostNota = null; // Elemento visual para la "sombra"

// Eventos para arrastrar en dispositivos táctiles
notas.forEach(nota => {
    // Evento de selección (sin mover la nota)
    nota.addEventListener('mousedown', function(e) {
        startDragging(e.target, e.clientX, e.clientY);
        e.preventDefault();
    });

    nota.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        startDragging(e.target, touch.clientX, touch.clientY);
        e.preventDefault();
    });
});

// Función para crear la sombra visual
function startDragging(nota, x, y) {
    selectedNota = nota;

    // Crear una sombra visual
    ghostNota = nota.cloneNode(true);
    ghostNota.style.position = "absolute";
    ghostNota.style.opacity = "0.5"; // Hacerla semitransparente
    ghostNota.style.pointerEvents = "none"; // Evitar interferencia con el ratón
    ghostNota.style.left = x - ghostNota.offsetWidth / 2 + "px";
    ghostNota.style.top = y - ghostNota.offsetHeight / 2 + "px";
    document.body.appendChild(ghostNota);

    // Mover la sombra con el mouse o toque
    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag);

    // Soltar la sombra
    document.addEventListener('mouseup', endDragging);
    document.addEventListener('touchend', endDragging);
}

function onDrag(e) {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    if (ghostNota) {
        ghostNota.style.left = x - ghostNota.offsetWidth / 2 + "px";
        ghostNota.style.top = y - ghostNota.offsetHeight / 2 + "px";
    }
}

function endDragging(e) {
    if (!selectedNota || !ghostNota) return;

    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const y = e.changedTouches ? e.changedTouches[0].clientY : e.clientY;

    const dropzone = document.elementFromPoint(x, y);
    if (dropzone && dropzone.classList.contains('dropzone') && dropzone.id === 'drop-' + selectedNota.id) {
        dropzone.classList.add('correct'); // Cambiar color si es correcto

        // Dibujar línea
        const notaRect = selectedNota.getBoundingClientRect();
        const dropRect = dropzone.getBoundingClientRect();
        drawLine(notaRect.right, notaRect.top + notaRect.height / 2, dropRect.left, dropRect.top + dropRect.height / 2);

        // Hacer desaparecer la nota
        selectedNota.style.transition = "opacity 0.5s";
        selectedNota.style.opacity = "0";
        setTimeout(() => {
            selectedNota.remove(); // Remover la nota después de que desaparezca
        }, 500);
    }

    // Limpiar
    ghostNota.remove();
    ghostNota = null;
    selectedNota = null;

    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', endDragging);
    document.removeEventListener('touchend', endDragging);
}

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
