<script setup>
import IdeaLayout from '../components/IdeaLayout.vue'
import Icon from '../components/Icon.vue'

const steps = [
  { title: 'El perfil', text: 'Cada procedimiento tiene su perfil: qué hace, cuánto tiempo lleva y qué aporta. «Te llevo 1 minuto. Busco a alguien que me complete».' },
  { title: 'Solo lo que usás', text: 'Cada uno vota únicamente los procedimientos en los que participa, según la matriz que mantiene el juez de paz.' },
  { title: 'Deslizar y objetar', text: 'Derecha si te sirve. Izquierda si te sobra, con un motivo anónimo opcional: la objeción.' },
  { title: 'El resultado', text: '70 % o más: casamiento. Entre 40 y 69 %: segunda cita. Menos de 40 %: velorio.' }
]

const bottom = [
  { label: 'PROCESO REAL', text: 'Evaluación periódica de procedimientos por sus usuarios. Objetivo: saber cuáles aportan valor. Registro: resultados por área y objeciones (ISO 9001 9.1.3).' },
  { label: 'CÓMO SE SOSTIENE EN EL TIEMPO', text: 'Cada 3 meses, desde la app, en 5 minutos. Anónimo y por área: se evalúa el procedimiento, nunca a la persona.' }
]
</script>

<template>
  <IdeaLayout
    eyebrow="IDEA 1 - GUSTAVO"
    num="1"
    title="Tinder de procedimientos"
    lead="Cada empleado vota, de forma anónima, solo los procedimientos en los que participa: si le sirven o le sobran."
    tone="flame"
    :steps="steps"
    :bottom="bottom"
  >
    <!-- Ilustracion: una pila de tarjetas que se desliza a izquierda y derecha -->
    <template #art>
      <div class="swipe-art">
        <span class="sc sc3" />
        <span class="sc sc2" />
        <span class="sc sc1">
          <span class="ln w1" />
          <span class="ln w2" />
          <span class="ln w3" />
        </span>
        <span class="btn no"><Icon name="x" :size="20" :stroke="2.8" /></span>
        <span class="btn yes"><Icon name="heart" :size="20" :stroke="2.4" /></span>
      </div>
    </template>
  </IdeaLayout>
</template>

<style>
.swipe-art {
  position: absolute;
  inset: 0;
}
.swipe-art .sc {
  position: absolute;
  left: 50%;
  top: 0;
  width: 96px;
  height: 112px;
  margin-left: -48px;
  border-radius: 14px;
  border: 1px solid var(--line-2);
  background: var(--surface-2);
}
.swipe-art .sc2 {
  transform: rotate(-6deg) translateY(4px);
}
.swipe-art .sc3 {
  transform: rotate(7deg) translateY(6px);
  opacity: 0.6;
}
.swipe-art .sc1 {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 7px;
  padding: 12px;
  background: linear-gradient(160deg, color-mix(in srgb, var(--accent) 55%, var(--bg-2)), var(--bg-2));
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
  animation: swipe-card 4.8s 1.4s var(--ease-in-out) infinite;
  box-shadow: 0 20px 40px -20px var(--accent);
}
.swipe-art .ln {
  height: 6px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.5);
}
.swipe-art .w1 { width: 80%; }
.swipe-art .w2 { width: 55%; opacity: 0.6; }
.swipe-art .w3 { width: 65%; opacity: 0.4; }
.swipe-art .btn {
  position: absolute;
  bottom: -6px;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--bg-2);
  border: 1px solid var(--line-2);
}
.swipe-art .no {
  left: 38px;
  color: var(--muted);
}
.swipe-art .yes {
  right: 38px;
  color: var(--accent);
  border-color: color-mix(in srgb, var(--accent) 50%, transparent);
}
</style>
