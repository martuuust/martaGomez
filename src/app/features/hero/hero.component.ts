import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { gsap } from 'gsap';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { ScrollService } from '../../core/services/scroll.service';
import { PERSON } from '../../shared/data/portfolio.data';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: string;
  alpha: number;
}

class ParticleField {
  private readonly particles: Particle[] = [];
  private animationId = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly destroyRef: DestroyRef,
  ) {
    this.start();
  }

  private start(): void {
    const ctx = this.canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { clientWidth, clientHeight } = this.canvas;
      this.canvas.width = clientWidth * dpr;
      this.canvas.height = clientHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this.seed(clientWidth, clientHeight);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(this.canvas);
    this.destroyRef.onDestroy(() => resizeObserver.disconnect());

    if (reduced) {
      this.draw(ctx);
      return;
    }

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animate(ctx);
        } else {
          cancelAnimationFrame(this.animationId);
        }
      },
      { threshold: 0.05 },
    );
    visibility.observe(this.canvas);
    this.destroyRef.onDestroy(() => visibility.disconnect());
  }

  private seed(width: number, height: number): void {
    this.particles.length = 0;
    const count = Math.min(120, Math.floor((width * height) / 9000));
    for (let i = 0; i < count; i++) {
      const isCream = Math.random() > 0.6;
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 2 + 0.6,
        hue: isCream ? '252, 250, 199' : '168, 85, 247',
        alpha: Math.random() * 0.55 + 0.2,
      });
    }
  }

  private animate(ctx: CanvasRenderingContext2D): void {
    const { clientWidth, clientHeight } = this.canvas;
    ctx.clearRect(0, 0, clientWidth, clientHeight);

    for (const p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > clientWidth) p.vx *= -1;
      if (p.y < 0 || p.y > clientHeight) p.vy *= -1;
    }

    for (let i = 0; i < this.particles.length; i++) {
      const a = this.particles[i];
      for (let j = i + 1; j < this.particles.length; j++) {
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - dist / 120) * 0.14})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${a.hue}, ${a.alpha})`;
      ctx.beginPath();
      ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
      ctx.fill();
    }

    this.animationId = requestAnimationFrame(() => this.animate(ctx));
  }

  private draw(ctx: CanvasRenderingContext2D): void {
    for (const p of this.particles) {
      ctx.fillStyle = `rgba(${p.hue}, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

@Component({
  selector: 'app-hero',
  imports: [GsapHoverDirective],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent implements AfterViewInit {
  protected readonly person = PERSON;
  protected readonly scrollService = inject(ScrollService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('particles');
  private readonly headline = viewChild<ElementRef<HTMLHeadingElement>>('headline');

  ngAfterViewInit(): void {
    this.setupParticles();
    this.setupEntrance();
  }

  private setupParticles(): void {
    const canvas = this.canvas()?.nativeElement;
    if (canvas) {
      new ParticleField(canvas, this.destroyRef);
    }
  }

  private setupEntrance(): void {
    this.splitWords(this.headline()?.nativeElement);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.hero-word', { opacity: 0, yPercent: 110, duration: 0.8, stagger: 0.08 }, 0.15)
        .from('.hero-role', { opacity: 0, y: 16, duration: 0.55 }, 0.55)
        .from('.hero-sub', { opacity: 0, y: 20, duration: 0.6 }, 0.7)
        .from('.hero-cta', { opacity: 0, y: 20, duration: 0.5, stagger: 0.08 }, 0.9);
    }, this.host.nativeElement);

    this.destroyRef.onDestroy(() => context.revert());
  }

  private splitWords(el: HTMLElement | undefined): void {
    if (!el) {
      return;
    }
    const words = el.textContent?.trim().split(/\s+/) ?? [];
    el.innerHTML = '';
    for (const word of words) {
      const wrap = document.createElement('span');
      wrap.style.display = 'inline-block';
      wrap.style.overflow = 'hidden';
      wrap.style.verticalAlign = 'bottom';
      const inner = document.createElement('span');
      inner.className = 'hero-word';
      inner.textContent = word;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      el.appendChild(document.createTextNode('\u00A0'));
    }
  }
}
