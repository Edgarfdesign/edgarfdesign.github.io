<script setup lang="ts">
const videos = [1, 2, 3]
const pista = ref<HTMLElement | null>(null)
const activo = ref(0)

function ir(i: number) {
  activo.value = i
  const el = pista.value
  if (!el) return
  const hijo = el.children[i] as HTMLElement | undefined
  hijo?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
}
</script>

<template>
  <section id="video" class="section" aria-labelledby="video-h">
    <div class="wrap video__grid">
      <div class="video__text">
        <h2 id="video-h">Video vertical para tus redes</h2>
        <p class="video__lead">Piezas de nueve por dieciséis para Reels, TikTok y Stories. Animadas en After Effects y listas para subir.</p>
        <ul class="video__facts">
          <li><span>Formato</span><b>1080 × 1920</b></li>
          <li><span>Herramienta</span><b>After Effects</b></li>
          <li><span>Entrega</span><b>MP4 y WebM</b></li>
        </ul>
      </div>

      <div class="slider">
        <div ref="pista" class="slider__pista">
          <div v-for="n in videos" :key="n" class="slide">
            <div class="phone">
              <div class="phone__screen">
                <video
                  class="phone__video"
                  playsinline
                  muted
                  loop
                  preload="none"
                  :poster="'/videos/video' + n + '-poster.webp'"
                  width="1080"
                  height="1920"
                  :aria-label="'Video vertical para redes, pieza ' + n"
                  controls
                >
                  <source :src="'/videos/video' + n + '.mp4'" type="video/mp4">
                  <source :src="'/videos/video' + n + '.webm'" type="video/webm">
                </video>
              </div>
            </div>
          </div>
        </div>

        <div class="slider__controls">
          <button class="slider__btn slider__btn--prev" type="button" aria-label="Video anterior" @click="ir(Math.max(0, activo - 1))">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <div class="slider__dots">
            <button
              v-for="n in videos"
              :key="n"
              class="slider__dot"
              :class="{ 'is-active': activo === n - 1 }"
              type="button"
              :aria-label="'Ir al video ' + n"
              :aria-current="activo === n - 1 ? 'true' : undefined"
              @click="ir(n - 1)"
            />
          </div>
          <button class="slider__btn slider__btn--next" type="button" aria-label="Video siguiente" @click="ir(Math.min(videos.length - 1, activo + 1))">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
