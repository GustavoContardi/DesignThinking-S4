# DesignThinking-S4

Presentación web del **TP Design Thinking** (Sistemas IV · Grupo 3), construida con **Vue 3 + Vite**.
Es la versión web de `Grupo_3_-_TP_Design_Thinking_v2.pptx`: el texto de las 19 slides y las notas del orador sale del original; el diseño y las animaciones son nuevos.

## Cómo levantarla

Requisitos: Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abrí la URL que muestra la terminal (por defecto `http://localhost:5173`).
El servidor también queda accesible desde la red local, así que podés abrirla desde el celular con la IP de la máquina.

Para generar una versión estática (carpeta `dist/`, se puede abrir con cualquier servidor estático):

```bash
npm run build
npm run preview
```

Las tipografías vienen empaquetadas con el proyecto: una vez instaladas las dependencias, la presentación funciona sin internet.

## Controles

| Acción | Teclas / gesto |
| --- | --- |
| Siguiente slide | Flecha derecha, flecha abajo, Espacio, Enter, PageDown |
| Slide anterior | Flecha izquierda, flecha arriba, Backspace, PageUp |
| Primera / última | Home / End |
| Pantalla completa | F |
| Notas del orador | N |
| Vista general de todas las slides | O (Escape para cerrar) |
| Móvil / tablet | Deslizar a la izquierda o a la derecha |

La slide actual queda en la URL (`#/7`), así que se puede recargar o compartir un enlace directo a una slide.
Los controles en pantalla se ocultan solos cuando el mouse no se mueve.

## Estructura

```
src/
  App.vue                 Motor: escalado del lienzo 1600x900, navegación, gestos,
                          pantalla completa, notas y vista general
  slides/
    index.js              Orden de las slides, color de cada una y notas
    S01Portada.vue ...    Una slide por archivo, en el mismo orden que el .pptx
    S19Impacto.vue
    S20Gracias.vue        Despedida (agregada, no está en el .pptx)
  components/
    SlideFrame.vue        Marco común (etiqueta de sección + título + cuerpo)
    SectionDivider.vue    Separadores 01 Empatizar / 02 Definir / 03 Idear
    IdeaLayout.vue        Plantilla de las slides "IDEA N"
    IconBadge.vue, Icon.vue
  content/notes.js        Notas del orador, textuales del .pptx
  styles/
    tokens.css            Colores, tipografías y escala tipográfica
    layout.css            Tarjetas, grillas y tipografía compartida
    animations.css        Animaciones de entrada y transiciones entre slides
```

### Sistema visual

Cada etapa de la vida de un procedimiento tiene su color, y se repite en todo el deck:

- **Tinder** (se conocen): coral
- **Casamiento** (se casan): dorado
- **Velorio** (se despiden): violeta
- **Empatía, juez de paz y resultados**: verde agua

### Animaciones

- **Intro** al abrir: los tres íconos (corazón, anillos, lápida) y una barra de carga.
- **Transición propia de cada slide**, definida en `src/slides/index.js`:
  - `push`: empuje 3D
  - `zoom`: atravesar la slide
  - `iris`: apertura circular
  - `curtain`: cortina de barras de color, usada en los separadores 01 / 02 / 03
  - `finale`: cortina con los cuatro colores del deck, usada en la despedida
- **Texto animado** con la directiva `v-split` (`src/directives/split.js`): títulos palabra por palabra, letras en 3D (`v-split:chars`) y efecto máquina de escribir (`v-split:type`). Solo envuelve el texto, que queda idéntico al original.
- **Entradas por clase**, con orden según `--i`:
  - movimiento: `a-up`, `a-left`, `a-right`, `a-drop`, `a-swipe`
  - escala: `a-pop`, `a-zoom`
  - giro 3D: `a-flip-x`, `a-flip-y`
  - otras: `a-deal` (carta repartida), `a-wipe` (barrido), `a-stamp` (sello)
- **Interacción**: luz que sigue al cursor, tarjetas con inclinación 3D y reflector al pasar el mouse, y fondo con parallax e íconos flotando.
- **Efectos por slide**:
  - subrayado dibujado en "no alcanza"
  - ítems que se tachan o se tildan solos
  - cartas repartidas en las 3 ideas
  - mazo del juez de paz que golpea
  - tarjetas que entran deslizando como en Tinder
  - confeti en el casamiento
  - acta de defunción que cae, se estampa con un sello y deja niebla
  - partícula que recorre el ciclo
  - el antes / después que se tacha y se ilumina
  - despedida: letras de "¡Gracias!" que caen en 3D, destello con ondas, explosión de íconos, fuegos artificiales en loop (click en cualquier parte para lanzar uno), confeti y cintas cruzadas con los conceptos del deck

Si el sistema operativo pide reducir el movimiento, las animaciones y la intro se desactivan.

### Escritorio y móvil

En escritorio el lienzo mide 1600x900 y se escala para entrar en cualquier pantalla, así la composición se ve igual en un proyector o en una notebook.
En pantallas angostas (celular vertical) la presentación pasa a modo compacto: una columna, tipografía más chica y scroll vertical dentro de cada slide.
