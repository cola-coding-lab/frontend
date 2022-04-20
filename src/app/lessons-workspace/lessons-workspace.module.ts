import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonsWorkspaceComponent } from './lessons-workspace.component';
import { WorkspaceModule } from '../workspace/workspace.module';


@NgModule({
  declarations: [
    LessonsWorkspaceComponent
  ],
  imports: [
    CommonModule,
    WorkspaceModule
  ]
})
export class LessonsWorkspaceModule {
}
