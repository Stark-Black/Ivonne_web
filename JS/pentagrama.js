'use strict';

function redireccionar() {
    window.location.href = "notas-flauta.html";
}

// Mapeo de posiciones en el pentagrama a notas musicales en clave de Sol
const posicionesNotas = [
    { top: 110, nombre: 'Do' },
    { top: 100, nombre: 'Re' },
    { top: 90, nombre: 'Mi' },
    { top: 80, nombre: 'Fa' },
    { top: 70, nombre: 'Sol' },
    { top: 60, nombre: 'La' },
    { top: 50, nombre: 'Si' }
];

const sonidosNotas = {
    'Do': 'Sounds/DO.mp3',
    'Re': 'Sounds/RE.mp3',
    'Mi': 'Sounds/MI.mp3',
    'Fa': 'Sounds/FA.mp3',
    'Sol': 'Sounds/SOL.mp3',
    'La': 'Sounds/LA.mp3',
    'Si': 'Sounds/SI.mp3'
};

const pentagrama = document.getElementById('pentagrama');  // Contenedor del pentagrama

// Función para hacer que las notas sean arrastrables tanto con mouse como con touch
document.querySelectorAll('.nota').forEach(nota => {
    function startDrag(e) {
        const pentagramaRect = pentagrama.getBoundingClientRect();
        const initialX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
        const initialY = (e.type === 'touchstart') ? e.touches[0].clientY : e.clientY;
        let offsetX = initialX - nota.getBoundingClientRect().left;
        let offsetY = initialY - nota.getBoundingClientRect().top;

        function drag(e) {
            const clientX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
            const clientY = (e.type === 'touchmove') ? e.touches[0].clientY : e.clientY;
            let newLeft = clientX - pentagramaRect.left - offsetX;
            let newTop = clientY - pentagramaRect.top - offsetY;

            // Restringe el movimiento dentro del pentagrama
            if (newLeft >= 0 && newLeft <= pentagrama.offsetWidth - nota.offsetWidth) {
                nota.style.left = `${newLeft}px`;
            }
            if (newTop >= 0 && newTop <= pentagrama.offsetHeight - nota.offsetHeight) {
                nota.style.top = `${newTop}px`;
            }
        }

        function endDrag() {
            verificarPosicionNota(nota);  // Verificar posición de la nota
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', endDrag);
            document.removeEventListener('touchmove', drag);
            document.removeEventListener('touchend', endDrag);
        }

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
    }

    nota.addEventListener('mousedown', startDrag);
    nota.addEventListener('touchstart', startDrag);
});

// Verifica la posición de la nota y muestra el nombre correcto
function verificarPosicionNota(nota) {
    const notaTop = parseInt(nota.style.top);
    let notaNombre = 'Nota desconocida';

    for (let i = 0; i < posicionesNotas.length; i++) {
        if (Math.abs(notaTop - posicionesNotas[i].top) < 10) {
            notaNombre = posicionesNotas[i].nombre;
            break;
        }
    }

    document.getElementById('nombreNota').innerText = `La nota es: ${notaNombre}`;

    // Reproducir el sonido correspondiente a la nota por 1 segundo con un volumen bajo
    if (sonidosNotas[notaNombre]) {
        let audio = new Audio(sonidosNotas[notaNombre]);
        audio.volume = 0.3; // Ajustar volumen (0.0 a 1.0)
        audio.play();

        // Detener el sonido después de 1 segundo
        setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;  // Reiniciar el sonido para la próxima vez
        }, 900);  // 1000 ms = 1 segundo
    }
}
