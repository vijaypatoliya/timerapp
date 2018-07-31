import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatsComponent } from './stats.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';

const routes: Routes = [
  {
    path: '',
    component: StatsComponent,
    data: {title: 'Stats', access: ['admin','manager']},
    canActivate: [CanActivateAuthGuard]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class StatsRoutingModule { }