import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { EDUCATION, EXPERIENCE, PERSON, STATS } from '../../shared/data/portfolio.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-about',
  imports: [GsapRevealDirective],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  protected readonly person = PERSON;
  protected readonly stats = STATS;
  protected readonly experience = EXPERIENCE;
  protected readonly education = EDUCATION;

  private readonly destroyRef = inject(DestroyRef);
  private readonly statsWrap = viewChild<ElementRef<HTMLElement>>('statsWrap');

  constructor() {
    afterNextRender(() => this.animateCounters());
  }

  private animateCounters(): void {
    const wrap = this.statsWrap()?.nativeElement;
    if (!wrap) {
      return;
    }

    const values = gsap.utils.toArray<HTMLElement>('.stat-value', wrap);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      for (const el of values) {
        el.textContent = el.dataset['target'] ?? '0';
      }
      return;
    }

    const context = gsap.context(() => {
      values.forEach((el) => {
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
}
