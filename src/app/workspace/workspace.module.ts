import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorModule } from './editor/editor.module';
import { ExplorerModule } from './explorer/explorer.module';
import { LogComponent } from './log/log.component';
import { OutputComponent } from './output/output.component';
import { FlexContainerComponent } from './flex-container/flex-container.component';
import { WorkspaceComponent } from './workspace.component';
import { ExportComponent } from './export/export.component';
import { ModalModule } from '../modal/modal.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FlexContainerComponent,
    LogComponent,
    OutputComponent,
    WorkspaceComponent,
    ExportComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    ExplorerModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  exports: [
    WorkspaceComponent,
    FlexContainerComponent,
    OutputComponent,
    ExportComponent,
  ],
})
export class WorkspaceModule {}
