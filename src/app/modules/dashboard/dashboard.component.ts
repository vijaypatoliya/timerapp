import { Component, OnInit } from '@angular/core';
import { trigger, animate, style, state, transition, query, stagger } from '@angular/animations';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  constructor(private userService: UsersService) {
  }

  ngOnInit() {
  }

}
