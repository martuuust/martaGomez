import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { ThemeService } from '../../core/services/theme.service';
import { NAV_LINKS } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  protected readonly links = NAV_LINKS;
  protected readonly themeService = inject(ThemeService);
  protected readonly scrollService = inject(ScrollService);

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);
  readonly activeSection = signal('inicio');

  private readonly destroyRef = inject(DestroyRef);
  private observer?: IntersectionObserver;

  constructor() {
    const onScroll = () => this.scrolled.set(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));

    const onResize = () => {
      if (window.innerWidth >= 1024 && this.menuOpen()) {
        this.menuOpen.set(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('resize', onResize, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('resize', onResize));

    this.setupScrollSpy();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
    document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
  }

  navigate(id: string): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
    this.scrollService.scrollToSection(id);
  }

  private setupScrollSpy(): void {
    const sections = this.links
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible?.target.id) {
          this.activeSection.set(visible.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => this.observer?.observe(section));
    this.destroyRef.onDestroy(() => this.observer?.disconnect());
  }
}
