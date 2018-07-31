import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';;
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'task-assign-form',
  templateUrl: './tasks-assign.component.html',
  styleUrls: ['./tasks-assign.component.css'],
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
export class TasksAssignComponent implements OnInit {
  assignTaskForm: FormGroup;
  @Input() task: Task;
  @Input() users: User[];
  @Output() assigned: EventEmitter<any> = new EventEmitter();
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tasksService: TasksService,
    private toastService: ToastService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
        // init reactive form
        this.assignTaskForm = new FormGroup({
          assignTo: new FormControl(this.task.taskAssignedTo, Validators.required),
          assignStatus: new FormControl(null, Validators.required),
          assignComment: new FormControl('')
        });
  }

  assignTask(): void{
    let updateData = this.assignTaskForm.value;
    updateData._id = this.task._id;
    updateData.assingStarted = this.task.taskStarted;
    updateData.assignCreated = new Date().getTime();
    this.tasksService.assignTask(updateData).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'Task assigned! ',
          options: {type: 'success'}
        });
        this.task = result;
        this.assignTaskForm.reset();
        this.assigned.emit({formStatus: false, newTask: this.task});
        this.router.navigate(['/main/tasks']);
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

}
