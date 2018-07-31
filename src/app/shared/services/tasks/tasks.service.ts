import { Injectable } from '@angular/core';
import { Task } from '../../../models/task.model';
import { User } from '../../../models/user.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsersService } from '../users/users.service';
import { Socket } from 'ng-socket-io';
import { Subject } from 'rxjs/Subject';
import { WorkmeterService } from '../workmeter/workmeter.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TasksService {
  apiPath: string = '/api/tasks';
  apiPathHistory: string = '/api/history';
  tasks: Task[] = [];
  task: Task;
  newTasksSubscription;
  assignTaskSubscription;

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private socket: Socket,
    private workmeterService: WorkmeterService
  ) { }

  addTask(task: Task): Observable<Task> {
    return this.http.post(this.apiPath + '/add', task, httpOptions).map((result: Task) => {
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  startGetTasks(): Observable<Task> {
    return this.socket.fromEvent("tasks").map((result: Task) => {
      return result;
    });
  }

  getAssignedTasks(): Observable<Task> {
    return this.socket.fromEvent("assign").map((result: Task) => {
      return result;
    });
  }

  stopGetTasks(): void {
    this.newTasksSubscription.unsubscribe();
  }

  stopGetAssignedTasks(): void {
    this.assignTaskSubscription.unsubscribe();
  }

  getAll(user: User): Observable<Task[]> {
    return this.http.post(this.apiPath + '/all', user, httpOptions).map((result: Task[]) => {
      this.tasks = result;
      return;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error)
    });
  }

  getOne(params): Observable<Task> {
    return this.http.post(this.apiPath + '/one', params, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  updateStartedPaused(task: Task): Observable<Task> {
    return this.http.put(this.apiPath + '/updateStatus', task, httpOptions).map((result: any) => {
      this.task = result.startedTask;
      if (this.task.taskStarted) {
        this.workmeterService.preventCount();
        this.workmeterService.startCount(this.workmeterService.worked);
      } else {
        this.workmeterService.preventCount();
      }
      return result.startedTask;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  markAsDone(task: Task): Observable<Task> {
    return this.http.put(this.apiPath + '/done', task, httpOptions).map((result: any) => {
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  // update task status in tasks list
  updateListView(task: Task, pause): void {
    let length = this.tasks.length;
    for (let i = 0; i < length; i++) {
      if (this.tasks[i].taskStatus == 'started' && pause) {
        this.tasks[i].taskStarted = false;
        this.tasks[i].taskStatus = 'paused';
      }
      if (task._id == this.tasks[i]._id) {
        this.tasks[i] = task;
      }
    }
  }

  updateInfo(task: Task): Observable<Task> {
    return this.http.put(this.apiPath + '/updateInfo', task, httpOptions).map((result: Task) => {
      this.task = result;
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    })
  }

  assignTask(task: Task): Observable<Task> {
    return this.http.put(this.apiPath + '/assignTask', task, httpOptions).map((result: Task) => {
      this.removeFromList(task);
      return result;
    }).catch((error: HttpErrorResponse) => {
      return Observable.throw(error);
    });
  }

  removeFromList(task): void {
      // remove current task from the list
      let length = this.tasks.length;
      for (let i = 0; i < length; i++) {
        if (task._id == this.tasks[i]._id) {
          this.tasks.splice(i, 1);
          break;
        }
      }
  }

  getTaskHistory(params): Observable<any[]> {
    return this.http.post(this.apiPathHistory + '/allForOne', params, httpOptions).map((results: any[]) => {
      return results;
    })
      .catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      });
  }

  // deleteOne(params): Observable<Task>{
  //   return this.http.post(this.apiPath + '/delete', params).map((result) => {
  //     return result;
  //   }).catch((error: HttpErrorResponse) => {
  //     return Observable.throw(error);
  //   });
  // }

}
