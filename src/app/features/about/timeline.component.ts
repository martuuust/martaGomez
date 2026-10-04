import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { TimelineEntry } from '../../shared/models/portfolio.model';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.html',
  styleUrl: './timeline.css',
})
export class TimelineComponent implements AfterViewInit {
  readonly entries = input.required<TimelineEntry[]>();
  readonly title = input<string | undefined>();
  readonly codeGlyph = '&lt;/&gt;';

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly railProgress = viewChild<ElementRef<SVGLineElement>>('railProgress');
  private readonly itemRefs = viewChildren<ElementRef<HTMLLIElement>>('itemRefs');

  readonly expanded = signal<Set<number>>(new Set());
  readonly copied = signal<number | null>(null);

  ngAfterViewInit(): void {
    this.setupRailAnimation();
  }

  isExpanded(i: number): boolean {
    return this.expanded().has(i);
  }

  toggleEntry(i: number): void {
    this.expanded.update((prev) => {
      const n = new Set(prev);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }

  async copySnippet(i: number): Promise<void> {
    const entry = this.entries()[i];
    const code = entry.snippet?.code;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      this.copied.set(i);
      setTimeout(() => this.copied.set(null), 2200);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      ta.remove();
      this.copied.set(i);
      setTimeout(() => this.copied.set(null), 2200);
    }
  }

  highlight(lang: string, code: string): string {
    let src = escapeHtml(code);
    if (lang === 'sql') {
      src = src
        .replace(/(--[^\n]*)/g, '<span class="cm">$1</span>')
        .replace(
          /\b(CREATE|TABLE|PRIMARY|KEY|UNIQUE|NOT|NULL|DEFAULT|INT|VARCHAR|DATETIME|ENUM|INDEX|REFERENCES|AUTO_INCREMENT|CURRENT_TIMESTAMP)\b/gi,
          '<span class="kw">$1</span>',
        )
        .replace(/`([^`]+)`/g, '<span class="pn">$1</span>');
    } else {
      src = src
        .replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/)/g, (m) => `<span class="cm">${m}</span>`)
        .replace(
          /\b(export|class|async|await|private|public|protected|readonly|constructor|const|let|var|new|return|if|else|for|while|import|from|typeof|instanceof|void|null|undefined|true|false|interface|type|extends|implements|function)\b/g,
          '<span class="kw">$1</span>',
        )
        .replace(
          /\b(string|number|boolean|any|never|unknown|void|Date|Array|Promise|object|bigint|Map|Set|Record)\b/g,
          '<span class="ty">$1</span>',
        )
        .replace(/\b([A-Z][A-Za-z0-9_]+)\b/g, '<span class="ty">$1</span>')
        .replace(/'([^']*)'/g, "<span class=\"st\">'$1'</span>")
        .replace(/"([^"]*)"/g, '<span class="st">"$1"</span>')
        .replace(/`([^`]*)`/g, '<span class="st">`$1`</span>')
        .replace(/\b(\d+)\b/g, '<span class="nu">$1</span>');
    }
    return src;
  }

  private setupRailAnimation(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rp = this.railProgress()?.nativeElement;
      if (rp) gsap.set(rp, { attr: { y2: 1 } });
      return;
    }
    const ctx = gsap.context(() => {
      const items = this.itemRefs();
      const progRef = this.railProgress()?.nativeElement;
      if (progRef) gsap.set(progRef, { attr: { y2: 0 } });

      ScrollTrigger.create({
        trigger: this.host.nativeElement,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: true,
        onUpdate: (self) => {
          if (progRef) gsap.set(progRef, { attr: { y2: self.progress } });
        },
      });

      for (let i = 0; i < items.length; i++) {
        const el = items[i].nativeElement;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          once: true,
          onEnter: () => {
            const dot = el.querySelector('.bg-base > span, .bg-base span') as HTMLElement | null;
            if (dot) {
              gsap.fromTo(
                dot,
                { scale: 0.6, opacity: 0.5 },
                { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' },
              );
            }
          },
        });
      }
    }, this.host.nativeElement);
    this.destroyRef.onDestroy(() => ctx.revert());
  }
}

function escapeHtml(src: string): string {
  return src
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
