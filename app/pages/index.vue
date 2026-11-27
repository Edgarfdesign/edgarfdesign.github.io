<script setup lang="ts">
import { projects } from '~/data/projects'

const muro = [projects[0], projects[1], projects[2], projects[3], projects[4], projects[5], projects[6], projects[7]]

useHead({
  title: 'Edgar Fernández — Diseño gráfico y branding | San Cristóbal',
  meta: [
    { name: 'description', content: 'Diseñador gráfico y especialista en branding. Identidad visual, piezas para redes y video vertical para marcas de Venezuela y Chile. Doce marcas, de la primera idea a la calle.' },
    { property: 'og:title', content: 'Edgar Fernández — Diseño gráfico y branding' },
    { property: 'og:description', content: 'Identidad visual, piezas para redes y video vertical para marcas de Venezuela y Chile.' },
    { property: 'og:image', content: 'https://edgarfdesign.github.io/images/share.jpg' },
    { property: 'og:url', content: 'https://edgarfdesign.github.io/' }
  ],
  link: [{ rel: 'canonical', href: 'https://edgarfdesign.github.io/' }]
})
</script>

<template>
  <main id="main">
    <section class="portada portada--muro" aria-labelledby="portada-h">
      <div class="portada__muro" aria-hidden="true">
        <img v-for="p in muro" :key="p.slug" :src="'/' + p.thumb" alt="" width="720" height="900" decoding="async">
      </div>
      <div class="portada__velo" aria-hidden="true"></div>

      <div class="portada__texto">
        <h1 id="portada-h" class="portada__claim">Tu negocio ya es bueno. Que tu marca lo demuestre.</h1>
        <p class="portada__lead">Diseño la identidad completa de negocios como el tuyo: logo, papelería y piezas para redes. Te digo qué necesitas, qué no y cuánto cuesta antes de empezar.</p>
        <div class="btn-row portada__acciones">
          <a class="btn btn--primary" href="#contacto">Hablemos
            <svg class="m-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
          <a class="btn btn--secondary" href="#muro">Ver el trabajo</a>
        </div>

        <div class="portada__pie">
          <img class="portada__retrato" src="/images/retrato-720.webp" alt="Edgar Fernández, diseñador gráfico" width="64" height="64" loading="eager">
          <p class="portada__dato"><strong>Doce marcas</strong> · 2019 — 2024<br>Venezuela y Chile</p>
        </div>
      </div>
    </section>

    <section id="muro" class="section" aria-labelledby="muro-h">
      <div class="wrap">
        <div class="head">
          <h2 id="muro-h">Doce marcas, de la primera idea a la calle</h2>
          <p class="head__lead">Identidades completas entre 2019 y 2024. Cada una tiene su caso, con las piezas y lo que hubo detrás.</p>
        </div>
        <WorkWall />
      </div>
    </section>

    <VideoSection />
    <DevSection />
    <ServicesSection />
  </main>

  <SiteClosing />
</template>
