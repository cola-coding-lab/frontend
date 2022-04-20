import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { WorkspaceComponent } from './workspace/workspace.component';
import { WorkshopsComponent } from './welcome/workshops/workshops.component';
import { LessonsWorkspaceComponent } from './lessons-workspace/lessons-workspace.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'workshops', component: WorkshopsComponent },
  // only for testing/development
  { path: 'lessons-testing', component: LessonsWorkspaceComponent }
];


@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
