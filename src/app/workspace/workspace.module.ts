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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeSwitchComponent } from './theme-switch/theme-switch.component';
import { QrcodeModalComponent } from './export/qrcode-modal/qrcode-modal.component';


@NgModule({
  declarations: [
    FlexContainerComponent,
    LogComponent,
    OutputComponent,
    WorkspaceComponent,
    ExportComponent,
    ThemeSwitchComponent,
    QrcodeModalComponent,
  ],
  imports: [
    CommonModule,
    EditorModule,
    ExplorerModule,
    ModalModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    WorkspaceComponent,
    FlexContainerComponent,
    OutputComponent,
    ExportComponent,
    ThemeSwitchComponent,
  ],
})
export class WorkspaceModule {}
