import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProject } from '../../../../project/project';

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
  @Output() removed = new EventEmitter<IProject>();

  constructor() { }

  public emitProject(project: IProject): void {
    this.selected.emit(project);
  }

  public removeProject(project: IProject): void {
    this.removed.emit(project);
  }
}

