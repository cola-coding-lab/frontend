import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from '../context-menu/context-menu.module';
import { AddFileComponent } from './add-file/add-file.component';
import { AddFileDirective } from './add-file/add-file.directive';
import { DirectoryComponent } from './directory/directory.component';
import { ExplorerComponent } from './explorer.component';
import { ProjectComponent } from './project/project.component';
import { SortExplorerPipe } from './sort-explorer.pipe';


@NgModule({
  declarations: [
    ExplorerComponent,
    SortExplorerPipe,
    DirectoryComponent,
    AddFileDirective,
    AddFileComponent,
    ProjectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule,
  ],
  exports: [
    ExplorerComponent,
  ],
})
export class ExplorerModule {}
