import { Component, ViewContainerRef } from '@angular/core';
import { ResizeableContainerComponent } from './resizeable-container.component';
import { CurrentProjectService } from '../project/current-project.service';
import { db } from '../../util/db/db';
import { ProjectModalComponent } from './explorer/project/project-modal/project-modal.component';
import { Project } from '../project/project';
import { ThemeSwitchService } from './theme-switch/theme-switch.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: [ './workspace.component.scss' ],
})
export class WorkspaceComponent extends ResizeableContainerComponent {
  private activeProject = localStorage.getItem('ACTIVE_PROJECT') || '';
  private theme;

  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly currentProjectService: CurrentProjectService,
    private readonly themeService: ThemeSwitchService,
  ) {
    super();
    this.theme = themeService.theme;
  }

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
    this.themeService.subscribe(theme => this.theme = theme);
  }

  openProjectModal() {
    ProjectModalComponent.create(this.viewContainerRef);
  }

  themeClass() {
    return [
      `bg-${this.theme}`,
    ];
  }
}

