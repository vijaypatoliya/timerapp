import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { ValidationErrors } from '../../shared/directives/validation-errors/validation-errors.component';
import { ValidationService } from '../../shared/services/validation/validation.service';
import { RegisterRoutingModule } from './register.routing';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterComponent, ValidationErrors],
  providers: [ValidationService],
  exports: []
})
export class RegisterModule { }
