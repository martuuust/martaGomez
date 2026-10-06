import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';

gsap.registerPlugin(ScrollTrigger);

export interface HexLayer {
  id: string;
  ring: number; // 0 = centro (dominio), 1 = aplicación, 2 = adaptadores (infra + ui)
  label: string;
  short: string;
  accent: string;
  description: string;
  responsibilities: string[];
  tech: string[];
  icon: string;
}

export interface HexFlow {
  from: string;
  to: string;
  label: string;
  tech?: string;
}

const LAYERS: HexLayer[] = [
  {
    id: 'domain',
    ring: 0,
    label: 'Dominio',
    short: 'Domain',
    accent: '#a855f7',
    description:
      'El núcleo del negocio. Entidades, value objects y reglas puras — totalmente independientes de frameworks, bases de datos o servicios externos. Aquí reside la lógica esencial.',
    responsibilities: [
      'Entidades de negocio y reglas invariantes',
      'Value Objects tipados e inmutables',
      'Puertos e interfaces de repositorios',
      'Servicios de dominio puros',
    ],
    tech: ['TypeScript puro', 'Interfaces', 'Enums', 'Políticas de negocio'],
    icon: '♦',
  },
  {
    id: 'app',
    ring: 1,
    label: 'Aplicación',
    short: 'App',
    accent: '#22d3ee',
    description:
      'Casos de uso. Orquestan las entidades del dominio sin contener lógica de negocio propia. Definen los flujos de la aplicación interactuando a través de interfaces y puertos.',
    responsibilities: [
      'Casos de uso y flujos de la aplicación',
      'Command / Query handlers (CQRS táctico)',
      'Puertos de entrada (driving ports)',
      'Validación y transformación de DTOs',
    ],
    tech: ['Servicios Angular', 'Controladores Express', 'Puertos', 'Mappers'],
    icon: '◆',
  },
  {
    id: 'ui',
    ring: 2,
    label: 'Presentación',
    short: 'UI',
    accent: '#f472b6',
    description:
      'Capa de interfaz y experiencia de usuario. Formularios reactivos, enrutamiento y componentes visuales que interactúan con los casos de uso sin acoplarse al almacenamiento.',
    responsibilities: [
      'Componentes standalone + signals',
      'Formularios reactivos y validación UX',
      'Consumo de API REST / cliente HTTP',
      'Theming claro/oscuro y accesibilidad',
    ],
    tech: ['Angular 21', 'Signals', 'Tailwind 4', 'GSAP'],
    icon: '▣',
  },
  {
    id: 'infra',
    ring: 2,
    label: 'Infraestructura',
    short: 'Infra',
    accent: '#34d399',
    description:
      'Adaptadores de salida (driven adapters). Implementan las interfaces del dominio para comunicarse con bases de datos, APIs de terceros y servicios de infraestructura.',
    responsibilities: [
      'Implementación de repositorios (SQL, MySQL)',
      'Clientes API y servicios externos',
      'Autenticación, persistencia y sesiones',
      'Logging y observabilidad',
    ],
    tech: ['PHP', 'Express', 'SQL / MySQL', 'APIs REST'],
    icon: '⬢',
  },
  {
    id: 'tests',
    ring: 2,
    label: 'Tests',
    short: 'QA',
    accent: '#facc15',
    description:
      'Pirámide de pruebas: tests de dominio rápidos sin mocks, tests de aplicación con dobles de prueba para los puertos, y pruebas de integración sobre adaptadores.',
    responsibilities: [
      'Tests unitarios de entidades y reglas',
      'Tests de integración puerto → adaptador',
      'Reglas de arquitectura y linting de capas',
      'Smoke tests y validación end-to-end',
    ],
    tech: ['Vitest', 'Jest', 'Playwright', 'ESLint'],
    icon: '✧',
  },
  {
    id: 'ops',
    ring: 2,
    label: 'Operaciones',
    short: 'Ops',
    accent: '#fb923c',
    description:
      'Automatización y despliegue continuo. Flujo de integración en Git, ramas por funcionalidad y revisiones de código orientadas a entregar software confiable.',
    responsibilities: [
      'CI/CD: build, lint y pruebas automatizadas',
      'Flujo de ramas (feature branching / squash)',
      'Conventional commits y versionado',
      'Revisiones de código y calidad',
    ],
    tech: ['GitLab / GitHub', 'Docker (exploring)', 'CI/CD Pipelines'],
    icon: '⚙',
  },
];

const FLOWS: HexFlow[] = [
  { from: 'ui', to: 'app', label: 'command/query', tech: 'Formulario → caso de uso' },
  { from: 'app', to: 'domain', label: 'domain objects' },
  { from: 'app', to: 'infra', label: 'port impl', tech: 'Repositorio → MySQL' },
  { from: 'tests', to: 'domain', label: 'unit tests' },
  { from: 'ops', to: 'infra', label: 'deploy', tech: 'GitLab CI' },
];

@Component({
  selector: 'app-hex-architecture',
  standalone: true,
  imports: [GsapRevealDirective],
  template: `
    <section
      id="arquitectura"
      class="relative mx-auto max-w-7xl scroll-mt-20 px-4 py-12 sm:px-6 sm:py-16"
    >
      <div
        class="absolute top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]"
        aria-hidden="true"
      ></div>

      <header class="mx-auto max-w-3xl text-center" appGsapReveal>
        <div class="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-[0.2em] text-cyan-400">
          <span>02</span>
          <span class="opacity-40">/</span>
          <span>Arquitectura</span>
        </div>
        <h2 class="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          Cómo estructuro el <span class="text-gradient">software</span>
        </h2>
        <p class="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
          Estructuración de software basada en <b>arquitectura hexagonal</b> (puertos y adaptadores).
          Separación clara de responsabilidades: el dominio y la lógica de negocio nunca dependen
          de la infraestructura ni de los frameworks externos.
        </p>
      </header>

      <div class="mt-8 sm:mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        <div
          #diagramRef
          class="relative grid min-h-[420px] place-items-center rounded-3xl border border-line bg-surface/40 p-6 sm:min-h-[480px] sm:p-8"
        >
          <svg
            class="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 600 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ring-domain" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#a855f7" stop-opacity="0.35" />
                <stop offset="100%" stop-color="#6d28d9" stop-opacity="0.55" />
              </linearGradient>
              <linearGradient id="ring-app" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.25" />
                <stop offset="100%" stop-color="#0891b2" stop-opacity="0.45" />
              </linearGradient>
              <linearGradient id="ring-ui" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f472b6" stop-opacity="0.22" />
                <stop offset="100%" stop-color="#9d174d" stop-opacity="0.38" />
              </linearGradient>
              <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g>
              <circle cx="300" cy="260" r="200" fill="url(#ring-ui)" stroke="var(--line)" stroke-width="1" />
              <circle cx="300" cy="260" r="130" fill="url(#ring-app)" stroke="var(--line)" stroke-width="1" />
              <circle cx="300" cy="260" r="70" fill="url(#ring-domain)" stroke="var(--line)" stroke-width="1" />
            </g>

            <g stroke-dasharray="4 6" stroke="currentColor" stroke-width="1" opacity="0.4">
              @for (flow of FLOWS; track flow.from + flow.to) {
                <line
                  [attr.x1]="coords(flow.from).x"
                  [attr.y1]="coords(flow.from).y"
                  [attr.x2]="coords(flow.to).x"
                  [attr.y2]="coords(flow.to).y"
                  [style.color]="layerById(flow.from)?.accent"
                ></line>
              }
            </g>
          </svg>

          @for (layer of LAYERS; track layer.id) {
            <button
              type="button"
              class="group absolute z-10 grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-2xl border backdrop-blur transition-all duration-300 focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-3"
              [class]="
                activeId() === layer.id
                  ? 'scale-110 border-white/30 shadow-2xl'
                  : 'border-line/80 hover:-translate-y-[calc(50%+6px)] hover:scale-105'
              "
              [style.left.%]="pos(layer).left"
              [style.top.%]="pos(layer).top"
              [style.min-width.px]="size(layer).w"
              [style.min-height.px]="size(layer).h"
              [style.background]="
                activeId() === layer.id
                  ? 'color-mix(in srgb, ' + layer.accent + ' 28%, var(--surface))'
                  : 'var(--glass)'
              "
              [style.box-shadow]="
                activeId() === layer.id
                  ? '0 0 0 2px ' + layer.accent + ', 0 10px 40px -12px ' + layer.accent + '88'
                  : ''
              "
              (click)="toggle(layer.id)"
              [attr.aria-pressed]="activeId() === layer.id"
            >
              <div class="flex flex-col items-center px-4 py-3 text-center">
                <span
                  class="grid h-8 w-8 shrink-0 place-items-center rounded-xl text-lg font-bold transition-transform group-hover:scale-110"
                  [style.background]="layer.accent + '22'"
                  [style.color]="layer.accent"
                >
                  {{ layer.icon }}
                </span>
                <span class="mt-1.5 font-display text-[13px] font-bold text-ink sm:text-sm">
                  {{ layer.label }}
                </span>
                <span class="text-[10px] font-medium tracking-wide text-ink-muted uppercase">
                  ring {{ layer.ring }}
                </span>
              </div>
            </button>
          }

          <div
            class="pointer-events-none absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono tracking-wide text-ink-muted"
          >
            <span class="inline-block h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            <span>Dependency Rule ←</span>
          </div>
        </div>

        <aside class="flex flex-col">
          @if (active(); as layer) {
            <div
              class="glass relative flex flex-1 flex-col rounded-3xl p-6 sm:p-7"
              style="animation: zoom-in 0.3s ease both"
            >
              <div
                class="flex items-center justify-between"
                [style.border-color]="layer.accent + '55'"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="grid h-11 w-11 place-items-center rounded-2xl text-xl font-bold"
                    [style.background]="layer.accent + '22'"
                    [style.color]="layer.accent"
                  >
                    {{ layer.icon }}
                  </span>
                  <div>
                    <h3 class="font-display text-xl font-bold text-ink sm:text-2xl">
                      {{ layer.label }}
                    </h3>
                    <p class="text-xs font-medium text-ink-muted uppercase tracking-wider">
                      {{ layer.short }} · Ring {{ layer.ring }}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  (click)="clear()"
                  class="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-muted transition-all hover:border-primary/50 hover:text-primary"
                  aria-label="Cerrar detalle"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                    <path d="M18 6 6 18M6 6l12 12"></path>
                  </svg>
                </button>
              </div>

              <p class="mt-5 text-sm leading-relaxed text-ink-muted sm:text-base">
                {{ layer.description }}
              </p>

              <div class="mt-6 space-y-6">
                <div>
                  <h4 class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Responsabilidades
                  </h4>
                  <ul class="mt-3 space-y-2.5">
                    @for (r of layer.responsibilities; track r) {
                      <li class="flex items-start gap-2.5 text-sm text-ink">
                        <span
                          class="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full text-[10px] font-bold text-white"
                          [style.background]="layer.accent"
                        >
                          ✓
                        </span>
                        <span>{{ r }}</span>
                      </li>
                    }
                  </ul>
                </div>

                <div>
                  <h4 class="font-display text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    Tecnologías
                  </h4>
                  <div class="mt-3 flex flex-wrap gap-2">
                    @for (t of layer.tech; track t) {
                      <span
                        class="rounded-full border px-3 py-1 text-[11px] font-semibold"
                        [style.border-color]="layer.accent + '66'"
                        [style.color]="layer.accent"
                        [style.background]="layer.accent + '14'"
                      >
                        {{ t }}
                      </span>
                    }
                  </div>
                </div>
              </div>
            </div>
          } @else {
            <div
              class="glass flex flex-1 flex-col items-center justify-center rounded-3xl p-8 text-center"
            >
              <div
                class="grid h-16 w-16 place-items-center rounded-3xl border border-line bg-gradient-to-br from-primary/20 to-secondary/20 text-3xl"
              >
                ◎
              </div>
              <h3 class="mt-5 font-display text-lg font-semibold text-ink sm:text-xl">
                Pulsa una capa para explorarla
              </h3>
              <p class="mt-2 max-w-sm text-sm leading-relaxed text-ink-muted">
                Las dependencias siempre apuntan hacia adentro: el dominio es independiente del framework,
                la base de datos y las herramientas externas. <b>Dependency Rule</b>.
              </p>

              <div class="mt-6 grid grid-cols-2 gap-3 w-full max-w-sm">
                <button
                  type="button"
                  (click)="setActive('domain')"
                  class="rounded-2xl border border-line bg-surface px-4 py-3 text-left text-xs font-medium transition-all hover:border-primary/40 hover:bg-primary/5"
                >
                  <span class="block font-display font-bold text-sm">▶ Modo guiado</span>
                  <span class="block mt-1 text-ink-muted">Centro → exterior</span>
                </button>
                <button
                  type="button"
                  (click)="startTour()"
                  class="rounded-2xl border border-primary/40 bg-primary/5 px-4 py-3 text-left text-xs font-medium transition-all hover:bg-primary/10"
                >
                  <span class="block font-display font-bold text-sm">🎯 Auto tour</span>
                  <span class="block mt-1 text-ink-muted">Todas las capas, 12s</span>
                </button>
              </div>
            </div>
          }

          <div
            class="mt-4 flex items-center justify-between rounded-2xl border border-line bg-surface/60 px-4 py-3 text-xs text-ink-muted"
          >
            <span class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot"></span>
              Patrón Ports & Adapters · Código desacoplado y testeable
            </span>
            <span class="font-mono tracking-wide">Clean Architecture</span>
          </div>
        </aside>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class HexArchitectureComponent implements AfterViewInit {
  protected readonly LAYERS = LAYERS;
  protected readonly FLOWS = FLOWS;

  protected readonly activeId = signal<string | null>(null);
  protected readonly active = signal<HexLayer | null>(null);

  private readonly destroyRef = inject(DestroyRef);
  private readonly diagram = viewChild<ElementRef<HTMLDivElement>>('diagramRef');
  private tourTimeline?: gsap.core.Timeline;

  ngAfterViewInit(): void {
    this.destroyRef.onDestroy(() => this.tourTimeline?.kill());
  }

  protected layerById(id: string): HexLayer | undefined {
    return LAYERS.find((l) => l.id === id);
  }

  protected coords(id: string): { x: number; y: number } {
    const p = this.pos(this.layerById(id)!);
    return { x: (p.left / 100) * 600, y: (p.top / 100) * 520 };
  }

  protected pos(layer: HexLayer): { left: number; top: number } {
    const positions: Record<string, { left: number; top: number }> = {
      domain: { left: 50, top: 50 },
      app: { left: 50, top: 22 },
      ui: { left: 18, top: 22 },
      infra: { left: 82, top: 22 },
      tests: { left: 18, top: 78 },
      ops: { left: 82, top: 78 },
    };
    return positions[layer.id] ?? { left: 50, top: 50 };
  }

  protected size(layer: HexLayer): { w: number; h: number } {
    if (layer.ring === 0) return { w: 96, h: 96 };
    if (layer.ring === 1) return { w: 112, h: 82 };
    return { w: 120, h: 92 };
  }

  protected toggle(id: string): void {
    if (this.activeId() === id) {
      this.clear();
    } else {
      this.setActive(id);
    }
  }

  protected setActive(id: string): void {
    const match = this.layerById(id);
    if (!match) return;
    this.activeId.set(id);
    this.active.set(match);
    this.tourTimeline?.kill();
  }

  protected clear(): void {
    this.activeId.set(null);
    this.active.set(null);
    this.tourTimeline?.kill();
  }

  protected startTour(): void {
    this.tourTimeline?.kill();
    const sequence = ['domain', 'app', 'ui', 'infra', 'tests', 'ops'];
    const tl = gsap.timeline({
      onComplete: () => this.clear(),
      onKill: () => {},
    });
    tl.add(() => this.setActive('domain'), 0);
    for (let i = 1; i < sequence.length; i++) {
      tl.add(() => this.setActive(sequence[i]), i * 2);
    }
    this.tourTimeline = tl;
    this.destroyRef.onDestroy(() => tl.kill());
  }
}
