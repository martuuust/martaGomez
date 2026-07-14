import { Observable } from 'rxjs';
import { Project } from '../models/project.model';

export interface ProjectRepository {
  getAll(): Observable<Project[]>;
  getById(id: string): Observable<Project>;
}
