import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
export class ProjectModalComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('modal', { static: false }) modal!: ModalComponent;
  @Output() public onProjectSelected = new EventEmitter<IProject>();
  public storedProjects!: IProject[];
  public apiProjects?: IProject[];
  private afterInit = new BehaviorSubject(false);

  constructor(
    private readonly projectExplorerApiService: ProjectExplorerApi,
  ) { }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    db.foo().then((projects) => {
      this.storedProjects = projects;
      this.afterInit.next(true);
      this.open();
    });
    this.projectExplorerApiService.projects$.subscribe(
      projects => {
        this.apiProjects = projects.map(project => {
          return {
            ...project, files: project.files.map(file => {
              return {
                ...file,
                projectName: project.name,
                isOpen: false,
              };
            }),
          };
        });
        this.afterInit.next(true);
        this.open();
      },
    );
  }

  ngAfterViewInit(): void {
  }

  public createProject(project: IProject, create = false): void {
    console.log(project);
    if (create) {
      project = Project.fromJson(JSON.stringify(project));
      project.name = v4();
      project.files.forEach(file => {
        if (file.name.match(/index|main/i)) {
          file.isOpen = true;
        }
      });
    }
    this.onProjectSelected.emit(project);
    this.modal?.close();
  }

  public open(): void {
    this.afterInit.subscribe(isInit => {
      if (isInit) { this.modal?.open(); }
    });
  }
}
