import { Injectable } from '@angular/core';
import { Comment } from '../../../models/comment.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import "rxjs/add/observable/of";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UsersService } from '../users/users.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CommentsService {
  apiPath: string = '/api/comments';
  comments: Comment[] = [];
  comment: Comment;

  constructor(
    private http: HttpClient,
    private usersService: UsersService
  ) { }

  addComment(task: Comment): Observable<Comment> {
    return this.http.post(this.apiPath + '/addComment', task, httpOptions).map((result: Comment) => {
      this.comments.unshift(result);
      return result;
    }).catch((error: HttpErrorResponse) => {
        return Observable.throw(error)
      });
  }

  getAll(params): Observable<Comment[]>{
    return this.http.post(this.apiPath + '/all', params, httpOptions).map((results: Comment[]) => {
                this.comments = results;
                  return results;
                })
                  .catch((error:HttpErrorResponse) => {
                    return Observable.throw(error)
                  });
  }

  // mappedComments(results): Comment[]{
  //   let comments = results.map((value) => {
  //     value.createdByName = this.usersService.mappedResults[value.createdBy].userName;
  //     return value;
  //   });
  //   return comments;
  // }
  

}
