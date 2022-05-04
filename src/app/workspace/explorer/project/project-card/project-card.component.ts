import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../../project/project.model';
import { CurrentProjectService } from '../../../../project/current-project.service';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: [ './project-card.component.scss' ],
})
export class ProjectCardComponent {
  @Input() projects?: IProject[];
  @Input() title!: string;
  @Input() buttonText = 'Erstellen';
  @Input() removeAble = false;

  @Output() selected = new EventEmitter<IProject>();

  constructor(
    // private projectService: ProjectService,
    // private storageService: StorageService,
    private currentProjectService: CurrentProjectService,
  ) { }

  public emitProject(project: IProject): void {
    this.selected.emit(project);
  }

  public removeProject(project: IProject): void {
    // TODO: (re) implement me
    /*this.projects = this.projects?.filter(p => p !== project);
    let stored = this.storageService.getObject(ProjectService.PROJECTS_KEY) as string[];
    if (stored) {
      stored = stored.filter(p => p !== project.name);
      stored.length > 0
        ? this.storageService.save(ProjectService.PROJECTS_KEY, stored)
        : this.storageService.remove(ProjectService.PROJECTS_KEY);
    }
    if (this.projectService.activeProject?.name === project.name) {
      this.projectService.activeProject = undefined;
    }*/
  }
}

