import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppModule } from '../app.module';
import { ContextMenuDirective } from '../context-menu/context-menu.directive';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { DirectoryComponent } from './directory/directory.component';
import { AddFileComponent } from './add-file/add-file.component';
import { AddFileDirective } from './add-file/add-file.directive';
import { ExplorerComponent } from './explorer.component';
import { SortExplorerPipe } from './sort-explorer.pipe';


@NgModule({
  declarations: [
    ExplorerComponent,
    SortExplorerPipe,
    DirectoryComponent,
    AddFileDirective,
    AddFileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule
  ],
  exports: [
    ExplorerComponent,
  ],
})
export class ExplorerModule {}
