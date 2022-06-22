import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace/workspace.component';
import { PwaOverviewComponent } from './workspace/pwa-overview/pwa-overview.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkshopsComponent } from './welcome/workshops/workshops.component';
import { LessonsWorkspaceComponent } from './lessons-workspace/lessons-workspace.component';
import { environment } from '../environments/environment';
import { WorkshopComponent } from './vcl/workshop/workshop.component';

const routes: Routes = environment.isEditor ? [
    { path: '', component: WorkspaceComponent, pathMatch: 'full' },
    { path: 'pwas', component: PwaOverviewComponent },
  ]
  : [
    { path: '', redirectTo: '/welcome', pathMatch: 'full' },
    { path: 'welcome', component: WelcomeComponent },
    { path: 'workspace', component: WorkspaceComponent },
    { path: 'workshops', component: WorkshopsComponent },
    {
      path: 'workshops/:id',
      component: WorkshopComponent,
    },
    // only for testing/development
    { path: 'lessons-testing', component: LessonsWorkspaceComponent },
  ];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}
