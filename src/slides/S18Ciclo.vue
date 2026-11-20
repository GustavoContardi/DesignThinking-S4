<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const etapas = [
  { n: '1', title: 'Se conocen', sub: 'Tinder', foot: 'cada 3 meses', icon: 'heart', tone: 'flame' },
  { n: '2', title: 'Se casan', sub: '70 % o más', foot: 'aniversario a 6 meses', icon: 'rings', tone: 'gold' },
  { n: '3', title: 'Se despiden', sub: 'menos de 40 %', foot: 'con acta de defunción', icon: 'tomb', tone: 'violet' }
]
</script>

<template>
  <SlideFrame tone="teal" eyebrow="CÓMO SE SOSTIENE EN EL TIEMPO" class="ciclo">
    <template #title>Un ciclo que se repite solo.</template>

    <div class="loop">
      <div class="nodes">
        <template v-for="(e, i) in etapas" :key="e.n">
          <div class="node a-pop" :class="`tone-${e.tone}`" :style="{ '--i': 4 + i * 5, '--g': i * 1.2 + 's' }">
            <span class="orbit-ring" aria-hidden="true" />
            <span class="ico" aria-hidden="true"><Icon :name="e.icon" :size="22" :stroke="2" /></span>
            <p class="n">{{ e.n }}</p>
            <p class="t">{{ e.title }}</p>
            <p class="s">{{ e.sub }}</p>
            <p class="f">{{ e.foot }}</p>
          </div>
          <span v-if="i < 2" class="arrow a-left" :style="{ '--i': 7 + i * 5 }" aria-hidden="true">
            <Icon name="arrow-right" :size="30" />
          </span>
        </template>
      </div>

      <!-- Linea de retorno: del velorio vuelve a Tinder -->
      <svg class="return" viewBox="0 0 1408 56" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="ret-grad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" style="stop-color: var(--violet)" />
            <stop offset="0.5" style="stop-color: var(--teal)" />
            <stop offset="1" style="stop-color: var(--flame)" />
          </linearGradient>
        </defs>
        <path
          d="M 1150 0 V 30 Q 1150 50 1130 50 H 278 Q 258 50 258 30 V 8"
          fill="none"
          stroke="url(#ret-grad)"
          stroke-width="2.5"
          stroke-linecap="round"
          pathLength="1"
        />
        <!-- Particula que recorre el camino de vuelta -->
        <circle r="6" class="traveler">
          <animateMotion dur="3.2s" begin="3s" repeatCount="indefinite" path="M 1150 0 V 30 Q 1150 50 1130 50 H 278 Q 258 50 258 30 V 8" />
        </circle>
        <path d="M 249 16 L 258 4 L 267 16" fill="none" style="stroke: var(--flame)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="tip" />
      </svg>

      <p class="caption a-up" style="--i: 24">
        <Icon name="repeat" :size="20" />
        <span>40–69 %: segunda cita · objeciones y actas → tablero de mejoras · lo que reencarna vuelve a Tinder</span>
      </p>
    </div>

    <div class="card card-glow juez-note a-up" style="--i: 27">
      <span class="gv"><Icon name="gavel" :size="26" /></span>
      <p><b>El juez de paz coordina todo el ciclo. </b>La dirección es padrino institucional: da recursos, firma las actas y revisa resultados.</p>
    </div>
  </SlideFrame>
</template>

<style>
.ciclo .loop {
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.ciclo .nodes {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: center;
  justify-items: center;
  padding: 0 50px;
}
.ciclo .node {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background:
    radial-gradient(circle at 30% 20%, color-mix(in srgb, var(--accent) 26%, transparent), transparent 65%),
    var(--bg-2);
  border: 1.5px solid color-mix(in srgb, var(--accent) 55%, transparent);
  box-shadow: 0 30px 80px -40px var(--accent);
}
.ciclo .node {
  animation:
    in-pop 0.9s var(--ease-back) both,
    glow-cycle 3.6s ease-in-out infinite;
  animation-delay: calc(240ms + var(--i) * 80ms), calc(3s + var(--g));
}
.ciclo .node:nth-child(1) .ico svg { animation: heartbeat 1.6s 2.5s ease-in-out infinite; }
.ciclo .node:nth-child(3) .ico svg { animation: wiggle 3s 2.5s ease-in-out infinite; }
.ciclo .node:nth-child(5) .ico svg { animation: sway 3.5s 2.5s ease-in-out infinite; }
.ciclo .arrow svg {
  animation: nudge 1.2s 2.4s ease-in-out infinite;
}
.ciclo .traveler {
  fill: #fff;
  filter: drop-shadow(0 0 8px var(--teal)) drop-shadow(0 0 16px var(--teal));
  opacity: 0;
  animation: in-fade 0.4s 3s both;
}
.ciclo .gv svg {
  transform-origin: 70% 70%;
  animation: bang 2.6s 3.4s ease-in-out infinite;
}
.ciclo .orbit-ring {
  position: absolute;
  inset: -14px;
  border-radius: 50%;
  border: 1px dashed color-mix(in srgb, var(--accent) 40%, transparent);
  animation: spin 40s linear infinite;
}
.ciclo .ico {
  position: absolute;
  top: 6px;
  right: 22px;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  color: #12090b;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.ciclo .n {
  font-family: var(--font-display);
  font-size: 52px;
  font-weight: 800;
  line-height: 1;
  color: var(--accent);
}
.ciclo .t {
  margin-top: 6px;
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.ciclo .s {
  margin-top: 4px;
  font-size: 21px;
  color: #dfe3e8;
}
.ciclo .f {
  margin-top: 2px;
  font-size: 17px;
  font-style: italic;
  color: var(--muted);
}
.ciclo .arrow {
  color: var(--dim);
}
.ciclo .return {
  display: block;
  width: 100%;
  height: 56px;
  margin-top: 0;
  overflow: visible;
}
.ciclo .return path:first-of-type {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  --len: 1;
  animation: draw 1.6s 1.6s var(--ease-in-out) both;
}
.ciclo .return .tip {
  opacity: 0;
  animation: in-fade 0.4s 3.1s both;
}
.ciclo .caption {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 14px;
  font-size: 22px;
  font-weight: 650;
  font-style: italic;
  color: #dfe3e8;
}
.ciclo .caption svg {
  flex: none;
  color: var(--accent);
}
.ciclo .juez-note {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 24px 34px;
}
.ciclo .juez-note p {
  font-size: 20px;
  line-height: 1.45;
  color: var(--muted);
}
.ciclo .gv {
  flex: none;
  display: grid;
  place-items: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  color: #04130f;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.compact .ciclo .nodes {
  grid-template-columns: 1fr;
  gap: 10px;
  padding: 0;
}
.compact .ciclo .node {
  width: 210px;
  height: 210px;
}
.compact .ciclo .n { font-size: 36px; }
.compact .ciclo .t { font-size: 24px; }
.compact .ciclo .s { font-size: 16px; }
.compact .ciclo .f { font-size: 14px; }
.compact .ciclo .ico { width: 38px; height: 38px; right: 14px; }
.compact .ciclo .arrow {
  transform: rotate(90deg);
}
.compact .ciclo .return {
  display: none;
}
.compact .ciclo .caption {
  margin: 20px 0;
  font-size: 16px;
  align-items: flex-start;
  justify-content: flex-start;
}
.compact .ciclo .juez-note {
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}
.compact .ciclo .juez-note p {
  font-size: 15.5px;
}
</style>
