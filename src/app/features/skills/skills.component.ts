import { Component } from '@angular/core';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { SKILLS } from '../../shared/data/portfolio.data';
import type { Skill, SkillCategory } from '../../shared/models/portfolio.model';

interface SkillSection {
  id: SkillCategory;
  title: string;
  description: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [GsapHoverDirective, GsapRevealDirective],
  templateUrl: './skills.html',
})
export class SkillsComponent {
  protected readonly sections: SkillSection[] = [
    {
      id: 'ai',
      title: 'Inteligencia Artificial',
      description: 'Asistentes de código, modelos fundacionales y herramientas de diseño generativo.',
      skills: SKILLS.filter((s) => s.category === 'ai'),
    },
    {
      id: 'languages',
      title: 'Lenguajes',
      description: 'Bases sólidas para lógica de negocio, tipado y maquetación web.',
      skills: SKILLS.filter((s) => s.category === 'languages'),
    },
    {
      id: 'frameworks',
      title: 'Frameworks y Librerías',
      description: 'Ecosistemas para el desarrollo de interfaces y servicios web modernos.',
      skills: SKILLS.filter((s) => s.category === 'frameworks'),
    },
    {
      id: 'database',
      title: 'Bases de Datos y ERP',
      description: 'Almacenamiento relacional, NoSQL y gestión empresarial.',
      skills: SKILLS.filter((s) => s.category === 'database'),
    },
    {
      id: 'tools',
      title: 'Herramientas y DevOps',
      description: 'Control de versiones, contenedores, virtualización y diseño de interfaces.',
      skills: SKILLS.filter((s) => s.category === 'tools'),
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
