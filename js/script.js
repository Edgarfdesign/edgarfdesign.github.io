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
            descripcion: "Tecnoventas es una empresa tecnológica que se especializa en la reparación de equipos de cómputo. Ofrecen un servicio integral con profesionales capacitados y tecnologías de última generación, asegurando soluciones rápidas y eficientes.",
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
            descripcion: "Culperma es una empresa agroecológica que ofrece productos sustentables y orgánicos. Se destaca por sus prácticas ambientales responsables, protegiendo la biodiversidad y promoviendo el uso responsable de los recursos naturales.",
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