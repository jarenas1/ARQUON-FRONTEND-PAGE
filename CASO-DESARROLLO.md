# ARQUON — Caso de desarrollo asistido por IA

> Memoria técnica del **proceso** con el que se construyó este sitio.
> Para instalar y configurar el proyecto, ver [`README.md`](./README.md).

Este documento describe, de forma reproducible, cómo se desarrolló el sitio de **ARQUON**
aplicando **Spec-Driven Development (SDD)** con **Claude Code**, orquestación multiagente,
*skills* de diseño y buenas prácticas, y el **MCP de Higgsfield** para la generación del
logo, las imágenes y el video del hero.

---

## 1. Resumen

| | |
|---|---|
| **Producto** | Landing minimalista y profesional para firma de arquitectura y construcción |
| **Concepto** | *Del trazo a la obra* (plano → edificio) |
| **Stack** | React 19 + TypeScript + Vite |
| **Librerías** | `motion` (animaciones), `lenis` (scroll suave), `react-router` (URL por proyecto), `@fontsource-variable/*` |
| **Paleta** | Blanco `#FFFFFF`, negro `#000000`, olivo `#3B3F24` · `#5F6438` · `#A2A57C` · bruma `#E7E8DE` |
| **Tipografía** | Jost (titulares, herencia Bauhaus del wordmark) · Newsreader (cuerpo, serif del eslogan) |
| **Sin backend** | Formulario vía Formspree + contacto por WhatsApp |
| **Herramienta** | Claude Code (agente orquestador + subagentes) |
| **MCP** | Higgsfield (logo, imágenes, video del hero) |
| **Metodología** | Spec-Driven Development — flujo de 7 fases |

---

## 2. Del brief a la especificación

El punto de partida fue un **brief en lenguaje natural** del cliente. Antes de escribir una
línea de código se tradujo a especificación —principio central del SDD: *la IA, igual que un
ingeniero, necesita requisitos, contexto y criterio antes de producir*.

**Requisitos funcionales (RF):**

- **RF-1** · Hero con animación de scroll y soporte para video generado por IA.
- **RF-2** · Galería de proyectos con *hover* (nombre + descripción) y vista de detalle.
- **RF-3** · Ficha de proyecto: imágenes, descripción, qué se hizo, dónde, año, área, niveles.
- **RF-4** · Botón flotante de WhatsApp.
- **RF-5** · Formulario de captación **sin backend**, conectado a un servicio externo (Formspree).
- **RF-6** · Filtros por categoría (Vivienda, Comercial, Interiores).
- **RF-7** · URL propia y compartible por proyecto.

**Requisitos no funcionales (RNF):**

- **RNF-1** · Estética minimalista y profesional, al nivel de las grandes firmas.
- **RNF-2** · Diseño **único**, no genérico.
- **RNF-3** · Animaciones al hacer scroll, con *fallback* si `prefers-reduced-motion`.
- **RNF-4** · Accesibilidad AA (foco visible, navegación por teclado, Escape, alt text).
- **RNF-5** · Responsividad verificada en desktop y móvil.
- **RNF-6** · Paleta y tipografía estrictas (olivo / blanco / negro).

---

## 3. Metodología: SDD en 7 fases

El proyecto se ejecutó con el flujo **Spec-Driven Development**, donde cada fase alimenta a
la siguiente y un agente **orquestador** coordina el contexto de los subagentes.

### Fase 1 — Exploración
Se inicializó el contexto del proyecto: estructura de carpetas, versiones (React 19, Vite,
TypeScript), *linter* (oxlint) y reglas del proyecto. Se estableció una **fuente única de
verdad** para la marca y el contenido (`src/config/site.ts`, `src/data/projects.ts`), de modo
que un cambio como `Arcon` → **ARQUON** sea de una sola línea.

### Fase 2 — Propuesta (la fase más crítica)
Se definió y **validó con el cliente** el concepto rector *"del trazo a la obra"* antes de
construir:

- **Hero:** el edificio del logo se dibuja solo sobre blanco; la foto/video aparece dentro de
  la silueta y, al hacer scroll, la silueta se abre hasta llenar la pantalla.
- **Lenguaje visual:** *contorno = idea, sólido = construido*. El eslogan pasa de contorno
  (`Tu visión,`) a relleno (`nuestra realidad.`).
- **Galería:** al hacer *hover* aparecen **cotas** (líneas de medida de plano) con área y niveles.
- **Pie de página** con forma de **cajetín** (recuadro de datos de una lámina de arquitectura).

> El plan se presentó **antes** de codificar, con la opción explícita de ajustarlo sobre la
> marcha. Esto es SDD: la propuesta es el punto de control, no el código.

### Fase 3 — Tareas
La propuesta se descompuso por sección: Hero → Estudio → Proyectos (grid + filtros + ficha +
routing) → Proceso (5 pasos) → Contacto (formulario + WhatsApp) → Cajetín, más los activos
(logo, imágenes, video).

### Fase 4 — Requisitos
Cada tarea grande se clasificó en RF/RNF (sección 2), dando a cada subagente criterios de
aceptación verificables.

### Fase 5 — Codificación
El **orquestador** delegó cada sección a **subagentes con contexto propio**. Ventaja clave:
al aislar el contexto de cada subagente, el consumo de tokens del agente principal se mantiene
bajo y la calidad alta (se evita el *context decay*). Resultado: **46 archivos creados y 3
editados**.

### Fase 6 — Pruebas y verificación
`build` y `lint` (oxlint) **sin errores**; verificación en desktop y móvil. Durante la
comprobación de imágenes de muestra (Unsplash) el servicio devolvió **429 (rate limit)**: se
confirmaron 6 imágenes y, ante la imposibilidad de verificar 3, se implementó un **respaldo
visual** (el isotipo sustituye a cualquier imagen rota). Limitación documentada con
transparencia, no ocultada.

### Fase 7 — Documentación y entrega
Se generó el `README.md` (instalación, variables de entorno, dónde poner fotos y video) y esta
memoria técnica. Entrega como proyecto listo para `npm install && npm run dev`.

---

## 4. Orquestación multiagente

```
            ┌─────────────────────────────┐
            │     Agente ORQUESTADOR      │  ← recibe el brief, mantiene el contexto global
            └─────────────┬───────────────┘
      delega por sección  │  (cada subagente, contexto aislado)
   ┌──────────┬───────────┼───────────┬────────────┬───────────┐
   ▼          ▼           ▼           ▼            ▼           ▼
 Hero/     Proyectos +  Proceso     Contacto     Activos      Documentación
 animación  routing     (5 pasos)   (form+WA)    (MCP HF)     (README)
```

- El orquestador **no escribe todo el código**: reparte, coordina y consolida.
- Cada subagente recibe un *prompt* con sus RF/RNF y su criterio de "hecho".
- La **memoria persistente** permite retomar el proyecto en otra sesión sin perder contexto.

---

## 5. Técnica de prompting: separación por secciones

En lugar de un único *prompt* monolítico (que degrada la calidad por exceso de contexto), se
usó **prompting seccionado**: una instrucción autocontenida por bloque de la página, cada una
con objetivo, restricciones de diseño y criterio de aceptación.

Patrón por sección:

```
[CONTEXTO]      Firma de arquitectura ARQUON. Concepto "del trazo a la obra".
[SECCIÓN]       Hero.
[OBJETIVO]      El edificio del logo se dibuja solo; la imagen/video aparece dentro de la
                silueta; al hacer scroll la silueta se abre a pantalla completa.
[RESTRICCIONES] Paleta olivo/blanco/negro. Jost/Newsreader. Respetar prefers-reduced-motion.
                Minimalista, no genérico.
[SKILL]         Usar skill de diseño (sistema de color + jerarquía tipográfica).
[ACEPTACIÓN]    Build y lint sin errores. Verificado en desktop y móvil.
```

Cada tarea queda **testeable de forma independiente**, con menos alucinaciones, y una sección
se puede iterar sin tocar las demás.

> No se usaron prompts del tipo *"actúa como desarrollador senior"* (sin efecto comprobado).
> En su lugar se invocaron **skills**, que aportan comportamiento concreto y reutilizable.

---

## 6. Skills utilizadas

| Skill | Para qué se usó |
|---|---|
| **Diseño** | Paleta coherente con el tema (olivo profundo → bruma olivo en vez del crema genérico de IA) y jerarquía tipográfica real (Jost + Newsreader). Clave para el requisito "diseño único, no genérico". |
| **Buenas prácticas de código** | Componentes pequeños y desacoplados, tipado estricto en TS, configuración y datos centralizados, nombres claros. |
| **Seguridad (OWASP)** | Secretos (número de WhatsApp, ID de Formspree) fuera del código, en `.env`; restricción de dominio en Formspree; campo trampa `_gotcha` contra bots. |
| **Accesibilidad** | Foco visible y navegación por teclado, *focus trap* y cierre con Escape en la ficha, enlace de salto al contenido, contraste AA. |

---

## 7. MCP de Higgsfield — generación de activos

El **MCP de Higgsfield** conectó a Claude con la generación de activos visuales sin salir del
flujo de desarrollo:

- **Logo / wordmark ARQUON** — base del concepto *del trazo a la obra*; su geometría se trazó
  en SVG como isotipo (`src/components/brand/`) y es la silueta que se dibuja en el hero.
- **Imágenes de proyectos** — material visual de arquitectura para la galería (las de muestra
  se reemplazan por fotos reales en `src/data/projects.ts`).
- **Video del hero** — escena con **movimiento de cámara lento**, edificio centrado, 8–12 s en
  *loop*, sin audio, < 6 MB; da vida al hero frente a una imagen estática.

> Flujo real: el agente **genera el activo con el MCP** y lo coloca donde el código lo espera
> (`public/media/` para el video, `public/proyectos/<slug>/` para las fotos), referenciado
> desde `src/config/site.ts` y `src/data/projects.ts`.

---

## 8. Claude Code

Todo el flujo se condujo desde **Claude Code** como agente de desarrollo:

- Creación de la **carpeta del proyecto** y andamiaje (Vite + React 19 + TS).
- Lectura del repositorio y construcción del contexto.
- Creación/edición de archivos (**46 creados, 3 editados**) y ejecución de comandos
  (`install`, `build`, `lint`, `dev`) leyendo sus resultados.
- Orquestación de subagentes y uso del MCP de Higgsfield.
- Entrega con documentación.

El rol humano fue el de **criterio técnico**: validar la propuesta, fijar el concepto, revisar
seguridad y aprobar la entrega — no teclear el código línea a línea.

---

## 9. Buenas prácticas de código aplicadas

- **Fuente única de verdad** (`src/config/site.ts`, `src/data/projects.ts`): marca, contacto,
  proyectos y hero se cambian en un solo lugar.
- **Secretos fuera del repositorio** en `.env` (`.env.example` versionado como plantilla).
  *El código se lee más de lo que se escribe* → se priorizó la legibilidad.
- **Componentes desacoplados** por sección; routing con URL propia por proyecto (`react-router`).
- **Degradación elegante**: respeta `prefers-reduced-motion`; *fallback* del isotipo ante
  imágenes rotas; el formulario ofrece WhatsApp si aún no hay `form ID`.
- **Verificación antes de declarar "hecho"**: build + lint sin errores, probado en desktop y
  móvil; limitaciones (429 en verificación de imágenes, sin envío real del formulario por falta
  de ID) reportadas con transparencia.
- **Sin backend por diseño**: menor superficie de ataque y de mantenimiento.

---

## 10. Hand-off (pendientes para el cliente)

Ver detalle paso a paso en [`README.md`](./README.md):

1. **WhatsApp y Formspree:** `VITE_WHATSAPP_NUMBER` e `VITE_FORMSPREE_ID` en `.env`.
2. **Proyectos y fotos reales:** reemplazar muestras en `src/data/projects.ts`.
3. **Video del hero (IA/Higgsfield):** archivos en `public/media/` y referencia en `src/config/site.ts`.
4. **Datos del negocio:** correo, teléfono y redes en `src/config/site.ts`.
5. **Marca:** confirmada como **ARQUON** (el brief decía "Arcon") — cambio de una línea.

---

*Memoria técnica del desarrollo de ARQUON — construido con Claude Code bajo Spec-Driven
Development, skills de diseño/seguridad/accesibilidad y el MCP de Higgsfield para los activos.*
