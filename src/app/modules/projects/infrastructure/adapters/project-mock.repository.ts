import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { ProjectRepository } from "../../domain/repository/project.repository";
import { Project } from "../../domain/models/project.model";

@Injectable({
  providedIn: "root"
})
export class ProjectMockRepository implements ProjectRepository {
  private mockProjects: Project[] = [
    {
      id: "1",
      title: "Portfolio Moderno",
      description: "Mi sitio web personal diseñado con arquitectura hexagonal, Angular 21 y colores pastel.",
      imageUrl: "assets/portfolio.png",
      tags: ["Angular 21", "TypeScript", "CSS"],
      githubUrl: "https://github.com/martuuust/martaGomez",
      createdAt: new Date("2026-07-01")
    },
    {
      id: "2",
      title: "Terminal Interactiva",
      description: "Un mini-emulador de consola de comandos retro para explorar mi experiencia en modo comando.",
      imageUrl: "assets/terminal.png",
      tags: ["Angular", "Retro", "TypeScript"],
      createdAt: new Date("2026-07-10")
    }
  ];

  getAll(): Observable<Project[]> {
    return of(this.mockProjects);
  }

  getById(id: string): Observable<Project> {
    const project = this.mockProjects.find(p => p.id === id);
    if (!project) {
      throw new Error(`Proyecto con ID ${id} no encontrado.`);
    }
    return of(project);
  }
}
