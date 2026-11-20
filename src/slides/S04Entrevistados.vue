<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import IconBadge from '../components/IconBadge.vue'

const people = [
  {
    name: 'Leandro Centurión',
    role: 'Responsable de Operaciones · Soporte Técnico, 10 personas',
    text: 'Al principio lo resistió. Hoy cree que el sistema mejora el trabajo a pesar del fastidio del proceso, pero le incomoda que lo midan.'
  },
  {
    name: 'Romina Pontiroli',
    role: 'Coordinadora de Innovación · Desarrollo de Sistemas, 8 personas',
    text: 'Entiende para qué sirve y sus beneficios, pero su equipo es chico y vive apagando incendios. Se muestra dubitativa.'
  },
  {
    name: 'Germán Perrone',
    role: 'Coordinador Operativo de Sistemas · Infraestructura y Mesa de Ayuda',
    text: 'Reconoce que sirvió para ordenar, pero hoy no cree que el beneficio de los cambios paguen el esfuerzo hecho para adoptarlo.'
  }
]
</script>

<template>
  <SlideFrame tone="teal" eyebrow="FASE 1 - EMPATIZAR" class="entrevistados">
    <template #title>Escuchamos a tres jefes del área de Sistemas.</template>

    <div class="cols-3 people">
      <article
        v-for="(p, i) in people"
        :key="p.name"
        class="card person a-up"
        :style="{ '--i': 2 + i * 2 }"
      >
        <div class="avatar">
          <span class="halo" />
          <IconBadge icon="user" :size="72" variant="solid" />
        </div>
        <h3>{{ p.name }}</h3>
        <p class="role">{{ p.role }}</p>
        <p class="text">{{ p.text }}</p>
      </article>
    </div>
  </SlideFrame>
</template>

<style>
.entrevistados .people {
  gap: 26px;
}
.entrevistados .person {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 36px 34px;
}
.entrevistados .avatar {
  position: relative;
  width: 72px;
  height: 72px;
  margin-bottom: 14px;
}
.entrevistados .halo {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
}
.entrevistados h3 {
  font-size: 30px;
}
.entrevistados .role {
  font-size: var(--fs-small);
  font-weight: 650;
  color: var(--accent);
  line-height: 1.4;
  min-height: 2.8em;
}

.entrevistados .text {
  margin-top: 8px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  font-size: 23px;
  color: #d6dae0;
  line-height: 1.5;
}
.compact .entrevistados h3 {
  font-size: 22px;
}
.compact .entrevistados .text {
  font-size: 16px;
}
.compact .entrevistados .person {
  min-height: 0;
}
.compact .entrevistados .role {
  min-height: 0;
}
</style>
