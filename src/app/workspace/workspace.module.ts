import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditorModule } from './editor/editor.module';
import { ExplorerModule } from './explorer/explorer.module';
import { LogComponent } from './log/log.component';
import { OutputComponent } from './output/output.component';
import { FlexContainerComponent } from './flex-container/flex-container.component';
import { WorkspaceComponent } from './workspace.component';


@NgModule({
  declarations: [
    FlexContainerComponent,
    LogComponent,
    OutputComponent,
    WorkspaceComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    ExplorerModule,
  ],
  exports: [
    WorkspaceComponent,
    FlexContainerComponent,
    OutputComponent,
  ],
})
export class WorkspaceModule {}
