<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

/* Cada regla: parte destacada (b) + resto del texto (t), tal cual el original. */
const rules = [
  { b: 'Nada de cursos ni de gente de afuera', t: ' diciendo cómo trabajar' },
  { b: 'No sumar trabajo', t: ': si algo se agrega, algo se quita' },
  { b: 'Medir al equipo', t: ', nunca a las personas' },
  { b: 'Que se repita sola en el tiempo', t: ', no un evento aislado' },
  { b: 'Usar lo que ya tienen y conocen', t: ': Redmine, Git.' }
]
</script>

<template>
  <SlideFrame tone="gold" eyebrow="ETAPA 2 - DEFINIR" class="desafio">
    <template #title>El desafío principal:</template>

    <div class="card card-glow question a-scale" style="--i: 2">
      <span class="q-mark" aria-hidden="true"><Icon name="help" :size="40" :stroke="1.6" /></span>
      <p v-split="{ delay: 700, step: 42 }">
        ¿Cómo lograr que los empleados vean el sistema de calidad como
        <span class="hl">una herramienta propia que les ahorra trabajo</span>, y no como un control?
      </p>
    </div>

    <p v-split:type="{ delay: 1900, step: 18 }" class="rules-title">Reglas que vamos a seguir para responder esta pregunta</p>

    <ol class="cols-5 rules persp">
      <li v-for="(r, i) in rules" :key="r.b" class="card rule a-flip-x" :style="{ '--i': 30 + i * 2 }">
        <span class="num a-pop" :style="{ '--i': 33 + i * 2 }">{{ i + 1 }}</span>
        <p><b>{{ r.b }}</b>{{ r.t }}</p>
      </li>
    </ol>
  </SlideFrame>
</template>

<style>
.desafio .question {
  display: flex;
  align-items: center;
  gap: 34px;
  padding: 38px 48px;
}
.desafio .q-mark svg {
  animation: wiggle 3.5s 2s ease-in-out infinite;
}
.desafio .rule {
  transform-origin: 50% 0;
}
.desafio .q-mark {
  flex: none;
  display: grid;
  place-items: center;
  width: 84px;
  height: 84px;
  border-radius: 24px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
}
.desafio .question p {
  font-family: var(--font-display);
  font-size: 40px;
  font-weight: 700;
  line-height: 1.16;
  letter-spacing: -0.02em;
}
.desafio .rules-title {
  margin-top: 14px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 650;
  color: var(--muted);
}

.desafio .rule {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 26px 24px 28px;
}
.desafio .rule p {
  font-size: 22px;
  line-height: 1.38;
  color: var(--muted);
}
.desafio .rule b {
  color: var(--text);
}
.compact .desafio .question {
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  padding: 22px;
}
.compact .desafio .q-mark {
  width: 56px;
  height: 56px;
}
.compact .desafio .question p {
  font-size: 22px;
}
.compact .desafio .rules-title {
  font-size: 18px;
}
.compact .desafio .rule {
  flex-direction: row;
  align-items: center;
  gap: 14px;
}
.compact .desafio .rule p {
  font-size: 15.5px;
}
</style>
