<script setup lang="ts">
const videos = [1, 2, 3]
const pista = ref<HTMLElement | null>(null)
const activo = ref(0)
const reproduciendo = ref(false)

function ir(i: number) {
  const el = pista.value
  if (!el) return
  const n = Math.max(0, Math.min(videos.length - 1, i))
  const hijo = el.children[n] as HTMLElement | undefined
  if (!hijo) return
  el.scrollTo({ left: hijo.offsetLeft - el.offsetLeft, behavior: 'smooth' })
  activo.value = n
}

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

function alternar(v: HTMLVideoElement) {
  if (v.paused) { v.play(); reproduciendo.value = true }
  else { v.pause(); reproduciendo.value = false }
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
      </div>

      <div class="v__carrusel">
        <div ref="pista" class="v__pista" @scroll="alDesplazar">
          <div v-for="n in videos" :key="n" class="v__slide">
            <div class="v__marco">
              <div class="v__pantalla">
                <video
                  class="v__video"
                  playsinline
                  loop
                  preload="metadata"
                  :poster="'/videos/video' + n + '-poster.webp'"
                  width="1080"
                  height="1920"
                  :aria-label="'Pieza vertical número ' + n + '. Toca para verla con sonido'"
                  @click="alternar($event.target as HTMLVideoElement)"
                >
                  <source :src="'/videos/video' + n + '.mp4'" type="video/mp4">
                  <source :src="'/videos/video' + n + '.webm'" type="video/webm">
                </video>

                <!-- la interfaz del reel, para que se lea como una pieza publicada -->
                <div class="v__ig" aria-hidden="true">
                  <span class="v__isla"></span>
                  <div class="v__estado">
                    <span>9:41</span>
                    <span class="v__senal"><i></i><i></i><i></i></span>
                  </div>

                  <p class="v__ig-titulo">Reels</p>

                  <div class="v__ig-rail">
                    <img src="/images/icons/ui-heart.svg" alt="" width="20" height="20">
                    <img src="/images/icons/ui-message-circle.svg" alt="" width="20" height="20">
                    <img src="/images/icons/ui-send.svg" alt="" width="20" height="20">
                    <img src="/images/icons/ui-bookmark.svg" alt="" width="20" height="20">
                    <span class="v__ig-audio"><img src="/images/icons/ui-music.svg" alt="" width="12" height="12"></span>
                  </div>

                  <div class="v__ig-pie">
                    <span class="v__ig-usuario"><i class="v__ig-avatar"></i>edgarfdesign</span>
                    <span class="v__ig-audio-linea">
                      <img src="/images/icons/ui-music.svg" alt="" width="10" height="10">
                      Audio original · edgarfdesign
                    </span>
                  </div>

                  <span class="v__ig-barra"><i></i></span>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  </section>
</template>
