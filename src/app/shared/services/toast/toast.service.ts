import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

// toast optional settings
interface ToastMessageOptions {
  type?: string,
  timeout?: number
}

// toast object overwrites default settings with options
export class ToastMessage implements ToastMessageOptions {
  public type: string = 'info';
  public timeout: number = 3000;
  public position: string = 'top';

  constructor(public message: string, private options: ToastMessageOptions = {}){
    Object.assign(this, options);
  }
}

@Injectable()
export class ToastService {

  // toast Subject used as Observable
  private currentToast = new Subject<ToastMessage>();
  public currentToast$ = this.currentToast.asObservable();

  constructor() { }

  // create new instance of toast object for Subject
  toastTrigger(params) {
    let toast = new ToastMessage(params.message, params.options);
    this.currentToast.next(toast);
  }

}
