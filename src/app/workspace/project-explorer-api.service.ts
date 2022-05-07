import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../util/api/api.service';
import { map } from 'rxjs/operators';
import { v4, v5 } from 'uuid';
import { Directory, EditorFile } from '../file/file.model';
import { IPwaData } from './export/export.model';

// Todo: Extract to shared-types
interface ProjectResponse {
  id: string;
  name: string;
  title: string;
  description: string;
  files: EditorFile[];
  directories?: Directory[];
}


@Injectable({
  providedIn: 'root',
})
export class ProjectExplorerApiService extends BaseApiService {
  constructor(http: HttpClient) { super(http); }

  get projects$(): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(this.fromApi('projects'))
      .pipe(map(value => value.map(project => {
        project.id = v5(v4(), project.id);
        return project;
      })));
  }

  public get p5js$(): Observable<{ script: string }> {
    return this.http.get<{ script: string }>(`${this.base}assets/iframe/p5.min.json`);
  }

  public postPWA$(data: IPwaData): Observable<any> {
    return this.http.post<any>(`${this.uri}pwa`, data);
  }

  public getPWAZip$(zipFileName: string): Observable<Blob> {
    return this.http.get(`${this.uri}pwa/${zipFileName}`, {
      responseType: 'blob',
    });
  }
}
