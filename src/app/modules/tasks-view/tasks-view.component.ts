import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { List } from '../../models/list.model';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { UsersService } from '../../shared/services/users/users.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { User } from '../../models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.css']
})
export class TasksViewComponent implements OnInit {
  task: Task;
  list: any;
  users: User[];
  updateState: boolean = false;
  assignState: boolean = false;
  historyState: boolean = false;
  remaining: any; 
  hours: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private projectsService: ProjectsService,
    private listsService: ListsService,
    private usersService: UsersService,
    private tasksService: TasksService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.users = this.usersService.users;
    this.activatedRoute.data
      .map((result) => { return result.task })
      .subscribe((result) => {
        this.task = result;
        this.list = {_id: this.task.taskList, listName: this.task.taskListName};
        this.translateIds();
      });
  }

  setClass(status) {
    let classes = {};
    classes[status] = true;
    return classes;
  }

  updateStartedPaused(): void {
    this.tasksService.updateStartedPaused(this.task).subscribe(
      (result) => {
        this.task = result;
        this.tasksService.updateListView(this.task, true);
        this.translateIds();
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: { type: 'error' }
        });
      }
    );
  }

  markAsDone(): void {
    this.tasksService.markAsDone(this.task).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'Task done!',
          options: { type: 'success' }
        });
        this.tasksService.removeFromList(result);
        this.router.navigate(['/main/tasks']);
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: { type: 'error' }
        });
      }
    ); 
  }

  taskUpdated(event): void{
    this.updateState = event.formStatus;
    this.task = event.newTask;
    this.tasksService.updateListView(this.task, true);
    this.translateIds();
  }

  taskAssigned(event): void{
    this.assignState = event.formStatus;
  }

  translateIds(): void {
    this.task.taskProjectName = this.projectsService.mappedResults[this.task.taskProject].projectName;
    this.task.taskListName = this.listsService.mappedResults[this.task.taskList].listName;
    this.task.createdByName = this.usersService.mappedResults[this.task.createdBy].userName;
    this.task.taskModifiedByName = this.usersService.mappedResults[this.task.taskModifiedBy].userName;
    this.hours = moment.duration(moment(new Date()).diff(moment(this.task.taskDeadline))).asHours();
    let mins = moment.utc(moment(moment(this.task.taskDeadline), "HH:mm:ss").diff(moment(moment(new Date()), "HH:mm:ss"))).format("mm");
    this.remaining = `${Math.abs(Math.trunc(this.hours))}:${mins}`;
  }

}
