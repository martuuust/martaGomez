import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  HostListener,
  inject,
  booleanAttribute,
  computed,
} from '@angular/core';
import {
  CvGeneratorService,
  CV_TEMPLATES,
  type CvTemplate,
} from '../../core/services/cv-generator.service';

export type DownloadButtonVariant = 'solid' | 'outline' | 'ghost';

@Component({
  selector: 'app-download-cv',
  standalone: true,
  template: `
    <div class="relative inline-flex" #anchorRef>
      <button
        type="button"
        (click)="toggleMenu()"
        [class]="baseClass()"
        aria-haspopup="menu"
        [attr.aria-expanded]="open()"
        aria-label="Descargar CV en PDF"
      >
        <svg
          class="h-[1em] w-[1em] shrink-0 transition-transform group-hover:-translate-y-[1px]"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        <span class="leading-none">{{ label() }}</span>
        <svg
          class="h-3.5 w-3.5 shrink-0 opacity-80 transition-transform"
          [class.rotate-180]="open()"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      @if (open()) {
        <div
          class="absolute z-50 mt-2 origin-top rounded-xl border border-white/10 bg-[#0a0612]/95 shadow-2xl backdrop-blur-xl focus:outline-none"
          [class]="menuAlign()"
          role="menu"
          style="min-width: 240px;"
        >
          <div class="border-b border-white/10 px-3 py-2.5 text-[11px] uppercase tracking-widest text-purple-200/60">
            Elige plantilla · PDF
          </div>
          <div class="p-1.5 space-y-1">
            @for (t of templates(); track t.id) {
              <button
                type="button"
                role="menuitem"
                (click)="download(t.id)"
                class="group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-all hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
              >
                <span
                  class="h-7 w-7 shrink-0 rounded-lg border border-white/10 flex items-center justify-center text-[11px] font-bold"
                  [style.background]="t.accent + '22'"
                  [style.color]="t.accent"
                  [style.borderColor]="t.accent + '66'"
                  aria-hidden="true"
                >
                  {{ t.name.charAt(0) }}
                </span>
                <span class="flex-1">
                  <span class="block text-sm font-semibold text-purple-50 group-hover:text-fuchsia-200">
                    {{ t.name }}
                  </span>
                  <span class="block text-[11px] text-purple-300/60">{{ t.tagline }}</span>
                </span>
                <svg
                  class="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 text-fuchsia-400"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            }
          </div>
          <div
            class="border-t border-white/10 px-3 py-2 flex items-center justify-between gap-2 text-[11px] text-purple-300/60"
          >
            <span>{{ statusText() }}</span>
            @if (busy()) {
              <svg
                class="h-3.5 w-3.5 animate-spin text-fuchsia-400"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" opacity="0.25"></circle>
                <path
                  d="M22 12a10 10 0 0 0-10-10"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                ></path>
              </svg>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class DownloadCvComponent {
  private readonly cv = inject(CvGeneratorService);

  label = input<string>('Descargar CV');
  variant = input<DownloadButtonVariant>('solid');
  align = input<'left' | 'right'>('right');
  compact = input(false, { transform: booleanAttribute });

  downloaded = output<void>();

  protected readonly templates = signal(CV_TEMPLATES);
  protected readonly open = signal(false);
  protected readonly busy = signal(false);
  protected readonly statusText = computed(() => {
    if (this.busy()) return 'Generando PDF…';
    return '3 plantillas · A4';
  });

  readonly anchorRef = viewChild<ElementRef<HTMLDivElement>>('anchorRef');

  protected readonly baseClass = computed(() => {
    const variants: Record<DownloadButtonVariant, string> = {
      solid:
        'inline-flex items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition-all hover:shadow-xl hover:shadow-fuchsia-500/30 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050208]',
      outline:
        'inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-purple-50 backdrop-blur transition-all hover:border-fuchsia-400/50 hover:bg-white/10 hover:text-fuchsia-100 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050208]',
      ghost:
        'inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium text-purple-200/90 transition-all hover:bg-white/10 hover:text-fuchsia-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050208]',
    };
    return (
      variants[this.variant()] +
      (this.compact() ? ' !px-3 !py-1.5 !text-xs' : '')
    );
  });

  protected readonly menuAlign = computed(() =>
    this.align() === 'left' ? 'left-0' : 'right-0',
  );

  toggleMenu(): void {
    if (this.busy()) return;
    this.open.update((v) => !v);
    if (this.open()) {
      setTimeout(() => {
        const el = this.anchorRef()?.nativeElement?.querySelector('[role="menu"]');
        (el as HTMLElement | null)?.focus?.();
      }, 0);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocClick(event: Event): void {
    const tgt = event.target as Node | null;
    if (!tgt) return;
    if (this.anchorRef()?.nativeElement?.contains(tgt)) return;
    this.open.set(false);
  }

  @HostListener('document:keydown.escape')
  onEsc(): void {
    this.open.set(false);
  }

  async download(tpl: CvTemplate): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    this.open.set(false);
    try {
      await this.cv.download(tpl);
      this.downloaded.emit();
    } catch (err) {
      console.error(err);
      alert('No se pudo generar el CV PDF. Inténtalo de nuevo.');
    } finally {
      setTimeout(() => this.busy.set(false), 450);
    }
  }
}
