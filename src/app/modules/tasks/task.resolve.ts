import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { TasksService } from "../../shared/services/tasks/tasks.service";
import { ToastService } from "../../shared/services/toast/toast.service";

@Injectable()
export class TaskResolve implements Resolve<any>{

    constructor(
        private tasksService: TasksService,
        private toastService: ToastService,
        private router: Router    
      ){ }

      resolve(route: ActivatedRouteSnapshot){
        return this.tasksService.getOne(route.params)
        .catch(error => {
            this.toastService.toastTrigger({
              message: error.error.message,
              options: {type: 'error'}
            });
          this.router.navigate(['/main/tasks']);
          return Observable.of(null);
        });    
      }

}