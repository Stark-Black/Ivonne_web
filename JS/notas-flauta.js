var reproduciendo = false;

        // Mapear los sonidos de las notas
        const sonidosNotas = {
            'DO': 'Sounds/DO.mp3',
            'RE': 'Sounds/RE.mp3',
            'MI': 'Sounds/MI.mp3',
            'FA': 'Sounds/FA.mp3',
            'SOL': 'Sounds/SOL.mp3',
            'LA': 'Sounds/LA.mp3',
            'SI': 'Sounds/SI.mp3'
        };

        // Función para reproducir el sonido por 0.9 segundos con volumen bajo
        function reproducirSonido(notaNombre) {
            if (sonidosNotas[notaNombre] && !reproduciendo) {
                reproduciendo = true;
                let audio = new Audio(sonidosNotas[notaNombre]);
                audio.volume = 0.3; // Ajustar volumen (0.0 a 1.0)
                audio.play();

                // Detener el sonido después de 0.9 segundos
                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;  // Reiniciar el sonido para la próxima vez
                    reproduciendo = false;
                }, 900);  // 900 ms = 0.9 segundos
            }
        }

        function redireccionar() {
            window.location.href = "juegos.html";
        }