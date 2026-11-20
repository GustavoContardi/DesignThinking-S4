<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const filas = [
  ['La calidad es para el auditor', 'Cada procedimiento tiene objetivo y dueño'],
  ['Medir es que me controlen', 'Votamos solo lo que usamos, sin nombres'],
  ['El que no está de acuerdo no tiene voz', 'Las objeciones se escuchan y se resuelven'],
  ['En una urgencia, se saltea', 'El camino rápido también está escrito'],
  ['Los papeles inútiles se acumulan', 'Se dan de baja con acta y reemplazo']
]
</script>

<template>
  <SlideFrame tone="teal" eyebrow="CÓMO SE MODIFICA TODO CON NUESTRA PROPUESTA" class="impacto">
    <template #title>¿Cómo impacta la propuesta <span class="hl">en la Defensoría</span>?</template>

    <div class="table">
      <div class="thead">
        <p v-split:type="{ delay: 700, step: 40 }" class="label hoy">HOY</p>
        <span />
        <p v-split:type="{ delay: 900, step: 24 }" class="label con">CON NUESTRA PROPUESTA</p>
      </div>
      <div v-for="(f, i) in filas" :key="f[0]" class="tr">
        <p class="before a-left" :style="{ '--i': 14 + i * 5 }">
          <Icon name="x" :size="18" :stroke="2.4" />
          <span :style="{ '--sd': 1700 + i * 400 + 'ms' }">{{ f[0] }}</span>
        </p>
        <span class="to a-pop" :style="{ '--i': 17 + i * 5 }" aria-hidden="true">
          <Icon name="arrow-right" :size="20" :stroke="2.4" />
        </span>
        <p class="after a-flip-x sheen" :style="{ '--i': 18 + i * 5, '--sh': 2.8 + i * 0.4 + 's' }">
          <Icon name="check" :size="18" :stroke="2.6" />
          <span>{{ f[1] }}</span>
        </p>
      </div>
    </div>
  </SlideFrame>
</template>

<style>
.impacto .table {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.impacto .thead,
.impacto .tr {
  display: grid;
  grid-template-columns: 1fr 72px 1fr;
  align-items: stretch;
}
.impacto .thead {
  margin-bottom: 4px;
}
.impacto .thead .hoy {
  color: var(--dim);
  padding-left: 4px;
}
.impacto .tr {
  flex: 1;
  max-height: 92px;
}
.impacto .before,
.impacto .after {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 28px;
  border-radius: var(--radius-sm);
  font-size: 23px;
  line-height: 1.25;
}
.impacto .before {
  color: var(--muted);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--line);
}
.impacto .before svg {
  flex: none;
  color: var(--dim);
}
.impacto .before span {
  background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)) no-repeat 0 55% / 100% 1.5px;
  animation: strike 0.55s var(--ease-in-out) both;
  animation-delay: calc(var(--sd) + 450ms);
}
.impacto .table {
  perspective: 1400px;
}
.impacto .after.sheen::after {
  animation: sheen 1.6s var(--ease-in-out) both;
  animation-delay: calc(var(--sh) + 600ms);
}
.impacto .after svg {
  animation: in-pop 0.7s var(--ease-back) both;
  animation-delay: calc(var(--sh) + 300ms);
}
.impacto .to svg {
  animation: nudge 1.4s ease-in-out infinite;
  animation-delay: calc(var(--sh, 4s) + 1s);
}
.impacto .after {
  font-weight: 650;
  color: var(--text);
  background: linear-gradient(100deg, color-mix(in srgb, var(--accent) 16%, transparent), color-mix(in srgb, var(--accent) 4%, transparent));
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.impacto .after svg {
  flex: none;
  padding: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #04130f;
  background: var(--accent);
}
.impacto .to {
  display: grid;
  place-items: center;
  color: var(--accent);
}
.compact .impacto .thead {
  display: none;
}
.compact .impacto .tr {
  grid-template-columns: 1fr;
  gap: 6px;
  max-height: none;
  padding-bottom: 10px;
}
.compact .impacto .before,
.compact .impacto .after {
  padding: 14px 16px;
  font-size: 16px;
}
.compact .impacto .to {
  transform: rotate(90deg);
  height: 22px;
}
</style>
