<script setup lang="ts">
const abierto = ref(false)
const enlaces = [
  { texto: 'Trabajo', href: '/#muro' },
  { texto: 'Video', href: '/#video' },
  { texto: 'Desarrollo', href: '/#desarrollo' },
  { texto: 'Servicios', href: '/#servicios' }
]
</script>

<template>
  <header class="nav">
    <div class="wrap nav__inner">
      <NuxtLink class="brand" to="/" aria-label="Edgar A. Fernández P., ir al inicio">
        <img class="brand__mark" src="/images/Isotipo1.svg" alt="" width="32" height="32">
        <span class="brand__name">Edgar A. Fernández P.</span>
      </NuxtLink>

      <nav class="nav__links" aria-label="Secciones">
        <a v-for="e in enlaces" :key="e.href" :href="e.href">{{ e.texto }}</a>
      </nav>

      <a class="btn btn--primary nav__cta" href="#contacto">Hablemos</a>

      <button
        class="nav__toggle"
        type="button"
        :aria-expanded="abierto ? 'true' : 'false'"
        aria-controls="menu-movil"
        aria-label="Abrir el menú"
        @click="abierto = !abierto"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <div v-if="abierto" id="menu-movil" class="nav__sheet">
      <a v-for="e in enlaces" :key="e.href" :href="e.href" @click="abierto = false">{{ e.texto }}</a>
      <a href="#contacto" class="btn btn--primary" @click="abierto = false">Hablemos</a>
    </div>
  </header>
</template>
