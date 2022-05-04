import { Injectable } from '@angular/core';
import { ReplaySubject, Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { IProject } from '../../../project/project.model';
import { Project } from '../../../project/project';
import { StorageService } from '../../../storage/storage.service';
import { checkForActiveFile } from '../../../../util/file';
import { IExplorerEntry } from '../explorer.model';
import { ProjectExplorerApi } from './project-explorer-api.service';
import { EditorFile } from '../../../file/file.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  public static readonly PROJECTS_KEY = 'AvailableProjects';
  private static readonly ACTIVE_KEY = 'ActiveProject';
  private readonly activeSubject: Subject<IProject | undefined>;

  private active?: IProject;

  constructor(
    private apiService: ProjectExplorerApi,
    private storageService: StorageService,
  ) {
    const activeProjectInStorage = this.storageService.get(ProjectService.ACTIVE_KEY);
    this.activeSubject = new ReplaySubject(1);
    if (activeProjectInStorage) {
      const activeProject = this.storageService.get(activeProjectInStorage);
      if (activeProject) {
        try {
          this.activeProject = Project.fromJson(JSON.parse(activeProject));
        } catch (e) {
          console.error('error parsing storage', e);
          this.activeProject = undefined;
        }
      }
    }
  }

  public get activeProject(): IProject | undefined {
    return this.active;
  }

  public set activeProject(active: IProject | undefined) {
    this.active = active;
    if (this.active) {
      this.active.files = checkForActiveFile(this.active.files);
      this.storageService.save(ProjectService.ACTIVE_KEY, this.active.name);
      const stored = this.storageService.getObject(ProjectService.PROJECTS_KEY) as string[] || [];
      stored.push(this.active.name);
      this.storageService.save(ProjectService.PROJECTS_KEY, [ ...new Set(stored) ]);
    } else {
      this.storageService.remove(ProjectService.ACTIVE_KEY);
    }
    this.activeSubject.next(this.active);
  }

  public subscribeActive(
    next: (value?: IProject) => void,
    error?: (error: any) => void,
    complete?: () => void,
  ): Subscription {
    return this.activeSubject.subscribe(next, error, complete);
  }

  public subscribeAvailable(
    next: (value: IAvailableProjects) => void,
    error?: (error: any) => void,
    complete?: () => void,
  ): Subscription {
    return this.apiService.getExplorer()
      .pipe(map(value => {
        const projects = {
          templates: [ Project.fromEmpty() ],
          stored: [] as IProject[],
        };
        for (const dir of value['project-explorer'].files) {
          // only add templates, that have a description
          if ('description' in value[dir]) {
            projects.templates.push(new Project(
              {
                name: (value[dir] as IExplorerEntry).description?.name || dir,
                title: (value[dir] as IExplorerEntry).description?.title || dir,
                description: (value[dir] as IExplorerEntry).description?.description || dir,
                files: value[dir].files as EditorFile[],
                // (value[dir] as IExplorerEntry).description?.files || undefined,
              },
            ));
          }
        }

        const storedProjects = this.storageService.getObject(ProjectService.PROJECTS_KEY) as string[];
        if (storedProjects && storedProjects.length > 0) {
          for (const key of storedProjects) {
            const project = this.storageService.getObject(key);
            if (project) { projects.stored.push(Project.fromJson(project)); }
          }
        }

        return projects;
      }))
      .subscribe(next, error, complete);
  }
}

export interface IAvailableProjects {
  templates: IProject[];
  stored: IProject[];
}
