import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProject } from '../../../../project/project.model';
import { Project } from '../../../../project/project';
import { v4 } from 'uuid';
import { ModalComponent } from '../../../../modal/modal.component';
import { ProjectExplorerApi } from '../../../project-explorer-api.service';
import { db } from '../../../../../util/db/db';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: [ './project-modal.component.scss' ],
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  @ViewChild('modal', { static: false }) modal!: ModalComponent;
  @Output() public selected = new EventEmitter<IProject>();
  @Output() public removed = new EventEmitter<IProject>();
  public storedProjects!: IProject[];
  public apiProjects?: IProject[];
  private afterInit = new BehaviorSubject(false);

  constructor(
    private readonly projectExplorerApiService: ProjectExplorerApi,
  ) { }

  ngOnDestroy(): void {
    this.afterInit.unsubscribe();
  }

  ngOnInit(): void {
    db.getStoredProjects().then((projects) => {
      this.storedProjects = projects;
      this.afterInit.next(true);
    });
    this.projectExplorerApiService.projects$.subscribe(
      projects => {
        this.apiProjects = projects.map(project => {
          return {
            ...project, files: project.files.map(file => {
              return {
                ...file,
                projectId: project.id,
                isOpen: false,
              };
            }),
            directories: project.directories?.map(dir => {
              return {
                ...dir,
                projectId: project.id,
              };
            }),
          };
        });
        this.afterInit.next(true);
      },
    );
  }

  public createProject(project: IProject, create = false): void {
    if (create) {
      project = Project.fromJson(JSON.stringify(project));
      project.name = v4();
      project.files.forEach(file => {
        if (file.name.match(/index|main/i)) {
          file.isOpen = true;
        }
      });
    }
    this.selected.emit(project);
    this.modal?.close();
  }

  public removeProject($event: IProject): void {
    db.deleteProject($event).then(_ => this.ngOnInit());
    this.removed.emit($event);
  }

  public open(): void {
    this.afterInit.subscribe(isInit => {
      if (isInit) { this.modal?.open(); }
    });
    this.ngOnInit();
  }

  public close(): void {
    this.modal?.close();
  }
}
