import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsWorkspaceComponent } from './lessons-workspace.component';
import { WorkspaceModule } from '../workspace/workspace.module';
import { Md2htmlPipe } from './md2html.pipe';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditorModule } from '../workspace/editor/editor.module';


@NgModule({
  declarations: [
    LessonsWorkspaceComponent,
    Md2htmlPipe,
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    WorkspaceModule,
    MatStepperModule,
    MatIconModule,
    MatButtonModule,
    EditorModule,
  ],
  exports: [
    LessonsWorkspaceComponent,
  ],
})
export class LessonsWorkspaceModule {
}
