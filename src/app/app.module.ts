import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor/editor.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { FlexContainerComponent } from './flex-container/flex-container.component';
import { OutputComponent } from './output/output.component';
import { LogComponent } from './log/log.component';
import { ExplorerComponent } from './explorer/explorer.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuDirective } from './context-menu/context-menu.directive';
import { ExplorerDirectoryComponent } from './explorer-directory/explorer-directory.component';
import { ExplorerAddFileComponent } from './explorer-add-file/explorer-add-file.component';
import { ExplorerAddFileDirective } from './explorer-add-file/explorer-add-file.directive';
import { SortExplorerPipe } from './explorer-directory/sort-explorer.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EditorComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    FlexContainerComponent,
    OutputComponent,
    LogComponent,
    ExplorerComponent,
    ContextMenuComponent,
    ContextMenuDirective,
    ExplorerDirectoryComponent,
    ExplorerAddFileComponent,
    ExplorerAddFileDirective,
    SortExplorerPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
