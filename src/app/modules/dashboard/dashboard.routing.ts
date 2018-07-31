import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';

const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent,
    data: {title: 'Dashboard', access: ['admin','manager','user']},
    canActivate: [CanActivateAuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class DashboardRoutingModule { }