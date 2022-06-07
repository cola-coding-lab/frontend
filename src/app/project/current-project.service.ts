import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { EditorFile } from '../file/file.model';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class CurrentProjectService {
  private currentProject$: Subject<Project>; // TODO: Create new Interface for projects that contain 'files'
  private currentProject?: Project;

  constructor() {
    this.currentProject$ = new ReplaySubject<Project>(1);
  }

  public get activeProject(): Project | undefined {
    return this.currentProject;
  }

  public set activeProject(project: Project | undefined) {
    if (this.currentProject?.id !== project?.id) {
      this.currentProject = project;
      if (this.currentProject) {
        this.currentProject$.next(this.currentProject);
      }
    }
  }

  public subscribe(next: (value: Project) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.currentProject$.subscribe(next, error, complete);
  }

  public update(files: EditorFile[]): void {
    if (this.currentProject) {
      this.currentProject.files = files;
      this.currentProject$.next(this.currentProject);
    }
  }

  public save(): void {
    this.currentProject?.save();
  }
}
