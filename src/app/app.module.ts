import { Injector, NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { LessonsWorkspaceModule } from './lessons-workspace/lessons-workspace.module';
import { ExplorerModule } from './workspace/explorer/explorer.module';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../environments/environment';
import { VclModule } from './vcl/vcl.module';
import { ProfilePageComponent } from './profile-page/profile-page.component';


export let AppInjector: Injector;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    WorkshopsComponent,
    ProfilePageComponent,
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    FormsModule,
    WorkspaceModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    LessonsWorkspaceModule,
    ExplorerModule,
    VclModule,
  ],
  providers: [ { provide: APP_BASE_HREF, useValue: environment.baseHref } ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
  constructor(private injector: Injector) {
    AppInjector = this.injector;
  }
}
