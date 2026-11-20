<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const abandonan = [
  'Registrar cosas sólo para que las vea la auditoría',
  'Las mediciones que los exponen ante el jefe',
  'Seguir todo el procedimiento cuando hay una urgencia.'
]
const sostienen = [
  'Dejar de comprarle a un proveedor que les daba problemas',
  'Que una tarea no se frene si falta quien la sabía hacer',
  'Redmine y Git: ahí registrar es parte del trabajo'
]
</script>

<template>
  <SlideFrame tone="gold" eyebrow="LO QUE DESCUBRIMOS" class="descubrimos">
    <template #title>
      Ven positivo <span class="ok">lo que les sirve a ellos</span>, pero abandonan lo que sienten que es
      <span class="ko">para el auditor o para el jefe</span>.
    </template>

    <div class="cols-2 versus">
      <article class="card side side-ko tone-flame a-left" style="--i: 3">
        <header>
          <span class="mark"><Icon name="x" :size="26" :stroke="2.6" /></span>
          <h3>Lo que abandonan</h3>
        </header>
        <ul>
          <li v-for="(t, i) in abandonan" :key="t" class="a-up" :style="{ '--i': 5 + i }">
            <Icon name="x" :size="18" :stroke="2.4" />
            <span>{{ t }}</span>
          </li>
        </ul>
      </article>

      <article class="card side side-ok tone-teal a-right" style="--i: 3">
        <header>
          <span class="mark"><Icon name="check" :size="26" :stroke="2.6" /></span>
          <h3>Lo que sostienen</h3>
        </header>
        <ul>
          <li v-for="(t, i) in sostienen" :key="t" class="a-up" :style="{ '--i': 5 + i }">
            <Icon name="check" :size="18" :stroke="2.4" />
            <span>{{ t }}</span>
          </li>
        </ul>
      </article>
    </div>
  </SlideFrame>
</template>

<style>
.descubrimos .title {
  font-size: 46px;
  line-height: 1.12;
  max-width: 1380px;
}
.descubrimos .ok {
  color: var(--teal);
}
.descubrimos .ko {
  color: var(--flame);
}
.descubrimos .versus {
  gap: 28px;
}
.descubrimos .side {
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 40px 42px 46px;
  border-color: color-mix(in srgb, var(--accent) 28%, transparent);
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 10%, transparent), transparent 70%);
}
.descubrimos .side header {
  display: flex;
  align-items: center;
  gap: 18px;
}
.descubrimos .mark {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #0b0b0b;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
}
.descubrimos .side h3 {
  font-size: 32px;
}
.descubrimos ul {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.descubrimos li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 26px;
  line-height: 1.35;
  color: #dfe3e8;
}
.descubrimos li svg {
  flex: none;
  margin-top: 8px;
  color: var(--accent);
}
.compact .descubrimos .title {
  font-size: 25px;
}
.compact .descubrimos .side h3 {
  font-size: 22px;
}
.compact .descubrimos li {
  font-size: 16px;
}
.compact .descubrimos li svg {
  margin-top: 2px;
}
</style>
