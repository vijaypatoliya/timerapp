import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjecteditComponent } from '../project-edit/project-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ProjectResolve } from '../project/project.resolve';
import { ProjectsResolve } from '../projects/projects.resolve';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    data: {title: 'Projects', access: ['admin', 'manager']},
    canActivate: [CanActivateAuthGuard]
    // resolve: {
    //   projects: ProjectsResolve
    // }
  },
  { path: ':id',
    component: ProjecteditComponent,
    data: {title: 'Edit Project', access: ['admin', 'manager']},
    canActivate: [CanActivateAuthGuard],
    resolve: {
      project: ProjectResolve
    },
    children: [
      { path: '', redirectTo: 'stats' },
      { path: 'lists', loadChildren: '../lists/lists.module#ListsModule' },
      { path: 'stats', loadChildren: '../stats/stats.module#StatsModule'}
    ]
  }
];
@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ProjectsRoutingModule { }