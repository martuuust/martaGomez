import {
  Component,
  computed,
  linkedSignal,
  signal,
} from '@angular/core';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { SKILLS } from '../../shared/data/portfolio.data';
import type { SkillCategory } from '../../shared/models/portfolio.model';

export type SkillFilter = SkillCategory | 'all';

@Component({
  selector: 'app-skills',
  imports: [GsapHoverDirective, GsapRevealDirective],
  templateUrl: './skills.html',
})
export class SkillsComponent {
  private readonly skillsSource = signal(SKILLS);

  protected readonly skills = this.skillsSource.asReadonly();

  protected readonly activeCategory = linkedSignal({
    source: this.skillsSource,
    computation: () => 'all' as SkillFilter,
  });

  protected readonly filteredSkills = computed(() => {
    const category = this.activeCategory();
    const all = this.skills();
    if (category === 'all') {
      return all;
    }
    return all.filter((skill) => skill.category === category);
  });

  protected readonly counts = computed(() => {
    const all = this.skills();
    return {
      all: all.length,
      frontend: all.filter((s) => s.category === 'frontend').length,
      backend: all.filter((s) => s.category === 'backend').length,
      tools: all.filter((s) => s.category === 'tools').length,
      ai: all.filter((s) => s.category === 'ai').length,
    };
  });

  protected readonly filters: { id: SkillFilter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
    { id: 'ai', label: 'IA' },
  ];

  /** Evita iconos negros/oscuros ilegibles sobre fondo dark. */
  protected iconColor(hex: string): string {
    const r = Number.parseInt(hex.slice(0, 2), 16);
    const g = Number.parseInt(hex.slice(2, 4), 16);
    const b = Number.parseInt(hex.slice(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    if (luminance < 0.45) {
      return `color-mix(in srgb, #${hex} 40%, white)`;
    }
    return `#${hex}`;
  }
}
