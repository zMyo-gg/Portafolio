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
            nav_home: 'Inicio',
            nav_projects: 'Proyectos',
            nav_skills: 'Habilidades',
            nav_contact: 'Contacto',
            hero_greeting: 'Hola — Construyo para la web',
            hero_title: 'Junior Frontend Developer — Creando apps web accesibles y de alto rendimiento',
            hero_desc: 'Soy un desarrollador web de Perú. Me especializo en crear interfaces responsivas y arquitecturas frontend confiables utilizando HTML5, CSS3 y JavaScript. Explora mis proyectos y descubre cómo puedo aportar valor a tu próximo producto web.',
            profile_bio: 'Desarrollador enfocado en el detalle. Experiencia creando sitios en Netlify y servicios en plataformas como Freelancer.',
            projects_title: 'Galería de Proyectos',
            projects_subtitle: 'Una selección de mis proyectos web incluyendo plantillas y aplicaciones interactivas.',
            project_digitalbank_desc: 'Landing page moderna y responsiva para una institución financiera. Destaca por su diseño limpio, posicionamiento avanzado de fondos y un menú de navegación móvil interactivo.',
            project_multistep_desc: 'Formulario interactivo de múltiples pasos. Incluye validación de campos, selección de planes (mensual/anual), cálculo dinámico de precios y un resumen final antes de confirmar.',
            project_browserextensions_desc: 'Tarjetas de descarga para extensiones de navegador. Diseño limpio, moderno y totalmente adaptable a dispositivos móviles.',
            project_calculator_desc: 'App de calculadora interactiva con cambio de temas usando variables CSS y manipulación del DOM.',
            project_faqaccordion_desc: 'Componente interactivo de preguntas frecuentes. Utiliza JavaScript para la lógica de acordeón, permitiendo mostrar u ocultar múltiples respuestas.',
            project_sociallinks_desc: 'Tarjeta de perfil con enlaces sociales centrada y responsiva, ideal como componente reutilizable en portafolios y dashboards.',
            project_bentogrid_desc: 'Diseño de cuadrícula asimétrica estilo Bento totalmente responsivo, maquetado para adaptarse a diferentes tamaños de pantalla.',
            view_side: 'Ver Sitio',
            view_code: 'Ver Código',
            skills_title: 'Habilidades y Competencia',
            skills_desc: 'Desglose de mis habilidades de desarrollo web core y experiencia práctica.',
            skill_htmlcss: 'HTML & CSS — Maquetado semántico y responsivo',
            skill_htmlcss_desc: 'Experto en estructurar sitios web accesibles, uso de Flexbox/Grid y animaciones. Enfoque mobile-first.',
            skill_javascript: 'JavaScript — DOM, ES6+, interactividad',
            skill_javascript_desc: 'Cómodo creando lógica asíncrona, manipulación del DOM y desarrollo de funcionalidades interactivas.',
            skill_react: 'React — Interfaces modernas, componentes reutilizables',
            skill_react_desc: 'Actualmente aprendiendo React para construir interfaces basadas en componentes, manejar estado y consumir APIs en proyectos más avanzados.',
            skills_sidebar_title: 'Frameworks y Herramientas',
            contact_title: 'Ponte en contacto',
            contact_subtitle: 'Estoy disponible para proyectos freelance y oportunidades a tiempo completo.',
                form_name: 'Nombre',
                form_email: 'Correo electrónico',
                form_message: 'Mensaje',
                form_submit: 'Enviar mensaje',
                form_message_placeholder: 'Háblame de las metas de tu proyecto...',
                contact_quick: 'Contacto Rápido',
                contact_location: 'Ubicación: Ica, Perú',
                contact_email: 'Email: jesustl1232@gmail.com',
                contact_response: 'Respuesta típica: 1 - 4 horas.',
            footer_copyright: '© 2026 Jesús Germán Ticona Aquije — Diseñado y construido con dedicación.',
        },
        en: {
            nav_hire: 'Hire Me',
            nav_home: 'Home',
            nav_projects: 'Projects',
            nav_skills: 'Skills',
            nav_contact: 'Contact',
            hero_greeting: 'Hi — I build for the web',
            hero_title: 'Junior Frontend Developer — Building accessible, performant web apps',
            hero_desc: 'I am a web developer based in Chincha Alta, Ica, Peru. I focus on creating responsive interfaces and reliable front-end architectures using HTML5, CSS3 and JavaScript. Explore my projects and see how I can help with your next web product.',
            profile_bio: 'Detail-oriented developer. Experience building sites on Netlify and services on platforms like Freelancer.',
            projects_title: 'Projects Gallery',
            projects_subtitle: 'A curated selection of web projects including templates and interactive apps.',
            project_digitalbank_desc: 'Modern, responsive landing page for a financial institution. Features clean design, advanced background positioning, and an interactive mobile navigation menu.',
            project_multistep_desc: 'Interactive multi-step form. Includes field validation, plan selection (monthly/annual), dynamic price calculation, and a final summary before confirmation.',
            project_browserextensions_desc: 'Download cards for browser extensions. Clean, modern design fully adaptable to mobile devices.',
            project_calculator_desc: 'Interactive calculator app with theme switching using CSS variables and DOM manipulation.',
            project_faqaccordion_desc: 'Interactive FAQ accordion component. Uses JavaScript for accordion logic, allowing multiple answers to be shown or hidden.',
            project_sociallinks_desc: 'Centered, responsive profile card with social links, ideal as a reusable component in portfolios and dashboards.',
            project_bentogrid_desc: 'Fully responsive asymmetric Bento-style grid design, laid out to adapt to different screen sizes.',
            view_side: 'View Site',
            view_code: 'View Code',
            skills_title: 'Skills & Proficiency',
            skills_desc: 'Breakdown of my core web development skills and hands-on experience.',
            skill_htmlcss: 'HTML & CSS — Semantic, responsive markup',
            skill_htmlcss_desc: 'Expert in structuring accessible websites, using Flexbox/Grid and animations. Mobile-first approach.',
            skill_javascript: 'JavaScript — DOM, ES6+, interactivity',
            skill_javascript_desc: 'Comfortable creating asynchronous logic, DOM manipulation, and developing interactive features.',
            skill_react: 'React — Modern interfaces, reusable components',
            skill_react_desc: 'Currently learning React to build component-based interfaces, manage state, and consume APIs in more advanced projects.',
            skills_sidebar_title: 'Frameworks & Tools',
            contact_title: 'Get in touch',
            contact_subtitle: 'I am available for freelance work and full‑time opportunities.',
                form_name: 'Full Name',
                form_email: 'Email Address',
                form_message: 'Message',
                form_submit: 'Send Message',
                contact_quick: 'Quick Contact',
                contact_location: 'Location: Ica, Peru',
                contact_email: 'Email: jesustl1232@gmail.com',
                contact_response: 'Typical Response Time: 1 - 4 hours.',
            footer_copyright: '© 2026 Jesús Germán Ticona Aquije — Designed and built with dedication.',
            
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