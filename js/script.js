// Preloader
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const preloader = document.querySelector('.preloader');
    
    // Agrega la clase hidden después de 1 segundo
    setTimeout(() => {
        preloader.classList.add('hidden');
        
        // Elimina el preloader del DOM después de la animación
        preloader.addEventListener('transitionend', () => {
            preloader.remove();
        });
    }, 1500);
});

// JavaScript para clonar automáticamente
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const logos = document.querySelectorAll('.logo-item');
    
    // Clonar logos
    logos.forEach(logo => {
        const clone = logo.cloneNode(true);
        track.appendChild(clone);
    });
    
    // Reiniciar animación al finalizar
    track.addEventListener('animationiteration', () => {
        track.style.animation = 'none';
        void track.offsetWidth;
        track.style.animation = 'slide 20s linear infinite';
    });
});

// Añade este JS para manejar toques precisos
document.querySelectorAll('.logo-item').forEach(logo => {
    let isTouching = false;
    
    logo.addEventListener('touchstart', () => {
        isTouching = true;
        logo.classList.add('active');
    });
    
    logo.addEventListener('touchend', () => {
        isTouching = false;
        setTimeout(() => logo.classList.remove('active'), 200);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // Datos de proyectos
    const proyectos = [
        {
            titulo: "Tecnoventas",
            imagenes: [
                "images/proyectos/TV1.webp",
                "images/proyectos/TV2.1.webp",
                "images/proyectos/TV2.webp",
                "images/proyectos/TV3.webp",
                "images/proyectos/TV4.webp",
                "images/proyectos/TV5.webp",
                "images/proyectos/TV6.webp",
                "images/proyectos/TV7.webp",
                "images/proyectos/TV8.webp"
            ],
            descripcion: "Tecnoventas es una empresa de tecnología especializada en la reparación de equipos de cómputo. Ofrecen un servicio integral con profesionales altamente capacitados y tecnologías de última generación, garantizando soluciones rápidas y eficientes.",
            tags: ["Logo", "Photoshop", "Ilustrator"]
        },
        {
            titulo: "Culperma",
            imagenes: [
                "images/proyectos/CP1.webp",
                "images/proyectos/CP2.webp",
                "images/proyectos/CP3.webp",
                "images/proyectos/CP4.webp",
                "images/proyectos/CP5.webp",
                "images/proyectos/CP6.webp",
                "images/proyectos/CP7.webp",
                "images/proyectos/CP8.webp"
            ],
            descripcion: "Culperma es una empresa agroecológica que ofrece productos sustentables y orgánicos. Sus prácticas respetuosas con el medio ambiente aseguran productos de alta calidad, protegiendo la biodiversidad y promoviendo un uso responsable de los recursos naturales.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "MyMy",
            imagenes: [
                "images/proyectos/MY01.webp",
                "images/proyectos/MY02.webp",
                "images/proyectos/MY03.webp",
                "images/proyectos/MY04.webp",
                "images/proyectos/MY05.webp",
                "images/proyectos/MY06.webp",
                "images/proyectos/MY07.webp",
                "images/proyectos/MY08.webp",
                "images/proyectos/MY09.webp",
                "images/proyectos/MY10.webp",
                "images/proyectos/MY11.webp",
                "images/proyectos/MY12.webp",
                "images/proyectos/MY13.webp",
                "images/proyectos/MY14.webp",
                "images/proyectos/MY15.webp",
                "images/proyectos/MY16.webp",
            ],
            descripcion: "MyMy es una marca de ropa que se especializa en ofrecer prendas de alta calidad y diseño innovador. Sus colecciones se destacan por su estilo único y atención a los detalles, brindando a sus clientes moda contemporánea y cómoda.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "Maxima Bisuteria",
            imagenes: [
                "images/proyectos/MB01.webp",
                "images/proyectos/MB02.webp",
                "images/proyectos/MB03.webp",
                "images/proyectos/MB04.webp",
                "images/proyectos/MB05.webp",
                "images/proyectos/MB06.webp",
                
            ],
            descripcion: "Máxima Bisutería es una marca especializada en la creación de piezas de bisutería de alta calidad. Se destaca por sus diseños elegantes y detallados, ofreciendo accesorios únicos que complementan cualquier estilo y ocasión.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "Calza Yoing",
            imagenes: [
                "images/proyectos/CY01.webp",
                "images/proyectos/CY02.webp",
                "images/proyectos/CY03.webp",
                "images/proyectos/CY04.webp",
                "images/proyectos/CY05.webp",
                "images/proyectos/CY06.webp",
                "images/proyectos/CY07.webp",
                "images/proyectos/CY08.webp",
                "images/proyectos/CY09.webp",
                "images/proyectos/CY10.webp",
                
            ],
            descripcion: "Calza Yoing es una marca de zapatos que se especializa en ofrecer calzado de alta calidad y diseño contemporáneo. Sus colecciones combinan comodidad y estilo, proporcionando opciones ideales para diversas ocasiones y estilos de vida.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "Yannilucio",
            imagenes: [
                "images/proyectos/Y1.webp",
                "images/proyectos/Y2.webp",
                "images/proyectos/Y3.webp",
                "images/proyectos/Y4.webp",
                "images/proyectos/Y5.webp",
                "images/proyectos/Y6.webp",
                "images/proyectos/Y7.webp",
                "images/proyectos/Y8.webp",
                "images/proyectos/Y9.webp"       
            ],
            descripcion: "Yannilucio busca transmitir una imagen de vanguardia, calidad y dedicación al mundo del motorsport y simracing, atrayendo a entusiastas y profesionales apasionados por la velocidad y la competencia virtual.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "Italplumbing",
            imagenes: [
                "images/proyectos/IP0.webp",
                "images/proyectos/IP1.webp",
                "images/proyectos/IP2.webp",
                "images/proyectos/IP3.webp",
                "images/proyectos/IP4.webp",
                "images/proyectos/IP5.webp",
                "images/proyectos/IP6.webp",
                "images/proyectos/IP7.webp",
                "images/proyectos/IP8.webp",
                "images/proyectos/IP9.webp",
                "images/proyectos/IP10.webp",
                "images/proyectos/IP11.webp",
                "images/proyectos/IP12.webp",
                "images/proyectos/IP13.webp",
                "images/proyectos/IP14.webp",
                "images/proyectos/IP15.webp",
                "images/proyectos/IP16.webp"       
            ],
            descripcion: "Italplumbitng es una empresa especializada en ofrecer servicios de plomería industrial, enfocados en resolver problemas complejos de filtraciones, detección de fugas, mantenimiento de ductos y sistemas de inspección en grandes instalaciones como centros comerciales, condominios y empresas de gran escala.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "Miniabasto Liz",
            imagenes: [
                "images/proyectos/MAL1.webp",
                "images/proyectos/MAL2.webp"  
            ],
            descripcion: "Liz es un miniabasto que combina practicidad y calidez, ofreciendo productos esenciales en un espacio pequeño pero completo, ideal para compras rápidas y cercanas.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "Asuntos Legales",
            imagenes: [
                "images/proyectos/AL1.webp",
                "images/proyectos/AL2.webp"  
            ],
            descripcion: "Asuntos Legales es tu aliado confiable en soluciones jurídicas. Con profesionalismo, claridad y un enfoque personalizado, brindamos asesoría legal eficiente para resolver tus necesidades con integridad y compromiso.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        },
        {
            titulo: "E-cat Technology",
            imagenes: [
                "images/proyectos/EC1.webp",
                "images/proyectos/EC2.webp",
                "images/proyectos/EC3.webp",
                "images/proyectos/EC4.webp"  
            ],
            descripcion: "Programación con instinto felino: herramientas intuitivas, soluciones ágiles y algoritmos que aprenden en la sombra. Para mentes curiosas que buscan código elegante y sistemas que resuelvan con la precisión de una garra. Innovación que acecha en silencio",
            tags: ["Photoshop", "ilustrator", "Branding", "Marca Ficticia"]
        },
        {
            titulo: "Asuntos Legales",
            imagenes: [
                "images/proyectos/AL1.webp",
                "images/proyectos/AL2.webp"  
            ],
            descripcion: "Asuntos Legales es tu aliado confiable en soluciones jurídicas. Con profesionalismo, claridad y un enfoque personalizado, brindamos asesoría legal eficiente para resolver tus necesidades con integridad y compromiso.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        }

        
     
    ];

    // Agregar después del array de proyectos
    const habilidades = {
        software: [
            { nombre: "Adobe Photoshop", nivel: 95, icono: "images/icons/photoshop.svg" },
            { nombre: "Adobe Illustrator", nivel: 85, icono: "images/icons/illustrator.svg" },
            { nombre: "Adobe After Effects", nivel: 60, icono: "images/icons/after-effects.svg" }
        ],
        profesionales: [
            "Branding Corporativo",
            "Ilustración Digital",
            "Diseño de Packaging",
            "UI/UX Básico",
            "Retoque Fotográfico",
            "Animación 2D",
            "Tipografía Creativa",
            "Preparación para Impresión"
        ]
    };

    // Generar habilidades (antes del lightbox logic)
    const gridHabilidades = document.querySelector('.habilidades-grid');

    // Software con barras de progreso
    const softwareSection = document.createElement('div');
    softwareSection.className = 'habilidad-categoria';
    softwareSection.innerHTML = '<h3>Software Especializado</h3>';
    const softwareList = document.createElement('div');
    softwareList.className = 'software-list';

    habilidades.software.forEach(habilidad => {
        const skill = document.createElement('div');
        skill.className = 'skill-item';
        skill.innerHTML = `
        <div class="skill-header">
            <img src="${habilidad.icono}" alt="${habilidad.nombre}" class="skill-icon">
            <span>${habilidad.nombre}</span>
            <span class="skill-percent">${habilidad.nivel}%</span>
        </div>
        <div class="skill-bar" data-percent="${habilidad.nivel}%">
            <div class="skill-progress"></div>
        </div>
    `;
    softwareList.appendChild(skill);
});
    softwareSection.appendChild(softwareList);
    gridHabilidades.appendChild(softwareSection);

    // Habilidades profesionales con tags
    const profSection = document.createElement('div');
    profSection.className = 'habilidad-categoria';
    profSection.innerHTML = '<h3>Especialidades Creativas</h3><div class="skill-tags"></div>';

    habilidades.profesionales.forEach(habilidad => {
        const tag = document.createElement('span');
        tag.className = 'skill-tag';
        tag.textContent = habilidad;
        profSection.querySelector('.skill-tags').appendChild(tag);
    });
    gridHabilidades.appendChild(profSection);

    // Animación de barras al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const finalWidth = bar.parentElement.getAttribute('data-percent'); // Nuevo atributo
                bar.style.width = finalWidth;
            });
        }
    });
}, { 
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

    document.querySelectorAll('.habilidad-categoria').forEach(section => {
        observer.observe(section);
    });

    // Generar proyectos
    const gridProyectos = document.querySelector('.proyectos-grid');

    proyectos.forEach((proyecto, index) => {
        const card = document.createElement('div');
        card.className = 'proyecto-card';
        card.innerHTML = `
            <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}">
            <div class="card-content">
                <h3>${proyecto.titulo}</h3>
                <p>${proyecto.descripcion}</p>
                <div class="tags">${proyecto.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
            </div>
        `;

        card.addEventListener('click', () => openLightbox(index));
        gridProyectos.appendChild(card);
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const slider = document.querySelector('.lightbox-slider');
    const indicators = document.querySelector('.lightbox-indicators');
    let currentProjectIndex = 0;
    let currentImageIndex = 0;
    let isDragging = false;
    let startPosX = 0;

    function openLightbox(projectIndex) {
        currentProjectIndex = projectIndex;
        currentImageIndex = 0;
        loadImages();
        lightbox.classList.add('active');
    }

    function loadImages() {
        const proyecto = proyectos[currentProjectIndex];
        slider.innerHTML = proyecto.imagenes.map(img => `
            <img src="${img}" alt="${proyecto.titulo}">
        `).join('');
        updateIndicators();
        updateSliderPosition();
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }

    function updateIndicators() {
        indicators.innerHTML = proyectos[currentProjectIndex].imagenes
            .map((_, i) => `<span class="${i === currentImageIndex ? 'active' : ''}"></span>`)
            .join('');
    }

    function navigate(direction) {
        const total = proyectos[currentProjectIndex].imagenes.length;
        currentImageIndex = (currentImageIndex + direction + total) % total;
        updateSliderPosition();
        updateIndicators();
    }

    // Event Listeners
    document.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    document.querySelector('.lightbox-prev').addEventListener('click', () => navigate(-1));
    document.querySelector('.lightbox-next').addEventListener('click', () => navigate(1));

    // Drag & Touch Events
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);

    function dragStart(e) {
        isDragging = true;
        startPosX = e.clientX || e.touches[0].clientX;
        slider.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        const currentX = e.clientX || e.touches[0].clientX;
        const deltaX = currentX - startPosX;
        slider.style.transform = `translateX(calc(-${currentImageIndex * 100}% + ${deltaX}px))`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        const deltaX = (e.clientX || e.changedTouches[0].clientX) - startPosX;
        const threshold = slider.offsetWidth * 0.1;

        if (Math.abs(deltaX) > threshold) {
            navigate(deltaX > 0 ? -1 : 1);
        } else {
            updateSliderPosition();
        }
        slider.style.transition = 'transform 0.5s ease';
    }

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') navigate(-1);
            if (e.key === 'ArrowRight') navigate(1);
            if (e.key === 'Escape') lightbox.classList.remove('active');
        }
    });
});