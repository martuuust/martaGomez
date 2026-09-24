import {
  afterNextRender,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GsapHoverDirective } from '../../core/directives/gsap-hover.directive';
import { PROJECTS } from '../../shared/data/portfolio.data';
import type { Project } from '../../shared/models/portfolio.model';

@Component({
  selector: 'app-projects',
  imports: [GsapHoverDirective],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  host: {
    '(document:keydown.escape)': 'onEscape()',
  },
})
export class ProjectsComponent {
  protected readonly projects = PROJECTS;

  protected readonly selectedProject = signal<Project | null>(null);

  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = viewChild<ElementRef<HTMLElement>>('projectDialog');
  private lastFocus: HTMLElement | null = null;
  private focusTrapHandler?: (event: KeyboardEvent) => void;

  constructor() {
    this.destroyRef.onDestroy(() => this.clearModal());
    afterNextRender(() => ScrollTrigger.refresh());
  }

  openProject(project: Project, event?: Event): void {
    this.lastFocus =
      (event?.currentTarget as HTMLElement | null) ??
      (document.activeElement as HTMLElement | null);
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      const dialog = this.dialog()?.nativeElement;
      if (!dialog) {
        return;
      }
      const focusable = this.getFocusable(dialog);
      (focusable[0] ?? dialog).focus();
      this.focusTrapHandler = (e: KeyboardEvent) => this.trapFocus(e, dialog);
      dialog.addEventListener('keydown', this.focusTrapHandler);
      ScrollTrigger.refresh();
    });
  }

  closeProject(): void {
    this.clearModal();
    this.selectedProject.set(null);
    this.lastFocus?.focus();
    this.lastFocus = null;
    ScrollTrigger.refresh();
  }

  protected onEscape(): void {
    if (this.selectedProject()) {
      this.closeProject();
    }
  }

  private clearModal(): void {
    const dialog = this.dialog()?.nativeElement;
    if (dialog && this.focusTrapHandler) {
      dialog.removeEventListener('keydown', this.focusTrapHandler);
    }
    this.focusTrapHandler = undefined;
    document.body.style.overflow = '';
  }

  private getFocusable(root: HTMLElement): HTMLElement[] {
    return Array.from(
      root.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      ),
    ).filter((el) => !el.hasAttribute('disabled') && el.tabIndex !== -1);
  }

  private trapFocus(event: KeyboardEvent, dialog: HTMLElement): void {
    if (event.key !== 'Tab') {
      return;
    }
    const focusable = this.getFocusable(dialog);
    if (focusable.length === 0) {
      event.preventDefault();
      dialog.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement | null;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
