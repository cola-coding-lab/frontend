import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';

const routes: Routes = [
  { path: '', component: WorkspaceComponent, pathMatch: 'full' },

  /*{ path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'workshops', component: WorkshopsComponent },
  // only for testing/development
  { path: 'lessons-testing', component: LessonsWorkspaceComponent }*/
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
