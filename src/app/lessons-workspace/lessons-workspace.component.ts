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
        description: `## Lektion 01
Lass uns gleich loslegen.
In dieser Lektion lernst du, wie du mit Hilfe der JavaScript Bibliothek p5.js das Spielfeld erstellst.
...
![testbild](https://picsum.photos/300/200)
        `,
        type: '',
        steps: [
          {
            label: 'Schritt 01',
            description: `#### Was ist eine Funktion?
Vereinfacht erklärt kannst du dir unter einer Funktion einen wiederverwendbaren Codeblock vorstellen.
...
`,
            isOptional: false,
          },
          {
            label: 'Schritt 02',
            description: `#### Noch mehr Schritte...
hier steht noch viel mehr Sinnvolles
...
`,
            isOptional: true,
          },
        ],
        hint: 'ein Hinweis',
      };
    }
  }

}
