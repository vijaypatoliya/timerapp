import { Component, OnInit } from '@angular/core';
import { List } from '../../models/list.model';
import { Project } from '../../models/project.model';
import { ToastService } from '../../shared/services/toast/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ListsService } from '../../shared/services/lists/lists.service';
import { ProjectsService } from '../../shared/services/projects/projects.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  listForm: FormGroup;
  addState: boolean = false;
  loader: boolean;
  lists: List[] = [];
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private listsService: ListsService,
    private projectsService: ProjectsService
  ) { }

  ngOnInit() {
    // get lists for current project
    this.loader = true;
    this.listsService.getAll({_id: this.projectsService.project._id}).subscribe((result) => {
        this.lists = result;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      },
      () => {
        this.loader = false;
      }
    );
    this.listForm = new FormGroup({
      listName: new FormControl('', Validators.required),
      listDescription: new FormControl('',Validators.required)
    });
  }

  addList(): void {
    let postData = {
      listName: this.listForm.value.listName,
      listDescription: this.listForm.value.listDescription,
      listProject: this.projectsService.project._id
    };

    this.listsService.addList(postData).subscribe(
      (result) => {
        this.toastService.toastTrigger({
          message: 'List added! ',
          options: {type: 'success'}
        });
        this.listForm.reset();
        this.addState = false;
        this.lists.unshift(result);
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      });
  }

}
