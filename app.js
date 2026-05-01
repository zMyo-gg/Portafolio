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

        // ==========================================
    // LÓGICA DE IDIOMA (ES / EN)
    // ==========================================
    const langToggle = document.getElementById('lang-toggle');

    const translations = {
        es: {
            nav_hire: 'Contrátame',
            hero_greeting: 'Hola — Construyo para la web',
            hero_title: 'Junior Frontend Developer — Creando apps web accesibles y de alto rendimiento',
            hero_desc: 'Soy un desarrollador web de Perú. Me especializo en crear interfaces responsivas y arquitecturas frontend confiables utilizando HTML5, CSS3 y JavaScript. Explora mis proyectos y descubre cómo puedo aportar valor a tu próximo producto web.',
            projects_title: 'Galería de Proyectos',
            projects_subtitle: 'Una selección de mis proyectos web incluyendo plantillas y aplicaciones interactivas.',
            skills_title: 'Habilidades y Competencia',
            contact_title: 'Ponte en contacto',
            contact_subtitle: 'Estoy disponible para proyectos freelance y oportunidades a tiempo completo.'
        },
        en: {
            nav_hire: 'Hire Me',
            hero_greeting: 'Hi — I build for the web',
            hero_title: 'Junior Frontend Developer — Building accessible, performant web apps',
            hero_desc: 'I am a web developer based in Chincha Alta, Ica, Peru. I focus on creating responsive interfaces and reliable front-end architectures using HTML5, CSS3 and JavaScript. Explore my projects and see how I can help with your next web product.',
            projects_title: 'Projects Gallery',
            projects_subtitle: 'A curated selection of web projects including templates and interactive apps.',
            skills_title: 'Skills & Proficiency',
            contact_title: 'Get in touch',
            contact_subtitle: 'I am available for freelance work and full‑time opportunities.'
        }
    };

    const applyTranslations = (lang) => {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const text = translations[lang][key];
            if (text) el.textContent = text;
        });
        // Cambiar texto del botón
        if (langToggle) {
            langToggle.textContent = lang.toUpperCase();
        }
        // Guardar preferencia
        localStorage.setItem('portfolioLang', lang);
    };

    // Cargar idioma guardado o ES por defecto
    const savedLang = localStorage.getItem('portfolioLang') || 'es';
    applyTranslations(savedLang);

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const current = localStorage.getItem('portfolioLang') || 'es';
            const next = current === 'es' ? 'en' : 'es';
            applyTranslations(next);
        });
    }
});