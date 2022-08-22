import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopComponent } from './workshop/workshop.component';
import { LessonsWorkspaceModule } from '../lessons-workspace/lessons-workspace.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    WorkshopComponent,
  ],
  imports: [
    CommonModule,
    LessonsWorkspaceModule,
    MatButtonModule,
  ],
  exports: [
    WorkshopComponent,
  ],
})
export class VclModule {}
