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
    <template #title>El problema: certificar <span class="hl">no alcanza</span>.</template>

    <div class="flow">
      <template v-for="(s, i) in steps" :key="s.title">
        <article class="card step a-up" :class="{ last: i === 2 }" :style="{ '--i': 2 + i * 2 }">
          <IconBadge :icon="s.icon" :size="62" :variant="i === 2 ? 'solid' : 'soft'" />
          <h3>{{ s.title }}</h3>
          <p class="muted">{{ s.text }}</p>
        </article>
        <span v-if="i < 2" class="arrow a-fade" :style="{ '--i': 3 + i * 2 }" aria-hidden="true">
          <Icon name="chevron-right" :size="26" />
        </span>
      </template>
    </div>

    <div class="card card-glow objetivo a-scale" style="--i: 8">
      <IconBadge icon="target" :size="72" variant="solid" />
      <div>
        <p class="label">NUESTRO OBJETIVO</p>
        <p class="statement">
          Que los empleados adopten los procedimientos como algo propio y los sostengan en el tiempo, sin necesidad de que nadie los controle.
        </p>
      </div>
    </div>
  </SlideFrame>
</template>

<style>
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
