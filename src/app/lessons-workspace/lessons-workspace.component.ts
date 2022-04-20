import { Component, Input } from '@angular/core';
import { Lesson } from '../welcome/workshops/lesson';
import { WorkspaceComponent } from '../workspace/workspace.component';
import { v4 } from 'uuid';

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
    // only for debugging/development!
    if (!this.lesson) {
      this.lesson = {
        id: v4(),
        title: 'first lesson',
        description: `here will be the markdown/html description`,
        descriptionImages: [],
        type: '',
        steps: [],
        stepsImages: [],
        hint: '',
      };
    }
  }
}
