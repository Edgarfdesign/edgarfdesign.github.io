<script setup lang="ts">
import { bySlug, nextOf, projects } from '~/data/projects'

const ruta = useRoute()
const slug = String(ruta.params.slug)
const proyecto = bySlug(slug)

if (!proyecto) {
  throw createError({ statusCode: 404, statusMessage: 'Ese proyecto no existe', fatal: true })
}

const siguiente = nextOf(slug)
const indice = projects.findIndex((p) => p.slug === slug) + 1

const cinta = ref<HTMLElement | null>(null)
const actual = ref(1)

function alDesplazar() {
  const el = cinta.value
  if (!el) return
  const ancho = el.scrollWidth / proyecto.images.length
  actual.value = Math.min(proyecto.images.length, Math.round(el.scrollLeft / ancho) + 1)
}

function mover(dir: number) {
  const el = cinta.value
  if (!el) return
  const piezas = el.querySelectorAll('.caso__pieza')
  const destino = Math.max(0, Math.min(piezas.length - 1, actual.value - 1 + dir))
  const pieza = piezas[destino] as HTMLElement | undefined
  if (pieza) el.scrollTo({ left: pieza.offsetLeft, behavior: 'smooth' })
}

useHead({
  title: () => `${proyecto.name} — identidad visual, ${proyecto.year} | Edgar Fernández`,
  meta: [
    { name: 'description', content: `Caso de ${proyecto.name}: ${proyecto.discipline.toLowerCase()} en ${proyecto.year}. Piezas, aplicaciones y proceso.` },
    { property: 'og:title', content: `${proyecto.name} — identidad visual, ${proyecto.year}` },
    { property: 'og:image', content: 'https://edgarfdesign.github.io/' + proyecto.cover }
  ]
})
</script>

<template>
  <main id="main" class="caso">
    <div class="wrap">
      <div class="caso__cabeza">
        <NuxtLink class="caso__volver" to="/#muro">← Volver al índice</NuxtLink>
        <h1 class="caso__titulo">{{ proyecto.name }}</h1>
        <p class="caso__meta">
          {{ proyecto.year }} · {{ proyecto.discipline }} · {{ proyecto.images.length }} piezas
          · {{ String(indice).padStart(2, '0') }}/{{ String(projects.length).padStart(2, '0') }}
        </p>
      </div>
    </div>

    <div class="wrap caso__ficha">
      <p v-if="proyecto.resumen" class="caso__resumen">{{ proyecto.resumen }}</p>
      <p v-if="proyecto.concepto" class="caso__concepto">{{ proyecto.concepto }}</p>
      <p v-if="proyecto.encargo" class="caso__encargo">{{ proyecto.encargo }}</p>
      <dl class="caso__datos">
        <div><dt>Año</dt><dd>{{ proyecto.year }}</dd></div>
        <div><dt>Disciplina</dt><dd>{{ proyecto.discipline }}</dd></div>
        <div><dt>Piezas</dt><dd>{{ proyecto.images.length }}</dd></div>
        <div v-if="proyecto.tipografia"><dt>Tipografía</dt><dd>{{ proyecto.tipografia }}</dd></div>
        <div v-if="proyecto.colores"><dt>Color</dt><dd>{{ proyecto.colores }}</dd></div>
        <div v-if="proyecto.manual"><dt>Entrega</dt><dd>Manual de marca</dd></div>
      </dl>
    </div>

    <div class="caso__cinta-envoltorio">
      <div
        ref="cinta"
        class="caso__cinta"
        tabindex="0"
        role="group"
        aria-label="Piezas del proyecto, desliza o usa las flechas"
        @scroll.passive="alDesplazar"
        @keydown.left.prevent="mover(-1)"
        @keydown.right.prevent="mover(1)"
      >
        <figure v-for="(img, i) in proyecto.images" :key="img" class="caso__pieza">
          <img :src="'/' + img" :alt="proyecto.name + ', pieza ' + (i + 1)" loading="lazy" decoding="async">
        </figure>
      </div>

      <div class="wrap caso__cinta-pie">
        <p class="caso__contador" aria-live="polite">Pieza {{ actual }} de {{ proyecto.images.length }}</p>
        <div class="caso__flechas">
          <button type="button" aria-label="Pieza anterior" @click="mover(-1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <button type="button" aria-label="Pieza siguiente" @click="mover(1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>

    <div class="wrap">
      <NuxtLink class="caso__siguiente" :to="'/proyecto/' + siguiente.slug">
        <span>Siguiente caso</span>
        <strong>{{ siguiente.name }} →</strong>
      </NuxtLink>
    </div>
  </main>

  <SiteClosing />
</template>
