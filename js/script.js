document.addEventListener('DOMContentLoaded', () => {
    // Datos de proyectos
    const proyectos = [
        {
            titulo: "Branding Café Artesanal",
            imagenes: [
                "assets/images/proyectos/cafe-1.jpg",
                "assets/images/proyectos/cafe-2.jpg",
                "assets/images/proyectos/cafe-3.jpg"
            ],
            descripcion: "Diseño de identidad visual para cafetería premium",
            tags: ["Logo", "Packaging", "Branding"]
        },
        {
            titulo: "Ilustración Digital",
            imagenes: [
                "assets/images/proyectos/arte-1.jpg",
                "assets/images/proyectos/arte-2.jpg"
            ],
            descripcion: "Serie de ilustraciones para campaña publicitaria",
            tags: ["Photoshop", "Procreate", "Animación"]
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