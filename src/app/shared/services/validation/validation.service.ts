import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor(){ }
  
  passwordValidator(control: AbstractControl) {
    if (control.value && control.value.indexOf("#") != -1) {
      return { 'hashTag': { 'char':'#'}};
    } else {
      return null;
    }
  }

}
