import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, state, transition, query, stagger } from '@angular/animations';
import { UsersService } from '../../shared/services/users/users.service';
import { WorkmeterService } from '../../shared/services/workmeter/workmeter.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('0.3s ease-out')),
      transition('out => in', animate('0.3s ease-out'))
    ]),
  ]
})
export class MainComponent implements OnInit {
  menuState:string = 'out';
  seconds: number;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private workmeterService: WorkmeterService,
    private toastService: ToastService) {
  }

  ngOnInit() {
    this.activatedRoute.data
    .map((result) => {return result.workmeter})
    .subscribe((result) => {
      this.seconds = result;
    });
  }

  receiveStatus($event) {
    this.menuState = $event;
  }
}
