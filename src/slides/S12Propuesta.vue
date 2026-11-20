<script setup>
import SlideFrame from '../components/SlideFrame.vue'
import Icon from '../components/Icon.vue'

const procesos = [
  {
    tone: 'flame',
    icon: 'heart',
    step: '1 · SE CONOCEN',
    name: 'Tinder',
    rows: [
      ['PROCESO REAL', 'Evaluación periódica de los procedimientos por quienes los usan.'],
      ['OBJETIVO', 'Detectar cuáles aportan valor y cuáles solo suman trabajo.'],
      ['REGISTRO DE CONTROL', 'Resultado por procedimiento y por área, más las objeciones.'],
      ['ISO 9001', '9.1.3 Análisis y evaluación.']
    ]
  },
  {
    tone: 'gold',
    icon: 'rings',
    step: '2 · SE CASAN',
    name: 'Casamiento',
    rows: [
      ['PROCESO REAL', 'Aprobación formal del procedimiento y compromiso de cumplirlo.'],
      ['OBJETIVO', 'Que cada procedimiento vigente tenga dueño, versión para urgencias y fecha de revisión.'],
      ['REGISTRO DE CONTROL', 'Acta de aprobación: la libreta.'],
      ['ISO 9001', '5.1 Liderazgo · 7.5.2 Creación y actualización.']
    ]
  },
  {
    tone: 'violet',
    icon: 'tomb',
    step: '3 · SE DESPIDEN',
    name: 'Velorio',
    rows: [
      ['PROCESO REAL', 'Baja controlada de un procedimiento obsoleto.'],
      ['OBJETIVO', 'Eliminar lo que sobra sin perder lo útil y dejando la causa por escrito.'],
      ['REGISTRO DE CONTROL', 'Acta de defunción, que alimenta el tablero de mejoras.'],
      ['ISO 9001', '7.5.3 Control · 10.3 Mejora continua.']
    ]
  }
]
</script>

<template>
  <SlideFrame tone="flame" eyebrow="NUESTRA PROPUESTA" class="propuesta">
    <template #title>La vida de un procedimiento: tres procesos reales.</template>

    <div class="cols-3 procesos persp">
      <article
        v-for="(p, i) in procesos"
        :key="p.name"
        class="proc a-flip-x"
        :class="`tone-${p.tone}`"
        :style="{ '--i': 4 + i * 3 }"
      >
        <header>
          <span class="glyph a-pop" :style="{ '--i': 6 + i * 3 }"><Icon :name="p.icon" :size="30" :stroke="1.9" /></span>
          <div>
            <p class="label">{{ p.step }}</p>
            <h3>{{ p.name }}</h3>
          </div>
        </header>
        <dl class="card">
          <div v-for="(r, k) in p.rows" :key="r[0]" class="row-item a-up" :style="{ '--i': 9 + i * 2 + k * 3 }">
            <dt>{{ r[0] }}</dt>
            <dd>{{ r[1] }}</dd>
          </div>
        </dl>
      </article>
    </div>

    <p class="control a-wipe" style="--i: 24">
      <Icon name="shield-check" :size="22" />
      <span><b>Debajo del humor hay un circuito de control: </b>cada procedimiento se evalúa, se aprueba con dueño y se da de baja con registro.</span>
    </p>
  </SlideFrame>
</template>

<style>
.propuesta .slide-head {
  margin-bottom: 26px;
}
.propuesta .procesos {
  gap: 24px;
}
.propuesta .proc {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.propuesta .proc header {
  display: flex;
  align-items: center;
  gap: 16px;
}
.propuesta .glyph {
  display: grid;
  place-items: center;
  width: 62px;
  height: 62px;
  border-radius: 50%;
  color: #12090b;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 14px 34px -14px var(--accent);
}
.propuesta .proc:nth-child(1) .glyph svg { animation: heartbeat 1.6s 2.4s ease-in-out infinite; }
.propuesta .proc:nth-child(2) .glyph svg { animation: wiggle 3s 2.6s ease-in-out infinite; }
.propuesta .proc:nth-child(3) .glyph svg { animation: sway 3.5s 2.8s ease-in-out infinite; }
.propuesta .control svg { animation: in-pop 0.8s 2.6s var(--ease-back) both; }
.propuesta .proc h3 {
  font-size: 34px;
  margin-top: 2px;
}
.propuesta dl {
  flex: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px 28px;
  border-color: color-mix(in srgb, var(--accent) 22%, transparent);
}
.propuesta dt {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  color: var(--accent);
  margin-bottom: 4px;
}
.propuesta dd {
  margin: 0;
  font-size: 20px;
  line-height: 1.38;
  color: #dfe3e8;
}
.propuesta .control {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 24px;
  border-radius: 999px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  font-size: 18px;
  color: var(--muted);
}
.propuesta .control svg {
  flex: none;
  color: var(--teal);
}
.compact .propuesta .proc h3 {
  font-size: 24px;
}
.compact .propuesta dd {
  font-size: 15px;
}
.compact .propuesta .control {
  border-radius: var(--radius);
  align-items: flex-start;
  font-size: 15px;
}
</style>
