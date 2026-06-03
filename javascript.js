document.addEventListener('DOMContentLoaded', () => {
    
    // 1.1 Menú Móvil Responsive
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 1.2 SOLUCIÓN ACCORDEÓN EN CELULAR: Clic abre, Clic cierra directo
    const dropdownToggles = document.querySelectorAll('.dropdown > a');

    dropdownToggles.forEach(toggle => {
        // Usamos 'click' pero deteniendo la propagación para que el navegador no se confunda
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation(); // ◄ CLAVE: Evita que el evento "bubleé" y confunda al navegador móvil
                
                const parentLi = toggle.parentElement;

                // Verificamos de forma estricta si ya está abierto
                if (parentLi.classList.contains('open')) {
                    parentLi.classList.remove('open');
                } else {
                    // Cerramos los demás antes de abrir este
                    document.querySelectorAll('.dropdown').forEach(li => {
                        li.classList.remove('open');
                    });
                    parentLi.classList.add('open');
                }
            }
        });
    });

    // EXTRA: Si el usuario hace click en cualquier parte negra del menú o fuera, cerramos los dropdowns
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            // Si el click no fue en un botón desplegable, cerramos todos
            if (!e.target.matches('.dropdown > a')) {
                document.querySelectorAll('.dropdown').forEach(li => {
                    li.classList.remove('open');
                });
            }
        }
    });

    // 2. Funcionalidad Lightbox de la Galería (Con navegación por flechas)
    const galeriaImgs = document.querySelectorAll('.galeria-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');
    
    // Nuevos elementos de flechas
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0; // Guardará la posición de la foto activa

    // Función auxiliar para actualizar la imagen del lightbox según el índice actual
    const updateLightboxImage = (index) => {
        lightboxImg.src = galeriaImgs[index].src;
    };

    if (lightbox) {
        // Al hacer click en cualquier foto de la galería
        galeriaImgs.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index; // Guardamos qué número de foto es (0, 1, 2, etc.)
                lightbox.style.display = 'flex';
                updateLightboxImage(currentIndex);
            });
        });

        // Evento Flecha Izquierda (Anterior)
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se cierre el lightbox al hacer click en la flecha
            currentIndex--;
            // Si llega antes de la primera foto, vuelve a la última (efecto bucle sin fin)
            if (currentIndex < 0) {
                currentIndex = galeriaImgs.length - 1;
            }
            updateLightboxImage(currentIndex);
        });

        // Evento Flecha Derecha (Siguiente)
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Evita que se cierre el lightbox
            currentIndex++;
            // Si pasa la última foto, reinicia a la primera
            if (currentIndex >= galeriaImgs.length) {
                currentIndex = 0;
            }
            updateLightboxImage(currentIndex);
        });

        // Cerrar al hacer clic en la X
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Cerrar al hacer clic fuera de la imagen (en el fondo negro)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            // Solo si el lightbox está actualmente abierto en la pantalla
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') nextBtn.click(); // Simula click en flecha derecha
                if (e.key === 'ArrowLeft') prevBtn.click();   // Simula click en flecha izquierda
                if (e.key === 'Escape') closeBtn.click();     // Simula click en la X para cerrar
            }
        });
    }

    // 3. Validación del Formulario de Contacto
    const form = document.getElementById('contact-form');
    const formMensaje = document.getElementById('form-mensaje');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Evita recargar la página

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            // Resetear clases de mensajes
            formMensaje.className = 'form-mensaje';

            // Validación básica
            if (nombre === '' || email === '' || asunto === '' || mensaje === '') {
                formMensaje.textContent = 'Por favor, completa todos los campos.';
                formMensaje.classList.add('error');
                formMensaje.classList.remove('hidden');
                return;
            }

            // Expresión regular para validar el correo
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                formMensaje.textContent = 'Por favor, ingresa un correo electrónico válido.';
                formMensaje.classList.add('error');
                formMensaje.classList.remove('hidden');
                return;
            }

            // Simulación de envío exitoso
            formMensaje.textContent = `¡Gracias por tu mensaje, ${nombre}! Te responderemos pronto, ARMY 💜`;
            formMensaje.classList.add('exito');
            formMensaje.classList.remove('hidden');

            // Limpiar formulario
            form.reset();

            // Ocultar mensaje después de 5 segundos
            setTimeout(() => {
                formMensaje.classList.add('hidden');
            }, 5000);
        });
    }
});