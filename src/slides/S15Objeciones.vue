<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const circuito = [
  { title: 'Objeción anónima', text: 'Al deslizar a la izquierda se escribe el motivo. Ej.: «Duplica lo que ya está en Redmine».' },
  { title: 'El juez de paz agrupa', text: 'Junta las objeciones de cada procedimiento y las presenta sin nombres.' },
  { title: 'Segunda cita', text: 'Si la aprobación queda entre 40 y 69 %: reunión de 30 minutos para debatir por qué el equipo está dividido.' },
  { title: 'Decisión', text: 'Se ajusta y se vuelve a votar, se casa con condiciones o va al velorio.' }
]
</script>

<template>
  <SlideFrame tone="flame" eyebrow="IDEA 1 - GUSTAVO · OBJECIONES Y SEGUNDA CITA" class="objeciones">
    <template #title>La minoría también tiene la palabra.</template>
    <template #head>
      <p class="lead a-up" style="--i: 2">
        Quien vota en contra puede tener la información más valiosa. Por eso cada objeción sigue un circuito propio.
      </p>
    </template>

    <p class="label a-fade" style="--i: 3">EL CIRCUITO DE UNA OBJECIÓN</p>
    <ol class="circuito">
      <template v-for="(c, i) in circuito" :key="c.title">
        <li class="card a-up" :style="{ '--i': 4 + i * 2 }">
          <header>
            <span class="num">{{ i + 1 }}</span>
            <h3>{{ c.title }}</h3>
          </header>
          <p>{{ c.text }}</p>
        </li>
        <span v-if="i < 3" class="arrow a-fade" :style="{ '--i': 5 + i * 2 }" aria-hidden="true">
          <Icon name="arrow-right" :size="22" />
        </span>
      </template>
    </ol>

    <div class="cols-2 extra">
      <div class="card a-up" style="--i: 12">
        <span class="ic tone-gold"><Icon name="warning" :size="22" /></span>
        <div>
          <p class="label">EN LA BODA: ¿ALGUIEN SE OPONE?</p>
          <p>Hay un momento formal de objeciones. Una objeción fundada frena el casamiento hasta revisarla.</p>
        </div>
      </div>
      <div class="card a-up" style="--i: 13">
        <span class="ic tone-teal"><Icon name="kanban" :size="22" /></span>
        <div>
          <p class="label">TABLERO DE MEJORAS</p>
          <p>Toda objeción queda registrada con responsable y fecha de respuesta. Aunque el procedimiento se case, la objeción se trabaja.</p>
        </div>
      </div>
    </div>

    <p class="ejemplo a-up" style="--i: 14">
      <Icon name="lightbulb" :size="20" />
      <span><b>Ejemplo: </b>Encuesta de mesa de ayuda, 55 % de aprobación → segunda cita. Las objeciones dicen «con una pregunta alcanza» → se reduce y se vuelve a votar.</span>
    </p>
  </SlideFrame>
</template>

<style>
.objeciones .slide-head {
  margin-bottom: 22px;
}
.objeciones .lead {
  font-size: 21px;
}
.objeciones .slide-body {
  gap: 16px;
}
.objeciones .circuito {
  display: grid;
  grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr;
  align-items: stretch;
  gap: 10px;
}
.objeciones .circuito li {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px 24px 26px;
}
.objeciones .circuito header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.objeciones .circuito h3 {
  font-size: 23px;
  line-height: 1.1;
}
.objeciones .circuito p {
  font-size: 19px;
  line-height: 1.42;
  color: var(--muted);
}
.objeciones .arrow {
  align-self: center;
  color: var(--accent);
  opacity: 0.7;
}
.objeciones .extra .card {
  display: flex;
  gap: 18px;
  padding: 18px 24px;
}
.objeciones .extra .label {
  margin-bottom: 6px;
}
.objeciones .extra p:not(.label) {
  font-size: 18.5px;
  line-height: 1.42;
  color: #d6dae0;
}
.objeciones .ic {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}
.objeciones .ejemplo {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 22px;
  border-radius: var(--radius-sm);
  font-size: 18.5px;
  color: #dfe3e8;
  background: color-mix(in srgb, var(--accent) 10%, transparent);
  border: 1px dashed color-mix(in srgb, var(--accent) 45%, transparent);
}
.objeciones .ejemplo svg {
  flex: none;
  color: var(--accent);
}
.compact .objeciones .lead {
  font-size: 16px;
}
.compact .objeciones .circuito {
  grid-template-columns: 1fr;
}
.compact .objeciones .arrow {
  justify-self: center;
  transform: rotate(90deg);
}
.compact .objeciones .circuito h3 {
  font-size: 18px;
}
.compact .objeciones .circuito p,
.compact .objeciones .extra p:not(.label),
.compact .objeciones .ejemplo {
  font-size: 15px;
}
.compact .objeciones .ejemplo {
  align-items: flex-start;
}
</style>
