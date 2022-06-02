import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { EditorComponent } from './editor.component';
import { ControlsComponent } from './controls/controls.component';


@NgModule({
  declarations: [
    EditorComponent,
    TabContainerComponent,
    ControlsComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TabContainerComponent,
    ControlsComponent,
  ],
})
export class EditorModule {}
