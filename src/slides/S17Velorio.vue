<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const acta = [
  { k: 'Causa: ', v: '18 % de aprobación y 6 objeciones: «duplica lo que ya está en Redmine».' },
  { k: 'Herencia: ', v: 'el campo «fecha de cierre» pasa al ticket de Redmine.' },
  { k: 'Lección: ', v: 'no crear planillas paralelas al sistema.' },
  { k: 'Reencarnación: ', v: 'PR-11, registro automático del cierre en Redmine.' },
  { k: 'Firman: ', v: 'juez de paz y dirección.' }
]

const pasos = [
  { title: 'Quién va al velorio', text: 'Procedimientos con menos de 40 % de aprobación y los divorciados. Los obligatorios por norma nunca: van a segunda cita.' },
  { title: 'La ceremonia', text: 'Ataúd de cartón, epitafio y discurso. Los deudos dicen qué vale la pena rescatar: esa es la herencia.' },
  { title: 'El acta de defunción', text: 'Deja la causa, la herencia, las lecciones y el reemplazo: la reencarnación. Firman juez de paz y dirección.' }
]
</script>

<template>
  <SlideFrame tone="violet" eyebrow="IDEA 3 · JUAN CRUZ" class="velorio">
    <template #head>
      <div class="v-head">
        <span class="idea-num a-pop" style="--i: 1">3</span>
        <div class="v-copy">
          <h2 class="title a-up" style="--i: 2">Velorio de procedimientos</h2>
          <p class="lead a-up" style="--i: 3">
            Los procedimientos rechazados se dan de baja con un acta que deja trazabilidad: por qué murió, qué se rescata y quién lo reemplaza.
          </p>
        </div>
      </div>
    </template>

    <div class="layout">
      <!-- Acta de defunción con estilo de documento oficial -->
      <div class="acta-wrap a-left" style="--i: 4">
        <article class="acta">
          <header>
            <p class="acta-id">ACTA DE DEFUNCIÓN N.º 004 · CICLO 2026-T4</p>
            <span class="tomb"><Icon name="tomb" :size="40" :stroke="1.6" /></span>
          </header>
          <h3>Formulario F-23</h3>
          <p class="vida">Planilla de seguimiento semanal · Alta 2019 · Baja 2026</p>
          <dl>
            <div v-for="(a, i) in acta" :key="a.k" class="a-fade" :style="{ '--i': 7 + i }">
              <dt>{{ a.k }}</dt>
              <dd>{{ a.v }}</dd>
            </div>
          </dl>
          <span class="seal" aria-hidden="true" />
        </article>
        <p class="aclaracion">Ejemplo inventado.</p>
      </div>

      <div class="right">
        <p class="label a-fade" style="--i: 5">CÓMO FUNCIONA</p>
        <ol>
          <li v-for="(p, i) in pasos" :key="p.title" class="a-right" :style="{ '--i': 6 + i }">
            <span class="num">{{ i + 1 }}</span>
            <div>
              <h4>{{ p.title }}</h4>
              <p>{{ p.text }}</p>
            </div>
          </li>
        </ol>
        <div class="card card-glow real a-up" style="--i: 10">
          <p class="label">PROCESO REAL</p>
          <p>Baja controlada de documentos obsoletos (ISO 9001 7.5.3). El acta va al tablero de mejoras y es el punto de partida del reemplazo (10.3).</p>
        </div>
      </div>
    </div>
  </SlideFrame>
</template>

<style>
.velorio .slide-head {
  margin-bottom: 26px;
}
.velorio .v-head {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 30px;
}
.velorio .v-copy {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.velorio .lead {
  font-size: 21px;
}
.velorio .layout {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1.08fr;
  gap: 40px;
}
.velorio .acta-wrap {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.velorio .acta {
  position: relative;
  flex: 1;
  padding: 26px 30px;
  border-radius: 18px;
  color: #1d1a26;
  background:
    repeating-linear-gradient(0deg, transparent 0 33px, rgba(80, 70, 120, 0.07) 33px 34px),
    linear-gradient(170deg, #f4f1fb, #e6e0f4);
  box-shadow:
    0 40px 80px -40px var(--accent),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  transform: rotate(-1.2deg);
  overflow: hidden;
}
.velorio .acta header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.velorio .acta-id {
  font-size: 13.5px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #5b4ba8;
}
.velorio .tomb {
  flex: none;
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  margin-top: -6px;
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.velorio .acta h3 {
  margin-top: 6px;
  font-size: 42px;
  color: #1d1a26;
}
.velorio .vida {
  margin-top: 6px;
  font-size: 15px;
  color: #5d5870;
}
.velorio .acta dl {
  margin: 18px 0 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.velorio .acta dl div {
  font-size: 16.5px;
  line-height: 1.4;
}
.velorio .acta dt {
  display: inline;
  font-weight: 750;
}
.velorio .acta dd {
  display: inline;
  margin: 0;
  color: #3a3550;
}
.velorio .seal {
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px double rgba(91, 75, 168, 0.25);
}
.velorio .aclaracion {
  font-size: 14px;
  font-style: italic;
  color: var(--dim);
  padding-left: 6px;
}
.velorio .right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.velorio .right ol {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.velorio .right li {
  display: flex;
  gap: 16px;
}
.velorio .right h4 {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin: 6px 0 4px;
}
.velorio .right li p {
  font-size: 17px;
  line-height: 1.42;
  color: var(--muted);
}
.velorio .real {
  margin-top: auto;
  padding: 20px 24px;
}
.velorio .real .label {
  margin-bottom: 6px;
}
.velorio .real p:not(.label) {
  font-size: 17px;
  line-height: 1.42;
  color: #dfe3e8;
}
.compact .velorio .v-head {
  grid-template-columns: auto 1fr;
  gap: 16px;
}
.compact .velorio .v-copy {
  grid-column: 1 / -1;
}
.compact .velorio .lead {
  font-size: 16px;
}
.compact .velorio .layout {
  grid-template-columns: 1fr;
  gap: 26px;
}
.compact .velorio .acta {
  transform: none;
  padding: 20px;
}
.compact .velorio .acta h3 {
  font-size: 28px;
}
.compact .velorio .acta dl div,
.compact .velorio .right li p,
.compact .velorio .real p:not(.label) {
  font-size: 15px;
}
.compact .velorio .right h4 {
  font-size: 18px;
}
</style>
