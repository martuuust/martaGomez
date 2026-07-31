import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { PERSON, STATS, TIMELINE } from '../../shared/data/portfolio.data';
import type { TimelineEntry } from '../../shared/models/portfolio.model';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  imports: [GsapRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent implements AfterViewInit {
  protected readonly person = PERSON;
  protected readonly stats = STATS;
  protected readonly timeline = TIMELINE;

  private readonly destroyRef = inject(DestroyRef);
  private readonly statsWrap = viewChild<ElementRef<HTMLElement>>('statsWrap');

  ngAfterViewInit(): void {
    this.animateCounters();
  }

  private animateCounters(): void {
    const wrap = this.statsWrap()?.nativeElement;
    if (!wrap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.stat-value').forEach((el) => {
        const target = Number(el.dataset['target'] ?? '0');
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(counter.value));
          },
        });
      });
    }, wrap);

    this.destroyRef.onDestroy(() => context.revert());
  }

  protected typeLabel(entry: TimelineEntry): string {
    return entry.type === 'work' ? 'Experiencia' : 'Formación';
  }
}
