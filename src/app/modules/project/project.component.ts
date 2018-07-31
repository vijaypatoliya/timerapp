import { Component, OnInit, Input, Output } from '@angular/core';
import { Project } from '../../models/project.model';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  @Input() details: Project;
  constructor() { }

  ngOnInit() {

  }
}
