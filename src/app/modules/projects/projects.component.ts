import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ProjectsFilterPipe } from '../../shared/filters/projects-filter.pipe';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter',
        animate('.3s ease-out', keyframes([
          style({ opacity: '0', transform: 'translateY(0)', offset:0 }),
          style({ opacity: '0.5', transform: 'translateY(25px)', offset:0.3 }),
          style({ opacity: '1', transform: 'translateY(0)', offset:1 })
        ])),
      ),
      transition(":leave", 
      animate('.2s ease-out', keyframes([
        style({ opacity: '1', transform: 'translateX(25%)', offset:0 }),
        style({ opacity: '0.3', transform: 'translateX(50%)', offset:0.5 }),
        style({ opacity: '0', transform: 'translateX(70%)', offset:1 })
      ]))
      )
    ]),
  ]
})
export class ProjectsComponent implements OnInit {
  projectForm: FormGroup;
  addState: boolean = false;
  loader: boolean;
  searchTerm: string;
  projects: Project[] = [];
  
  constructor(
    private projectsService: ProjectsService, 
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    // // load resolved data
    // this.activatedRoute.data
    // .map((result) => {return result.projects})
    // .subscribe((result) => {
    //   this.projects = result;
    // });

    // load lazy data
    this.loader = true;
    this.projectsService.getAll().subscribe((result) => {
      this.projects = result;
    },
    (error) => {
      this.toastService.toastTrigger({
        message: error.error.message,
        options: {type: 'error'}
      });
    },
    () => {
      this.loader = false;
    });
    this.projectForm = new FormGroup({
      projectName: new FormControl('', Validators.required),
      projectDescription: new FormControl('',Validators.required),
      projectOwner: new FormControl('',Validators.required),
      projectCategory: new FormControl('',Validators.required),
      projectTags: new FormControl('',Validators.required)
    });
  }

  addProject(): void {
    this.projectsService.addProject(this.projectForm.value).subscribe(
      (result)=>{
        this.toastService.toastTrigger({
          message: 'Project added! ',
          options: {type: 'success'}
        });
        this.projectForm.reset();
        this.addState = false;
      },
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

  onSearchChange(e){
    this.searchTerm = e;
  }

}
