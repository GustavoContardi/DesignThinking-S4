<script setup>
/*
 * Iconos de la metafora (corazon, anillos, lapida) flotando muy tenues en el
 * fondo. Posiciones fijas (no aleatorias) para que el fondo sea estable.
 */
import Icon from './Icon.vue'

const names = ['heart', 'rings', 'tomb']
const glyphs = Array.from({ length: 16 }, (_, i) => ({
  name: names[i % 3],
  left: (i * 37 + 7) % 100,
  size: 22 + ((i * 13) % 40),
  duration: 34 + ((i * 7) % 26),
  delay: -((i * 11) % 40),
  drift: ((i % 5) - 2) * 30
}))
</script>

<template>
  <div class="fg-glyphs" aria-hidden="true">
    <span
      v-for="(g, i) in glyphs"
      :key="i"
      class="fg-glyph"
      :style="{
        left: g.left + '%',
        animationDuration: g.duration + 's',
        animationDelay: g.delay + 's',
        '--drift': g.drift + 'px'
      }"
    >
      <Icon :name="g.name" :size="g.size" :stroke="1.4" />
    </span>
  </div>
</template>

<style>
.fg-glyphs {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  translate: calc(var(--px, 0) * -40px) calc(var(--py, 0) * -40px);
  transition: translate 1.2s var(--ease-out);
}
.fg-glyph {
  position: absolute;
  top: 0;
  color: var(--accent);
  opacity: 0;
  transition: color 1.4s var(--ease-out);
  animation: glyph-rise linear infinite;
}
@keyframes glyph-rise {
  0% { translate: 0 110vh; rotate: -20deg; opacity: 0; }
  12% { opacity: 0.09; }
  85% { opacity: 0.09; }
  100% { translate: var(--drift) -15vh; rotate: 25deg; opacity: 0; }
}
.compact .fg-glyphs {
  display: none;
}
</style>
