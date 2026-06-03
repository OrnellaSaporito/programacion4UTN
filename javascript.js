document.addEventListener('DOMContentLoaded', () => {
    
    // 1.1 Menú Móvil Responsive
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 1.2 Interacción Dropdowns Celular (Clic abre, Clic cierra directo)
    const dropdownToggles = document.querySelectorAll('.dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation(); 
                
                const parentLi = toggle.parentElement;

                if (parentLi.classList.contains('open')) {
                    parentLi.classList.remove('open');
                } else {
                    document.querySelectorAll('.dropdown').forEach(li => {
                        li.classList.remove('open');
                    });
                    parentLi.classList.add('open');
                }
            }
        });
    });

    // Cerrar submenús si se hace click fuera
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
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
    
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    let currentIndex = 0; 

    const updateLightboxImage = (index) => {
        if (galeriaImgs[index]) {
            lightboxImg.src = galeriaImgs[index].src;
        }
    };

    if (lightbox && lightboxImg && prevBtn && nextBtn) {
        // Al hacer click en cualquier foto
        galeriaImgs.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentIndex = index; 
                lightbox.style.display = 'flex';
                updateLightboxImage(currentIndex);
            });
        });

        // Evento Flecha Izquierda
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = galeriaImgs.length - 1;
            }
            updateLightboxImage(currentIndex);
        });

        // Evento Flecha Derecha
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            currentIndex++;
            if (currentIndex >= galeriaImgs.length) {
                currentIndex = 0;
            }
            updateLightboxImage(currentIndex);
        });

        // Cerrar al hacer clic en la X
        closeBtn.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });

        // Cerrar al hacer clic en el fondo negro (pero no en las flechas ni imagen)
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });

        // Controlar el visor con el teclado físico
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') nextBtn.click();
                if (e.key === 'ArrowLeft') prevBtn.click();
                if (e.key === 'Escape') closeBtn.click();
            }
        });
    }

    // 3. Validación del Formulario de Contacto
    const form = document.getElementById('contact-form');
    const formMensaje = document.getElementById('form-mensaje');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); 

            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const asunto = document.getElementById('asunto').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();

            formMensaje.className = 'form-mensaje';

            if (nombre === '' || email === '' || asunto === '' || mensaje === '') {
                formMensaje.textContent = 'Por favor, completa todos los campos.';
                formMensaje.classList.add('error');
                formMensaje.classList.remove('hidden');
                return;
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                formMensaje.textContent = 'Por favor, ingresa un correo electrónico válido.';
                formMensaje.classList.add('error');
                formMensaje.classList.remove('hidden');
                return;
            }

            formMensaje.textContent = `¡Gracias por tu mensaje, ${nombre}! Te responderemos pronto, ARMY 💜`;
            formMensaje.classList.add('exito');
            formMensaje.classList.remove('hidden');

            form.reset();

            setTimeout(() => {
                formMensaje.classList.add('hidden');
            }, 5000);
        });
    }
});