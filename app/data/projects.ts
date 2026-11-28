// Los doce proyectos. Anadir uno es anadir un objeto aqui.
export interface Project {
  slug: string
  resumen?: string
  manual?: boolean
  tipografia?: string
  colores?: string
  encargo?: string
  concepto?: string
  name: string
  year: string
  discipline: string
  cover: string
  thumb: string
  thumbMobile: string
  images: string[]
}

export const projects: Project[] = [
  {
    "slug": "tecnoventas",
    "resumen": "Una marca de venta de tecnologia con manual de uso: simbolo, retícula, versiones y escala resueltos antes de tocar una aplicacion.",
    "manual": true,
    "tipografia": "Tw Cen MT Condensed",
    "colores": "Azul y verde",
    "concepto": "El simbolo junta el icono de encender un equipo con una herramienta de taller. Tecnoventas vive del servicio tecnico de reparacion, y la marca lo dice antes de que nadie lea el nombre.",
    "year": "2020",
    "discipline": "Branding",
    "cover": "images/proyectos/TV1.webp",
    "thumb": "images/proyectos/t-TV1.webp",
    "thumbMobile": "images/proyectos/m-TV1.webp",
    "images": [
      "images/proyectos/TV1.webp",
      "images/proyectos/TV2.1.webp",
      "images/proyectos/TV2.webp",
      "images/proyectos/TV3.webp",
      "images/proyectos/TV4.webp",
      "images/proyectos/TV5.webp",
      "images/proyectos/TV6.webp",
      "images/proyectos/TV7.webp",
      "images/proyectos/TV8.webp"
    ]
  },
  {
    "slug": "culperma",
    "name": "Culperma",
    "year": "2019",
    "discipline": "Branding",
    "cover": "images/proyectos/CP1.webp",
    "thumb": "images/proyectos/t-CP1.webp",
    "thumbMobile": "images/proyectos/m-CP1.webp",
    "images": [
      "images/proyectos/CP1.webp",
      "images/proyectos/CP2.webp",
      "images/proyectos/CP3.webp",
      "images/proyectos/CP4.webp",
      "images/proyectos/CP5.webp",
      "images/proyectos/CP6.webp",
      "images/proyectos/CP7.webp",
      "images/proyectos/CP8.webp"
    ]
  },
  {
    "slug": "mymy",
    "name": "MyMy",
    "year": "2022",
    "discipline": "Branding",
    "cover": "images/proyectos/MY01.webp",
    "thumb": "images/proyectos/t-MY01.webp",
    "thumbMobile": "images/proyectos/m-MY01.webp",
    "images": [
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
      "images/proyectos/MY16.webp"
    ]
  },
  {
    "slug": "maxima-bisuteria",
    "name": "Máxima Bisutería",
    "year": "2022",
    "discipline": "Branding",
    "cover": "images/proyectos/MB01.webp",
    "thumb": "images/proyectos/t-MB01.webp",
    "thumbMobile": "images/proyectos/m-MB01.webp",
    "images": [
      "images/proyectos/MB01.webp",
      "images/proyectos/MB02.webp",
      "images/proyectos/MB03.webp",
      "images/proyectos/MB04.webp",
      "images/proyectos/MB05.webp",
      "images/proyectos/MB06.webp"
    ]
  },
  {
    "slug": "calza-yoing",
    "name": "Calza Yoing",
    "year": "2021",
    "discipline": "Branding",
    "cover": "images/proyectos/CY01.webp",
    "thumb": "images/proyectos/t-CY01.webp",
    "thumbMobile": "images/proyectos/m-CY01.webp",
    "images": [
      "images/proyectos/CY01.webp",
      "images/proyectos/CY02.webp",
      "images/proyectos/CY03.webp",
      "images/proyectos/CY04.webp",
      "images/proyectos/CY05.webp",
      "images/proyectos/CY06.webp",
      "images/proyectos/CY07.webp",
      "images/proyectos/CY08.webp",
      "images/proyectos/CY09.webp",
      "images/proyectos/CY10.webp"
    ]
  },
  {
    "slug": "yannilucio",
    "name": "Yannilucio",
    "year": "2024",
    "discipline": "Branding",
    "cover": "images/proyectos/Y1.webp",
    "thumb": "images/proyectos/t-Y1.webp",
    "thumbMobile": "images/proyectos/m-Y1.webp",
    "images": [
      "images/proyectos/Y1.webp",
      "images/proyectos/Y2.webp",
      "images/proyectos/Y3.webp",
      "images/proyectos/Y4.webp",
      "images/proyectos/Y5.webp",
      "images/proyectos/Y6.webp",
      "images/proyectos/Y7.webp",
      "images/proyectos/Y8.webp",
      "images/proyectos/Y9.webp"
    ]
  },
  {
    "slug": "italplumbing",
    "name": "Italplumbing",
    "year": "2024",
    "discipline": "Branding",
    "cover": "images/proyectos/IP0.webp",
    "thumb": "images/proyectos/t-IP0.webp",
    "thumbMobile": "images/proyectos/m-IP0.webp",
    "images": [
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
    ]
  },
  {
    "slug": "miniabasto-liz",
    "name": "Miniabasto Liz",
    "year": "2020",
    "discipline": "Branding",
    "cover": "images/proyectos/MAL1.webp",
    "thumb": "images/proyectos/t-MAL1.webp",
    "thumbMobile": "images/proyectos/m-MAL1.webp",
    "images": [
      "images/proyectos/MAL1.webp",
      "images/proyectos/MAL2.webp"
    ]
  },
  {
    "slug": "asuntos-legales",
    "name": "Asuntos Legales",
    "year": "2021",
    "discipline": "Branding",
    "cover": "images/proyectos/AL1.webp",
    "thumb": "images/proyectos/t-AL1.webp",
    "thumbMobile": "images/proyectos/m-AL1.webp",
    "images": [
      "images/proyectos/AL1.webp",
      "images/proyectos/AL2.webp"
    ]
  },
  {
    "slug": "e-cat-technology",
    "name": "E-cat Technology",
    "year": "2022",
    "discipline": "Branding",
    "cover": "images/proyectos/EC1.webp",
    "thumb": "images/proyectos/t-EC1.webp",
    "thumbMobile": "images/proyectos/m-EC1.webp",
    "images": [
      "images/proyectos/EC1.webp",
      "images/proyectos/EC2.webp",
      "images/proyectos/EC3.webp",
      "images/proyectos/EC4.webp"
    ]
  },
  {
    "slug": "albert-super-hamburguesas",
    "name": "Albert Super Hamburguesas",
    "year": "2023",
    "discipline": "Branding",
    "cover": "images/proyectos/ASH2.webp",
    "thumb": "images/proyectos/t-ASH2.webp",
    "thumbMobile": "images/proyectos/m-ASH2.webp",
    "images": [
      "images/proyectos/ASH2.webp",
      "images/proyectos/ASH3.webp",
      "images/proyectos/ASH1.webp",
      "images/proyectos/ASH4.webp"
    ]
  },
  {
    "slug": "auto-servicio-zamper",
    "name": "Auto Servicio Zamper",
    "year": "2022",
    "discipline": "Branding",
    "cover": "images/proyectos/ASZ1.webp",
    "thumb": "images/proyectos/t-ASZ1.webp",
    "thumbMobile": "images/proyectos/m-ASZ1.webp",
    "images": [
      "images/proyectos/ASZ1.webp"
    ]
  }
]

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)
export const nextOf = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug)
  return projects[(i + 1) % projects.length]
}
