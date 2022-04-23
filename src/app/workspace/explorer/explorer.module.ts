import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContextMenuModule } from '../../context-menu/context-menu.module';
import { AddFileComponent } from './add-file/add-file.component';
import { AddFileDirective } from './add-file/add-file.directive';
import { ContainerComponent } from './container/container.component';
import { FileComponent } from './file/file.component';
import { ExplorerComponent } from './explorer.component';
import { ProjectComponent } from './project/project.component';
import { SortExplorerPipe } from './sort-explorer.pipe';
import { EditorModule } from '../editor/editor.module';
import { ProjectModalComponent } from './project/project-modal/project-modal.component';
import { ProjectCardComponent } from './project/project-card/project-card.component';
import { ModalModule } from '../../modal/modal.module';


@NgModule({
  declarations: [
    ExplorerComponent,
    SortExplorerPipe,
    FileComponent,
    AddFileDirective,
    AddFileComponent,
    ProjectComponent,
    ContainerComponent,
    ProjectModalComponent,
    ProjectCardComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ContextMenuModule,
    EditorModule,
    ModalModule,
  ],
  exports: [
    ExplorerComponent,
  ],
})
export class ExplorerModule {}
