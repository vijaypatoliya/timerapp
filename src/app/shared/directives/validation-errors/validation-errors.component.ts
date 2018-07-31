import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'
import { FormControl} from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css'],
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
        style({ opacity: '1', transform: 'translateY(0)', offset:0 }),
        style({ opacity: '1', transform: 'translateY(15px)', offset:0.5 }),
        style({ opacity: '0', transform: 'translateX(0)', offset:1 })
      ]))
      )
    ]),
  ]
})
export class ValidationErrors {
  @Input() control: FormControl;
  @Input() input: string;
  message: string;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
  }

  showErrorMessage(control){
    if (control.errors !== null) {
      let icon = `<i class="fa fa-exclamation-circle" aria-hidden="true"></i>`;
      for (let error in control.errors) {
        switch(error){
          case 'required':
            this.message = `${icon} ${this.input} is required`;
          break;
          case 'email':
            this.message = `${icon} ${this.input} is not valid`;
          break;
          case 'minlength':
            let length = control.errors.minlength.requiredLength - control.errors.minlength.actualLength;
            this.message = `${icon} ${this.input} requires <strong>${length}</strong> more charachters`;
          break;
          case 'hashTag':
            this.message = `${icon} Charachter <strong>${control.errors.hashTag.char}</strong> is not allowed in ${this.input}`;
          break;
          default:
            return 'Something wrong with your input';
        }
        return this.message;
      }
    }
    return null;
  }

}
