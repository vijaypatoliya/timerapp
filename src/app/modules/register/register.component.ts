import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, animate, style, transition, query, stagger } from '@angular/animations';
import { ValidationService } from '../../shared/services/validation/validation.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { UsersService } from '../../shared/services/users/users.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
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
          animate('800ms 1.5s ease-out', style({opacity: 1, transform: 'translateX(0)'}))
        ]))
      ])
    ])
  ]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  user: User = {
    firstName: '',
    lastName: '',
    userName: '',
    emailAddress: '',
    invitationCode: '77777',
    password: ''
  };

  constructor(
    private validationService: ValidationService,
    private toastService: ToastService,
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName,Validators.required),
      userName: new FormControl(this.user.userName,Validators.required),
      emailAddress: new FormControl(this.user.emailAddress,[
        Validators.required,
        Validators.email
      ]),
      invitationCode: new FormControl(this.user.invitationCode,Validators.required),
      password: new FormControl(this.user.password,[
        Validators.required,
        Validators.minLength(8),
        this.validationService.passwordValidator
      ])
    });
  }

  onSubmit(){
    this.usersService.addUser(this.registerForm.value).subscribe(
      (result)=>{
        this.toastService.toastTrigger({
          message: 'User registered!',
          options: {type: 'success'}
        });
        this.router.navigate(['login']);
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
