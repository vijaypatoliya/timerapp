import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksViewComponent } from './tasks-view.component';
import { TasksViewRoutingModule } from './tasks-view.routing';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TaskResolve } from '../tasks/task.resolve';
import { TasksUpdateComponent } from '../tasks-update/tasks-update.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from '../comments/comments.component';
import { CommentsService } from '../../shared/services/comments/comments.service';
import { TasksAssignComponent } from '../tasks-assign/tasks-assign.component';
import { TasksHistoryComponent } from '../tasks-history/tasks-history.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TasksViewRoutingModule,
    NgxMyDatePickerModule.forRoot()
  ],
  declarations: [TasksViewComponent, TasksUpdateComponent, CommentsComponent, TasksAssignComponent, TasksHistoryComponent],
  providers: [TaskResolve, CommentsService]
})
export class TasksViewModule { }
