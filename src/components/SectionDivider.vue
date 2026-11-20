<script setup>
/*
 * Separador de etapa de Design Thinking (01 Empatizar, 02 Definir, 03 Idear).
 * Entra detras de una cortina de color (--enter-delay). El numero gigante
 * gira en 3D, se rellena de abajo hacia arriba y queda con un halo girando.
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
    <span class="beam" aria-hidden="true" />
    <div class="wrap">
      <div class="numeral">
        <span class="halo" aria-hidden="true" />
        <span class="halo h2" aria-hidden="true" />
        <span class="outline a-flip-y" style="--i: 0">{{ num }}</span>
        <span class="fill" aria-hidden="true">{{ num }}</span>
      </div>
      <div class="copy">
        <p v-split:type="{ delay: 500, step: 26 }" class="eyebrow">{{ kicker }}</p>
        <h2 v-split:chars="{ delay: 900, step: 55 }" class="big">{{ title }}</h2>
        <p v-split="{ delay: 1500, step: 40 }" class="lead"><slot /></p>
        <div class="dots" aria-hidden="true">
          <span
            v-for="n in 3"
            :key="n"
            class="a-pop"
            :class="{ on: n <= step, current: n === step }"
            :style="{ '--i': 20 + n }"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.divider {
  --enter-delay: 520ms;
  justify-content: center;
  overflow: hidden;
}
/* Haz de luz diagonal que cruza al entrar */
.beam {
  position: absolute;
  top: -40%;
  left: -30%;
  width: 30%;
  height: 180%;
  rotate: 18deg;
  background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--accent) 22%, transparent), transparent);
  filter: blur(20px);
  animation: beam 2.6s 0.7s var(--ease-in-out) both;
  pointer-events: none;
}
@keyframes beam {
  from { translate: 0 0; opacity: 1; }
  to { translate: 520% 0; opacity: 0.2; }
}
.wrap {
  position: relative;
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
  perspective: 1200px;
}
.halo {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 470px;
  height: 470px;
  margin: -235px 0 0 -235px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, color-mix(in srgb, var(--accent) 45%, transparent), transparent 40%);
  mask: radial-gradient(circle, transparent 64%, #000 65%, #000 66%, transparent 67%);
  -webkit-mask: radial-gradient(circle, transparent 64%, #000 65%, #000 66%, transparent 67%);
  animation: in-fade 1s calc(var(--enter-delay) + 600ms) both, spin 9s linear infinite;
}
.halo.h2 {
  width: 560px;
  height: 560px;
  margin: -280px 0 0 -280px;
  opacity: 0.5;
  animation: in-fade 1s calc(var(--enter-delay) + 900ms) both, spin-rev 16s linear infinite;
}
.outline {
  display: inline-block;
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
  filter: drop-shadow(0 20px 60px color-mix(in srgb, var(--accent) 45%, transparent));
  animation: fill-up 1.5s calc(var(--enter-delay) + 700ms) var(--ease-in-out) both;
}
@keyframes fill-up {
  from { clip-path: inset(100% 0 0 0); }
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
  perspective: 800px;
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
  box-shadow: 0 0 16px var(--accent);
}

.compact .wrap {
  grid-template-columns: 1fr;
  gap: 18px;
}
.compact .numeral {
  font-size: 150px;
}
.compact .halo,
.compact .beam {
  display: none;
}
.compact .big {
  font-size: 60px;
}
.compact .lead {
  font-size: 19px;
}
</style>
