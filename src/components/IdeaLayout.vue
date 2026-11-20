<script setup>
/*
 * Plantilla de las slides "IDEA N": encabezado con numero, cuatro pasos de
 * "Como funciona" y dos tarjetas inferiores (proceso real / como se sostiene).
 * El slot "art" recibe una ilustracion decorativa sin texto.
 */
import SlideFrame from './SlideFrame.vue'

defineProps({
  eyebrow: { type: String, required: true },
  num: { type: String, required: true },
  title: { type: String, required: true },
  lead: { type: String, required: true },
  tone: { type: String, default: 'flame' },
  steps: { type: Array, required: true },
  bottom: { type: Array, required: true }
})
</script>

<template>
  <SlideFrame :tone="tone" :eyebrow="eyebrow" class="idea">
    <template #head>
      <div class="idea-head">
        <span class="idea-num a-pop" style="--i: 1">{{ num }}</span>
        <div class="idea-copy">
          <h2 class="title a-up" style="--i: 2">{{ title }}</h2>
          <p class="lead a-up" style="--i: 3">{{ lead }}</p>
        </div>
        <div class="idea-art a-fade" style="--i: 5" aria-hidden="true"><slot name="art" /></div>
      </div>
    </template>

    <p class="label a-fade" style="--i: 4">CÓMO FUNCIONA</p>
    <ol class="cols-4 idea-steps">
      <li v-for="(s, i) in steps" :key="s.title" class="card a-up" :style="{ '--i': 5 + i }">
        <header>
          <span class="num">{{ i + 1 }}</span>
          <h3>{{ s.title }}</h3>
        </header>
        <p>{{ s.text }}</p>
      </li>
    </ol>

    <div class="cols-2 idea-bottom">
      <div
        v-for="(b, i) in bottom"
        :key="b.label"
        class="card a-up"
        :class="{ 'card-glow': i === 1 }"
        :style="{ '--i': 9 + i }"
      >
        <p class="label">{{ b.label }}</p>
        <p class="txt">{{ b.text }}</p>
      </div>
    </div>
  </SlideFrame>
</template>

<style>
.idea .slide-head {
  margin-bottom: 26px;
}
.idea-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 30px;
}
.idea-num {
  display: grid;
  place-items: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  font-family: var(--font-display);
  font-size: 58px;
  font-weight: 800;
  color: #12090b;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 24px 60px -20px var(--accent);
}
.idea-copy {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.idea .lead {
  font-size: 21px;
  max-width: 980px;
}
.idea-art {
  width: 210px;
  height: 140px;
  position: relative;
}
.idea-steps {
  gap: 18px;
}
.idea-steps li {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px 26px 28px;
}
.idea-steps header {
  display: flex;
  align-items: center;
  gap: 14px;
}
.idea-steps h3 {
  font-size: 25px;
  line-height: 1.1;
}
.idea-steps p {
  font-size: 20px;
  line-height: 1.45;
  color: var(--muted);
}
.idea-bottom {
  gap: 18px;
}
.idea-bottom .card {
  padding: 24px 30px;
}
.idea-bottom .label {
  margin-bottom: 8px;
}
.idea-bottom .txt {
  font-size: 20px;
  line-height: 1.45;
  color: #dfe3e8;
}
.compact .idea-head {
  grid-template-columns: auto 1fr;
  gap: 16px;
}
.compact .idea-num {
  width: 64px;
  height: 64px;
  font-size: 32px;
}
.compact .idea-head .idea-copy {
  grid-column: 1 / -1;
}
.compact .idea-art {
  display: none;
}
.compact .idea .lead {
  font-size: 16px;
}
.compact .idea-steps h3 {
  font-size: 18px;
}
.compact .idea-steps p,
.compact .idea-bottom .txt {
  font-size: 15px;
}
</style>
