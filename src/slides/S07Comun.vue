<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import IconBadge from '../components/IconBadge.vue'

const items = [
  { icon: 'file-plus', title: 'Lo viven como trabajo extra', text: 'Más documentos, más registros, más reuniones.' },
  { icon: 'telescope', title: 'El beneficio lo ven lejos', text: 'El esfuerzo es hoy, la mejora "a largo plazo".' },
  { icon: 'circle-dashed', title: 'Cumplen a medias', text: 'Siguen lo que les sirve. El resto lo saltean o lo completan después.' },
  { icon: 'shield-x', title: 'Rechazan lo que viene de afuera', text: 'Ante cada propuesta responden: "eso ya lo hacemos".' }
]
</script>

<template>
  <SlideFrame tone="gold" eyebrow="ETAPA 2 - DEFINIR" class="comun">
    <template #title>Lo común entre los entrevistados.</template>

    <div class="layout">
      <div class="cols-2 grid">
        <article
          v-for="(it, i) in items"
          :key="it.title"
          class="card item a-up"
          :style="{ '--i': 2 + i }"
        >
          <IconBadge :icon="it.icon" :size="54" />
          <div>
            <h3>{{ it.title }}</h3>
            <p class="muted">{{ it.text }}</p>
          </div>
        </article>
      </div>

      <aside class="card card-solid valoran a-right" style="--i: 7">
        <IconBadge icon="anchor" :size="64" class="anchor-badge" />
        <p class="label">LO QUE SÍ VALORAN</p>
        <p class="big">Tener orden y que no haya trabajo que dependa de una sola persona.</p>
        <p class="foot">Este es el punto de apoyo de nuestra propuesta.</p>
      </aside>
    </div>
  </SlideFrame>
</template>

<style>
.comun .layout {
  display: grid;
  grid-template-columns: 2.25fr 1fr;
  gap: 28px;
}
.comun .grid {
  grid-auto-rows: 1fr;
}
.comun .item {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 32px 32px 34px;
}
.comun .item h3 {
  font-size: 30px;
  margin-bottom: 10px;
}
.comun .item p {
  font-size: 23px;
  line-height: 1.4;
}
.comun .valoran {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 34px;
}
.comun .valoran:hover {
  transform: translateY(-4px) rotate(-0.4deg);
}
.comun .anchor-badge {
  background: rgba(0, 0, 0, 0.14) !important;
  color: #2a1a00 !important;
  box-shadow: none !important;
  margin-bottom: 12px;
}
.comun .valoran .label {
  opacity: 0.75;
}
.comun .big {
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
}
.comun .foot {
  margin-top: auto;
  font-size: 18px;
  font-style: italic;
  opacity: 0.8;
}
.compact .comun .layout {
  grid-template-columns: 1fr;
}
.compact .comun .item h3 {
  font-size: 20px;
}
.compact .comun .item p {
  font-size: 15.5px;
}
.compact .comun .big {
  font-size: 24px;
}
</style>
