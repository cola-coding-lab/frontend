import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { EditorFile } from '../file/file.model';
import { Project } from './project';
import { projectMock } from './project.data';

@Injectable({
  providedIn: 'root',
})
export class CurrentProjectService {
  private currentProject$: Subject<Project>; // TODO: Create new Interface for projects that contain 'files'
  private currentProject: Project = projectMock;

  constructor() {
    this.currentProject$ = new BehaviorSubject<Project>(this.currentProject);
  }

  public subscribe(next: (value: Project) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.currentProject$.subscribe(next, error, complete);
  }

  public update(files: EditorFile[]): void {
    this.currentProject.files = files;
    this.currentProject$.next(this.currentProject);
  }

  public save(): void {
    this.currentProject.save();
  }
}
