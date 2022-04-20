import { Component, Input } from '@angular/core';
import { Lesson } from '../welcome/workshops/lesson';
import { WorkspaceComponent } from '../workspace/workspace.component';

@Component({
  selector: 'app-lessons-workspace',
  templateUrl: './lessons-workspace.component.html',
  styleUrls: [ './lessons-workspace.component.scss' ],
})
export class LessonsWorkspaceComponent extends WorkspaceComponent {
  @Input() lesson!: Lesson;

  constructor() { super(); }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
