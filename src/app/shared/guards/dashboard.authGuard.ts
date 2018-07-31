import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UsersService } from '../services/users/users.service';
import { ToastService } from '../services/toast/toast.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CanActivateAuthGuard implements CanActivate {
    constructor(private usersService: UsersService,
                private toastService: ToastService,
                private router: Router
            ) {}

            canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot) {

                // get access property from route data
                let access = next.data.access;

                // check if user is logged in
                return this.usersService.checkLogged().map(checkedUser => {

                    // check if user type is allowed on this route
                    let result = access.indexOf(checkedUser.userType) > -1 ? true : false;
                    if (!result) {
                        this.toastService.toastTrigger({
                            message: 'Not allowed!',
                            options: {type: 'error'}
                          });
                        this.router.navigate(['/main/dashboard']);
                    }
                    return result;
                }).catch(error => {
                    this.toastService.toastTrigger({
                        message: error.error.message,
                        options: {type: 'error'}
                      });
                    this.router.navigate(['/login']);
                    return Observable.of(false);
                });
            }  
}