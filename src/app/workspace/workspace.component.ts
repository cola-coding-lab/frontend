import { Component, ViewChild } from '@angular/core';
import { ResizeableContainerComponent } from './resizeable-container.component';
import { CurrentProjectService } from '../project/current-project.service';
import { db } from '../../util/db/db';
import { Project, IProject } from '../project/project';
import { ProjectModalComponent } from './explorer/project/project-modal/project-modal.component';
import { OpenTabsService } from './editor/tab-container/open-tabs.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: [ './workspace.component.scss' ],
})
export class WorkspaceComponent extends ResizeableContainerComponent {
  @ViewChild('modal', { static: true }) public modal!: ProjectModalComponent;

  private activeProject = localStorage.getItem('ACTIVE_PROJECT') || '';

  constructor(
    private readonly currentProjectService: CurrentProjectService,
    private readonly openTabsService: OpenTabsService,
  ) { super(); }

  public get projectSelected(): boolean {
    return !!this.currentProjectService.activeProject;
  }

  ngOnInit(): void {
    super.ngOnInit();
    db.getStoredProjects().then(projects => {
      const project = projects.find(project => project.id === this.activeProject);
      if (project) {
        this.currentProjectService.activeProject = new Project(project);
        this.modal.close();
      } else {
        this.modal.open();
      }
    });
  }

  public setProject(project: IProject): void {
    this.openTabsService.clear();
    this.updateActiveProject(project);
  }

  public removeProject(project: IProject): void {
    if (this.activeProject === project.id) {
      this.updateActiveProject(undefined);
      this.modal.open();
    }
  }

  private updateActiveProject(project?: IProject): void {
    this.activeProject = project?.id || '';
    localStorage.setItem('ACTIVE_PROJECT', this.activeProject);
    this.currentProjectService.activeProject = project ? new Project(project) : undefined;
    this.currentProjectService.save();
  }
}

