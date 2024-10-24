'use strict'

function redireccionar() {
                
    window.location.href = "notas-flauta.html";
}







  // Mapeo de posiciones en el pentagrama a notas musicales en clave de Sol
  const posicionesNotas = [
    { top: 110, nombre: 'Do' },  // Fuera del pentagrama, debajo de la quinta línea
    { top: 100, nombre: 'Re' },  // Justo debajo de la quinta línea
    { top: 90, nombre: 'Mi' },   // En la quinta línea, atravesando la línea
    { top: 80, nombre: 'Fa' },   // Entre la cuarta y la quinta línea
    { top: 70, nombre: 'Sol' },  // En la cuarta línea, atravesando la línea
    { top: 60, nombre: 'La' },   // Entre la tercera y la cuarta línea
    { top: 50, nombre: 'Si' }    // En la tercera línea, atravesando la línea
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

// Función para hacer que las notas sean arrastrables
document.querySelectorAll('.nota').forEach(nota => {
    nota.addEventListener('mousedown', function(e) {
        const pentagramaRect = pentagrama.getBoundingClientRect();  // Obtener posición del pentagrama
        let offsetX = e.clientX - nota.getBoundingClientRect().left;
        let offsetY = e.clientY - nota.getBoundingClientRect().top;

        function mouseMoveHandler(e) {
            let newLeft = e.clientX - pentagramaRect.left - offsetX;
            let newTop = e.clientY - pentagramaRect.top - offsetY;

            // Restringe el movimiento dentro del pentagrama
            if (newLeft >= 0 && newLeft <= pentagrama.offsetWidth - nota.offsetWidth) {
                nota.style.left = `${newLeft}px`;
            }
            if (newTop >= 0 && newTop <= pentagrama.offsetHeight - nota.offsetHeight) {
                nota.style.top = `${newTop}px`;
            }
        }

        function mouseUpHandler() {
            verificarPosicionNota(nota);  // Verificar posición de la nota
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });
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