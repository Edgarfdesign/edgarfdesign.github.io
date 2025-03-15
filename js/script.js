let currentProjects = []; // Añade esto al inicio de tu JS
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
        track.style.animation = 'slide 200s linear infinite';
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "https://www.instagram.com/tecnoventas12/",
                text: "¡Visita su Instagram!"
            },
            year: 2020 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "https://www.instagram.com/culperma/",
                text: "¡Visita su Instagram!"
            },
            year: 2019 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2022 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2022 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "https://www.instagram.com/calzayoingca/",
                text: "¡Visita su Instagram!"
            },
            year: 2021 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "https://www.youtube.com/@yannilucio/featured",
                text: "¡Visita su canal de Youtube!"
            },
            year: 2024 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "https://italplumbing.cl/",
                text: "¡Visita su página web!"
            },
            year: 2024 // Nuevo campo
        },
        {
            titulo: "Miniabasto Liz",
            imagenes: [
                "images/proyectos/MAL1.webp",
                "images/proyectos/MAL2.webp"  
            ],
            descripcion: "Liz es un miniabasto que combina practicidad y calidez, ofreciendo productos esenciales en un espacio pequeño pero completo, ideal para compras rápidas y cercanas.",
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2020 // Nuevo campo
        },
        {
            titulo: "Asuntos Legales",
            imagenes: [
                "images/proyectos/AL1.webp",
                "images/proyectos/AL2.webp"  
            ],
            descripcion: "Asuntos Legales es tu aliado confiable en soluciones jurídicas. Con profesionalismo, claridad y un enfoque personalizado, brindamos asesoría legal eficiente para resolver tus necesidades con integridad y compromiso.",
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2021 // Nuevo campo
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
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2022 // Nuevo campo
        },
        {
            titulo: "Albert Super Hamburguesas",
            imagenes: [
                "images/proyectos/ASH2.webp",
                "images/proyectos/ASH3.webp",
                "images/proyectos/ASH1.webp",
                "images/proyectos/ASH4.webp",  
            ],
            descripcion: "Donde la ciencia culinaria se fusiona con el arte de la hamburguesa. Nuestras creaciones, inspiradas en el genio innovador de Albert, mezclan cortes premium, ingredientes inesperados y panes artesanales horneados al instante. Cada bocado es una explosión de sabores audaces y texturas perfectas.",
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2023 // Nuevo campo
        },
        {
            titulo: "Auto Servicio Zamper",
            imagenes: [
                "images/proyectos/ASZ1.webp",
                  
            ],
            descripcion: "Tu taller mecánico de confianza, donde la tecnología y la precisión se alían para dar vida a tu vehículo. Diagnóstico avanzado, mantenimiento experto y reparaciones complejas con atención personalizada y soluciones rápidas.",
            tags: ["Branding"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
                { nombre: "Illustrator", icono: "images/icons/illustrator.svg" }
            ],
            link: { // Nuevo campo
                url: "",
                text: ""
            },
            year: 2022 // Nuevo campo
        },
        {
            titulo: "Conejo entre los Arboles",
            imagenes: [
                "images/proyectos/collage1.webp",
                "images/proyectos/image1.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lets-make-a-collage-a-contest-for-all-creatives-on-hive-round-103-space-travel-rabbit-among-the-trees",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Patinaje sobre hielo",
            imagenes: [
                "images/proyectos/collage2.webp",
                "images/proyectos/image2.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/tztfoxyw",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "La Puerta al Cielo",
            imagenes: [
                "images/proyectos/collage3.webp",
                "images/proyectos/image3.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/zbdtpuru",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Templo de Buda moderno",
            imagenes: [
                "images/proyectos/collage4.webp",
                "images/proyectos/image4.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-108-modern-buddha-temple",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Llegando por la noche",
            imagenes: [
                "images/proyectos/collage5.webp",
                "images/proyectos/image5.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-110-arriving-at-night",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Materia oscura",
            imagenes: [
                "images/proyectos/collage6.webp",
                "images/proyectos/image6.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/hzdrzkqr",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Hermosa Primavera",
            imagenes: [
                "images/proyectos/collage7.webp",
                "images/proyectos/image7.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-113-beautiful-spring",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "El amanecer de la paz",
            imagenes: [
                "images/proyectos/collage8.webp",
                "images/proyectos/image8.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-115-the-dawn-of-peace",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Oso en busca de madriguera",
            imagenes: [
                "images/proyectos/collage9.webp",
                "images/proyectos/image9.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-116-bear-looking-for-burrow",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Leopard Volkswagen",
            imagenes: [
                "images/proyectos/collage10.webp",
                "images/proyectos/image10.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/round-117-leopard-volkswagen-late-but-sure",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Búho de ojos de trueno",
            imagenes: [
                "images/proyectos/collage11.webp",
                "images/proyectos/image11.webp"
                
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-118-thunder-eyed-owl",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Choque dimensional",
            imagenes: [
                "images/proyectos/collage12.webp",
                "images/proyectos/image12.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-119-dimensional-shock",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Enamorarse te lleva a otro mundo",
            imagenes: [
                "images/proyectos/collage13.webp",
                "images/proyectos/image13.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-120-falling-in-love-takes-you-to-another-world",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "La chica de los planetas dueña de las aves",
            imagenes: [
                "images/proyectos/collage14.webp",
                "images/proyectos/image14.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "http://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-120-the-girl-of-the-planets-owner-of-the-birds",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Una noche con dragones",
            imagenes: [
                "images/proyectos/collage15.webp",
                "images/proyectos/image15.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-122-a-night-with-dragons",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "La reina de la primavera",
            imagenes: [
                "images/proyectos/collage16.webp",
                "images/proyectos/image16.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "http://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-124-the-queen-of-spring",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "La caída de Terra Luna",
            imagenes: [
                "images/proyectos/collage17.webp",
                "images/proyectos/image17.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-125-the-fall-of-terra-luna",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Express colorido",
            imagenes: [
                "images/proyectos/collage18.webp",
                "images/proyectos/image18.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Viajar en moto con un amigo",
            imagenes: [
                "images/proyectos/collage19.webp",
                "images/proyectos/image19.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-129-traveling-by-motorcycle-with-a-friend",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Aventura mágica con la tortuga",
            imagenes: [
                "images/proyectos/collage20.webp",
                "images/proyectos/image20.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-130-magic-adventure-with-the-turtle",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Un Hobbit en vamos a hacer un Collage",
            imagenes: [
                "images/proyectos/collage21.webp",
                "images/proyectos/image21.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-132-a-hobbit-in-let-s-make-a-collage",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Fuerzas del mundo Natural",
            imagenes: [
                "images/proyectos/collage22.webp",
                "images/proyectos/image22.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-133-forces-of-the-natural-world",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Metamorfosis de una Leona",
            imagenes: [
                "images/proyectos/collage23.webp",
                "images/proyectos/image23.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-135-metamorphosis-of-a-lioness",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Los Campos Elíseos",
            imagenes: [
                "images/proyectos/collage24.webp",
                "images/proyectos/image24.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-136-the-elysian-fields",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "La Fuente de la Juventud",
            imagenes: [
                "images/proyectos/collage25.webp",
                "images/proyectos/image25.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-hive-creatives-round-139-the-fountain-of-youth",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "El Cóndor pasa!",
            imagenes: [
                "images/proyectos/collage26.webp",
                "images/proyectos/image26.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/free-collage-the-condor-passes",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Campamento bajo las Estrellas",
            imagenes: [
                "images/proyectos/collage27.webp",
                "images/proyectos/image27.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-fe4963802cdd2",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Nacimiento de una estrella",
            imagenes: [
                "images/proyectos/collage28.webp",
                "images/proyectos/image28.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-fdc153b6c2b82",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Inspiración de Dios de la guerra ragnarok",
            imagenes: [
                "images/proyectos/collage29.webp",
                "images/proyectos/image29.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-011f55baff6f8",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Viajando en un Zapato",
            imagenes: [
                "images/proyectos/collage30.webp",
                "images/proyectos/image30.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-free-collage-traveling-in",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Cráneos del más allá",
            imagenes: [
                "images/proyectos/collage31.webp",
                "images/proyectos/image31.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-472cef9fe8369",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Cuando el viento te Sopla",
            imagenes: [
                "images/proyectos/collage32.webp",
                "images/proyectos/image32.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-ed4fe90f1f0f3",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "¡Colmena a la Luna!",
            imagenes: [
                "images/proyectos/collage33.webp",
                "images/proyectos/image33.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/freestyle-collage-hive-to-the",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Protegiendo el tesoro",
            imagenes: [
                "images/proyectos/collage34.webp",
                "images/proyectos/image34.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "http://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-2573ce14b556a",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Siempre hay algo que nos Cuida",
            imagenes: [
                "images/proyectos/collage35.webp",
                "images/proyectos/image35.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-95de4cd70cb1a",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Mi primer año en LMAC",
            imagenes: [
                "images/proyectos/collage36.webp",
                "images/proyectos/image36.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-55ca0644a2c4c",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Aquí viene el sol",
            imagenes: [
                "images/proyectos/collage37.webp",
                "images/proyectos/image37.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/freestyle-collage-round-154-here",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Pez extraterrestre devora gatos",
            imagenes: [
                "images/proyectos/collage38.webp",
                "images/proyectos/image38.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-c7baab553cb77",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Ciudadela de los Dragones",
            imagenes: [
                "images/proyectos/collage39.webp",
                "images/proyectos/image39.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/freestyle-collage-round-157-citadel",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Pueblo Encantado",
            imagenes: [
                "images/proyectos/collage40.webp",
                "images/proyectos/image40.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-a2f2e3ddd6181",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Matrimonio entre las nubes",
            imagenes: [
                "images/proyectos/collage41.webp",
                "images/proyectos/image41.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-d1a357024ab8a",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "El Ciervo y el Gato",
            imagenes: [
                "images/proyectos/collage42.webp",
                "images/proyectos/image42.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-1401782308f09",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Supernova",
            imagenes: [
                "images/proyectos/collage43.webp",
                "images/proyectos/image43.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-2e97131f422b1",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Portal para ir a otro Mundo",
            imagenes: [
                "images/proyectos/collage44.webp",
                "images/proyectos/image44.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-a0e6785e5d8ac",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Garzas Mágicas",
            imagenes: [
                "images/proyectos/collage45.webp",
                "images/proyectos/image45.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/freestyle-collage-round-161-magic",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Regiones del mundo Pokémon",
            imagenes: [
                "images/proyectos/collage46.webp",
                "images/proyectos/image46.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-7b1b9958289ba",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Pasaje a la Cuarta dimención",
            imagenes: [
                "images/proyectos/collage47.webp",
                "images/proyectos/image47.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/lmac-a-contest-for-all-017f5f8714159",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "¡Cuidado con el gato, guacamayo!",
            imagenes: [
                "images/proyectos/collage48.webp",
                "images/proyectos/image48.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/freestyle-collage-round-164-watch",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Expecto Patronum",
            imagenes: [
                "images/proyectos/collage49.webp",
                "images/proyectos/image49.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/freestyle-collage-round-174-expecto",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        },
        {
            titulo: "Duck Gansters",
            imagenes: [
                "images/proyectos/collage50.webp",
                "images/proyectos/image50.webp"
                
                  
            ],
            descripcion: "",
            tags: ["Collage"],
            softwareIcons: [ // Nuevo campo
                { nombre: "Photoshop", icono: "images/icons/photoshop.svg" },
            ],
            link: { // Nuevo campo
                url: "https://hive.blog/hive-174695/@edgarafernandezp/round-178-duck-gansters",
                text: "Lee más sobre este collage..."
            },
            year: 2021 // Nuevo campo
        }
        
     
    ];

    generarFiltros(); // Añade esta línea después de inicializar todo
    filtrarProyectos({ target: document.querySelector('[data-tag="todos"]') }); // Mostrar todos al inicio

    // Función para generar los botones de filtro
function generarFiltros() {
    const contenedorFiltros = document.querySelector('.filtros-proyectos');
    const tagsUnicos = ['todos']; // Empezamos con el botón "Mostrar Todos"
    
    // Obtener tags únicos de todos los proyectos
    proyectos.forEach(proyecto => {
        proyecto.tags.forEach(tag => {
            if (!tagsUnicos.includes(tag.toLowerCase())) {
                tagsUnicos.push(tag.toLowerCase());
            }
        });
    });

    // Generar botones
    tagsUnicos.forEach(tag => {
        const boton = document.createElement('button');
        boton.className = `filtro-btn ${tag === 'todos' ? 'active' : ''}`;
        boton.dataset.tag = tag;
        boton.textContent = tag === 'todos'
            ? 'Mostrar Todos'
            : tag.charAt(0).toUpperCase() + tag.slice(1);
        contenedorFiltros.appendChild(boton);
    });

    // Event listeners para los botones
    document.querySelectorAll('.filtro-btn').forEach(boton => {
        boton.addEventListener('click', filtrarProyectos);
    });
}

// Función para filtrar proyectos
function filtrarProyectos(e) {
    const tag = e.target.dataset.tag;
    const grid = document.querySelector('.proyectos-grid');
    const cards = document.querySelectorAll('.proyecto-card');

    // Animación de salida
    cards.forEach(card => {
        card.classList.add('fade-out');
    });
    
    // Actualizar botones activos con transición
    document.querySelectorAll('.filtro-btn').forEach(boton => {
        boton.classList.remove('active');
    });
    e.target.classList.add('active');

    // Esperar a que termine la animación de salida
    setTimeout(() => {
        // Filtrar proyectos
        const proyectosFiltrados = tag === 'todos' 
            ? proyectos 
            : proyectos.filter(proyecto => 
                proyecto.tags.some(proyectoTag => 
                    proyectoTag.toLowerCase() === tag
                )
            );

        // Limpiar grid
        grid.innerHTML = '';

        // Generar nuevos proyectos con animación de entrada
        proyectosFiltrados.forEach((proyecto, index) => {
            const card = document.createElement('div');
            card.className = 'proyecto-card';
            card.innerHTML = `
                <img src="${proyecto.imagenes[0]}" alt="${proyecto.titulo}" loading="lazy">
                <div class="card-content">
                    <h3>${proyecto.titulo}</h3>
                    <p>${proyecto.descripcion}</p>
                    ${proyecto.link ? // Agregar link si existe
                        `<a href="${proyecto.link.url}" target="_blank" class="proyecto-link">
                            ${proyecto.link.text}
                        </a>` : ''}
                    
                    <div class="proyecto-meta">
                        ${proyecto.softwareIcons ? // Agregar iconos de software
                            `<div class="software-icons">
                                ${proyecto.softwareIcons.map(icon => `
                                    <img src="${icon.icono}" alt="${icon.nombre}" title="${icon.nombre}">
                                `).join('')}
                            </div>` : ''}
                        
                        <span class="proyecto-year">${proyecto.year}</span>
                    </div>
                    <div class="tags">${proyecto.tags.map(tag => `<span>${tag}</span>`).join('')}</div>
                </div>
            `;
            
            card.addEventListener('click', () => openLightbox(index, proyectosFiltrados));
            
            // Agregar animación de entrada
            card.style.animation = `cardEntrance 0.5s ease ${index * 0.05}s forwards`;
            card.style.opacity = '0';
            
            grid.appendChild(card);
        });
    }, 100); // Tiempo igual a la duración de la animación de salida
}
 


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

    // Modifica la función openLightbox para recibir la lista filtrada
    function openLightbox(index, proyectosFiltrados = proyectos) {
    currentProjectIndex = index;
    currentProjects = proyectosFiltrados; // Nueva variable global
    currentImageIndex = 0; // <- Añade esta línea
    loadImages();
    lightbox.classList.add('active');
    }

    function loadImages() {
        const proyecto = currentProjects[currentProjectIndex]; // ← Usar currentProjects
        slider.innerHTML = proyecto.imagenes.map(img => `
            <img src="${img}" alt="${proyecto.titulo}">
        `).join('');

        // Añade estas líneas:
        currentImageIndex = 0; // Doble seguro
        slider.style.transform = 'translateX(0)'
        updateIndicators();
        updateSliderPosition();
    }

    function updateSliderPosition() {
        slider.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }

    function updateIndicators() {
        indicators.innerHTML = currentProjects[currentProjectIndex].imagenes // ← currentProjects
            .map((_, i) => `<span class="${i === currentImageIndex ? 'active' : ''}"></span>`)
            .join('');
    }

    // Actualiza la navegación del lightbox para usar currentProjects
    function navigate(direction) {
        const total = currentProjects[currentProjectIndex].imagenes.length; // ← currentProjects
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