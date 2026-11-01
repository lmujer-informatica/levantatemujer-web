# Prompt para Claude Code: detalle expandible de eventos (como las noticias)

Rama sugerida (la creas tú desde la rama donde ya está todo lo de formularios, o desde `integraciones`):
`git checkout -b feat/detalle-eventos`

## Lo que encontré en el código (para que el prompt sea preciso)

**Noticias (ya funciona):**
- Cada noticia es un archivo en `src/data/noticias/<slug>.json` (campos: `titulo`, `fecha` "dd - mm - aaaa", `resumen`, `imagen`, `imagenes` [hasta 2], `parrafos`).
- La card (`src/pages/actividad/noticias/components/NoticiasGrid.jsx`) tiene un `<Link to={`/noticia/${item.id}`}>`; el `id` es el nombre del archivo.
- Ruta en `src/App.jsx`: `/noticia/:id` → `src/pages/noticia/DesgloseNoticia.jsx`, que carga los JSON con `import.meta.glob`, muestra una barra de título, la fecha, la imagen grande, dos párrafos con imágenes laterales, y un botón "Volver" (`navigate(-1)`). Si no existe, muestra "Noticia no encontrada".
- El CMS (Decap) la edita como colección de carpeta `noticias_articulos`.

**Eventos (lo que falta):**
- Todos los eventos están en **una sola lista** `tarjetasEventos` dentro de `src/data/eventos.json` (19 eventos). **No tienen `id` ni slug.**
- Campos: `titulo`, `fecha` (YYYY-MM-DD), `hora`, `ciudad`, `lugar`, `descripcion`, `imagen`, `dirigidoA` (lista de etiquetas), `colorTema`.
- Las cards están en `src/pages/eventos/components/EventosGrid.jsx` (`TarjetaEvento`). Su botón **"Leer más" no hace nada** y la descripción se corta a 3 líneas (`line-clamp-3`).
- `CalendarioEventos.jsx` tiene un panel de "Próxima actividad destacada" con el detalle del evento seleccionado; también puede enlazar al detalle.
- El CMS edita esa lista en `public/admin/config.yml` (colección `eventos`, archivo `src/data/eventos.json`).
- `vercel.json` ya redirige cualquier ruta que no sea `/api/` a `index.html`, así que una ruta nueva funciona sin tocarlo.

**Decisión de diseño:** como los eventos no tienen id, el identificador (slug) se **calcula** a partir de fecha y título (ej. `2026-08-10-taller-de-liderazgo-y-participacion-femenina`). Así no hay que tocar los 19 eventos existentes ni obligar a la clienta a escribir un id en el CMS. Los 19 son únicos por fecha + título.

---

## Prompt inicial (pegar tal cual)

```
Lee docs/PROMPT-DETALLE-EVENTOS.md. Vamos a hacer que cada evento de la sección Eventos
("ACTIVIDADES Y EVENTOS") se pueda abrir en una página de detalle, igual que las noticias.

Referencia de cómo funcionan las noticias: src/pages/noticia/DesgloseNoticia.jsx (detalle),
src/pages/actividad/noticias/components/NoticiasGrid.jsx (card con <Link>) y la ruta
/noticia/:id en src/App.jsx.

Reglas de trabajo:
1. NO hagas commits, push, PR ni ramas. Yo hago el git a mano.
2. Haz UN paso por vez. Al terminar cada uno, DETENTE y entrégame, en este orden:
   a) Archivos modificados o creados.
   b) Resumen de qué cambió en 2 a 4 líneas.
   c) Cómo lo probaste (npm run build y lo que revisaste en el navegador) y qué debo probar yo.
   d) El commit listo para copiar:
        git add <archivos exactos>
        git commit -m "<tipo>: <resumen en español, máx. 72 caracteres>" -m "<detalle opcional>"
   No sigas hasta que yo escriba "aprobado".
3. No cambies el diseño de las cards existentes, el calendario, ni las clases de Tailwind fuera
   de lo que pide el paso. La página de detalle debe verse como DesgloseNoticia.jsx (mismos
   componentes visuales, tipografías y estructura), adaptada a eventos.
4. No modifiques los 19 eventos existentes en eventos.json salvo que un paso lo diga.
5. Antes de entregar cada paso corre `npm run build`. Si falla, dímelo, no lo tapes.
6. Comentarios y textos de interfaz en español. Mensajes de commit en español ("feat:", "fix:").
7. Si algo del plan no encaja con lo que ves en el código, dímelo antes de improvisar.

Empieza por el Paso 1.
```

---

## Pasos

### Paso 1: Utilidad de slug y datos de eventos
- Crear `src/lib/eventos.js` con:
  - `slugEvento(evento)`: devuelve `<fecha>-<titulo>` en minúsculas, sin tildes ni símbolos, con guiones (usar `normalize("NFD")` para quitar acentos y colapsar espacios/símbolos a un solo `-`).
  - `obtenerEventos()`: lee `tarjetasEventos` (o `eventos`) de `src/data/eventos.json`, y devuelve cada evento con su `slug` calculado.
  - `buscarEventoPorSlug(slug)`.
- Si dos eventos produjeran el mismo slug, añadir un sufijo `-2`, `-3` al repetido de forma estable.
- Verificar con un script rápido (no commitear) que los 19 eventos actuales generan 19 slugs distintos.

**Commit sugerido:** `feat: utilidades de slug y búsqueda de eventos`.

### Paso 2: Página de detalle `DesgloseEvento.jsx` y ruta
- Crear `src/pages/eventos/DesgloseEvento.jsx`, ruta `/evento/:slug` en `src/App.jsx`.
- Estructura calcada de `DesgloseNoticia.jsx`:
  - Barra de título con el título del evento; el color de la barra puede usar `colorTema` del evento.
  - Insignia con la fecha formateada `dd - mm - aaaa` (reutilizar la función `formatearFecha` que hay en `EventosGrid.jsx`; si hace falta, moverla a `src/lib/eventos.js`).
  - Imagen principal grande (si no hay, el placeholder que ya usa EventosGrid).
  - Bloque de datos: ciudad, lugar, hora (con los íconos `MapPin` y `Clock` de lucide-react) y las etiquetas `dirigidoA` como chips.
  - Descripción: mostrar `descripcion` completa (sin recorte).
  - Botón "Volver" igual al de las noticias.
  - Si el slug no existe: "Evento no encontrado" con enlace a `/eventos`.
- Hacer scroll al inicio al abrir la página (revisar cómo lo hace la ruta de noticias y mantener el mismo comportamiento).

**Commit sugerido:** `feat: página de detalle de evento`.
**Yo pruebo:** escribir a mano `/evento/<slug>` de un evento existente y `/evento/inventado`.

### Paso 3: Conectar las cards y el calendario
- En `EventosGrid.jsx`, cambiar el `<button>` "Leer más" por un `<Link to={`/evento/${slug}`}>` con el mismo aspecto (mismas clases). Usar `slugEvento`.
- En `CalendarioEventos.jsx`, en el panel de detalle del evento mostrado, agregar un enlace "Ver detalle" al mismo `/evento/<slug>`, con un estilo coherente con el panel (sin rediseñarlo).
- Que la card completa no se vuelva un enlace (solo el botón), para no cambiar su comportamiento.

**Commit sugerido:** `feat: enlazar cards y calendario al detalle del evento`.
**Yo pruebo:** clic en "Leer más" de varias cards y desde el calendario; el botón Volver regresa a `/eventos`.

### Paso 4: Contenido extra para el detalle, editable desde el CMS (opcional, decidimos al llegar)
Hoy el detalle solo puede mostrar lo que ya tiene el evento. Para que sea parecido a una noticia:
- Agregar a cada evento campos **opcionales** `detalle` (lista de párrafos) e `imagenes` (hasta 2 imágenes secundarias).
- En `DesgloseEvento.jsx`: si hay `detalle`, mostrar los párrafos con las imágenes laterales como en `DesgloseNoticia.jsx`; si no, mostrar solo `descripcion` como en el Paso 2. Los 19 eventos actuales no deben romperse.
- En `public/admin/config.yml` (colección `eventos` > `tarjetasEventos`) agregar esos dos campos con `required: false`. **Antes de tocar `config.yml`, mostrarme el cambio exacto y esperar mi aprobación**, y confirmar que el YAML sigue siendo válido.

**Commit sugerido:** `feat: detalle ampliado de eventos editable desde el CMS`.

### Paso 5: Revisión final
- `npm run build`.
- Revisar en el navegador a ancho de celular (~375 px) y de escritorio: el detalle de un evento con imagen, uno sin imagen, y uno con `detalle`.
- Revisar que no quedaron `console.log` ni importaciones sin usar.
- Entregarme un resumen y un título y descripción sugeridos para el PR (no abrir el PR).

## Notas
- Las rutas son nuevas (`/evento/:slug`), así que **no cambian** los enlaces actuales de noticias.
- Si más adelante quieren eventos con enlace estable aunque cambien el título o la fecha, se puede agregar un campo `slug` opcional en el CMS que tenga prioridad sobre el calculado.
- Quien edite fechas o títulos en el CMS cambiará el enlace de ese evento. Es normal en este esquema; avísenle a la clienta si comparten enlaces de eventos.
