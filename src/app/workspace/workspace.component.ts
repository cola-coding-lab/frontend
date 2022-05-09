import { Component, ViewContainerRef } from '@angular/core';
import { ResizeableContainerComponent } from './resizeable-container.component';
import { CurrentProjectService } from '../project/current-project.service';
import { db } from '../../util/db/db';
import { ProjectModalComponent } from './explorer/project/project-modal/project-modal.component';
import { Project } from '../project/project';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: [ './workspace.component.scss' ],
})
export class WorkspaceComponent extends ResizeableContainerComponent {
  private activeProject = localStorage.getItem('ACTIVE_PROJECT') || '';

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly currentProjectService: CurrentProjectService,
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
      } else {
        this.openProjectModal();
      }
    });
  }

  openProjectModal() {
    ProjectModalComponent.create(this.viewContainerRef);
  }
}

