import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ProjectRepository } from '../../domain/repository/project.repository';
import { Project } from '../../domain/models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectSupabaseRepository implements ProjectRepository {
  private supabase: SupabaseClient;

  constructor() {
    // Configurar cliente de Supabase usando variables de entorno o valores dummy temporales
    const supabaseUrl = (window as any).env?.SUPABASE_URL || 'https://placeholder-url.supabase.co';
    const supabaseKey = (window as any).env?.SUPABASE_KEY || 'placeholder-key';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  getAll(): Observable<Project[]> {
    const promise = this.supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    return from(promise).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return (data || []).map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          imageUrl: item.image_url || '',
          tags: item.tags || [],
          projectUrl: item.project_url,
          githubUrl: item.github_url,
          createdAt: new Date(item.created_at)
        }));
      })
    );
  }

  getById(id: string): Observable<Project> {
    const promise = this.supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    return from(promise).pipe(
      map(({ data, error }) => {
        if (error) throw new Error(error.message);
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          imageUrl: data.image_url || '',
          tags: data.tags || [],
          projectUrl: data.project_url,
          githubUrl: data.github_url,
          createdAt: new Date(data.created_at)
        };
      })
    );
  }
}
