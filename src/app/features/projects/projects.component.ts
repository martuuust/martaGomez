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
import type { Project } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-projects',
  imports: [GsapHoverDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;

  protected readonly selectedProject = signal<Project | null>(null);
  protected readonly modalVisible = computed(() => this.selectedProject() !== null);

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
}
