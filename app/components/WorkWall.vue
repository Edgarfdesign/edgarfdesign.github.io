<script setup lang="ts">
import { projects } from '~/data/projects'

</script>

<template>
  <ul class="muro">
    <li v-for="(p, i) in projects" :key="p.slug" class="muro__placa">
      <NuxtLink :to="'/proyecto/' + p.slug" :aria-label="'Ver el caso de ' + p.name + ', ' + p.year">
        <img
          :src="'/' + p.thumb"
          :srcset="'/' + p.thumbMobile + ' 360w, /' + p.thumb + ' 720w'"
          sizes="(max-width: 600px) 50vw, (max-width: 1023px) 50vw, 33vw"
          alt=""
          loading="lazy"
          decoding="async"
          width="720"
          height="900"
        >
        <span class="muro__nombre">{{ p.name }}</span>
      </NuxtLink>
    </li>
  </ul>
</template>
