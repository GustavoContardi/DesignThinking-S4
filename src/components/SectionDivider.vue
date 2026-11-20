<script setup>
/*
 * Separador de etapa de Design Thinking (01 Empatizar, 02 Definir, 03 Idear).
 * El numero gigante se dibuja con contorno + relleno animado.
 */
defineProps({
  num: { type: String, required: true },
  kicker: { type: String, required: true },
  title: { type: String, required: true },
  tone: { type: String, default: 'flame' },
  /* Posicion de esta etapa (1..3) para el indicador de progreso decorativo. */
  step: { type: Number, default: 1 }
})
</script>

<template>
  <section class="slide divider" :class="`tone-${tone}`">
    <div class="wrap">
      <div class="numeral a-blur" style="--i: 0" aria-hidden="false">
        <span class="outline">{{ num }}</span>
        <span class="fill">{{ num }}</span>
      </div>
      <div class="copy">
        <p class="eyebrow a-right" style="--i: 2">{{ kicker }}</p>
        <h2 class="big a-right" style="--i: 3">{{ title }}</h2>
        <p class="lead a-right" style="--i: 4"><slot /></p>
        <div class="dots a-fade" style="--i: 6" aria-hidden="true">
          <span v-for="n in 3" :key="n" :class="{ on: n <= step, current: n === step }" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.divider {
  justify-content: center;
}
.wrap {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 72px;
}
.numeral {
  position: relative;
  font-family: var(--font-display);
  font-weight: 800;
  font-size: 340px;
  line-height: 0.8;
  letter-spacing: -0.06em;
}
.outline {
  color: transparent;
  -webkit-text-stroke: 2px color-mix(in srgb, var(--accent) 55%, transparent);
}
.fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  clip-path: inset(100% 0 0 0);
  animation: fill-up 1.4s 0.5s var(--ease-out) forwards;
}
@keyframes fill-up {
  to { clip-path: inset(0 0 0 0); }
}
.copy {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.big {
  font-size: 128px;
  line-height: 0.95;
  letter-spacing: -0.045em;
}
.lead {
  font-size: 30px;
  max-width: 820px;
}
.dots {
  display: flex;
  gap: 10px;
  margin-top: 18px;
}
.dots span {
  width: 36px;
  height: 6px;
  border-radius: 6px;
  background: var(--surface-3);
}
.dots span.on {
  background: color-mix(in srgb, var(--accent) 45%, transparent);
}
.dots span.current {
  width: 72px;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
}

.compact .wrap {
  grid-template-columns: 1fr;
  gap: 18px;
}
.compact .numeral {
  font-size: 150px;
}
.compact .big {
  font-size: 60px;
}
.compact .lead {
  font-size: 19px;
}
</style>
