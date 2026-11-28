<script setup lang="ts">
import { redes } from '~/data/redes'

const props = defineProps<{ nombre: string }>()
const red = redes.find((r) => r.id === props.nombre)
</script>

<template>
  <svg
    v-if="red"
    class="icono-red"
    :viewBox="red.viewBox"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path :d="red.d" />
  </svg>
</template>
