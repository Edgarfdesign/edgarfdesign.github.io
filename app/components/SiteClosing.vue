<script setup lang="ts">
const año = new Date().getFullYear()
const correo = 'edgarafperez@gmail.com'
const whatsapp = 'https://wa.me/584161317560?text=Hola%20Edgar%2C%20vi%20tu%20portafolio%20y%20quiero%20hablar%20de%20mi%20marca.'
</script>

<template>
  <footer id="contacto" class="cierre">
    <div class="wrap cierre__grid">
      <div class="cierre__cabecera">
        <h2 class="cierre__titulo">Cuéntame qué marca quieres construir</h2>
        <p class="cierre__lead">Escríbeme dos líneas con qué se trata y te digo si puedo ayudarte, cuánto tarda y cuánto cuesta. Respondo yo, no un formulario.</p>
      </div>

      <a class="cierre__correo" :href="'mailto:' + correo + '?subject=Proyecto%20de%20marca'">
        <span class="cierre__correo-texto">{{ correo }}</span>
        <svg class="cierre__flecha" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </a>

      <div class="cierre__acciones">
<a class="btn btn--secondary" :href="whatsapp" target="_blank" rel="noopener noreferrer">Escribir por WhatsApp</a>
        <a class="cierre__cv" href="/assets/docs/CV-Edgar-Fernandez.pdf" download>Descargar el CV (PDF)</a>
      </div>
    </div>

    <div class="wrap cierre__pie">
      <div class="cierre__dir">
        <div class="dir-col">
          <p class="dir-col__title">Índice</p>
          <a href="/#muro">Trabajo</a>
          <a href="/#video">Video</a>
          <a href="/#desarrollo">Desarrollo</a>
          <a href="/#servicios">Servicios</a>
        </div>
        <div class="dir-col">
          <p class="dir-col__title">Fuera de aquí</p>
          <a href="https://www.behance.net/edgarafernandezp" target="_blank" rel="noopener noreferrer me">Behance ↗</a>
          <a href="https://www.instagram.com/edgarfdesign/" target="_blank" rel="noopener noreferrer me">Instagram ↗</a>
          <a href="https://hive.blog/@edgarafernandezp" target="_blank" rel="noopener noreferrer me">Hive ↗</a>
          <a href="https://t.me/edgarafernandezp" target="_blank" rel="noopener noreferrer me">Telegram ↗</a>
        </div>
        <div class="dir-col">
          <p class="dir-col__title">Directo</p>
          <a :href="'mailto:' + correo">{{ correo }}</a>
          <a href="tel:+584161317560">+58 416 131 7560</a>
          <p class="dir-col__nota">San Cristóbal, Venezuela.<br>Trabajo en remoto con Chile.</p>
        </div>
      </div>

      <div class="cierre__legal">
        <img class="cierre__isotipo" src="/images/Isotipo1.svg" alt="" width="30" height="30">
        <span>© {{ año }} Edgarfdesign</span>
        <span class="cierre__legal-sep" aria-hidden="true">·</span>
        <span>Diseño y código: Edgar Fernández</span>
        <a class="cierre__arriba" href="#main">Volver arriba ↑</a>
      </div>
    </div>
  </footer>
</template>
