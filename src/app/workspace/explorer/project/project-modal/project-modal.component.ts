import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProject, Project } from '../../../../project/project';
import { v4 } from 'uuid';
import { ModalComponent } from '../../../../modal/modal.component';
import { ProjectExplorerApiService } from '../../../project-explorer-api.service';
import { db } from '../../../../../util/db/db';
import { EditorFile } from '../../../../file/file.model';
import { OpenTabsService } from '../../../editor/tab-container/open-tabs.service';
import { CurrentProjectService } from '../../../../project/current-project.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: [ './project-modal.component.scss' ],
})
export class ProjectModalComponent implements OnInit, OnDestroy {
  @Output() public selected = new EventEmitter<IProject>();
  @Output() public removed = new EventEmitter<IProject>();
  @Output() public closed = new EventEmitter<void>();
  public storedProjects!: IProject[];
  public apiProjects?: IProject[];
  private afterInit = new BehaviorSubject(false);
  private activeProject = localStorage.getItem('ACTIVE_PROJECT') || '';
  private modalElement!: ModalComponent;

  constructor(
    private readonly openTabsService: OpenTabsService,
    private readonly projectExplorerApiService: ProjectExplorerApiService,
    private readonly currentProjectService: CurrentProjectService,
  ) { }

  public get modal() {
    return this.modalElement;
  }

  @ViewChild('modal', { static: false }) set modal(modal: ModalComponent) {
    modal.closed.subscribe(_ => this.closed.emit());
    this.modalElement = modal;
  }

  public static create(vcr: ViewContainerRef): ProjectModalComponent {
    const component = vcr.createComponent(ProjectModalComponent);
    component.instance.closed.subscribe(_ => {
      component?.destroy();
    });
    component.instance.open();
    return component.instance;
  }

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
        this.apiProjects = [ Project.fromEmpty(), ...projects.map(project => {
          return {
            ...project, files: project.files.map<EditorFile>(file => {
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
        }),
        ];
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
    this.openTabsService.clear();
    this.updateActiveProject(project);
    this.close();
  }

  public removeProject(project: IProject): void {
    db.deleteProject(project).then(_ => this.ngOnInit());
    if (this.activeProject === project.id) {
      this.updateActiveProject(undefined);
      this.modal.open();
    }
  }

  public open(): void {
    this.afterInit.subscribe(isInit => {
      if (isInit) { this.modal?.open(); }
    });
    this.ngOnInit();
  }

  public close(): void {
    this.modal?.close();
    this.closed.emit();
  }

  private updateActiveProject(project?: IProject): void {
    this.activeProject = project?.id || '';
    localStorage.setItem('ACTIVE_PROJECT', this.activeProject);
    this.currentProjectService.activeProject = project ? new Project(project) : undefined;
    this.currentProjectService.save();
  }
}
