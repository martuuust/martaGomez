import { Component } from '@angular/core';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { SKILLS } from '../../shared/data/portfolio.data';
import type { Skill, SkillGroup } from '../../shared/models/portfolio.model';

interface SkillSection {
  id: SkillGroup;
  title: string;
  description: string;
  skills: Skill[];
  compact: boolean;
}

@Component({
  selector: 'app-skills',
  imports: [GsapHoverDirective, GsapRevealDirective],
  templateUrl: './skills.html',
})
export class SkillsComponent {
  protected readonly sections: SkillSection[] = [
    {
      id: 'daily',
      title: 'Uso a diario',
      description: 'Stack del día a día en el trabajo.',
      skills: SKILLS.filter((s) => s.group === 'daily'),
      compact: false,
    },
    {
      id: 'worked',
      title: 'He trabajado con',
      description: 'Formación FP y proyectos en GitHub.',
      skills: SKILLS.filter((s) => s.group === 'worked'),
      compact: false,
    },
    {
      id: 'exploring',
      title: 'Explorando',
      description: 'Herramientas con las que he practicado o experimentado.',
      skills: SKILLS.filter((s) => s.group === 'exploring'),
      compact: false,
    },
    {
      id: 'ai',
      title: 'IA aplicada',
      description: 'Apoyo al desarrollo; no sustituyen el criterio técnico.',
      skills: SKILLS.filter((s) => s.group === 'ai'),
      compact: true,
    },
  ];

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
