import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsComponent } from './lists.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ListResolve } from './list.resolve';

const routes: Routes = [
  {
    path: '',
    component: ListsComponent,
    data: {title: 'Lists', access: ['admin','manager']},
    canActivate: [CanActivateAuthGuard]
  },
  {
    path: ':id',
    component: ListEditComponent,
    data: {title: 'List', access: ['admin', 'manager']},
    canActivate: [CanActivateAuthGuard],
    resolve: {
      list: ListResolve
    },
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ListsRoutingModule { }