import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../util/api/api.service';
import { map } from 'rxjs/operators';
import { v4, v5 } from 'uuid';

// Todo: Extract to shared-types
interface Project {
  id: string;
  name: string;
  title: string;
  description: string;
  files: EditorFile[];
  directories?: Directory[];
}

type FileType = 'text/javascript' | 'text/css' | 'text/html' | 'text/plain';

interface EditorFile extends FSElement {
  type: FileType;
  content: string;
}

interface Directory extends FSElement {
  children: number[];
}

interface FSElement {
  id: number;
  name: string;
}


@Injectable({
  providedIn: 'root',
})
export class ProjectExplorerApi extends BaseApiService {
  constructor(http: HttpClient) { super(http); }

  get projects$(): Observable<Project[]> {
    return this.http.get<Project[]>(this.fromApi('projects'))
      .pipe(map(value => value.map(project => {
      project.id = v5(v4(), project.id);
      return project;
    })));
  }
}
