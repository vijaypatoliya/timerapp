import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StatsRoutingModule } from './stats.routing';
import { StatsComponent } from './stats.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StatsRoutingModule
  ],
  declarations: [StatsComponent],
  providers: [CanActivateAuthGuard]
})

export class StatsModule { }
