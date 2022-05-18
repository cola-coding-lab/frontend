import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { PwaOverviewComponent } from './workspace/pwa-overview/pwa-overview.component';

const routes: Routes = [
  { path: '', component: WorkspaceComponent, pathMatch: 'full' },
  { path: 'pwas', component: PwaOverviewComponent },

  /*{ path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'workshops', component: WorkshopsComponent },
  // only for testing/development
  { path: 'lessons-testing', component: LessonsWorkspaceComponent }*/
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
