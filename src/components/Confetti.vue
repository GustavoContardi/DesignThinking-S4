<script setup>
/*
 * Lluvia de confeti en canvas (decorativa). Dos "canones" disparan desde las
 * esquinas inferiores. No corre en miniaturas ni con movimiento reducido.
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  colors: { type: Array, default: () => ['#ffc857', '#ff9f43', '#ffffff', '#ff4d6d'] },
  count: { type: Number, default: 170 },
  delay: { type: Number, default: 700 }
})

const canvas = ref(null)
let raf = 0
let timer = 0

onMounted(() => {
  const el = canvas.value
  if (!el || el.closest('.thumb-canvas')) return
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
  timer = setTimeout(start, props.delay)
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  cancelAnimationFrame(raf)
})

function start() {
  const el = canvas.value
  if (!el) return
  const w = (el.width = el.offsetWidth)
  const h = (el.height = el.offsetHeight)
  const ctx = el.getContext('2d')
  const parts = Array.from({ length: props.count }, (_, i) => {
    const left = i % 2 === 0
    const angle = (left ? -60 : -120) + (Math.random() - 0.5) * 40
    const speed = 14 + Math.random() * 13
    return {
      x: left ? -10 : w + 10,
      y: h + 10,
      vx: Math.cos((angle * Math.PI) / 180) * speed,
      vy: Math.sin((angle * Math.PI) / 180) * speed,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      size: 7 + Math.random() * 9,
      color: props.colors[i % props.colors.length],
      round: Math.random() < 0.3,
      wobble: Math.random() * 10
    }
  })
  const t0 = performance.now()
  const frame = (t) => {
    ctx.clearRect(0, 0, w, h)
    let alive = 0
    for (const p of parts) {
      p.vy += 0.32
      p.vx *= 0.985
      p.vy *= 0.985
      p.x += p.vx + Math.sin((t / 200) + p.wobble) * 0.6
      p.y += p.vy
      p.rot += p.vr
      if (p.y < h + 40) alive++
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.fillStyle = p.color
      ctx.globalAlpha = Math.max(0, 1 - (t - t0) / 6000)
      if (p.round) {
        ctx.beginPath()
        ctx.arc(0, 0, p.size / 2.4, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
      }
      ctx.restore()
    }
    if (alive && t - t0 < 6000) raf = requestAnimationFrame(frame)
    else ctx.clearRect(0, 0, w, h)
  }
  raf = requestAnimationFrame(frame)
}
</script>

<template>
  <canvas ref="canvas" class="confetti" aria-hidden="true" />
</template>

<style>
.confetti {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
}
</style>
