import { Component, Input } from '@angular/core';
import { Project } from '../../project/project';
import { ContainerContentComponent } from '../container/container-content.component';

@Component({
  selector: 'explorer-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
  providers: [{ provide: ContainerContentComponent, useExisting: ProjectComponent }],
})
export class ProjectComponent extends ContainerContentComponent {
  @Input('project') public project!: Project;

  saveProjectChanges() {
    this.updateCollapse.emit(true);
    this.project.save();
  }
}
