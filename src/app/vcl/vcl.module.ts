import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopComponent } from './workshop/workshop.component';
import { LessonsWorkspaceModule } from '../lessons-workspace/lessons-workspace.module';


@NgModule({
  declarations: [
    WorkshopComponent,
  ],
  imports: [
    CommonModule,
    LessonsWorkspaceModule,
  ],
  exports: [
    WorkshopComponent,
  ],
})
export class VclModule {}
