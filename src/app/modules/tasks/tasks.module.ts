import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { TasksComponent } from './tasks.component';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { TasksRoutingModule } from './tasks.routing';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ProjectsResolve } from '../projects/projects.resolve';
import { ListsResolve } from '../lists/lists.resolve';
import { UsersResolve } from '../users/users.resolve';
import { TasksViewComponent } from '../tasks-view/tasks-view.component';
import { TaskResolve } from './task.resolve';
import { TasksUpdateComponent } from '../tasks-update/tasks-update.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [TasksComponent],
  providers: [
    CanActivateAuthGuard,
    TasksService,
    TaskResolve,
    ProjectsResolve,
    ListsResolve,
    UsersResolve
  ]
})
export class TasksModule { }
