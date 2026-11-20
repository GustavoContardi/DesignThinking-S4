<script setup>
import IdeaLayout from '../components/IdeaLayout.vue'
import Icon from '../components/Icon.vue'

const steps = [
  { title: 'La ceremonia', text: 'Oficia el juez de paz. Se casa el equipo entero, no una persona: el compromiso es de todos.' },
  { title: '¿Alguien se opone?', text: 'Momento formal de objeciones. Si hay una objeción fundada, el casamiento se posterga hasta revisarla.' },
  { title: 'Votos y prenup', text: 'Los votos dicen qué aporta el procedimiento. El acuerdo prenupcial es su versión express para urgencias.' },
  { title: 'La libreta', text: 'Acta de aprobación: dueño del procedimiento, versión vigente y fecha de revisión a los 6 meses.' }
]

const bottom = [
  { label: 'PROCESO REAL', text: 'Aprobación formal y compromiso de cumplimiento. Objetivo: que cada procedimiento vigente tenga dueño, versión para urgencias y revisión programada (ISO 9001 5.1 y 7.5.2).' },
  { label: 'CÓMO SE SOSTIENE EN EL TIEMPO', text: 'Aniversario a los 6 meses: el juez de paz revisa con datos si se cumplió. Si cumplió, se renuevan los votos. Si no, segunda cita o divorcio.' }
]
</script>

<template>
  <IdeaLayout
    eyebrow="IDEA 2 - MATT"
    num="2"
    title="Casamiento con el procedimiento"
    lead="Los procedimientos con 70 % o más de aprobación se aprueban formalmente y el equipo asume en público el compromiso de cumplirlos."
    tone="gold"
    :steps="steps"
    :bottom="bottom"
  >
    <!-- Ilustracion: anillos con destellos -->
    <template #art>
      <div class="rings-art">
        <span class="glow" />
        <span class="spark s1" />
        <span class="spark s2" />
        <span class="spark s3" />
        <Icon name="rings" :size="112" :stroke="1.3" />
      </div>
    </template>
  </IdeaLayout>
</template>

<style>
.rings-art {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--accent);
}
.rings-art svg {
  position: relative;
  animation: float 5s ease-in-out infinite;
  filter: drop-shadow(0 10px 24px color-mix(in srgb, var(--accent) 60%, transparent));
}
.rings-art .glow {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: radial-gradient(circle, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%);
}
.rings-art .spark {
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 2px;
  background: var(--accent);
  transform: rotate(45deg);
  animation: pulse-ring 2.6s ease-out infinite;
}
.rings-art .s1 { top: 14px; left: 44px; }
.rings-art .s2 { top: 36px; right: 34px; animation-delay: 0.9s; }
.rings-art .s3 { bottom: 18px; right: 58px; animation-delay: 1.7s; }
</style>
