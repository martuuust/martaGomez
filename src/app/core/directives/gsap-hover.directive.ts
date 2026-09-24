import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
} from '@angular/core';
import { gsap } from 'gsap';

/**
 * Efecto de inclinación 3D + escala suave al pasar el cursor.
 * Usa gsap.quickTo para seguir el puntero a 60fps.
 * Ejemplo: <div appGsapHover appGsapHoverTilt="12" appGsapHoverGlare="false">
 */
@Directive({
  selector: '[appGsapHover]',
  standalone: true,
})
export class GsapHoverDirective implements AfterViewInit, OnDestroy {
  private readonly host = inject(ElementRef<HTMLElement>);

  @Input() appGsapHoverTilt = 9;
  @Input() appGsapHoverScale = 1.04;
  @Input() appGsapHoverGlare = true;

  private rotateX!: (value: number) => void;
  private rotateY!: (value: number) => void;
  private glare?: HTMLElement;
  private timeline?: gsap.core.Tween;
  private reducedMotion = false;

  ngAfterViewInit(): void {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (this.reducedMotion) {
      return;
    }

    const el = this.host.nativeElement;
    gsap.set(el, { transformPerspective: 900, willChange: 'transform' });

    this.rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
    this.rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });

    if (this.appGsapHoverGlare) {
      this.createGlare(el);
    }
  }

  @HostListener('pointerenter')
  onEnter(): void {
    if (this.reducedMotion) {
      return;
    }
    this.timeline = gsap.to(this.host.nativeElement, {
      scale: this.appGsapHoverScale,
      duration: 0.45,
      ease: 'power3.out',
    });
    if (this.glare) {
      gsap.to(this.glare, { opacity: 1, duration: 0.3 });
    }
  }

  @HostListener('pointermove', ['$event'])
  onMove(event: PointerEvent): void {
    if (this.reducedMotion || !this.rotateX || !this.rotateY) {
      return;
    }
    const { left, top, width, height } = this.host.nativeElement.getBoundingClientRect();
    const px = (event.clientX - left) / width - 0.5;
    const py = (event.clientY - top) / height - 0.5;

    this.rotateX(-py * this.appGsapHoverTilt * 2);
    this.rotateY(px * this.appGsapHoverTilt * 2);

    if (this.glare) {
      gsap.set(this.glare, {
        background: `radial-gradient(circle at ${(px + 0.5) * 100}% ${
          (py + 0.5) * 100
        }%, rgba(255,255,255,0.35), transparent 55%)`,
      });
    }
  }

  @HostListener('pointerleave')
  onLeave(): void {
    if (this.reducedMotion) {
      return;
    }
    const el = this.host.nativeElement;
    this.timeline?.kill();
    gsap.to(el, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
    });
    if (this.glare) {
      gsap.to(this.glare, { opacity: 0, duration: 0.3 });
    }
  }

  private createGlare(el: HTMLElement): void {
    this.glare = document.createElement('div');
    Object.assign(this.glare.style, {
      position: 'absolute',
      inset: '0',
      borderRadius: 'inherit',
      pointerEvents: 'none',
      opacity: '0',
      mixBlendMode: 'overlay',
      transition: 'opacity 0.3s ease',
    });
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.appendChild(this.glare);
  }

  ngOnDestroy(): void {
    this.timeline?.kill();
    this.glare?.remove();
  }
}
