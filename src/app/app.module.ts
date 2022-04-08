import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbdModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ContextMenuModule } from './context-menu/context-menu.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { WorkspaceModule } from './workspace/workspace.module';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkshopsComponent } from './welcome/workshops/workshops.component';

//collapse function
// import { NgbdDropdown } from './dropdown-basic';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    WorkshopsComponent,
    // NgbdModule
  ],
  imports: [
    BrowserModule,
    ContextMenuModule,
    FormsModule,
    WorkspaceModule,
    AppRoutingModule,
    // NgbdModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
