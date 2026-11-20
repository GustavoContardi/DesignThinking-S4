<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const ideas = [
  { n: '1.', who: 'Gustavo', name: 'Tinder de procedimientos', icon: 'heart', tone: 'flame', r: '-16deg', dx: '420px' },
  { n: '2.', who: 'Matt', name: 'Casamiento con el procedimiento', icon: 'rings', tone: 'gold', r: '4deg', dx: '0px' },
  { n: '3.', who: 'Juan Cruz', name: 'Velorio de procedimientos', icon: 'tomb', tone: 'violet', r: '16deg', dx: '-420px' }
]

const ajustes = [
  'Cada idea tiene su proceso real, su objetivo y su registro de control.',
  'Casamiento solo con 70 % o más; entre 40 y 69 %, segunda cita.',
  'Las objeciones de la minoría tienen un circuito propio.',
  'Un juez de paz coordina y administra todo el sistema.',
  'El acta de defunción deja trazabilidad y define el reemplazo.',
  'Cada uno vota solo los procedimientos en los que participa.'
]
</script>

<template>
  <SlideFrame tone="flame" eyebrow="FASE 3 - IDEAR" class="ideas">
    <template #title>Las 3 ideas seleccionadas del total:</template>

    <div class="cols-3 picks">
      <article
        v-for="(it, i) in ideas"
        :key="it.name"
        class="card pick a-deal"
        :class="`tone-${it.tone}`"
        :style="{ '--i': 4 + i * 3, '--r': it.r, '--dx': it.dx }"
      >
        <span class="glyph"><Icon :name="it.icon" :size="34" :stroke="1.8" /></span>
        <p class="n">{{ it.n }}</p>
        <p class="who">{{ it.who }}</p>
        <h3>{{ it.name }}</h3>
      </article>
    </div>

    <div class="card ajustes a-up" style="--i: 14">
      <p class="label">AJUSTES A PARTIR DE LA DEVOLUCIÓN</p>
      <ul class="cols-2">
        <li v-for="(a, i) in ajustes" :key="a" class="a-right" :style="{ '--i': 17 + i * 2 }">
          <span class="tick a-pop" :style="{ '--i': 19 + i * 2 }"><Icon name="check" :size="16" :stroke="3" /></span>
          {{ a }}
        </li>
      </ul>
    </div>
  </SlideFrame>
</template>

<style>
.ideas .pick {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto 1fr;
  column-gap: 16px;
  padding: 30px 32px;
  min-height: 250px;
  overflow: hidden;
}
.ideas .pick::after {
  content: '';
  position: absolute;
  right: -60px;
  bottom: -80px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 30%, transparent), transparent 70%);
  pointer-events: none;
}
.ideas .glyph {
  grid-column: 2;
  grid-row: 1 / span 2;
  display: grid;
  place-items: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  color: #12090b;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 16px 40px -14px var(--accent);
}
.ideas .pick:nth-child(1) .glyph svg { animation: heartbeat 1.6s 2s ease-in-out infinite; }
.ideas .pick:nth-child(2) .glyph svg { animation: wiggle 3s 2.2s ease-in-out infinite; }
.ideas .pick:nth-child(3) .glyph svg { animation: sway 3.5s 2.4s ease-in-out infinite; }
.ideas .n {
  font-family: var(--font-display);
  font-size: 46px;
  font-weight: 800;
  line-height: 1;
  color: var(--accent);
}
.ideas .who {
  margin-top: 8px;
  font-size: 18px;
  font-weight: 650;
  color: var(--muted);
}
.ideas .pick h3 {
  grid-column: 1 / -1;
  align-self: end;
  margin-top: 22px;
  font-size: 32px;
  line-height: 1.08;
}
.ideas .slide-body {
  gap: 30px;
}
.ideas .ajustes {
  padding: 26px 32px 28px;
}
.ideas .ajustes .label {
  margin-bottom: 16px;
}
.ideas .ajustes ul {
  column-gap: 40px;
  row-gap: 12px;
}
.ideas .ajustes li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 20px;
  line-height: 1.4;
  color: #d6dae0;
}
.ideas .tick {
  flex: none;
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  margin-top: 1px;
  border-radius: 50%;
  color: #04130f;
  background: var(--teal);
}
.compact .ideas .pick {
  min-height: 0;
  padding: 20px;
}
.compact .ideas .glyph {
  width: 54px;
  height: 54px;
}
.compact .ideas .n {
  font-size: 32px;
}
.compact .ideas .pick h3 {
  font-size: 22px;
  margin-top: 14px;
}
.compact .ideas .ajustes {
  margin-top: 8px;
  padding: 20px;
}
.compact .ideas .ajustes li {
  font-size: 15px;
}
</style>
