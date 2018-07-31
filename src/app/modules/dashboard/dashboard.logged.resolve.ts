import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { UsersService } from '../../shared/services/users/users.service';
import { ToastService } from '../../shared/services/toast/toast.service';

@Injectable()
export class LoggedResolve implements Resolve<any> {
  checkLoggedData: string;
  constructor(
    private usersService: UsersService,
    private toastService: ToastService,
    private router: Router,
  ) {}
  
  resolve(route: ActivatedRouteSnapshot) {
    return this.usersService.checkLogged().catch(
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
        this.router.navigate(['login']);
        return Observable.of(null);
      });
  }
}