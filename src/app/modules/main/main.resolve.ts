import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Project } from '../../models/project.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UsersService } from '../../shared/services/users/users.service';
import { WorkmeterService } from '../../shared/services/workmeter/workmeter.service';

@Injectable()
export class MainResolve implements Resolve<any>{

  constructor(
    private usersService: UsersService, 
    private workmeterService: WorkmeterService,
    private toastService: ToastService   
  ){ }

  resolve(route: ActivatedRouteSnapshot){
    return this.workmeterService.totalTime({userId: this.usersService.logged._id}).catch(
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
        return Observable.of(null);
      });
  }

}