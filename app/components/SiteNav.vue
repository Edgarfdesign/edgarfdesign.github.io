<script setup lang="ts">
const abierto = ref(false)
const toggle = ref<HTMLButtonElement | null>(null)
const hoja = ref<HTMLElement | null>(null)
const scrolled = ref(false)
const progreso = ref(0)
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

function alternar() {
  if (abierto.value) {
    cerrar()
    return
  }
  abrir(!!toggle.value?.matches(':focus-visible'))
}

// --- estado de la barra: sombra al bajar y linea de progreso ---
let pendiente = false
function medir() {
  const y = window.scrollY
  const alto = document.documentElement.scrollHeight - window.innerHeight
  scrolled.value = y > 24
  progreso.value = alto > 0 ? Math.min(1, Math.max(0, y / alto)) : 0
  pendiente = false
}
function alDesplazar() {
  if (pendiente) return
  pendiente = true
  requestAnimationFrame(medir)
}

watch(() => ruta.fullPath, () => { if (abierto.value) cerrar() })

onMounted(() => {
  medir()
  window.addEventListener('scroll', alDesplazar, { passive: true })
  window.addEventListener('resize', alDesplazar, { passive: true })
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && abierto.value) cerrar()
  })
})

onUnmounted(() => {
  bloquearFondo(false)
  window.removeEventListener('scroll', alDesplazar)
  window.removeEventListener('resize', alDesplazar)
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled, 'nav--abierto': abierto }">
    <div class="wrap nav__inner">
      <NuxtLink class="brand" to="/" aria-label="Edgar A. Fernández P., ir al inicio">
        <img class="brand__mark" src="/images/Isotipo1.svg" alt="" width="34" height="34">
        <span class="brand__name">Edgar A. Fernández P.</span>
      </NuxtLink>

      <nav class="nav__links" aria-label="Secciones">
        <a v-for="e in enlaces" :key="e.href" :href="e.href">
          <span>{{ e.texto }}</span>
        </a>
      </nav>

      <a class="btn btn--primary nav__cta" href="#contacto">
        Hablemos
        <svg class="m-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </a>

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
        <svg class="nav__ico" viewBox="0 0 24 24" aria-hidden="true">
          <line class="nav__ico-a" x1="4" y1="7" x2="20" y2="7" />
          <line class="nav__ico-b" x1="4" y1="12" x2="15" y2="12" />
          <line class="nav__ico-c" x1="4" y1="17" x2="20" y2="17" />
        </svg>
      </button>
    </div>

    <span class="nav__progreso" :style="{ transform: 'scaleX(' + progreso + ')' }" aria-hidden="true"></span>

    <Transition name="hoja">
      <div v-if="abierto" id="menu-movil" ref="hoja" class="nav__sheet">
        <nav class="nav__sheet-links" aria-label="Secciones">
          <a v-for="(e, i) in enlaces" :key="e.href" :href="e.href" @click="cerrar">
            <span class="nav__sheet-num">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="nav__sheet-texto">{{ e.texto }}</span>
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
