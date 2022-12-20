import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopComponent } from './workshop/workshop.component';
import { LessonsWorkspaceModule } from '../lessons-workspace/lessons-workspace.module';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

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
