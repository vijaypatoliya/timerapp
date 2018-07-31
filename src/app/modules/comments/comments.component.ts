import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { Comment } from '../../models/comment.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommentsService } from '../../shared/services/comments/comments.service';
import { TasksService } from '../../shared/services/tasks/tasks.service';
import { ToastService } from '../../shared/services/toast/toast.service';
import { Task } from '../../models/task.model';
import { UsersService } from '../../shared/services/users/users.service';

@Component({
  selector: 'task-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @Input() comments: Comment[];
  commentForm: FormGroup;
  addState: boolean = false;
  loader: boolean;
  taskId: Task;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    private commentsService: CommentsService,
    private tasksService: TasksService,
    private usersService: UsersService
  ) { }

  ngOnInit() {
    
    // get task id from params
    this.activatedRoute.params.subscribe(
      (result) => {
        this.taskId = result.id;
        this.comments = [];
        // get comments for current id param
        this.loader = true;
        this.commentsService.getAll({_id: this.taskId}).subscribe((result) => {
            this.comments = result;
            this.translateIds();
          },
          (error) => {
            this.toastService.toastTrigger({
              message: error.error ? error.error.message : error,
              options: {type: 'error'}
            });
          },
          () => {
            this.loader = false;
          }
        );
        // initialize form
        this.commentForm = new FormGroup({
          commentDescription: new FormControl('',Validators.required),
          commentTask: new FormControl(this.taskId,Validators.required),
          commentParent: new FormControl(null)
        });
      }
    );
  }

  // add comment for current task
  addComment(): void{
    this.commentsService.addComment(this.commentForm.value).subscribe(
      (result) => {
        this.comments = this.commentsService.comments;
        this.translateIds();
        this.commentForm.controls['commentDescription'].reset();
        this.addState = false;
      },
      (error) => {
        this.toastService.toastTrigger({
          message: error.error.message,
          options: {type: 'error'}
        });
      }
    )
  }
  
  // replace id with names using mapped results
  translateIds(): void {
    this.comments = this.comments.map((value) => {
      value.createdByName = this.usersService.mappedResults[value.createdBy].userName;
      return value;
    });
  }
}
