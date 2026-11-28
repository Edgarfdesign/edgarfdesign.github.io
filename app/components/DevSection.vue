<template>
  <section id="desarrollo" class="section section--light dev" aria-labelledby="dev-h">
    <div class="wrap">
      <div class="dev__cabeza">
        <h2 id="dev-h" class="dev__titulo">Dos máquinas que ya trabajan solas</h2>
        <p class="dev__lead">Cuando el proyecto lo pide, dejo el diseño y escribo el código. Las dos de abajo están funcionando; su código no es público, pero te lo enseño en una llamada.</p>
      </div>
    </div>

    <article class="dev__fila">
      <div class="dev__texto">
        <p class="dev__etiqueta">Bots · Comercio</p>
        <h3 class="dev__nombre">Un bot que vende por WhatsApp</h3>
        <p class="dev__desc">Atiende el catálogo, responde precios y toma el pedido sin que nadie esté pendiente del teléfono.</p>
        <ul class="dev__stack">
          <li>Python</li>
          <li>WhatsApp API</li>
          <li>DeepSeek</li>
        </ul>
      </div>
      <div class="dev__shot dev__shot--der">
        <img
          src="/images/ai-projects/botwhatsapp-640.jpg"
          srcset="/images/ai-projects/botwhatsapp-640.jpg 640w, /images/ai-projects/Botwhatsapp.jpg 1080w"
          sizes="(max-width: 767px) 100vw, 52vw"
          alt="Conversación del bot de WhatsApp respondiendo el catálogo de una tienda de ropa"
          loading="lazy"
          width="1080"
          height="900"
        >
      </div>
    </article>

    <article class="dev__fila dev__fila--inversa">
      <div class="dev__texto">
        <p class="dev__etiqueta">Bots · Correo</p>
        <h3 class="dev__nombre">Un bot que ordena el correo</h3>
        <p class="dev__desc">Lee la bandeja, clasifica lo que llega y avisa en el canal correcto, sin abrir el correo.</p>
        <ul class="dev__stack">
          <li>Python</li>
          <li>Discord API</li>
          <li>IMAP</li>
        </ul>
      </div>
      <div class="dev__shot dev__shot--izq">
        <img
          src="/images/ai-projects/botdiscord-640.jpg"
          srcset="/images/ai-projects/botdiscord-640.jpg 640w, /images/ai-projects/Botdiscord.jpg 1080w"
          sizes="(max-width: 767px) 100vw, 52vw"
          alt="Canal de Discord donde el bot publica los correos ya clasificados"
          loading="lazy"
          width="1080"
          height="900"
        >
      </div>
    </article>
  </section>
</template>
