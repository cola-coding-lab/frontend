import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OpenTabsService } from './tab-container/open-tabs.service';
import { TabContainerComponent } from './tab-container/tab-container.component';
import { EditorComponent } from './editor.component';


@NgModule({
  declarations: [
    EditorComponent,
    TabContainerComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TabContainerComponent,
  ],

})
export class EditorModule {}
