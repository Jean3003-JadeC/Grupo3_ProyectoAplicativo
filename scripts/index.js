/**
 * Proyecto: Plataforma Web de Consultoría en Data & IA - Cibertec
 * Archivo: index.js
 * Descripción: Manejo de interactividad, cabecera dinámica y navegación fluida.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. MANEJO DE CABECERA DINÁMICA (SCROLL)
    // ==========================================
    const cabecera = document.getElementById('cabecera');
    
    const evaluarScrollCabecera = () => {
        // Si el usuario baja más de 50px, añade la clase con fondo y desenfoque
        if (window.scrollY > 50) {
            cabecera.classList.add('scroll-activo');
        } else {
            cabecera.classList.remove('scroll-activo');
        }
    };

    // Escuchar el movimiento del scroll
    window.addEventListener('scroll', evaluarScrollCabecera);
    // Ejecutar una vez al cargar por si la página inicia ya con scroll hacia abajo
    evaluarScrollCabecera();


    // ==========================================
    // 2. DESPLAZAMIENTO SUAVE (SMOOTH SCROLL)
    // ==========================================
    // Captura todos los enlaces que apunten a un ID interno (que inicien con #)
    const enlacesNavegacion = document.querySelectorAll('a[href^="#"]');

    enlacesNavegacion.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el salto brusco nativo del navegador

            const destinoId = this.getAttribute('href');
            const seccionDestino = document.querySelector(destinoId);

            if (seccionDestino) {
                // Calculamos la altura de la cabecera para que no tape el título al llegar
                const alturaCabecera = cabecera ? cabecera.offsetHeight : 0;
                const posicionSeccion = seccionDestino.getBoundingClientRect().top + window.scrollY;
                
                // Realiza el desplazamiento fluido con un offset (margen superior)
                window.scrollTo({
                    top: posicionSeccion - alturaCabecera + 10, 
                    behavior: 'smooth'
                });
            }
        });
    });


    // ==========================================
    // 3. DETECCIÓN AUTOMÁTICA DE SECCIÓN ACTIVA (SCROLLSPY)
    // ==========================================
    const secciones = document.querySelectorAll('section[id]');
    const enlacesMenu = document.querySelectorAll('#cabecera nav .nav-link');

    const activarMenuEnScroll = () => {
        let seccionActualId = "";
        const alturaCabecera = cabecera ? cabecera.offsetHeight : 70;

        secciones.forEach(seccion => {
            const seccionTop = seccion.offsetTop - alturaCabecera - 20;
            const seccionHeight = seccion.offsetHeight;
            
            // Si el scroll de la pantalla se encuentra dentro de los límites de la sección
            if (window.scrollY >= seccionTop && window.scrollY < seccionTop + seccionHeight) {
                seccionActualId = seccion.getAttribute('id');
            }
        });

        // Remueve la clase activa de todos los enlaces y la pone solo en el actual
        enlacesMenu.forEach(enlace => {
            enlace.classList.remove('text-info', 'fw-bold'); // Puedes cambiar estas clases según Bootstrap o tu CSS
            if (enlace.getAttribute('href') === `#${seccionActualId}`) {
                enlace.classList.add('text-info', 'fw-bold'); // Ilumina el enlace de la sección actual
            }
        });
    };

    // Escuchar el scroll para actualizar el menú
    window.addEventListener('scroll', activarMenuEnScroll);


    // ==========================================
    // 4. VALIDACIÓN BÁSICA DEL FORMULARIO DE CONTACTO
    // ==========================================
    const formulario = document.querySelector('.formulario-limpio');
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault(); // Detiene el envío real para demostración académica
            
            const nombre = document.getElementById('inputName').value.trim();
            
            if (nombre === "") {
                alert("Por favor, ingresa tu nombre antes de enviar.");
            } else {
                // Simulación de éxito integrada
                alert(`¡Gracias por contactarnos, ${nombre}! Tu mensaje de consulta en Data & IA ha sido simulado con éxito.`);
                formulario.reset();
            }
        });
    }

});