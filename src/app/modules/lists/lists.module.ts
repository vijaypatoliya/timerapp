import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ListsRoutingModule } from './lists.routing';
import { ListsComponent } from './lists.component';
import { ListEditComponent } from '../list-edit/list-edit.component';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ListsFilterPipe } from '../../shared/filters/lists-filter.pipe';
import { ListResolve } from './list.resolve';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ListsRoutingModule
  ],
  declarations: [ListsComponent, ListEditComponent, ListsFilterPipe],
  providers: [CanActivateAuthGuard, ListResolve]
})

export class ListsModule { }
