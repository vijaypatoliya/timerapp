import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'task-update-form',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['./tasks-update.component.css'],
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
export class TasksUpdateComponent implements OnInit {
  updateTaskForm: FormGroup;
  myOptions: INgxMyDpOptions;
  lists: List[] = [];
  @Input() task: Task;
  @Input() list: List;
  @Input() projects: Project[];
  @Input() users: User[];
  @Output() updated: EventEmitter<any> = new EventEmitter();

  constructor(
    private activatedRoute: ActivatedRoute,
    private tasksService: TasksService,
    private toastService: ToastService,
    private usersService: UsersService,
    private listsService: ListsService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    // set form controls initial data
    this.projects = this.projectsService.projects;
    this.lists.push(this.list);

    let date = new Date(this.task.taskDeadline);
    let initDeadline = {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      },
      formatted: moment(date).format("YYYY-MM-DD"),
      jsdate: date
    };

    // datepicker options
    this.myOptions = {
      dateFormat: 'yyyy-mm-dd',
      sunHighlight: true,
      satHighlight: true
    };

    // init reactive form
    this.updateTaskForm = new FormGroup({
      taskName: new FormControl(this.task.taskName, Validators.required),
      taskDescription: new FormControl(this.task.taskDescription, Validators.required),
      taskProject: new FormControl(this.task.taskProject, Validators.required),
      taskList: new FormControl(this.task.taskList, Validators.required),
      taskDeadline: new FormControl(initDeadline, Validators.required),
      taskScored: new FormControl(this.task.taskScored),
      taskDifficulty: new FormControl(this.task.taskDifficulty)
    });
    
    this.onProjectChanges();
  }

  onProjectChanges(): void{
    this.updateTaskForm.get('taskProject').valueChanges.subscribe((value) => {
      this.updateTaskForm.controls.taskList.setValue('');
      if (value) {
        this.listsService.getAll({_id: value}).subscribe(
          (result) => {
            this.lists = result;
          }, 
          (error) => {console.log(error.error.message)});
      }
        this.lists = [this.list];
    });
  }

  updateTask(): void{
    let updateData = this.updateTaskForm.value;
    updateData._id = this.task._id;
    this.tasksService.updateInfo(updateData).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'Task updated! ',
          options: {type: 'success'}
        });
        this.task = result;
        this.updateTaskForm.reset();
        this.updated.emit({formStatus: false, newTask: this.task});
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
