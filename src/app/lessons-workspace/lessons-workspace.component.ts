import { Component, Input, OnDestroy } from '@angular/core';
import { Lesson } from '../welcome/workshops/lesson';
import { v4 } from 'uuid';
import { OpenTabsService } from '../workspace/editor/tab-container/open-tabs.service';
import { EditorFile, MimeType } from '../file/file.model';
import { ResizeableContainerComponent } from '../workspace/resizeable-container.component';

@Component({
  selector: 'app-lessons-workspace',
  templateUrl: './lessons-workspace.component.html',
  styleUrls: [ './lessons-workspace.component.scss' ],
  providers: [ OpenTabsService ],
})
export class LessonsWorkspaceComponent extends ResizeableContainerComponent implements OnDestroy {
  @Input() lesson!: Lesson;

  constructor(private openTabsService: OpenTabsService) { super(); }

  ngOnDestroy(): void {
    this.openTabsService.clear();
  }

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
        code: [
          {
            name: 'main.js',
            type: MimeType.js,
            content: '',
          },
          {
            name: 'other.js',
            type: MimeType.js,
            content: 'console.log("hello");',
          },
        ],
        hint: 'ein Hinweis',
      };
    }

    const { code } = this.lesson;
    code.forEach((file, idx) => {
      this.openTabsService.add(file as EditorFile);
      if (idx === 0) { this.openTabsService.select(file as EditorFile);}
    });
  }

}
