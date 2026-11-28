<template>
  <section id="desarrollo" class="section section--light dev" aria-labelledby="dev-h">
    <div class="wrap">
      <div class="dev__cabeza">
        <h2 id="dev-h" class="dev__titulo">Dos máquinas que ya trabajan solas</h2>
        <p class="dev__lead">Cuando el proyecto lo pide, dejo el diseño y escribo el código. Las dos de abajo están funcionando; su código no es público, pero te lo enseño en una llamada.</p>
      </div>
    </div>

    <div class="dev__duelo">
      <a class="dev__lado dev__lado--verde" href="#contacto">
        <span class="dev__fondo" aria-hidden="true"></span>
        <span class="dev__velo" aria-hidden="true"></span>
        <div class="dev__lado-in">
          <p class="dev__etiqueta">Bots · Comercio</p>
          <h3 class="dev__nombre">Un bot que vende por WhatsApp</h3>
          <p class="dev__desc">Atiende el catálogo, responde precios y toma el pedido sin que nadie esté pendiente del teléfono.</p>
          <ul class="dev__stack">
            <li>Python</li>
            <li>WhatsApp API</li>
            <li>DeepSeek</li>
          </ul>
          <span class="dev__flecha" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>
      </a>

      <a class="dev__lado dev__lado--violeta" href="#contacto">
        <span class="dev__fondo dev__fondo--mail" aria-hidden="true"></span>
        <span class="dev__velo" aria-hidden="true"></span>
        <div class="dev__lado-in">
          <p class="dev__etiqueta">Bots · Correo</p>
          <h3 class="dev__nombre">Un bot que ordena el correo</h3>
          <p class="dev__desc">Lee la bandeja, clasifica lo que llega y avisa en el canal correcto, sin abrir el correo.</p>
          <ul class="dev__stack">
            <li>Python</li>
            <li>Discord API</li>
            <li>IMAP</li>
          </ul>
          <span class="dev__flecha" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </span>
        </div>
      </a>
    </div>
  </section>
</template>
