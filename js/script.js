document.addEventListener('DOMContentLoaded', () => {
    // Datos de proyectos
    const proyectos = [
        {
            titulo: "Tecnoventas",
            imagenes: [
                "images/proyectos/TV1.jpg",
                "images/proyectos/TV2.1.jpg",
                "images/proyectos/TV2.jpg",
                "images/proyectos/TV3.jpg",
                "images/proyectos/TV4.jpg",
                "images/proyectos/TV5.jpg",
                "images/proyectos/TV6.jpg",
                "images/proyectos/TV7.jpg",
                "images/proyectos/TV8.jpg"
            ],
            descripcion: "Tecnoventas es una empresa de tecnología especializada en la reparación de equipos de cómputo. Ofrecen un servicio integral con profesionales altamente capacitados y tecnologías de última generación, garantizando soluciones rápidas y eficientes.",
            tags: ["Logo", "Photoshop", "Ilustrator"]
        },
        {
            titulo: "Culperma",
            imagenes: [
                "images/proyectos/CP1.jpg",
                "images/proyectos/CP2.jpg",
                "images/proyectos/CP3.jpg",
                "images/proyectos/CP4.jpg",
                "images/proyectos/CP5.jpg",
                "images/proyectos/CP6.jpg",
                "images/proyectos/CP7.jpg",
                "images/proyectos/CP8.jpg",
            ],
            descripcion: "Culperma es una empresa agroecológica que ofrece productos sustentables y orgánicos. Sus prácticas respetuosas con el medio ambiente aseguran productos de alta calidad, protegiendo la biodiversidad y promoviendo un uso responsable de los recursos naturales.",
            tags: ["Photoshop", "ilustrator", "Branding"]
        }
    ];

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
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxIndicators = document.querySelector('.lightbox-indicators');
    let currentProjectIndex = 0;
    let currentImageIndex = 0;

    function openLightbox(projectIndex) {
        currentProjectIndex = projectIndex;
        currentImageIndex = 0;
        updateLightbox();
        lightbox.classList.add('active');
    }

    function updateLightbox() {
        const proyecto = proyectos[currentProjectIndex];
        lightboxImage.src = proyecto.imagenes[currentImageIndex];
        
        lightboxIndicators.innerHTML = proyecto.imagenes
            .map((_, i) => `<span class="${i === currentImageIndex ? 'active' : ''}"></span>`)
            .join('');
        
        document.querySelectorAll('.lightbox-indicators span').forEach((span, index) => {
            span.addEventListener('click', () => {
                currentImageIndex = index;
                updateLightbox();
            });
        });
    }

    // Event Listeners
    document.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    document.querySelector('.lightbox-prev').addEventListener('click', () => {
        currentImageIndex = currentImageIndex > 0 
            ? currentImageIndex - 1 
            : proyectos[currentProjectIndex].imagenes.length - 1;
        updateLightbox();
    });

    document.querySelector('.lightbox-next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % proyectos[currentProjectIndex].imagenes.length;
        updateLightbox();
    });

    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.classList.remove('active');
    });

    document.addEventListener('keydown', (e) => {
        if(lightbox.classList.contains('active')) {
            switch(e.key) {
                case 'ArrowLeft':
                    currentImageIndex = currentImageIndex > 0 
                        ? currentImageIndex - 1 
                        : proyectos[currentProjectIndex].imagenes.length - 1;
                    updateLightbox();
                    break;
                case 'ArrowRight':
                    currentImageIndex = (currentImageIndex + 1) % proyectos[currentProjectIndex].imagenes.length;
                    updateLightbox();
                    break;
                case 'Escape':
                    lightbox.classList.remove('active');
                    break;
            }
        }
    });
});