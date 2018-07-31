import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { Task } from '../../models/task.model';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'task-history',
  templateUrl: './tasks-history.component.html',
  styleUrls: ['./tasks-history.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset: 0 }),
          style({ opacity: '0.5', transform: 'translateY(25px)', offset: 0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset: 1 })
        ])),
      )
    ])
  ]
})
export class TasksHistoryComponent implements OnInit {
  loader: boolean;
  @Input() task: Task;
  history = [];

  constructor(
    private tasksService: TasksService,
    private toastService: ToastService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.loader = true;
    this.tasksService.getTaskHistory({_id: this.task._id}).subscribe((result) => {
        this.history = result;
        this.translateIds();
        console.log(this.history);
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error ? error.error.message : error,
          options: {type: 'error'}
        });
      },
      () => {
        this.loader = false;
      }
    );
  }

  translateIds(): void {
    if (this.history.length > 0) {
      let length = this.history.length;
      for (let i=0; i<length; i++) {
        if (this.history[i].historyAction == 'assigned task' || this.history[i].historyAction == 'added task') {
          this.history[i].historyChange = this.usersService.mappedResults[this.history[i].historyChange].userName;
        }
      }
    }
  }

}
