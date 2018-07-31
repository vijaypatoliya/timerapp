import { Component, OnInit, TemplateRef } from '@angular/core';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, state, animate, style, transition, keyframes } from '@angular/animations';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'projectedit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
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
export class ProjecteditComponent implements OnInit {
  project: Project;
  projects: Project[] = [];
  projectForm: FormGroup;
  updateState: boolean = false;
  modalRef: BsModalRef;
  constructor(
    private projectsService: ProjectsService, 
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.activatedRoute.data
    .map((result) => {return result.project})
    .subscribe((result) => {
      this.project = result;
    });
    this.projectForm = new FormGroup({
      projectName: new FormControl(this.project.projectName, Validators.required),
      projectDescription: new FormControl(this.project.projectDescription,Validators.required),
      projectOwner: new FormControl(this.project.projectOwner,Validators.required),
      projectCategory: new FormControl(this.project.projectCategory,Validators.required),
      projectTags: new FormControl(this.project.projectTags,Validators.required)
    });
  }

  updateProject(): void {
    let updateData = this.projectForm.value;
        updateData._id = this.project._id;
    this.projectsService.updateOne(updateData).subscribe(
      (result)=>{
        this.toastService.toastTrigger({
          message: 'Project updated! ',
          options: {type: 'success'}
        });
        this.projectForm.reset();
        this.updateState = false;
        this.project = result;
      },
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

  goBack() {
    this.router.navigate(['/main/projects']);
  }
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'gray modal-sm' }));
  }

  confirm(): void {
    this.projectsService.deleteOne({_id: this.project._id}).subscribe(
      (result)=>{
        this.toastService.toastTrigger({
          message: 'Project deleted! ',
          options: {type: 'success'}
        });
        this.router.navigate(['/main/projects']);
      },
      (error)=>{
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

}
