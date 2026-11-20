<script setup>
/* Icono dentro de un circulo con el degradado del acento: el motivo visual del deck. */
import Icon from './Icon.vue'

defineProps({
  icon: { type: String, required: true },
  size: { type: Number, default: 60 },
  variant: { type: String, default: 'soft' } // soft | solid
})
</script>

<template>
  <span
    class="badge"
    :class="`badge-${variant}`"
    :style="{ width: size + 'px', height: size + 'px' }"
  >
    <Icon :name="icon" :size="Math.round(size * 0.46)" />
  </span>
</template>

<style scoped>
.badge {
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 50%;
  position: relative;
}
.badge-soft {
  color: var(--accent);
  background: color-mix(in srgb, var(--accent) 14%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 30%, transparent);
}
.badge-solid {
  color: #12090b;
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  box-shadow: 0 14px 34px -12px var(--accent);
}
</style>
