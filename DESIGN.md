---
name: Edgarfdesign
description: Portafolio de un diseñador de marcas venezolano; el trabajo manda y la interfaz se retira.
colors:
  sala-oscura: "#0e0e11"
  pizarra: "#17171b"
  tiza: "#f4f3f7"
  ceniza: "#aeabb5"
  violeta-senal: "#5459f0"
  violeta-texto: "#8b8fff"
  papel-frio: "#f4f3f7"
  papel-sombreado: "#e8e6ee"
  tinta: "#16151a"
  grafito: "#4a4852"
  sala-negra: "#08080a"
  pantalla: "#000000"
typography:
  display:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 5.3vw, 4.75rem)"
    fontWeight: 500
    lineHeight: 0.98
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.75rem, 3.2vw, 2.875rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.35vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0em"
  lead:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.1vw, 1.125rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "0em"
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  frame: "26px"
  frame-inner: "22px"
  screen: "18px"
  pill: "999px"
  full: "50%"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.violeta-senal}"
    textColor: "{colors.tiza}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "46px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.tiza}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "46px"
  nav:
    backgroundColor: "{colors.sala-oscura}"
    textColor: "{colors.tiza}"
    height: "72px"
  panel:
    backgroundColor: "{colors.pizarra}"
    textColor: "{colors.tiza}"
    rounded: "{rounded.lg}"
    padding: "32px"
---

# Design System: Edgarfdesign

## Overview

**Creative North Star: "La sala de proyección"**

La página es una sala a oscuras y el trabajo es lo único iluminado. El fondo casi negro no es un tema oscuro de interfaz: es la penumbra que hace que la pared de piezas brille. La interfaz se retira —sin tarjetas con texto, sin etiquetas explicando lo que ya se ve— y deja que doce marcas reales ocupen la pared en placas contiguas.

El sistema tiene dos mundos y un solo interruptor. El mundo oscuro es el de la obra: portada, muro, video, desarrollo. El mundo claro es el de la explicación: la sección de servicios invierte los tokens en el mismo sitio, sobre papel frío, para que se lea como una hoja aparte dentro de la misma sala. Nada más cambia entre los dos: mismos tipos, mismos radios, mismo violeta.

El oficio está en las juntas: 3 px entre placas, filetes de un píxel al 14–16 % de tinta, y rellenos que separan por aire y no por líneas. La única decoración permitida es la que hace daño a nadie: un retrato circular en blanco y negro y un violeta escaso que solo aparece en lo que se puede pulsar.

**Key Characteristics:**
- Dos mundos de color con un solo interruptor de clase, no dos sistemas.
- Una sola familia tipográfica; la jerarquía la hace el tamaño y el tracking, nunca el peso de otra fuente.
- Cero sombras: la profundidad es tonal (`--surface` sobre `--bg`) más filetes.
- El muro no lleva leyendas, ni bordes, ni radio: las piezas hablan solas.
- El violeta es de las acciones, no del ambiente.

## Colors

Paleta de penumbra con un acento eléctrico: negros con un punto de azul, tiza casi blanca, y un violeta que solo se enciende donde hay algo que pulsar.

### Primary
- **Violeta de señal** (#5459f0): el único acento. Botones primarios, subrayados activos, el punto activo del slider y el anillo de foco. Nunca como fondo de sección ni como tinte de superficies grandes.
- **Violeta de texto** (#8b8fff): la versión legible del mismo tono sobre negro; sustituye al violeta base cuando el texto es pequeño.

### Neutral
- **Sala oscura** (#0e0e11): el fondo del mundo de la obra. Casi negro, con una gota de azul para que no sea un gris apagado.
- **Pizarra** (#17171b): la superficie elevada del mundo oscuro. Paneles, el marco del teléfono, el fondo bajo las fotos.
- **Tiza** (#f4f3f7): la tinta del mundo oscuro y, a la vez, el papel del mundo claro. El mismo valor cumple los dos papeles, y por eso los mundos se sienten hermanos.
- **Ceniza** (#aeabb5): texto secundario sobre negro, a 7:1 exactos. Por debajo de ese contraste no se baja.
- **Papel frío** (#f4f3f7): el fondo del mundo claro.
- **Papel sombreado** (#e8e6ee): la superficie del mundo claro, el panel de herramientas.
- **Tinta** (#16151a): el texto del mundo claro.
- **Grafito** (#4a4852): el secundario del mundo claro, también a 7:1.
- **Sala negra** (#08080a): el fondo de la galería, un escalón por debajo del negro de la página, para que la pieza flote.
- **Pantalla** (#000000): el interior del teléfono del video, donde la pieza manda y nada compite.

### Named Rules
**La regla del interruptor.** Los dos mundos comparten tokens; solo cambian sus valores dentro de `.section--light`. Un color nuevo del mundo claro sin su pareja oscura es un error, no una excepción.

**La regla del violeta escaso.** El violeta no decora: señala lo pulsable. Si aparece en una superficie que no se puede pulsar, sobra.

## Typography

**Display Font:** Schibsted Grotesk (con system-ui, Segoe UI)
**Body Font:** la misma familia, un solo archivo
**Label/Mono Font:** ninguna; el mono no se usa como disfraz de «técnico»

**Character:** Una grotesca de señalética, de contraformas abiertas y remates rectos. Al tamaño de portada se vuelve casi editorial; a tamaño de etiqueta, administrativa. La jerarquía se construye con tamaño y tracking negativo, no con una segunda familia ni con negritas.

### Hierarchy
- **Display** (500, `clamp(2.5rem, 5.3vw, 4.75rem)`, 0.98, tracking −0.05em): solo el h1 de la portada. Máximo tres líneas.
- **Headline** (500, `clamp(1.75rem, 3.2vw, 2.875rem)`, 1.05): los h2 de sección y el titular del cierre.
- **Title** (500, `clamp(1.125rem, 1.35vw, 1.625rem)`, 1.2): títulos de servicio y de tarjeta.
- **Body** (400, 1rem, 1.6): párrafos. Medida máxima 46–52ch; por encima de 60ch se parte en dos columnas.
- **Lead** (400, `clamp(1.0625rem, 1.1vw, 1.125rem)`, 1.55): la entradilla de cada sección, en `--muted`.
- **Label** (400, 0.8125rem, tracking 0.01em): datos, metadatos, pies de figura y el nombre de las herramientas.

### Named Rules
**La regla de una sola voz.** Ninguna sección introduce una familia nueva. Si algo necesita más énfasis, sube de tamaño o baja el tracking; no cambia de fuente.

**La regla del tracking.** Cuanto más grande el texto, más negativo el tracking: −0.05em a tamaño portada, −0.02em en títulos, 0 en cuerpo y etiquetas.

## Layout

Rejilla de 12 columnas con contenedor de 1280 px y canal de 24 px. Márgenes laterales de 80 px en escritorio, 48 px en tablet, 24 px en móvil. La barra superior mide 72 px y es fija.

Cada sección ocupa una pantalla exacta en escritorio (dos en el muro) y dos pantallas en pantallas pequeñas, donde el contenido crece por encima de ese mínimo. El relleno vertical es de 80 px arriba y 56 px abajo, y es la única separación entre secciones: no hay filetes horizontales a todo el ancho.

El muro es una rejilla de 4 columnas con juntas de 3 px y placas de proporción 2:3 en escritorio, cuadradas a dos columnas en móvil. Va dentro del contenedor, alineado con el resto de bloques.

## Elevation & Depth

No hay sombras en el sistema. La profundidad se consigue de dos maneras y solo de dos: el escalón tonal (`--surface` sobre `--bg`, o `--surface` sobre `--bg` claro) y el filete de un píxel con `color-mix` al 14–16 % de la tinta.

Eso obliga a que cualquier elevación nueva sea tonal. Una sombra difusa, un halo o un `drop-shadow` rompen el mundo: la página no tiene luz ambiental de la que colgar una sombra.

### Named Rules
**La regla plana.** Una superficie en reposo no proyecta sombra. Si algo necesita destacar sobre el fondo, se le cambia el escalón tonal, no se le añade profundidad falsa.

## Shapes

Tres radios de componente, dos de objeto y un círculo. `--r-sm` (6 px) para botones, enlaces y campos; `--r-md` (10 px) para medios y el panel pequeño; `--r-lg` (16 px) para el panel de herramientas. El marco del teléfono usa 26 px y su pantalla 18 px, con 22 px en el borde interior: son radios de objeto, no de componente, y por eso no entran en la escala. Las píldoras de herramientas usan 999 px. El retrato es el único círculo del sistema (50 %) y por eso funciona como firma.

Las placas del muro son la excepción deliberada: radio 0 y sin borde. La cuadrícula las une con 3 px de fondo, así que el conjunto lee como una sola pieza partida, no como doce tarjetas.

## Components

### Buttons
- **Shape:** rectángulo de radio pequeño (6 px), 46 px de alto, relleno horizontal de 24 px.
- **Primary:** violeta de señal con tiza; el texto va en 0.9375rem y peso 500.
- **Hover / Focus:** el primary aclara el fondo y sube 1 px; el ghost pasa a `--surface` con borde más marcado. En pulsación, ambos bajan 1 px y escalan a 0.985 durante 90 ms.
- **Ghost:** fondo transparente, borde al 28 % de tinta, mismo tamaño y ritmo que el primary.

### Cards / Containers
- **Corner Style:** el panel usa radio grande (16 px); las placas del muro, ninguno.
- **Background:** `--surface` sobre `--bg`, un solo escalón.
- **Shadow Strategy:** ninguna; ver Elevation & Depth.
- **Border:** solo el panel del mundo oscuro; el resto se separa por tono.
- **Internal Padding:** 32 px en el panel, 24 px en su interior.

### Navigation
- **Style:** barra fija de 72 px, fondo `--bg`, filete inferior de un píxel. Nombre de marca con el isotipo a 26 px y cuatro enlaces más un botón primario.
- **States:** el enlace activo lleva subrayado de un píxel; el hover baja el tono a `--muted`. En móvil se convierte en un botón de menú y una hoja a pantalla completa.

### Muro de trabajo
- **Qué es:** doce enlaces con una pieza cada uno que abren la galería del proyecto completo. En reposo no muestran texto.
- **Etiqueta:** el nombre y el año aparecen sobre un degradado al pasar el ratón o al enfocar con el teclado. Nunca son una leyenda fija y no existen en táctil, donde el contexto lo da la galería.
- **Comportamiento:** la imagen escala a 1.045 en hover, 1.02 en pulsación. El foco dibuja un anillo interior de 3 px en violeta con 5 px de separación del borde, por encima de la imagen.
- **Regla:** el muro está mudo en reposo. Ni nombre, ni año, ni disciplina fijos; la etiqueta solo responde a la intención.

### Retrato
- **Qué es:** la foto del diseñador, en blanco y negro, en un círculo de 411 px que acaba en el margen derecho.
- **Regla:** el círculo es la única forma curva del sistema; no se repite en otro elemento.

## Do's and Don'ts

### Do:
- **Do** mantener el violeta por debajo del 10 % de cualquier pantalla: botones, punto activo y anillo de foco.
- **Do** usar `--muted` para todo el texto secundario, y comprobar que llega a 7:1 en los dos mundos.
- **Do** separar secciones con aire (80/56 px) y con el cambio de mundo, nunca con una línea a todo el ancho.
- **Do** dejar que las piezas del muro lleguen a las dos líneas del contenedor, con sus 3 px de junta.
- **Do** mantener el retrato en blanco y negro: el color de la página viene de las marcas, no de la foto.

### Don't:
- **Don't** poner leyendas fijas bajo las imágenes del muro: la etiqueta aparece al buscar, no antes.
- **Don't** añadir sombras, halos o desenfoques decorativos: el sistema es plano y tonal.
- **Don't** introducir una segunda familia tipográfica para «dar carácter».
- **Don't** usar el violeta como fondo de sección ni como degradado; solo como señal de acción.
- **Don't** cambiar el radio de las placas del muro: su esquina recta es lo que las une.
