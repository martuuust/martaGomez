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
  styleUrl: './skills.css',
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
    };
  });

  protected readonly filters: { id: SkillFilter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'tools', label: 'Tools' },
  ];

  protected readonly started = signal(false);

  constructor() {
    requestAnimationFrame(() => requestAnimationFrame(() => this.started.set(true)));
  }
}
