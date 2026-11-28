<script setup lang="ts">
const abierto = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)
const hoja = ref<HTMLElement | null>(null)
const ruta = useRoute()

const enlaces = [
  { texto: 'Trabajo', href: '/#muro' },
  { texto: 'Video', href: '/#video' },
  { texto: 'Desarrollo', href: '/#desarrollo' },
  { texto: 'Servicios', href: '/#servicios' }
]

function bloquearFondo(v: boolean) {
  if (import.meta.client) document.body.style.overflow = v ? 'hidden' : ''
}

async function abrir(enfocar = false) {
  abierto.value = true
  bloquearFondo(true)
  if (!enfocar) return
  await nextTick()
  hoja.value?.querySelector<HTMLAnchorElement>('a')?.focus()
}

function cerrar() {
  abierto.value = false
  bloquearFondo(false)
  toggle.value?.focus()
}

function alternar(e: MouseEvent) {
  if (abierto.value) cerrar()
  else abrir(e.detail === 0) // solo el teclado lleva el foco al primer enlace
}

watch(() => ruta.fullPath, () => { if (abierto.value) cerrar() })

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && abierto.value) cerrar()
  })
})

onUnmounted(() => bloquearFondo(false))
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
        ref="toggle"
        class="nav__toggle"
        :class="{ 'is-open': abierto }"
        type="button"
        :aria-expanded="abierto ? 'true' : 'false'"
        aria-controls="menu-movil"
        :aria-label="abierto ? 'Cerrar el menú' : 'Abrir el menú'"
        @click="alternar"
      >
        <svg class="nav__burger" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h16M4 16h16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
        <svg class="nav__equis" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <Transition name="hoja">
      <div v-if="abierto" id="menu-movil" ref="hoja" class="nav__sheet">
        <nav class="nav__sheet-links" aria-label="Secciones">
          <a v-for="e in enlaces" :key="e.href" :href="e.href" @click="cerrar">
            <span>{{ e.texto }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </a>
        </nav>

        <a href="#contacto" class="btn btn--primary nav__sheet-cta" @click="cerrar">Hablemos</a>

        <div class="nav__sheet-pie">
          <a href="mailto:edgarafperez@gmail.com">edgarafperez@gmail.com</a>
          <p>Doce marcas · 2019 — 2024<br>San Cristóbal, Venezuela</p>
        </div>
      </div>
    </Transition>
  </header>
</template>
