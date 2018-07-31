import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [TooltipModule, ModalModule, BsDropdownModule]
})
export class AppBootstrapModule {}