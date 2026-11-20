<script setup>
import Icon from '../components/Icon.vue'
</script>

<template>
  <section class="slide tone-flame portada">
    <div class="copy">
      <h1 class="hero">
        <span class="kicker a-down" style="--i: 0">Sistemas IV</span>
        <span class="main a-up" style="--i: 1">TP Design <span class="hl">Thinking</span></span>
      </h1>
      <p class="sub a-up" style="--i: 3">
        Una propuesta para que el personal de la Defensoría sostenga en el tiempo los procedimientos ISO 9001.
      </p>
      <div class="team a-up" style="--i: 5">
        <p class="group">Grupo 3</p>
        <p class="names">Zander, Matt - Contardi, Gustavo Andrés - Ranero, Juan Cruz</p>
      </div>
    </div>

    <!-- Las tres etapas de la vida de un procedimiento, como burbujas orbitando -->
    <div class="orbit" aria-hidden="true">
      <span class="ring r1" />
      <span class="ring r2" />
      <div class="bubble b-heart tone-flame a-pop" style="--i: 4">
        <span class="pulse" />
        <Icon name="heart" :size="64" :stroke="1.8" />
      </div>
      <div class="bubble b-rings tone-gold a-pop" style="--i: 6">
        <Icon name="rings" :size="54" :stroke="1.8" />
      </div>
      <div class="bubble b-tomb tone-violet a-pop" style="--i: 8">
        <Icon name="tomb" :size="44" :stroke="1.8" />
      </div>
    </div>
  </section>
</template>

<style>
.portada {
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  align-items: center;
  gap: 40px;
  padding-top: 40px;
}
.portada .hero {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.portada .kicker {
  font-family: var(--font-body);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--accent);
}
.portada .main {
  font-size: var(--fs-hero);
  line-height: 0.92;
  letter-spacing: -0.045em;
}
.portada .sub {
  margin-top: 34px;
  font-size: 28px;
  line-height: 1.4;
  color: #d6dae0;
  max-width: 760px;
}
.portada .team {
  margin-top: 54px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-left: 0;
}
.portada .group {
  font-family: var(--font-display);
  font-size: 26px;
  font-weight: 700;
}
.portada .names {
  font-size: 20px;
  color: var(--muted);
}

/* ---------- Orbita decorativa ---------- */
.portada .orbit {
  position: relative;
  width: 560px;
  height: 560px;
  justify-self: center;
}
.portada .ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.14);
  animation: spin 60s linear infinite;
}
.portada .r2 {
  inset: 90px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.06);
  animation-duration: 90s;
  animation-direction: reverse;
}
.portada .bubble {
  position: absolute;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #12090b;
  background: linear-gradient(140deg, var(--accent), var(--accent-2));
  box-shadow: 0 40px 90px -30px var(--accent);
}
.portada .bubble > svg {
  animation: float 6s ease-in-out infinite;
}
.portada .b-heart {
  width: 220px;
  height: 220px;
  top: 30px;
  left: 70px;
}
.portada .b-rings {
  width: 170px;
  height: 170px;
  top: 210px;
  right: 10px;
}
.portada .b-rings > svg {
  animation-delay: -2s;
}
.portada .b-tomb {
  width: 136px;
  height: 136px;
  bottom: 30px;
  left: 60px;
}
.portada .b-tomb > svg {
  animation-delay: -4s;
}
.portada .pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid var(--accent);
  animation: pulse-ring 2.4s var(--ease-out) infinite;
}

.compact .portada {
  grid-template-columns: 1fr;
  align-content: start;
  padding-top: 64px;
}
.compact .portada .orbit {
  order: -1;
  width: 240px;
  height: 240px;
  margin-bottom: 8px;
}
.compact .portada .b-heart { width: 100px; height: 100px; top: 10px; left: 30px; }
.compact .portada .b-rings { width: 80px; height: 80px; top: 90px; right: 4px; }
.compact .portada .b-tomb { width: 64px; height: 64px; bottom: 14px; left: 34px; }
.compact .portada .bubble svg { width: 40%; height: 40%; }
.compact .portada .r2 { inset: 40px; }
.compact .portada .kicker { font-size: 14px; }
.compact .portada .sub { margin-top: 18px; font-size: 18px; }
.compact .portada .team { margin-top: 26px; }
.compact .portada .group { font-size: 20px; }
.compact .portada .names { font-size: 15px; }
</style>
