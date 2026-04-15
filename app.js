document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1.DARK MODE
    // ==========================================
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Función para actualizar el icono del botón
    const updateToggleIcon = (theme) => {
        if (theme === 'dark') {
            themeToggle.innerHTML = '☀️';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo claro');
        } else {
            themeToggle.innerHTML = '🌙';
            themeToggle.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    };

    // Revisar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateToggleIcon(savedTheme);
    }

    // Alternar tema al hacer click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolioTheme', newTheme); // Guardar preferencia
        updateToggleIcon(newTheme);
    });

    // ==========================================
    // 2. FILTRO DE PROYECTOS
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase 'active' de todos y agregar al clickeado
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Mostrar/Ocultar proyectos con pequeña animación
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 200); 
                }
            });
        });
    });

    // ==========================================
    // 3. SIMULACIÓN DE FORMULARIO DE CONTACTO
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const nombre = formData.get('nombre');
            const email = formData.get('email');
            const mensaje = formData.get('mensaje');

            const destinatario = 'jesustl1232@gmail.com'; // <-- email de destino
            const asunto = encodeURIComponent(`Nuevo mensaje desde el portafolio de ${nombre}`);
            const cuerpo = encodeURIComponent(
                `Nombre: ${nombre}\n` +
                `Email: ${email}\n\n` +
                `Mensaje:\n${mensaje}`
            );

            // Construimos el enlace mailto
            const mailtoLink = `mailto:${destinatario}?subject=${asunto}&body=${cuerpo}`;

            // Abrimos el cliente de correo
            window.location.href = mailtoLink;

            // Opcional: limpiar el formulario
            contactForm.reset();
        });
    }
    
    // ==========================================
    // 4. CONTADOR AUTOMÁTICO DE PROYECTOS
    // ==========================================
    // elementos para mostrar la cantidad de proyectos
    const projectCountElement = document.getElementById('project-count');
    
    // tarjetas de proyectos
    const totalProjects = document.querySelectorAll('.project-card').length;

    //  actualiza la cantidad
    if (projectCountElement) {
        projectCountElement.textContent = totalProjects;
    }
});