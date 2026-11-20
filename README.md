# DesignThinking-S4

Presentación web del **TP Design Thinking** (Sistemas IV · Grupo 3), construida con **Vue 3 + Vite**.
Es la versión web de `Grupo_3_-_TP_Design_Thinking_v2.pptx`: el texto de las 19 slides y las notas del orador son idénticos al original; el diseño y las animaciones son nuevos.

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

Las animaciones de entrada se controlan con clases (`a-up`, `a-left`, `a-pop`, etc.) y un índice de orden `--i`.
Si el sistema operativo pide reducir el movimiento, las animaciones se desactivan.

### Escritorio y móvil

En escritorio el lienzo mide 1600x900 y se escala para entrar en cualquier pantalla, así la composición se ve igual en un proyector o en una notebook.
En pantallas angostas (celular vertical) la presentación pasa a modo compacto: una columna, tipografía más chica y scroll vertical dentro de cada slide.
