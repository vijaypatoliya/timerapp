import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list.model';
import { Project } from '../../models/project.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'list-edit',
  templateUrl: './list-edit.component.html',
  styleUrls: ['./list-edit.component.css']
})
export class ListEditComponent implements OnInit {
  listForm: FormGroup;
  list: List;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private listsService: ListsService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
        this.activatedRoute.data
        .map((result) => {return result.list})
        .subscribe((result) => {
          this.list = result;
        });
        this.listForm = new FormGroup({
          listName: new FormControl(this.list.listName, Validators.required),
          listDescription: new FormControl(this.list.listDescription,Validators.required)
        });
  }

  updateList(): void{
    let updateData = this.listForm.value;
        updateData._id = this.list._id;
    this.listsService.updateOne(updateData).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'List updated! ',
          options: {type: 'success'}
        });
        this.list = result;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    );
  }

  goBack(): void{
    this.router.navigate([`/main/projects/${this.list.listProject}/lists`]);
  }

}
