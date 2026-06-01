document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Móvil Responsive
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Funcionalidad Lightbox de la Galería
    const galeriaImgs = document.querySelectorAll('.galeria-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-lightbox');

    if (lightbox) {
        galeriaImgs.forEach(img => {
            img.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                lightboxImg.src = img.src;
            });
        });

        // Cerrar al hacer clic en la X
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Cerrar al hacer clic fuera de la imagen
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
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