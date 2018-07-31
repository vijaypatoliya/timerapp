import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';
import { trigger, state, animate, style, transition, keyframes, query, stagger, group } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';

interface logDetails {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('explainerAnim', [
      transition('* => *',[
          query('.explanation', style({opacity: 0, transform: 'translateX(-40px)'})),
          query('.explanation', stagger('300ms',[
            animate('800ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
          ]))
      ])
    ]),
    trigger('explainerAnim2', [
      transition('* => *',[
        query('.explanation2', style({opacity: 0, transform: 'translateX(-40px)'})),
        query('.explanation2', stagger('300ms',[
          animate('800ms 600ms ease-out', style({opacity: 1, transform: 'translateX(0)'}))
        ]))
      ])
    ]),
  ]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private toastService: ToastService, 
    private usersService: UsersService, 
    private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(){
    this.usersService.loginUser(this.loginForm.value).subscribe(
      (result)=>{
        this.toastService.toastTrigger({
          message: 'Welcome ' + result.userName,
          options: {type: 'success'}
        });
        this.router.navigate(['main']);
      },
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

}
