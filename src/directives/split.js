/*
 * v-split: divide el texto de un elemento en palabras o letras para animarlas.
 *
 *   v-split                      palabras que suben desde una mascara
 *   v-split:chars                letras que giran en 3D
 *   v-split:type                 efecto maquina de escribir
 *   v-split="{ delay: 300, step: 40 }"   retardo inicial y paso en ms
 *
 * Solo envuelve nodos de texto: los <span> internos (por ejemplo .hl) se
 * conservan, y el texto final es identico al original. No actua dentro de las
 * miniaturas de la vista general.
 */
const DEFAULT_STEP = { words: 55, chars: 24, type: 16 }

// Solo espacios "normales": el espacio no separable (por ejemplo "70 %")
// queda dentro de la palabra y no se corta.
const SPACES = /([ \t\n\r]+)/

function split(el, mode, opts) {
  const base = opts.delay ?? 300
  const step = opts.step ?? DEFAULT_STEP[mode]
  let i = 0

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)

  for (const node of nodes) {
    const frag = document.createDocumentFragment()
    for (const part of node.textContent.split(SPACES)) {
      if (!part) continue
      if (/^[ \t\n\r]+$/.test(part)) {
        frag.appendChild(document.createTextNode(part))
        continue
      }
      const word = document.createElement('span')
      word.className = 'sw'
      if (mode === 'words') {
        const inner = document.createElement('span')
        inner.className = 'swi'
        inner.textContent = part
        inner.style.setProperty('--d', `${base + i++ * step}ms`)
        word.appendChild(inner)
      } else {
        word.classList.add('sw-chars')
        for (const ch of part) {
          const c = document.createElement('span')
          c.className = 'sc'
          c.textContent = ch
          c.style.setProperty('--d', `${base + i++ * step}ms`)
          word.appendChild(c)
        }
        i++ // pausa breve entre palabras
      }
      frag.appendChild(word)
    }
    node.parentNode.replaceChild(frag, node)
  }
}

export const vSplit = {
  mounted(el, binding) {
    if (el.closest('.thumb-canvas')) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return
    const mode = binding.arg || 'words'
    el.classList.add('is-split')
    if (mode === 'type') el.classList.add('split-type')
    split(el, mode, binding.value || {})
  }
}
