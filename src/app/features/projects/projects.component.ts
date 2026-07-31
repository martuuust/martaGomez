import {
  Component,
  computed,
  DestroyRef,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { PROJECTS } from '../../shared/data/portfolio.data';
import type { Project, ProjectCategory } from '../../shared/models/portfolio.model';

export type ProjectFilter = ProjectCategory | 'all';

@Component({
  selector: 'app-projects',
  imports: [GsapHoverDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;

  readonly activeFilter = signal<ProjectFilter>('all');

  protected readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') {
      return this.projects;
    }
    return this.projects.filter((project) => project.category === filter);
  });

  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly modalVisible = computed(() => this.selectedProject() !== null);

  protected readonly filters: { id: ProjectFilter; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Web' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'uiux', label: 'UI/UX' },
    { id: 'ia', label: 'IA' },
  ];

  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => this.clearModal());
  }

  openProject(project: Project): void {
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  closeProject(): void {
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('window:keydown.escape')
  protected onEscape(): void {
    if (this.modalVisible()) {
      this.closeProject();
    }
  }

  private clearModal(): void {
    document.body.style.overflow = '';
  }

  protected filterLabel(category: ProjectCategory): string {
    switch (category) {
      case 'web':
        return 'Web';
      case 'mobile':
        return 'Mobile';
      case 'uiux':
        return 'UI/UX';
      case 'ia':
        return 'IA';
    }
  }
}
