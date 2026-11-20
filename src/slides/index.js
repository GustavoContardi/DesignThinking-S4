/*
 * Registro de slides, en el mismo orden que el .pptx original.
 *  - component: la slide
 *  - tone: color dominante (tambien tine el fondo ambiental)
 *  - title: nombre corto para la vista general en movil
 *  - notes: notas del orador (tecla N)
 *  - transition: como entra la slide (push | zoom | iris | curtain | finale)
 *
 * La slide 20 (despedida) no existe en el .pptx: es el cierre agregado.
 */
import { markRaw } from 'vue'
import { notes } from '../content/notes.js'

import S01Portada from './S01Portada.vue'
import S02Problema from './S02Problema.vue'
import S03Empatizar from './S03Empatizar.vue'
import S04Entrevistados from './S04Entrevistados.vue'
import S05Frases from './S05Frases.vue'
import S06Definir from './S06Definir.vue'
import S07Comun from './S07Comun.vue'
import S08Descubrimos from './S08Descubrimos.vue'
import S09Desafio from './S09Desafio.vue'
import S10Idear from './S10Idear.vue'
import S11Ideas from './S11Ideas.vue'
import S12Propuesta from './S12Propuesta.vue'
import S13Juez from './S13Juez.vue'
import S14Tinder from './S14Tinder.vue'
import S15Objeciones from './S15Objeciones.vue'
import S16Casamiento from './S16Casamiento.vue'
import S17Velorio from './S17Velorio.vue'
import S18Ciclo from './S18Ciclo.vue'
import S19Impacto from './S19Impacto.vue'
import S20Gracias from './S20Gracias.vue'

const list = [
  [S01Portada, 'flame', 'zoom', 'TP Design Thinking'],
  [S02Problema, 'flame', 'push', 'El problema: certificar no alcanza.'],
  [S03Empatizar, 'teal', 'curtain', 'Empatizar.'],
  [S04Entrevistados, 'teal', 'push', 'Escuchamos a tres jefes del área de Sistemas.'],
  [S05Frases, 'teal', 'iris', 'Lo que nos dijeron:'],
  [S06Definir, 'gold', 'curtain', 'Definir.'],
  [S07Comun, 'gold', 'push', 'Lo común entre los entrevistados.'],
  [S08Descubrimos, 'gold', 'zoom', 'Lo que descubrimos'],
  [S09Desafio, 'gold', 'iris', 'El desafío principal:'],
  [S10Idear, 'flame', 'curtain', 'Idear.'],
  [S11Ideas, 'flame', 'push', 'Las 3 ideas seleccionadas del total:'],
  [S12Propuesta, 'flame', 'zoom', 'La vida de un procedimiento: tres procesos reales.'],
  [S13Juez, 'teal', 'push', 'El juez de paz: quien hace funcionar el sistema.'],
  [S14Tinder, 'flame', 'iris', 'Tinder de procedimientos'],
  [S15Objeciones, 'flame', 'push', 'La minoría también tiene la palabra.'],
  [S16Casamiento, 'gold', 'iris', 'Casamiento con el procedimiento'],
  [S17Velorio, 'violet', 'zoom', 'Velorio de procedimientos'],
  [S18Ciclo, 'teal', 'push', 'Un ciclo que se repite solo.'],
  [S19Impacto, 'teal', 'iris', '¿Cómo impacta la propuesta en la Defensoría?'],
  [S20Gracias, 'flame', 'finale', '¡Gracias!']
]

export const slides = list.map(([component, tone, transition, title], i) => ({
  component: markRaw(component),
  tone,
  transition,
  title,
  notes: notes[i]
}))
