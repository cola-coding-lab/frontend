import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { TabContainerComponent } from './editor/tab-container/tab-container.component';
import { EditorModule } from './editor/editor.module';
import { ExplorerModule } from './explorer/explorer.module';
import { FlexContainerComponent } from './flex-container/flex-container.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogComponent } from './log/log.component';
import { MainComponent } from './main/main.component';
import { OutputComponent } from './output/output.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    FlexContainerComponent,
    OutputComponent,
    LogComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    EditorModule,
    ExplorerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
