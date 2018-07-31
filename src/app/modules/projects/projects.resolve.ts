import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Project } from '../../models/project.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Injectable()
export class ProjectsResolve implements Resolve<any>{

  constructor(
    private projectsService: ProjectsService, 
    private toastService: ToastService,
    private router: Router    
  ){ }

  resolve(route: ActivatedRouteSnapshot){ 
    return this.projectsService.getAll().catch(
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
        this.router.navigate(['/main/dashboard']);
        return Observable.of(null);
      });
  }

}