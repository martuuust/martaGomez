# PROYECTO_martaGomez

SSOT del portfolio de Marta Gómez.

## Qué es

SPA de portfolio personal (secciones: hero, about, skills, projects, contact, footer).

## Stack

| Capa | Tecnología | Versión aprox. |
|------|------------|----------------|
| Framework | Angular (standalone, zoneless) | ^21.2 |
| Lenguaje | TypeScript | ~5.9 |
| Estilos | Tailwind CSS + PostCSS | ^4.3 |
| Animación | GSAP | ^3.15 |
| Iconos | simple-icons | ^16 |
| Reactividad | RxJS | ~7.8 |
| Build | Angular CLI / `@angular/build:application` | ^21.2 |
| Package manager | npm | 11.6 |
| Formato | Prettier | ^3.8 |
| Tests | Vitest (vía `ng test`, según README) | — |

## Características Angular relevantes

- **Zoneless**: `provideZonelessChangeDetection()` en `app.config.ts` (sin Zone.js).
- **Browser-only**: builder `application` con entry `src/main.ts` (sin SSR configurado).
- **Datos**: portfolio estático en `src/app/shared/data/portfolio.data.ts`.

## Estructura clave

```
src/app/
  features/   # hero, about, skills, projects, contact, navbar, footer
  core/       # theme, scroll, directivas GSAP
  shared/     # models + data del portfolio
public/       # assets estáticos
```

## Contenido actual (alineado a LinkedIn)

Fuente: [linkedin.com/in/marta-gómez-41a4a72a9](https://www.linkedin.com/in/marta-g%C3%B3mez-41a4a72a9/) (sync manual en `portfolio.data.ts`, sin API).

- Rol: Desarrolladora Web | Angular | IA aplicada al desarrollo
- Ubicación LinkedIn: Chiva, Valencia
- Bio: texto About de LinkedIn
- About: Experiencia (Onna Digital) y Formación (DAW + SMR) en secciones separadas; bio en 3 frases concretas; sin stats de relleno
- Skills: grupos `daily` / `worked` / `exploring` / `ai` (IA en chips compactos). Sin marquee ni filtros por categoría.
- Proyectos: casos de estudio (problema → qué hice → stack → resultado). Primero Onna (portal distribuidores). CineMatch e Intermodular pendientes de contenido/capturas.
- Stats: solo cifras verificables (FP, repos, proyectos mostrados, nº skills).
- Contacto: sin email inventado → LinkedIn.

**Nota:** LinkedIn no permite sync automática del CV completo; al cambiar el perfil hay que actualizar `portfolio.data.ts` a mano.

## Dependencias causales (Nebula)

- Si quitas **GSAP** → se rompen `gsap-reveal` / `gsap-hover` y contadores about.
- Si cambias **Tailwind 4 / PostCSS** → se rompe el pipeline de estilos (`postcss.config.json` + `styles.css`).
- Si editas **`portfolio.data.ts` / modelos** → se actualiza el contenido de todas las features que lo consumen.
- Si quitas **zoneless** o reintroduces Zone.js → hay que alinear detección de cambios y providers en `app.config.ts`.
- Si fusionas EXPERIENCE/EDUCATION de nuevo → hay que volver a unificar el template about (hoy son dos timelines).

## Limpieza 2026-09-24

Eliminado por innecesario:
- Blobs animados duplicados en about/skills/contact/projects (1 glow estático; hero conserva 3 blobs con tokens)
- `skills.css` + clases `skill-card`/`skill-name` (contraste vía `text-ink`)
- `btn-solid` duplicado (queda `btn-cream` + `bg-button-bg`)
- Overrides CSS `!important` de `.text-ink` / `.text-ink-muted` (restaurados: sin ellos el texto de skills era ilegible en dark)
- Cards de skills: `bg-surface` + `text-slate-900 dark:text-slate-50` para contraste garantizado
- Export muerto `TIMELINE` y `PERSON.headline`
- Filtros de proyectos (solo había categoría web) + `ProjectCategory` + badges de categoría
- Badges "Experiencia"/"Formación" redundantes con los títulos de sección
- Sección testimonios ficticios (ya fuera del tree)
- Datos inventados previos (email, %, proyectos relleno, VMware, Scroll indicator)

## Fase 1 — Bugs (2026-09-24)

- About: contadores muestran valor final con `prefers-reduced-motion`
- Contact: Web3Forms (`environment.web3formsAccessKey`); sin key → aviso honesto + CTAs LinkedIn/GitHub (sin mensaje de “no hay email”)
- Un solo `<main>` (hero ya no anida otro)
- Projects: sin `@defer`; modal con focus trap, `aria-labelledby`, Escape, tarjeta = `<button>`
- Iconos: Antigravity + Stitch desde `public/icons/` (press kit / gstatic); proyectos TS usan `siTypescript`
- Limpieza: `signal` en skills, `gsap.context` con scope en hero/reveal, ThemeService try/catch localStorage
- GSAP hover/reveal respetan reduced-motion

**Web3Forms:** access key configurada en `environment*.ts` (destino: martygomez2000@gmail.com). El email no se publica en el portfolio.

## Fase 2 — Quitar ruido (2026-09-24)

- Hero: solo partículas; titular = Marta Gómez, rol, subtítulo; sin rotador ni blobs/rejilla/badge
- Skills: sin marquee; grupos Uso a diario / He trabajado con / Explorando / IA (chips)
- About: sin stats de relleno ni bullets genéricos; bio en 3 frases
- TODO: confirmar métricas reales si se quieren stats de nuevo

## Fase 3 — Casos de estudio (2026-09-24)

- Modelo `Project`: problem / whatIDid / result / stack / image / complete
- UI tarjetas + modal en formato caso de estudio
- Caso 1: Portal de distribuidores (Onna), arquitectura sin datos confidenciales
- CineMatch e Intermodular: `complete: false` hasta que Marta aporte texto + captura en `public/projects/`
- Portfolio personal como caso corto completo

## Notas

- Sin backend propio: sitio estático de presentación.
- Tests de componentes omitidos por schematics (`skipTests: true`).
- Arranque local: `npm.cmd start` (PowerShell puede bloquear `npm.ps1`).
