import { Injectable, OnDestroy } from '@angular/core';
import { EditorFile } from '../file/file.model';
import { ProjectService } from '../workspace/explorer/project/project.service';
import { StorageService } from '../storage/storage.service';
import { Subscription } from 'rxjs';
import { BaseFileService } from '../../util/base-file.service';
import { Project } from './project';

@Injectable({
  providedIn: 'root',
})
export class ProjectFileService extends BaseFileService implements OnDestroy {
  private project?: Project;
  private projectsSubscription?: Subscription;

  constructor(
    private projectService: ProjectService,
    storageService: StorageService,
  ) {
    super(storageService);
    this.projectsSubscription = this.projectService.subscribeActive(
      value => {
        if (value) {
          this.project = Project.fromJson(value);
          console.log(this.project);
          if (this.project) {
            this.projectsSubscription?.unsubscribe();
            this.projectsSubscription = undefined;
          }
          this.update(value?.files || []);
        }
      },
    );
  }

  ngOnDestroy(): void {
    this.projectsSubscription?.unsubscribe();
  }

  public update(files: EditorFile[]): void {
    if (this.project) {
      this.project.files = files;
      this.project.save();
    }
  }

  public save(file: EditorFile): void {
    if (this.project) {
      this.project.save();
    }
  }

  public allStoredFiles(): EditorFile[] {
    return this.project?.files || [];
  }
}
