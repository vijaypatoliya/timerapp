import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { ToastService, ToastMessage } from '../../services/toast/toast.service';
import { Subscription } from 'rxjs/Subscription';
import { setTimeout, clearTimeout } from 'timers';
import { Time } from '@angular/common/src/i18n/locale_data_api';

enum ToastState {
  HIDDEN = 'HIDDEN',
  VISIBLE = 'VISIBLE'
}

@Component({
  selector: 'toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset:0 }),
          style({ opacity: '0.5', transform: 'translateY(15px)', offset:0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset:1 })
        ])),
      ),
      transition(":leave", 
      animate('.2s ease-out', keyframes([
        style({ opacity: '1', transform: 'translateX(25%)', offset:0 }),
        style({ opacity: '0.3', transform: 'translateX(50%)', offset:0.5 }),
        style({ opacity: '0', transform: 'translateX(70%)', offset:1 })
      ]))
      )
    ]),
  ]
})
export class ToastComponent implements OnInit, OnDestroy {
  toasts: Array<ToastMessage> = [];
  subscription: Subscription;
  state: ToastState = ToastState.HIDDEN;
  timeoutHandle: any;
  toastPosition: any;

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.subscription = this.toastService.currentToast$.subscribe(data => {
      clearTimeout(this.timeoutHandle);

      // push new toast into list and make it visible
      this.toasts.push(data);
      this.state = ToastState.VISIBLE;
      this.toastPosition = data.position;
      
      // will remove all toasts created
      setTimeout(() => {
        this.toasts.shift();
      },data.timeout);

      // will hide toasts as they were created 
      this.timeoutHandle = setTimeout(() => {
        this.state = ToastState.HIDDEN;
      },data.timeout);

    });
  }

  ngOnDestroy() {
    console.log('destroy toast');
    this.subscription.unsubscribe();
  }
}
