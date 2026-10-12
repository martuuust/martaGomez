import { Component } from '@angular/core';
import { GsapRevealDirective } from '../../core/directives/gsap-reveal.directive';
import { SKILLS } from '../../shared/data/portfolio.data';
import type { Skill, SkillCategory } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-skills',
  imports: [GsapRevealDirective],
  templateUrl: './skills.html',
})
export class SkillsComponent {
  /**
   * Orden alternado y armónico de todo el stack (23 tecnologías) para que
   * en una sola línea no coincidan tecnologías de la misma categoría consecutivas.
   */
  protected readonly skills: Skill[] = [
    SKILLS.find((s) => s.name === 'Angular')!,
    SKILLS.find((s) => s.name === 'Cursor')!,
    SKILLS.find((s) => s.name === 'JavaScript')!,
    SKILLS.find((s) => s.name === 'Claude')!,
    SKILLS.find((s) => s.name === 'Express')!,
    SKILLS.find((s) => s.name === 'MySQL')!,
    SKILLS.find((s) => s.name === 'Antigravity')!,
    SKILLS.find((s) => s.name === 'PHP')!,
    SKILLS.find((s) => s.name === 'Docker')!,
    SKILLS.find((s) => s.name === 'Stitch AI')!,
    SKILLS.find((s) => s.name === 'Java')!,
    SKILLS.find((s) => s.name === 'MongoDB')!,
    SKILLS.find((s) => s.name === 'OpenAI')!,
    SKILLS.find((s) => s.name === 'HTML5')!,
    SKILLS.find((s) => s.name === 'Dolibarr')!,
    SKILLS.find((s) => s.name === 'Gemini')!,
    SKILLS.find((s) => s.name === 'CSS3')!,
    SKILLS.find((s) => s.name === 'Git')!,
    SKILLS.find((s) => s.name === 'Bootstrap')!,
    SKILLS.find((s) => s.name === 'Google AI Studio')!,
    SKILLS.find((s) => s.name === 'GitLab')!,
    SKILLS.find((s) => s.name === 'Figma')!,
    SKILLS.find((s) => s.name === 'VirtualBox')!,
  ].filter(Boolean);

  protected categoryBadge(cat: SkillCategory): { label: string; class: string } {
    switch (cat) {
      case 'ai':
        return { label: 'IA', class: 'border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-400' };
      case 'languages':
        return { label: 'Lenguaje', class: 'border-amber-400/30 bg-amber-400/10 text-amber-600 dark:text-amber-300' };
      case 'frameworks':
        return { label: 'Framework', class: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-600 dark:text-cyan-300' };
      case 'database':
        return { label: 'BBDD / ERP', class: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-600 dark:text-emerald-300' };
      case 'tools':
        return { label: 'DevOps / Tool', class: 'border-blue-400/30 bg-blue-400/10 text-blue-600 dark:text-blue-300' };
    }
  }

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
