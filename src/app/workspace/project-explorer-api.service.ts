import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../util/api/api.service';

// Todo: Extract to shared-types
interface Project {
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
    return this.http.get<Project[]>(this.fromApi('projects'));
  }
}
