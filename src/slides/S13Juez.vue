<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import IconBadge from '../components/IconBadge.vue'

const quien = [
  ['QUIÉN ES', 'Un miembro del equipo, no un directivo. Lo elige el equipo, rota cada año y tiene horas asignadas para la tarea.'],
  ['QUÉ NO HACE', 'No evalúa personas ni decide solo: coordina, registra y hace seguimiento.'],
  ['Y LA DIRECCIÓN', 'Es padrino institucional: da recursos, firma las actas y revisa los resultados (ISO 9001 9.3).']
]

const trimestre = [
  { when: 'Semana 1', b: 'Prepara.', t: ' Actualiza la matriz de participación (quién usa cada procedimiento) y abre la votación en la app.' },
  { when: 'Semanas 2 y 3', b: 'Votación.', t: ' Recuerda, responde dudas y junta las objeciones anónimas de cada procedimiento.' },
  { when: 'Fin semana 3', b: 'Resultados.', t: ' Cierra el ciclo, publica los resultados por área y convoca las segundas citas.' },
  { when: 'Semana 4', b: 'Ceremonias.', t: ' Oficia casamientos y velorios, labra las actas y carga las mejoras en el tablero.' },
  { when: 'Todo el año', b: 'Seguimiento.', t: ' Administra la app, controla los aniversarios a 6 meses y el avance del tablero de mejoras.' }
]
</script>

<template>
  <SlideFrame tone="teal" eyebrow="EL ROL QUE COORDINA - MATT" class="juez">
    <template #title>El juez de paz: quien hace funcionar el sistema.</template>

    <div class="layout">
      <aside class="card card-glow perfil a-left" style="--i: 2">
        <header>
          <IconBadge icon="gavel" :size="64" variant="solid" />
          <h3>Juez de paz</h3>
        </header>
        <dl>
          <div v-for="q in quien" :key="q[0]">
            <dt class="label">{{ q[0] }}</dt>
            <dd>{{ q[1] }}</dd>
          </div>
        </dl>
      </aside>

      <section class="timeline">
        <p class="label a-fade" style="--i: 3">QUÉ HACE EN CADA TRIMESTRE</p>
        <ol>
          <li v-for="(s, i) in trimestre" :key="s.when" class="a-right" :style="{ '--i': 4 + i }">
            <span class="when">{{ s.when }}</span>
            <span class="dot" aria-hidden="true" />
            <p class="what"><b>{{ s.b }}</b>{{ s.t }}</p>
          </li>
        </ol>
      </section>
    </div>
  </SlideFrame>
</template>

<style>
.juez .layout {
  display: grid;
  grid-template-columns: 1fr 1.75fr;
  align-items: center;
  gap: 36px;
}
.juez .perfil {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
}
.juez .perfil header {
  display: flex;
  align-items: center;
  gap: 18px;
}
.juez .perfil h3 {
  font-size: 34px;
}
.juez dl {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.juez dt {
  margin-bottom: 6px;
  font-size: 12.5px;
}
.juez dd {
  margin: 0;
  font-size: 20px;
  line-height: 1.45;
  color: #d6dae0;
}
.juez .timeline {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.juez .timeline ol {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.juez .timeline ol::before {
  content: '';
  position: absolute;
  left: 189px;
  top: 30px;
  bottom: 30px;
  width: 2px;
  background: linear-gradient(var(--accent), color-mix(in srgb, var(--accent-2) 30%, transparent));
  opacity: 0.5;
}
.juez .timeline li {
  display: grid;
  grid-template-columns: 170px 40px 1fr;
  align-items: center;
  gap: 0;
  padding: 18px 22px 18px 0;
  border-radius: var(--radius-sm);
  transition: background 0.3s;
}
.juez .timeline li:hover {
  background: var(--surface);
}
.juez .when {
  justify-self: end;
  padding: 9px 16px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 12%, transparent);
  white-space: nowrap;
}
.juez .dot {
  justify-self: center;
  width: 14px;
  height: 14px;
  margin-left: 0;
  border-radius: 50%;
  background: var(--bg);
  border: 3px solid var(--accent);
  box-shadow: 0 0 14px var(--accent);
  position: relative;
  left: 0;
}
.juez .what {
  font-size: 20px;
  line-height: 1.42;
  color: var(--muted);
  padding-left: 8px;
}
.compact .juez .layout {
  grid-template-columns: 1fr;
}
.compact .juez .perfil {
  padding: 20px;
}
.compact .juez .perfil h3 {
  font-size: 24px;
}
.compact .juez dd {
  font-size: 15.5px;
}
.compact .juez .timeline ol::before {
  display: none;
}
.compact .juez .timeline li {
  grid-template-columns: 1fr;
  gap: 8px;
  padding: 0;
}
.compact .juez .when {
  justify-self: start;
  font-size: 14px;
}
.compact .juez .dot {
  display: none;
}
.compact .juez .what {
  font-size: 15.5px;
  padding-left: 0;
}
</style>
