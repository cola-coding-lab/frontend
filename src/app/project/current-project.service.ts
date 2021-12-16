import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { EditorFile } from '../file/file.model';
import { projectMock } from './project.data';

@Injectable({
  providedIn: 'root',
})
export class CurrentProjectService {
  private currentProject$: Subject<EditorFile[]>; // TODO: Create new Interface for projects that contain 'files'
  private currentProject: EditorFile[] = projectMock;

  constructor() {
    this.currentProject$ = new BehaviorSubject<EditorFile[]>(this.currentProject);
  }

  public subscribe(next: (value: EditorFile[]) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.currentProject$.subscribe(next, error, complete);
  }

  public update(files: EditorFile[]): void {
    this.currentProject = files;
    this.currentProject$.next(this.currentProject);
  }
}
