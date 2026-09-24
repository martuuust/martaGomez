import { AfterViewInit, Directive, ElementRef, inject, Input, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Animación de aparición al hacer scroll (fade + slide).
 * Ejemplo: <div appGsapReveal appGsapRevealDelay="0.2" appGsapRevealFrom="left">
 */
@Directive({
  selector: '[appGsapReveal]',
  standalone: true,
})
export class GsapRevealDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() appGsapRevealDelay = 0;
  @Input() appGsapRevealFrom: 'bottom' | 'left' | 'right' | 'up' | 'none' = 'bottom';
  @Input() appGsapRevealY = 48;

  private context?: gsap.Context;

  ngAfterViewInit(): void {
    const el = this.host.nativeElement;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(el, { autoAlpha: 1, x: 0, y: 0 });
      return;
    }

    const delta =
      this.appGsapRevealFrom === 'left'
        ? { x: -64 }
        : this.appGsapRevealFrom === 'right'
          ? { x: 64 }
          : this.appGsapRevealFrom === 'none'
            ? {}
            : { y: this.appGsapRevealY };

    this.context = gsap.context(() => {
      gsap.fromTo(
        el,
        { autoAlpha: 0, ...delta },
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: this.appGsapRevealDelay,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        },
      );
    }, el);
  }

  ngOnDestroy(): void {
    this.context?.revert();
  }
}
