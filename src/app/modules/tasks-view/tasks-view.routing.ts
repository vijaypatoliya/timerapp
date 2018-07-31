import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { TasksViewComponent } from './tasks-view.component';
import { TaskResolve } from '../tasks/task.resolve';

const routes: Routes = [
    {
        path: '',
        component: TasksViewComponent,
        data: { title: 'Task', access: ['admin', 'manager', 'user'] },
        resolve: {
          task: TaskResolve
        }
      }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class TasksViewRoutingModule { }