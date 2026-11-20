<script setup>
/*
 * Fuegos artificiales en canvas (decorativos). Lanza cohetes desde abajo que
 * explotan en los colores del deck, en loop mientras la slide esta montada.
 * burst(clientX, clientY) dispara una explosion donde se hizo click.
 * No corre en miniaturas ni con movimiento reducido.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  colors: { type: Array, default: () => ['#ff4d6d', '#ffc857', '#a78bfa', '#2dd4bf', '#ffffff'] },
  delay: { type: Number, default: 1200 },
  /* Pausa minima y maxima entre cohetes, en ms. */
  every: { type: Array, default: () => [650, 1400] }
})

const canvas = ref(null)
let ctx = null
let raf = 0
let timers = []
let rockets = []
let sparks = []
let w = 0
let h = 0
let active = false
const MAX_SPARKS = 1400

const rand = (a, b) => a + Math.random() * (b - a)
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]

onMounted(() => {
  const el = canvas.value
  if (!el || el.closest('.thumb-canvas')) return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  active = true
  timers.push(setTimeout(start, props.delay))
})
onBeforeUnmount(() => {
  active = false
  timers.forEach(clearTimeout)
  cancelAnimationFrame(raf)
})

function resize() {
  const el = canvas.value
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = el.offsetWidth
  h = el.offsetHeight
  el.width = w * dpr
  el.height = h * dpr
  ctx = el.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
}

function start() {
  if (!active || !canvas.value) return
  resize()
  /* Salva inicial: tres cohetes casi juntos. */
  launch(w * 0.22, h * 0.3)
  timers.push(setTimeout(() => launch(w * 0.78, h * 0.26), 180))
  timers.push(setTimeout(() => launch(w * 0.5, h * 0.18), 380))
  schedule()
  raf = requestAnimationFrame(frame)
}

function schedule() {
  if (!active) return
  timers.push(
    setTimeout(() => {
      launch(rand(w * 0.1, w * 0.9), rand(h * 0.12, h * 0.42))
      schedule()
    }, rand(props.every[0], props.every[1]))
  )
}

function launch(tx, ty) {
  const x = tx + rand(-80, 80)
  const t = rand(52, 66) // frames hasta la cima
  rockets.push({
    x,
    y: h + 10,
    vx: (tx - x) / t,
    vy: (ty - h - 10) / t,
    ty,
    color: pick(props.colors),
    life: t
  })
}

function explode(x, y, color, big = false) {
  const n = big ? 110 : rand(70, 95)
  const second = Math.random() < 0.45 ? pick(props.colors) : color
  const ring = Math.random() < 0.3
  for (let i = 0; i < n && sparks.length < MAX_SPARKS; i++) {
    const a = (i / n) * Math.PI * 2 + rand(-0.05, 0.05)
    const s = ring ? rand(5.2, 5.8) : rand(1.2, 6.6)
    sparks.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      color: i % 3 === 0 ? second : color,
      alpha: 1,
      decay: rand(0.011, 0.02),
      size: rand(1.6, 2.8),
      twinkle: Math.random() < 0.35
    })
  }
}

/* Explosion al hacer click: recibe coordenadas de pantalla. */
function burst(clientX, clientY) {
  if (!active || !ctx) return
  const r = canvas.value.getBoundingClientRect()
  const x = ((clientX - r.left) / r.width) * w
  const y = ((clientY - r.top) / r.height) * h
  explode(x, y, pick(props.colors), true)
}
defineExpose({ burst })

function frame() {
  /* Borra parcialmente para dejar estela, manteniendo el canvas transparente. */
  ctx.globalCompositeOperation = 'destination-out'
  ctx.fillStyle = 'rgba(0, 0, 0, 0.22)'
  ctx.fillRect(0, 0, w, h)
  ctx.globalCompositeOperation = 'lighter'

  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i]
    r.x += r.vx
    r.y += r.vy
    r.life--
    ctx.fillStyle = r.color
    ctx.beginPath()
    ctx.arc(r.x, r.y, 2.4, 0, Math.PI * 2)
    ctx.fill()
    if (r.life <= 0) {
      explode(r.x, r.y, r.color)
      rockets.splice(i, 1)
    }
  }

  for (let i = sparks.length - 1; i >= 0; i--) {
    const p = sparks[i]
    p.vx *= 0.965
    p.vy = p.vy * 0.965 + 0.06
    p.x += p.vx
    p.y += p.vy
    p.alpha -= p.decay
    if (p.alpha <= 0) {
      sparks.splice(i, 1)
      continue
    }
    ctx.globalAlpha = p.twinkle ? p.alpha * (0.5 + Math.random() * 0.5) : p.alpha
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.globalAlpha = 1

  if (active) raf = requestAnimationFrame(frame)
}
</script>

<template>
  <canvas ref="canvas" class="fireworks" aria-hidden="true" />
</template>

<style>
.fireworks {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
</style>
