# ARQUON — sitio web

Sitio de una sola página para **ARQUON**, estudio de arquitectura y construcción.
*Tu visión, nuestra realidad.*

React 19 + TypeScript + Vite. Sin backend: el formulario se envía a Formspree y el contacto directo va por WhatsApp.

> 🛠️ **¿Cómo se construyó este sitio?** Ver [`CASO-DESARROLLO.md`](./CASO-DESARROLLO.md) — memoria técnica del proceso con Claude Code, metodología Spec-Driven Development (SDD), orquestación multiagente, *skills* de diseño y el MCP de Higgsfield para el logo, las imágenes y el video del hero.

---

## Empezar

```bash
npm install
cp .env.example .env      # completa el número de WhatsApp y el ID de Formspree
npm run dev               # http://localhost:5173
```

| Comando             | Qué hace                                   |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Servidor de desarrollo                     |
| `npm run build`     | Revisa tipos y genera `dist/` para publicar |
| `npm run preview`   | Sirve `dist/` localmente                   |
| `npm run lint`      | Revisa el código con oxlint                |

Requiere Node 20 o superior.

---

## Lo que tienes que configurar

### 1. WhatsApp
En `.env`:
```
VITE_WHATSAPP_NUMBER=573001234567
```
Formato internacional, sin `+` ni espacios. El mensaje que llega prellenado se cambia en `src/config/site.ts` (`whatsappMessage`).

### 2. Formulario (Formspree)
1. Crea una cuenta gratuita en <https://formspree.io>.
2. Crea un formulario nuevo y copia su ID (la parte final de `https://formspree.io/f/xxxxxxxx`).
3. Pégalo en `.env`:
   ```
   VITE_FORMSPREE_ID=xxxxxxxx
   ```
4. En el panel de Formspree, en *Settings → Restrict to domain*, pon el dominio del sitio para evitar envíos desde otros lugares.

El formulario envía: nombre, correo, teléfono, tipo de proyecto, ubicación, mensaje y la autorización de datos. Tiene validación, campo trampa contra bots (`_gotcha`) y mensajes de error que ofrecen WhatsApp como alternativa.

Mientras no haya ID, el formulario avisa que aún no está conectado y ofrece WhatsApp.

### 3. Datos de la empresa
Todo está en **`src/config/site.ts`**: nombre, eslogan, correo, teléfono, dirección, horario, redes y el hero.

### 4. Proyectos y fotos
Los proyectos están en **`src/data/projects.ts`**. Los que vienen son **de muestra** (nombres y fotos de Unsplash) para ver el diseño: reemplázalos por los reales.

Para usar tus fotos:
1. Cópialas a `public/proyectos/<slug>/` (WebP o JPG, ~2000 px de ancho, menos de 400 KB cada una).
2. Cambia `unsplash(...)` por `local(...)`:
   ```ts
   cover: local('/proyectos/casa-guayacan/fachada.webp', 'Casa Guayacán, fachada hacia el jardín', 3 / 2),
   ```
   El último número es la proporción de la foto (ancho / alto).

Cada proyecto tiene: nombre, tipo (Vivienda, Comercial, Interiores), ubicación, año, área, niveles, estado, resumen (aparece en el hover), descripción, alcance, qué se hizo, galería con pies de foto y un video opcional.

Cada proyecto tiene su propia URL (`/proyectos/casa-guayacan`) para compartirlo directamente.

### 5. Video del hero (IA)
La foto del hero aparece dentro de la silueta del edificio del logo y se abre a pantalla completa al hacer scroll. Puedes cambiarla por un video:

1. Pon los archivos en `public/media/` (por ejemplo `hero.mp4` y `hero.webm`).
2. En `src/config/site.ts`:
   ```ts
   hero: {
     image: '/media/hero-poster.jpg',   // primer cuadro del video: se ve mientras carga
     imageAlt: '…',
     video: { mp4: '/media/hero.mp4', webm: '/media/hero.webm' },
   },
   ```

Recomendaciones para generar el video:
- **Movimiento lento y continuo**: un *dolly* hacia adelante, un paneo lateral suave o la luz que cambia sobre la fachada. Sin cortes ni texto.
- **El edificio centrado y vertical**: al principio solo se ve el centro de la toma, recortado por la silueta.
- 8 a 12 segundos en bucle (que el final empate con el inicio), 1920×1080, sin audio.
- Pesa menos de 6 MB. Para comprimir:
  ```bash
  ffmpeg -i original.mp4 -an -vf scale=1920:-2 -c:v libx264 -crf 26 -preset slow -movflags +faststart public/media/hero.mp4
  ffmpeg -i original.mp4 -an -vf scale=1920:-2 -c:v libvpx-vp9 -crf 36 -b:v 0 public/media/hero.webm
  ```

Para los proyectos también puedes agregar un video (por ejemplo un recorrido) con `video: { src: '/proyectos/<slug>/recorrido.mp4', poster: '…' }`.

---

## Publicar

Es un sitio estático: sube la carpeta `dist/` a cualquier hosting.

- **Vercel**: importa el repositorio, framework *Vite*. Agrega las variables de `.env` en *Settings → Environment Variables*. `vercel.json` ya está incluido para que funcionen las URLs de los proyectos.
- **Netlify**: build `npm run build`, carpeta `dist`. El archivo `public/_redirects` ya está incluido.

Cuando tengas dominio, actualiza en `index.html` la imagen para redes (`og:image`) con la URL completa.

---

## Diseño

**Concepto: del trazo a la obra.** El eslogan habla de pasar de una visión a una realidad; en arquitectura, eso es pasar del plano al edificio. Todo el sitio repite esa idea:

- **Hero**: el edificio del logo se dibuja solo, la foto aparece dentro de su silueta y, al bajar, la silueta se abre hasta llenar la pantalla.
- **Contorno = idea, relleno = construido.** "Tu visión," va en contorno y "nuestra realidad." en sólido. Los números del proceso pasan de contorno a relleno cuando llegas a cada paso.
- **Cotas**: al pasar el cursor sobre un proyecto aparecen líneas de medida como en un plano, con el área y los niveles.
- **Cajetín**: el pie de página tiene la forma del recuadro de datos de una lámina de arquitectura.
- **Imágenes que suben desde su línea base**, como una obra que se levanta.

**Color**

| Token          | Hex       | Uso                                  |
| -------------- | --------- | ------------------------------------ |
| `--white`      | `#FFFFFF` | Fondo principal                      |
| `--black`      | `#000000` | Texto, líneas, sección de contacto   |
| `--olive-deep` | `#3B3F24` | Sección de proceso, menú móvil       |
| `--olive`      | `#5F6438` | Botones (WhatsApp, llamados)         |
| `--olive-light`| `#A2A57C` | Detalles sobre fondos oscuros        |
| `--olive-mist` | `#E7E8DE` | Fondos de imagen mientras cargan     |

**Tipografía**: *Jost* (geométrica, de herencia Bauhaus, cercana al wordmark del logo) para títulos e interfaz; *Newsreader* (serif) para los textos largos, como eco del serif del eslogan en el logo. Ambas van incluidas en el proyecto (no dependen de Google Fonts).

**Accesibilidad**: navegación con teclado y foco visible, la ficha de proyecto atrapa el foco y se cierra con Escape, enlace para saltar al contenido, textos alternativos, contraste AA, y con *reducir movimiento* activado en el sistema el sitio quita las animaciones y el scroll suave.

---

## Estructura

```
src/
├── config/site.ts              Datos de la empresa, WhatsApp, Formspree y hero
├── data/
│   ├── projects.ts             Proyectos (contenido de muestra)
│   └── process.ts              Pasos del proceso
├── styles/                     Tokens de diseño y estilos globales
├── lib/
│   ├── smooth-scroll.tsx       Scroll suave (Lenis) y bloqueo de scroll
│   ├── hooks.ts                useMediaQuery, useElementSize, useEscape
│   └── media.ts                Helpers para imágenes (Unsplash / locales)
├── components/
│   ├── brand/                  Isotipo en SVG (geometría trazada del logo)
│   ├── layout/                 Header, Footer (cajetín), botón de WhatsApp
│   └── ui/                     Imagen con respaldo, animaciones de entrada
├── sections/                   Hero, Estudio, Proyectos, Proceso, Contacto
└── features/project/           Ficha completa del proyecto
```

Librerías: `motion` (animaciones), `lenis` (scroll suave), `react-router` (URL por proyecto), `@fontsource-variable/*` (fuentes).
