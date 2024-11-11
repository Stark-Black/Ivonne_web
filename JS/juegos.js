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

// Eventos para arrastrar en dispositivos táctiles
notas.forEach(nota => {
    nota.addEventListener('touchstart', function (e) {
        selectedNota = e.target;
        e.preventDefault();
    });
    
    nota.addEventListener('touchmove', function (e) {
        if (selectedNota) {
            const touch = e.touches[0];
            selectedNota.style.position = "absolute";
            selectedNota.style.left = touch.clientX - selectedNota.offsetWidth / 2 + "px";
            selectedNota.style.top = touch.clientY - selectedNota.offsetHeight / 2 + "px";
            e.preventDefault();
        }
    });
    
    nota.addEventListener('touchend', function (e) {
        if (selectedNota) {
            const touch = e.changedTouches[0];
            const dropzone = document.elementFromPoint(touch.clientX, touch.clientY);
            
            // Verificar si es la zona de drop correcta
            if (dropzone && dropzone.classList.contains('dropzone') && dropzone.id === 'drop-' + selectedNota.id) {
                dropzone.classList.add('correct'); // Cambiar color si es correcto
                
                // Dibujar línea
                const notaRect = selectedNota.getBoundingClientRect();
                const dropRect = dropzone.getBoundingClientRect();
                
                drawLine(notaRect.right, notaRect.top + notaRect.height / 2, dropRect.left, dropRect.top + dropRect.height / 2);
                
                // Reubicar la nota en la zona correcta
                dropzone.appendChild(selectedNota);
                selectedNota.style.position = "static";
            } else {
                // Resetear posición si no cae en el dropzone correcto
                selectedNota.style.position = "static";
            }
            selectedNota = null;
            e.preventDefault();
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
