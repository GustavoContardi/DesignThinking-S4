<script setup>
/*
 * Icono unificado: usa Lucide para los iconos genericos y dibuja a mano
 * los dos que son propios de la metafora (anillos y lapida).
 */
import { computed } from 'vue'
import {
  Anchor,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDashed,
  CircleHelp,
  FilePlus2,
  Gavel,
  Heart,
  Hourglass,
  LayoutGrid,
  Lightbulb,
  Maximize,
  MessageSquareWarning,
  Minimize,
  Quote,
  Repeat,
  RotateCcw,
  ShieldCheck,
  ShieldX,
  SquareKanban,
  StickyNote,
  Target,
  Telescope,
  UserRound,
  X
} from 'lucide-vue-next'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 24 },
  stroke: { type: [Number, String], default: 2 }
})

const lucide = {
  anchor: Anchor,
  'arrow-right': ArrowRight,
  'badge-check': BadgeCheck,
  check: Check,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'circle-dashed': CircleDashed,
  help: CircleHelp,
  'file-plus': FilePlus2,
  gavel: Gavel,
  heart: Heart,
  hourglass: Hourglass,
  grid: LayoutGrid,
  lightbulb: Lightbulb,
  maximize: Maximize,
  warning: MessageSquareWarning,
  minimize: Minimize,
  quote: Quote,
  repeat: Repeat,
  'rotate-ccw': RotateCcw,
  'shield-check': ShieldCheck,
  'shield-x': ShieldX,
  kanban: SquareKanban,
  notes: StickyNote,
  target: Target,
  telescope: Telescope,
  user: UserRound,
  x: X
}

const component = computed(() => lucide[props.name])
</script>

<template>
  <component
    :is="component"
    v-if="component"
    :size="size"
    :stroke-width="stroke"
    aria-hidden="true"
  />
  <!-- Anillos de casamiento -->
  <svg
    v-else-if="name === 'rings'"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="9" cy="14.5" r="5.5" />
    <circle cx="15" cy="14.5" r="5.5" />
    <path d="M10.5 6.2 12 4l1.5 2.2L12 8z" />
  </svg>
  <!-- Lapida -->
  <svg
    v-else-if="name === 'tomb'"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    :stroke-width="stroke"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M6 20V10a6 6 0 0 1 12 0v10" />
    <path d="M3.5 20h17" />
    <path d="M12 8v6" />
    <path d="M9.5 10.5h5" />
  </svg>
</template>
