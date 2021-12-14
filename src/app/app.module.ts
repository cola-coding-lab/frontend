import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { EditorComponent } from './editor/editor.component';
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
    EditorComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    FlexContainerComponent,
    OutputComponent,
    LogComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ExplorerModule,
    ContextMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
