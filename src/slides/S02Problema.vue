<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import IconBadge from '../components/IconBadge.vue'
import Icon from '../components/Icon.vue'

const steps = [
  { icon: 'badge-check', title: '1 · Se certifica', text: 'La Defensoría aprueba la auditoría ISO 9001 y documenta sus procedimientos.' },
  { icon: 'hourglass', title: '2 · Pasa el tiempo', text: 'Llegan las urgencias, falta gente, la vorágine del día a día se lleva puesto todo.' },
  { icon: 'rotate-ccw', title: '3 · Se vuelve a lo de antes', text: 'Los procedimientos se saltean, se adaptan o se completan después.' }
]
</script>

<template>
  <SlideFrame tone="flame" class="problema">
    <template #title>
      El problema: certificar
      <span class="hl scribble">no alcanza<svg class="scrib" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true"><path d="M3 15 C 50 5, 95 21, 150 12 S 250 4, 297 14" pathLength="1" /></svg></span>.
    </template>

    <div class="flow persp">
      <template v-for="(s, i) in steps" :key="s.title">
        <article class="card step a-flip-x" :class="[`s${i + 1}`, { last: i === 2 }]" :style="{ '--i': 4 + i * 3 }">
          <IconBadge :icon="s.icon" :size="62" :variant="i === 2 ? 'solid' : 'soft'" />
          <h3>{{ s.title }}</h3>
          <p class="muted">{{ s.text }}</p>
        </article>
        <span v-if="i < 2" class="arrow a-fade" :style="{ '--i': 6 + i * 3 }" aria-hidden="true">
          <Icon name="chevron-right" :size="26" />
        </span>
      </template>
    </div>

    <div class="card card-glow objetivo a-scale" style="--i: 13">
      <span class="target-wrap">
        <span class="ping" aria-hidden="true" />
        <IconBadge icon="target" :size="72" variant="solid" />
      </span>
      <div>
        <p class="label">NUESTRO OBJETIVO</p>
        <p v-split="{ delay: 1700, step: 32 }" class="statement">
          Que los empleados adopten los procedimientos como algo propio y los sostengan en el tiempo, sin necesidad de que nadie los controle.
        </p>
      </div>
    </div>
  </SlideFrame>
</template>

<style>
.problema .scribble {
  position: relative;
  display: inline-block;
}
.problema .scrib {
  position: absolute;
  left: -2%;
  bottom: -0.16em;
  width: 104%;
  height: 0.32em;
  overflow: visible;
}
.problema .scrib path {
  fill: none;
  stroke: var(--accent);
  stroke-width: 5;
  stroke-linecap: round;
  stroke-dasharray: 1;
  stroke-dashoffset: 0;
  animation: draw 0.9s 1.2s var(--ease-in-out) both;
  --len: 1;
}
/* Iconos con vida propia */
.problema .s1 .badge svg {
  animation: in-pop 0.7s 1.2s var(--ease-back) both;
}
.problema .s2 .badge svg {
  animation: flip-hourglass 3.2s 1.6s var(--ease-in-out) infinite;
}
.problema .s3 .badge svg {
  animation: spin-once-back 1.2s 1.9s var(--ease-in-out) both;
}
.problema .s3 {
  animation: in-flip-x 1.1s var(--ease-out) both, shake 0.5s 2.6s ease-in-out;
  animation-delay: calc(240ms + var(--i) * 80ms), 2.6s;
}
.problema .arrow svg {
  animation: nudge 1.4s 1.8s ease-in-out infinite;
}
.problema .target-wrap {
  position: relative;
  display: grid;
}
.problema .ping {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: pulse-ring 1.8s 2.2s var(--ease-out) infinite;
}
.problema .flow {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: 14px;
}
.problema .step {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
}
.problema .step h3 {
  font-size: var(--fs-h3);
  margin-top: 6px;
}
.problema .step p {
  font-size: 21px;
  line-height: 1.45;
}
.problema .step.last {
  border-color: color-mix(in srgb, var(--accent) 40%, transparent);
  background: color-mix(in srgb, var(--accent) 7%, transparent);
}
.problema .arrow {
  align-self: center;
  color: var(--dim);
}
.problema .slide-body {
  gap: 40px;
}
.problema .objetivo {
  display: flex;
  align-items: center;
  gap: 30px;
  padding: 32px 40px;
}
.problema .objetivo .label {
  margin-bottom: 10px;
}
.problema .statement {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 650;
  line-height: 1.22;
  letter-spacing: -0.015em;
}
.compact .problema .flow {
  grid-template-columns: 1fr;
}
.compact .problema .arrow {
  justify-self: center;
  transform: rotate(90deg);
}
.compact .problema .objetivo {
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 22px;
  margin-top: 8px;
}
.compact .problema .step p {
  font-size: var(--fs-body);
}
.compact .problema .statement {
  font-size: 20px;
}
</style>
