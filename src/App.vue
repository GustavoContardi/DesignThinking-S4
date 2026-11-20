<script setup>
/*
 * Motor de la presentacion.
 *  - Lienzo fijo de 1600 x 900 escalado al viewport (escritorio).
 *  - Modo compacto en pantallas chicas: la slide ocupa el viewport y scrollea.
 *  - Navegacion: flechas, espacio, PageUp/PageDown, Home/End, swipe tactil.
 *  - Atajos: F pantalla completa, N notas del orador, O vista general.
 *  - La slide actual se refleja en la URL (#/7) para poder recargar o compartir.
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Icon from './components/Icon.vue'
import { slides } from './slides/index.js'

const W = 1600
const H = 900
const total = slides.length

const index = ref(readHash())
const direction = ref('next')
const scale = ref(1)
const compact = ref(false)
const showNotes = ref(false)
const showOverview = ref(false)
const isFullscreen = ref(false)
const showHint = ref(true)
const idle = ref(false)
const THUMB_W = 288

const current = computed(() => slides[index.value])
const progress = computed(() => ((index.value + 1) / total) * 100)
const counter = computed(() => `${String(index.value + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`)

const stageStyle = computed(() =>
  compact.value
    ? {}
    : { width: `${W}px`, height: `${H}px`, transform: `translate(-50%, -50%) scale(${scale.value})` }
)

/* ---------- Navegacion ---------- */
function clamp(i) {
  return Math.min(Math.max(i, 0), total - 1)
}
function go(i) {
  const target = clamp(i)
  if (target === index.value) return
  direction.value = target > index.value ? 'next' : 'prev'
  index.value = target
  showHint.value = false
}
const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)

function readHash() {
  const n = parseInt(window.location.hash.replace(/[^0-9]/g, ''), 10)
  return Number.isFinite(n) ? clamp(n - 1) : 0
}
watch(index, (i) => {
  history.replaceState(null, '', `#/${i + 1}`)
})
function onHashChange() {
  go(readHash())
}

/* ---------- Escalado ---------- */
function fit() {
  const vw = window.innerWidth
  const vh = window.innerHeight
  compact.value = vw < 760 || (vw < 1024 && vh > vw * 1.15)
  scale.value = Math.min(vw / W, vh / H)
}

/* ---------- Teclado ---------- */
function onKey(e) {
  if (e.metaKey || e.ctrlKey || e.altKey) return
  const k = e.key
  if (showOverview.value) {
    if (k === 'Escape' || k === 'o' || k === 'O') showOverview.value = false
    return
  }
  switch (k) {
    case 'ArrowRight':
    case 'PageDown':
    case ' ':
    case 'Enter':
      e.preventDefault()
      next()
      break
    case 'ArrowDown':
      if (compact.value) return // en movil la flecha abajo scrollea
      e.preventDefault()
      next()
      break
    case 'ArrowLeft':
    case 'PageUp':
    case 'Backspace':
      e.preventDefault()
      prev()
      break
    case 'ArrowUp':
      if (compact.value) return
      e.preventDefault()
      prev()
      break
    case 'Home':
      e.preventDefault()
      go(0)
      break
    case 'End':
      e.preventDefault()
      go(total - 1)
      break
    case 'f':
    case 'F':
      toggleFullscreen()
      break
    case 'n':
    case 'N':
      showNotes.value = !showNotes.value
      break
    case 'o':
    case 'O':
    case 'g':
    case 'G':
      showOverview.value = true
      break
    case 'Escape':
      showNotes.value = false
      break
  }
}

/* ---------- Gestos tactiles ---------- */
let touch = null
function onTouchStart(e) {
  if (e.touches.length !== 1) return
  const t = e.touches[0]
  touch = { x: t.clientX, y: t.clientY, time: Date.now() }
}
function onTouchEnd(e) {
  if (!touch) return
  const t = e.changedTouches[0]
  const dx = t.clientX - touch.x
  const dy = t.clientY - touch.y
  const dt = Date.now() - touch.time
  touch = null
  // Swipe horizontal claro y razonablemente rapido.
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 800) {
    dx < 0 ? next() : prev()
  }
}

/* ---------- Pantalla completa ---------- */
function toggleFullscreen() {
  const doc = document
  const el = doc.documentElement
  if (!doc.fullscreenElement && !doc.webkitFullscreenElement) {
    ;(el.requestFullscreen || el.webkitRequestFullscreen)?.call(el)
  } else {
    ;(doc.exitFullscreen || doc.webkitExitFullscreen)?.call(doc)
  }
}
function onFullscreenChange() {
  isFullscreen.value = Boolean(document.fullscreenElement || document.webkitFullscreenElement)
}

/* ---------- Ocultar controles cuando el mouse no se mueve ---------- */
let idleTimer
function wake() {
  idle.value = false
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => (idle.value = true), 2600)
}

onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
  window.addEventListener('keydown', onKey)
  window.addEventListener('hashchange', onHashChange)
  window.addEventListener('mousemove', wake)
  document.addEventListener('fullscreenchange', onFullscreenChange)
  document.addEventListener('webkitfullscreenchange', onFullscreenChange)
  history.replaceState(null, '', `#/${index.value + 1}`)
  wake()
  setTimeout(() => (showHint.value = false), 6000)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', fit)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('hashchange', onHashChange)
  window.removeEventListener('mousemove', wake)
  document.removeEventListener('fullscreenchange', onFullscreenChange)
  document.removeEventListener('webkitfullscreenchange', onFullscreenChange)
  clearTimeout(idleTimer)
})

function pick(i) {
  showOverview.value = false
  go(i)
}
</script>

<template>
  <div
    class="deck"
    :class="[{ compact, idle: idle && !compact }, `tone-${current.tone}`]"
    @touchstart.passive="onTouchStart"
    @touchend.passive="onTouchEnd"
  >
    <!-- Fondo ambiental: manchas de color que siguen el tono de cada slide -->
    <div class="ambient" aria-hidden="true">
      <span class="blob b1" />
      <span class="blob b2" />
      <span class="blob b3" />
      <span class="grain" />
    </div>

    <main class="stage" :style="stageStyle" aria-live="polite">
      <Transition :name="`slide-${direction}`">
        <component :is="current.component" :key="index" />
      </Transition>
    </main>

    <!-- Barra de progreso -->
    <div class="progress" aria-hidden="true">
      <span :style="{ width: progress + '%' }" />
    </div>

    <!-- Controles -->
    <nav class="controls" aria-label="Controles de la presentacion">
      <button class="ctl" :disabled="index === 0" title="Anterior (flecha izquierda)" @click="prev">
        <Icon name="chevron-left" :size="20" />
      </button>
      <span class="counter">{{ counter }}</span>
      <button class="ctl" :disabled="index === total - 1" title="Siguiente (flecha derecha)" @click="next">
        <Icon name="chevron-right" :size="20" />
      </button>
      <span class="sep" />
      <button class="ctl" title="Vista general (O)" @click="showOverview = true">
        <Icon name="grid" :size="18" />
      </button>
      <button class="ctl" :class="{ on: showNotes }" title="Notas del orador (N)" @click="showNotes = !showNotes">
        <Icon name="notes" :size="18" />
      </button>
      <button v-if="!compact" class="ctl" title="Pantalla completa (F)" @click="toggleFullscreen">
        <Icon :name="isFullscreen ? 'minimize' : 'maximize'" :size="18" />
      </button>
    </nav>

    <!-- Ayuda inicial -->
    <Transition name="fade">
      <div v-if="showHint && index === 0" class="hint">
        <template v-if="compact">Desliza para avanzar</template>
        <template v-else>
          <kbd>&larr;</kbd><kbd>&rarr;</kbd> navegar <span>·</span> <kbd>F</kbd> pantalla completa
          <span>·</span> <kbd>N</kbd> notas <span>·</span> <kbd>O</kbd> vista general
        </template>
      </div>
    </Transition>

    <!-- Notas del orador -->
    <Transition name="fade">
      <aside v-if="showNotes" class="notes" aria-label="Notas del orador">
        <header>
          <span class="label">Notas · {{ counter }}</span>
          <button class="ctl" title="Cerrar (N)" @click="showNotes = false"><Icon name="x" :size="18" /></button>
        </header>
        <p>{{ current.notes }}</p>
      </aside>
    </Transition>

    <!-- Vista general -->
    <Transition name="fade">
      <div v-if="showOverview" class="overview" @click.self="showOverview = false">
        <ol v-if="compact" class="overview-list">
          <li v-for="(s, i) in slides" :key="i">
            <button :class="[{ active: i === index }, `tone-${s.tone}`]" @click="pick(i)">
              <span class="thumb-num">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ s.title }}
            </button>
          </li>
        </ol>
        <div v-else class="overview-grid">
          <button
            v-for="(s, i) in slides"
            :key="i"
            class="thumb"
            :class="[{ active: i === index }, `tone-${s.tone}`]"
            @click="pick(i)"
          >
            <div class="thumb-frame">
              <div class="thumb-canvas" :style="{ transform: `scale(${THUMB_W / W})` }">
                <component :is="s.component" />
              </div>
            </div>
            <span class="thumb-num">{{ String(i + 1).padStart(2, '0') }}</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.deck {
  position: fixed;
  inset: 0;
  overflow: hidden;
  background: var(--bg);
  touch-action: pan-y;
}

/* ---------- Fondo ambiental ---------- */
.ambient {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(110px);
  opacity: 0.32;
  transition: background-color 1.4s var(--ease-out);
  animation: drift 26s ease-in-out infinite;
}
.b1 {
  width: 56vmax;
  height: 56vmax;
  top: -26vmax;
  right: -14vmax;
  background-color: var(--accent);
}
.b2 {
  width: 44vmax;
  height: 44vmax;
  bottom: -26vmax;
  left: -12vmax;
  background-color: var(--accent-2);
  opacity: 0.2;
  animation-duration: 32s;
  animation-direction: reverse;
}
.b3 {
  width: 30vmax;
  height: 30vmax;
  top: 40%;
  left: 38%;
  background-color: #1e293b;
  opacity: 0.45;
  animation-duration: 40s;
}
.grain {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 26px 26px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 80%);
}

/* ---------- Escenario ---------- */
.stage {
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: center center;
}
.compact .stage {
  inset: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* ---------- Progreso ---------- */
.progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.06);
  z-index: 20;
}
.progress span {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  box-shadow: 0 0 16px var(--accent);
  transition: width 0.8s var(--ease-out), background 1s;
}

/* ---------- Controles ---------- */
.controls {
  position: absolute;
  right: 22px;
  bottom: 20px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(14, 18, 24, 0.7);
  border: 1px solid var(--line);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: opacity 0.5s, transform 0.5s var(--ease-out);
}
.deck.idle .controls {
  opacity: 0;
  transform: translateY(8px);
}
.deck.idle {
  cursor: none;
}
.ctl {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: var(--muted);
  transition: background 0.2s, color 0.2s;
}
.ctl:hover:not(:disabled),
.ctl.on {
  background: var(--surface-2);
  color: var(--text);
}
.ctl:disabled {
  opacity: 0.3;
  cursor: default;
}
.counter {
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--muted);
  padding: 0 6px;
  min-width: 64px;
  text-align: center;
  white-space: nowrap;
}
.sep {
  width: 1px;
  height: 20px;
  background: var(--line-2);
  margin: 0 4px;
}
.compact .controls {
  left: 50%;
  right: auto;
  transform: translateX(-50%);
  bottom: calc(14px + env(safe-area-inset-bottom));
}

/* ---------- Ayuda ---------- */
.hint {
  position: absolute;
  left: 50%;
  bottom: 22px;
  transform: translateX(-50%);
  z-index: 25;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  font-size: 13px;
  color: var(--muted);
  background: rgba(14, 18, 24, 0.75);
  border: 1px solid var(--line);
  backdrop-filter: blur(16px);
  white-space: nowrap;
}
.hint span {
  color: var(--dim);
}
kbd {
  display: inline-grid;
  place-items: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border-radius: 6px;
  font: 600 12px var(--font-body);
  color: var(--text);
  background: var(--surface-2);
  border: 1px solid var(--line-2);
}
.compact .hint {
  bottom: calc(76px + env(safe-area-inset-bottom));
}

/* ---------- Notas ---------- */
.notes {
  position: absolute;
  left: 22px;
  bottom: 74px;
  z-index: 30;
  width: min(560px, calc(100vw - 44px));
  max-height: 46vh;
  overflow-y: auto;
  padding: 18px 22px 22px;
  border-radius: 18px;
  background: rgba(14, 18, 24, 0.92);
  border: 1px solid var(--line-2);
  backdrop-filter: blur(20px);
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.7);
  font-size: 15px;
  line-height: 1.6;
  color: #d9dde3;
}
.notes header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}
.compact .notes {
  left: 12px;
  right: 12px;
  width: auto;
  bottom: calc(72px + env(safe-area-inset-bottom));
}

/* ---------- Vista general ---------- */
.overview {
  position: absolute;
  inset: 0;
  z-index: 40;
  overflow-y: auto;
  padding: 48px;
  background: rgba(6, 8, 11, 0.86);
  backdrop-filter: blur(18px);
}
.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 288px);
  justify-content: center;
  gap: 22px;
  max-width: 1500px;
  margin: 0 auto;
}
.thumb {
  position: relative;
  text-align: left;
  border-radius: 14px;
  transition: transform 0.3s var(--ease-out);
}
.thumb:hover {
  transform: translateY(-4px);
}
.thumb-frame {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 14px;
  background: var(--bg);
  border: 1px solid var(--line);
}
.thumb.active .thumb-frame {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 35%, transparent);
}
.thumb-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 1600px;
  height: 900px;
  transform-origin: top left;
  pointer-events: none;
}
/* Las miniaturas no animan. */
.thumb-canvas *,
.thumb-canvas *::before,
.thumb-canvas *::after {
  animation: none !important;
  transition: none !important;
}
.thumb-canvas .fill {
  clip-path: none !important;
}
.thumb-num {
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.6);
  color: var(--text);
}
.compact .overview {
  padding: 20px 16px 96px;
}
.overview-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.overview-list button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  text-align: left;
  padding: 14px 16px;
  border-radius: 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  font-size: 15px;
}
.overview-list button.active {
  border-color: var(--accent);
}
.overview-list .thumb-num {
  position: static;
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
}
</style>
