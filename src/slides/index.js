/*
 * Registro de slides, en el mismo orden que el .pptx original.
 *  - component: la slide
 *  - tone: color dominante (tambien tine el fondo ambiental)
 *  - title: nombre corto para la vista general en movil
 *  - notes: notas del orador (tecla N)
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

const list = [
  [S01Portada, 'flame', 'TP Design Thinking'],
  [S02Problema, 'flame', 'El problema: certificar no alcanza.'],
  [S03Empatizar, 'teal', 'Empatizar.'],
  [S04Entrevistados, 'teal', 'Escuchamos a tres jefes del área de Sistemas.'],
  [S05Frases, 'teal', 'Lo que nos dijeron:'],
  [S06Definir, 'gold', 'Definir.'],
  [S07Comun, 'gold', 'Lo común entre los entrevistados.'],
  [S08Descubrimos, 'gold', 'Lo que descubrimos'],
  [S09Desafio, 'gold', 'El desafío principal:'],
  [S10Idear, 'flame', 'Idear.'],
  [S11Ideas, 'flame', 'Las 3 ideas seleccionadas del total:'],
  [S12Propuesta, 'flame', 'La vida de un procedimiento: tres procesos reales.'],
  [S13Juez, 'teal', 'El juez de paz: quien hace funcionar el sistema.'],
  [S14Tinder, 'flame', 'Tinder de procedimientos'],
  [S15Objeciones, 'flame', 'La minoría también tiene la palabra.'],
  [S16Casamiento, 'gold', 'Casamiento con el procedimiento'],
  [S17Velorio, 'violet', 'Velorio de procedimientos'],
  [S18Ciclo, 'teal', 'Un ciclo que se repite solo.'],
  [S19Impacto, 'teal', '¿Cómo impacta la propuesta en la Defensoría?']
]

export const slides = list.map(([component, tone, title], i) => ({
  component: markRaw(component),
  tone,
  title,
  notes: notes[i]
}))
