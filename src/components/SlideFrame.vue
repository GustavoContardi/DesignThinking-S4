<script setup>
/*
 * Marco comun de una slide de contenido:
 *   - eyebrow (etiqueta de seccion)
 *   - titulo (slot "title", admite resaltados con <span class="hl">)
 *   - cuerpo (slot por defecto)
 * El "tone" define el color de acento de toda la slide.
 */
defineProps({
  eyebrow: { type: String, default: '' },
  tone: { type: String, default: 'flame' }
})
</script>

<template>
  <section class="slide" :class="`tone-${tone}`">
    <header v-if="eyebrow || $slots.title || $slots.head" class="slide-head">
      <p v-if="eyebrow" class="eyebrow a-down" style="--i: 0">{{ eyebrow }}</p>
      <h2 v-if="$slots.title" class="title a-up" style="--i: 1"><slot name="title" /></h2>
      <slot name="head" />
    </header>
    <div class="slide-body">
      <slot />
    </div>
  </section>
</template>
