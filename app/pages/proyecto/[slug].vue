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

    <div class="caso__portada">
      <img :src="'/' + proyecto.cover" :alt="'Identidad de ' + proyecto.name" width="2160" height="2700" loading="eager">
    </div>

    <div class="wrap">
      <div class="caso__piezas">
        <figure v-for="(img, i) in proyecto.images" :key="img" class="caso__pieza">
          <img :src="'/' + img" :alt="proyecto.name + ', pieza ' + (i + 1)" loading="lazy" decoding="async">
        </figure>
      </div>

      <NuxtLink class="caso__siguiente" :to="'/proyecto/' + siguiente.slug">
        <span>Siguiente caso</span>
        <strong>{{ siguiente.name }} →</strong>
      </NuxtLink>
    </div>
  </main>

  <SiteClosing />
</template>
