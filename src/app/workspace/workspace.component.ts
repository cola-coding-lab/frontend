import { Component } from '@angular/core';
import { ResizeableContainerComponent } from './resizeable-container.component';
import { CurrentProjectService } from '../project/current-project.service';
import { db } from '../../util/db/db';
import { IProject } from '../project/project.model';
import { Project } from '../project/project';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: [ './workspace.component.scss' ],
})
export class WorkspaceComponent extends ResizeableContainerComponent {
  private activeProject = localStorage.getItem('ACTIVE_PROJECT') || '';

  constructor(
    private readonly currentProjectService: CurrentProjectService,
  ) { super(); }

  public get projectSelected(): boolean {
    return !!this.currentProjectService.activeProject;
  }

  ngOnInit(): void {
    super.ngOnInit();
    console.log(this.activeProject);
    db.foo().then(projects => {
      const project = projects.find(project => project.name === this.activeProject);
      if (project) { this.currentProjectService.activeProject = new Project(project); }
    });
  }

  setProject($event: IProject) {
    this.currentProjectService.activeProject = new Project($event);
    this.activeProject = $event.name;
    localStorage.setItem('ACTIVE_PROJECT', this.activeProject);
    db.projects.put({
      name: $event.name,
      title: $event.title,
      description: $event.description,
      showHidden: $event.showHidden || false,
    });
    db.files.bulkAdd($event.files.map(file => {
      return {
        name: file.name,
        type: file.type,
        content: file.content || '',
        projectName: $event.name,
        isOpen: file.isOpen || false,
      };
    }));
  }
}

