<template>
  <section id="desarrollo" class="section dev" aria-labelledby="dev-h">
    <div class="wrap">
      <div class="dev__cabeza">
        <h2 id="dev-h" class="dev__titulo">Dos máquinas que ya trabajan solas</h2>
        <p class="dev__lead">Cuando el proyecto lo pide, dejo el diseño y escribo el código. Las dos de abajo están funcionando; su código no es público, pero te lo enseño en una llamada.</p>
      </div>

      <div class="dev__par">
        <article class="dev__bot">
          <div class="dev__flujo" aria-hidden="true">
            <span class="chapa"><img src="/images/icons/whatsapp-icon.svg" alt="" width="36" height="36" loading="lazy"></span>
            <span class="dev__hilo"><i class="dev__punto"></i></span>
            <span class="chapa"><img class="chapa--trazo" src="/images/icons/ui-store.svg" alt="" width="34" height="34" loading="lazy"></span>
          </div>
          <p class="dev__flujo-pie">Entra un mensaje · sale un pedido</p>

          <p class="dev__etiqueta">Bots · Comercio</p>
          <h3 class="dev__nombre">Un bot que vende por WhatsApp</h3>
          <p class="dev__desc">Atiende el catálogo, responde precios y toma el pedido sin que nadie esté pendiente del teléfono.</p>
          <ul class="dev__stack">
            <li>Python</li>
            <li>WhatsApp API</li>
            <li>DeepSeek</li>
          </ul>
        </article>

        <article class="dev__bot">
          <div class="dev__flujo" aria-hidden="true">
            <span class="chapa"><img src="/images/icons/google-gmail.svg" alt="" width="38" height="30" loading="lazy"></span>
            <span class="dev__hilo"><i class="dev__punto"></i></span>
            <span class="chapa"><img src="/images/icons/discord-icon.svg" alt="" width="38" height="30" loading="lazy"></span>
          </div>
          <p class="dev__flujo-pie">Entra un correo · sale un aviso en el canal</p>

          <p class="dev__etiqueta">Bots · Correo</p>
          <h3 class="dev__nombre">Un bot que ordena el correo</h3>
          <p class="dev__desc">Lee la bandeja, clasifica lo que llega y avisa en el canal correcto, sin abrir el correo.</p>
          <ul class="dev__stack">
            <li>Python</li>
            <li>Discord API</li>
            <li>IMAP</li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
