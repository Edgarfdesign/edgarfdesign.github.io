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
        
        lightboxSlider.innerHTML = '';
        lightboxIndicators.innerHTML = '';
    
        proyecto.imagenes.forEach((imagen, index) => {
            const img = document.createElement('img');
            img.src = imagen;
            img.alt = `Imagen ${index + 1} de ${proyecto.titulo}`;
            img.classList.add(index === currentImageIndex ? 'active' : '');
            lightboxSlider.appendChild(img);
        });
    }

    function updateSliderPosition() {
        const images = lightboxSlider.querySelectorAll('img');
        images.forEach((img, index) => {
            img.classList.remove('active', 'prev', 'next');
            if(index === currentImageIndex) {
                img.classList.add('active');
            } else if(index < currentImageIndex) {
                img.classList.add('prev');
            } else {
                img.classList.add('next');
            }
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