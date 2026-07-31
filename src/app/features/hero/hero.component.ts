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
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { ScrollService } from '../../core/services/scroll.service';
import { HERO_ROLES, PERSON } from '../../shared/data/portfolio.data';

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
    const count = Math.min(70, Math.floor((width * height) / 16000));
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.5 ? '139, 92, 246' : '34, 211, 238',
        alpha: Math.random() * 0.5 + 0.2,
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
        if (dist < 130) {
          ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 130) * 0.12})`;
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
  protected readonly roles = HERO_ROLES;
  protected readonly scrollService = inject(ScrollService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('particles');
  private readonly headlineA = viewChild<ElementRef<HTMLHeadingElement>>('headlineA');
  private readonly headlineB = viewChild<ElementRef<HTMLHeadingElement>>('headlineB');
  private readonly roleLine = viewChild<ElementRef<HTMLSpanElement>>('roleLine');

  protected readonly roleIndex = signal(0);
  private roleTimer?: ReturnType<typeof setInterval>;

  ngAfterViewInit(): void {
    this.setupParticles();
    this.setupEntrance();
    this.setupRoleRotator();
  }

  private setupParticles(): void {
    const canvas = this.canvas()?.nativeElement;
    if (canvas) {
      new ParticleField(canvas, this.destroyRef);
    }
  }

  private setupEntrance(): void {
    this.splitWords(this.headlineA()?.nativeElement);
    this.splitWords(this.headlineB()?.nativeElement, true);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.hero-badge', { opacity: 0, y: 24, duration: 0.6 }, 0.1)
        .from('.hero-word', { opacity: 0, yPercent: 110, duration: 0.8, stagger: 0.08 }, 0.3)
        .from('.hero-role-line', { opacity: 0, y: 16, duration: 0.6 }, 0.75)
        .from('.hero-sub', { opacity: 0, y: 24, duration: 0.7 }, 0.9)
        .from('.hero-cta', { opacity: 0, y: 24, duration: 0.6, stagger: 0.1 }, 1.05)
        .from('.hero-scroll', { opacity: 0, duration: 0.6 }, 1.35);
    });

    this.destroyRef.onDestroy(() => context.revert());
  }

  private setupRoleRotator(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.roleTimer = setInterval(() => {
      const el = this.roleLine()?.nativeElement;
      if (!el) {
        return;
      }
      gsap.to(el, {
        opacity: 0,
        y: -12,
        duration: 0.3,
        onComplete: () => {
          this.roleIndex.update((index) => (index + 1) % this.roles.length);
          gsap.fromTo(
            el,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' },
          );
        },
      });
    }, 3000);
    this.destroyRef.onDestroy(() => clearInterval(this.roleTimer));
  }

  private splitWords(el: HTMLElement | undefined, gradient = false): void {
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
      inner.className = gradient ? 'hero-word hero-word-gradient' : 'hero-word';
      inner.textContent = word;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      el.appendChild(document.createTextNode('\u00A0'));
    }
  }
}
