<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const quotes = [
  {
    lines: ['¿Para qué sirve todo esto si ya estábamos bien?', '¿Por qué tantos documentos? Es persecutorio en cierto punto.'],
    who: 'Leandro, Operaciones',
    insight: 'Siente que la calidad es una forma de controlarlo.'
  },
  {
    lines: ['Que venga alguien de afuera a querer cambiar la dinámica del trabajo, con una mirada de cómo debería ser, es un poco chocante.'],
    who: 'Romina, Desarrollo',
    insight: 'Rechaza los cambios que le imponen desde afuera.'
  },
  {
    lines: ['No sé si vale la pena embarcarnos en estos cambios. Yo lo contemplaría, pero más adelante.'],
    who: 'Germán, Infraestructura',
    insight: 'No ve un beneficio que justifique el esfuerzo de hoy.'
  }
]
</script>

<template>
  <SlideFrame tone="teal" eyebrow="FASE 1 - EMPATIZAR" class="frases">
    <template #title>Lo que nos dijeron:</template>

    <div class="cols-3 quotes persp">
      <figure v-for="(q, i) in quotes" :key="q.who" class="quote">
        <span class="q-icon a-pop" :style="{ '--i': 3 + i * 3 }"><Icon name="quote" :size="30" /></span>
        <blockquote>
          <p v-for="(l, k) in q.lines" :key="l" v-split:type="{ delay: 700 + i * 350 + k * 900, step: 15 }">{{ l }}</p>
        </blockquote>
        <figcaption class="a-left" :style="{ '--i': 28 + i * 2 }">{{ q.who }}</figcaption>
        <p class="insight a-flip-x" :style="{ '--i': 30 + i * 2 }">{{ q.insight }}</p>
      </figure>
    </div>
  </SlideFrame>
</template>

<style>
.frases .quotes {
  gap: 48px;
}
.frases .quote {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.frases .q-icon {
  animation: in-pop 0.9s var(--ease-back) both, wiggle 4s 3s ease-in-out infinite;
  animation-delay: calc(240ms + var(--i) * 80ms), 3s;
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  border-radius: 16px;
  color: #04130f;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.frases blockquote {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: var(--font-display);
  font-size: 33px;
  font-style: italic;
  font-weight: 500;
  line-height: 1.28;
  letter-spacing: -0.01em;
}
.frases blockquote {
  min-height: 300px;
}
.frases figcaption {
  margin-top: 6px;
  font-size: 18px;
  font-weight: 700;
  color: var(--accent);
}
.frases .insight {
  padding: 18px 22px;
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  border: 1px solid var(--line);
  font-size: 18px;
  color: #d6dae0;
}
.compact .frases .quotes {
  gap: 34px;
}
.compact .frases blockquote {
  font-size: 21px;
}
.compact .frases blockquote {
  min-height: 0;
}
</style>
