import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { MainResolve } from '../main/main.resolve';

const routes: Routes = [
  {
    path: '', 
    component: MainComponent,
    data: {title: 'Main', access: ['admin','manager','user']},
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule'},
      { path: 'projects', loadChildren: '../projects/projects.module#ProjectsModule'},
      { path: 'tasks', loadChildren: '../tasks/tasks.module#TasksModule'}
    ],
    canActivate: [CanActivateAuthGuard],
    pathMatch: 'prefix',
    resolve: {
      workmeter: MainResolve 
    }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class MainRoutingModule { }