<script setup lang="ts">
const abierto = ref(false)
const ruta = useRoute()

watch(abierto, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
})
watch(() => ruta.fullPath, () => { abierto.value = false })
onUnmounted(() => { if (import.meta.client) document.body.style.overflow = '' })

function cerrar() { abierto.value = false }
if (import.meta.client) {
  onMounted(() => {
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') abierto.value = false })
  })
}
const enlaces = [
  { texto: 'Trabajo', href: '/#muro' },
  { texto: 'Video', href: '/#video' },
  { texto: 'Desarrollo', href: '/#desarrollo' },
  { texto: 'Servicios', href: '/#servicios' }
]
</script>

<template>
  <header class="nav" :class="{ 'nav--abierto': abierto }">
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
        :aria-label="abierto ? 'Cerrar el menú' : 'Abrir el menú'"
        @click="abierto = !abierto"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" width="20" height="20">
          <path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <div v-if="abierto" id="menu-movil" class="nav__sheet">
      <button class="nav__sheet-cerrar" type="button" aria-label="Cerrar el menú" @click="cerrar">
        <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22">
          <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
        </svg>
      </button>
      <nav class="nav__sheet-links" aria-label="Secciones">
        <a v-for="e in enlaces" :key="e.href" :href="e.href" @click="cerrar">{{ e.texto }}</a>
      </nav>
      <a href="#contacto" class="btn btn--primary nav__sheet-cta" @click="cerrar">Hablemos</a>
      <p class="nav__sheet-pie">Doce marcas · 2019 — 2024<br>San Cristóbal, Venezuela</p>
    </div>
  </header>
</template>
