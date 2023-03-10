import { Component, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { Lesson } from '../welcome/workshops/lesson';
import { v4 } from 'uuid';
import { OpenTabsService } from '../workspace/editor/tab-container/open-tabs.service';
import { EditorFile, MimeType } from '../file/file.model';
import { ResizeableContainerComponent } from '../workspace/resizeable-container.component';
import { db } from '../../util/db/db';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-lessons-workspace',
  templateUrl: './lessons-workspace.component.html',
  styleUrls: [ './lessons-workspace.component.scss' ],
  providers: [ OpenTabsService ],
})
export class LessonsWorkspaceComponent extends ResizeableContainerComponent implements OnDestroy, OnChanges {
  @ViewChild('stepper') public stepper!: MatStepper;
  private mLesson!: Lesson;

  constructor(private openTabsService: OpenTabsService) { super(); }

  public get lesson(): Lesson {
    return this.mLesson;
  }

  @Input()
  public set lesson(current: Lesson) {
    if (this.stepper) {
      this.stepper.selectedIndex = current.currentStep || 0;
    }
    this.mLesson = current;
  }

  ngOnChanges(changes: SimpleChanges): void {
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
        stepsCount: 2,
        steps: [
          {
            id: 'step1',
            title: 'Schritt 01',
            description: `#### Was ist eine Funktion?
Vereinfacht erklärt kannst du dir unter einer Funktion einen wiederverwendbaren Codeblock vorstellen.
...
`,
            isOptional: false,
          },
          {
            id: 'step2',
            title: 'Schritt 02',
            description: `#### Noch mehr Schritte...
hier steht noch viel mehr Sinnvolles
...
`,
            isOptional: true,
          },
        ],
        codeFiles: [
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

    const { codeFiles } = this.lesson;
    if (codeFiles) {
      this.openTabsService.clear();
      codeFiles.forEach(async (file, idx) => {
        file = { ...file, projectId: this.lesson.id, id: idx + 1 } as EditorFile;
        await db.saveFile(file as EditorFile);
        this.openTabsService.add(file as EditorFile);
        if (idx === 0) { this.openTabsService.select(file as EditorFile); }
      });
    }
  }

  ngOnDestroy(): void {
    this.openTabsService.clear();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  previousStep(stepper: MatStepper, lesson: Lesson) {
    stepper.previous();
    lesson.currentStep = stepper.selectedIndex;
  }

  nextStep(stepper: MatStepper, lesson: Lesson) {
    stepper.next();
    lesson.currentStep = stepper.selectedIndex;
  }
}
