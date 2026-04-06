
let currentProjects = []; // Mantiene la lista de proyectos visibles actualmente
let lightboxCurrentIndex = 0; // Índice para el lightbox

/**
 * ==========================================
 * 2. INICIALIZACIÓN PRINCIPAL (Entry Point)
 * ==========================================
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando aplicación...');
    
    // Inicializar módulos
    initPreloader();
    initVideoSlider();
    initLogoSlider();
    initBioModal();
    initBannerSlider();
    
    // Cargar datos y renderizar secciones dinámicas
    initPortfolio();     // Carga proyectos y filtros
    initSkills();        // Carga habilidades y barras de progreso
    initAIProjects();    // Carga proyectos de IA
    
    // Inicializar componentes globales
    initLightbox();      // Configura el lightbox
});

/**
 * ==========================================
 * 3. MÓDULOS Y FUNCIONES
 * ==========================================
 */

// --- A. Preloader ---
function initPreloader() {
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        const preloader = document.querySelector('.preloader');
        if (!preloader) return;

        setTimeout(() => {
            preloader.classList.add('hidden');
            preloader.addEventListener('transitionend', () => {
                preloader.remove();
            });
        }, 1500);
    });
}

// --- B. Slider de Videos (Mobile) ---
function initVideoSlider() {
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const videos = document.querySelectorAll('.video-container .mobile-video');
    const indicators = document.querySelectorAll('.video-indicator');
    
    if (!videos.length) return;

    let currentIndex = 0;

    function changeVideo(newIndex) {
        // Validación cíclica
        if (newIndex < 0) newIndex = videos.length - 1;
        else if (newIndex >= videos.length) newIndex = 0;

        // Resetear activos
        videos.forEach(v => { v.classList.remove('active'); v.pause(); });
        indicators.forEach(i => i.classList.remove('active'));

        // Activar nuevos
        videos[newIndex].classList.add('active');
        if (indicators[newIndex]) indicators[newIndex].classList.add('active');

        currentIndex = newIndex;
    }

    // Event Listeners
    if (prevBtn) prevBtn.addEventListener('click', () => changeVideo(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => changeVideo(currentIndex + 1));
    
    indicators.forEach((ind, idx) => {
        ind.addEventListener('click', () => changeVideo(idx));
    });

    // Navegación teclado (solo si el slider es visible)
    document.addEventListener('keydown', (e) => {
        // Verificar si el slider está en el viewport podría ser una mejora
        if (e.key === 'ArrowLeft') changeVideo(currentIndex - 1);
        if (e.key === 'ArrowRight') changeVideo(currentIndex + 1);
    });
}

// --- C. Slider de Logos (Infinito) ---
function initLogoSlider() {
    const track = document.querySelector('.slider-track');
    const logos = document.querySelectorAll('.logo-item');
    
    if (!track || !logos.length) return;

    // Clonar logos para efecto infinito
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });

    // Reiniciar animación suavemente
    track.addEventListener('animationiteration', () => {
        track.style.animation = 'none';
        void track.offsetWidth; // Trigger reflow
        track.style.animation = 'slide 200s linear infinite';
    });

    // Efecto touch en móviles
    document.querySelectorAll('.logo-item').forEach(logo => {
        logo.addEventListener('touchstart', () => logo.classList.add('active'), {passive: true});
        logo.addEventListener('touchend', () => setTimeout(() => logo.classList.remove('active'), 200));
    });
}

// --- D. Modal de Biografía ---
function initBioModal() {
    const bioModal = document.getElementById('bio-modal');
    const bioModalClose = document.querySelector('.bio-modal-close');
    const heroAvatar = document.querySelector('.hero-avatar');

    if (!bioModal || !heroAvatar) return;

    const toggleModal = (show) => {
        if (show) {
            bioModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            bioModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    heroAvatar.addEventListener('click', () => toggleModal(true));
    if (bioModalClose) bioModalClose.addEventListener('click', () => toggleModal(false));
    
    // Cerrar al hacer clic fuera o Escape
    bioModal.addEventListener('click', (e) => {
        if (e.target === bioModal) toggleModal(false);
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bioModal.classList.contains('active')) toggleModal(false);
    });
}

// --- E. Portafolio (Proyectos y Filtros) ---
function initPortfolio() {
    const grid = document.querySelector('.proyectos-grid');
    const contenedorFiltros = document.querySelector('.filtros-proyectos');
    
    if (!grid) return;

    // 1. Generar Filtros
    if (contenedorFiltros) {
        const tagsUnicos = ['todos', ...new Set(datosProyectos.flatMap(p => p.tags.map(t => t.toLowerCase())))];
        
        tagsUnicos.forEach(tag => {
            const boton = document.createElement('button');
            boton.className = `filtro-btn ${tag === 'todos' ? 'active' : ''}`;
            boton.dataset.tag = tag;
            boton.textContent = tag === 'todos' ? 'Mostrar Todos' : tag.charAt(0).toUpperCase() + tag.slice(1);
            
            boton.addEventListener('click', (e) => filtrarProyectos(e, grid));
            contenedorFiltros.appendChild(boton);
        });
    }

    // 2. Renderizar inicial (Todos)
    currentProjects = datosProyectos; // Inicializar global
    renderProyectos(currentProjects, grid);
}

function filtrarProyectos(e, grid) {
    const tag = e.target.dataset.tag;
    const cards = document.querySelectorAll('.proyecto-card');
    
    // Actualizar botones UI
    document.querySelectorAll('.filtro-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    // Animación de salida
    cards.forEach(card => card.classList.add('fade-out'));

    setTimeout(() => {
        // Filtrar datos
        currentProjects = tag === 'todos' 
            ? datosProyectos 
            : datosProyectos.filter(p => p.tags.some(t => t.toLowerCase() === tag));

        renderProyectos(currentProjects, grid);
    }, 300); // Esperar transición CSS
}

function renderProyectos(listaProyectos, grid) {
    grid.innerHTML = '';
    
    listaProyectos.forEach((proyecto, index) => {
        const card = document.createElement('div');
        card.className = 'proyecto-card';
        card.style.opacity = '0'; // Inicio para animación
        
        // HTML de la tarjeta
        card.innerHTML = `
            <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}" loading="lazy">
            <div class="card-content">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                ${proyecto.link && proyecto.link.url ? 
                    `<a href="${proyecto.link.url}" target="_blank" class="proyecto-link">${proyecto.link.text}</a>` : ''}
                
                <div class="proyecto-meta">
                    ${proyecto.softwareIcons ? 
                        `<div class="software-icons">
                            ${proyecto.softwareIcons.map(icon => `<img src="${icon.icono}" alt="${icon.nombre}" title="${icon.nombre}">`).join('')}
                        </div>` : ''}
                    ${proyecto.year ? `<span class="proyecto-year">${proyecto.year}</span>` : ''}
                </div>
                <div class="tags">${proyecto.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
            </div>
        `;

        // Click para abrir Lightbox
        card.addEventListener('click', () => openLightbox(index));
        
        // Animación de entrada escalonada
        card.style.animation = `cardEntrance 0.5s ease ${index * 0.05}s forwards`;
        grid.appendChild(card);
    });
}

// --- F. Habilidades (Skills) ---
function initSkills() {
    const gridHabilidades = document.querySelector('.habilidades-grid');
    if (!gridHabilidades) return;

    // 1. Renderizar Software
    const softwareSection = document.createElement('div');
    softwareSection.className = 'habilidad-categoria';
    softwareSection.innerHTML = '<h3>Software Especializado</h3>';
    
    const softwareList = document.createElement('div');
    softwareList.className = 'software-list';
    
    datosHabilidades.software.forEach(h => {
        const skill = document.createElement('div');
        skill.className = 'skill-item';
        skill.innerHTML = `
            <div class="skill-header">
                <img src="${h.icono}" alt="${h.nombre}" class="skill-icon">
                <span>${h.nombre}</span>
                <span class="skill-percent">${h.nivel}%</span>
            </div>
            <div class="skill-bar" data-percent="${h.nivel}%">
                <div class="skill-progress"></div>
            </div>
        `;
        softwareList.appendChild(skill);
    });
    softwareSection.appendChild(softwareList);
    gridHabilidades.appendChild(softwareSection);

    // 2. Renderizar Profesionales
    const profSection = document.createElement('div');
    profSection.className = 'habilidad-categoria';
    profSection.innerHTML = '<h3>Especialidades Creativas</h3><div class="skill-tags"></div>';
    
    datosHabilidades.profesionales.forEach(h => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = h;
        profSection.querySelector('.skill-tags').appendChild(tag);
    });
    gridHabilidades.appendChild(profSection);

    // 3. Observer para animación de barras
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.skill-progress');
                bars.forEach(bar => {
                    const width = bar.parentElement.getAttribute('data-percent');
                    bar.style.width = width;
                });
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.habilidad-categoria').forEach(s => observer.observe(s));
}

// --- G. Lightbox ---
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const slider = document.querySelector('.lightbox-slider');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    // Variables locales del lightbox
    let currentImageIndex = 0;
    let isDragging = false;
    let startPosX = 0;

    // Exponer función global para abrir
    window.openLightbox = (projectIndex) => {
        lightboxCurrentIndex = projectIndex;
        currentImageIndex = 0;
        
        loadLightboxImages(slider);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    function loadLightboxImages(sliderContainer) {
        const proyecto = currentProjects[lightboxCurrentIndex];
        if (!proyecto) return;

        sliderContainer.innerHTML = proyecto.imagenes.map(img => `<img src="${img}" alt="${proyecto.titulo}">`).join('');
        sliderContainer.style.transform = 'translateX(0)';
        updateIndicators();
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
        updateIndicators();
    }

    function updateIndicators() {
        const indicators = document.querySelector('.lightbox-indicators');
        if(indicators && currentProjects[lightboxCurrentIndex]) {
            indicators.innerHTML = currentProjects[lightboxCurrentIndex].imagenes
                .map((_, i) => `<span class="${i === currentImageIndex ? 'active' : ''}"></span>`)
                .join('');
        }
    }

    function navigate(dir) {
        const total = currentProjects[lightboxCurrentIndex].imagenes.length;
        currentImageIndex = (currentImageIndex + dir + total) % total;
        updateSliderPosition();
    }

    // Event Listeners Lightbox
    closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Touch / Drag
    slider.addEventListener('mousedown', e => dragStart(e));
    slider.addEventListener('touchstart', e => dragStart(e));
    slider.addEventListener('mouseup', e => dragEnd(e));
    slider.addEventListener('touchend', e => dragEnd(e));
    slider.addEventListener('mousemove', e => drag(e));
    slider.addEventListener('touchmove', e => drag(e));

    function dragStart(e) {
        isDragging = true;
        startPosX = e.clientX || e.touches[0].clientX;
        slider.style.transition = 'none';
    }
    
    function drag(e) {
        if (!isDragging) return;
        const x = e.clientX || e.touches[0].clientX;
        const delta = x - startPosX;
        slider.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${delta}px))`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        slider.style.transition = 'transform 0.5s ease';
        
        const endX = e.clientX || e.changedTouches[0].clientX;
        const diff = endX - startPosX;
        
        if (Math.abs(diff) > 50) navigate(diff > 0 ? -1 : 1);
        else updateSliderPosition();
    }

    // Teclado Lightbox
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
        if (e.key === 'Escape') {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// --- H. Proyectos IA ---
function initAIProjects() {
    const grid = document.querySelector('.ai-projects-grid');
    if (!grid) return;

    datosAIProjects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'ai-project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <div class="ai-project-content">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                
                <div class="ai-project-meta">
                    <div class="ai-technologies">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="ai-model"><i class="fas fa-brain"></i> ${project.aiModel}</div>
                </div>
                
                <div class="ai-project-links">
                    <a href="${project.demoLink}" class="ai-link" target="_blank"><i class="fas fa-eye"></i> Demo</a>
                    <a href="${project.github}" class="ai-link" target="_blank"><i class="fab fa-github"></i> Código</a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

/**
 * ==========================================
 * 4. DATOS (Base de Datos Local)
 * ==========================================
 */

const datosHabilidades = {
    software: [
        { nombre: "Adobe Photoshop", nivel: 95, icono: "images/icons/photoshop.svg" },
        { nombre: "Adobe Illustrator", nivel: 85, icono: "images/icons/illustrator.svg" },
        { nombre: "Adobe After Effects", nivel: 60, icono: "images/icons/after-effects.svg" }
    ],
    profesionales: [
        "Branding Corporativo", "Ilustración Digital", "Diseño de Packaging",
        "UI/UX Básico", "Retoque Fotográfico", "Animación 2D",
        "Tipografía Creativa", "Preparación para Impresión"
    ]
};

const datosAIProjects = [
    {
        title: "Bot de Whatsapp para automatizar tienda de ropa",
        description: "Bot automatizado para optimizar y simplificar la gestión de una tienda de ropa...",
        image: "images/ai-projects/Botwhatsapp.jpg",
        technologies: ["Python", "WhatsApp API"],
        aiModel: "Deepseek",
        demoLink: "#",
        github: "#"
    },
    {
        title: "Bot de discord para gestionar correos electronicos",
        description: "Bot de Discord diseñado para integrar y gestionar correos electrónicos...",
        image: "images/ai-projects/Botdiscord.jpg",
        technologies: ["Python", "Discord API"],
        aiModel: "deepseek",
        demoLink: "#",
        github: "#"
    }
];

const datosProyectos = [
    {
        titulo: "Tecnoventas",
        imagenes: ["images/proyectos/TV1.webp", "images/proyectos/TV2.1.webp", "images/proyectos/TV2.webp", "images/proyectos/TV3.webp", "images/proyectos/TV4.webp", "images/proyectos/TV5.webp", "images/proyectos/TV6.webp", "images/proyectos/TV7.webp", "images/proyectos/TV8.webp"],
        descripcion: "Tecnoventas es una empresa de tecnología especializada en la reparación de equipos de cómputo.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "https://www.instagram.com/tecnoventas12/", text: "¡Visita su Instagram!" },
        year: 2020
    },
    {
        titulo: "Culperma",
        imagenes: ["images/proyectos/CP1.webp", "images/proyectos/CP2.webp", "images/proyectos/CP3.webp", "images/proyectos/CP4.webp", "images/proyectos/CP5.webp", "images/proyectos/CP6.webp", "images/proyectos/CP7.webp", "images/proyectos/CP8.webp"],
        descripcion: "Culperma es una empresa agroecológica que ofrece productos sustentables y orgánicos.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "https://www.instagram.com/culperma/", text: "¡Visita su Instagram!" },
        year: 2019
    },
    {
        titulo: "MyMy",
        imagenes: ["images/proyectos/MY01.webp", "images/proyectos/MY02.webp", "images/proyectos/MY03.webp", "images/proyectos/MY04.webp", "images/proyectos/MY05.webp", "images/proyectos/MY06.webp", "images/proyectos/MY07.webp", "images/proyectos/MY08.webp", "images/proyectos/MY09.webp", "images/proyectos/MY10.webp", "images/proyectos/MY11.webp", "images/proyectos/MY12.webp", "images/proyectos/MY13.webp", "images/proyectos/MY14.webp", "images/proyectos/MY15.webp", "images/proyectos/MY16.webp"],
        descripcion: "MyMy es una marca de ropa que se especializa en ofrecer prendas de alta calidad y diseño innovador.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2022
    },
    {
        titulo: "Maxima Bisuteria",
        imagenes: ["images/proyectos/MB01.webp", "images/proyectos/MB02.webp", "images/proyectos/MB03.webp", "images/proyectos/MB04.webp", "images/proyectos/MB05.webp", "images/proyectos/MB06.webp"],
        descripcion: "Máxima Bisutería es una marca especializada en la creación de piezas de bisutería de alta calidad.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2022
    },
    {
        titulo: "Calza Yoing",
        imagenes: ["images/proyectos/CY01.webp", "images/proyectos/CY02.webp", "images/proyectos/CY03.webp", "images/proyectos/CY04.webp", "images/proyectos/CY05.webp", "images/proyectos/CY06.webp", "images/proyectos/CY07.webp", "images/proyectos/CY08.webp", "images/proyectos/CY09.webp", "images/proyectos/CY10.webp"],
        descripcion: "Calza Yoing es una marca de zapatos que se especializa en ofrecer calzado de alta calidad.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "https://www.instagram.com/calzayoingca/", text: "¡Visita su Instagram!" },
        year: 2021
    },
    {
        titulo: "Yannilucio",
        imagenes: ["images/proyectos/Y1.webp", "images/proyectos/Y2.webp", "images/proyectos/Y3.webp", "images/proyectos/Y4.webp", "images/proyectos/Y5.webp", "images/proyectos/Y6.webp", "images/proyectos/Y7.webp", "images/proyectos/Y8.webp", "images/proyectos/Y9.webp"],
        descripcion: "Yannilucio busca transmitir una imagen de vanguardia al mundo del motorsport y simracing.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "https://www.youtube.com/@yannilucio/featured", text: "¡Visita su canal de Youtube!" },
        year: 2024
    },
    {
        titulo: "Italplumbing",
        imagenes: ["images/proyectos/IP0.webp", "images/proyectos/IP1.webp", "images/proyectos/IP2.webp", "images/proyectos/IP3.webp", "images/proyectos/IP4.webp", "images/proyectos/IP5.webp", "images/proyectos/IP6.webp", "images/proyectos/IP7.webp", "images/proyectos/IP8.webp", "images/proyectos/IP9.webp", "images/proyectos/IP10.webp", "images/proyectos/IP11.webp", "images/proyectos/IP12.webp", "images/proyectos/IP13.webp", "images/proyectos/IP14.webp", "images/proyectos/IP15.webp", "images/proyectos/IP16.webp"],
        descripcion: "Italplumbing es una empresa especializada en ofrecer servicios de plomería industrial.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "https://italplumbing.cl/", text: "¡Visita su página web!" },
        year: 2024
    },
    {
        titulo: "Miniabasto Liz",
        imagenes: ["images/proyectos/MAL1.webp", "images/proyectos/MAL2.webp"],
        descripcion: "Liz es un miniabasto que combina practicidad y calidez.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2020
    },
    {
        titulo: "Asuntos Legales",
        imagenes: ["images/proyectos/AL1.webp", "images/proyectos/AL2.webp"],
        descripcion: "Asuntos Legales es tu aliado confiable en soluciones jurídicas.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2021
    },
    {
        titulo: "E-cat Technology",
        imagenes: ["images/proyectos/EC1.webp", "images/proyectos/EC2.webp", "images/proyectos/EC3.webp", "images/proyectos/EC4.webp"],
        descripcion: "Programación con instinto felino: herramientas intuitivas y soluciones ágiles.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2022
    },
    {
        titulo: "Albert Super Hamburguesas",
        imagenes: ["images/proyectos/ASH2.webp", "images/proyectos/ASH3.webp", "images/proyectos/ASH1.webp", "images/proyectos/ASH4.webp"],
        descripcion: "Donde la ciencia culinaria se fusiona con el arte de la hamburguesa.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2023
    },
    {
        titulo: "Auto Servicio Zamper",
        imagenes: ["images/proyectos/ASZ1.webp"],
        descripcion: "Tu taller mecánico de confianza, donde la tecnología y la precisión se alían.",
        tags: ["Branding"],
        softwareIcons: [{ nombre: "Photoshop", icono: "images/icons/photoshop.svg" }, { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }],
        link: { url: "", text: "" },
        year: 2022
    }
    
];

// =========================================
// BANNER SLIDER (Imágenes destacadas)
// =========================================

// 📌 Aquí es donde tú subes tus banners
// Solo tienes que editar este array con las rutas de tus imágenes
const bannersData = [
    {
        img: "images/banners/banner1.webp",
        
        link: "#"   // opcional: al hacer clic en el banner redirige
    },
    {
        img: "images/banners/banner2.webp",
        caption: "Branding para Empresas",
        link: "#proyectos"
    },
    {
        img: "images/banners/banner3.webp",
        caption: "Videos para Móviles",
        link: "#mobile-videos"
    }
    // Agrega cuantos banners quieras
];

function initBannerSlider() {
    const track = document.querySelector('.banner-slider-track');
    const indicatorsContainer = document.querySelector('.banner-indicators');
    const prevBtn = document.querySelector('.banner-prev');
    const nextBtn = document.querySelector('.banner-next');
    
    if (!track || !indicatorsContainer || bannersData.length === 0) return;
    
    let currentIndex = 0;
    let autoPlayInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    
    // 1. Construir los slides dinámicamente
    function buildSlides() {
        track.innerHTML = '';
        indicatorsContainer.innerHTML = '';
        
        bannersData.forEach((banner, idx) => {
            // Crear slide
            const slide = document.createElement('div');
            slide.className = 'banner-slide';
            slide.setAttribute('data-index', idx);
            
            const img = document.createElement('img');
            img.src = banner.img;
            img.alt = banner.caption || `Banner ${idx+1}`;
            img.loading = 'lazy';
            
            slide.appendChild(img);
            
            // Si hay caption, añadirlo
            if (banner.caption) {
                const captionDiv = document.createElement('div');
                captionDiv.className = 'banner-caption';
                captionDiv.textContent = banner.caption;
                slide.appendChild(captionDiv);
            }
            
            // Si el banner tiene link, todo el slide se vuelve clicable
            if (banner.link) {
                slide.style.cursor = 'pointer';
                slide.addEventListener('click', (e) => {
                    // Evitar que el clic en los botones navegue
                    if (e.target.closest('.banner-slider-btn')) return;
                    window.location.href = banner.link;
                });
            }
            
            track.appendChild(slide);
            
            // Crear indicador
            const indicator = document.createElement('div');
            indicator.className = 'banner-indicator';
            if (idx === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(idx));
            indicatorsContainer.appendChild(indicator);
        });
    }
    
    // 2. Función para mover el slider
    function goToSlide(index) {
        if (index < 0) index = 0;
        if (index >= bannersData.length) index = bannersData.length - 1;
        currentIndex = index;
        const translateX = -currentIndex * 100;
        track.style.transform = `translateX(${translateX}%)`;
        
        // Actualizar indicadores activos
        document.querySelectorAll('.banner-indicator').forEach((ind, i) => {
            if (i === currentIndex) ind.classList.add('active');
            else ind.classList.remove('active');
        });
        
        resetAutoPlay();
    }
    
    function nextSlide() {
        goToSlide(currentIndex + 1);
    }
    
    function prevSlide() {
        goToSlide(currentIndex - 1);
    }
    
    // 3. Autoplay (cada 5 segundos)
    function startAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(() => {
            // Solo avanzar si no se está haciendo drag y el slider es visible
            if (!isDragging && track.offsetParent !== null) {
                let next = currentIndex + 1;
                if (next >= bannersData.length) next = 0;
                goToSlide(next);
            }
        }, 5000);
    }
    
    function resetAutoPlay() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // 4. Eventos táctiles y ratón (drag para móviles)
    function dragStart(e) {
        isDragging = true;
        startPos = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
        track.style.transition = 'none';
        resetAutoPlay();
    }
    
    function dragMove(e) {
        if (!isDragging) return;
        const currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
        const diff = currentX - startPos;
        const movePercent = (diff / track.offsetWidth) * 100;
        let newTranslate = -currentIndex * 100 + movePercent;
        // Limitar arrastre para no mostrar bordes
        if (newTranslate > 0) newTranslate = 0;
        if (newTranslate < -(bannersData.length - 1) * 100) newTranslate = -(bannersData.length - 1) * 100;
        track.style.transform = `translateX(${newTranslate}%)`;
    }
    
    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        const endX = e.type === 'mouseup' ? e.clientX : e.changedTouches[0].clientX;
        const diff = endX - startPos;
        const threshold = track.offsetWidth * 0.2;
        if (Math.abs(diff) > threshold) {
            if (diff > 0) prevSlide();
            else nextSlide();
        } else {
            goToSlide(currentIndex);
        }
        startAutoPlay();
    }
    
    // 5. Pausar autoplay cuando el mouse entra (opcional)
    function pauseOnHover() {
        if (autoPlayInterval) clearInterval(autoPlayInterval);
    }
    function resumeOnLeave() {
        startAutoPlay();
    }
    
    // 6. Conectar eventos
    buildSlides();
    goToSlide(0);
    startAutoPlay();
    
    // Botones
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevSlide(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextSlide(); });
    
    // Eventos táctiles / mouse drag
    track.addEventListener('mousedown', dragStart);
    track.addEventListener('mousemove', dragMove);
    track.addEventListener('mouseup', dragEnd);
    track.addEventListener('touchstart', dragStart);
    track.addEventListener('touchmove', dragMove);
    track.addEventListener('touchend', dragEnd);
    
    // Pausar al hover (mejor experiencia)
    track.addEventListener('mouseenter', pauseOnHover);
    track.addEventListener('mouseleave', resumeOnLeave);
    
    // Teclado (si el slider está visible)
    document.addEventListener('keydown', (e) => {
        const sliderSection = document.getElementById('banner-slider');
        if (!sliderSection || !isElementInViewport(sliderSection)) return;
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 100 && rect.bottom > 100;
    }
}