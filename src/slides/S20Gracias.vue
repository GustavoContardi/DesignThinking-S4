<script setup>
/*
 * Cierre. No existe en el .pptx: es la slide de despedida.
 * Secuencia: entra detras de una cortina con los cuatro colores del deck,
 * las letras de "Gracias" caen en 3D, al aterrizar hay un destello con ondas
 * y una explosion de iconos (corazon, anillos, lapida), y arrancan los fuegos
 * artificiales en loop. Click en cualquier parte: explosion en ese punto.
 */
import { ref } from 'vue'
import Icon from '../components/Icon.vue'
import Fireworks from '../components/Fireworks.vue'
import Confetti from '../components/Confetti.vue'

const word = [...'¡Gracias!']

/* Explosion de iconos de la metafora desde el centro del titulo. */
const icons = ['heart', 'rings', 'tomb']
const tones = ['flame', 'gold', 'violet', 'teal']
const burst = Array.from({ length: 20 }, (_, i) => {
  const a = (i / 20) * Math.PI * 2 + (i % 2) * 0.12
  const r = 1 + (i % 3) * 0.22
  return {
    icon: icons[i % 3],
    tone: tones[i % 4],
    tx: Math.round(Math.cos(a) * 520 * r) + 'px',
    ty: Math.round(Math.sin(a) * 250 * r) + 'px',
    rot: ((i % 5) - 2) * 40 + 'deg',
    size: 30 + (i % 4) * 8,
    d: (i % 4) * 40 + 'ms'
  }
})

const team = [
  { name: 'Contardi, Gustavo Andrés', role: 'Idea 1 · Tinder de procedimientos', icon: 'heart', tone: 'flame' },
  { name: 'Zander, Matt', role: 'Idea 2 · Casamiento con el procedimiento', icon: 'rings', tone: 'gold' },
  { name: 'Ranero, Juan Cruz', role: 'Idea 3 · Velorio de procedimientos', icon: 'tomb', tone: 'violet' }
]

const terms = [
  'Tinder de procedimientos',
  'Casamiento',
  'Velorio',
  'Juez de paz',
  'Segunda cita',
  'Objeciones',
  'Acta de defunción',
  'Tablero de mejoras'
]

const fw = ref(null)
function onPointerDown(e) {
  if (e.target.closest('button, a')) return
  fw.value?.burst(e.clientX, e.clientY)
}
</script>

<template>
  <section class="slide tone-flame gracias" @pointerdown="onPointerDown">
    <!-- Capas de fondo -->
    <div class="fx-back" aria-hidden="true">
      <span class="rays" />
      <span class="rays r2" />
      <Fireworks ref="fw" :delay="2000" />
    </div>

    <div class="content">
      <p v-split:type="{ delay: 250, step: 30 }" class="eyebrow">GRUPO 3 · SISTEMAS IV · TP DESIGN THINKING</p>

      <div class="word-wrap">
        <span class="word-glow" aria-hidden="true" />
        <span class="flash" aria-hidden="true" />
        <span v-for="n in 3" :key="'w' + n" class="wave" :class="'w' + n" :style="{ '--n': n }" aria-hidden="true" />
        <span class="burst" aria-hidden="true">
          <span
            v-for="(b, i) in burst"
            :key="i"
            class="bi"
            :class="`tone-${b.tone}`"
            :style="{ '--tx': b.tx, '--ty': b.ty, '--rot': b.rot, '--bd': b.d }"
          >
            <Icon :name="b.icon" :size="b.size" :stroke="1.8" />
          </span>
        </span>

        <h2 class="word" aria-label="¡Gracias!">
          <span
            v-for="(ch, i) in word"
            :key="i"
            class="gl"
            :style="{ '--i': i }"
            aria-hidden="true"
          >
            <span class="gli">{{ ch }}</span>
          </span>
        </h2>
      </div>

      <p v-split="{ delay: 2000, step: 70 }" class="tagline">
        <!-- En una sola linea: Vue elimina los espacios entre elementos si hay salto de linea -->
        <span class="hl tone-flame">Se conocen.</span> <span class="hl tone-gold">Se casan.</span> <span class="hl tone-violet">Se despiden.</span> Y el ciclo se repite solo.
      </p>

      <div class="ask-wrap a-pop tone-teal" style="--i: 30">
        <div class="ask card card-glow">
          <span class="ask-icon"><Icon name="help" :size="34" :stroke="2" /></span>
          <span v-split:type="{ delay: 2900, step: 60 }" class="ask-text">¿Preguntas?</span>
          <span class="caret" />
        </div>
      </div>

      <div class="team">
        <div
          v-for="(p, i) in team"
          :key="p.name"
          class="member-wrap a-deal"
          :class="`tone-${p.tone}`"
          :style="{ '--i': 34 + i * 3, '--r': (i - 1) * 14 + 'deg', '--dx': (i - 1) * 260 + 'px' }"
        >
          <div class="member card">
            <span class="avatar"><Icon :name="p.icon" :size="p.icon === 'tomb' ? 24 : 28" :stroke="1.9" /></span>
            <span class="who">
              <b>{{ p.name }}</b>
              <small>{{ p.role }}</small>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Cintas cruzadas con los conceptos del deck -->
    <div class="ribbons" aria-hidden="true">
      <div class="ribbon rb-back a-right" style="--i: 44">
        <div class="track rev">
          <template v-for="k in 2" :key="'b' + k">
            <span v-for="n in 6" :key="n" class="rt">
              Gracias <i class="dot" /> ¿Preguntas? <i class="dot" />
            </span>
          </template>
        </div>
      </div>
      <div class="ribbon rb-front a-left" style="--i: 42">
        <div class="track">
          <template v-for="k in 2" :key="'f' + k">
            <span v-for="(t, i) in terms" :key="t" class="rt">
              {{ t }}
              <Icon :name="icons[i % 3]" :size="22" :stroke="2.2" />
            </span>
          </template>
        </div>
      </div>
    </div>

    <div class="fx-front" aria-hidden="true">
      <Confetti :colors="['#ff4d6d', '#ffc857', '#a78bfa', '#2dd4bf', '#ffffff']" :count="240" :delay="2150" />
    </div>
  </section>
</template>

<style>
@property --shift {
  syntax: '<length>';
  inherits: false;
  initial-value: 0px;
}

.gracias {
  --enter-delay: 520ms;
  /* Momento del "impacto": cuando aterriza la ultima letra. */
  --hit: calc(var(--enter-delay) + 1500ms);
  overflow: hidden;
  padding-top: 48px;
  cursor: crosshair;
}
.gracias .content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* ---------- Fondo ---------- */
.gracias .fx-back,
.gracias .fx-front {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.gracias .fx-back {
  z-index: 0;
}
.gracias .fx-front {
  z-index: 5;
}
.gracias .rays {
  position: absolute;
  left: 50%;
  top: 26%;
  width: 2200px;
  height: 2200px;
  margin: -1100px 0 0 -1100px;
  border-radius: 50%;
  background: repeating-conic-gradient(
    from 0deg,
    rgba(255, 77, 109, 0.13) 0deg 4deg,
    transparent 4deg 15deg,
    rgba(255, 200, 87, 0.12) 15deg 19deg,
    transparent 19deg 30deg,
    rgba(167, 139, 250, 0.13) 30deg 34deg,
    transparent 34deg 45deg,
    rgba(45, 212, 191, 0.12) 45deg 49deg,
    transparent 49deg 60deg
  );
  mask: radial-gradient(circle, #000 4%, rgba(0, 0, 0, 0.5) 22%, transparent 48%);
  -webkit-mask: radial-gradient(circle, #000 4%, rgba(0, 0, 0, 0.5) 22%, transparent 48%);
  animation:
    gr-rays-in 1.6s var(--ease-out) both,
    spin 70s linear infinite;
  animation-delay: var(--hit), 0s;
}
.gracias .rays.r2 {
  opacity: 0.6;
  scale: 0.7;
  animation:
    gr-rays-in 1.6s var(--ease-out) both,
    spin-rev 50s linear infinite;
  animation-delay: calc(var(--hit) + 200ms), 0s;
}
@keyframes gr-rays-in {
  from { opacity: 0; scale: 0.2; }
}

/* ---------- Titulo ---------- */
.gracias .eyebrow {
  margin-bottom: 4px;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 6px;
}
.gracias .word-wrap {
  position: relative;
  display: grid;
  place-items: center;
}
.gracias .word {
  position: relative;
  display: flex;
  font-size: 268px;
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: -0.05em;
  perspective: 1000px;
  white-space: nowrap;
}
.gracias .gl {
  display: inline-block;
  transform-origin: 50% 100%;
  animation: gr-drop 0.95s var(--ease-out) both;
  animation-delay: calc(var(--enter-delay) + 420ms + var(--i) * 85ms);
}
.gracias .gli {
  display: inline-block;
  padding: 0.04em 0.02em 0.1em;
  margin: -0.04em -0.02em -0.1em;
  color: transparent;
  background: linear-gradient(
      90deg,
      #ff4d6d,
      #ff8a3d,
      #ffc857,
      #ff9f43,
      #a78bfa,
      #6366f1,
      #2dd4bf,
      #38bdf8,
      #ff4d6d
    )
    0 0 / 6em 100% repeat-x;
  background-position-x: calc(var(--i) * -0.52em + var(--shift));
  -webkit-background-clip: text;
  background-clip: text;
  transform-origin: 50% 90%;
  animation:
    gr-flow 7s linear infinite,
    gr-wave 3.2s ease-in-out infinite;
  animation-delay: 0s, calc(var(--hit) + 1400ms + var(--i) * 95ms);
  animation-fill-mode: none;
}
@keyframes gr-drop {
  0% { opacity: 0; translate: 0 -1.1em; rotate: x 100deg; scale: 0.5; filter: blur(14px); }
  55% { opacity: 1; translate: 0 0.07em; rotate: x -14deg; scale: 1.08 0.94; filter: blur(0); }
  75% { translate: 0 -0.03em; rotate: x 5deg; scale: 0.98 1.03; }
  100% { opacity: 1; translate: 0 0; rotate: x 0deg; scale: 1; filter: blur(0); }
}
@keyframes gr-flow {
  to { --shift: 6em; }
}
@keyframes gr-wave {
  0%, 36%, 100% { translate: 0 0; scale: 1; }
  12% { translate: 0 -0.08em; scale: 1.05; }
  24% { translate: 0 0.01em; scale: 0.99; }
}

.gracias .word-glow {
  position: absolute;
  inset: 12% 4%;
  border-radius: 50%;
  background:
    radial-gradient(closest-side at 25% 50%, rgba(255, 77, 109, 0.5), transparent),
    radial-gradient(closest-side at 50% 50%, rgba(255, 200, 87, 0.35), transparent),
    radial-gradient(closest-side at 75% 50%, rgba(167, 139, 250, 0.45), transparent);
  filter: blur(60px);
  animation:
    in-fade 1.2s var(--ease-out) both,
    breathe 4s ease-in-out infinite;
  animation-delay: var(--hit), calc(var(--hit) + 1.2s);
}
.gracias .flash {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 1400px;
  height: 1400px;
  margin: -700px 0 0 -700px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.85), rgba(255, 210, 170, 0.25) 25%, transparent 55%);
  opacity: 0;
  animation: gr-flash 1.1s var(--ease-out) both;
  animation-delay: var(--hit);
  pointer-events: none;
}
@keyframes gr-flash {
  0% { opacity: 0; scale: 0.2; }
  12% { opacity: 1; }
  100% { opacity: 0; scale: 1.2; }
}
.gracias .wave {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 300px;
  margin: -150px 0 0 -150px;
  border-radius: 50%;
  border: 3px solid var(--gold);
  opacity: 0;
  animation: gr-wave-out 1.6s var(--ease-out) both;
  animation-delay: calc(var(--hit) + var(--n) * 140ms);
  pointer-events: none;
}
.gracias .wave.w1 { border-color: var(--flame); }
.gracias .wave.w3 { border-color: var(--teal); }
@keyframes gr-wave-out {
  0% { opacity: 0.9; scale: 0.3; }
  100% { opacity: 0; scale: 5 2.4; }
}

.gracias .burst {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
}
.gracias .bi {
  position: absolute;
  display: grid;
  place-items: center;
  translate: -50% -50%;
  color: var(--accent);
  filter: drop-shadow(0 0 12px var(--accent));
  opacity: 0;
  animation: gr-burst 1.8s cubic-bezier(0.1, 0.8, 0.3, 1) both;
  animation-delay: calc(var(--hit) + var(--bd));
}
@keyframes gr-burst {
  0% { opacity: 0; translate: -50% -50%; scale: 0.2; rotate: 0deg; }
  12% { opacity: 1; scale: 1.2; }
  70% { opacity: 0.9; }
  100% {
    opacity: 0;
    translate: calc(-50% + var(--tx)) calc(-50% + var(--ty));
    scale: 0.9;
    rotate: var(--rot);
  }
}

/* ---------- Bajada ---------- */
.gracias .tagline {
  margin-top: 10px;
  font-family: var(--font-display);
  font-size: 34px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--text);
}
.gracias .tagline .hl {
  font-weight: 800;
}

.gracias .ask-wrap {
  margin-top: 30px;
}
.gracias .ask {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 16px 34px 16px 22px;
  border-radius: 999px;
  box-shadow: 0 0 60px -10px color-mix(in srgb, var(--accent) 55%, transparent);
}
.gracias .ask-icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  color: #04130f;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  animation: wiggle 2.6s ease-in-out infinite;
  animation-delay: 4s;
}
.gracias .ask-text {
  font-family: var(--font-display);
  font-size: 46px;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
}
.gracias .caret {
  width: 4px;
  height: 44px;
  margin-left: -10px;
  border-radius: 2px;
  background: var(--accent);
  animation: gr-blink 1s steps(1) infinite;
}
@keyframes gr-blink {
  50% { opacity: 0; }
}

/* ---------- Equipo ---------- */
.gracias .team {
  display: flex;
  gap: 22px;
  margin-top: 34px;
  perspective: 1400px;
}
.gracias .member {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 26px 16px 16px;
  text-align: left;
  border-color: color-mix(in srgb, var(--accent) 30%, transparent);
}
.gracias .avatar {
  flex: none;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  color: #12090b;
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
  box-shadow: 0 10px 30px -10px var(--accent);
}
.gracias .member-wrap:nth-child(1) .avatar svg { animation: heartbeat 1.6s ease-in-out infinite; animation-delay: 4.5s; }
.gracias .member-wrap:nth-child(2) .avatar svg { animation: float 4s ease-in-out infinite; }
.gracias .member-wrap:nth-child(3) .avatar svg { animation: sway 4s ease-in-out infinite; }
.gracias .who {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.gracias .who b {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
}
.gracias .who small {
  font-size: 15px;
  color: var(--accent);
  font-weight: 600;
}

/* ---------- Cintas ---------- */
.gracias .ribbons {
  position: absolute;
  left: -60px;
  right: -60px;
  bottom: 62px;
  height: 120px;
  z-index: 1;
  pointer-events: none;
}
.gracias .ribbon {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -29px;
  height: 58px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.gracias .rb-front {
  rotate: -2.6deg;
  background: linear-gradient(90deg, var(--flame), var(--gold), var(--violet), var(--teal));
  box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.8);
  color: #0c0f14;
  z-index: 2;
}
.gracias .rb-back {
  rotate: 2.4deg;
  background: rgba(15, 20, 27, 0.92);
  border-block: 1px solid var(--line-2);
  color: var(--muted);
}
.gracias .track {
  display: flex;
  flex: none;
  white-space: nowrap;
  animation: gr-marquee 38s linear infinite;
}
.gracias .track.rev {
  animation-direction: reverse;
  animation-duration: 46s;
}
@keyframes gr-marquee {
  from { translate: 0 0; }
  to { translate: -50% 0; }
}
.gracias .rt {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  padding-right: 18px;
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.gracias .rb-back .rt {
  font-weight: 700;
}
.gracias .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 10px var(--accent);
}

/* ---------- Compacto ---------- */
.compact .gracias {
  padding-top: 72px;
  cursor: auto;
}
.compact .gracias .word {
  font-size: 84px;
}
.compact .gracias .burst,
.compact .gracias .rays.r2 {
  display: none;
}
.compact .gracias .tagline {
  font-size: 20px;
}
.compact .gracias .ask {
  padding: 10px 22px 10px 12px;
  gap: 12px;
}
.compact .gracias .ask-icon {
  width: 38px;
  height: 38px;
}
.compact .gracias .ask-text {
  font-size: 28px;
}
.compact .gracias .caret {
  height: 28px;
}
.compact .gracias .team {
  flex-direction: column;
  width: 100%;
  gap: 12px;
  margin-top: 24px;
}
.compact .gracias .who b {
  font-size: 17px;
}
.compact .gracias .who small {
  font-size: 13px;
}
.compact .gracias .ribbons {
  position: relative;
  left: auto;
  right: auto;
  bottom: auto;
  margin: 28px -20px 0;
  height: 110px;
  flex: none;
}
.compact .gracias .rt {
  font-size: 16px;
}
</style>
