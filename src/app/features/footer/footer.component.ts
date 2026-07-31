import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';
import { PERSON } from '../../shared/data/portfolio.data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  protected readonly person = PERSON;
  protected readonly scrollService = inject(ScrollService);

  protected readonly year = new Date().getFullYear();
  protected readonly showTop = signal(false);

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const onScroll = () => this.showTop.set(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    this.destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
  }
}
