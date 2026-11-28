<template>
  <section id="servicios" class="section section--light serv" aria-labelledby="serv-h">
    <div class="wrap">
      <div class="serv__cabeza">
        <h2 id="serv-h" class="serv__titulo">Tres cosas, y ninguna a medias</h2>
        <p class="serv__lead">Trabajo solo. Lo que entra por la puerta lo hago yo, de la primera idea a la entrega, sin pasarlo a nadie.</p>
      </div>

      <ol class="serv__filas">
        <li>
          <span class="serv__num" aria-hidden="true">01</span>
          <h3 class="serv__nombre">Identidad visual</h3>
          <p class="serv__detalle">Logotipo, paleta y tipografía, con todas sus aplicaciones: papelería, empaque y señalética.</p>
        </li>
        <li>
          <span class="serv__num" aria-hidden="true">02</span>
          <h3 class="serv__nombre">Contenido vertical</h3>
          <p class="serv__detalle">Piezas de nueve por dieciséis para Reels, TikTok y Stories, animadas y listas para publicar.</p>
        </li>
        <li>
          <span class="serv__num" aria-hidden="true">03</span>
          <h3 class="serv__nombre">Diseño web</h3>
          <p class="serv__detalle">Landings y sitios que se ven bien en un teléfono, entregados como archivos planos.</p>
        </li>
      </ol>

      <p class="serv__nota">
        Lo que no hago —campañas de medios, fotografía de producto, aplicaciones con backend— te lo digo antes de empezar.
      </p>
    </div>

    <div class="serv__banda">
      <div class="wrap serv__banda-in">
        <div class="banda__bloque">
          <p class="banda__titulo">Con qué trabajo</p>
          <ul class="herramientas">
            <li title="Photoshop"><img src="/images/icons/photoshop.svg" alt="Photoshop" width="34" height="34" loading="lazy"></li>
            <li title="Illustrator"><img src="/images/icons/illustrator.svg" alt="Illustrator" width="34" height="34" loading="lazy"></li>
            <li title="InDesign"><img src="/images/icons/adobe-indesign.svg" alt="InDesign" width="34" height="34" loading="lazy"></li>
            <li title="After Effects"><img src="/images/icons/after-effects.svg" alt="After Effects" width="34" height="34" loading="lazy"></li>
            <li title="Blender"><img src="/images/icons/logos-blender.svg" alt="Blender" width="34" height="34" loading="lazy"></li>
          </ul>
          <a class="banda__cv" href="/assets/docs/CV-Edgar-Fernandez.pdf" download>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v11m0 0 4-4m-4 4-4-4M5 19h14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Descargar el CV</span>
          </a>
        </div>

        <div class="banda__bloque banda__bloque--precio">
          <p class="banda__titulo">Precio y plazo</p>
          <p class="banda__cifra">100&nbsp;$ a 300&nbsp;$</p>
          <p class="banda__plazo">De dos a cuatro semanas, según lo que incluya.</p>
          <p class="banda__nota">Te lo confirmo por escrito antes de empezar.</p>
        </div>
      </div>
    </div>
  </section>
</template>
