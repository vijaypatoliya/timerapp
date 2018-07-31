import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { MainRoutingModule } from './main.routing';
import { CanActivateAuthGuard } from '../../shared/guards/dashboard.authGuard';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ListsService } from '../../shared/services/lists/lists.service';
import { WorkmeterService } from '../../shared/services/workmeter/workmeter.service';
import { MainResolve } from './main.resolve';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [MainComponent, HeaderComponent, NavigationComponent],
  providers: [
    CanActivateAuthGuard,
    ProjectsService,
    ListsService,
    WorkmeterService,
    MainResolve
  ],
  exports: []
})
export class MainModule { }
