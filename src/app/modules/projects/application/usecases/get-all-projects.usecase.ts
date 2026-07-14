import { Observable } from 'rxjs';
import { Project } from '../../domain/models/project.model';
import { ProjectRepository } from '../../domain/repository/project.repository';

export class GetAllProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(): Observable<Project[]> {
    return this.projectRepository.getAll();
  }
}
