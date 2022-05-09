import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WorkspaceModule } from './workspace/workspace.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkshopsComponent } from './welcome/workshops/workshops.component';
import { HttpClientModule } from '@angular/common/http';
import { LessonsWorkspaceModule } from './lessons-workspace/lessons-workspace.module';
import { ExplorerModule } from './workspace/explorer/explorer.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    WorkshopsComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    FormsModule,
    WorkspaceModule,
    AppRoutingModule,
    HttpClientModule,
    LessonsWorkspaceModule,
    ExplorerModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
