<script setup lang="ts">
const videos = [1, 2, 3]
const pista = ref<HTMLElement | null>(null)
const activo = ref(0)

function ir(i: number) {
  const el = pista.value
  if (!el) return
  const n = Math.max(0, Math.min(videos.length - 1, i))
  const hijo = el.children[n] as HTMLElement | undefined
  if (!hijo) return
  el.scrollTo({ left: hijo.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  activo.value = n
}

// el contador sigue al carrusel tambien cuando se arrastra con el dedo
let espera: ReturnType<typeof setTimeout> | undefined
function alDesplazar() {
  clearTimeout(espera)
  espera = setTimeout(() => {
    const el = pista.value
    if (!el || !el.children.length) return
    const centro = el.scrollLeft + el.clientWidth / 2
    let mejor = 0
    let menor = Infinity
    Array.from(el.children).forEach((c, i) => {
      const h = c as HTMLElement
      const d = Math.abs(h.offsetLeft - el.offsetLeft + h.offsetWidth / 2 - centro)
      if (d < menor) { menor = d; mejor = i }
    })
    activo.value = mejor
  }, 90)
}

onMounted(() => { if (pista.value) pista.value.scrollLeft = 0 })
</script>

<template>
  <section id="video" class="section v" aria-labelledby="video-h">
    <div class="wrap v__grid">
      <div class="v__texto">
        <p class="v__etiqueta">Piezas en vertical</p>
        <h2 id="video-h" class="v__titulo">Nueve por dieciséis, listas para subir</h2>
        <p class="v__lead">Piezas cortas para Reels, TikTok y Stories. Las animo en After Effects y te las entrego en el formato que pide cada red, sin que tengas que tocar nada.</p>

        <dl class="v__datos">
          <div><dt>Sale en</dt><dd>1080 × 1920</dd></div>
          <div><dt>Hecho en</dt><dd>After Effects</dd></div>
          <div><dt>Se entrega en</dt><dd>MP4 y WebM</dd></div>
        </dl>

        <div class="v__mandos">
          <button class="v__btn" type="button" aria-label="Pieza anterior" :disabled="activo === 0" @click="ir(activo - 1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <p class="v__cuenta"><b>{{ String(activo + 1).padStart(2, '0') }}</b><span>/ {{ String(videos.length).padStart(2, '0') }}</span></p>
          <button class="v__btn" type="button" aria-label="Pieza siguiente" :disabled="activo === videos.length - 1" @click="ir(activo + 1)">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </div>

      <div class="v__carrusel">
        <div ref="pista" class="v__pista" @scroll="alDesplazar">
          <div v-for="n in videos" :key="n" class="v__slide">
            <div class="v__marco">
              <video
                class="v__video"
                playsinline
                muted
                loop
                preload="none"
                :poster="'/videos/video' + n + '-poster.webp'"
                width="1080"
                height="1920"
                :aria-label="'Pieza vertical número ' + n"
                controls
              >
                <source :src="'/videos/video' + n + '.mp4'" type="video/mp4">
                <source :src="'/videos/video' + n + '.webm'" type="video/webm">
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
