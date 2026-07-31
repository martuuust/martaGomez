import { computed, effect, Injectable, signal } from '@angular/core';
import type { Theme } from '../../shared/models/portfolio.model';

const STORAGE_KEY = 'portfolio-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly theme = signal<Theme>(this.readInitialTheme());

  readonly current = this.theme.asReadonly();
  readonly isDark = computed(() => this.theme() === 'dark');
  readonly isLight = computed(() => this.theme() === 'light');

  constructor() {
    effect(() => {
      const theme = this.theme();
      const root = document.documentElement;
      root.classList.toggle('dark', theme === 'dark');
      root.style.colorScheme = theme;
      localStorage.setItem(STORAGE_KEY, theme);
    });
  }

  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
  }

  private readInitialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return 'dark';
  }
}
